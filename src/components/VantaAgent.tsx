import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

export interface VantaAgentProps {
    agentId: string;
    type?: 'floating' | 'embedded' | 'fullpage';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    defaultOpen?: boolean;
    apiKey?: string;
    apiBaseUrl?: string;
    triggerIcon?: React.ReactNode | string; // Support custom node or image URL
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
    triggerIcon,
    theme
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { messages, sendMessage, isLoading, agentConfig, isConfigLoading } = useChat({
        agentId,
        apiKey,
        apiBaseUrl
    });
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
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
    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Merge user theme with backend config, prioritizing user theme
    const primaryColor = theme?.primaryColor || agentConfig?.primaryColor || '#00E5FF';
    const bgColor = theme?.backgroundColor || agentConfig?.backgroundColor || 'rgba(15, 23, 42, 0.85)';
    const textColor = theme?.textColor || agentConfig?.textColor || '#F8FAFC';
    const agentName = agentConfig?.name || 'Vanta Agent';
    const agentAvatar = agentConfig?.avatar;

    // CSS Variables for dynamic theming
    const cssVars = {
        '--v-primary': primaryColor,
        '--v-bg': bgColor,
        '--v-text': textColor
    } as React.CSSProperties;

    // Static CSS rules for high compression (Pre-minified)
    const staticCss = `.v-container{font-family:"-apple-system","BlinkMacSystemFont","SF Pro Text","Segoe UI","Inter",sans-serif;-webkit-font-smoothing:antialiased;z-index:9999}.v-container.floating{position:fixed}.v-container.floating.bottom{bottom:24px}.v-container.floating.top{top:24px}.v-container.floating.right{right:24px}.v-container.floating.left{left:24px}.v-container.fullpage{width:100%;height:100%;min-height:500px}.v-window{background-color:var(--v-bg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);color:var(--v-text);border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.3);display:flex;flex-direction:column;overflow:hidden;transition:opacity .3s cubic-bezier(0.32,0.72,0,1),transform .4s cubic-bezier(0.32,0.72,0,1)}.v-window.floating{width:380px;height:650px;max-height:calc(100vh - 120px);margin-bottom:84px}.v-window.floating.expanded{width:85vw;height:85vh}.v-window.fullpage{width:100%;height:100%}.v-window.closed{opacity:0;transform:scale(0.85) translateY(40px);pointer-events:none;position:absolute;bottom:84px;right:0}.v-window.open{opacity:1;transform:scale(1) translateY(0)}.v-window.transform-br{transform-origin:bottom right}.v-window.transform-tr{transform-origin:top right}.v-header{background:linear-gradient(135deg,color-mix(in srgb,var(--v-primary) 40%,transparent) 0%,transparent 100%);border-bottom:1px solid rgba(255,255,255,0.05);padding:20px;display:flex;justify-content:space-between;align-items:center;font-weight:600}.v-mac-buttons{display:flex;align-items:center;gap:8px;margin-right:16px;padding:4px 0}.v-mac-btn{width:12px;height:12px;border-radius:50%;border:none;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background-color .2s}.v-mac-btn svg{opacity:0;transition:opacity .2s}.v-mac-buttons:hover .v-mac-btn svg{opacity:1}.v-mac-close{background-color:#ff5f56;color:#4c0000}.v-mac-close:hover{background-color:#ff4b4d}.v-mac-min{background-color:#ffbd2e;color:#995b00}.v-mac-min:hover{background-color:#ffa726}.v-mac-exp{background-color:#27c93f;color:#004d00}.v-mac-exp:hover{background-color:#1db833}.v-profile{display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-end}.v-avatar,.v-empty-avatar{width:30px;height:30px;border-radius:50%;object-fit:cover}.v-empty-avatar{width:64px;height:64px}.v-avatar-fallback{width:30px;height:30px;border-radius:50%;background:var(--v-primary);display:flex;align-items:center;justify-content:center;font-weight:700}.v-name{font-size:15px;font-weight:600;letter-spacing:-.3px}.v-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px}@keyframes v-shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}.v-skeleton{animation:v-shimmer 1.5s infinite linear;background:linear-gradient(to right,rgba(255,255,255,0.05) 4%,rgba(255,255,255,0.1) 25%,rgba(255,255,255,0.05) 36%);background-size:800px 100%;border-radius:20px}.v-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;opacity:.7;gap:16px}.v-empty-fallback{width:64px;height:64px;border-radius:50%;background:var(--v-primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;color:#fff}.v-empty-title{font-size:16px;font-weight:500}.v-empty-desc{font-size:13px;opacity:.7;text-align:center;max-width:80%}.v-msg{padding:12px 16px;max-width:85%;line-height:1.5;display:flex;flex-direction:column;gap:8px}.v-msg.user{align-self:flex-end;background-color:var(--v-primary);color:#fff;border-radius:20px 20px 4px 20px;box-shadow:0 4px 12px color-mix(in srgb,var(--v-primary) 40%,transparent)}.v-msg.assistant{align-self:flex-start;background-color:rgba(255,255,255,0.05);color:var(--v-text);border-radius:20px 20px 20px 4px;border:1px solid rgba(255,255,255,0.1)}.v-msg-label{font-size:11px;font-weight:600;opacity:.5;margin-bottom:-4px;display:flex;align-items:center;gap:6px}.v-msg-label-avatar{width:14px;height:14px;border-radius:50%;object-fit:cover}.v-msg-label-fallback{width:14px;height:14px;border-radius:50%;background:var(--v-primary);display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff}.v-msg-content{white-space:pre-wrap}.v-loading{align-self:flex-start;display:flex;gap:6px;padding:16px 20px;background-color:rgba(255,255,255,0.08);border-radius:20px 20px 20px 4px;border:1px solid rgba(255,255,255,0.1)}@keyframes v-bounce{0%,100%,80%{transform:scale(0);opacity:.5}40%{transform:scale(1);opacity:1}}.v-loading-dot{width:8px;height:8px;border-radius:50%;background-color:var(--v-primary);animation:v-bounce 1.4s infinite ease-in-out both}.v-form{padding:20px;border-top:1px solid rgba(255,255,255,0.05);display:flex;gap:12px;background:rgba(0,0,0,0.2);position:relative;z-index:10}.v-input{flex:1;padding:12px 16px;background-color:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:24px;outline:none;color:var(--v-text);transition:border-color .2s;min-width:0}.v-input:focus{border-color:var(--v-primary)}.v-send{background-color:var(--v-primary);color:#fff;border:none;border-radius:24px;padding:0 20px;font-weight:600;transition:opacity .2s,transform .2s;white-space:nowrap;flex-shrink:0}.v-send:not(:disabled){cursor:pointer}.v-send:not(:disabled):hover{transform:scale(1.05)}.v-send:disabled{cursor:not-allowed;opacity:.5}.v-trigger{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--v-primary),#0055ff);border:none;cursor:pointer;box-shadow:0 8px 24px color-mix(in srgb,var(--v-primary) 60%,transparent);display:flex;align-items:center;justify-content:center;position:absolute;bottom:0;right:0;color:#fff;transition:transform .2s ease,box-shadow .2s ease;z-index:100}.v-trigger:hover{transform:scale(1.05)}`;

