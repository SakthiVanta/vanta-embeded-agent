import { createRoot } from 'react-dom/client';
import { VantaAgent, VantaAgentProps } from './components/VantaAgent';
import React from 'react';

console.log('Vanta Agent Script Loaded');

export const init = ({ elementId, ...props }: VantaAgentProps & { elementId?: string }) => {
    console.log('Vanta Agent initializing with props:', props);

    if (typeof window === 'undefined') return;

    let container: HTMLElement | null = null;

    // If specific element ID provided, use it (for embedded mode)
    if (elementId) {
        container = document.getElementById(elementId);
        if (!container) {
            console.error(`Vanta Agent: Element with ID "${elementId}" not found.`);
            return;
        }
    } else {
        // Default to creating a div for floating mode
        const existingContainer = document.getElementById('vanta-agent-root');
        if (existingContainer) {
            container = existingContainer;
        } else {
            container = document.createElement('div');
            container.id = 'vanta-agent-root';
            document.body.appendChild(container);
        }
    }

    const root = createRoot(container);
    root.render(React.createElement(VantaAgent, props));
};
