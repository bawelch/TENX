(function buildQuestionCatalogue() {
    const poolMap = Object.fromEntries(
        window.TOP_TEN_ANSWER_POOLS.map((pool) => [pool.id, pool])
    );

    const questions = [];

    window.TOP_TEN_QUESTION_TEMPLATES.forEach((template) => {
        window.TOP_TEN_ANSWER_POOLS.forEach((pool) => {
            questions.push({
                id: `${pool.id}__${template.id}`,
                poolId: pool.id,
                label: template.label,
                title: template.promptBuilder(pool),
                description: template.description,
                rankingMode: "computed",
                metric: template.metric,
                sortDirection: template.sortDirection,
                topN: 10
            });
        });
    });

    questions.push({
        id: "countries_population_top10_worldbank_2022",
        poolId: "countries_all",
        label: "Most populous countries",
        title: "Top 10 most populous countries in the world",
        description: "Rank the 10 most populous countries. This is a fixed-answer question rather than a generated metric question.",
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
    });

    window.TOP_TEN_QUESTION_POOL_MAP = poolMap;
    window.TOP_TEN_QUESTIONS = questions.sort((a, b) => {
        const poolCompare = a.poolId.localeCompare(b.poolId);
        if (poolCompare !== 0) return poolCompare;
        return a.label.localeCompare(b.label);
    });
})();