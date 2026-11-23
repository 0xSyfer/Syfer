const ICONS = {
  tg: '<path d="M21 4 2.6 11.1c-.9.35-.86 1.66.06 1.95l4.6 1.45 1.76 5.2c.25.72 1.16.9 1.66.34l2.55-2.86 4.6 3.38c.6.44 1.45.11 1.6-.62L22.98 5.3C23.17 4.4 22.3 3.6 21 4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m7.3 14.5 9.4-6.3-7 7.3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>',
  x: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" fill="currentColor"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor"/>',
  gh: '<path d="M12 2.4c-5.3 0-9.6 4.3-9.6 9.6 0 4.25 2.75 7.85 6.57 9.12.48.09.65-.21.65-.46 0-.23-.01-.98-.01-1.78-2.67.49-3.37-.65-3.59-1.25-.12-.31-.65-1.25-1.11-1.5-.38-.2-.92-.7-.01-.71.85-.01 1.46.78 1.66 1.11.97 1.63 2.53 1.17 3.15.89.1-.7.38-1.17.69-1.44-2.37-.27-4.85-1.19-4.85-5.27 0-1.16.41-2.12 1.1-2.87-.11-.27-.48-1.37.1-2.85 0 0 .9-.29 2.95 1.1a9.9 9.9 0 0 1 5.36 0c2.05-1.39 2.95-1.1 2.95-1.1.59 1.48.22 2.58.11 2.85.69.75 1.1 1.7 1.1 2.87 0 4.1-2.49 5-4.86 5.27.39.33.72.97.72 1.96 0 1.42-.01 2.56-.01 2.91 0 .25.17.56.66.46A9.62 9.62 0 0 0 21.6 12c0-5.3-4.3-9.6-9.6-9.6Z" fill="currentColor"/>',
  pump: '<rect x="4.2" y="7.2" width="15.6" height="9.6" rx="4.8" transform="rotate(-45 12 12)" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.3 8.3 15.7 15.7" stroke="currentColor" stroke-width="1.6"/>',
  ax: '<path d="M12 3.2 21 20.2H3L12 3.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 10 16.2 17.2H7.8L12 10Z" fill="currentColor"/>',
  term: '<rect x="2.5" y="4" width="19" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6.3 9.3 9.6 12l-3.3 2.7M12.4 14.7h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'
};

const SOCIALS = [
  { key: 'tg', name: 'Telegram', sub: '@Syferski',      url: 'https://t.me/syferski' },
  { key: 'x',  name: 'Twitter',  sub: '@0xSyfer',       url: 'https://x.com/0xSyfer' },
  { key: 'ig', name: 'Instagram', sub: '@0xSyfer',      url: 'https://www.instagram.com/0xsyfer/' },
  { key: 'gh', name: 'GitHub',   sub: '0xSyfer', url: 'https://github.com/0xSyfer' }
];

const TRADING = [
  { key: 'pump', name: 'Pump.fun', sub: 'Launch & ape', url: 'https://pump.fun' },
  { key: 'ax',   name: 'Axiom',    sub: 'Axiom.trade',  url: 'https://axiom.trade' },
  { key: 'term', name: 'Terminal', sub: 'Execution',    url: '#' }
];

const REFERRAL_CODE = 'SYFER';

function createCard(item) {
  const el = document.createElement('a');
  el.className = 'card';
  el.href = item.url;
  if (item.url !== '#') {
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
  el.innerHTML =
    '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[item.key] + '</svg>' +
    '<span class="t"><span class="n">' + item.name + '</span><span class="s">' + item.sub + '</span></span>' +
    '<span class="arr" aria-hidden="true">↗</span>';
  return el;
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const frag = document.createDocumentFragment();
  items.forEach(function (item) { frag.appendChild(createCard(item)); });
  container.appendChild(frag);
}

function renderBarSocials(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const frag = document.createDocumentFragment();
  items.forEach(function (item) {
    const el = document.createElement('a');
    el.href = item.url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.title = item.name;
    el.setAttribute('aria-label', item.name);
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[item.key] + '</svg>';
    frag.appendChild(el);
  });
  container.appendChild(frag);
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  return new Promise(function (resolve, reject) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.className = 'copy-helper';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    ok ? resolve() : reject();
  });
}

function flash(el, message) {
  const original = el.innerHTML;
  el.classList.add('done');
  el.innerHTML = message;
  setTimeout(function () {
    el.innerHTML = original;
    el.classList.remove('done');
  }, 1300);
}

function init() {
  renderBarSocials('bar-socials', SOCIALS);
  renderCards('socials', SOCIALS);
  renderCards('trading', TRADING);

  const codeBtn = document.getElementById('code');
  if (codeBtn) {
    codeBtn.addEventListener('click', function () {
      copyText(codeBtn.dataset.code || REFERRAL_CODE).then(
        function () { flash(codeBtn, 'copied ✓'); },
        function () {}
      );
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