    // Dynamic Classes
    const cContainer = `v-container ${type} ${position.split('-').join(' ')}`;
    const cWindow = `v-window ${type} ${isOpen ? 'open' : 'closed'} ${position.includes('bottom') ? 'transform-br' : 'transform-tr'} ${isExpanded ? 'expanded' : ''}`;

    return (
        <div style={cssVars} className={cContainer}>
            <style>{staticCss}</style>
            <div className={cWindow}>
                <div className="v-header">
                    <div className="v-mac-buttons">
                        <button onClick={toggleChat} className="v-mac-btn v-mac-close" aria-label="Close">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                                <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" />
                            </svg>
                        </button>
                        <button onClick={toggleChat} className="v-mac-btn v-mac-min" aria-label="Minimize">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M1.5 4h5" />
                            </svg>
                        </button>
                        <button onClick={toggleExpand} className="v-mac-btn v-mac-exp" aria-label="Expand">
                            {isExpanded ? (
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                    <path d="M1.5 6.5L4.5 6.5L1.5 3.5Z M6.5 1.5L3.5 1.5L6.5 4.5Z" />
                                </svg>
                            ) : (
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                                    <path d="M1.5 1.5L4.5 1.5L1.5 4.5Z M6.5 6.5L3.5 6.5L6.5 3.5Z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="v-profile">
                        {agentAvatar ? (
                            <img src={agentAvatar} alt={agentName} className="v-avatar" />
                        ) : (
                            <div className="v-avatar-fallback">V</div>
                        )}
                        <span className="v-name">{agentName}</span>
                    </div>
                </div>

                <div className="v-messages">
                    {isConfigLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
                            <div className="v-skeleton" style={{ width: '70%', height: '60px', borderRadius: '20px 20px 20px 4px', alignSelf: 'flex-start' }} />
                            <div className="v-skeleton" style={{ width: '50%', height: '40px', borderRadius: '20px 20px 4px 20px', alignSelf: 'flex-end', backgroundColor: 'var(--v-primary)', opacity: 0.5 }} />
                            <div className="v-skeleton" style={{ width: '80%', height: '80px', borderRadius: '20px 20px 20px 4px', alignSelf: 'flex-start' }} />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="v-empty">
                            {agentAvatar ? (
                                <img src={agentAvatar} alt={agentName} className="v-empty-avatar" />
                            ) : (
                                <div className="v-empty-fallback">V</div>
                            )}
                            <div className="v-empty-title">How can I help you today?</div>
                            <div className="v-empty-desc">
                                {agentConfig?.description || 'I am your virtual assistant, ready to answer your questions.'}
                            </div>
                        </div>
                    ) : (
                        messages.filter(msg => msg.content.trim() !== '').map((msg, idx) => (
                            <div key={idx} className={`v-msg ${msg.role}`}>
                                {msg.role === 'assistant' && (
                                    <div className="v-msg-label">
                                        {agentAvatar ? (
                                            <img src={agentAvatar} alt={agentName} className="v-msg-label-avatar" />
                                        ) : (
                                            <div className="v-msg-label-fallback">V</div>
                                        )}
                                        {agentName}
                                    </div>
                                )}
                                <div className="v-msg-content">{msg.content}</div>
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="v-loading">
                            <div className="v-loading-dot" />
                            <div className="v-loading-dot" style={{ animationDelay: '0.2s' }} />
                            <div className="v-loading-dot" style={{ animationDelay: '0.4s' }} />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="v-form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="v-input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="v-send"
                    >
                        Send
                    </button>
                </form>
            </div>

            {type === 'floating' && (
                <button
                    className="v-trigger"
                    onClick={toggleChat}
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : triggerIcon ? (
                        typeof triggerIcon === 'string' ? (
                            <img src={triggerIcon} alt="Chat" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        ) : (
                            triggerIcon
                        )
                    ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};
