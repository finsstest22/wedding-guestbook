/* 저장소 — 서버가 있으면 API + SSE, 파일로 열면 이 브라우저 안(localStorage)에서만 동작 */
(function (global) {
  'use strict';

  const LOCAL = location.protocol === 'file:' || new URLSearchParams(location.search).has('local');
  const KEY = 'pixel-guestbook:guests';
  const DEFAULT_CONFIG = {
    groom: { name: '신랑' }, bride: { name: '신부' }, date: '', title: '', venue: '',
    coupleMessages: ['오늘 정말 행복해요!', '와줘서 고마워요 💕'],
    art: { background: 'img/venue.webp', groom: 'img/groom.png', bride: 'img/bride.png' },
    guestUrl: location.href.replace(/[^/]*$/, 'guest.html')
  };

  const channel = LOCAL && 'BroadcastChannel' in global ? new BroadcastChannel('pixel-guestbook') : null;

  function readLocal() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }
  function writeLocal(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* 저장 불가 환경 */ }
  }

  async function request(url, opts) {
    const res = await fetch(url, opts);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || '요청에 실패했어요.');
    return body;
  }

  const Store = {
    local: LOCAL,

    async config() {
      if (LOCAL) return DEFAULT_CONFIG;
      try { return { ...DEFAULT_CONFIG, ...(await request('/api/config')) }; }
      catch { return DEFAULT_CONFIG; }
    },

    async list() {
      if (LOCAL) return readLocal();
      return request('/api/guests');
    },

    async add({ name, message, look, side }) {
      if (LOCAL) {
        const guest = {
          id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random()),
          name: String(name).slice(0, 12), message: String(message).slice(0, 60),
          look, side: side || '', createdAt: new Date().toISOString()
        };
        const list = readLocal(); list.push(guest); writeLocal(list);
        channel && channel.postMessage({ type: 'guest', guest });
        return guest;
      }
      return request('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, look, side })
      });
    },

    async remove(id, adminKey) {
      if (LOCAL) {
        writeLocal(readLocal().filter(g => g.id !== id));
        channel && channel.postMessage({ type: 'remove', id });
        return;
      }
      return request('/api/guests/' + encodeURIComponent(id), { method: 'DELETE', headers: { 'x-admin-key': adminKey || '' } });
    },

    async checkAdmin(adminKey) {
      if (LOCAL) return true;
      try { await request('/api/admin/check', { headers: { 'x-admin-key': adminKey || '' } }); return true; }
      catch { return false; }
    },

    // onGuest(guest), onRemove(id), onStatus(connected)
    subscribe({ onGuest, onRemove, onStatus }) {
      if (LOCAL) {
        if (channel) channel.onmessage = e => {
          if (e.data.type === 'guest') onGuest && onGuest(e.data.guest);
          if (e.data.type === 'remove') onRemove && onRemove(e.data.id);
        };
        onStatus && onStatus(true);
        return () => channel && (channel.onmessage = null);
      }
      const es = new EventSource('/api/events');
      es.addEventListener('guest', e => onGuest && onGuest(JSON.parse(e.data)));
      es.addEventListener('remove', e => onRemove && onRemove(JSON.parse(e.data).id));
      es.onopen = () => onStatus && onStatus(true);
      es.onerror = () => onStatus && onStatus(false);
      return () => es.close();
    }
  };

  global.Store = Store;
})(window);
