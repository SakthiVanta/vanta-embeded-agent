<div align="center">
  <img src="https://img.shields.io/npm/v/vanta-agent-embed-sdk?color=blue&style=flat-square" alt="NPM Version" />
  <img src="https://img.shields.io/npm/dt/vanta-agent-embed-sdk?style=flat-square" alt="NPM Downloads" />
  <img src="https://img.shields.io/bundlephobia/minzip/vanta-agent-embed-sdk?style=flat-square&color=success" alt="Bundle Size" />
  <h1>🤖 Vanta Agent Embed SDK</h1>
  <p><strong>A beautifully crafted, ultra-lightweight (38KB) React/Vanilla JS SDK for embedding AI agents into your website.</strong></p>
  <a href="https://vanta-embed-agent.vercel.app/">Create Your Custom Agent on the Vanta Platform</a>
</div>

<br />

The Vanta Agent Embed SDK offers a premium, Apple-inspired interface to bring context-aware AI agents to any web application. With a meticulously optimized footprint, aggressive CSS-in-JS removal, and Preact aliasing, it drops directly into your app without destroying your Lighthouse scores.

---

## ✨ Features (v1.1.0)
- **⚡ Micro-Footprint:** Just `~13KB` gzipped (`~38KB` parsed). Built with an internalized Preact engine.
- **🎨 Stunning Aesthetics:** Glassmorphism, blurred backdrops, and native macOS-style traffic light window controls.
- **☁️ Cloud Synced:** Design your agent on [vanta-embed-agent.vercel.app](https://vanta-embed-agent.vercel.app/), and the SDK will automatically map its name, avatar, and brand colors to the widget.
- **⚛️ Framework Agnostic:** Works flawlessly as a React component or as a Vanilla JavaScript payload via CDN/Script tag.
- **💬 Streaming Responses:** Real-time Server-Sent Events (SSE) chat token streaming for instant perceived performance.

---

## 🚀 Getting Started

First, head over to the **[Vanta Platform](https://vanta-embed-agent.vercel.app/)** and create your AI agent. You will receive an `Agent ID` and an `API Key`.

### Installation

```bash
npm install vanta-agent-embed-sdk
# or
pnpm add vanta-agent-embed-sdk
# or
yarn add vanta-agent-embed-sdk
```

---

## 💻 Usage

### React Environments (Next.js, Vite, CRA)

The SDK automatically detects your framework's environment variables (`NEXT_PUBLIC_VANTA_API_KEY`, `VITE_VANTA_API_KEY`, etc.), allowing for zero-config setups!

```tsx
import { VantaAgent } from 'vanta-agent-embed-sdk';

export default function MyPage() {
  return (
    <VantaAgent 
      agentId="your-vanta-agent-id" 
    />
  );
}
```

### Vanilla HTML / Webflow / WordPress
You don't need React to use Vanta! Just drop the bundled script into your `<body>` and initialize it. 

```html
<script src="https://unpkg.com/vanta-agent-embed-sdk/dist/web/web.global.js"></script>
<script>
    if (window.Vanta) {
        window.Vanta.init({
            agentId: 'your-vanta-agent-id',
            apiKey: 'your-public-api-key', // Safely scoped to messaging
            type: 'floating',
            position: 'bottom-right'
        });
    }
</script>
```

---

## ⚙️ Configuration Properties

While the SDK automatically fetches your Agent's design (colors, name, avatar) from the cloud, you can optionally override specific behaviors via props/init parameters:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agentId` | `string` | **Required** | The ID of your agent from the Vanta Dashboard. |
| `apiKey` | `string` | `undefined` | Required if no env variables trigger detection. |
| `type` | `'floating' \| 'fullpage'` | `'floating'` | How the interface mounts to the DOM. |
| `position` | `'bottom-right' \| 'bottom-left' ...` | `'bottom-right'` | Placement on the screen. |
| `triggerIcon` | `string` | `undefined` | URL to a custom image to replace the floating chat bubble. |
| `apiBaseUrl` | `string` | *(Cloud API)* | Override for self-hosted Vanta backends. |
| `theme` | `object` | `{}` | Local overrides for `primaryColor`, `backgroundColor`, etc. |

## 🤝 Support
Need help or looking to report a bug? Please report it on the repository issues tab or reach out via the [Vanta Platform](https://vanta-embed-agent.vercel.app/).

<div align="center">
  <i>Engineered for elegance and speed.</i>
</div>
