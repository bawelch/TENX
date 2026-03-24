(function () {
    const SCRABBLE_SCORES = {
        a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
        n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
    };
    const BASE_LEVEL_XP = 100;
    const LEVEL_SCALING = 1.5;
    const MAX_ATTEMPTS = 3;
    const DEFAULT_START_QUESTION_ID = "girls_names_mambo5";
    let hasUsedDefaultStartQuestion = false;

    const GAME_MODES = {
        classic_plus: {
            id: "classic_plus",
            label: "Classic+",
            description: "Top-10 hint only. No scoring",
            scoring: false,
            directionalHints: false,
            debugTools: false
        },
        modern: {
            id: "modern",
            label: "Modern",
            description: "Classic+ with scoring",
            scoring: true,
            directionalHints: false,
            debugTools: false
        },
        modern_plus: {
            id: "modern_plus",
            label: "Modern+",
            description: "Scoring plus higher/lower hints",
            scoring: true,
            directionalHints: true,
            debugTools: false
        },
        debug: {
            id: "debug",
            label: "Debug",
            description: "The safe option right now",
            scoring: true,
            directionalHints: true,
            debugTools: true
        }
    };

    const state = {
        poolId: window.TOP_TEN_ANSWER_POOLS[0].id,
        questionId: null,
        mode: "debug",
        guesses: [],
        statuses: [],
        locked: [],
        excludedByIndex: [],
        yellowExcludedByAnswer: {},
        attemptsUsed: 0,
        eliminated: new Set(),
        priority: new Set(),
        activeIndex: null,
        finished: false,
        solved: false,
        answerMilestones: {},
        hp: 100,
        maxHp: 100,
        bankedCoins: 0,
        bankedXp: 250,
        roundHpApplied: false,
    };

    const els = {
        gameTitleBtn: document.getElementById("gameTitleBtn"),
        xpScore: document.getElementById("xpScore"),
        healthBar: document.getElementById("healthBar"),
        healthPreviewBar: document.getElementById("healthPreviewBar"),
        modeSelect: document.getElementById("modeSelect"),
        modeDescription: document.getElementById("modeDescription"),
        poolControlGroup: document.getElementById("poolControlGroup"),
        questionControlGroup: document.getElementById("questionControlGroup"),
        poolSelect: document.getElementById("poolSelect"),
        questionSelect: document.getElementById("questionSelect"),
        randomQuestionBtn: document.getElementById("randomQuestionBtn"),
        title: document.getElementById("questionTitle"),
        subtitle: document.getElementById("questionSubtitle"),
        list: document.getElementById("list"),
        submitBtn: document.getElementById("submitBtn"),
        resetBtn: document.getElementById("resetBtn"),
        message: document.getElementById("message"),
        gameTitle: document.getElementById("gameTitle"),
        titleLevelFill: document.getElementById("titleLevelFill"),
        accuracyScore: document.getElementById("accuracyScore"),
        eliminatedCount: document.getElementById("eliminatedCount"),
        totalScore: document.getElementById("totalScore"),
        scoringDetail: document.getElementById("scoringDetail"),
        solutionWrap: document.getElementById("solutionWrap"),
        solution: document.getElementById("solution"),
        pickerOverlay: document.getElementById("pickerOverlay"),
        pickerTitle: document.getElementById("pickerTitle"),
        pickerSubtitle: document.getElementById("pickerSubtitle"),
        pickerSearch: document.getElementById("pickerSearch"),
        pickerOptions: document.getElementById("pickerOptions"),
        pickerCount: document.getElementById("pickerCount"),
        closePickerBtn: document.getElementById("closePickerBtn"),
        questionCount: document.getElementById("questionCount"),
        poolCount: document.getElementById("poolCount")
    };

    function getModeConfig() {
        return GAME_MODES[state.mode];
    }

    function normaliseText(value) {
        return value.toLowerCase().replace(/[^a-z]/g, "");
    }

    function countWords(value) {
        return value.trim().split(/\s+/).filter(Boolean).length;
    }
    function applyRoundHpChange() {
        if (state.roundHpApplied) {
            return;
        }

        const greenCount = state.statuses.filter((status) => status === "green").length;
        const redCount = state.statuses.filter((status) => status === "red").length;
        const delta = (greenCount * 2) - (redCount * 10);

        state.hp = Math.max(0, Math.min(state.maxHp, state.hp + delta));
        state.roundHpApplied = true;
    }
    function getAccuracyScore() {
        const coins = getCoinsTotal();
        const eliminated = state.eliminated.size;
        const denominator = coins + eliminated;

        if (denominator === 0) {
            return 0;
        }

        return (coins / denominator) * 100;
    }
    function getProjectedHpAfterRound() {
        const greenCount = state.statuses.filter((status) => status === "green").length;
        const redCount = state.statuses.filter((status) => status === "red").length;
        const delta = (greenCount * 2) - (redCount * 10);

        return Math.max(0, Math.min(state.maxHp, state.hp + delta));
    }
    function getQuestionById(questionId) {
        if (!Array.isArray(window.TOP_TEN_QUESTIONS)) return null;
        return window.TOP_TEN_QUESTIONS.find(q => q.id === questionId) || null;
    }
    function getNextQuestion() {
        if (!hasUsedDefaultStartQuestion) {
            const defaultQuestion = getQuestionById(DEFAULT_START_QUESTION_ID);
            hasUsedDefaultStartQuestion = true;

            if (defaultQuestion) {
                return defaultQuestion;
            }

            console.warn(`Default start question not found: ${DEFAULT_START_QUESTION_ID}`);
        }

        return getRandomQuestion();
    }
    function getTitlePhraseForLevel(level) {
        const phrases = window.TOP_TEN_LEVEL_TEXT || [];

        if (!phrases.length) {
            return "";
        }

        const index = Math.max(0, Math.min(level - 1, phrases.length - 1));
        return phrases[index];
    }
    function fillEmptyGuessesAtRandom() {
        const unlockedEmptyIndexes = state.guesses
            .map((guess, index) => ({ guess, index }))
            .filter(({ guess, index }) => !state.locked[index] && !guess)
            .map(({ index }) => index);

        if (!unlockedEmptyIndexes.length) {
            return;
        }

        const chosenThisPass = new Set();

        unlockedEmptyIndexes.forEach((index) => {
            const currentGuess = state.guesses[index];
            const unavailable = getUnavailableAnswers(index);
            const excludedHere = state.excludedByIndex[index] || new Set();

            const options = getAnswerPoolForCurrentQuestion().items.filter((answer) => {
                if (answer === currentGuess) return true;
                if (state.eliminated.has(answer)) return false;
                if (unavailable.has(answer)) return false;
                if (excludedHere.has(answer)) return false;
                if (chosenThisPass.has(answer)) return false;
                return true;
            });

            if (!options.length) {
                return;
            }

            const randomAnswer = options[Math.floor(Math.random() * options.length)];
            state.guesses[index] = randomAnswer;
            state.statuses[index] = "empty";
            chosenThisPass.add(randomAnswer);
        });
    }
    function bankCurrentRoundScores() {
        if (state.roundBanked) return;

        const roundBoardScore = window.TOP_TEN_SCORING.getBoardScore(state.statuses);
        const roundDiscoveryScore = window.TOP_TEN_SCORING.getDiscoveryScore(state.answerMilestones);

        state.bankedCoins += roundBoardScore;
        state.bankedXp += roundDiscoveryScore;
        state.roundBanked = true;
    }
    function getRoundDelta(question) {
        return getCurrentRoundPoints() - getQuestionTarget(question);
    }

    function getNextButtonWordFromDelta(delta) {
        const words = window.TOP_TEN_META_SCALES?.nextButtonWords || [];

        if (!words.length) {
            return "Average";
        }

        const clamped = Math.max(-10, Math.min(10, delta));
        return words[clamped + 10];
    }
    function renderMetaBar() {
        const totalCoins = getCoinsTotal();
        const totalXp = getXpTotal();
        const levelInfo = getLevelInfo(totalXp);
        const accuracy = getAccuracyScore();

        els.totalScore.textContent = String(totalCoins);
        els.accuracyScore.textContent = `${getAccuracyScore().toFixed(2)}%`;

        if (els.gameTitle) {
            const titlePhrase = getTitlePhraseForLevel(levelInfo.level);
            els.gameTitle.textContent = `LEVEL ${levelInfo.level} (${Math.floor(levelInfo.progressPct)}%)${titlePhrase ? ` - ${titlePhrase}` : ""}`;
        }

        if (els.titleLevelFill) {
            els.titleLevelFill.style.width = `${levelInfo.progressPct}%`;
            els.titleLevelFill.style.backgroundColor = getXpCompletionColor(levelInfo.progressPct);
        }
    }
    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function interpolateRgb(colorA, colorB, t) {
        return {
            r: Math.round(lerp(colorA.r, colorB.r, t)),
            g: Math.round(lerp(colorA.g, colorB.g, t)),
            b: Math.round(lerp(colorA.b, colorB.b, t))
        };
    }

    function getXpCompletionColor(progressPct) {
        const t = Math.max(0, Math.min(100, progressPct));

        // Replace these with your actual UI colours if different
        const wrongRed = { r: 185, g: 74, b: 72 };
        const almostYellow = { r: 201, g: 162, b: 39 };
        const rightGreen = { r: 76, g: 175, b: 80 };


        let color;

        if (t <= 50) {
            color = interpolateRgb(wrongRed, almostYellow, t / 50);
        } else {
            color = interpolateRgb(almostYellow, rightGreen, (t - 50) / 50);
        }

        return `rgba(${color.r}, ${color.g}, ${color.b}, 0.95)`;
    }
    function isSubmitInactive() {
        return state.finished;
    }
    function getHpFillColor(hpPercent) {
        const t = Math.max(0, Math.min(100, hpPercent));

        const low = { r: 185, g: 74, b: 72 };     // red
        const mid = { r: 201, g: 162, b: 39 };     // yellow
        const high = { r: 76, g: 175, b: 80 };    // green

        let color;

        if (t <= 50) {
            color = interpolateRgb(low, mid, t / 50);
        } else {
            color = interpolateRgb(mid, high, (t - 50) / 50);
        }

        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    function getLevelInfo(xp, baseLevelXp = BASE_LEVEL_XP, levelScaling = LEVEL_SCALING) {
        const level = Math.floor(Math.pow(Math.max(0, xp), 1 / levelScaling) / baseLevelXp) + 1;

        const currentThreshold = Math.pow(baseLevelXp * (level - 1), levelScaling);
        const nextThreshold = Math.pow(baseLevelXp * level, levelScaling);

        const progressToNext = nextThreshold > currentThreshold
            ? (xp - currentThreshold) / (nextThreshold - currentThreshold)
            : 1;

        return {
            level,
            progressToNext,
            progressPct: Math.max(0, Math.min(100, progressToNext * 100)),
            currentThreshold,
            nextThreshold
        };
    }
    function renderHealthBar() {
        const hpPercent = state.maxHp > 0 ? (state.hp / state.maxHp) * 100 : 0;
        const projectedHp = getProjectedHpAfterRound();
        const projectedPercent = state.maxHp > 0 ? (projectedHp / state.maxHp) * 100 : 0;

        els.healthBar.style.width = `${hpPercent}%`;
        els.healthBar.style.backgroundColor = getHpFillColor(hpPercent);

        if (els.healthPreviewBar) {
            els.healthPreviewBar.style.width = `${projectedPercent}%`;
            els.healthPreviewBar.style.backgroundColor = getHpFillColor(projectedPercent);
        }
    }
    function getNameStats(value) {
        const normalized = normaliseText(value);
        const letters = normalized.length;
        const vowels = (normalized.match(/[aeiou]/g) || []).length;
        const consonants = letters - vowels;
        const uniqueLetters = new Set(normalized.split("")).size;
        const repeatedLetters = letters - uniqueLetters;
        const scrabble = normalized.split("").reduce((sum, ch) => sum + (SCRABBLE_SCORES[ch] || 0), 0);
        const words = countWords(value);

        return {
            normalized,
            letters,
            vowels,
            consonants,
            uniqueLetters,
            repeatedLetters,
            scrabble,
            words,
            alphabetical: normalized
        };
    }

    function getPool(poolId) {
        return window.TOP_TEN_QUESTION_POOL_MAP[poolId];
    }

    function getQuestionsForPool(poolId) {
        return window.TOP_TEN_QUESTIONS.filter((question) => question.poolId === poolId);
    }

    function getQuestion(questionId) {
        return window.TOP_TEN_QUESTIONS.find((question) => question.id === questionId);
    }

    function getAnswerPoolForCurrentQuestion() {
        return getPool(state.poolId);
    }
    function getQuestionDisplayCount(question) {
        return Math.max(1, Number.isInteger(question.display) ? question.display : 10);
    }

    function getQuestionTarget(question) {
        return Math.max(0, Number.isInteger(question.target) ? question.target : 0);
    }

    function getDisplayedCorrectAnswers(question) {
        const allCorrectAnswers = getCorrectAnswers(question);
        return allCorrectAnswers.slice(0, getQuestionDisplayCount(question));
    }

    function getCurrentRoundPoints() {
        return state.statuses.filter((status) => status === "green" || status === "yellow").length;
    }
    function getRandomQuestion() {
        const questions = Array.isArray(window.TOP_TEN_QUESTIONS)
            ? window.TOP_TEN_QUESTIONS
            : [];

        if (!questions.length) {
            return null;
        }

        return questions[Math.floor(Math.random() * questions.length)];
    }
    function compareValues(a, b, sortDirection) {
        if (typeof a === "string" && typeof b === "string") {
            return sortDirection === "asc" ? a.localeCompare(b) : b.localeCompare(a);
        }
        return sortDirection === "asc" ? a - b : b - a;
    }

    function getCorrectAnswers(question) {
        if (Array.isArray(question.correctAnswers) && question.correctAnswers.length) {
            return question.correctAnswers.slice();
        }

        if (Array.isArray(question.answers) && question.answers.length) {
            return question.answers.slice();
        }

        const pool = getPool(question.poolId);
        const ranked = pool.items
            .map((item) => ({ item, stats: getNameStats(item) }))
            .sort((a, b) => {
                const primary = compareValues(a.stats[question.metric], b.stats[question.metric], question.sortDirection);
                if (primary !== 0) return primary;
                return a.item.localeCompare(b.item);
            });

        return ranked.slice(0, question.topN).map((entry) => entry.item);
    }
    //function getPickerBadgeText(answer, correctAnswers) {
    //    if (!state.priority.has(answer)) {
    //        return "";
    //    }

    //    const currentGuessIndex = state.guesses.indexOf(answer);

    //    if (currentGuessIndex === -1) {
    //        return "Top 10";
    //    }

    //    const mainBoxText = getDirectionLabel(answer, currentGuessIndex, correctAnswers);

    //    if (!getModeConfig().directionalHints) {
    //        return "Top 10";
    //    }

    //    return `${mainBoxText} than ${currentGuessIndex + 1}`;
    //}
    function getPickerBadgeText(answer) {
        if (!state.priority.has(answer)) {
            return "";
        }
        return "+++";
    }

    function getDirectionLabel(answer, currentIndex, correctAnswers) {
        const mode = getModeConfig();

        //if (!mode.directionalHints) {
        //    return "*";
        //}

        //const actualIndex = correctAnswers.indexOf(answer);

        //if (actualIndex === -1 || currentIndex == null || actualIndex === currentIndex) {
        //    return "*";
        //}

        //return actualIndex < currentIndex ? "*" : "*";

        if (!mode.directionalHints) {
            return "Top 10";
        }

        const actualIndex = correctAnswers.indexOf(answer);

        if (actualIndex === -1 || currentIndex == null || actualIndex === currentIndex) {
            return "Top 10";
        }

        return actualIndex < currentIndex ? "Higher" : "Lower";
    }

    function buildModeSelect() {
        els.modeSelect.innerHTML = Object.values(GAME_MODES)
            .map((mode) => `<option value="${mode.id}">${mode.label}</option>`)
            .join("");
        els.modeSelect.value = state.mode;
        els.modeDescription.textContent = getModeConfig().description;
    }

    function buildPoolSelect() {
        els.poolSelect.innerHTML = window.TOP_TEN_ANSWER_POOLS
            .map((pool) => `<option value="${pool.id}">${pool.label}</option>`)
            .join("");
        els.poolSelect.value = state.poolId;
        els.poolCount.textContent = `${window.TOP_TEN_ANSWER_POOLS.length} answer pools`;
    }

    function buildQuestionSelect() {
        const questions = getQuestionsForPool(state.poolId);
        els.questionSelect.innerHTML = questions
            .map((question) => `<option value="${question.id}">${question.label}</option>`)
            .join("");

        if (!state.questionId || !questions.some((question) => question.id === state.questionId)) {
            state.questionId = questions[0].id;
        }

        els.questionSelect.value = state.questionId;
        els.questionCount.textContent = `${questions.length} questions in this pool`;
    }
    function getCoinsTotal() {
        return state.bankedCoins + window.TOP_TEN_SCORING.getBoardScore(state.statuses);
    }

    function getXpTotal() {
        return state.bankedXp + window.TOP_TEN_SCORING.getDiscoveryScore(state.answerMilestones);
    }
    function initialiseMilestones() {
        const question = getQuestion(state.questionId);
        const answers = getDisplayedCorrectAnswers(question);

        state.answerMilestones = {};
        answers.forEach((answer) => {
            state.answerMilestones[answer] = {
                firstYellowTurn: null,
                firstGreenTurn: null
            };
        });
    }
    function getCorrectTagText(question, index) {
        if (Array.isArray(question.correctTexts)) {
            const text = question.correctTexts[index];
            if (typeof text === "string" && text.trim() !== "") {
                return text.trim();
            }
        }
        return "Locked";
    }
    function resetGame() {
        const answers = getDisplayedCorrectAnswers(getQuestion(state.questionId));
        state.guesses = Array(answers.length).fill("");
        state.statuses = Array(answers.length).fill("empty");
        state.locked = Array(answers.length).fill(false);
        state.excludedByIndex = Array.from({ length: answers.length }, () => new Set());
        state.yellowExcludedByAnswer = {};
        state.attemptsUsed = 0;
        state.eliminated = new Set();
        state.priority = new Set();
        state.activeIndex = null;
        state.finished = false;
        state.solved = false;
        state.roundHpApplied = false;
        state.roundScored = false;
        state.roundBanked = false;
        initialiseMilestones();
        els.solutionWrap.classList.remove("show");
        setMessage("", "");
        render();
        closePicker();
    }

    function setMessage(text, type) {
        els.message.textContent = text;
        els.message.className = `message ${type || ""}`.trim();
    }

    function bindEvents() {
        els.modeSelect.addEventListener("change", (event) => {
            state.mode = event.target.value;
            els.modeDescription.textContent = getModeConfig().description;
            render();
        });

        els.poolSelect.addEventListener("change", (event) => {
            if (!getModeConfig().debugTools) return;
            state.poolId = event.target.value;
            buildQuestionSelect();
            bankCurrentRoundScores();
            resetGame();
        });

        els.questionSelect.addEventListener("change", (event) => {
            if (!getModeConfig().debugTools) return;
            state.questionId = event.target.value;
            bankCurrentRoundScores();
            resetGame();
        });

        els.randomQuestionBtn.addEventListener("click", () => {
            if (!getModeConfig().debugTools) return;

            bankCurrentRoundScores();

            const next = getRandomQuestion();
            if (!next) return;

            state.questionId = next.id;
            state.poolId = next.poolId;

            buildPoolSelect();
            buildQuestionSelect();

            els.poolSelect.value = state.poolId;
            els.questionSelect.value = state.questionId;

            resetGame();
        });

        els.submitBtn.addEventListener("click", submitGuesses);
        els.resetBtn.addEventListener("click", (event) => {
            if (els.resetBtn.disabled || state.finished) {
                event.preventDefault();
                return;
            }
            clearUnconfirmedGuesses();
        });
        els.closePickerBtn.addEventListener("click", closePicker);
        els.pickerOverlay.addEventListener("click", (event) => {
            if (event.target === els.pickerOverlay) closePicker();
        });
        els.pickerSearch.addEventListener("input", renderPickerOptions);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closePicker();
        });
    }

    function render() {
        const question = getQuestion(state.questionId);
        const correctAnswers = getDisplayedCorrectAnswers(question);
        const mode = getModeConfig();
        const submitInactive = state.finished;

        renderHealthBar();
        renderMetaBar();

        els.title.textContent = question.title;
        els.subtitle.textContent = question.description;

        const heartsRemaining = Math.max(0, MAX_ATTEMPTS - state.attemptsUsed);
        const heartsHtml = Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
            return i < heartsRemaining
                ? '<span class="submit-heart full">&#10084;</span>'
                : '<span class="submit-heart empty">&#9825;</span>';
        }).join("");

        els.submitBtn.innerHTML = `
        <span class="submit-label">Submit</span>
        <span class="submit-hearts">${heartsHtml}</span>
    `;

        const roundDelta = getRoundDelta(question);
        const nextWord = getNextButtonWordFromDelta(roundDelta);

        if (els.randomQuestionBtn) {
            els.randomQuestionBtn.innerHTML = `
        <span class="next-label">${nextWord}</span>
        <span class="next-progress">${roundDelta > 0 ? `+${roundDelta}` : roundDelta}</span>
    `;
            els.randomQuestionBtn.disabled = false;
        }

        els.submitBtn.disabled = submitInactive;
        els.resetBtn.disabled = submitInactive;
        els.modeDescription.textContent = mode.description;

        els.poolSelect.disabled = !mode.debugTools;
        els.questionSelect.disabled = !mode.debugTools;
        els.scoringDetail.hidden = !mode.debugTools;

        if (mode.scoring) {
            renderScorePanel();
        }

        renderBoard(correctAnswers);
    }

    function renderBoard(correctAnswers) {
        const question = getQuestion(state.questionId);
        const isFailedReveal = state.finished && !state.solved;

        els.list.innerHTML = correctAnswers.map((_, index) => {
            const guess = state.guesses[index];
            const status = state.statuses[index];
            const locked = state.locked[index];

            const statusText = isFailedReveal && status !== "green"
                ? `${correctAnswers[index]}${getCorrectTagText(question, index) !== "Locked" ? ` - ${getCorrectTagText(question, index)}` : ""}`
                : status === "green"
                    ? getCorrectTagText(question, index)
                    : status === "yellow"
                        ? getDirectionLabel(guess, index, correctAnswers)
                        : status === "red"
                            ? "Wrong"
                            : "";

            const classes = [`state-${status}`];
            if (status !== "empty" || (isFailedReveal && status !== "green")) {
                classes.push("has-status");
            }

            return `
      <div class="${classes.join(" ")}">
        <div class="row">
          <div class="rank">${index + 1}</div>
          <button
            class="slot ${locked ? "locked" : ""} ${state.finished ? "disabled" : ""}"
            data-index="${index}"
            type="button"
            ${locked || state.finished ? "disabled" : ""}
          >
            <span class="slot-text ${guess ? "" : "placeholder"}">${guess || "Choose an answer"}</span>
            <span class="status-tag">${statusText}</span>
          </button>
        </div>
      </div>
    `;
        }).join("");

        els.list.querySelectorAll(".slot[data-index]").forEach((button) => {
            button.addEventListener("click", () => openPicker(Number(button.dataset.index)));
        });
    }

    function renderScorePanel() {
        const boardBreakdown = window.TOP_TEN_SCORING.getBoardBreakdown(state.statuses);
        const discoveryBreakdown = window.TOP_TEN_SCORING.getDiscoveryBreakdown(state.answerMilestones);
        const totalXp = getXpTotal();
        const levelInfo = getLevelInfo(totalXp);

        const greenDiscovery = Object.entries(discoveryBreakdown.greenByTurn)
            .map(([turn, count]) => `G${turn}: ${count}`)
            .join(" · ");
        const yellowDiscovery = Object.entries(discoveryBreakdown.yellowByTurn)
            .map(([turn, count]) => `Y${turn}: ${count}`)
            .join(" · ");

        els.scoringDetail.innerHTML = `
      <div><strong>Board:</strong> ${boardBreakdown.green} green, ${boardBreakdown.yellow} yellow, ${boardBreakdown.red} red</div>
      <div><strong>Discovery:</strong> ${greenDiscovery}</div>
      <div><strong>Yellow discovery:</strong> ${yellowDiscovery}</div>
      <div><strong>Level:</strong> ${levelInfo.level} (${Math.floor(levelInfo.progressPct)}% to next)</div>
    `;
    }
    function pickRandomQuestion() {
        const next = getRandomQuestion();

        if (!next) {
            state.questionId = null;
            return;
        }

        state.questionId = next.id;
        state.poolId = next.poolId;
    }
    function getUnavailableAnswers(currentIndex) {
        return new Set(
            state.guesses
                .map((guess, index) => ({ guess, index }))
                .filter(({ guess, index }) => {
                    return Boolean(guess) && index !== currentIndex && !state.priority.has(guess);
                })
                .map(({ guess }) => guess)
        );
    }

    function getAvailableOptions() {
        const pool = getAnswerPoolForCurrentQuestion();
        const search = els.pickerSearch.value.trim().toLowerCase();
        const currentGuess = state.activeIndex != null ? state.guesses[state.activeIndex] : "";
        const unavailable = getUnavailableAnswers(state.activeIndex);
        const excludedHere = state.activeIndex != null
            ? state.excludedByIndex[state.activeIndex]
            : new Set();

        const options = pool.items.filter((answer) => {
            // a) any answer ever marked red is globally excluded
            if (state.eliminated.has(answer) && answer !== currentGuess) return false;

            // existing cross-slot uniqueness rule
            if (unavailable.has(answer) && answer !== currentGuess) return false;

            // existing per-position red exclusion rule
            if (excludedHere.has(answer) && answer !== currentGuess) return false;

            // b) yellow answers are excluded from any position
            // where they have already been submitted this round
            const yellowExcludedPositions = state.yellowExcludedByAnswer[answer];
            if (
                yellowExcludedPositions &&
                state.activeIndex != null &&
                yellowExcludedPositions.has(state.activeIndex) &&
                answer !== currentGuess
            ) {
                return false;
            }

            if (!search) return true;
            return answer.toLowerCase().includes(search);
        });

        const priority = [];
        const regular = [];

        options.forEach((answer) => {
            if (state.priority.has(answer) && answer !== currentGuess) {
                priority.push(answer);
            } else {
                regular.push(answer);
            }
        });

        priority.sort((a, b) => a.localeCompare(b));
        regular.sort((a, b) => a.localeCompare(b));

        return [...priority, ...regular];
    }

    function openPicker(index) {
        if (state.finished || state.locked[index]) return;

        const mode = getModeConfig();

        state.activeIndex = index;
        els.pickerTitle.textContent = `Choose answer for rank ${index + 1}`;
        els.pickerSubtitle.textContent = mode.directionalHints
            ? "Make it a good 'un"
            : "Maybe the top ones, maybe not.";
        els.pickerSearch.value = "";
        els.pickerOverlay.classList.add("show");

        renderPickerOptions();
        els.pickerOptions.scrollTop = 0;

        requestAnimationFrame(() => {
            els.pickerSearch.focus();
            els.pickerOptions.scrollTop = 0;
        });
    }

    function closePicker() {
        state.activeIndex = null;
        els.pickerOverlay.classList.remove("show");
        els.pickerSearch.value = "";
    }

    function renderPickerOptions() {
        const question = getQuestion(state.questionId);
        const correctAnswers = getDisplayedCorrectAnswers(question);
        const options = getAvailableOptions();

        els.pickerCount.textContent = `${options.length} answers left`;

        if (!options.length) {
            els.pickerOptions.innerHTML = `<div class="empty-search">Not available.</div>`;
            return;
        }

        els.pickerOptions.innerHTML = options.map((answer) => `
      <button class="option" data-answer="${escapeHtml(answer)}" type="button">
        <span>${escapeHtml(answer)}</span>
        <span class="option-badge">${getPickerBadgeText(answer)}</span>
      </button>
    `).join("");

        els.pickerOptions.querySelectorAll(".option").forEach((button) => {
            button.addEventListener("click", () => {
                chooseAnswer(unescapeHtml(button.dataset.answer));
            });
        });
    }
    function clearUnconfirmedGuesses() {
        if (state.finished || els.resetBtn.disabled) return;

        state.guesses = state.guesses.map((guess, index) => {
            const status = state.statuses[index];
            return (status === "green" || status === "yellow") ? guess : "";
        });

        state.statuses = state.statuses.map((status) => {
            return (status === "green" || status === "yellow") ? status : "empty";
        });

        render();
        closePicker();
    }
    function chooseAnswer(answer) {
        if (state.activeIndex == null) return;
        state.guesses[state.activeIndex] = answer;
        state.statuses[state.activeIndex] = "empty";
        render();
        closePicker();
    }

    function submitGuesses() {
        if (state.finished) return;

        const mode = getModeConfig();

        fillEmptyGuessesAtRandom();

        const stillMissing = state.guesses
            .map((guess, index) => ({ guess, index }))
            .filter(({ guess, index }) => !state.locked[index] && !guess)
            .map(({ index }) => index + 1);

        if (stillMissing.length) {
            setMessage(`Could not auto-fill every empty rank. Missing: ${stillMissing.join(", ")}.`, "error");
            render();
            closePicker();
            return;
        }

        state.attemptsUsed += 1;
        const turn = state.attemptsUsed;
        const question = getQuestion(state.questionId);
        const correctAnswers = getDisplayedCorrectAnswers(question);

        const remainingCounts = {};
        correctAnswers.forEach((answer) => {
            remainingCounts[answer] = (remainingCounts[answer] || 0) + 1;
        });

        state.guesses.forEach((guess, index) => {
            if (state.locked[index]) return;

            if (guess === correctAnswers[index] && (remainingCounts[guess] || 0) > 0) {
                state.statuses[index] = "green";
                state.locked[index] = true;
                state.priority.delete(guess);
                remainingCounts[guess] -= 1;

                if (state.answerMilestones[guess] && !state.answerMilestones[guess].firstGreenTurn) {
                    state.answerMilestones[guess].firstGreenTurn = turn;
                }
            }
        });

        state.guesses.forEach((guess, index) => {
            if (state.locked[index]) return;

            if ((remainingCounts[guess] || 0) > 0) {
                state.statuses[index] = "yellow";
                state.priority.add(guess);
                remainingCounts[guess] -= 1;

                if (!state.yellowExcludedByAnswer[guess]) {
                    state.yellowExcludedByAnswer[guess] = new Set();
                }
                state.yellowExcludedByAnswer[guess].add(index);

                if (state.answerMilestones[guess] && !state.answerMilestones[guess].firstYellowTurn) {
                    state.answerMilestones[guess].firstYellowTurn = turn;
                }
                return;
            }

            state.statuses[index] = "red";

            if (state.excludedByIndex[index]) {
                state.excludedByIndex[index].add(guess);
            }

            if (!correctAnswers.includes(guess)) {
                state.eliminated.add(guess);
            }
        });

        const solved = state.locked.every(Boolean);
        const attemptsLeft = MAX_ATTEMPTS - state.attemptsUsed;

        if (solved) {
            state.solved = true;
            state.finished = true;
            applyRoundHpChange();
            revealSolution(false);
            setMessage(
                mode.scoring
                    ? `Solved in ${turn} submit${turn === 1 ? "" : "s"}. Final score recorded.`
                    : `Solved in ${turn} submit${turn === 1 ? "" : "s"}.`,
                "success"
            );
        } else if (attemptsLeft === 0) {
            state.finished = true;
            applyRoundHpChange();
            revealSolution(true);
            setMessage(
                mode.scoring
                    ? "No submits left. Final score and correct order are now shown."
                    : "No submits left. Correct order is now shown.",
                "warn"
            );
        } else {
            const modeMessage = mode.directionalHints
                ? "Green locks, yellow shows higher/lower, red eliminates non-top-10 answers."
                : "Green locks, yellow confirms top-10 membership, red eliminates non-top-10 answers.";

            setMessage(`${attemptsLeft} submit${attemptsLeft === 1 ? "" : "s"} remaining. ${modeMessage}`, "");
        }

        render();
        closePicker();
    }

    function revealSolution(showIfFailed) {
        const question = getQuestion(state.questionId);
        const correctAnswers = getDisplayedCorrectAnswers(question);
        els.solution.innerHTML = correctAnswers.map((answer, index) => `
      <div class="solution-item"><div><span>${index + 1}.</span> ${escapeHtml(answer)}</div></div>
    `).join("");
        els.solutionWrap.classList.toggle("show", showIfFailed || state.solved);
    }

    function escapeHtml(value) {
        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }

    function unescapeHtml(value) {
        const text = document.createElement("textarea");
        text.innerHTML = value;
        return text.value;
    }

    function init() {
        buildModeSelect();

        const startQuestion = getNextQuestion();

        if (startQuestion) {
            state.questionId = startQuestion.id;
            state.poolId = startQuestion.poolId;
        }

        buildPoolSelect();
        buildQuestionSelect();
        bindEvents();
        resetGame();
    }

    init();
})();