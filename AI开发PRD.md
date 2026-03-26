# 🦞 Claw Navigator — AI 开发 PRD

> **给 AI 的说明**：这是一份可直接执行的产品需求文档。按 Section 顺序逐步实现，每个 Section 包含明确的输入/输出规格。技术栈：Astro + Tailwind CSS 4.x。所有文件输出到 `C:\Users\Admin\WorkBuddy\claw-navigator\`。

---

## S0: 项目初始化

### 指令
在 `C:\Users\Admin\WorkBuddy\claw-navigator\` 目录下初始化 Astro 项目。

### 步骤
1. 创建 `package.json`，包含以下依赖：
   - `astro` (^5.x)
   - `@astrojs/react` (^4.x)
   - `@astrojs/tailwind` (^6.x)
   - `@astrojs/sitemap` (^3.x)
   - `tailwindcss` (^4.x)
   - `react` (^19.x)
   - `react-dom` (^19.x)
   - `lucide-react` (图标)

2. 创建 `astro.config.mjs`：
   - 集成 `react()`、`tailwind()`、`sitemap()`
   - `site` 设为 `https://clawnav.com`

3. 创建 `src/styles/global.css`，引入 Tailwind 并自定义设计令牌：

```
设计令牌：
- --bg-primary: #0A0A0F
- --bg-card: #16161F
- --bg-card-hover: #1E1E2A
- --text-primary: #E8E8ED
- --text-secondary: #9898A6
- --accent: #FF6B35 (龙虾橙)
- --accent-secondary: #4ECDC4 (青绿)
- --border: #2A2A3A

阵营配色：
- 腾讯系: #07C160
- 阿里系: #FF6A00
- 百度系: #2932E1
- 字节系: #3370FF
- 智谱AI: #6C5CE7
- MiniMax: #E84393
- 月之暗面: #00B894
- 小米: #FF6900
- 华为: #CF0A2C
- 百度: #2932E1
- 万得: #FDCB6E
- 七牛云: #2D9CDB
- 开源: #636E72
- 其他: #B2BEC3
```

4. 创建目录结构：
```
src/
├── components/      # 组件
├── data/            # 数据
├── layouts/         # 布局
├── pages/           # 页面
└── styles/          # 样式
```

### 验收标准
- `npm run dev` 可启动开发服务器
- 页面可访问 `http://localhost:4321`
- Tailwind 样式生效

---

## S1: 产品数据

### 指令
创建 `src/data/products.json`，包含全部 21+ 款产品的结构化数据。

### 数据规格

每条产品记录必须包含以下字段：

```json
{
  "id": "string - URL友好的唯一标识，如 openclaw, workbuddy",
  "name": "string - 产品全名",
  "shortName": "string - 简称（卡片显示用）",
  "vendor": "string - 厂商全名",
  "vendorGroup": "string - 所属阵营，枚举值见下",
  "slogan": "string - 一句话定位（≤20字）",
  "description": "string - 详细介绍（200-300字，Markdown格式）",
  "platforms": ["string - 枚举: desktop, web, mobile, multi"],
  "platformLabel": "string - 平台展示文本",
  "deployType": "string - 部署方式",
  "deployTypeCategory": "string - 枚举: local, cloud, preinstalled",
  "price": "string - 价格展示文本",
  "priceCategory": "string - 枚举: free, open-source, paid, freemium",
  "openSource": boolean,
  "privacy": "string - 枚举: local, cloud, hybrid",
  "aiModel": "string - AI模型说明",
  "messagePlatforms": "string - 支持的消息平台或 N/A",
  "messagePlatformCount": number,
  "skills": "string - Skills生态说明",
  "difficulty": number - "上手难度 1-5",
  "features": ["string - 核心功能列表，3-5项"],
  "pros": ["string - 优点，3-4项"],
  "cons": ["string - 缺点，2-3项"],
  "audience": ["string - 适合人群，2-3项"],
  "tags": ["string - 标签，用于筛选"],
  "tagCategories": ["string - 分类标签，见下"],
  "website": "string - 官网URL",
  "github": "string 或 null - GitHub仓库URL",
  "color": "string - 品牌主色（HEX）",
  "logoUrl": "string - Logo图标（emoji或路径）",
  "status": "string - 枚举: active, beta, coming-soon",
  "releaseDate": "string - 发布日期 YYYY-MM",
  "updatedAt": "string - 最后更新 YYYY-MM-DD"
}
```

