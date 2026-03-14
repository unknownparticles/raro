const tarotCards = [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant',
    'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice',
    'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star',
    'The Moon', 'The Sun', 'Judgement', 'The World',
    'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands',
    'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands',
    'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands',
    'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
    'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
    'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
    'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords',
    'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords',
    'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords',
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
        description: '过去、现在、未来'
    },
    decision: {
        name: '抉择指引三张',
        cardCount: 3,
        description: '现状、阻碍、建议'
    },
    relationship: {
        name: '关系洞察五张',
        cardCount: 5,
        description: '双方状态、关系核心与走向'
    },
    career: {
        name: '事业路径五张',
        cardCount: 5,
        description: '现状、优势、盲点、行动、结果'
    }
};

const {
    AI_PROVIDERS,
    getSelectedProvider,
    getProviderApiKey,
    setProviderApiKey,
    saveHistory,
    callProvider
} = window.TarotAIShared;

const spreadSelect = document.getElementById('spread-select');
const spreadGrid = document.getElementById('spread-grid');
const spreadCards = Array.from(document.querySelectorAll('.spread-card'));
const questionInput = document.getElementById('question-input');
const questionShell = document.getElementById('question-shell');
const introTitle = document.getElementById('intro-title');
const introSubtitle = document.getElementById('intro-subtitle');
const phaseHint = document.getElementById('phase-hint');
const mirrorButton = document.getElementById('mirror-button');
const voiceButton = document.getElementById('voice-button');
const startButton = document.getElementById('start-button');
const analyzeButton = document.getElementById('analyze-button');
const voiceStatus = document.getElementById('voice-status');
const gestureStatus = document.getElementById('gesture-status');
const selectionStatus = document.getElementById('selection-status');
const deckStage = document.getElementById('deck-stage');
const pickedCards = document.getElementById('picked-cards');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const analysisModal = document.getElementById('analysis-modal');
const analysisCard = analysisModal.querySelector('.large-card');
const analysisGestureHint = document.getElementById('analysis-gesture-hint');
const analysisResult = document.getElementById('analysis-result');
const providerSelect = document.getElementById('provider-select');
const providerInput = document.getElementById('provider-key');
const providerHelp = document.getElementById('provider-help');
const saveSettings = document.getElementById('save-settings');
const gestureVideo = document.getElementById('gesture-video');
const gestureOverlay = document.getElementById('gesture-overlay');

let deckOrder = [];
let selectedCards = [];
let focusedDeckIndex = 0;
let armedDeckIndex = null;
let speechRecognition = null;
let isListening = false;
let isSpeechStarting = false;
let isSpeechStopping = false;
let gestureAssetsPromise = null;
let handLandmarker = null;
let gestureStream = null;
let gestureLoopId = null;
let lastVideoTime = -1;
let gestureCooldownUntil = 0;
let gestureState = {
    lastGesture: '',
    openPalmAt: 0,
    palmX: 0,
    palmY: 0,
    palmSize: 0,
    lastSeenAt: 0,
    moveAnchorX: 0,
    moveAnchorY: 0,
    moveAnchorAt: 0
};
let pointerStartX = 0;
let pointerActive = false;
let pendingScrollDirection = 0;
let scrollAnimationTimer = null;
let lastScrollDirection = -1;
let isMirroredPreview = localStorage.getItem('cyber_mirror_preview') !== 'off';
let previousFocusedDeckIndex = 0;
let isSessionActive = false;
let isAnalyzing = false;
let analysisAutoTimer = null;
let hasAnalysisResult = false;
let flowStage = 'spread';
let lastLoggedGestureSignature = '';
let okPoseStartedAt = 0;
let speechLanguageIndex = 0;
let isSpeechUnavailable = false;
let copyGestureCooldownUntil = 0;
let fistHoldStartedAt = 0;
let fistHoldLostAt = 0;
let fistHoldLostAt = 0;

const SPEECH_LANGUAGE_CANDIDATES = ['zh-CN', navigator.language || 'en-US', 'en-US']
    .filter((value, index, array) => value && array.indexOf(value) === index);

const SPREAD_ORDER = ['timeline', 'decision', 'relationship', 'career'];
const PHASE_HINTS = {
    spread: {
        title: '先选择牌阵',
        subtitle: '比出 1 / 2 / 3 / 4 选择牌阵，再用 OK 确认进入提问',
        hint: '当前阶段：选牌阵。手势：1/2/3/4 选择，OK 确认。'
    },
    question: {
        title: '输入你想问的问题',
        subtitle: '确认牌阵后才进入提问',
        hint: '当前阶段：输入问题。检测到已输入内容后，OK 开始抽牌。'
    },
    reading: {
        title: '开始抽牌',
        subtitle: '只保留牌堆与牌面',
        hint: '当前阶段：抽牌。手势：张手左右切牌，先张手再握拳抓中间牌。'
    },
    result: {
        title: '查看结果',
        subtitle: '牌已抽满并开始解析',
        hint: '当前阶段：结果。手势：张手上下滚动，握拳保持 2 秒重置，两手矩形复制。'
    }
};

function getVisibleDeckIndexes(centerIndex) {
    const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];
    return visibleOffsets.map(offset => ({
        offset,
        deckIndex: (centerIndex + offset + deckOrder.length) % deckOrder.length
    }));
}

