window.TarotAIShared = (() => {
    const AI_PROVIDERS = {
        deepseek: {
            label: 'DeepSeek',
            storageKey: 'provider_api_key_deepseek',
            endpoint: 'https://api.deepseek.com/chat/completions',
            model: 'deepseek-chat',
            keyUrl: 'https://platform.deepseek.com/api_keys',
            keyHint: '打开 DeepSeek 控制台创建 API key。'
        },
        glm: {
            label: 'GLM',
            storageKey: 'provider_api_key_glm',
            endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            model: 'glm-4-flash',
            keyUrl: 'https://bigmodel.cn/usercenter/proj-mgmt/apikeys',
            keyHint: '打开 BigModel 控制台创建 API key。'
        },
        kimi: {
            label: 'Kimi',
            storageKey: 'provider_api_key_kimi',
            endpoint: 'https://api.moonshot.cn/v1/chat/completions',
            model: 'moonshot-v1-8k',
            keyUrl: 'https://platform.moonshot.cn/console/api-keys',
            keyHint: '打开 Moonshot 控制台创建 API key。'
        }
    };

    function migrateLegacySettings() {
        const legacyDeepSeekKey = localStorage.getItem('deepseek_api_key');
        if (legacyDeepSeekKey && !localStorage.getItem(AI_PROVIDERS.deepseek.storageKey)) {
            localStorage.setItem(AI_PROVIDERS.deepseek.storageKey, legacyDeepSeekKey);
        }
    }

    function getSelectedProvider() {
        const savedProvider = localStorage.getItem('selected_ai_provider');
        return AI_PROVIDERS[savedProvider] ? savedProvider : 'deepseek';
    }

    function getProviderApiKey(providerId = getSelectedProvider()) {
        const provider = AI_PROVIDERS[providerId];
        return provider ? (localStorage.getItem(provider.storageKey) || '') : '';
    }

    function setProviderApiKey(providerId, apiKey) {
        const provider = AI_PROVIDERS[providerId];
        if (!provider) return;
        if (apiKey) localStorage.setItem(provider.storageKey, apiKey);
        else localStorage.removeItem(provider.storageKey);
    }

    function getHistory() {
        const history = localStorage.getItem('tarot_history');
        return history ? JSON.parse(history) : [];
    }

    function saveHistory(item) {
        const history = getHistory();
        history.unshift(item);
        if (history.length > 50) history.pop();
        localStorage.setItem('tarot_history', JSON.stringify(history));
    }

    async function callProvider(providerId, apiKey, prompt) {
        const provider = AI_PROVIDERS[providerId];
        if (!provider) throw new Error('Unsupported AI provider');

        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: provider.model,
                messages: [
                    { role: 'system', content: 'You are a helpful tarot reader.' },
                    { role: 'user', content: prompt }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    return {
        AI_PROVIDERS,
        migrateLegacySettings,
        getSelectedProvider,
        getProviderApiKey,
        setProviderApiKey,
        getHistory,
        saveHistory,
        callProvider
    };
})();
