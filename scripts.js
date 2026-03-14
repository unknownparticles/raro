
// script.js

let auth0Client = null;
let isAuthenticated = false;

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const drawButton = document.getElementById("draw-card");
const spreadSelect = document.getElementById('spread');
const tarotContainer = document.getElementById('tarot-container');
const deckInstruction = document.getElementById('deck-instruction');
const spreadDescription = document.getElementById('spread-description');
const questionInput = document.getElementById('question-input');
const questionDisplay = document.getElementById('question-display');
const deckArea = document.querySelector('.deck-area');

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

const SPREADS = {
    timeline: {
        name: '时间之流三张',
        cardCount: 3,
        description: '适合快速查看一件事的发展脉络，依次对应过去、现在、未来。',
        suitableFor: '适合问：事情会怎么发展、目前处在什么阶段、短期走势如何。',
        positions: [
            { title: '过去', meaning: '事件的起因、已发生的影响' },
            { title: '现在', meaning: '你当前所处的状态与核心课题' },
            { title: '未来', meaning: '若保持现状，接下来的趋势' }
        ],
        interpretationGuide: '重点串联时间线，解释过去如何作用于当下，以及未来趋势如何被改变。'
    },
    decision: {
        name: '抉择指引三张',
        cardCount: 3,
        description: '适合面对选择、纠结或卡住的时候，帮助看清现状、阻碍与建议。',
        suitableFor: '适合问：要不要做某个决定、卡点在哪里、下一步该怎么做。',
        positions: [
            { title: '现状', meaning: '问题当前的真实局面' },
            { title: '阻碍', meaning: '让事情停滞或反复的关键因素' },
            { title: '建议', meaning: '最值得采取的态度或行动' }
        ],
        interpretationGuide: '重点分析阻碍来源，并给出明确、可执行的建议，不要只复述牌义。'
    },
    relationship: {
        name: '关系洞察五张',
        cardCount: 5,
        description: '适合感情、人际、合作关系，帮助看清双方状态、关系核心与后续走向。',
        suitableFor: '适合问：对方怎么想、关系卡在哪、这段关系会往哪里走。',
        positions: [
            { title: '你的位置', meaning: '你在这段关系中的状态与需求' },
            { title: '对方的位置', meaning: '对方当前的态度、动机或顾虑' },
            { title: '关系核心', meaning: '这段关系正在经历的本质课题' },
            { title: '挑战', meaning: '需要面对的矛盾、误解或现实压力' },
            { title: '走向', meaning: '若当前模式持续，关系可能的发展' }
        ],
        interpretationGuide: '重点比较双方差异，指出关系核心和现实挑战，并说明走向是如何形成的。'
    },
    career: {
        name: '事业路径五张',
        cardCount: 5,
        description: '适合工作、转职、项目推进，帮助看清现状、优势、盲点与下一步策略。',
        suitableFor: '适合问：工作发展、转职机会、项目推进、职业优势与风险。',
        positions: [
            { title: '现状', meaning: '你在事业或项目中的当前阶段' },
            { title: '优势', meaning: '你可依靠的资源、能力或外部助力' },
            { title: '盲点', meaning: '容易忽略的风险、心态或判断偏差' },
            { title: '行动', meaning: '最值得优先采取的行动方向' },
            { title: '结果', meaning: '若按当前趋势推进，最可能出现的结果' }
        ],
        interpretationGuide: '重点把优势、盲点和行动建议连成一条清晰策略线。'
    }
};

let drawnCardsCount = 0;
let preSelectedCard = null;
let deckInteractionBound = false;
let currentQuestion = '';
let isQuestionLocked = false;
let deckCardOrder = [];
let clarificationSuggestion = null;
let clarificationRequested = false;
let clarificationDrawn = false;

function isMobileDeckMode() {
    return window.matchMedia('(max-width: 768px)').matches;
}

function getSelectedSpread() {
    const spreadId = spreadSelect.value;
    return SPREADS[spreadId] || SPREADS.timeline;
}

