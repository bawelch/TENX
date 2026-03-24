(function appendManualQuestions() {
    if (!Array.isArray(window.TOP_TEN_QUESTIONS)) {
        window.TOP_TEN_QUESTIONS = [];
    }

    const manualQuestions = [
        {
            id: "countries_population_top10_worldbank_2022",
            poolId: "countries_all",
            label: "Most populous countries",
            title: "Most populated countries",
            description: "Where all the peeps at?",
            rankingMode: "fixed",
            topN: 10,
            target: 7,
            display: 10,
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
            title: "Least populated countries",
            description: "Easy targets",
            rankingMode: "fixed",
            topN: 10,
            target: 5,
            display: 10,
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
            title: "Largest countries (by land area)",
            description: "Room to store all their shit",
            rankingMode: "fixed",
            topN: 10,
            target: 7,
            display: 10,
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
            title: "Smallest countries (by land area)",
            description: "Cosy",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
            correctAnswers: [
                "Vatican City",
                "Monaco",
                "Nauru",
                "Tuvalu",
                "San Marino",
                "Liechtenstein",
                "Marshall Islands",
                "Saint Kitts and Nevis",
                "Maldives",
                "Malta",
            ],
            correctTexts: [
                "0.5 km²",
                "2 km²",
                "20 km²",
                "30 km²",
                "60 km²",
                "160 km²",
                "180 km²",
                "260 km²",
                "300 km²",
                "320 km²"
            ]
        },
        {
            id: "countries_gdp_per_capita_top10_imf_2026",
            poolId: "countries_all",
            label: "Highest GDP per capita",
            title: "Countries by GDP per capita",
            description: "Follow the money",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Lowest GDP per capita",
            description: "Po fo sho",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Life expectancy",
            description: "Strong genes (and healthcare)",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Lowest life expectancy",
            description: "Life on tough mode",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Countries with the shortest coastlines",
            description: "Landlocked countries are excluded",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Countries by population density",
            description: "Tight squeeze",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            target: 6,
            display: 10,
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
            title: "Lowest population density",
            description: "Spread your legs",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Hottest countries (av yearly temp)",
            description: "The mosty toasty",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
            title: "Coldest countries (av yearly temp)",
            description: "Bits will freeze off",
            rankingMode: "fixed",
            topN: 10,
            target: 6,
            display: 10,
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
        //{
        //    id: "agatha_christie_bestsellers_top10",
        //    poolId: "agatha_christie_bestsellers",
        //    label: "Best-selling Agatha Christie books",
        //    title: "Top 10 best-selling Agatha Christie books",
        //    description: "Rank the 10 Agatha Christie novels by approximate lifetime worldwide commercial success.",
        //    rankingMode: "fixed",
        //    topN: 10,
        //    correctAnswers: [
        //        "And Then There Were None",
        //        "Murder on the Orient Express",
        //        "The Murder of Roger Ackroyd",
        //        "Death on the Nile",
        //        "The A.B.C. Murders",
        //        "The Murder at the Vicarage",
        //        "The Body in the Library",
        //        "Endless Night",
        //        "Cards on the Table",
        //        "The Mysterious Affair at Styles"
        //    ],
        //    correctTexts: [
        //        "#1",
        //        "#2",
        //        "#3",
        //        "#4",
        //        "#5",
        //        "#6",
        //        "#7",
        //        "#8",
        //        "#9",
        //        "#10"
        //    ]
        //},
        {
            id: "girls_names_1974", poolid: "forenames", label: "1974", title: "1974 Girls' Names (UK)", description: "Not many Bessies", answers: ["Sarah","Claire","Nicola","Emma","Lisa","Joanne","Michelle","Helen","Samantha","Karen","Amanda","Rachel","Louise","Julie","Clare","Rebecca","Sharon","Victoria","Caroline","Susan"],correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]
        },
        {
            id: "girls_names_1984", poolid: "forenames", label: "1984", title: "1984 Girls' Names (UK)", description: "Not many Gertrudes", answers: ["Sarah","Laura","Gemma","Emma","Rebecca","Claire","Victoria","Samantha","Rachel","Amy","Jennifer","Nicola","Katie","Lisa","Kelly","Natalie","Louise","Michelle","Hayley","Hannah"],correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]
        },
        {
            id: "girls_names_1994", poolid: "forenames", label: "1994", title: "1994 Girls' Names (UK)", description: "Not many Mabels", answers: ["Rebecca","Lauren","Jessica","Charlotte","Hannah","Sophie","Amy","Emily","Laura","Emma","Chloe","Sarah","Lucy","Katie","Bethany","Jade","Megan","Alice","Rachel","Samantha"],correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]
        },
        {
            id: "girls_names_2004", poolid: "forenames", label: "2004", title: "2004 Girls' Names (UK)", description: "Not many Almas",answers: ["Emily","Ellie","Jessica","Sophie","Chloe","Olivia","Lucy","Charlotte","Katie","Megan","Grace","Hannah","Amy","Ella","Mia","Lily","Holly","Amelia","Abigail","Emma"],correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]
        },
        {
            id: "girls_names_2014", poolid: "forenames", label: "2014", title: "2014 Girls' Names (UK)", description: "Not many Berthas",answers: ["Amelia","Olivia","Isla","Emily","Poppy","Ava","Isabella","Jessica","Lily","Sophie","Grace","Sophia","Mia","Evie","Ruby","Ella","Scarlett","Isabelle","Chloe","Sienna"],correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]
        },
        {
            id: "girls_names_mambo5", poolid: "forenames", label: "744", title: "Mambo #5 Names", description: "In order of appearance",answers: ["Angela","Pamela","Sandra","Rita","Monica","Erica","Tina","Mary","Jessica","You"," - "," - "," - "," - "," - "," - "," - "," - "," - "," - "],correctTexts: ["I like", "I like", "I like/In the sun", "I like/All I need", "In my life", "By my side", "What I see", "All night long", "Here I am", "Makes me your man", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
        },

        {
            id: "cities_population_top10_world_urban_2025",
            poolId: "cities_top100_world_urban_2025",
            label: "Most populated cities",
            title: "Most populated cities in the world",
            description: "People magnets",
            answers: [
                "Jakarta",
                "Dhaka",
                "Tokyo",
                "New Delhi",
                "Shanghai",
                "Guangzhou",
                "Cairo",
                "Manila",
                "Kolkata",
                "Seoul"
            ],
            correctTexts: [
                "41.9m",
                "36.6m",
                "33.4m",
                "30.2m",
                "29.6m",
                "27.6m",
                "25.6m",
                "24.7m",
                "22.5m",
                "22.5m"
            ]
        },

        {
            id: "albums_bestselling_top10_alltime",
            poolId: "albums_top100_bestselling_alltime",
            label: "Best-selling albums",
            title: "Top 10 best-selling albums of all time",
            description: "Streaming killed the video star",
            answers: [
                "Thriller",
                "The Dark Side Of The Moon",
                "The Bodyguard [OST]",
                "Grease [OST]",
                "Rumours",
                "Back In Black",
                "Led Zeppelin IV",
                "Saturday Night Fever [OST]",
                "Bad",
                "Jagged Little Pill"
            ],
            correctTexts: [
                "68.8m",
                "46.4m",
                "41.5m",
                "38.4m",
                "38.2m",
                "37.4m",
                "37.4m",
                "35.0m",
                "34.3m",
                "34.1m"
            ]
        },
        {
            id: "films_most_oscar_nominations_best_picture_nominees",
            poolId: "full_film_list",
            label: "Most Oscar nominations per film",
            title: "Films with the most Oscar nominations",
            description: "So many envelopes",
            answers: [
                "Sinners",
                "All About Eve",
                "Titanic",
                "La La Land",
                "From Here to Eternity",
                "Gone with the Wind",
                "Oppenheimer",
                "Shakespeare in Love",
                "Chicago",
                "Forrest Gump",
                "Mary Poppins"
            ],
            correctTexts: [
                "16",
                "14",
                "14",
                "14",
                "13",
                "13",
                "13",
                "13",
                "13",
                "13",
                "13"
            ]
        },
        {
            id: "films_most_oscar_wins_best_picture_nominees",
            poolId: "full_film_list",
            label: "Most Oscar wins per film",
            title: "Films with the most Oscar wins",
            description: "So many speeches",
            target: 4,
            display: 15,
            answers: [
                "Titanic",
                "Ben-Hur",
                "The Lord of the Rings: The Return of the King",
                "West Side Story [1961]",
                "The English Patient",
                "Gigi",
                "The Last Emperor",
                "Slumdog Millionaire",
                "Amadeus",
                "On the Waterfront",
                "Gandhi",
                "Cabaret",
                "From Here to Eternity",
                "Gone with the Wind",
                "My Fair Lady"
            ],
            correctTexts: [
                "11",
                "11",
                "11",
                "10",
                "9",
                "9",
                "9",
                "8",
                "8",
                "8",
                "8",
                "8",
                "8",
                "8"
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