function waitForVideoReady(video) {
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        let settled = false;
        const timeoutId = setTimeout(() => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error('video metadata timeout'));
        }, 4000);

        const onReady = () => {
            if (settled) return;
            if (video.videoWidth <= 0 || video.videoHeight <= 0) return;
            settled = true;
            cleanup();
            resolve();
        };

        const onError = () => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error('video metadata error'));
        };

        function cleanup() {
            clearTimeout(timeoutId);
            video.removeEventListener('loadedmetadata', onReady);
            video.removeEventListener('loadeddata', onReady);
            video.removeEventListener('canplay', onReady);
            video.removeEventListener('error', onError);
        }

        video.addEventListener('loadedmetadata', onReady);
        video.addEventListener('loadeddata', onReady);
        video.addEventListener('canplay', onReady);
        video.addEventListener('error', onError);
    });
}

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function getSpread() {
    return SPREADS[spreadSelect.value] || SPREADS.timeline;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateProviderUI() {
    const providerId = providerSelect.value;
    const provider = AI_PROVIDERS[providerId];
    providerInput.value = getProviderApiKey(providerId);
    providerHelp.innerHTML = `<strong>${provider.label}</strong><br>${provider.keyHint}<br><a href="${provider.keyUrl}" target="_blank" rel="noopener noreferrer">${provider.keyUrl}</a>`;
}

function applyMirrorState() {
    gestureVideo.classList.toggle('is-mirrored', isMirroredPreview);
    gestureOverlay.classList.toggle('is-mirrored', isMirroredPreview);
    mirrorButton.textContent = isMirroredPreview ? '关闭镜像' : '镜像预览';
}

function debugLog(event, detail) {
    console.log(`[CyberTarot] ${event}`, detail || '');
}

function setResetArming(active) {
    analysisCard.classList.toggle('is-reset-arming', active);
    if (analysisGestureHint) analysisGestureHint.classList.toggle('is-warning', active);
}

function setFlowStage(stage) {
    flowStage = stage;
    okPoseStartedAt = 0;
    const config = PHASE_HINTS[stage];
    if (config) {
        introTitle.textContent = config.title;
        introSubtitle.textContent = config.subtitle;
        if (phaseHint) phaseHint.textContent = config.hint;
    }
    questionShell.classList.toggle('is-hidden', stage !== 'question');
    debugLog('phase', { stage });
}

function getSpreadIndex() {
    return Math.max(0, SPREAD_ORDER.indexOf(spreadSelect.value));
}

function setSpreadByIndex(index) {
    const clamped = Math.max(0, Math.min(SPREAD_ORDER.length - 1, index));
    spreadSelect.value = SPREAD_ORDER[clamped];
    localStorage.setItem('selected_tarot_spread', spreadSelect.value);
    syncSpreadCards();
    debugLog('select_spread', { index: clamped + 1, spread: spreadSelect.value });
}

function updateSelectionStatus() {
    const target = getSpread().cardCount;
    selectionStatus.textContent = `${selectedCards.length} / ${target}`;
    analyzeButton.disabled = selectedCards.length !== target;
}

function renderPickedCards() {
    pickedCards.innerHTML = selectedCards.length
        ? selectedCards.map(card => `
            <article class="picked-card">
                <div class="picked-card-media">
                    <img src="tarot_images/Tarot_Card_${card.cardIndex + 1}.webp" alt="${escapeHtml(card.name)}">
                </div>
                <div class="picked-card-meta">
                    <strong>${escapeHtml(card.name)}</strong>
                    <span>${escapeHtml(card.position)}</span>
                    <span>${card.orientation}</span>
                </div>
            </article>
        `).join('')
        : '';
    document.body.classList.toggle('results-ready', selectedCards.length >= getSpread().cardCount);
}

function getNextAvailableIndex(startIndex = focusedDeckIndex) {
    const total = deckOrder.length;
    for (let offset = 0; offset < total; offset++) {
        const index = (startIndex + offset + total) % total;
        if (!selectedCards.some(card => card.cardIndex === deckOrder[index])) {
            return index;
        }
    }
    return -1;
}

function shiftFocus(delta) {
    if (flowStage === 'spread') {
        setSpreadByIndex(getSpreadIndex() + (delta > 0 ? 1 : -1));
        return;
    }
    if (selectedCards.length >= getSpread().cardCount) return;
    const total = deckOrder.length;
    const previousIndex = focusedDeckIndex;
    let nextIndex = focusedDeckIndex;
    for (let i = 0; i < total; i++) {
        nextIndex = (nextIndex + delta + total) % total;
        if (!selectedCards.some(card => card.cardIndex === deckOrder[nextIndex])) {
            previousFocusedDeckIndex = focusedDeckIndex;
            focusedDeckIndex = nextIndex;
            pendingScrollDirection = delta;
            lastScrollDirection = delta;
            debugLog('action', {
                type: 'shift_focus',
                stage: flowStage,
                delta,
                from: previousIndex,
                to: nextIndex
            });
            renderDeck();
            return;
        }
    }
}

function renderDeck() {
    deckStage.innerHTML = '';
    if (!questionInput.value.trim() || !isSessionActive) {
        updateSelectionStatus();
        renderPickedCards();
        return;
    }

    const target = getSpread().cardCount;
    if (selectedCards.length >= target) {
        updateSelectionStatus();
        renderPickedCards();
        return;
    }

    focusedDeckIndex = getNextAvailableIndex(focusedDeckIndex);
    const shouldAnimateScroll = pendingScrollDirection !== 0;
    const animationDirection = pendingScrollDirection;
    const previousItems = getVisibleDeckIndexes(previousFocusedDeckIndex);
    const nextItems = getVisibleDeckIndexes(focusedDeckIndex);
    const previousOffsetByDeckIndex = new Map(previousItems.map(item => [item.deckIndex, item.offset]));
    const nextOffsetByDeckIndex = new Map(nextItems.map(item => [item.deckIndex, item.offset]));
    const unionDeckIndexes = Array.from(new Set([
        ...previousItems.map(item => item.deckIndex),
        ...nextItems.map(item => item.deckIndex)
    ]));

    const cardsToAnimate = unionDeckIndexes.map(deckIndex => {
        const cardIndex = deckOrder[deckIndex];
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'stage-card';
        if (nextOffsetByDeckIndex.get(deckIndex) === 0) card.classList.add('is-focus');
        if (armedDeckIndex === deckIndex) card.classList.add('is-armed');
        if (selectedCards.some(item => item.cardIndex === cardIndex)) card.classList.add('is-picked');
        card.dataset.index = String(deckIndex);

        const nextOffset = nextOffsetByDeckIndex.has(deckIndex)
            ? nextOffsetByDeckIndex.get(deckIndex)
            : animationDirection < 0 ? 4 : -4;
        const previousOffset = previousOffsetByDeckIndex.has(deckIndex)
            ? previousOffsetByDeckIndex.get(deckIndex)
            : animationDirection < 0 ? -4 : 4;

        const startOffset = shouldAnimateScroll ? previousOffset : nextOffset;
        const finalOffset = nextOffset;
        const startX = startOffset * 172;
        const finalX = finalOffset * 172;
        const startRotate = startOffset * 7;
        const finalRotate = finalOffset * 7;
        const startZ = Math.abs(startOffset) * -70;
        const finalZ = Math.abs(finalOffset) * -70;
        const startScale = startOffset === 0 ? 1.08 : Math.max(0.74, 1 - Math.abs(startOffset) * 0.08);
        const finalScale = finalOffset === 0 ? 1.08 : Math.max(0.74, 1 - Math.abs(finalOffset) * 0.08);
        const startOpacity = Math.max(0, startOffset === 0 ? 1 : 1 - Math.abs(startOffset) * 0.22);
        const finalOpacity = Math.max(0, finalOffset === 0 ? 1 : 1 - Math.abs(finalOffset) * 0.22);

        card.style.transform = `translate3d(calc(-50% + ${startX}px), -50%, ${startZ}px) rotateY(${startRotate}deg) scale(${startScale})`;
        card.style.opacity = String(startOpacity);
        card.style.zIndex = String(30 - Math.abs(startOffset));
        deckStage.appendChild(card);
        return { card, finalX, finalZ, finalRotate, finalScale, finalOpacity, finalOffset };
    });

    if (shouldAnimateScroll) {
        if (scrollAnimationTimer) clearTimeout(scrollAnimationTimer);
        cardsToAnimate.forEach(({ card }) => {
            void card.offsetWidth;
        });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                cardsToAnimate.forEach(({ card, finalX, finalZ, finalRotate, finalScale, finalOpacity, finalOffset }) => {
                    card.style.transform = `translate3d(calc(-50% + ${finalX}px), -50%, ${finalZ}px) rotateY(${finalRotate}deg) scale(${finalScale})`;
                    card.style.opacity = String(finalOpacity);
                    card.style.zIndex = String(30 - Math.abs(finalOffset));
                });
            });
        });
        scrollAnimationTimer = setTimeout(() => {
            pendingScrollDirection = 0;
            scrollAnimationTimer = null;
        }, 220);
    } else {
        cardsToAnimate.forEach(({ card, finalX, finalZ, finalRotate, finalScale, finalOpacity, finalOffset }) => {
            card.style.transform = `translate3d(calc(-50% + ${finalX}px), -50%, ${finalZ}px) rotateY(${finalRotate}deg) scale(${finalScale})`;
            card.style.opacity = String(finalOpacity);
            card.style.zIndex = String(30 - Math.abs(finalOffset));
        });
    }

    updateSelectionStatus();
    renderPickedCards();
}