function getTargetDrawCount() {
    return getSelectedSpread().cardCount + (clarificationRequested || clarificationDrawn ? 1 : 0);
}

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function initializeDeckOrder() {
    deckCardOrder = shuffle(Array.from({ length: tarotCards.length }, (_, index) => index));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateQuestionUI() {
    questionInput.disabled = isQuestionLocked;
    questionDisplay.classList.toggle('hidden', !isQuestionLocked);
    questionDisplay.innerHTML = isQuestionLocked ? `<strong>本次问题：</strong> ${escapeHtml(currentQuestion)}` : '';
    drawButton.innerText = isQuestionLocked ? '重置牌阵' : '开始抽牌';
    updateDeckInstruction();
}

function syncDeckVisibility() {
    if (!deckArea) return;

    const shouldShow = isQuestionLocked && drawnCardsCount < getTargetDrawCount();
    deckArea.classList.toggle('hidden', !shouldShow);
}

function updateDeckInstruction() {
    const spread = getSelectedSpread();
    if (!isQuestionLocked) {
        deckInstruction.innerText = `请先输入问题，再抽取 ${spread.cardCount} 张牌`;
        return;
    }

    if (clarificationRequested && !clarificationDrawn) {
        const focus = clarificationSuggestion?.focus || '当前最模糊的部分';
        deckInstruction.innerText = `建议补 1 张澄清牌：请围绕“${focus}”再抽一张未抽过的牌`;
        return;
    }

    deckInstruction.innerText = `请凭直觉抽取 ${spread.cardCount} 张牌`;
}

function updateClarifierPanel(parsedResult = null) {
    const panel = document.getElementById('clarifier-panel');
    const message = document.getElementById('clarifier-message');
    const button = document.getElementById('clarifier-button');

    clarificationSuggestion = parsedResult ? {
        recommend: Boolean(parsedResult.recommendClarifier),
        reason: parsedResult.clarifierReason || '',
        focus: parsedResult.clarifierFocus || ''
    } : null;

    if (!panel || !message || !button) return;

    if (!parsedResult || clarificationDrawn) {
        panel.classList.add('hidden');
        message.innerHTML = '';
        button.style.display = 'none';
        return;
    }

    if (clarificationSuggestion.recommend) {
        const focusText = clarificationSuggestion.focus ? `聚焦点：${clarificationSuggestion.focus}` : '聚焦点：当前牌阵最模糊的核心。';
        message.innerHTML = `建议是否补牌：建议补 1 张澄清牌。<br>${clarificationSuggestion.reason || '当前牌阵存在一个尚未完全展开的关键点。'}<br>${focusText}`;
        button.style.display = 'inline-block';
    } else {
        message.innerHTML = `建议是否补牌：当前牌阵信息已经足够完整，不建议继续补牌。${clarificationSuggestion.reason ? `<br>${clarificationSuggestion.reason}` : ''}`;
        button.style.display = 'none';
    }

    panel.classList.remove('hidden');
}

function addClarificationSlot() {
    const focus = clarificationSuggestion?.focus || '当前牌阵最需要补充说明的部分';
    const slot = document.createElement('div');
    slot.className = 'card-slot clarification-slot';
    slot.dataset.index = String(getSelectedSpread().cardCount);
    slot.dataset.positionTitle = '澄清牌';
    slot.dataset.positionMeaning = focus;
    slot.innerHTML = `
        <div class="slot-placeholder">
            <strong>澄清牌</strong>
            <span>${focus}</span>
        </div>
    `;
    tarotContainer.appendChild(slot);
    tarotContainer.dataset.cardCount = String(getTargetDrawCount());
}

function renderSpreadLayout() {
    const spread = getSelectedSpread();
    tarotContainer.innerHTML = '';
    tarotContainer.dataset.cardCount = String(getTargetDrawCount());

    spread.positions.forEach((position, index) => {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        slot.dataset.index = String(index);
        slot.dataset.positionTitle = position.title;
        slot.dataset.positionMeaning = position.meaning;
        slot.innerHTML = `
            <div class="slot-placeholder">
                <strong>${position.title}</strong>
                <span>${position.meaning}</span>
            </div>
        `;
        tarotContainer.appendChild(slot);
    });

    if (clarificationRequested || clarificationDrawn) {
        addClarificationSlot();
    }

    spreadDescription.innerHTML = `<strong>${spread.name}</strong>：${spread.description}<br>${spread.suitableFor}`;
    updateDeckInstruction();
}

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
    if (deckCardOrder.length === 0) initializeDeckOrder();
    deckArea.classList.toggle('mobile-stack', isMobileDeckMode());

    deckContainer.innerHTML = '';
    const totalCards = 78;
    const isMobile = isMobileDeckMode();
    const fanAngle = 90;
    const startAngle = -fanAngle / 2;
    const angleStep = fanAngle / (totalCards - 1);

    for (let i = 0; i < totalCards; i++) {
        // Create Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'deck-card-wrapper';
        const angle = startAngle + (i * angleStep);

        if (isMobile) {
            const offsetX = ((i % 5) - 2) * 2;
            const offsetY = -Math.min(i, 14) * 0.9;
            const tilt = ((i % 5) - 2) * 1.4;
            const compactTransform = `translate(${offsetX}px, ${offsetY}px) rotate(${tilt}deg)`;
            wrapper.style.transform = compactTransform;
            wrapper.dataset.baseTransform = compactTransform;
            wrapper.dataset.compact = 'true';
        } else {
            wrapper.style.transform = `rotate(${angle}deg)`;
            wrapper.dataset.baseAngle = angle;
            wrapper.dataset.compact = 'false';
        }

        wrapper.style.zIndex = i;

        // Create Inner Card
        const card = document.createElement('div');
        card.className = 'deck-card';
        card.dataset.index = i;
        card.dataset.cardIndex = String(deckCardOrder[i]);

        // Append inner to wrapper, wrapper to deck
        wrapper.appendChild(card);
        deckContainer.appendChild(wrapper);

        // Event listener on the inner card
        card.addEventListener('click', onCardClick);
    }

    if (deckInteractionBound) return;

    // Drag / Rotation Logic
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let previousRotation = 0;

    // Mouse Events
    deckArea.addEventListener('mousedown', (e) => {
        if (isMobileDeckMode()) return;
        isDragging = true;
        deckArea.classList.add('is-dragging');
        startX = e.clientX;
        deckArea.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (isMobileDeckMode()) return;
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const rotationDelta = deltaX * 0.2;
        currentRotation = previousRotation + rotationDelta;
        applyDeckRotation(currentRotation);
    });

    window.addEventListener('mouseup', () => {
        if (isMobileDeckMode()) return;
        if (isDragging) {
            isDragging = false;
            deckArea.classList.remove('is-dragging');
            previousRotation = currentRotation;
            deckArea.style.cursor = 'grab';
        }
    });

    // Touch Events
    deckArea.addEventListener('touchstart', (e) => {
        if (isMobileDeckMode()) return;
        isDragging = true;
        deckArea.classList.add('is-dragging');
        startX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isMobileDeckMode()) return;
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        const rotationDelta = deltaX * 0.2;
        currentRotation = previousRotation + rotationDelta;
        applyDeckRotation(currentRotation);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        if (isMobileDeckMode()) return;
        isDragging = false;
        deckArea.classList.remove('is-dragging');
        previousRotation = currentRotation;
    });

    deckInteractionBound = true;
}

