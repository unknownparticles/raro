
// script.js

let auth0Client = null;
let isAuthenticated = false;

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const drawButton = document.getElementById("draw-card");

const tarotCards = [
    // Major Arcana
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant',
    'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice',
    'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star',
    'The Moon', 'The Sun', 'Judgement', 'The World',
    // Wands
    'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands',
    'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands',
    'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands',
    // Cups
    'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
    'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
    'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
    // Swords
    'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords',
    'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords',
    'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords',
    // Pentacles
    'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles',
    'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles',
    'Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles'
];

const tarotTranslations = {
    'The Fool': '愚人', 'The Magician': '魔术师', 'The High Priestess': '女祭司', 'The Empress': '皇后',
    'The Emperor': '皇帝', 'The Hierophant': '教皇', 'The Lovers': '恋人', 'The Chariot': '战车',
    'Strength': '力量', 'The Hermit': '隐士', 'Wheel of Fortune': '命运之轮', 'Justice': '正义',
    'The Hanged Man': '倒吊人', 'Death': '死亡', 'Temperance': '节制', 'The Devil': '魔鬼',
    'The Tower': '塔', 'The Star': '星星', 'The Moon': '月亮', 'The Sun': '太阳',
    'Judgement': '审判', 'The World': '世界',
    'Ace of Wands': '权杖一', 'Two of Wands': '权杖二', 'Three of Wands': '权杖三', 'Four of Wands': '权杖四',
    'Five of Wands': '权杖五', 'Six of Wands': '权杖六', 'Seven of Wands': '权杖七', 'Eight of Wands': '权杖八',
    'Nine of Wands': '权杖九', 'Ten of Wands': '权杖十', 'Page of Wands': '权杖侍从', 'Knight of Wands': '权杖骑士',
    'Queen of Wands': '权杖皇后', 'King of Wands': '权杖国王',
    'Ace of Cups': '圣杯一', 'Two of Cups': '圣杯二', 'Three of Cups': '圣杯三', 'Four of Cups': '圣杯四',
    'Five of Cups': '圣杯五', 'Six of Cups': '圣杯六', 'Seven of Cups': '圣杯七', 'Eight of Cups': '圣杯八',
    'Nine of Cups': '圣杯九', 'Ten of Cups': '圣杯十', 'Page of Cups': '圣杯侍从', 'Knight of Cups': '圣杯骑士',
    'Queen of Cups': '圣杯皇后', 'King of Cups': '圣杯国王',
    'Ace of Swords': '宝剑一', 'Two of Swords': '宝剑二', 'Three of Swords': '宝剑三', 'Four of Swords': '宝剑四',
    'Five of Swords': '宝剑五', 'Six of Swords': '宝剑六', 'Seven of Swords': '宝剑七', 'Eight of Swords': '宝剑八',
    'Nine of Swords': '宝剑九', 'Ten of Swords': '宝剑十', 'Page of Swords': '宝剑侍从', 'Knight of Swords': '宝剑骑士',
    'Queen of Swords': '宝剑皇后', 'King of Swords': '宝剑国王',
    'Ace of Pentacles': '钱币一', 'Two of Pentacles': '钱币二', 'Three of Pentacles': '钱币三', 'Four of Pentacles': '钱币四',
    'Five of Pentacles': '钱币五', 'Six of Pentacles': '钱币六', 'Seven of Pentacles': '钱币七', 'Eight of Pentacles': '钱币八',
    'Nine of Pentacles': '钱币九', 'Ten of Pentacles': '钱币十', 'Page of Pentacles': '钱币侍从', 'Knight of Pentacles': '钱币骑士',
    'Queen of Pentacles': '钱币皇后', 'King of Pentacles': '钱币国王'
};

let drawnCardsCount = 0;
const MAX_CARDS = 3;