function startReading() {
    if (flowStage === 'spread') {
        setFlowStage('question');
        questionInput.focus();
        debugLog('action', { type: 'enter_question_stage' });
        return;
    }

    const question = questionInput.value.trim();
    if (!question) {
        questionInput.focus();
        return;
    }

    document.body.classList.add('session-active');
    document.body.classList.remove('results-ready');
    isSessionActive = true;
    hasAnalysisResult = false;
    isAnalyzing = false;
    isSpeechStarting = false;
    isSpeechStopping = false;
    fistHoldStartedAt = 0;
    setResetArming(false);
    setFlowStage('reading');
    clearTimeout(analysisAutoTimer);
    deckOrder = shuffle(Array.from({ length: tarotCards.length }, (_, index) => index));
    selectedCards = [];
    focusedDeckIndex = 0;
    previousFocusedDeckIndex = 0;
    armedDeckIndex = null;
    gestureCooldownUntil = 0;
    gestureState = {
        lastGesture: '',
        openPalmAt: 0,
        palmX: 0,
        palmY: 0,
        palmSize: 0,
        lastSeenAt: 0,
        moveAnchorX: 0,
        moveAnchorY: 0,
        moveAnchorAt: 0
    };
    startGestureControl();
    renderDeck();
    debugLog('action', { type: 'start_reading', spread: spreadSelect.value, question });
}

function pickFocusedCard(options = {}) {
    const { force = false } = options;
    const target = getSpread().cardCount;
    if (selectedCards.length >= target) return;
    const focusedCardElement = deckStage.querySelector('.stage-card.is-focus');
    const focusedRect = focusedCardElement ? focusedCardElement.getBoundingClientRect() : null;
    const cardIndex = deckOrder[focusedDeckIndex];
    if (selectedCards.some(item => item.cardIndex === cardIndex)) return;

    if (!force && armedDeckIndex !== focusedDeckIndex) {
        armedDeckIndex = focusedDeckIndex;
        renderDeck();
        return;
    }

    const spread = getSpread();
    const orientation = Math.random() < 0.5 ? '逆位' : '正位';
    const positionTitle = spread.cardCount === 3
        ? (selectedCards.length === 0 ? '第一张' : selectedCards.length === 1 ? '第二张' : '第三张')
        : `第 ${selectedCards.length + 1} 张`;

    selectedCards.push({
        cardIndex,
        imageIndex: cardIndex + 1,
        name: tarotTranslations[tarotCards[cardIndex]] || tarotCards[cardIndex],
        orientation,
        position: positionTitle
    });
    debugLog('action', {
        type: 'pick_card',
        cardIndex,
        cardName: tarotTranslations[tarotCards[cardIndex]] || tarotCards[cardIndex],
        orientation,
        position: positionTitle,
        force
    });

    armedDeckIndex = null;
    previousFocusedDeckIndex = focusedDeckIndex;
    focusedDeckIndex = getNextAvailableIndex(focusedDeckIndex);
    pendingScrollDirection = lastScrollDirection;
    renderDeck();
    if (focusedRect) animatePickedCardReveal(focusedRect, cardIndex);
    if (selectedCards.length >= target) queueAutoAnalysis();
}

function animatePickedCardReveal(startRect, cardIndex) {
    const flyingCard = document.createElement('div');
    flyingCard.className = 'flying-picked-card';
    flyingCard.style.left = `${startRect.left}px`;
    flyingCard.style.top = `${startRect.top}px`;
    flyingCard.style.transform = 'scale(1)';
    flyingCard.innerHTML = `
        <div class="flying-card-inner">
            <div class="flying-card-face flying-card-back"></div>
            <div class="flying-card-face flying-card-front">
                <img src="tarot_images/Tarot_Card_${cardIndex + 1}.webp" alt="">
            </div>
        </div>
    `;
    document.body.appendChild(flyingCard);

    const targetCard = pickedCards.querySelector('.picked-card:last-child');
    const targetRect = (targetCard || pickedCards).getBoundingClientRect();
    const frontWidth = Math.min(window.innerWidth * 0.2, startRect.width * 1.42);
    const frontHeight = frontWidth / 0.59;
    const centerLeft = (window.innerWidth - frontWidth) / 2;
    const centerTop = Math.max(64, window.innerHeight * 0.18);
    const targetLeft = targetRect.left + Math.max(0, (targetRect.width - startRect.width) / 2);
    const targetTop = targetRect.top + Math.max(0, (targetRect.height - startRect.height) / 2);

    requestAnimationFrame(() => {
        flyingCard.style.left = `${centerLeft}px`;
        flyingCard.style.top = `${centerTop}px`;
        flyingCard.style.transform = `translateY(-54px) scale(${frontWidth / startRect.width})`;
    });

    window.setTimeout(() => {
        flyingCard.classList.add('is-flipped');
    }, 280);

    window.setTimeout(() => {
        flyingCard.style.left = `${targetLeft}px`;
        flyingCard.style.top = `${targetTop}px`;
        flyingCard.style.transform = 'translateY(0) scale(0.24)';
        flyingCard.style.opacity = '0.18';
    }, 860);

    window.setTimeout(() => {
        flyingCard.remove();
    }, 1480);
}

function openModal(modal) {
    modal.classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => closeModal(button.dataset.close));
});

settingsButton.addEventListener('click', () => {
    providerSelect.value = getSelectedProvider();
    updateProviderUI();
    openModal(settingsModal);
});

providerSelect.addEventListener('change', () => {
    localStorage.setItem('selected_ai_provider', providerSelect.value);
    updateProviderUI();
});

saveSettings.addEventListener('click', () => {
    const providerId = providerSelect.value;
    localStorage.setItem('selected_ai_provider', providerId);
    setProviderApiKey(providerId, providerInput.value.trim());
    closeModal('settings-modal');
});

spreadSelect.addEventListener('change', () => {
    localStorage.setItem('selected_tarot_spread', spreadSelect.value);
    selectedCards = [];
    armedDeckIndex = null;
    syncSpreadCards();
    renderDeck();
});

startButton.addEventListener('click', startReading);
questionInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        startReading();
    }
});