function applyDeckRotation(rotationOffset) {
    const wrappers = document.querySelectorAll('.deck-card-wrapper');
    wrappers.forEach(wrapper => {
        if (wrapper.dataset.compact === 'true') {
            wrapper.style.transform = wrapper.dataset.baseTransform;
            return;
        }

        const baseAngle = parseFloat(wrapper.dataset.baseAngle);
        wrapper.style.transform = `rotate(${baseAngle + rotationOffset}deg)`;
    });
}

function clearPreSelectedCard() {
    if (preSelectedCard) {
        preSelectedCard.classList.remove('pre-selected');
        preSelectedCard = null;
    }
}

function onCardClick(e) {
    if (!isQuestionLocked) return;
    if (drawnCardsCount >= getTargetDrawCount()) return;

    const card = e.target.closest('.deck-card');
    if (!card || card.classList.contains('selected')) return;

    if (preSelectedCard !== card) {
        clearPreSelectedCard();
        card.classList.add('pre-selected');
        preSelectedCard = card;
        return;
    }

    clearPreSelectedCard();
    card.classList.add('selected');

    const slotIndex = drawnCardsCount;
    const cardIndex = Number(card.dataset.cardIndex);
    drawnCardsCount++;

    animateCardToSlot(card, slotIndex, cardIndex);

    // Auto hide deck if full
    if (drawnCardsCount >= getTargetDrawCount()) {
        setTimeout(() => {
            syncDeckVisibility();
            updateAnalyzeButtonVisibility();
            if (clarificationRequested && !clarificationDrawn) {
                clarificationDrawn = true;
                clarificationRequested = false;
                updateDeckInstruction();
                analyzeCurrentReading(true);
            }
        }, 1000);
    }
}

