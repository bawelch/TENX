(function appendManualQuestions() {
    if (!Array.isArray(window.TOP_TEN_QUESTIONS)) {
        window.TOP_TEN_QUESTIONS = [];
    }

    const manualQuestions = [
        {
            id: "countries_population_top10_worldbank_2022",
            poolId: "countries_all",
            label: "Most populous countries",
            title: "Top 10 most populous countries in the world",
            description: "Rank the 10 most populous countries.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "India",
                "China",
                "United States",
                "Indonesia",
                "Pakistan",
                "Nigeria",
                "Brazil",
                "Bangladesh",
                "Russia",
                "Mexico"
            ],
            correctTexts: [
                "1.42B",
                "1.41B",
                "333M",
                "276M",
                "236M",
                "219M",
                "215M",
                "171M",
                "144M",
                "128M"
            ]
        }
    ];

    const existingIds = new Set(window.TOP_TEN_QUESTIONS.map((q) => q.id));

    manualQuestions.forEach((question) => {
        if (!existingIds.has(question.id)) {
            window.TOP_TEN_QUESTIONS.push(question);
        }
    });

    window.TOP_TEN_QUESTIONS.sort((a, b) => {
        const poolCompare = a.poolId.localeCompare(b.poolId);
        if (poolCompare !== 0) return poolCompare;
        return a.label.localeCompare(b.label);
    });
})();