async function initAuth0() {
    try {
        auth0Client = await createAuth0Client({
            domain: "dev-ncn7oqewamumy8j1.us.auth0.com",
            client_id: "CmHIpyhTNfaqFXVFGSv8M9mofMRPyi4U",
            cacheLocation: 'localstorage',
            useRefreshTokens: true
        });

        if (location.search.includes("state=") &&
            (location.search.includes("code=") || location.search.includes("error="))) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const isLoggedIn = await auth0Client.isAuthenticated();
        if (isLoggedIn) {
            isAuthenticated = true;
            loginButton.style.display = "none";
            logoutButton.style.display = "inline-block";
            drawButton.disabled = false;
        } else {
            isAuthenticated = false;
            loginButton.style.display = "inline-block";
            logoutButton.style.display = "none";
            drawButton.disabled = true;
        }
    } catch (e) {
        console.error("Auth0 initialization error:", e);
        console.log("Running in offline/demo mode");
        drawButton.disabled = false;
    }
}

async function login() {
    try {
        if (!auth0Client) {
            console.error("Auth0 client not initialized");
            alert("登录服务连接失败，已为您开启离线模式，可以直接抽牌。");
            return;
        }
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.href
        });
    } catch (e) {
        console.error("Login error:", e);
        alert("登录出错: " + e.message);
    }
}

async function logout() {
    await auth0Client.logout({
        returnTo: window.location.href
    });
}

function initDeck() {
    const deckContainer = document.getElementById('deck-container');
    if (!deckContainer) return;

    deckContainer.innerHTML = '';
    const totalCards = 78;
    // Spread cards over a smaller arc for a "fan" look
    const fanAngle = 90;
    const startAngle = -fanAngle / 2;
    const angleStep = fanAngle / (totalCards - 1);

    for (let i = 0; i < totalCards; i++) {
        // Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'deck-card-wrapper';
        const angle = startAngle + (i * angleStep);

        // Apply rotation to wrapper. Origin is handled by CSS.
        wrapper.style.transform = `rotate(${angle}deg)`;
        wrapper.dataset.baseAngle = angle; // Store base angle
        wrapper.style.zIndex = i;

        // Create Inner Card
        const card = document.createElement('div');
        card.className = 'deck-card';
        card.dataset.index = i;

        // Append inner to wrapper, wrapper to deck
        wrapper.appendChild(card);
        deckContainer.appendChild(wrapper);

        // Event listener on the inner card
        card.addEventListener('click', onCardClick);
    }

    // Drag / Rotation Logic
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let previousRotation = 0;

    const deckArea = document.querySelector('.deck-area');

    // Mouse Events
    deckArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        deckArea.classList.add('is-dragging'); // Disable hover
        startX = e.clientX;
        deckArea.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        // Sensitivity: 1px movement = 0.2 deg rotation
        const rotationDelta = deltaX * 0.2;
        currentRotation = previousRotation + rotationDelta;
        applyDeckRotation(currentRotation);
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            deckArea.classList.remove('is-dragging'); // Re-enable hover
            previousRotation = currentRotation;
            deckArea.style.cursor = 'grab';
        }
    });

    // Touch Events
    deckArea.addEventListener('touchstart', (e) => {
        isDragging = true;
        deckArea.classList.add('is-dragging');
        startX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        const rotationDelta = deltaX * 0.2;
        currentRotation = previousRotation + rotationDelta;
        applyDeckRotation(currentRotation);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
        deckArea.classList.remove('is-dragging');
        previousRotation = currentRotation;
    });
}

function applyDeckRotation(rotationOffset) {
    const wrappers = document.querySelectorAll('.deck-card-wrapper');
    wrappers.forEach(wrapper => {
        const baseAngle = parseFloat(wrapper.dataset.baseAngle);
        wrapper.style.transform = `rotate(${baseAngle + rotationOffset}deg)`;
    });
}

function onCardClick(e) {
    if (drawnCardsCount >= MAX_CARDS) return;

    const card = e.target.closest('.deck-card');
    if (!card || card.classList.contains('selected')) return;

    card.classList.add('selected');

    const slotIndex = drawnCardsCount;
    drawnCardsCount++;

    animateCardToSlot(card, slotIndex);

    // Auto hide deck if full
    if (drawnCardsCount >= MAX_CARDS) {
        setTimeout(() => {
            const deckArea = document.querySelector('.deck-area');
            if (deckArea) deckArea.classList.add('hidden');
            updateAnalyzeButtonVisibility();
        }, 1000);
    }
}