### vendorGroup 枚举值
`开源社区`, `腾讯系`, `阿里系`, `百度系`, `字节系`, `MiniMax`, `智谱AI`, `月之暗面`, `小米`, `华为`, `万得`, `七牛云`, `阶跃AI`, `猎豹移动`, `社区/极客`

### tagCategories 枚举值
`desktop`, `web`, `mobile`, `free`, `open-source`, `local-deploy`, `cloud-deploy`, `enterprise`, `personal`

### 必须收录的产品（21款）

1. **openclaw** — OpenClaw — 开源社区 — AI Agent框架鼻祖 — ⭐315K — 本地 — 免费 — 开源
2. **workbuddy** — WorkBuddy — 腾讯云 — 免部署企业级智能体 — 桌面 — 免费 — 闭源
3. **qclaw** — QClaw — 腾讯 — 微信原生AI助手 — 桌面 — 免费(beta) — 闭源
4. **maxclaw** — MaxClaw — MiniMax — 云端SaaS智能体 — 网页 — 39元/月 — 闭源
5. **copaw** — CoPaw — 阿里巴巴 — 可定制开源智能体 — 桌面+云端 — 免费 — 开源
6. **jvs-claw** — JVS Claw — 阿里云 — 安全沙箱版 — Web/手机 — 免费 — 闭源
7. **arkclaw** — ArkClaw — 字节跳动 — 飞书原生版 — 网页 — 免费 — 闭源
8. **autoclaw** — AutoClaw(澳龙) — 智谱AI — 零门槛本地版 — 桌面 — 免费+付费 — 闭源
9. **kimi-claw** — Kimi Claw — 月之暗面 — 办公飞书版 — 网页 — 199元/月 — 闭源
10. **miclaw** — miclaw — 小米 — 手机端智能体 — 手机 — 免费(预装) — 闭源
11. **xiaoyi-claw** — 小艺Claw — 华为 — 鸿蒙系统级智能体 — 手机/平板 — 免费(beta) — 闭源
12. **redclaw** — RedClaw — 百度智能云 — 手机端龙虾 — 手机 — 免费 — 闭源
13. **duclaw** — DuClaw — 百度智能云 — 零部署网页版 — 网页 — 免费 — 闭源
14. **dumate** — DuMate — 百度 — 桌面办公版 — 桌面 — 免费 — 闭源
15. **windclaw** — WindClaw — 万得(Wind) — 投研专业版 — 桌面 — 付费 — 闭源
16. **linclaw** — Linclaw — 七牛云 — 零部署桌面版 — 桌面 — 免费(300万Token) — 闭源
17. **easyclaw** — EasyClaw — 猎豹移动 — 标准化AI员工 — 桌面 — 免费 — 闭源
18. **stepclaw** — StepClaw — 阶跃AI — 云端部署版 — 网页 — 免费 — 闭源
19. **molili** — Molili — 国内首发 — 多入口协同 — 桌面 — 免费 — 闭源
20. **nanoclaw** — NanoClaw — 社区/极客 — Docker容器化版 — Docker — 免费 — 开源
21. **xiaobu-claw** — 小布Claw — OPPO — ColorOS系统智能体 — 手机 — 免费(beta) — 闭源

### 每个产品的 description 必须包含
- 产品是什么（1-2句）
- 核心功能（3-4个要点）
- 与其他产品的差异点（1-2句）
- 适合什么人（1句）

---

## S2: 全局布局 (BaseLayout)

### 指令
创建 `src/layouts/BaseLayout.astro`，所有页面的通用骨架。

### 结构规格

```
┌─────────────────────────────────────────┐
│ Header (固定顶部, z-50)                  │
│ ├─ 左: 🦞 Claw Navigator (Logo+标题)    │
│ ├─ 中: 导航链接                          │
│ │   [首页] [对比] [生态图] [动态]        │
│ └─ 右: 主题切换按钮(预留) + GitHub图标   │
├─────────────────────────────────────────┤
│ Main Content (max-w-7xl, mx-auto, px-6) │
│                                         │
│         <slot />                        │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                  │
│ ├─ 左: © 2026 Claw Navigator            │
│ ├─ 中: 产品数据仅供参考                  │
│ └─ 右: 关注生态动态                      │
└─────────────────────────────────────────┘
```

