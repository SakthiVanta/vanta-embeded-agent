export interface VantaConfig {
    agentId: string;
    apiKey?: string;
    apiBaseUrl?: string;
}

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AgentConfig {
    name?: string;
    description?: string;
    avatar?: string;
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    welcomeMessage?: string;
    mood?: string;
    fontFamily?: string;
    supportEmail?: string;
    contactLink?: string;
    logoUrl?: string;
    userPlaceholder?: string;
    requireAuth?: boolean;
    customCss?: string;
    suggestions?: string[];
}

export class VantaApiClient {
    private config: VantaConfig;
    private baseUrl: string;

    constructor(config: VantaConfig) {
        this.config = config;

        // Environment variable detection (supports Next.js and Vite)
        const envApiUrl =
            (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VANTA_API_URL || process.env.VANTA_API_URL : undefined) ||
            (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_VANTA_API_URL : undefined);

        this.baseUrl = config.apiBaseUrl || envApiUrl || 'http://localhost:3001/api';
    }

    private getHeaders() {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Environment variable detection (supports Next.js and Vite)
        const envApiKey =
            (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VANTA_API_KEY || process.env.VANTA_API_KEY : undefined) ||
            (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_VANTA_API_KEY : undefined);

        const apiKey = this.config.apiKey || envApiKey;

        if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }

        return headers;
    }

    async getAgentConfig(): Promise<AgentConfig | null> {
        try {
            const response = await fetch(`${this.baseUrl}/agents/${this.config.agentId}/config`, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                console.warn(`Failed to fetch agent config: ${response.statusText}`);
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching agent config:', error);
            return null;
        }
    }

    async createSession() {
        // Implementation for creating a session if needed, 
        // or we can just send messages with a generated session ID.
        // For now, we'll let the backend handle session creation on first message or generate one here.
        return crypto.randomUUID();
    }

    async sendMessage(params: {
        sessionId: string;
        message: string;
        onChunk: (content: string) => void;
    }) {
        const { sessionId, message, onChunk } = params;

        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    agentId: this.config.agentId,
                    sessionId,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            if (!response.body) return;

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const chunk = JSON.parse(data);
                            if (chunk.type === 'content' && chunk.content) {
                                onChunk(chunk.content);
                            }
                            // Handle tool calls if needed
                        } catch (e) {
                            console.error('Error parsing chunk:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Vanta API Error:', error);
            throw error;
        }
    }
}