async function analyzeReading() {
    if (isAnalyzing || hasAnalysisResult || selectedCards.length !== getSpread().cardCount) return;
    isAnalyzing = true;
    gestureStatus.textContent = '解析中，手势已暂停';
    const providerId = getSelectedProvider();
    const provider = AI_PROVIDERS[providerId];
    const apiKey = getProviderApiKey(providerId);

    openModal(analysisModal);
    analysisResult.innerHTML = `${buildCardsOverviewHtml()}<p>正在解析牌阵...</p>`;

    const cardsText = selectedCards.map((card, index) => `${index + 1}. ${card.name} [${card.position} / ${card.orientation}]`).join('\n');
    const spread = getSpread();
    const prompt = `你是一位精通神秘学的塔罗牌大师。请根据以下牌阵进行解读。\n\n问题：${questionInput.value.trim()}\n牌阵：${spread.name}\n说明：${spread.description}\n抽牌结果：\n${cardsText}\n\n请输出 Markdown，包含：整体局势、逐张解析、建议提醒。控制在 500 字内。`;

    if (!apiKey) {
        const fallbackMarkdown = `## 抽牌结果\n\n问题：${questionInput.value.trim()}\n\n牌阵：${getSpread().name}\n\n抽到的牌：${getCyberCardsText()}\n\n当前未配置 API Key，无法自动生成 AI 解读。`;
        analysisResult.innerHTML = `${buildCardsOverviewHtml()}<p>已抽牌完成。当前未配置 API Key，无法自动生成 AI 解读。</p>`;
        hasAnalysisResult = true;
        setFlowStage('result');
        fistHoldStartedAt = 0;
        setResetArming(false);
        gestureStatus.textContent = '解析结束：张手上下滚动；握拳 2 秒确认重置，松手取消';
        analysisGestureHint.textContent = '结果页：张手上下滚动；握拳 2 秒确认重置，松手取消；两手矩形复制';
        const now = new Date();
        saveHistory({
            date: now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            summary: `问题：${questionInput.value.trim()} · ${getSpread().name} · 赛博模式`,
            result: fallbackMarkdown
        });
        isAnalyzing = false;
        return;
    }

    try {
        const content = await callProvider(providerId, apiKey, prompt);
        analysisResult.innerHTML = `${buildCardsOverviewHtml()}${marked.parse(content)}`;
        hasAnalysisResult = true;
        setFlowStage('result');
        fistHoldStartedAt = 0;
        setResetArming(false);
        gestureStatus.textContent = '解析结束：张手上下滚动；握拳 2 秒确认重置，松手取消';
        analysisGestureHint.textContent = '结果页：张手上下滚动；握拳 2 秒确认重置，松手取消；两手矩形复制';
        const now = new Date();
        saveHistory({
            date: now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            summary: `问题：${questionInput.value.trim()} · ${getSpread().name} · 赛博模式`,
            result: content
        });
    } catch (error) {
        const errorMarkdown = `## 抽牌结果\n\n问题：${questionInput.value.trim()}\n\n牌阵：${getSpread().name}\n\n抽到的牌：${getCyberCardsText()}\n\n解析失败：${error.message}`;
        analysisResult.innerHTML = `${buildCardsOverviewHtml()}<p style="color:#ff8d8d;">${escapeHtml(error.message)}</p>`;
        hasAnalysisResult = true;
        setFlowStage('result');
        fistHoldStartedAt = 0;
        setResetArming(false);
        gestureStatus.textContent = '解析结束：张手上下滚动；握拳 2 秒确认重置，松手取消';
        analysisGestureHint.textContent = '结果页：张手上下滚动；握拳 2 秒确认重置，松手取消；两手矩形复制';
        const now = new Date();
        saveHistory({
            date: now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            summary: `问题：${questionInput.value.trim()} · ${getSpread().name} · 赛博模式`,
            result: errorMarkdown
        });
    } finally {
        isAnalyzing = false;
    }
}

analyzeButton.addEventListener('click', analyzeReading);

function initSpeechRecognition() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition || speechRecognition || isSpeechUnavailable) return;
    speechRecognition = new Recognition();
    speechRecognition.lang = SPEECH_LANGUAGE_CANDIDATES[speechLanguageIndex];
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    debugLog('voice', { event: 'init', lang: speechRecognition.lang, candidates: SPEECH_LANGUAGE_CANDIDATES });

    speechRecognition.onstart = () => {
        isSpeechStarting = false;
        isSpeechStopping = false;
        isListening = true;
        voiceButton.textContent = '停止收音';
        voiceStatus.textContent = '正在听你说话...';
        debugLog('voice', { event: 'onstart' });
    };

    speechRecognition.onresult = event => {
        const transcript = Array.from(event.results).map(item => item[0]?.transcript || '').join('').trim();
        if (transcript) questionInput.value = transcript;
    };

    speechRecognition.onend = () => {
        isSpeechStarting = false;
        isSpeechStopping = false;
        isListening = false;
        voiceButton.textContent = '语音输入';
        if (!questionInput.value.trim()) {
            voiceStatus.textContent = '可直接输入，或握拳开始语音输入';
        }
        debugLog('voice', { event: 'onend' });
    };

    speechRecognition.onerror = event => {
        isSpeechStarting = false;
        isSpeechStopping = false;
        isListening = false;
        voiceButton.textContent = '语音输入';
        const errorCode = event?.error || '';
        if (errorCode === 'not-allowed' || errorCode === 'service-not-allowed') {
            voiceStatus.textContent = '麦克风权限被拒绝，请在浏览器里允许麦克风';
        } else if (errorCode === 'audio-capture') {
            voiceStatus.textContent = '没有可用麦克风，或麦克风被系统占用';
        } else if (errorCode === 'language-not-supported') {
            if (speechLanguageIndex < SPEECH_LANGUAGE_CANDIDATES.length - 1) {
                speechLanguageIndex += 1;
                speechRecognition.lang = SPEECH_LANGUAGE_CANDIDATES[speechLanguageIndex];
                voiceStatus.textContent = `当前语音语言不可用，已切换到 ${speechRecognition.lang}，请再试一次`;
            } else {
                isSpeechUnavailable = true;
                voiceButton.disabled = true;
                voiceStatus.textContent = '当前 Edge 环境没有可用的 SpeechRecognition 识别服务，请改用手动输入';
            }
        } else if (errorCode === 'no-speech') {
            voiceStatus.textContent = '没有听到语音，请再试一次';
        } else if (errorCode === 'network') {
            voiceStatus.textContent = '语音识别服务不可用，可能是网络或浏览器策略限制';
        } else if (errorCode === 'aborted') {
            voiceStatus.textContent = '已停止语音输入';
        } else {
            voiceStatus.textContent = `语音输入失败：${errorCode || '未知原因'}`;
        }
        debugLog('voice_error', {
            error: errorCode || 'unknown',
            lang: speechRecognition?.lang,
            nextLang: SPEECH_LANGUAGE_CANDIDATES[speechLanguageIndex] || null
        });
    };
}

function toggleVoiceInput(forceStart = false) {
    if (isSpeechUnavailable) {
        voiceStatus.textContent = '当前 Edge 环境没有可用的 SpeechRecognition 识别服务，请改用手动输入';
        debugLog('voice', { supported: false, reason: 'runtime_unavailable' });
        return;
    }
    initSpeechRecognition();
    if (!speechRecognition) {
        voiceStatus.textContent = '当前浏览器未提供 SpeechRecognition 接口，改用手动输入';
        debugLog('voice', { supported: false });
        return;
    }
    if (isSpeechStarting || isSpeechStopping) {
        debugLog('voice', { action: 'ignored_transition', starting: isSpeechStarting, stopping: isSpeechStopping });
        return;
    }
    if (forceStart) {
        if (isListening) {
            debugLog('voice', { action: 'ignored_force_start_already_listening' });
            return;
        }
        try {
            isSpeechStarting = true;
            voiceStatus.textContent = '准备开始语音输入...';
            speechRecognition.start();
            debugLog('voice', { action: 'force_start' });
        } catch (error) {
            isSpeechStarting = false;
            voiceStatus.textContent = `语音输入启动失败：${error.message}`;
            debugLog('voice_exception', { action: 'force_start', message: error.message });
        }
        return;
    }
    if (isListening) {
        try {
            isSpeechStopping = true;
            speechRecognition.stop();
            debugLog('voice', { action: 'stop' });
        } catch (error) {
            isSpeechStopping = false;
            voiceStatus.textContent = `语音输入停止失败：${error.message}`;
            debugLog('voice_exception', { action: 'stop', message: error.message });
        }
    } else {
        try {
            isSpeechStarting = true;
            voiceStatus.textContent = '准备开始语音输入...';
            speechRecognition.start();
            debugLog('voice', { action: 'start' });
        } catch (error) {
            isSpeechStarting = false;
            voiceStatus.textContent = `语音输入启动失败：${error.message}`;
            debugLog('voice_exception', { action: 'start', message: error.message });
        }
    }
}

