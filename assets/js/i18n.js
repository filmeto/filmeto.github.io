class I18n {
  constructor() {
    this.currentLang = this.getStoredLanguage() || this.detectLanguage();
    this.translations = {};
  }

  detectLanguage() {
    const lang = navigator.language || navigator.languages[0];
    return lang.startsWith('zh') ? 'zh-CN' : 'en-US';
  }

  getStoredLanguage() {
    return localStorage.getItem('filmeto-lang');
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('filmeto-lang', lang);
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
    this.updatePageContent();
    // 重新加载特性列表
    this.reloadFeatures();
  }

  async loadLanguage(lang) {
    if (this.translations[lang]) {
      return this.translations[lang];
    }

    try {
      const module = await import(`./locales/${lang}.js`);
      this.translations[lang] = module.default;
      return this.translations[lang];
    } catch (error) {
      console.error(`Failed to load language file: ${lang}`, error);
      return null;
    }
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    if (!value) return key;

    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }

    return value;
  }

  async initialize() {
    await this.loadLanguage(this.currentLang);
    this.renderLanguageSwitcher();
    this.updatePageContent();
  }

  renderLanguageSwitcher() {
    // 移除可能存在的旧语言切换器
    const existingSwitcher = document.querySelector('.language-switcher');
    if (existingSwitcher) {
      existingSwitcher.remove();
    }

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
      <button id="lang-toggle" class="lang-toggle" aria-label="Switch language">
        <span class="lang-text">${this.currentLang === 'zh-CN' ? 'EN' : '中文'}</span>
      </button>
    `;
    
    const header = document.querySelector('.header-inner');
    if (header) {
      // 在导航栏中插入语言切换器
      const nav = header.querySelector('.nav');
      if (nav) {
        // 在导航链接之后但在CTA按钮之前插入语言切换器
        const ctaButton = nav.querySelector('.nav-cta');
        if (ctaButton) {
          nav.insertBefore(switcher, ctaButton);
        } else {
          nav.appendChild(switcher);
        }
      } else {
        header.appendChild(switcher);
      }
      
      const toggleButton = document.getElementById('lang-toggle');
      toggleButton.addEventListener('click', () => {
        const newLang = this.currentLang === 'zh-CN' ? 'en-US' : 'zh-CN';
        this.setLanguage(newLang);
      });
    }
  }

  updatePageContent() {
    // Update meta tags
    document.querySelector('meta[name="description"]').setAttribute('content', this.t('meta.description'));
    document.title = this.t('meta.title');

    // Update header
    const brand = document.querySelector('.brand span:last-child');
    if (brand) brand.textContent = this.t('header.brand');

    const navLinks = document.querySelectorAll('.nav a');
    if (navLinks.length >= 5) {
      navLinks[0].textContent = this.t('header.nav.filmeto');
      navLinks[1].textContent = this.t('header.nav.download');
      navLinks[2].textContent = this.t('header.nav.contact');
      navLinks[3].textContent = this.t('header.nav.github');
      navLinks[4].textContent = this.t('header.nav.cta');
    }

    // Update hero section
    const kicker = document.querySelector('.kicker span:last-child');
    if (kicker) kicker.textContent = this.t('hero.kicker');

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = this.t('hero.title');

    const heroDesc = document.querySelector('.hero p');
    if (heroDesc) heroDesc.textContent = this.t('hero.description');

    const heroActions = document.querySelectorAll('.hero-actions .btn');
    if (heroActions.length >= 3) {
      heroActions[0].textContent = this.t('hero.actions.download');
      heroActions[1].textContent = this.t('hero.actions.github');
      heroActions[2].textContent = this.t('hero.actions.contact');
    }

    // Update features section
    const featuresTitle = document.querySelector('.features .section-title h2');
    if (featuresTitle) featuresTitle.textContent = this.t('features.title');

    const featuresDesc = document.querySelector('.features .section-title p');
    if (featuresDesc) featuresDesc.textContent = this.t('features.description');

    const featuresLoading = document.querySelector('.features .pill');
    if (featuresLoading) featuresLoading.textContent = this.t('features.loading');

    // Update download section
    const downloadTitle = document.querySelector('.download .section-title h2');
    if (downloadTitle) downloadTitle.textContent = this.t('download.title');

    const downloadDesc = document.querySelector('.download .section-title p');
    if (downloadDesc) downloadDesc.textContent = this.t('download.description');

    const downloadPlatform = document.querySelector('.download .pill');
    if (downloadPlatform) downloadPlatform.textContent = this.t('download.platform');

    // Update contact section
    const contactTitle = document.querySelector('.contact .section-title h2');
    if (contactTitle) contactTitle.textContent = this.t('contact.title');

    const contactDesc = document.querySelector('.contact .section-title p');
    if (contactDesc) contactDesc.textContent = this.t('contact.description');

    const contactSupport = document.querySelector('.contact .pill');
    if (contactSupport) contactSupport.textContent = this.t('contact.support');

    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.querySelector('.lang-text').textContent = this.currentLang === 'zh-CN' ? 'EN' : '中文';
    }

    // Update footer
    const footerNotice = document.querySelector('.footer > .container > div > span:last-child');
    if (footerNotice) footerNotice.textContent = this.t('footer.notice');
  }

  reloadFeatures() {
    // 清空现有的特性列表
    const featureList = document.querySelector('#features-list');
    if (featureList) {
      featureList.innerHTML = '';
      
      // 添加哨兵元素
      const sentinel = document.createElement('div');
      sentinel.id = 'features-sentinel';
      sentinel.style.height = '1px';
      featureList.parentNode.appendChild(sentinel);
      
      // 重新初始化特性加载
      setTimeout(() => {
        this.setupFeatureAutoLoad();
      }, 0);
    }
  }

  setupFeatureAutoLoad() {
    const list = document.querySelector('#features-list');
    const sentinel = document.querySelector('#features-sentinel');
    if (!list || !sentinel) return;

    let cursor = 0;
    const BATCH = 2;

    const appendNextBatch = () => {
      const featuresList = this.t('features.list');
      if (!featuresList) return;
      
      const end = Math.min(cursor + BATCH, featuresList.length);
      for (let i = cursor; i < end; i += 1) {
        const featureCard = this.createFeatureCard(featuresList[i], i);
        list.append(featureCard);
      }
      cursor = end;

      if (cursor >= featuresList.length) {
        sentinel.remove();
      }

      // 新增的卡片进入视口时渐显
      this.setupReveal(list.querySelectorAll('.feature:not(.is-visible)'));
    };

    // 初始：先放骨架，等用户下滑再逐批加载
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    skeleton.setAttribute('aria-hidden', 'true');
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

  createFeatureCard(feature, index) {
    const el = (tag, attrs = {}, children = []) => {
      const node = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, String(v));
      }
      for (const child of children) node.append(child);
      return node;
    };

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

  setupReveal(nodes) {
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
}

// Initialize i18n
const i18n = new I18n();

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
  await i18n.initialize();
  
  // 将i18n实例挂载到window对象上供其他脚本使用
  window.i18n = i18n;
});

export default i18n;