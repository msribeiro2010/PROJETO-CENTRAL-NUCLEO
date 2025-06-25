// Sistema de Notificações Toast
class ToastNotification {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = this.getIconForType(type);
        const color = this.getColorForType(type);
        
        toast.style.cssText = `
            background: ${color.background};
            color: ${color.text};
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
            backdrop-filter: blur(10px);
            border: 1px solid ${color.border};
        `;

        toast.innerHTML = `
            <i class="bi ${icon}" style="font-size: 1.2rem;"></i>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 4px;">${this.getTitleForType(type)}</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">${message}</div>
            </div>
            <button class="toast-close" style="
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                opacity: 0.7;
                transition: opacity 0.2s;
            " onclick="this.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        `;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 100);

        // Auto-remover
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    }

    hide(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }

    getIconForType(type) {
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill'
        };
        return icons[type] || icons.info;
    }

    getColorForType(type) {
        const colors = {
            success: {
                background: 'linear-gradient(135deg, #10b981, #059669)',
                text: '#ffffff',
                border: 'rgba(16, 185, 129, 0.3)'
            },
            error: {
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                text: '#ffffff',
                border: 'rgba(239, 68, 68, 0.3)'
            },
            warning: {
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                text: '#ffffff',
                border: 'rgba(245, 158, 11, 0.3)'
            },
            info: {
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                text: '#ffffff',
                border: 'rgba(59, 130, 246, 0.3)'
            }
        };
        return colors[type] || colors.info;
    }

    getTitleForType(type) {
        const titles = {
            success: 'Sucesso!',
            error: 'Erro!',
            warning: 'Atenção!',
            info: 'Informação'
        };
        return titles[type] || titles.info;
    }
}

// Instância global
const toast = new ToastNotification();

// Funções de conveniência
window.showToast = {
    success: (message, duration) => toast.show(message, 'success', duration),
    error: (message, duration) => toast.show(message, 'error', duration),
    warning: (message, duration) => toast.show(message, 'warning', duration),
    info: (message, duration) => toast.show(message, 'info', duration)
};

// Exemplo de uso:
// showToast.success('Favorito adicionado com sucesso!');
// showToast.error('Erro ao salvar configurações');
// showToast.warning('Sessão expirando em 5 minutos');
// showToast.info('Nova atualização disponível'); 