### 样式要求
- Header: `bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#2A2A3A]`
- 导航链接: hover 时文字变 `#FF6B35`，当前页面显示底部橙色指示条
- Footer: `bg-[#0A0A0F] border-t border-[#2A2A3A] text-[#9898A6]`
- 全局字体: `font-sans` → `"Inter", "Noto Sans SC", system-ui, sans-serif`
- `<head>` 中设置:
  - `<title>` 动态，格式: `{页面标题} | Claw Navigator`
  - meta description
  - Open Graph 标签
  - favicon: 🦞 emoji

### 验收标准
- 所有页面自动应用此布局
- 响应式：手机端导航折叠为汉堡菜单
- 首屏加载时 Header 和 Footer 可见

---

## S3: 首页 — ProductCard 组件

### 指令
创建 `src/components/ProductCard.astro`，首页的核心产品卡片。

### 视觉规格

```
┌─────────────────────────┐
│ 🔶 [厂商阵营色条]         │
│                         │
│  🦐 [产品Logo/Emoji]     │
│  OpenClaw               │
│  "AI Agent 框架鼻祖"     │  ← slogan, text-sm, text-[#9898A6]
│                         │
│  ┌─────┐ ┌─────┐       │
│  │桌面  │ │免费  │       │  ← 标签: rounded-full, text-xs
│  │开源  │ │本地  │       │
│  └─────┘ └─────┘       │
│                         │
│  难度: ⭐⭐⭐⭐          │  ← difficulty 用实心/空心星星
│  Star: 315K             │  ← 如有 github
│                         │
│  [加入对比] [查看详情→]  │  ← 两个按钮
└─────────────────────────┘
```

### 交互规格
- `cursor-pointer`，hover 时卡片 `translateY(-4px)` + `shadow-lg`
- 顶部阵营色条高 3px，颜色由 `vendorGroup` 对应的阵营色决定
- 点击卡片或"查看详情" → 跳转 `/product/[id]`
- "加入对比" 按钮 → 切换选中状态（橙色边框高亮），状态存 localStorage

### 样式规格
- 卡片: `bg-[#16161F] rounded-xl p-5 border border-[#2A2A3A]`
- 产品名: `text-lg font-bold text-[#E8E8ED]`
- 标签: `bg-[#2A2A3A] text-[#9898A6] px-2.5 py-0.5 rounded-full text-xs`
- 活跃标签(免费/开源): `bg-[#FF6B35]/15 text-[#FF6B35]`
- "加入对比"按钮: `border border-[#2A2A3A] text-[#9898A6] rounded-lg px-3 py-1.5 text-sm`
  - 选中态: `border-[#FF6B35] text-[#FF6B35] bg-[#FF6B35]/10`
- "查看详情"按钮: `text-[#FF6B35] text-sm hover:underline`

---

## S4: 首页 — FilterBar + SearchBox

### 指令
创建筛选栏和搜索框组件。

### FilterBar 规格

**第一行：分类筛选**
```
[全部] [桌面端] [网页端] [手机端] [免费] [开源] [本地部署] [云端部署]
```
- 水平滚动，不换行
- 激活态: `bg-[#FF6B35] text-white`
- 非激活: `bg-[#16161F] text-[#9898A6] border border-[#2A2A3A]`
- 选中任一筛选时，"全部" 自动取消

**第二行：厂商筛选**
```
阵营: [全部] [开源] [腾讯系] [阿里系] [百度系] [字节系] [AI公司] [硬件厂商] [其他]
```
- 同上样式，用阵营配色作为左侧小色点

### SearchBox 规格
- 输入框: `bg-[#16161F] border border-[#2A2A3A] rounded-xl px-4 py-3`
- Placeholder: "搜索产品名称、厂商或关键词..."
- 左侧放大镜图标
- 实时搜索（debounce 300ms），匹配 name/vendor/slogan/features

### 筛选逻辑
- 所有筛选条件取 **AND** 交集
- 筛选结果实时更新，带淡入动画
- 右侧显示结果计数: "找到 15 个产品"

---

## S5: 首页组合 (index.astro)

### 指令
组合上述组件，完成首页。

### 页面结构

