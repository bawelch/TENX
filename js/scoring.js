window.TOP_TEN_SCORING = {
    boardWeights: {
        green: 120,
        yellow: 45,
        red: -15
    },
    discoveryWeights: {
        green: { 1: 140, 2: 110, 3: 80, 4: 50, 5: 30 },
        yellow: { 1: 50, 2: 40, 3: 30, 4: 20, 5: 10 }
    },
    getBoardScore(statuses) {
        return statuses.reduce((sum, status) => {
            const key = status === "grey" ? "red" : status;
            return sum + (this.boardWeights[key] || 0);
        }, 0);
    },
    getBoardBreakdown(statuses) {
        return statuses.reduce((acc, status) => {
            const key = status === "grey" ? "red" : status;
            if (!acc[key]) acc[key] = 0;
            acc[key] += 1;
            return acc;
        }, { green: 0, yellow: 0, red: 0 });
    },
    getDiscoveryScore(answerMilestones) {
        return Object.values(answerMilestones).reduce((sum, milestone) => {
            const yellowScore = milestone.firstYellowTurn
                ? (this.discoveryWeights.yellow[milestone.firstYellowTurn] || 0)
                : 0;
            const greenScore = milestone.firstGreenTurn
                ? (this.discoveryWeights.green[milestone.firstGreenTurn] || 0)
                : 0;
            return sum + yellowScore + greenScore;
        }, 0);
    },
    getDiscoveryBreakdown(answerMilestones) {
        const output = {
            yellowByTurn: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            greenByTurn: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };

        Object.values(answerMilestones).forEach((milestone) => {
            if (milestone.firstYellowTurn) {
                output.yellowByTurn[milestone.firstYellowTurn] += 1;
            }
            if (milestone.firstGreenTurn) {
                output.greenByTurn[milestone.firstGreenTurn] += 1;
            }
        });

        return output;
    }
};