voiceButton.addEventListener('click', toggleVoiceInput);
mirrorButton.addEventListener('click', () => {
    isMirroredPreview = !isMirroredPreview;
    localStorage.setItem('cyber_mirror_preview', isMirroredPreview ? 'on' : 'off');
    applyMirrorState();
});
spreadGrid.addEventListener('click', event => {
    const target = event.target.closest('.spread-card');
    if (!target) return;
    spreadSelect.value = target.dataset.spread;
    localStorage.setItem('selected_tarot_spread', spreadSelect.value);
    syncSpreadCards();
});

function distance2D(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function isFingerExtended(tip, pip, mcp, wrist) {
    return distance2D(tip, wrist) > distance2D(pip, wrist) && distance2D(tip, wrist) > distance2D(mcp, wrist);
}

function classifyGesture(landmarks) {
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIp = landmarks[3];
    const thumbMcp = landmarks[2];
    const indexTip = landmarks[8];
    const indexPip = landmarks[6];
    const indexMcp = landmarks[5];
    const middleTip = landmarks[12];
    const middlePip = landmarks[10];
    const middleMcp = landmarks[9];
    const ringTip = landmarks[16];
    const ringPip = landmarks[14];
    const ringMcp = landmarks[13];
    const pinkyTip = landmarks[20];
    const pinkyPip = landmarks[18];
    const pinkyMcp = landmarks[17];

    const thumbExtended = distance2D(thumbTip, wrist) > distance2D(thumbIp, wrist) * 1.08;
    const indexExtended = isFingerExtended(indexTip, indexPip, indexMcp, wrist);
    const middleExtended = isFingerExtended(middleTip, middlePip, middleMcp, wrist);
    const ringExtended = isFingerExtended(ringTip, ringPip, ringMcp, wrist);
    const pinkyExtended = isFingerExtended(pinkyTip, pinkyPip, pinkyMcp, wrist);
    const fingerExtendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    const okDistance = distance2D(thumbTip, indexTip);
    const palmSize = distance2D(wrist, middleMcp);
    const thumbCurled = distance2D(thumbTip, wrist) < distance2D(thumbMcp, wrist) * 1.05;
    const indexCurled = distance2D(indexTip, wrist) < distance2D(indexMcp, wrist) * 1.08;
    const middleCurled = distance2D(middleTip, wrist) < distance2D(middleMcp, wrist) * 1.08;
    const ringCurled = distance2D(ringTip, wrist) < distance2D(ringMcp, wrist) * 1.08;
    const pinkyCurled = distance2D(pinkyTip, wrist) < distance2D(pinkyMcp, wrist) * 1.08;
    const curledCount = [indexCurled, middleCurled, ringCurled, pinkyCurled].filter(Boolean).length;
    const okSupportCount = [middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    const digitCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    const okPoseValid = okDistance < palmSize * 0.42
        && okSupportCount >= 2
        && distance2D(indexTip, indexMcp) > palmSize * 0.32
        && distance2D(thumbTip, thumbMcp) > palmSize * 0.28;

    if (okPoseValid) {
        return { name: 'ok', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.98 };
    }
    if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        return { name: 'digit-1', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.96 };
    }
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        return { name: 'digit-2', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.96 };
    }
    if (indexExtended && middleExtended && ringExtended && !pinkyExtended) {
        return { name: 'digit-3', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.96 };
    }
    if (digitCount === 4) {
        return { name: 'digit-4', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.94 };
    }
    if (fingerExtendedCount >= 3 || (thumbExtended && fingerExtendedCount >= 2)) {
        return { name: 'open', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.78 + fingerExtendedCount * 0.03 };
    }
    if (curledCount >= 3 || (curledCount >= 2 && thumbCurled)) {
        return { name: 'fist', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.8 + curledCount * 0.03 };
    }
    return { name: 'unknown', palmX: wrist.x, palmY: wrist.y, palmSize, score: 0.1 };
}

function chooseActiveHand(landmarkSets) {
    const gestures = landmarkSets.map((landmarks, index) => ({
        index,
        landmarks,
        gesture: classifyGesture(landmarks)
    }));
    const known = gestures.filter(item => item.gesture.name !== 'unknown');
    const pool = known.length ? known : gestures;
    return pool.sort((a, b) => (b.gesture.score || 0) - (a.gesture.score || 0))[0] || null;
}

function normalizeGestureForStage(gesture) {
    if (flowStage === 'spread') {
        if (gesture.name === 'digit-1' || gesture.name === 'digit-2' || gesture.name === 'digit-3' || gesture.name === 'digit-4' || gesture.name === 'ok') {
            return gesture;
        }
        return { ...gesture, name: 'unknown', score: 0.1, normalizedFrom: gesture.name };
    }

    if (flowStage === 'question') {
        if (gesture.name === 'fist' || gesture.name === 'ok') {
            return gesture;
        }
        return { ...gesture, name: 'unknown', score: 0.1, normalizedFrom: gesture.name };
    }

    if (flowStage === 'result') {
        if (gesture.name === 'fist' || gesture.name === 'open') {
            return gesture;
        }
        if (gesture.name === 'digit-1' || gesture.name === 'digit-2' || gesture.name === 'digit-3' || gesture.name === 'digit-4' || gesture.name === 'ok') {
            return { ...gesture, name: 'open', score: Math.max(gesture.score || 0, 0.82), normalizedFrom: gesture.name };
        }
        return { ...gesture, name: 'unknown', score: 0.1, normalizedFrom: gesture.name };
    }

    if (flowStage !== 'reading') return gesture;
    if (gesture.name === 'digit-4' || gesture.name === 'digit-3' || gesture.name === 'digit-2' || gesture.name === 'digit-1') {
        return {
            ...gesture,
            name: 'open',
            score: Math.max(gesture.score || 0, 0.82),
            normalizedFrom: gesture.name
        };
    }
    if (gesture.name === 'ok' && selectedCards.length !== getSpread().cardCount && !hasAnalysisResult) {
        return {
            ...gesture,
            name: 'open',
            score: Math.max(gesture.score || 0, 0.82),
            normalizedFrom: gesture.name
        };
    }
    return gesture;
}

function drawGestureOverlay(landmarkSets, activeIndex = -1) {
    const context = gestureOverlay.getContext('2d');
    context.clearRect(0, 0, gestureOverlay.width, gestureOverlay.height);
    if (!landmarkSets?.length) return;
    landmarkSets.forEach((landmarks, index) => {
        context.fillStyle = index === activeIndex ? 'rgba(243, 208, 133, 0.95)' : 'rgba(129, 212, 209, 0.5)';
        landmarks.forEach(point => {
            context.beginPath();
            context.arc(point.x * gestureOverlay.width, point.y * gestureOverlay.height, index === activeIndex ? 4 : 3, 0, Math.PI * 2);
            context.fill();
        });
    });
}