function animateCardToSlot(startElement, slotIndex, cardIndex) {
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
        generateAndPlaceCard(slot, cardIndex);
    }, 800);
}

function generateAndPlaceCard(slot, cardIndex) {
    const cardName = tarotCards[cardIndex];
    const isReversed = Math.random() < 0.5;
    const positionTitle = slot.dataset.positionTitle || '牌位';
    const positionMeaning = slot.dataset.positionMeaning || '';

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
    const imageIndex = cardIndex + 1;
    img.src = `tarot_images/Tarot_Card_${imageIndex}.webp`;
    img.alt = cardName;
    img.decoding = 'async';
    img.fetchPriority = 'high';

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

    if (isReversed) {
        img.style.transform = 'rotate(180deg)';
    }

    const chineseName = tarotTranslations[cardName] || cardName;
    const positionText = isReversed ? '逆位' : '正位';

    img.onload = () => {
        cardFront.appendChild(img);
    };

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    cardContainer.appendChild(cardInner);

    // External Label for both image and fallback cases
    const labelDiv = document.createElement('div');
    labelDiv.className = 'card-label';
    labelDiv.innerHTML = `<strong>${chineseName}</strong><span class="label-position">${positionTitle}</span><span>${positionText}</span>`;
    cardContainer.appendChild(labelDiv);

    slot.innerHTML = '';
    slot.appendChild(cardContainer);
    slot.dataset.cardName = chineseName;
    slot.dataset.orientation = positionText;
    slot.dataset.positionMeaning = positionMeaning;

    setTimeout(() => {
        cardInner.classList.add('flipped');
        setTimeout(() => {
            labelDiv.classList.add('visible');
        }, 300);
    }, 100);
}

function resetGame() {
    drawnCardsCount = 0;
    clearPreSelectedCard();
    initializeDeckOrder();
    currentQuestion = '';
    isQuestionLocked = false;
    questionInput.value = '';
    clarificationSuggestion = null;
    clarificationRequested = false;
    clarificationDrawn = false;
    renderSpreadLayout();

    // Hide Analyze Button
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) analyzeBtn.style.display = 'none';

    updateQuestionUI();
    syncDeckVisibility();
    updateClarifierPanel(null);
    initDeck();
}

function handleDrawButtonClick() {
    if (isQuestionLocked) {
        resetGame();
        return;
    }

    const question = questionInput.value.trim();
    if (!question) {
        alert('请先输入你想占卜的问题');
        questionInput.focus();
        return;
    }

    currentQuestion = question;
    isQuestionLocked = true;
    clearPreSelectedCard();
    clarificationSuggestion = null;
    clarificationRequested = false;
    clarificationDrawn = false;
    renderSpreadLayout();
    updateQuestionUI();
    updateClarifierPanel(null);
    syncDeckVisibility();
    updateAnalyzeButtonVisibility();
}

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
drawButton.addEventListener("click", handleDrawButtonClick);
spreadSelect.addEventListener('change', () => {
    localStorage.setItem('selected_tarot_spread', spreadSelect.value);
    resetGame();
});

drawButton.disabled = true; // Disabled until Auth/Init finishes