function animateCardToSlot(startElement, slotIndex) {
    const slot = document.querySelector(`.card-slot[data-index="${slotIndex}"]`);
    if (!slot) return;

    // startElement is .deck-card
    // wrapper is startElement.parentElement
    const wrapper = startElement.parentElement;

    const startRect = startElement.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();

    // Get rotation from the wrapper
    let initialTransform = 'rotate(0deg)';
    if (wrapper && wrapper.style.transform) {
        initialTransform = wrapper.style.transform;
    }

    const flyingCard = document.createElement('div');
    flyingCard.className = 'flying-card';
    flyingCard.style.top = `${startRect.top}px`;
    flyingCard.style.left = `${startRect.left}px`;
    flyingCard.style.transform = initialTransform;

    // Copy style
    flyingCard.style.backgroundImage = getComputedStyle(startElement).backgroundImage;
    flyingCard.style.backgroundSize = '100% 100%';
    flyingCard.style.backgroundRepeat = 'no-repeat';
    flyingCard.style.backgroundPosition = 'center';
    flyingCard.style.backgroundColor = '#111';
    flyingCard.style.border = '1px solid #555';
    flyingCard.style.borderRadius = '6px';
    flyingCard.style.zIndex = 2000;
    flyingCard.style.width = '90px'; // Match deck card size
    flyingCard.style.height = '153px';

    document.body.appendChild(flyingCard);

    // Force reflow
    flyingCard.getBoundingClientRect();

    // Animate to slot
    flyingCard.style.top = `${slotRect.top}px`;
    flyingCard.style.left = `${slotRect.left}px`;
    flyingCard.style.width = `${slotRect.width}px`;
    flyingCard.style.height = `${slotRect.height}px`;
    flyingCard.style.transform = 'rotate(0deg)';

    setTimeout(() => {
        flyingCard.remove();
        generateAndPlaceCard(slot);
    }, 800);
}

function generateAndPlaceCard(slot) {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const cardName = tarotCards[randomIndex];
    const isReversed = Math.random() < 0.5;

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    cardContainer.style.width = '100%';
    cardContainer.style.height = '100%';

    const cardInner = document.createElement('div');
    cardInner.className = 'card';

    const cardBack = document.createElement('div');
    cardBack.className = 'card-face card-back';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-face card-front';

    const img = new Image();
    // Use the 1-78 numbered naming convention
    // randomIndex is 0-77, so we add 1 to get 1-78
    const imageIndex = randomIndex + 1;
    img.src = `tarot_images/Tarot_Card_${imageIndex}.png`;
    img.alt = cardName;

    if (isReversed) {
        img.style.transform = 'rotate(180deg)';
    }

    const chineseName = tarotTranslations[cardName] || cardName;
    const positionText = isReversed ? '逆位' : '正位';

    img.onload = () => {
        cardFront.appendChild(img);
    };

    img.onerror = () => {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'card-fallback';

        const title = document.createElement('h3');
        title.innerText = chineseName;
        fallbackDiv.appendChild(title);

        const reversedLabel = document.createElement('div');
        reversedLabel.className = 'reversed-label';
        reversedLabel.innerText = positionText;
        fallbackDiv.appendChild(reversedLabel);

        cardFront.appendChild(fallbackDiv);
    };

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardContainer.appendChild(cardInner);

    // External Label for both image and fallback cases
    const labelDiv = document.createElement('div');
    labelDiv.className = 'card-label';
    labelDiv.innerHTML = `<strong>${chineseName}</strong><br><span>${positionText}</span>`;
    cardContainer.appendChild(labelDiv);

    slot.appendChild(cardContainer);

    setTimeout(() => {
        cardInner.classList.add('flipped');
        setTimeout(() => {
            labelDiv.classList.add('visible');
        }, 300);
    }, 100);
}

function resetGame() {
    drawnCardsCount = 0;
    document.querySelectorAll('.card-slot').forEach(slot => slot.innerHTML = '');

    // Show deck again
    const deckArea = document.querySelector('.deck-area');
    if (deckArea) deckArea.classList.remove('hidden');

    // Hide Analyze Button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) analyzeBtn.style.display = 'none';

    initDeck();
}

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
drawButton.addEventListener("click", resetGame);

