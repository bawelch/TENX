(function () {
  const SCRABBLE_SCORES = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
    n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
  };

  const MAX_ATTEMPTS = 5;

  const state = {
    poolId: window.TOP_TEN_ANSWER_POOLS[0].id,
    questionId: null,
    guesses: [],
    statuses: [],
    locked: [],
    attemptsUsed: 0,
    eliminated: new Set(),
    priority: new Set(),
    activeIndex: null,
    finished: false,
    solved: false,
    answerMilestones: {}
  };

  const els = {
    poolSelect: document.getElementById("poolSelect"),
    questionSelect: document.getElementById("questionSelect"),
    randomQuestionBtn: document.getElementById("randomQuestionBtn"),
    title: document.getElementById("questionTitle"),
    subtitle: document.getElementById("questionSubtitle"),
    list: document.getElementById("list"),
    submitBtn: document.getElementById("submitBtn"),
    resetBtn: document.getElementById("resetBtn"),
    message: document.getElementById("message"),
    attemptsUsed: document.getElementById("attemptsUsed"),
    lockedCount: document.getElementById("lockedCount"),
    eliminatedCount: document.getElementById("eliminatedCount"),
    finalBoardScore: document.getElementById("finalBoardScore"),
    discoveryScore: document.getElementById("discoveryScore"),
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

  function normaliseText(value) {
    return value.toLowerCase().replace(/[^a-z]/g, "");
  }

  function countWords(value) {
    return value.trim().split(/\s+/).filter(Boolean).length;
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

  function compareValues(a, b, sortDirection) {
    if (typeof a === "string" && typeof b === "string") {
      return sortDirection === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    }
    return sortDirection === "asc" ? a - b : b - a;
  }

  function getCorrectAnswers(question) {
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

  function resetGame() {
    const answers = getCorrectAnswers(getQuestion(state.questionId));
    state.guesses = Array(answers.length).fill("");
    state.statuses = Array(answers.length).fill("empty");
    state.locked = Array(answers.length).fill(false);
    state.attemptsUsed = 0;
    state.eliminated = new Set();
    state.priority = new Set();
    state.activeIndex = null;
    state.finished = false;
    state.solved = false;
    initialiseMilestones();
    els.solutionWrap.classList.remove("show");
    setMessage("Select an answer for each rank, then submit.", "");
    render();
    closePicker();
  }

  function setMessage(text, type) {
    els.message.textContent = text;
    els.message.className = `message ${type || ""}`.trim();
  }

  function bindEvents() {
    els.poolSelect.addEventListener("change", (event) => {
      state.poolId = event.target.value;
      buildQuestionSelect();
      resetGame();
    });

    els.questionSelect.addEventListener("change", (event) => {
      state.questionId = event.target.value;
      resetGame();
    });

    els.randomQuestionBtn.addEventListener("click", () => {
      const questions = getQuestionsForPool(state.poolId);
      const next = questions[Math.floor(Math.random() * questions.length)];
      state.questionId = next.id;
      els.questionSelect.value = state.questionId;
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

    els.title.textContent = question.title;
    els.subtitle.textContent = question.description;
    els.attemptsUsed.textContent = `${state.attemptsUsed} / ${MAX_ATTEMPTS}`;
    els.lockedCount.textContent = `${state.locked.filter(Boolean).length} / ${correctAnswers.length}`;
    els.eliminatedCount.textContent = `${state.eliminated.size}`;
    els.submitBtn.disabled = state.finished;

    renderScorePanel();
    renderBoard(correctAnswers);
  }

  function renderBoard(correctAnswers) {
    els.list.innerHTML = correctAnswers.map((_, index) => {
      const guess = state.guesses[index];
      const status = state.statuses[index];
      const locked = state.locked[index];
      const statusText = status === "green"
        ? "Locked"
        : status === "yellow"
          ? "Top 10"
          : status === "grey"
            ? "Out"
            : "";

      const classes = [`state-${status}`];
      if (status !== "empty") classes.push("has-status");

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
    const boardScore = window.TOP_TEN_SCORING.getBoardScore(state.statuses);
    const discoveryScore = window.TOP_TEN_SCORING.getDiscoveryScore(state.answerMilestones);
    const totalScore = boardScore + discoveryScore;

    els.finalBoardScore.textContent = String(boardScore);
    els.discoveryScore.textContent = String(discoveryScore);
    els.totalScore.textContent = String(totalScore);

    const boardBreakdown = window.TOP_TEN_SCORING.getBoardBreakdown(state.statuses);
    const discoveryBreakdown = window.TOP_TEN_SCORING.getDiscoveryBreakdown(state.answerMilestones);

    const greenDiscovery = Object.entries(discoveryBreakdown.greenByTurn)
      .map(([turn, count]) => `G${turn}: ${count}`)
      .join(" · ");
    const yellowDiscovery = Object.entries(discoveryBreakdown.yellowByTurn)
      .map(([turn, count]) => `Y${turn}: ${count}`)
      .join(" · ");

    els.scoringDetail.innerHTML = `
      <div><strong>Board:</strong> ${boardBreakdown.green} green, ${boardBreakdown.yellow} yellow, ${boardBreakdown.grey} grey</div>
      <div><strong>Discovery:</strong> ${greenDiscovery}</div>
      <div><strong>Yellow discovery:</strong> ${yellowDiscovery}</div>
    `;
  }

  function getUnavailableAnswers(currentIndex) {
    return new Set(
      state.guesses
        .map((guess, index) => ({ guess, index }))
        .filter(({ guess, index }) => Boolean(guess) && index !== currentIndex)
        .map(({ guess }) => guess)
    );
  }

  function getAvailableOptions() {
    const pool = getAnswerPoolForCurrentQuestion();
    const search = els.pickerSearch.value.trim().toLowerCase();
    const currentGuess = state.activeIndex != null ? state.guesses[state.activeIndex] : "";
    const unavailable = getUnavailableAnswers(state.activeIndex);

    const options = pool.items.filter((answer) => {
      if (state.eliminated.has(answer) && answer !== currentGuess) return false;
      if (unavailable.has(answer) && answer !== currentGuess) return false;
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
    state.activeIndex = index;
    els.pickerTitle.textContent = `Choose answer for rank ${index + 1}`;
    els.pickerSubtitle.textContent = "Yellow answers float to the top. Eliminated answers and duplicates are hidden.";
    els.pickerSearch.value = "";
    els.pickerOverlay.classList.add("show");
    renderPickerOptions();
    requestAnimationFrame(() => els.pickerSearch.focus());
  }

  function closePicker() {
    state.activeIndex = null;
    els.pickerOverlay.classList.remove("show");
    els.pickerSearch.value = "";
  }

  function renderPickerOptions() {
    const options = getAvailableOptions();
    els.pickerCount.textContent = `${options.length} answers available`;

    if (!options.length) {
      els.pickerOptions.innerHTML = `<div class="empty-search">No supplied answers match that search.</div>`;
      return;
    }

    els.pickerOptions.innerHTML = options.map((answer) => `
      <button class="option" data-answer="${escapeHtml(answer)}" type="button">
        <span>${escapeHtml(answer)}</span>
        <span class="option-badge">${state.priority.has(answer) ? "prioritised" : ""}</span>
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
    const topTenSet = new Set(correctAnswers);

    state.guesses.forEach((guess, index) => {
      if (state.locked[index]) return;

      if (guess === correctAnswers[index]) {
        state.statuses[index] = "green";
        state.locked[index] = true;
        state.priority.delete(guess);

        if (state.answerMilestones[guess] && !state.answerMilestones[guess].firstGreenTurn) {
          state.answerMilestones[guess].firstGreenTurn = turn;
        }
        return;
      }

      if (topTenSet.has(guess)) {
        state.statuses[index] = "yellow";
        state.priority.add(guess);

        if (state.answerMilestones[guess] && !state.answerMilestones[guess].firstYellowTurn) {
          state.answerMilestones[guess].firstYellowTurn = turn;
        }
        return;
      }

      state.statuses[index] = "grey";
      state.eliminated.add(guess);
    });

    const solved = state.locked.every(Boolean);
    const attemptsLeft = MAX_ATTEMPTS - state.attemptsUsed;

    if (solved) {
      state.solved = true;
      state.finished = true;
      revealSolution(false);
      setMessage(`Solved in ${turn} submit${turn === 1 ? "" : "s"}. Final score recorded.`, "success");
    } else if (attemptsLeft === 0) {
      state.finished = true;
      revealSolution(true);
      setMessage("No submits left. Final score and correct order are now shown.", "warn");
    } else {
      setMessage(`${attemptsLeft} submit${attemptsLeft === 1 ? "" : "s"} remaining. Green locks, yellow prioritises, grey eliminates.`, "");
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
    buildPoolSelect();
    buildQuestionSelect();
    bindEvents();
    resetGame();
  }

  init();
})();