function handleGestureAction(gesture) {
    const now = performance.now();
    if (now < gestureCooldownUntil) return;
    if (isAnalyzing) {
        gestureStatus.textContent = '解析中，手势已暂停';
        return;
    }
    const normalizedGesture = normalizeGestureForStage(gesture);
    if (normalizedGesture !== gesture) {
        debugLog('gesture_normalized', {
            stage: flowStage,
            from: gesture.name,
            to: normalizedGesture.name
        });
    }
    gesture = normalizedGesture;

    const gestureSignature = `${flowStage}:${gesture.name}`;
    if (gestureSignature !== lastLoggedGestureSignature) {
        debugLog('gesture', {
            stage: flowStage,
            gesture: gesture.name,
            score: Number((gesture.score || 0).toFixed(2)),
            palmX: Number(gesture.palmX.toFixed(3)),
            palmY: Number(gesture.palmY.toFixed(3))
        });
        lastLoggedGestureSignature = gestureSignature;
    }

    if (gesture.name === 'unknown') {
        if (flowStage === 'result' && fistHoldStartedAt) {
            if (!fistHoldLostAt) fistHoldLostAt = now;
            if (now - fistHoldLostAt > 300) {
                fistHoldStartedAt = 0;
                fistHoldLostAt = 0;
                setResetArming(false);
                gestureStatus.textContent = '已取消重置';
            }
        } else if (flowStage === 'result') {
            gestureStatus.textContent = '结果页：上下移动手掌滚动';
        } else {
            gestureStatus.textContent = '检测到手，但手势未命中';
        }
        okPoseStartedAt = 0;
        gestureState.lastGesture = gesture.name;
        gestureState.lastSeenAt = now;
        return;
    }

    if (flowStage === 'spread') {
        if (gesture.name.startsWith('digit-')) {
            const digitIndex = Number(gesture.name.split('-')[1]) - 1;
            setSpreadByIndex(digitIndex);
            gestureStatus.textContent = `已选牌阵 ${digitIndex + 1}，请比 OK 确认`;
            gestureCooldownUntil = now + 700;
        } else if (gesture.name === 'ok') {
            if (!okPoseStartedAt) okPoseStartedAt = now;
            if (now - okPoseStartedAt < 260) {
                gestureStatus.textContent = '保持 OK 以确认牌阵';
                gestureState.lastGesture = gesture.name;
                gestureState.palmX = gesture.palmX;
                gestureState.palmY = gesture.palmY;
                gestureState.palmSize = gesture.palmSize;
                gestureState.lastSeenAt = now;
                return;
            }
            setFlowStage('question');
            questionInput.focus();
            gestureStatus.textContent = '牌阵已确认，请输入问题';
            gestureCooldownUntil = now + 900;
            debugLog('action', { type: 'confirm_spread', spread: spreadSelect.value });
        } else {
            gestureStatus.textContent = '选牌阵阶段仅支持 1/2/3/4 和 OK';
            okPoseStartedAt = 0;
        }
        gestureState.lastGesture = gesture.name;
        gestureState.palmX = gesture.palmX;
        gestureState.palmY = gesture.palmY;
        gestureState.palmSize = gesture.palmSize;
        gestureState.lastSeenAt = now;
        gestureState.moveAnchorX = gesture.palmX;
        gestureState.moveAnchorAt = now;
        return;
    }

    if (flowStage === 'question') {
        const hasQuestion = Boolean(questionInput.value.trim());
        if (gesture.name === 'ok') {
            if (!hasQuestion) {
                gestureStatus.textContent = '请先输入问题，再用 OK 开始抽牌';
                gestureCooldownUntil = now + 600;
            } else {
                if (!okPoseStartedAt) okPoseStartedAt = now;
                if (now - okPoseStartedAt < 260) {
                    gestureStatus.textContent = '检测到输入内容，保持 OK 开始抽牌';
                    gestureState.lastGesture = gesture.name;
                    gestureState.palmX = gesture.palmX;
                    gestureState.palmY = gesture.palmY;
                    gestureState.palmSize = gesture.palmSize;
                    gestureState.lastSeenAt = now;
                    return;
                }
                startReading();
                gestureStatus.textContent = '进入牌堆';
                gestureCooldownUntil = 0;
                debugLog('action', { type: 'confirm_question_start_reading', hasQuestion: true });
            }
        } else if (gesture.name === 'fist') {
            if (isSpeechUnavailable) {
                gestureStatus.textContent = '当前环境不支持语音识别，请直接输入问题';
            } else {
                toggleVoiceInput(true);
                gestureStatus.textContent = isListening || isSpeechStarting ? '正在语音输入' : '握拳未触发语音';
                gestureCooldownUntil = now + 900;
                debugLog('action', { type: 'start_voice_by_fist', listening: isListening, starting: isSpeechStarting });
            }
        } else {
            gestureStatus.textContent = hasQuestion ? '检测到输入内容后，用 OK 开始抽牌' : '请先输入问题';
            okPoseStartedAt = 0;
        }
        okPoseStartedAt = gesture.name === 'ok' ? (okPoseStartedAt || now) : 0;
        gestureState.lastGesture = gesture.name;
        gestureState.palmX = gesture.palmX;
        gestureState.palmY = gesture.palmY;
        gestureState.palmSize = gesture.palmSize;
        gestureState.lastSeenAt = now;
        gestureState.moveAnchorX = gesture.palmX;
        gestureState.moveAnchorY = gesture.palmY;
        gestureState.moveAnchorAt = now;
        return;
    }

    if (flowStage === 'result') {
        if (gesture.name === 'fist') {
            if (!fistHoldStartedAt) {
                fistHoldStartedAt = now;
                fistHoldLostAt = 0;
                setResetArming(true);
            }
            if (fistHoldLostAt) {
                fistHoldStartedAt += now - fistHoldLostAt;
                fistHoldLostAt = 0;
            }
            const holdMs = now - fistHoldStartedAt;
            const remainMs = Math.max(0, 2000 - holdMs);
            const confirmText = remainMs > 0
                ? `是否确认重置？保持握拳 ${(remainMs / 1000).toFixed(1)} 秒，松手取消`
                : '已重置牌组';
            gestureStatus.textContent = confirmText;
            if (holdMs >= 2000) {
                resetReadingSession();
                debugLog('action', { type: 'reset_by_fist_hold' });
            }
        } else if (gesture.name === 'open') {
            if (fistHoldStartedAt && !fistHoldLostAt) fistHoldLostAt = now;
            setResetArming(false);
            if (gestureState.lastGesture !== 'open') {
                gestureState.moveAnchorY = gesture.palmY;
                gestureState.moveAnchorAt = now;
                gestureStatus.textContent = '结果页：上下移动手掌滚动';
            } else {
                const accumulatedDeltaY = gesture.palmY - gestureState.moveAnchorY;
                if (Math.abs(accumulatedDeltaY) > 0.03) {
                    analysisResult.scrollBy({ top: accumulatedDeltaY > 0 ? 140 : -140, behavior: 'smooth' });
                    gestureState.moveAnchorY = gesture.palmY;
                    gestureState.moveAnchorAt = now;
                    gestureStatus.textContent = accumulatedDeltaY > 0 ? '向下滚动' : '向上滚动';
                    debugLog('action', { type: 'scroll_result', direction: accumulatedDeltaY > 0 ? 'down' : 'up' });
                } else {
                    gestureStatus.textContent = '结果页：上下移动手掌滚动';
                }
            }
        } else {
            if (fistHoldStartedAt && !fistHoldLostAt) fistHoldLostAt = now;
            setResetArming(false);
            if (fistHoldLostAt && now - fistHoldLostAt > 300) {
                fistHoldStartedAt = 0;
                fistHoldLostAt = 0;
                gestureStatus.textContent = '已取消重置';
            } else {
                gestureStatus.textContent = '结果页仅支持上下滚动、握拳重置、矩形复制';
            }
        }
        okPoseStartedAt = 0;
        gestureState.lastGesture = gesture.name;
        gestureState.palmX = gesture.palmX;
        gestureState.palmY = gesture.palmY;
        gestureState.palmSize = gesture.palmSize;
        gestureState.lastSeenAt = now;
        gestureState.moveAnchorX = gesture.palmX;
        gestureState.moveAnchorY = gesture.palmY;
        gestureState.moveAnchorAt = now;
        return;
    }

    if (gesture.name === 'open') {
        okPoseStartedAt = 0;
        gestureStatus.textContent = '检测到：张开手掌';
        if (gestureState.lastGesture !== 'open') {
            gestureState.openPalmAt = now;
            gestureState.palmX = gesture.palmX;
            gestureState.palmY = gesture.palmY;
            gestureState.palmSize = gesture.palmSize;
            gestureState.moveAnchorX = gesture.palmX;
            gestureState.moveAnchorAt = now;
            debugLog('open_anchor', { x: Number(gesture.palmX.toFixed(3)), y: Number(gesture.palmY.toFixed(3)) });
        } else {
            const deltaX = gesture.palmX - gestureState.palmX;
            const accumulatedDeltaX = gesture.palmX - gestureState.moveAnchorX;
            debugLog('open_move', {
                x: Number(gesture.palmX.toFixed(3)),
                deltaX: Number(deltaX.toFixed(3)),
                accumulatedDeltaX: Number(accumulatedDeltaX.toFixed(3)),
                anchorAge: Math.round(now - gestureState.moveAnchorAt)
            });
            if (gesture.palmX < 0.44 && accumulatedDeltaX < -0.03) {
                shiftFocus(1);
                gestureState.moveAnchorX = gesture.palmX;
                gestureState.moveAnchorAt = now;
                gestureState.palmX = gesture.palmX;
                gestureState.palmY = gesture.palmY;
                gestureCooldownUntil = now + 180;
                gestureStatus.textContent = '左半区左滑';
            } else if (gesture.palmX < 0.25) {
                shiftFocus(1);
                gestureState.moveAnchorX = gesture.palmX;
                gestureState.moveAnchorAt = now;
                gestureCooldownUntil = now + 180;
                gestureStatus.textContent = '左侧四分之一持续滚动';
            } else if (gesture.palmX > 0.56 && accumulatedDeltaX > 0.03) {
                gestureState.moveAnchorX = gesture.palmX;
                gestureState.moveAnchorAt = now;
                shiftFocus(-1);
                gestureCooldownUntil = now + 180;
                gestureStatus.textContent = '右半区右滑';
            } else if (gesture.palmX > 0.75) {
                shiftFocus(-1);
                gestureState.moveAnchorX = gesture.palmX;
                gestureState.moveAnchorAt = now;
                gestureCooldownUntil = now + 180;
                gestureStatus.textContent = '右侧四分之一持续滚动';
            } else if (gesture.palmX >= 0.44 && gesture.palmX <= 0.56) {
                gestureStatus.textContent = '中间区域停止切牌';
            } else if (gesture.palmX < 0.44) {
                gestureStatus.textContent = '左半区向左滑，左四分之一持续滚动';
            } else {
                gestureStatus.textContent = '右半区向右滑，右四分之一持续滚动';
            }
            gestureState.palmX = gesture.palmX;
            gestureState.palmY = gesture.palmY;
        }
    }

    if (gesture.name === 'fist' && gestureState.lastGesture === 'open' && now - gestureState.openPalmAt < 1400) {
        okPoseStartedAt = 0;
        gestureStatus.textContent = '检测到：握拳';
        const pullDetected = gesture.palmSize > gestureState.palmSize * 1.02;
        const upwardPull = gesture.palmY < gestureState.palmY - 0.05;
        const stableCenter = Math.abs(gesture.palmX - gestureState.palmX) < 0.12;
        if (upwardPull || pullDetected || stableCenter) {
            pickFocusedCard({ force: true });
            gestureCooldownUntil = now + 1100;
            gestureStatus.textContent = upwardPull ? '向上抽牌完成' : '抓牌完成';
        }
    }

    if (gesture.name === 'ok') {
        if (!okPoseStartedAt) okPoseStartedAt = now;
        if (now - okPoseStartedAt < 260) {
            gestureStatus.textContent = '保持 OK 以确认';
            gestureState.lastGesture = gesture.name;
            gestureState.lastSeenAt = now;
            return;
        }
        gestureStatus.textContent = '检测到：OK';
        if (selectedCards.length === getSpread().cardCount && !hasAnalysisResult) {
            analyzeReading();
            gestureStatus.textContent = '开始解析';
            debugLog('action', { type: 'confirm_analysis' });
        } else if (hasAnalysisResult) {
            gestureStatus.textContent = '结果已生成，向上握拳可重置';
        } else {
            gestureStatus.textContent = 'OK 已识别，抽满后可解析';
        }
        gestureCooldownUntil = now + 1200;
    } else {
        okPoseStartedAt = 0;
    }

    gestureState.lastGesture = gesture.name;
    gestureState.palmX = gesture.palmX;
    gestureState.palmY = gesture.palmY;
    gestureState.palmSize = gesture.palmSize;
    gestureState.lastSeenAt = now;
}

