# vanta-agent-embed-sdk

Embed Vanta AI agents into your React applications with a single component.

## Installation

```bash
npm install vanta-agent-embed-sdk
# or
pnpm add vanta-agent-embed-sdk
# or
yarn add vanta-agent-embed-sdk
```

## Usage

### 1. Simple Usage (Auto-configuration)
The component automatically detects configuration from your project's environment variables.

Supported variables:
- **API Key**: `NEXT_PUBLIC_VANTA_API_KEY`, `VITE_VANTA_API_KEY`, or `VANTA_API_KEY`
- **API URL**: `NEXT_PUBLIC_VANTA_API_URL`, `VITE_VANTA_API_URL`, or `VANTA_API_URL`

```tsx
import { VantaAgent } from 'vanta-agent-embed-sdk';

function App() {
  return (
    <div className="App">
      <VantaAgent agentId="your-agent-id" />
    </div>
  );
}
```

### 2. Advanced Usage
Pass configuration props explicitly to override defaults.

```tsx
import { VantaAgent } from 'vanta-agent-embed-sdk';

function App() {
  return (
    <VantaAgent 
      agentId="your-agent-id"
      apiKey="vk_..." 
      type="floating" // 'floating' | 'embedded' | 'fullpage'
      position="bottom-right" 
      theme={{
          primaryColor: '#000000',
          textColor: '#ffffff',
          backgroundColor: '#333333'
      }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agentId` | `string` | **Required** | The ID of the agent to chat with. |
| `apiKey` | `string` | `undefined` | The API Key. Defaults to `NEXT_PUBLIC_VANTA_API_KEY` etc. |
| `type` | `'floating' \| 'embedded' \| 'fullpage'` | `'floating'` | Display mode. |
| `position` | `'bottom-right' \| 'bottom-left' ...` | `'bottom-right'` | Position of the floating widget. |
| `defaultOpen` | `boolean` | `false` | Whether the chat is open by default. |
| `apiBaseUrl` | `string` | `https://vanta.bookmarks.lat/api` | Base URL of the Vanta Platform API. |
| `theme` | `object` | `{}` | Custom theme colors. |

## License

MIT