window.onload = () => {
    const savedSpread = localStorage.getItem('selected_tarot_spread');
    if (savedSpread && SPREADS[savedSpread]) {
        spreadSelect.value = savedSpread;
    }
    renderSpreadLayout();
    updateQuestionUI();
    syncDeckVisibility();
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
const providerHelp = document.getElementById('provider-help');

const analyzeBtn = document.getElementById('analyze-btn');
const analysisModal = document.getElementById('analysis-modal');
const closeAnalysis = document.querySelector('.close-analysis');
const analysisResult = document.getElementById('analysis-result');
const clarifierButton = document.getElementById('clarifier-button');

const AI_PROVIDERS = {
    deepseek: {
        label: 'DeepSeek',
        storageKey: 'provider_api_key_deepseek',
        endpoint: 'https://api.deepseek.com/chat/completions',
        model: 'deepseek-chat',
        keyUrl: 'https://platform.deepseek.com/api_keys',
        keyHint: '打开 DeepSeek 控制台创建 API key，创建后复制到这里。可能需要先完成实名认证。'
    },
    glm: {
        label: 'GLM',
        storageKey: 'provider_api_key_glm',
        endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        model: 'glm-4-flash',
        keyUrl: 'https://bigmodel.cn/usercenter/proj-mgmt/apikeys',
        keyHint: '打开智谱 BigModel 控制台创建 API key，创建后复制到这里。可能需要先完成实名认证。'
    },
    kimi: {
        label: 'Kimi',
        storageKey: 'provider_api_key_kimi',
        endpoint: 'https://api.moonshot.cn/v1/chat/completions',
        model: 'moonshot-v1-8k',
        keyUrl: 'https://platform.moonshot.cn/console/api-keys',
        keyHint: '打开 Moonshot 控制台创建 API key，创建后复制到这里。可能需要先完成实名认证。'
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

    if (providerHelp) {
        providerHelp.innerHTML = `
            <strong>${provider.label} 获取方式</strong>
            <span>${provider.keyHint}</span>
            <a href="${provider.keyUrl}" target="_blank" rel="noopener noreferrer">${provider.keyUrl}</a>
        `;
    }
}

function updateAnalyzeButtonVisibility() {
    const actionBtn = document.getElementById('analyze-btn');
    if (!actionBtn) return;

    const shouldShow = isQuestionLocked
        && drawnCardsCount >= getSelectedSpread().cardCount
        && hasProviderApiKey();
    actionBtn.style.display = shouldShow ? 'inline-block' : 'none';
    actionBtn.classList.toggle('visible', shouldShow);
}

function openModal(modal) {
    if (modal.hideTimer) {
        clearTimeout(modal.hideTimer);
        modal.hideTimer = null;
    }
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('visible'));
}

function closeModal(modal) {
    modal.classList.remove('visible');
    if (modal.hideTimer) {
        clearTimeout(modal.hideTimer);
    }
    modal.hideTimer = setTimeout(() => {
        modal.classList.add('hidden');
        modal.hideTimer = null;
    }, 300);
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
            <div class="history-summary">${escapeHtml(item.summary)}</div>
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
    if (isHistory) {
        updateClarifierPanel(null);
    }
}

function getCurrentCardsData() {
    return Array.from(document.querySelectorAll('.card-slot'))
        .filter(slot => slot.dataset.cardName)
        .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index))
        .map(slot => ({
            name: slot.dataset.cardName,
            position: slot.dataset.positionTitle,
            orientation: slot.dataset.orientation,
            meaning: slot.dataset.positionMeaning
        }));
}

function extractJsonFromText(text) {
    const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);
    if (fencedMatch) return fencedMatch[1].trim();

    const objectMatch = text.match(/\{[\s\S]*\}/);
    return objectMatch ? objectMatch[0] : text;
}

