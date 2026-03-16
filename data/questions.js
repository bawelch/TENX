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

  window.TOP_TEN_QUESTION_POOL_MAP = poolMap;
  window.TOP_TEN_QUESTIONS = questions.sort((a, b) => {
    const poolCompare = a.poolId.localeCompare(b.poolId);
    if (poolCompare !== 0) return poolCompare;
    return a.label.localeCompare(b.label);
  });
})();