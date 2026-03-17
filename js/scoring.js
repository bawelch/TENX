window.TOP_TEN_SCORING = {
    boardWeights: {
        green: 120,
        yellow: 45,
        red: -15
    },

    discoveryWeights: {
        green: { 1: 100, 2: 90, 3: 85, 4: 80, 5: 75 },
        yellow: { 1: 75, 2: 65, 3: 60, 4: 55, 5: 50 }
    },

    getBoardScore(statuses) {
        return statuses.reduce((sum, status) => {
            return sum + (this.boardWeights[status] || 0);
        }, 0);
    },

    getBoardBreakdown(statuses) {
        return statuses.reduce((acc, status) => {
            if (!acc[status]) acc[status] = 0;
            acc[status] += 1;
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