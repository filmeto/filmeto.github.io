// 将const改为var以兼容更老的浏览器，并移除export语句
var enUS = {
  meta: {
    description: "Filmeto — AI-powered storyboard software. Quickly convert scripts into shot language, storyboard canvas, and deliverable shot lists.",
    title: "Filmeto — AI-powered Storyboard Software"
  },
  header: {
    brand: "Filmeto",
    nav: {
      filmeto: "Feature",
      download: "Download",
      contact: "Contact",
      github: "Github",
      cta: "Download Now"
    }
  },
  hero: {
    kicker: "AI-powered storyboard software",
    title: "Turn stories into shots, turn shots into deliverable storyboards.",
    description: "Filmeto uses AI to automatically generate storyboard suggestions from scripts/outline, and quickly organize shot sequences, notes, reviews and exports on the canvas, suitable for short films, advertising, animation and content creation workflows.",
    actions: {
      download: "Download",
      github: "Github",
      contact: "Contact"
    }
  },
  features: {
    title: "Understanding Filmeto's Core Capabilities from Multiple Perspectives",
    description: "Scroll down to dynamically load \"screenshots + descriptions\" section by section. You only need to replace `assets/img/feature-*.svg` with real product screenshots later.",
    loading: "Dynamic Loading · Fade In",
    staticNotice: "(Your browser has disabled scripts, showing static placeholder.)",
    list: [
      {
        title: 'AI Auto Storyboarding: From Script to Shot Language',
        desc: 'Break down long texts into executable shots: rhythm, framing, movement, and emotional cues are provided together, and can be rewritten with one click at any time.',
        bullets: [
          ['Shot Suggestions', 'Automatically provide framing/angle/movement'],
          ['Rhythm Control', 'Support fast-cut/long-take styles'],
          ['Editable', 'Each frame can be fine-tuned separately'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: AI Auto Storyboarding'
      },
      {
        title: 'Storyboard Canvas: Drag-and-Drop Layout and Shot Sequences',
        desc: 'Arrange shots like building with LEGO: drag-and-drop sorting, grouping, labeling shot numbers and durations to maintain creative flow.',
        bullets: [
          ['Drag Sorting', 'Shot order and grouping changed by dragging'],
          ['Labeling Info', 'Duration, shot number, scene, notes'],
          ['Multiple Views', 'Freely switch between grid/timeline/list'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: Canvas and Sequences'
      },
      {
        title: 'Consistency Control: Keeping Characters/Scenes/Props On Track',
        desc: 'Establish project-level "visual and narrative settings" to make every generation closer to your world view and style.',
        bullets: [
          ['Settings Library', 'Unified management of characters, scenes, props'],
          ['Style Anchors', 'Color tone/shot language/emotional baseline'],
          ['Constrained Generation', 'Avoid conflicts in character settings and scenes'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: Consistency Control'
      },
      {
        title: 'Shot Comments and Collaboration: More Efficient Review',
        desc: 'Put comments on shots: comment frame by frame, @collaborators, mark modification points to make the review process more traceable.',
        bullets: [
          ['Frame-by-frame Comments', 'Each frame is a discussion context'],
          ['Version Comparison', 'Changes visible at a glance'],
          ['Export and Share', 'Share links or export review packages'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: Collaboration and Review'
      },
      {
        title: 'Structured Breakdown: Traceable Link from Paragraphs to Shots',
        desc: 'Each shot can be traced back to the original paragraph and intention, facilitating explanation and review of "why shoot this way".',
        bullets: [
          ['Traceable', 'Bidirectional jump between shots ↔ text paragraphs'],
          ['Tag System', 'Emotion, location, character, action'],
          ['Quick Reorganization', 'Batch adjustment by tags/scenes'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: Structured Breakdown'
      },
      {
        title: 'One-click Export: Delivery Formats Cover Common Workflows',
        desc: 'For production and communication: quickly deliver storyboards to upstream and downstream artists, directors, editors and producers.',
        bullets: [
          ['Common Formats', 'PDF/PNG sequence/CSV shot list'],
          ['Resolution', 'Support HD and print versions'],
          ['Extensible', 'More delivery templates can be accessed subsequently'],
        ],
        img: './assets/img/feature-01.png',
        alt: 'Filmeto Feature Screenshot: Export and Delivery'
      }
    ]
  },
  download: {
    title: "Download",
    description: "Placeholder for download entries for various systems here (can be replaced with real installation packages and checksum information at any time).",
    platform: "Multi-platform",
    cards: [
      {
        title: "macOS",
        description: "Suitable for Apple Silicon / Intel. Recommended to distribute through signed installer.",
        path: "Placeholder path: `./downloads/Filmeto-mac.dmg`",
        button: "Download DMG (Placeholder)",
        version: "macOS 12+"
      },
      {
        title: "Windows",
        description: "Recommended to provide installer (.exe) and portable version (.zip).",
        path: "Placeholder path: `./downloads/Filmeto-win.exe`",
        button: "Download EXE (Placeholder)",
        version: "Windows 10+"
      },
      {
        title: "Linux",
        description: "AppImage / deb / rpm can be provided, more friendly to multiple distributions.",
        path: "Placeholder path: `./downloads/Filmeto-linux.AppImage`",
        button: "Download AppImage (Placeholder)",
        version: "x86_64"
      }
    ]
  },
  contact: {
    title: "Contact",
    description: "Customer support, bug feedback, feature requests and pull request entry.",
    support: "Support",
    supportAndFeedback: {
      title: "Support and Feedback",
      items: [
        {
          text: "Customer Support (Email)",
          hint: "support@filmeto.app (Placeholder)"
        },
        {
          text: "Bug Report (Issues)",
          hint: "github.com/classfoo/filmeto/issues"
        },
        {
          text: "Feature Requests (Discussions)",
          hint: "Discussion Area"
        }
      ]
    },
    contribution: {
      title: "Contribution and Collaboration",
      items: [
        {
          text: "Pull Request",
          hint: "Contribute Code"
        },
        {
          text: "Project Homepage (Github)",
          hint: "classfoo/filmeto"
        },
        {
          text: "Contribution Guide (if exists)",
          hint: "CONTRIBUTING.md"
        }
      ]
    }
  },
  footer: {
    copyright: "© {year} Filmeto",
    notice: "Dark · Simple · Extensible directories: `assets/` / `downloads/` (can be added later)"
  }
}
