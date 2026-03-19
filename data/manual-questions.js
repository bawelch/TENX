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
        },
        {
            id: "countries_population_bottom10_worldometer_2026",
            poolId: "countries_all",
            label: "Least populous countries",
            title: "Top 10 least populous countries in the world",
            description: "Rank the 10 least populous countries in the countries pool.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Tuvalu",
                "Nauru",
                "Palau",
                "Marshall Islands",
                "Monaco",
                "Liechtenstein",
                "Saint Kitts and Nevis",
                "Dominica",
                "Andorra",
                "Antigua and Barbuda"
            ],
            correctTexts: [
                "9,362",
                "12,101",
                "17,614",
                "35,075",
                "38,087",
                "40,368",
                "46,992",
                "65,511",
                "83,753",
                "94,626"
            ]
        },
        {
            id: "countries_land_area_top10_worldometer",
            poolId: "countries_all",
            label: "Largest land area",
            title: "Top 10 largest countries by land area",
            description: "Rank the 10 countries with the largest land area.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Russia",
                "Canada",
                "China",
                "United States",
                "Brazil",
                "Australia",
                "India",
                "Argentina",
                "Kazakhstan",
                "Algeria"
            ],
            correctTexts: [
                "16.38M km²",
                "9.09M km²",
                "9.39M km²",
                "9.15M km²",
                "8.36M km²",
                "7.68M km²",
                "2.97M km²",
                "2.74M km²",
                "2.70M km²",
                "2.38M km²"
            ]
        },
        {
            id: "countries_land_area_bottom10_worldometer",
            poolId: "countries_all",
            label: "Smallest land area",
            title: "Top 10 smallest countries by land area",
            description: "Rank the 10 countries with the smallest land area.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Monaco",
                "Nauru",
                "Tuvalu",
                "San Marino",
                "Liechtenstein",
                "Marshall Islands",
                "Saint Kitts and Nevis",
                "Maldives",
                "Malta",
                "Grenada"
            ],
            correctTexts: [
                "1 km²",
                "20 km²",
                "30 km²",
                "60 km²",
                "160 km²",
                "180 km²",
                "260 km²",
                "300 km²",
                "320 km²",
                "340 km²"
            ]
        },
        {
            id: "countries_gdp_per_capita_top10_imf_2026",
            poolId: "countries_all",
            label: "Highest GDP per capita",
            title: "Top 10 countries by nominal GDP per capita",
            description: "Rank the 10 countries with the highest nominal GDP per capita.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Monaco",
                "Liechtenstein",
                "Luxembourg",
                "Ireland",
                "Switzerland",
                "Iceland",
                "Singapore",
                "Norway",
                "United States",
                "Denmark"
            ],
            correctTexts: [
                "$256.6K",
                "$246.7K",
                "$154.1K",
                "$135.2K",
                "$118.2K",
                "$108.6K",
                "$99.0K",
                "$96.6K",
                "$92.9K",
                "$82.7K"
            ]
        },
        {
            id: "countries_gdp_per_capita_bottom10_imf_2026",
            poolId: "countries_all",
            label: "Lowest GDP per capita",
            title: "Top 10 countries with the lowest nominal GDP per capita",
            description: "Rank the 10 countries with the lowest nominal GDP per capita.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "South Sudan",
                "Yemen",
                "Afghanistan",
                "Burundi",
                "North Korea",
                "Central African Republic",
                "Madagascar",
                "Eritrea",
                "Mozambique",
                "Malawi"
            ],
            correctTexts: [
                "$369",
                "$401",
                "$417",
                "$618",
                "$640",
                "$651",
                "$653",
                "$656",
                "$720",
                "$721"
            ]
        },
        {
            id: "countries_life_expectancy_top10_worldometer_2026",
            poolId: "countries_all",
            label: "Highest life expectancy",
            title: "Top 10 countries by life expectancy",
            description: "Rank the 10 countries with the highest life expectancy at birth.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Monaco",
                "San Marino",
                "Japan",
                "South Korea",
                "Andorra",
                "Switzerland",
                "Australia",
                "Italy",
                "Singapore",
                "Spain"
            ],
            correctTexts: [
                "86.73 years",
                "86.03 years",
                "85.15 years",
                "84.64 years",
                "84.46 years",
                "84.37 years",
                "84.34 years",
                "84.18 years",
                "84.13 years",
                "84.08 years"
            ]
        },
        {
            id: "countries_life_expectancy_bottom10_worldometer_2026",
            poolId: "countries_all",
            label: "Lowest life expectancy",
            title: "Top 10 countries with the lowest life expectancy",
            description: "Rank the 10 countries with the lowest life expectancy at birth.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Nigeria",
                "Chad",
                "South Sudan",
                "Central African Republic",
                "Lesotho",
                "Somalia",
                "Mali",
                "Guinea",
                "Benin",
                "Burkina Faso"
            ],
            correctTexts: [
                "54.95 years",
                "55.58 years",
                "57.97 years",
                "58.15 years",
                "58.63 years",
                "59.26 years",
                "61.11 years",
                "61.23 years",
                "61.32 years",
                "61.65 years"
            ]
        },
        {
            id: "countries_coastline_bottom10_cia",
            poolId: "countries_all",
            label: "Shortest coastline",
            title: "Top 10 shortest coastlines (excluding landlocked countries)",
            description: "Rank the 10 countries with the shortest non-zero coastlines. Landlocked countries are excluded.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Monaco",
                "Bosnia and Herzegovina",
                "Tuvalu",
                "Jordan",
                "Nauru",
                "Democratic Republic of the Congo",
                "Slovenia",
                "Togo",
                "Iraq",
                "Belgium"
            ],
            correctTexts: [
                "4.1 km",
                "20 km",
                "24 km",
                "26 km",
                "30 km",
                "37 km",
                "46.6 km",
                "56 km",
                "58 km",
                "66.5 km"
            ]
        },
        {
            id: "countries_population_density_top10_2026",
            poolId: "countries_all",
            label: "Highest population density",
            title: "Top 10 countries by population density",
            description: "Rank the 10 countries with the highest population density.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Monaco",
                "Singapore",
                "Bahrain",
                "Maldives",
                "Malta",
                "Bangladesh",
                "Barbados",
                "Mauritius",
                "Nauru",
                "Rwanda"
            ],
            correctTexts: [
                "25,562/km²",
                "8,437/km²",
                "2,205/km²",
                "1,772/km²",
                "1,716/km²",
                "1,366/km²",
                "657/km²",
                "623/km²",
                "605/km²",
                "604/km²"
            ]
        },
        {
            id: "countries_population_density_bottom10_2026",
            poolId: "countries_all",
            label: "Lowest population density",
            title: "Top 10 countries with the lowest population density",
            description: "Rank the 10 countries with the lowest population density.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Mongolia",
                "Australia",
                "Namibia",
                "Iceland",
                "Suriname",
                "Guyana",
                "Libya",
                "Canada",
                "Botswana",
                "Mauritania"
            ],
            correctTexts: [
                "2.29/km²",
                "3.54/km²",
                "3.83/km²",
                "4.01/km²",
                "4.14/km²",
                "4.27/km²",
                "4.28/km²",
                "4.45/km²",
                "4.59/km²",
                "5.30/km²"
            ]
        },
        {
            id: "countries_temperature_top10_worldbank_cru",
            poolId: "countries_all",
            label: "Hottest countries",
            title: "Top 10 hottest countries by average yearly temperature",
            description: "Rank the 10 hottest countries by average yearly temperature.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Burkina Faso",
                "Mali",
                "Senegal",
                "Mauritania",
                "Tuvalu",
                "Djibouti",
                "Gambia",
                "United Arab Emirates",
                "Maldives",
                "Niger"
            ],
            correctTexts: [
                "30.40°C",
                "29.21°C",
                "28.90°C",
                "28.82°C",
                "28.62°C",
                "28.49°C",
                "28.38°C",
                "28.17°C",
                "28.11°C",
                "28.04°C"
            ]
        },
        {
            id: "countries_temperature_bottom10_worldbank_cru",
            poolId: "countries_all",
            label: "Coldest countries",
            title: "Top 10 coldest countries by average yearly temperature",
            description: "Rank the 10 coldest countries by average yearly temperature.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "Canada",
                "Russia",
                "Mongolia",
                "Iceland",
                "Norway",
                "Finland",
                "Kyrgyzstan",
                "Sweden",
                "Tajikistan",
                "Estonia"
            ],
            correctTexts: [
                "-4.03°C",
                "-3.79°C",
                "1.07°C",
                "1.85°C",
                "2.21°C",
                "2.46°C",
                "2.65°C",
                "3.23°C",
                "3.85°C",
                "6.34°C"
            ]
        },
        {
            id: "agatha_christie_bestsellers_top10",
            poolId: "agatha_christie_bestsellers",
            label: "Best-selling Agatha Christie books",
            title: "Top 10 best-selling Agatha Christie books",
            description: "Rank the 10 Agatha Christie novels by approximate lifetime worldwide commercial success.",
            rankingMode: "fixed",
            topN: 10,
            correctAnswers: [
                "And Then There Were None",
                "Murder on the Orient Express",
                "The Murder of Roger Ackroyd",
                "Death on the Nile",
                "The A.B.C. Murders",
                "The Murder at the Vicarage",
                "The Body in the Library",
                "Endless Night",
                "Cards on the Table",
                "The Mysterious Affair at Styles"
            ],
            correctTexts: [
                "#1",
                "#2",
                "#3",
                "#4",
                "#5",
                "#6",
                "#7",
                "#8",
                "#9",
                "#10"
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