// Update draw text to 'Restart'
drawButton.innerText = "重置牌阵";
drawButton.disabled = true; // Disabled until Auth/Init finishes

window.onload = () => {
    initAuth0();
    initDeck();
};

// --- Settings & AI Analysis Logic ---

const settingsBtn = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.querySelector('.close-modal');
const saveSettingsBtn = document.getElementById('save-settings');
const providerSelect = document.getElementById('provider-select');
const providerInput = document.getElementById('provider-key');

const analyzeBtn = document.getElementById('analyze-btn');
const analysisModal = document.getElementById('analysis-modal');
const closeAnalysis = document.querySelector('.close-analysis');
const analysisResult = document.getElementById('analysis-result');

const AI_PROVIDERS = {
    deepseek: {
        label: 'DeepSeek',
        storageKey: 'provider_api_key_deepseek',
        endpoint: 'https://api.deepseek.com/chat/completions',
        model: 'deepseek-chat'
    },
    glm: {
        label: 'GLM',
        storageKey: 'provider_api_key_glm',
        endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        model: 'glm-4-flash'
    },
    kimi: {
        label: 'Kimi',
        storageKey: 'provider_api_key_kimi',
        endpoint: 'https://api.moonshot.cn/v1/chat/completions',
        model: 'moonshot-v1-8k'
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
    if (!provider) return '';

    return localStorage.getItem(provider.storageKey) || '';
}

function hasProviderApiKey(providerId = getSelectedProvider()) {
    return Boolean(getProviderApiKey(providerId));
}

function updateProviderInput() {
    const providerId = providerSelect.value;
    const provider = AI_PROVIDERS[providerId];
    if (!provider) return;

    const apiKey = getProviderApiKey(providerId);
    providerInput.value = apiKey;
    providerInput.placeholder = providerId === 'glm' ? '填写 GLM API Key' : 'sk-...';

    const label = document.querySelector('label[for="provider-key"]');
    if (label) {
        label.innerText = `${provider.label} API Key:`;
    }
}

function updateAnalyzeButtonVisibility() {
    const actionBtn = document.getElementById('analyze-btn');
    if (!actionBtn) return;

    const shouldShow = drawnCardsCount >= MAX_CARDS && hasProviderApiKey();
    actionBtn.style.display = shouldShow ? 'inline-block' : 'none';
    actionBtn.classList.toggle('visible', shouldShow);
}

function openModal(modal) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('visible'));
}

function closeModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function openSettingsModal() {
    providerSelect.value = getSelectedProvider();
    updateProviderInput();
    openModal(settingsModal);
    requestAnimationFrame(() => {
        providerInput.focus();
        providerInput.select();
    });
}

// --- Sidebar & History Logic ---

const sidebar = document.getElementById('history-sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const historyList = document.getElementById('history-list');

// Toggle Sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
});

// Load History on Init
function initHistory() {
    renderHistoryList();
}

settingsBtn.addEventListener('click', openSettingsModal);

closeSettings.addEventListener('click', () => {
    closeModal(settingsModal);
});

settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        closeModal(settingsModal);
    }
});

providerSelect.addEventListener('change', () => {
    localStorage.setItem('selected_ai_provider', providerSelect.value);
    updateProviderInput();
    updateAnalyzeButtonVisibility();
});

saveSettingsBtn.addEventListener('click', () => {
    const providerId = providerSelect.value;
    const provider = AI_PROVIDERS[providerId];
    const apiKey = providerInput.value.trim();

    localStorage.setItem('selected_ai_provider', providerId);

    if (apiKey) {
        localStorage.setItem(provider.storageKey, apiKey);
    } else {
        localStorage.removeItem(provider.storageKey);
    }

    updateAnalyzeButtonVisibility();
    closeModal(settingsModal);
});

function getHistory() {
    const history = localStorage.getItem('tarot_history');
    return history ? JSON.parse(history) : [];
}

function saveHistory(item) {
    const history = getHistory();
    // Add new item to top
    history.unshift(item);
    // Limit to 50 items
    if (history.length > 50) history.pop();
    localStorage.setItem('tarot_history', JSON.stringify(history));
    renderHistoryList();
}

