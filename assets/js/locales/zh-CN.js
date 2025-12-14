// 将const改为var以兼容更老的浏览器，并移除export语句
var zhCN = {
  meta: {
    description: "Filmeto — AI 驱动的 storyboard 分镜软件。把剧本快速转为镜头语言、分镜画布与可交付的镜头表。",
    title: "Filmeto — AI 驱动的 Storyboard 分镜"
  },
  header: {
    brand: "Filmeto",
    nav: {
      filmeto: "特性",
      download: "下载",
      contact: "联系",
      github: "Github",
      cta: "立即下载"
    }
  },
  hero: {
    kicker: "AI 驱动的 storyboard 分镜软件",
    title: "把故事变成镜头，把镜头变成可交付的分镜。",
    description: "Filmeto 通过 AI 帮你从剧本/大纲自动生成分镜建议，并在画布中快速组织镜头序列、备注、评审与导出，适用于短片、广告、动画与内容创作流程。",
    actions: {
      download: "Download",
      github: "Github",
      contact: "Contact"
    }
  },
  features: {
    title: "从多个角度，拆解 Filmeto 的核心能力",
    description: "向下滚动会逐段动态加载“截图 + 说明”。后续你只需要把 `assets/img/feature-*.svg` 换成真实产品截图即可。",
    loading: "产品特性",
    staticNotice: "（你的浏览器禁用了脚本，已展示静态占位。）",
    list: [
      {
        title: 'AI 自动分镜：从剧本到镜头语言',
        desc: '把长文本拆成可执行的镜头：节奏、景别、运动、情绪提示一并给出，并且可随时一键重写。',
        bullets: [
          ['镜头建议', '自动给出景别/角度/运动'],
          ['节奏控制', '支持快剪/长镜头风格'],
          ['可编辑', '每一格都能单独微调'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：AI 自动分镜'
      },
      {
        title: 'Storyboard 画布：拖拽排版与镜头序列',
        desc: '像搭乐高一样排镜头：拖拽排序、分组、标注镜头号与时长，保持创作流畅。',
        bullets: [
          ['拖拽排序', '镜头顺序与分组一拖即改'],
          ['标注信息', '时长、镜头号、场次、备注'],
          ['多视图', '网格/时间线/列表自由切换'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：画布与序列'
      },
      {
        title: '一致性控制：角色/场景/道具保持不跑偏',
        desc: '建立项目级“视觉与叙事设定”，让每次生成都更贴近你的世界观与风格。',
        bullets: [
          ['设定库', '角色、场景、道具统一管理'],
          ['风格锚点', '色调/镜头语言/情绪基线'],
          ['约束生成', '避免人物设定与场景冲突'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：一致性控制'
      },
      {
        title: '镜头备注与协作：评审更高效',
        desc: '把意见落在镜头上：逐格评论、@协作者、标记修改点，让评审过程更可追溯。',
        bullets: [
          ['逐格评论', '每一格都是讨论的上下文'],
          ['版本对比', '改动点一眼可见'],
          ['导出共享', '分享链接或导出评审包'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：协作与评审'
      },
      {
        title: '结构化拆解：从段落到镜头的可追踪链路',
        desc: '每个镜头都能回溯到原始段落与意图，方便做“为什么这样拍”的解释与复盘。',
        bullets: [
          ['可追踪', '镜头 ↔ 文本段落双向跳转'],
          ['标签体系', '情绪、地点、人物、动作'],
          ['快速重排', '按标签/场次批量调整'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：结构化拆解'
      },
      {
        title: '一键导出：交付格式覆盖常见流程',
        desc: '面向制作与沟通：把分镜快速交给美术、导演、剪辑与制片的上下游。',
        bullets: [
          ['常用格式', 'PDF/PNG 序列/CSV 镜头表'],
          ['分辨率', '支持高清与打印版'],
          ['可扩展', '后续可接入更多交付模板'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto 功能截图占位：导出与交付'
      }
    ]
  },
  download: {
    title: "下载",
    description: "这里先提供各系统下载入口。",
    platform: "多平台",
    cards: [
      {
        title: "macOS",
        description: "适用于 Apple Silicon / Intel。",
        path: "/downloads/Filmeto-mac.dmg",
        button: "下载 DMG",
        version: "macOS 12+"
      },
      {
        title: "Windows",
        description: "推荐提供安装版（.exe）与便携版（.zip）。",
        path: "/downloads/Filmeto-win.exe",
        button: "下载 EXE",
        version: "Windows 10+"
      },
      {
        title: "Linux",
        description: "可提供 AppImage / deb / rpm，多发行版更友好。",
        path: "/downloads/Filmeto-linux.AppImage",
        button: "下载 AppImage",
        version: "x86_64"
      }
    ]
  },
  contact: {
    title: "联系",
    description: "客户支持、Bug 反馈、功能请求与 Pull Request 入口。",
    support: "Support",
    supportAndFeedback: {
      title: "支持与反馈",
      items: [
        {
          text: "客户支持（Email）",
          hint: "fuzhiqin@gmail.com"
        },
        {
          text: "Bug Report（Issues）",
          hint: "github.com/classfoo/filmeto/issues"
        },
        {
          text: "功能建议（Discussions）",
          hint: "讨论区"
        }
      ]
    },
    contribution: {
      title: "贡献与协作",
      items: [
        {
          text: "贡献代码",
          hint: "Pull Request"
        },
        {
          text: "项目主页（Github）",
          hint: "classfoo/filmeto"
        },
        {
          text: "贡献指南",
          hint: "CONTRIBUTING.md"
        }
      ]
    }
  },
  footer: {
    copyright: "© {year} Filmeto",
    notice: "卡拉斯佛喜欢方克薰霸"
  }
}