function syncSpreadCards() {
    spreadCards.forEach(card => {
        card.classList.toggle('is-active', card.dataset.spread === spreadSelect.value);
    });
}

function buildCardsOverviewHtml() {
    if (!selectedCards.length) return '';
    return `
        <div class="analysis-picked-grid">
            ${selectedCards.map(card => `
                <article class="analysis-picked-card">
                    <img src="tarot_images/Tarot_Card_${card.cardIndex + 1}.webp" alt="${escapeHtml(card.name)}">
                    <strong>${escapeHtml(card.name)}</strong>
                    <span>${escapeHtml(card.position)} · ${card.orientation}</span>
                </article>
            `).join('')}
        </div>
    `;
}

function getCyberCardsText() {
    return selectedCards
        .map((card, index) => `${index + 1}. ${card.name} [${card.position} / ${card.orientation}]`)
        .join('、');
}

function isLShapeHand(landmarks) {
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];
    const indexTip = landmarks[8];
    const indexMcp = landmarks[5];
    const middleTip = landmarks[12];
    const middleMcp = landmarks[9];
    const ringTip = landmarks[16];
    const ringMcp = landmarks[13];
    const pinkyTip = landmarks[20];
    const pinkyMcp = landmarks[17];
    const thumbExtended = distance2D(thumbTip, wrist) > distance2D(thumbMcp, wrist) * 1.08;
    const indexExtended = distance2D(indexTip, wrist) > distance2D(indexMcp, wrist) * 1.15;
    const middleCurled = distance2D(middleTip, wrist) < distance2D(middleMcp, wrist) * 1.08;
    const ringCurled = distance2D(ringTip, wrist) < distance2D(ringMcp, wrist) * 1.08;
    const pinkyCurled = distance2D(pinkyTip, wrist) < distance2D(pinkyMcp, wrist) * 1.08;
    return thumbExtended && indexExtended && middleCurled && ringCurled && pinkyCurled;
}