function parseAIReadingResponse(rawText) {
    try {
        const parsed = JSON.parse(extractJsonFromText(rawText));
        return {
            markdown: parsed.markdown || rawText,
            recommendClarifier: Boolean(parsed.recommendClarifier),
            clarifierReason: parsed.clarifierReason || '',
            clarifierFocus: parsed.clarifierFocus || ''
        };
    } catch (error) {
        return {
            markdown: rawText,
            recommendClarifier: false,
            clarifierReason: '',
            clarifierFocus: ''
        };
    }
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

async function analyzeCurrentReading(isClarificationPass = false) {
    const providerId = getSelectedProvider();
    const provider = AI_PROVIDERS[providerId];
    const apiKey = getProviderApiKey(providerId);
    const spread = getSelectedSpread();

    if (!apiKey) {
        alert(`请先在设置中输入 ${provider.label} API Key`);
        openSettingsModal();
        return;
    }

    if (!currentQuestion) {
        alert('请先输入你的问题，再开始抽牌');
        questionInput.focus();
        return;
    }

    const cardsData = getCurrentCardsData();

    if (cardsData.length < getTargetDrawCount()) {
        alert(`请先抽取完 ${getTargetDrawCount()} 张牌`);
        return;
    }

    // Show Analysis Modal with loading state
    openModal(analysisModal);
    analysisResult.innerHTML = '<p>🔮 正在连接高维智慧，分析牌阵中...</p>';
    updateClarifierPanel(null);

    try {
        const interpretation = await callAIProviderAPI(providerId, apiKey, spread, cardsData, isClarificationPass);
        const parsedResult = parseAIReadingResponse(interpretation);

        // Show Parsed Markdown
        showAnalysis(parsedResult.markdown);
        updateClarifierPanel(parsedResult);

        // Save to History
        const now = new Date();
        const dateStr = now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        saveHistory({
            date: dateStr,
            summary: `问题：${currentQuestion} · ${spread.name}${isClarificationPass ? ' · 已补澄清牌' : ''}`,
            result: parsedResult.markdown
        });

    } catch (error) {
        analysisResult.innerHTML = `<p style="color: #ff6b6b;">连接中断: ${error.message}</p>`;
        updateClarifierPanel(null);
    }
}

newAnalyzeBtn.addEventListener('click', () => {
    analyzeCurrentReading(false);
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

clarifierButton.addEventListener('click', () => {
    if (!clarificationSuggestion?.recommend || clarificationDrawn || clarificationRequested) return;

    clarificationRequested = true;
    addClarificationSlot();
    updateDeckInstruction();
    updateClarifierPanel(null);
    syncDeckVisibility();
    updateAnalyzeButtonVisibility();
    closeModal(analysisModal);
});

async function callDeepSeekAPI(apiKey, cards) {
    return callAIProviderAPI('deepseek', apiKey, getSelectedSpread(), cards, false);
}

async function callAIProviderAPI(providerId, apiKey, spread, cards, isClarificationPass = false) {
    const provider = AI_PROVIDERS[providerId];
    if (!provider) {
        throw new Error('Unsupported AI provider');
    }

    const cardsText = cards.map((card, index) => (
        `${index + 1}. ${card.name} [${card.position} / ${card.orientation}] - ${card.meaning}`
    )).join('\n');

    const clarificationRule = isClarificationPass
        ? '本次已经补过 1 张澄清牌，不允许再建议继续补牌。'
        : '只有当原牌阵存在关键歧义、答案被两种方向同时支持，或最后建议缺乏明确落点时，才建议补 1 张澄清牌；否则明确说明不需要补牌。';

    const prompt = `你是一位精通神秘学的塔罗牌大师。请根据以下牌阵为求问者进行解读：

求问者的问题：${currentQuestion}

牌阵名称：${spread.name}
牌阵说明：${spread.description}
适合提问：${spread.suitableFor}
解析要求：${spread.interpretationGuide}
补牌规则：${clarificationRule}

牌位与抽牌结果：
${cardsText}

请严格输出 JSON，不要输出任何 JSON 之外的文字，格式如下：
{
  "markdown": "解读正文，使用 Markdown。需要包含：整体局势、逐张解析、建议提醒。",
  "recommendClarifier": true,
  "clarifierReason": "为什么需要或不需要补牌。若不需要，也要写明理由。",
  "clarifierFocus": "如果需要补牌，最适合围绕什么焦点补 1 张；如果不需要，返回空字符串"
}

要求：
1. markdown 必须紧扣“求问者的问题”，不能只讲抽象牌义。
2. 逐张解析必须结合牌位职责，而不是只解释正逆位。
3. 整体语气温暖、具体、有洞察力，markdown 控制在 500 字以内。
4. 若 recommendClarifier 为 true，clarifierFocus 必须是一个非常具体的澄清角度。
5. 若本次已经补过牌，则 recommendClarifier 必须为 false。`;

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