```
1. Hero 区域（可选，简洁版）
   - 大标题: "🦞 找到你的龙虾"
   - 副标题: "Claw/龙虾 AI Agent 生态导航 — 一站式发现、对比、选择最适合你的智能体"
   - 已收录: "21+ 款产品 | 10+ 厂商 | 持续更新"

2. SearchBox

3. FilterBar (分类 + 厂商)

4. 产品卡片网格
   - 桌面: grid-cols-3
   - 平板: grid-cols-2
   - 手机: grid-cols-1
   - gap-6

5. 底部浮动对比栏（当有产品被选中时显示）
   - "已选 3 个产品" [开始对比→] [清空]
   - fixed bottom-0, bg-[#16161F], shadow-xl
```

### 数据流
- 页面加载时从 `products.json` 读取全部数据
- 筛选/搜索在前端 JS 中完成（数据量小，无需后端）
- 对比选中状态存 localStorage key: `claw-compare-list`

---

## S6: 对比页 (compare.astro + CompareTable.tsx)

### 指令
创建多产品横向对比页。此页面需要 React Island（因交互复杂）。

### 页面结构

```
1. 顶部: "🆚 产品对比"

2. 产品选择区
   - 已选产品: [🦞 OpenClaw ×] [🦐 WorkBuddy ×] [+ 添加产品]
   - 点击 × 移除
   - "+ 添加产品" → 弹出产品选择浮层（搜索 + 列表）

3. 对比表格
   - 左侧固定列: 维度名称
   - 右侧: 每个选中产品一列（最多6列）
   - 表头: 产品名 + Logo + 厂商

4. 表格行（12个维度）:
   ├── 基本信息
   │   ├── 厂商
   │   ├── 部署方式
   │   ├── 价格
   │   └── 支持平台
   ├── 技术参数
   │   ├── 是否开源
   │   ├── 数据隐私
   │   ├── AI模型
   │   ├── 消息平台
   │   └── Skills生态
   └── 用户体验
       ├── 上手难度 (⭐可视化)
       ├── 核心优势
       └── 适合人群
```

