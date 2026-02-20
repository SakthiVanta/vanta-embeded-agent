import { useState, useCallback, useRef, useEffect } from 'react';
import { VantaApiClient, Message, AgentConfig } from '../lib/api';

interface UseChatProps {
    agentId: string;
    apiKey?: string;
    apiBaseUrl?: string;
}

export function useChat({ agentId, apiKey, apiBaseUrl }: UseChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [agentConfig, setAgentConfig] = useState<AgentConfig | null>(null);
    const [isConfigLoading, setIsConfigLoading] = useState(true);
    const [sessionId] = useState(() => crypto.randomUUID());

    // Initialize API client
    const apiClientRef = useRef(new VantaApiClient({ agentId, apiKey, apiBaseUrl }));

    useEffect(() => {
        const fetchConfig = async () => {
            setIsConfigLoading(true);
            const config = await apiClientRef.current.getAgentConfig();
            setAgentConfig(config);

            // If the agent has a welcome message configured, automatically add it.
            if (config?.welcomeMessage) {
                setMessages([{ role: 'assistant', content: config.welcomeMessage }]);
            }
            setIsConfigLoading(false);
        };
        fetchConfig();
    }, [agentId]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Add user message immediately
        const userMessage: Message = { role: 'user', content };
        setMessages((prev: Message[]) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Placeholder for assistant message
            setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: '' }]);

            let fullContent = '';

            await apiClientRef.current.sendMessage({
                sessionId,
                message: content,
                onChunk: (chunk: string) => {
                    fullContent += chunk;
                    setMessages((prev: Message[]) => {
                        const newMessages = [...prev];
                        const lastMsg = newMessages[newMessages.length - 1];
                        if (lastMsg && lastMsg.role === 'assistant') {
                            lastMsg.content = fullContent;
                        }
                        return newMessages;
                    });
                }
            });

        } catch (error) {
            console.error('Failed to send message:', error);
            // Replace the empty placeholder message with the error message
            setMessages((prev: Message[]) => {
                const newMessages = [...prev];
                // Pop the empty placeholder if it's there and empty
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.content) {
                    newMessages.pop();
                }
                return [...newMessages, {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.'
                }];
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, sessionId]);

    return {
        messages,
        sendMessage,
        isLoading,
        agentConfig,
        isConfigLoading
    };
}
