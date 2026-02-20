import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

export interface VantaAgentProps {
    agentId: string;
    type?: 'floating' | 'embedded' | 'fullpage';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    defaultOpen?: boolean;
    apiKey?: string;
    apiBaseUrl?: string;
    theme?: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
    };
}

export const VantaAgent: React.FC<VantaAgentProps> = ({
    agentId,
    type = 'floating',
    position = 'bottom-right',
    defaultOpen = false,
    apiKey,
    apiBaseUrl,
    theme
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { messages, sendMessage, isLoading } = useChat({
        agentId,
        apiKey,
        apiBaseUrl
    });
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    // Styles
    const containerStyle: React.CSSProperties = {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 9999,
        ...(type === 'floating' ? {
            position: 'fixed',
            bottom: position.includes('bottom') ? '20px' : 'auto',
            top: position.includes('top') ? '20px' : 'auto',
            right: position.includes('right') ? '20px' : 'auto',
            left: position.includes('left') ? '20px' : 'auto',
        } : {
            width: '100%',
            height: '100%',
            minHeight: '500px'
        })
    };

    const chatWindowStyle: React.CSSProperties = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        color: theme?.textColor || '#1f2937',
        width: type === 'floating' ? '380px' : '100%',
        height: type === 'floating' ? '600px' : '100%',
        maxHeight: type === 'floating' ? 'calc(100vh - 100px)' : 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...(type === 'floating' && !isOpen ? { display: 'none' } : {})
    };

    const headerStyle: React.CSSProperties = {
        backgroundColor: theme?.primaryColor || '#10b981',
        color: '#ffffff',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
    };

    const buttonStyle: React.CSSProperties = {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: theme?.primaryColor || '#10b981',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: type === 'floating' ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        color: 'white'
    };

    return (
        <div style={containerStyle}>
            <div style={chatWindowStyle}>
                <div style={headerStyle}>
                    <span>AI Assistant</span>
                    {type === 'floating' && (
                        <button
                            onClick={toggleChat}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map((msg, idx) => (
                        <div key={idx} style={{
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.role === 'user' ? (theme?.primaryColor || '#10b981') : '#f3f4f6',
                            color: msg.role === 'user' ? 'white' : '#1f2937',
                            padding: '8px 12px',
                            borderRadius: '12px',
                            maxWidth: '80%'
                        }}>
                            {msg.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ alignSelf: 'flex-start', color: '#6b7280', fontSize: '0.875rem' }}>Typing...</div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '20px',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        style={{
                            backgroundColor: theme?.primaryColor || '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        Send
                    </button>
                </form>
            </div>

            <button style={buttonStyle} onClick={toggleChat}>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};