async function tryCopyAnalysisByRectangle(landmarkSets) {
    const now = performance.now();
    if (flowStage !== 'result' || isAnalyzing || !hasAnalysisResult || now < copyGestureCooldownUntil) return;
    if (!navigator.clipboard?.writeText || landmarkSets.length < 2) return;
    const [left, right] = landmarkSets;
    if (!isLShapeHand(left) || !isLShapeHand(right)) return;
    const leftIndex = left[8];
    const rightIndex = right[8];
    const leftThumb = left[4];
    const rightThumb = right[4];
    const horizontalSpan = Math.abs(rightIndex.x - leftIndex.x);
    const verticalSpan = Math.abs(((leftThumb.y + rightThumb.y) / 2) - ((leftIndex.y + rightIndex.y) / 2));
    if (horizontalSpan < 0.16 || verticalSpan < 0.08) return;
    const text = analysisResult.innerText?.trim();
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        copyGestureCooldownUntil = now + 1800;
        gestureStatus.textContent = '已复制解析内容';
        debugLog('action', { type: 'copy_analysis_by_rectangle' });
    } catch (error) {
        debugLog('copy_error', { message: error?.message || 'clipboard_failed' });
    }
}

function queueAutoAnalysis() {
    if (hasAnalysisResult || isAnalyzing) return;
    clearTimeout(analysisAutoTimer);
    analysisAutoTimer = window.setTimeout(() => {
        analyzeReading();
    }, 1200);
}

function resetReadingSession() {
    clearTimeout(analysisAutoTimer);
    hasAnalysisResult = false;
    isAnalyzing = false;
    isSessionActive = false;
    okPoseStartedAt = 0;
    lastLoggedGestureSignature = '';
    isSpeechStarting = false;
    isSpeechStopping = false;
    copyGestureCooldownUntil = 0;
    selectedCards = [];
    questionInput.value = '';
    armedDeckIndex = null;
    focusedDeckIndex = 0;
    previousFocusedDeckIndex = 0;
    deckOrder = shuffle(Array.from({ length: tarotCards.length }, (_, index) => index));
    gestureCooldownUntil = performance.now() + 800;
    gestureState = {
        lastGesture: 'fist',
        openPalmAt: 0,
        palmX: 0,
        palmY: 0,
        palmSize: 0,
        lastSeenAt: performance.now(),
        moveAnchorX: 0,
        moveAnchorY: 0,
        moveAnchorAt: 0
    };
    analysisResult.innerHTML = '等待解析...';
    closeModal('analysis-modal');
    setResetArming(false);
    document.body.classList.remove('session-active');
    document.body.classList.remove('results-ready');
    setFlowStage('spread');
    voiceStatus.textContent = '可直接输入，或握拳开始语音输入';
    gestureStatus.textContent = '等待选择牌阵';
    renderDeck();
}

async function loadGestureAssets() {
    if (gestureAssetsPromise) return gestureAssetsPromise;
    gestureAssetsPromise = import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm')
        .then(async vision => {
            const { FilesetResolver, HandLandmarker } = vision;
            const fileset = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
            handLandmarker = await HandLandmarker.createFromOptions(fileset, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
                },
                numHands: 2,
                runningMode: 'VIDEO',
                minHandDetectionConfidence: 0.32,
                minHandPresenceConfidence: 0.28,
                minTrackingConfidence: 0.28
            });
            return handLandmarker;
        });
    return gestureAssetsPromise;
}

async function startGestureControl() {
    gestureStatus.textContent = '连接摄像头中';
    if (!navigator.mediaDevices?.getUserMedia) {
        gestureStatus.textContent = '浏览器不支持摄像头';
        return;
    }

    try {
        if (!gestureStream) {
            gestureStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                },
                audio: false
            });
        }

        gestureVideo.srcObject = gestureStream;
        await gestureVideo.play();
        await waitForVideoReady(gestureVideo);

        if (gestureVideo.videoWidth <= 0 || gestureVideo.videoHeight <= 0) {
            gestureStatus.textContent = '摄像头已连接，但视频未就绪';
            return;
        }

        gestureOverlay.width = gestureVideo.videoWidth || 320;
        gestureOverlay.height = gestureVideo.videoHeight || 240;
        gestureStatus.textContent = '摄像头已连接，加载识别中';

        await loadGestureAssets();
        gestureStatus.textContent = '手势已连接';

        const loop = () => {
            if (!handLandmarker || !gestureVideo.srcObject) return;
            if (gestureVideo.readyState < 2 || gestureVideo.videoWidth <= 0 || gestureVideo.videoHeight <= 0) {
                gestureStatus.textContent = '等待视频帧';
                gestureLoopId = requestAnimationFrame(loop);
                return;
            }
            if (gestureVideo.currentTime !== lastVideoTime) {
                lastVideoTime = gestureVideo.currentTime;
                try {
                    const result = handLandmarker.detectForVideo(gestureVideo, performance.now());
                    const landmarkSets = result.landmarks || [];
                    void tryCopyAnalysisByRectangle(landmarkSets);
                    const activeHand = chooseActiveHand(landmarkSets);
                    drawGestureOverlay(landmarkSets, activeHand?.index ?? -1);
                    if (activeHand) {
                        handleGestureAction(activeHand.gesture);
                    } else if (performance.now() - gestureState.lastSeenAt > 1200) {
                        gestureStatus.textContent = '未检测到手，请把手移近并放进右下角视频框';
                    }
                } catch (error) {
                    const message = typeof error?.message === 'string' ? error.message : '';
                    if (message.includes('ROI width and height must be > 0') || message.includes('texImage2D')) {
                        gestureStatus.textContent = '视频帧异常，等待下一帧';
                    } else {
                        gestureStatus.textContent = '手势推理异常';
                    }
                }
            }
            gestureLoopId = requestAnimationFrame(loop);
        };

        if (!gestureLoopId) gestureLoopId = requestAnimationFrame(loop);
    } catch (error) {
        if (error?.name === 'NotAllowedError') {
            gestureStatus.textContent = '摄像头权限被拒绝';
            return;
        }
        if (error?.name === 'NotFoundError') {
            gestureStatus.textContent = '未找到可用摄像头';
            return;
        }
        const message = typeof error?.message === 'string' ? error.message : '';
        if (message.includes('storage.googleapis') || message.includes('Failed to fetch') || message.includes('fetch')) {
            gestureStatus.textContent = '手势模型加载失败，可能是网络拦截';
            return;
        }
        gestureStatus.textContent = '手势不可用，可直接触控';
    }
}

function stopGestureControl() {
    if (gestureLoopId) cancelAnimationFrame(gestureLoopId);
    gestureLoopId = null;
    if (gestureVideo) {
        gestureVideo.pause();
        gestureVideo.srcObject = null;
    }
    if (gestureStream) {
        gestureStream.getTracks().forEach(track => track.stop());
        gestureStream = null;
    }
}

deckStage.addEventListener('pointerdown', event => {
    pointerActive = true;
    pointerStartX = event.clientX;
});

deckStage.addEventListener('pointerup', event => {
    if (!pointerActive) return;
    const deltaX = event.clientX - pointerStartX;
    pointerActive = false;
    if (Math.abs(deltaX) > 36) {
        shiftFocus(deltaX > 0 ? -1 : 1);
        return;
    }
    pickFocusedCard();
});

deckStage.addEventListener('pointercancel', () => {
    pointerActive = false;
});

window.addEventListener('beforeunload', stopGestureControl);

function init() {
    const savedSpread = localStorage.getItem('selected_tarot_spread');
    if (savedSpread && SPREADS[savedSpread]) spreadSelect.value = savedSpread;
    providerSelect.value = getSelectedProvider();
    updateProviderUI();
    applyMirrorState();
    syncSpreadCards();
    deckOrder = shuffle(Array.from({ length: tarotCards.length }, (_, index) => index));
    renderDeck();
    renderPickedCards();
    updateSelectionStatus();
    if (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        startGestureControl();
    } else {
        gestureStatus.textContent = '请在 HTTPS 或 localhost 下使用摄像头';
    }
}

init();