### 表格样式
- 表头: `bg-[#16161F] sticky top-0`
- 维度列: `bg-[#0A0A0F] text-[#9898A6] text-sm w-32`
- 数据单元格: `text-[#E8E8ED] text-sm`
- 行交替: `even:bg-[#16161F]/50`
- hover行: `hover:bg-[#1E1E2A]`
- 价格高亮: 付费用 `text-[#FF6B35]`，免费用 `text-[#4ECDC4]`
- 开源: ✅ 绿色 / ❌ 灰色
- 难度: 实心⭐(#FF6B35) + 空心⭐(#2A2A3A)

### 交互
- 产品选择浮层: `fixed inset-0 bg-black/50` + 居中列表
- 添加/移除产品时，表格列带滑入/滑出动画
- 从 localStorage 读取 `claw-compare-list` 初始化
- 支持从首页"开始对比"直接跳转并带上选中状态

### 验收标准
- 可同时对比 2-6 个产品
- 表格在手机端可横向滚动
- 对比数据准确对应 products.json

---

## S7: 产品详情页 ([id].astro)

### 指令
创建动态路由产品详情页。

### URL 规则
`/product/[id]`，如 `/product/openclaw`

### 页面结构

```
1. 面包屑: 首页 > 产品详情 > OpenClaw

2. 产品头部区域
   ├── 左: Logo(emoji/大图标) + 产品名 + Slogan
   ├── 右: 
   │   ├── 阵营标签（带阵营色）
   │   ├── 状态标签 (Active/Beta/Coming Soon)
   │   └── [加入对比] [访问官网↗]

3. 核心信息卡片网格 (grid-cols-4)
   ├── 部署方式
   ├── 价格
   ├── 平台
   ├── 数据隐私
   ├── 开源状态
   ├── 上手难度
   ├── AI模型
   └── 发布时间

4. 详细介绍 (Markdown渲染)

5. 核心功能列表
   - 图标 + 文字的列表

6. 优缺点对比 (两列)
   ├── ✅ 优点 (绿色)
   └── ⚠️ 缺点 (黄色)

7. 适合人群 (标签形式)

8. 相关产品推荐
   - 同阵营的其他产品
   - 同平台的其他产品
```

### getStaticPaths
- 从 products.json 生成所有产品路径
- 每个页面 `export function getStaticPaths()` 返回 `{ params: { id } }`

### 验收标准
- 所有 21 个产品都有独立页面
- 404 产品显示友好的"产品未找到"页面
- SEO: 每个 detail 页有独立的 title/description/OG

---

## S8: 厂商生态图 (ecosystem.astro)

### 指令
创建各厂商阵营产品矩阵可视化页。

### 页面结构

```
1. 标题: "🦞 Claw 生态全景图"

2. 阵营卡片列表 (grid-cols-2 lg:grid-cols-3)
   每个阵营卡片:
   ┌─────────────────────────┐
   │ 🟢 腾讯系               │
   │                         │
   │ ┌───────┐ ┌───────┐    │
   │ │WorkBuddy│ │ QClaw │    │
   │ │免部署   │ │微信   │    │
   │ └───────┘ └───────┘    │
   │ 2 款产品                │
   └─────────────────────────┘
```

### 阵营分组逻辑
从 products.json 按 `vendorGroup` 分组，按产品数量降序排列。

---

## S9: 动态资讯页 (news.astro)

### 指令
创建产品动态时间线页。

### 数据结构
创建 `src/data/news.json`:
```json
[
  {
    "date": "2026-03-12",
    "type": "release",
    "product": "小艺Claw",
    "title": "华为何刚官宣鸿蒙小艺Claw（Beta）",
    "summary": "华为终端BG CEO何刚展示了运行于鸿蒙系统的AI智能体...",
    "source": "https://www.sohu.com/a/995650472_116943"
  },
  {
    "date": "2026-03-10",
    "type": "release",
    "product": "AutoClaw",
    "title": "智谱AI发布AutoClaw（澳龙）",
    "summary": "零门槛本地部署，内置GLM模型...",
    "source": ""
  }
]
```

### 页面结构
- 垂直时间线布局
- 按日期降序
- 每条带: 日期、类型标签(release/update/other)、产品名(带颜色)、标题、摘要
- 点击展开详情

### 初始数据
至少收录 10 条重要动态（基于调研报告中的发布日期）。

---

## S10: SEO 与性能优化

### 指令
确保全站 SEO 和性能达标。

### 必须实现
1. **sitemap.xml** — 使用 @astrojs/sitemap 自动生成
2. **robots.txt** — 允许全部抓取
3. **Meta 标签** — 每个页面独立的 title / description
4. **OG 标签** — 每个页面设置 og:title / og:description / og:image
5. **结构化数据** — 首页添加 JSON-LD（SoftwareApplication schema）
6. **Canonical URL** — 每个页面
7. **图片优化** — 所有图片使用 Astro `<Image>` 组件（自动 WebP/AVIF）
8. **字体优化** — 使用 `font-display: swap`

### 性能目标
- Lighthouse Performance ≥ 95
- Lighthouse SEO ≥ 95
- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1

---

## S11: 响应式断点

```
移动端: < 640px   (sm)
平板端: 640-1024px (md, lg)
桌面端: > 1024px   (xl)

关键适配:
- 首页卡片: 1列 → 2列 → 3列
- 对比表格: 横向滚动 + sticky首列
- 导航: 汉堡菜单(移动) → 横排(桌面)
- 详情页: 单列(移动) → 双栏(桌面)
```

---

## 附录A: 厂商阵营配色映射

```json
{
  "开源社区": "#636E72",
  "腾讯系": "#07C160",
  "阿里系": "#FF6A00",
  "百度系": "#2932E1",
  "字节系": "#3370FF",
  "MiniMax": "#E84393",
  "智谱AI": "#6C5CE7",
  "月之暗面": "#00B894",
  "小米": "#FF6900",
  "华为": "#CF0A2C",
  "万得": "#FDCB6E",
  "七牛云": "#2D9CDB",
  "阶跃AI": "#A29BFE",
  "猎豹移动": "#00CEC9",
  "社区/极客": "#B2BEC3"
}
```

## 附录B: 标签中英文映射

```json
{
  "desktop": "桌面端",
  "web": "网页端",
  "mobile": "手机端",
  "multi": "多端",
  "free": "免费",
  "open-source": "开源",
  "local-deploy": "本地部署",
  "cloud-deploy": "云端部署",
  "enterprise": "企业级",
  "personal": "个人版"
}
```

## 附录C: 部署方式分类映射

```json
{
  "local": "本地部署",
  "cloud": "云端部署",
  "preinstalled": "系统预装"
}
```

---

> **AI 开发者注**：以上每个 Section 可独立实现和验证。建议按 S0→S1→S2→S3→S4→S5→S7→S6→S8→S9→S10 的顺序开发。S0-S5 完成后即可预览首页效果。
