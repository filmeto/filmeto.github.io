/* Filemeto landing page interactions */

const FEATURES = [
  {
    title: 'AI 自动分镜：从剧本到镜头语言',
    desc: '把长文本拆成可执行的镜头：节奏、景别、运动、情绪提示一并给出，并且可随时一键重写。',
    bullets: [
      ['镜头建议', '自动给出景别/角度/运动'],
      ['节奏控制', '支持快剪/长镜头风格'],
      ['可编辑', '每一格都能单独微调'],
    ],
    img: './assets/img/feature-01.svg',
    alt: 'Filemeto 功能截图占位：AI 自动分镜',
  },
  {
    title: 'Storyboard 画布：拖拽排版与镜头序列',
    desc: '像搭乐高一样排镜头：拖拽排序、分组、标注镜头号与时长，保持创作流畅。',
    bullets: [
      ['拖拽排序', '镜头顺序与分组一拖即改'],
      ['标注信息', '时长、镜头号、场次、备注'],
      ['多视图', '网格/时间线/列表自由切换'],
    ],
    img: './assets/img/feature-02.svg',
    alt: 'Filemeto 功能截图占位：画布与序列',
  },
  {
    title: '一致性控制：角色/场景/道具保持不跑偏',
    desc: '建立项目级“视觉与叙事设定”，让每次生成都更贴近你的世界观与风格。',
    bullets: [
      ['设定库', '角色、场景、道具统一管理'],
      ['风格锚点', '色调/镜头语言/情绪基线'],
      ['约束生成', '避免人物设定与场景冲突'],
    ],
    img: './assets/img/feature-03.svg',
    alt: 'Filemeto 功能截图占位：一致性控制',
  },
  {
    title: '镜头备注与协作：评审更高效',
    desc: '把意见落在镜头上：逐格评论、@协作者、标记修改点，让评审过程更可追溯。',
    bullets: [
      ['逐格评论', '每一格都是讨论的上下文'],
      ['版本对比', '改动点一眼可见'],
      ['导出共享', '分享链接或导出评审包'],
    ],
    img: './assets/img/feature-04.svg',
    alt: 'Filemeto 功能截图占位：协作与评审',
  },
  {
    title: '结构化拆解：从段落到镜头的可追踪链路',
    desc: '每个镜头都能回溯到原始段落与意图，方便做“为什么这样拍”的解释与复盘。',
    bullets: [
      ['可追踪', '镜头 ↔ 文本段落双向跳转'],
      ['标签体系', '情绪、地点、人物、动作'],
      ['快速重排', '按标签/场次批量调整'],
    ],
    img: './assets/img/feature-05.svg',
    alt: 'Filemeto 功能截图占位：结构化拆解',
  },
  {
    title: '一键导出：交付格式覆盖常见流程',
    desc: '面向制作与沟通：把分镜快速交给美术、导演、剪辑与制片的上下游。',
    bullets: [
      ['常用格式', 'PDF/PNG 序列/CSV 镜头表'],
      ['分辨率', '支持高清与打印版'],
      ['可扩展', '后续可接入更多交付模板'],
    ],
    img: './assets/img/feature-06.svg',
    alt: 'Filemeto 功能截图占位：导出与交付',
  },
];

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
    const end = Math.min(cursor + BATCH, FEATURES.length);
    for (let i = cursor; i < end; i += 1) {
      list.append(createFeatureCard(FEATURES[i], i));
    }
    cursor = end;

    if (cursor >= FEATURES.length) {
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