function renderHistoryList() {
    const history = getHistory();
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-history">暂无记录</div>';
        return;
    }

    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-date">${item.date}</div>
            <div class="history-summary">${item.summary}</div>
        `;
        div.addEventListener('click', () => {
            showAnalysis(item.result, true);
        });
        historyList.appendChild(div);
    });
}

function showAnalysis(markdownText, isHistory = false) {
    openModal(analysisModal);

    // Parse Markdown
    const htmlContent = marked.parse(markdownText);
    analysisResult.innerHTML = htmlContent;
}

// Modify Analyze Button Logic to use Markdown and History
// We need to overwrite the previous event listener. 
// Since we can't easily remove anonymous listeners, we'll just add a new one 
// and logic will run twice if we aren't careful. 
// IMPORTANT: In a real refactor we'd replace the function. 
// Here, we will clone the node to strip old listeners or just accept the duplicate logic risk?
// Better: We will replace the whole logic via override if possible.
// Actually, since I appended the previous logic, I can just replace that block or 
// use a flag. But cloning the node is safest to "reset" the button logic.

const newAnalyzeBtn = analyzeBtn.cloneNode(true);
analyzeBtn.parentNode.replaceChild(newAnalyzeBtn, analyzeBtn);

newAnalyzeBtn.addEventListener('click', async () => {
    const providerId = getSelectedProvider();
    const provider = AI_PROVIDERS[providerId];
    const apiKey = getProviderApiKey(providerId);

    if (!apiKey) {
        alert(`请先在设置中输入 ${provider.label} API Key`);
        openSettingsModal();
        return;
    }

    // Gather drawn cards
    const slots = document.querySelectorAll('.card-slot');
    let cardsData = [];
    slots.forEach(slot => {
        const label = slot.querySelector('.card-label');
        if (label) {
            const name = label.querySelector('strong').innerText;
            const position = label.querySelector('span').innerText;
            cardsData.push(`${name} [${position}]`);
        }
    });

    if (cardsData.length < 3) {
        alert('请先抽取完 3 张牌');
        return;
    }

    // Show Analysis Modal with loading state
    openModal(analysisModal);
    analysisResult.innerHTML = '<p>🔮 正在连接高维智慧，分析牌阵中...</p>';

    try {
        const interpretation = await callAIProviderAPI(providerId, apiKey, cardsData);

        // Show Parsed Markdown
        showAnalysis(interpretation);

        // Save to History
        const now = new Date();
        const dateStr = now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        saveHistory({
            date: dateStr,
            summary: cardsData.join(', '),
            result: interpretation
        });

    } catch (error) {
        analysisResult.innerHTML = `<p style="color: #ff6b6b;">连接中断: ${error.message}</p>`;
    }
});

// Update window.onload to include initHistory
const originalOnload = window.onload;
window.onload = () => {
    if (originalOnload) originalOnload();
    migrateLegacySettings();
    initHistory();
    updateAnalyzeButtonVisibility();
};

closeAnalysis.addEventListener('click', () => {
    closeModal(analysisModal);
});

async function callDeepSeekAPI(apiKey, cards) {
    return callAIProviderAPI('deepseek', apiKey, cards);
}

async function callAIProviderAPI(providerId, apiKey, cards) {
    const provider = AI_PROVIDERS[providerId];
    if (!provider) {
        throw new Error('Unsupported AI provider');
    }

    const prompt = `你是一位精通神秘学的塔罗牌大师。请根据以下牌阵为求问者进行解读：
    
    牌阵：选择之仇（三张牌，代表过去/现状/未来或 处境/行动/结果）
    1. ${cards[0]}
    2. ${cards[1]}
    3. ${cards[2]}
    
    请给出富有洞察力、温暖且指引性的简短解读（300字以内）。`;

    const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: provider.model,
            messages: [
                { "role": "system", "content": "You are a helpful tarot reader." },
                { "role": "user", "content": prompt }
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

function typewriterEffect(element, text) {
    element.innerText = '';
    let i = 0;
    const speed = 30;
    function type() {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
