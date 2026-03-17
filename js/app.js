(function () {
    const SCRABBLE_SCORES = {
        a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
        n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
    };
    const BASE_LEVEL_XP = 100;
    const LEVEL_SCALING = 1.5;
    const MAX_ATTEMPTS = 3;

    const GAME_MODES = {
        classic_plus: {
            id: "classic_plus",
            label: "Classic+",
            description: "Top-10 hint only. No scoring.",
            scoring: false,
            directionalHints: false,
            debugTools: false
        },
        modern: {
            id: "modern",
            label: "Modern",
            description: "Classic+ with scoring.",
            scoring: true,
            directionalHints: false,
            debugTools: false
        },
        modern_plus: {
            id: "modern_plus",
            label: "Modern+",
            description: "Scoring plus higher/lower hints.",
            scoring: true,
            directionalHints: true,
            debugTools: false
        },
        debug: {
            id: "debug",
            label: "Debug",
            description: "Modern+ with answer-pool controls, question selection, random question, and detailed breakdowns.",
            scoring: true,
            directionalHints: true,
            debugTools: true
        }
    };

    const state = {
        poolId: window.TOP_TEN_ANSWER_POOLS[0].id,
        questionId: null,
        mode: "modern_plus",
        guesses: [],
        statuses: [],
        locked: [],
        excludedByIndex: [],
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
        bankedXp: 10000,
        roundHpApplied: false,
    };

    const els = {
        gameTitleBtn: document.getElementById("gameTitleBtn"),
        xpScore: document.getElementById("xpScore"),
        healthBar: document.getElementById("healthBar"),
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
    function bankCurrentRoundScores() {
        if (state.roundBanked) return;

        const roundBoardScore = window.TOP_TEN_SCORING.getBoardScore(state.statuses);
        const roundDiscoveryScore = window.TOP_TEN_SCORING.getDiscoveryScore(state.answerMilestones);

        state.bankedCoins += roundBoardScore;
        state.bankedXp += roundDiscoveryScore;
        state.roundBanked = true;
    }
    function renderMetaBar() {
        const totalCoins = getCoinsTotal();
        const totalXp = getXpTotal();
        const levelInfo = getLevelInfo(totalXp);
        const accuracy = getAccuracyScore();

        els.totalScore.textContent = String(totalCoins);
        els.accuracyScore.textContent = `${accuracy.toFixed(2)}%`;

        if (els.gameTitle) {
            els.gameTitle.textContent = `TENNER - LEVEL ${levelInfo.level} (${Math.floor(levelInfo.progressPct)}%)`;
        }

        if (els.titleLevelFill) {
            els.titleLevelFill.style.width = `${levelInfo.progressPct}%`;
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
        els.healthBar.style.width = `${hpPercent}%`;
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
    function getAccuracyScore() {
        const coins = getCoinsTotal();
        const eliminated = state.eliminated.size;
        const denominator = coins + eliminated;

        if (denominator === 0) {
            return 0;
        }

        return (coins / denominator) * 100;
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
    function getPickerBadgeText(answer, correctAnswers) {
        if (!state.priority.has(answer)) {
            return "";
        }

        const currentGuessIndex = state.guesses.indexOf(answer);

        if (currentGuessIndex === -1) {
            return "Top 10";
        }

        const mainBoxText = getDirectionLabel(answer, currentGuessIndex, correctAnswers);

        if (!getModeConfig().directionalHints) {
            return "Top 10";
        }

        return `${mainBoxText} than ${currentGuessIndex + 1}`;
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
        const answers = getCorrectAnswers(getQuestion(state.questionId));
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
        const answers = getCorrectAnswers(getQuestion(state.questionId));
        state.guesses = Array(answers.length).fill("");
        state.statuses = Array(answers.length).fill("empty");
        state.locked = Array(answers.length).fill(false);
        state.excludedByIndex = Array.from({ length: answers.length }, () => new Set());
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
            const questions = getQuestionsForPool(state.poolId);
            const next = questions[Math.floor(Math.random() * questions.length)];
            state.questionId = next.id;
            els.questionSelect.value = state.questionId;
            bankCurrentRoundScores();
            resetGame();
        });

        els.submitBtn.addEventListener("click", submitGuesses);
        els.resetBtn.addEventListener("click", resetGame);
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
        const correctAnswers = getCorrectAnswers(question);
        const mode = getModeConfig();
        renderHealthBar();
        renderMetaBar();
        els.title.textContent = question.title;
        els.subtitle.textContent = question.description;
        els.submitBtn.textContent = `Submit - ${state.attemptsUsed}/${MAX_ATTEMPTS}`;
/*        els.eliminatedCount.textContent = `${state.eliminated.size}`;*/
        els.submitBtn.disabled = state.finished;
        els.modeDescription.textContent = mode.description;

        els.poolSelect.disabled = !mode.debugTools;
        els.questionSelect.disabled = !mode.debugTools;
        els.randomQuestionBtn.disabled = !mode.debugTools;
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
    function pickRandomQuestionForCurrentPool() {
        const questions = getQuestionsForPool(state.poolId);

        if (!questions.length) {
            state.questionId = null;
            return;
        }

        const next = questions[Math.floor(Math.random() * questions.length)];
        state.questionId = next.id;
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
            if (state.eliminated.has(answer) && answer !== currentGuess) return false;
            if (unavailable.has(answer) && answer !== currentGuess) return false;
            if (excludedHere.has(answer) && answer !== currentGuess) return false;
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
            ? "Prioritised answers are shared across all active ranks. Yellow hints show higher or lower."
            : "Prioritised answers are shared across all active ranks. Yellow hints only confirm top-10 membership.";
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
        const correctAnswers = getCorrectAnswers(question);
        const options = getAvailableOptions();

        els.pickerCount.textContent = `${options.length} answers available`;

        if (!options.length) {
            els.pickerOptions.innerHTML = `<div class="empty-search">No supplied answers match that search.</div>`;
            return;
        }

        els.pickerOptions.innerHTML = options.map((answer) => `
      <button class="option" data-answer="${escapeHtml(answer)}" type="button">
        <span>${escapeHtml(answer)}</span>
        <span class="option-badge">${getPickerBadgeText(answer, correctAnswers)}</span>
      </button>
    `).join("");

        els.pickerOptions.querySelectorAll(".option").forEach((button) => {
            button.addEventListener("click", () => {
                chooseAnswer(unescapeHtml(button.dataset.answer));
            });
        });
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

        const missing = state.guesses
            .map((guess, index) => ({ guess, index }))
            .filter(({ guess, index }) => !state.locked[index] && !guess)
            .map(({ index }) => index + 1);

        if (missing.length) {
            setMessage(`Fill every unlocked rank before submitting. Missing: ${missing.join(", ")}.`, "error");
            return;
        }

        state.attemptsUsed += 1;
        const turn = state.attemptsUsed;
        const question = getQuestion(state.questionId);
        const correctAnswers = getCorrectAnswers(question);

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

                if (state.answerMilestones[guess] && !state.answerMilestones[guess].firstYellowTurn) {
                    state.answerMilestones[guess].firstYellowTurn = turn;
                }
                return;
            }

            state.statuses[index] = "red";

            // Exclude this answer from being chosen again for this same rank
            if (state.excludedByIndex[index]) {
                state.excludedByIndex[index].add(guess);
            }

            // Only eliminate globally if it is not a valid top-10 answer anywhere
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
            //awardRoundScoresOnce();
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
            //awardRoundScoresOnce();
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
        const correctAnswers = getCorrectAnswers(question);
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
        buildPoolSelect();
        pickRandomQuestionForCurrentPool();
        buildQuestionSelect();
        bindEvents();
        resetGame();
    }

    init();
})();