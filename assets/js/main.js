/* Filemeto landing page interactions */

// 修改FEATURES为从i18n获取
const FEATURES = [];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, String(v));
  }
  for (const child of children) node.append(child);
  return node;
}

function createFeatureCard(feature, index) {
  const bulletItems = feature.bullets.map(([strong, faint]) =>
    el('li', {}, [
      el('strong', { html: strong + '：' }),
      el('span', { html: ' ' + faint }),
    ])
  );

  const shot = el('div', { class: 'shot' }, [
    el('img', { src: feature.img, alt: feature.alt, loading: 'lazy' }),
  ]);

  const text = el('div', {}, [
    el('h3', { html: feature.title }),
    el('p', { class: 'desc', html: feature.desc }),
    el('ul', { class: 'bullets' }, bulletItems),
  ]);

  // 交替布局（更像官方产品页）
  const isEven = index % 2 === 0;
  const children = isEven ? [text, shot] : [shot, text];

  return el('article', { class: 'feature', 'data-feature-idx': String(index) }, children);
}

function setupFeatureAutoLoad() {
  const list = document.querySelector('#features-list');
  const sentinel = document.querySelector('#features-sentinel');
  if (!list || !sentinel) return;

  let cursor = 0;
  const BATCH = 2;

  function appendNextBatch() {
    // 从i18n获取特性列表
    const featuresList = window.i18n ? window.i18n.t('features.list') : [];
    const end = Math.min(cursor + BATCH, featuresList.length);
    for (let i = cursor; i < end; i += 1) {
      list.append(createFeatureCard(featuresList[i], i));
    }
    cursor = end;

    if (cursor >= featuresList.length) {
      sentinel.remove();
    }

    // 新增的卡片进入视口时渐显
    setupReveal(list.querySelectorAll('.feature:not(.is-visible)'));
  }

  // 初始：先放骨架，等用户下滑再逐批加载
  const skeleton = el('div', { class: 'skeleton', 'aria-hidden': 'true' });
  list.append(skeleton);

  const initObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        skeleton.remove();
        appendNextBatch();
        initObserver.disconnect();
        break;
      }
    }
  }, { rootMargin: '120px 0px' });

  initObserver.observe(sentinel);

  const moreObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      // 继续加载下一批
      appendNextBatch();
    }
  }, { rootMargin: '200px 0px' });

  moreObserver.observe(sentinel);
}

function setupReveal(nodes) {
  const items = Array.from(nodes || document.querySelectorAll('.feature'));
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (const node of items) io.observe(node);
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll('.nav a[data-scroll]'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const byId = new Map(links.map((a) => [a.getAttribute('href')?.slice(1), a]));

  const io = new IntersectionObserver((entries) => {
    // 找到当前最“显著”的 section
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => (b.intersectionRatio - a.intersectionRatio));

    if (!visible.length) return;
    const id = visible[0].target.id;

    for (const a of links) a.removeAttribute('aria-current');
    const active = byId.get(id);
    if (active) active.setAttribute('aria-current', 'page');
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });

  for (const s of sections) io.observe(s);
}

document.addEventListener('DOMContentLoaded', () => {
  setupFeatureAutoLoad();
  setupReveal();
  setupActiveNav();
});
