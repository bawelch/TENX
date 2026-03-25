(function appendManualQuestions() {
    if (!Array.isArray(window.TOP_TEN_QUESTIONS)) {
        window.TOP_TEN_QUESTIONS = [];
    }

    const manualQuestions = [
        { id: "countries_all_most_land", poolId: "countries_all", linktag: "most_land", target: 7, display: 10, label: "Largest Countries (sq km)", title: "Largest Countries (sq km)", description: "Wild expanses aplenty", answers: ["Russia", "Canada", "United States", "China", "Brazil", "s", "India", "Argentina", "Kazakhstan", "Algeria", "DR Congo", "Mexico", "Saudi Arabia", "Indonesia", "Sudan", "Libya", "Iran", "Mongolia", "Peru", "Chad"], correctTexts: ["17100000", "9984670", "9629091", "9596960", "8511965", "7686850", "3287590", "2766890", "2717300", "2381740", "2345410", "1972550", "1960582", "1919440", "1861484", "1759540", "1648000", "1565000", "1285220", "1284000"] }, { id: "countries_all_least_land", poolId: "countries_all", linktag: "least_land", target: 6, display: 10, label: "Smallest Countries (sq km)", title: "Smallest Countries (sq km)", description: "Island heavy", answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu", "San Marino", "Liechtenstein", "Marshall Islands", "Saint Kitts and Nevis", "Maldives", "Malta", "Grenada", "Saint Vincent and the Grenadines", "Barbados", "Antigua and Barbuda", "Seychelles", "Palau", "Andorra", "Saint Lucia", "Bahrain", "Singapore"], correctTexts: ["0.44", "1.95", "21", "26", "61.2", "160", "181.3", "261", "300", "316", "344", "389", "431", "443", "455", "458", "468", "616", "665", "692.7"] }, { id: "countries_all_population", poolId: "countries_all", linktag: "population", target: 8, display: 10, label: "Highest Population", title: "Highest Population", description: "Pro-creators", answers: ["China", "India", "United States", "Indonesia", "Pakistan", "Nigeria", "Brazil", "Bangladesh", "Russia", "Mexico", "Japan", "Ethiopia", "Philippines", "Egypt", "DR Congo", "Vietnam", "Iran", "Türkiye", "Germany", "Thailand"], correctTexts: ["1425887360", "1417173120", "338289856", "275501344", "235824864", "218541216", "215313504", "171186368", "144713312", "127504120", "123951696", "123379928", "115559008", "110990096", "99010216", "98186856", "88550568", "85341248", "83369840", "71697024"] }, { id: "countries_all_Smallest Population", poolId: "countries_all", linktag: "Smallest Population", target: 6, display: 10, label: "Smallest Population", title: "Smallest Population", description: "Everyone knows everyone", answers: ["Vatican City", "Tuvalu", "Nauru", "Palau", "San Marino", "Monaco", "Liechtenstein", "Marshall Islands", "Saint Kitts and Nevis", "Dominica", "Andorra", "Antigua and Barbuda", "Saint Vincent and the Grenadines", "Tonga", "Seychelles", "Micronesia", "Grenada", "Kiribati", "Saint Lucia", "Samoa"], correctTexts: ["808", "11335", "12691", "18084", "33690", "36491", "39355", "41593", "47681", "72758", "79843", "93772", "103959", "106867", "107135", "114178", "125459", "131237", "179872", "222390"] }, { id: "countries_all_HDI", poolId: "countries_all", linktag: "HDI", target: 5, display: 10, label: "Most Developed Countries", title: "Most Developed Countries", description: "Human Development Index", answers: ["Norway", "Ireland", "Switzerland", "Germany", "Iceland", "Sweden", "Finland", "Singapore", "Denmark", "Netherlands", "Australia", "United Kingdom", "New Zealand", "Belgium", "Canada", "United States", "Austria", "Israel", "Slovenia", "Luxembourg"], correctTexts: ["0.96", "0.96", "0.96", "0.95", "0.95", "0.94", "0.94", "0.94", "0.94", "0.94", "0.94", "0.93", "0.93", "0.93", "0.93", "0.93", "0.92", "0.92", "0.92", "0.92"] }, { id: "countries_all_capitalalp", poolId: "countries_all", linktag: "capitalalp", target: 6, display: 10, label: "Alphabetical by Capital City", title: "Alphabetical by Capital City", description: "Using English language names", answers: ["United Arab Emirates", "Nigeria", "Ghana", "Ethiopia", "Algeria", "Jordan", "Netherlands", "Andorra", "Türkiye", "Madagascar", "Samoa", "Turkmenistan", "Eritrea", "Kazakhstan", "Paraguay", "Greece", "Iraq", "Azerbaijan", "Mali", "Brunei"], correctTexts: ["Abu Dhabi", "Abuja", "Accra", "Addis Ababa", "Algiers", "Amman", "Amsterdam", "Andorra la Vella", "Ankara", "Antananarivo", "Apia", "Ashgabat", "Asmara", "Astana", "Asunción", "Athens", "Baghdad", "Baku", "Bamako", "Bandar Seri Begawan"] }, { id: "countries_all_alpheur", poolId: "countries_all", linktag: "alpheur", target: 7, display: 10, label: "Alphabetical by Capital City (Europe)", title: "Alphabetical by Capital City (Europe)", description: "Using English language names", answers: ["Netherlands", "Andorra", "Greece", "Serbia", "Germany", "Switzerland", "Slovakia", "Belgium", "Romania", "Hungary", "Moldova", "Denmark", "Ireland", "Finland", "Ukraine", "Portugal", "Slovenia", "United Kingdom", "Luxembourg", "Spain"], correctTexts: ["Amsterdam", "Andorra la Vella", "Athens", "Belgrade", "Berlin", "Bern", "Bratislava", "Brussels", "Bucharest", "Budapest", "Chișinău", "Copenhagen", "Dublin", "Helsinki", "Kyiv", "Lisbon", "Ljubljana", "London", "Luxembourg", "Madrid"] },



        //{


        //    id: "countries_population_top10_worldbank_2022",
        //    poolId: "countries_all",
        //    label: "Most populous countries",
        //    title: "Most populated countries",
        //    description: "Where all the peeps at?",
        //    rankingMode: "fixed",
        //    topN: 10,
        //    target: 7,
        //    display: 10,
        //    correctAnswers: [
        //        "India",
        //        "China",
        //        "United States",
        //        "Indonesia",
        //        "Pakistan",
        //        "Nigeria",
        //        "Brazil",
        //        "Bangladesh",
        //        "Russia",
        //        "Mexico"
        //    ],
        //    correctTexts: [
        //        "1.42B",
        //        "1.41B",
        //        "333M",
        //        "276M",
        //        "236M",
        //        "219M",
        //        "215M",
        //        "171M",
        //        "144M",
        //        "128M"
        //    ]
        ////},
        //{
        //    id: "countries_population_bottom10_worldometer_2026",
        //    poolId: "countries_all",
        //    label: "Least populous countries",
        //    title: "Least populated countries",
        //    description: "Easy targets",
        //    rankingMode: "fixed",
        //    topN: 10,
        //    target: 5,
        //    display: 10,
        //    correctAnswers: [
        //        "Tuvalu",
        //        "Nauru",
        //        "Palau",
        //        "Marshall Islands",
        //        "Monaco",
        //        "Liechtenstein",
        //        "Saint Kitts and Nevis",
        //        "Dominica",
        //        "Andorra",
        //        "Antigua and Barbuda"
        //    ],
        //    correctTexts: [
        //        "9,362",
        //        "12,101",
        //        "17,614",
        //        "35,075",
        //        "38,087",
        //        "40,368",
        //        "46,992",
        //        "65,511",
        //        "83,753",
        //        "94,626"
        //    ]
        //},
        //{
        //    id: "countries_land_area_top10_worldometer",
        //    poolId: "countries_all",
        //    label: "Largest land area",
        //    title: "Largest countries (by land area)",
        //    description: "Room to store all their shit",
        //    rankingMode: "fixed",
        //    topN: 10,
        //    target: 7,
        //    display: 10,
        //    correctAnswers: [
        //        "Russia",
        //        "Canada",
        //        "China",
        //        "United States",
        //        "Brazil",
        //        "Australia",
        //        "India",
        //        "Argentina",
        //        "Kazakhstan",
        //        "Algeria"
        //    ],
        //    correctTexts: [
        //        "16.38M km²",
        //        "9.09M km²",
        //        "9.39M km²",
        //        "9.15M km²",
        //        "8.36M km²",
        //        "7.68M km²",
        //        "2.97M km²",
        //        "2.74M km²",
        //        "2.70M km²",
        //        "2.38M km²"
        //    ]
        //},
        //{
        //    id: "countries_land_area_bottom10_worldometer",
        //    poolId: "countries_all",
        //    label: "Smallest land area",
        //    title: "Smallest countries (by land area)",
        //    description: "Cosy",
        //    rankingMode: "fixed",
        //    topN: 10,
        //    target: 6,
        //    display: 10,
        //    correctAnswers: [
        //        "Vatican City",
        //        "Monaco",
        //        "Nauru",
        //        "Tuvalu",
        //        "San Marino",
        //        "Liechtenstein",
        //        "Marshall Islands",
        //        "Saint Kitts and Nevis",
        //        "Maldives",
        //        "Malta",
        //    ],
        //    correctTexts: [
        //        "0.5 km²",
        //        "2 km²",
        //        "20 km²",
        //        "30 km²",
        //        "60 km²",
        //        "160 km²",
        //        "180 km²",
        //        "260 km²",
        //        "300 km²",
        //        "320 km²"
        //    ]
        //},
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
        //{
        //    id: "girls_names_mambo5",
        //    poolId: "forenames",
        //    label: "Mambo #5",
        //    title: "Mambo #5 Names",
        //    description: "In order of appearance",
        //    target: 7,
        //    display: 10,
        //    answers: [
        //        "Angela", "Pamela", "Sandra", "Rita", "Monica", "Erica", "Tina", "Mary", "Jessica", "You"],
        //    correctTexts: ["I like", "I like", "I like/In the sun", "I like/All I need", "In my life", "By my side", "What I see", "All night long", "Here I am", "Makes me your man"]
        //},
        { id: "full_film_list_highest_ranked", poolId: "full_film_list", label: "highest_ranked", title: "Highest ranked films on imdb", description: "Probably out of date by now", answers: ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "The Godfather Part II", "12 Angry Men", "The Lord of the Rings: The Return of the King", "Schindler's List", "Pulp Fiction", "The Lord of the Rings: The Fellowship of the Ring", "The Good, the Bad and the Ugly", "Forrest Gump", "The Lord of the Rings: The Two Towers", "Fight Club", "Inception", "Star Wars: Episode V - The Empire Strikes Back", "The Matrix", "Goodfellas", "One Flew Over the Cuckoo's Nest", "Interstellar", "Se7en"], correctTexts: ["1994", "1972", "2008", "1974", "1957", "2003", "1993", "1994", "2001", "1966", "1994", "2002", "1999", "2010", "1980", "1999", "1990", "1975", "2014", "1995"] },
        { id: "full_film_list_longest", poolId: "full_film_list", label: "longest", title: "Longest Films in imdb Top 250", description: "Time for a pee break", answers: ["Gone with the Wind", "Once Upon a Time in America", "Lawrence of Arabia", "Ben-Hur", "Seven Samurai", "The Godfather Part II", "The Lord of the Rings: The Return of the King", "Schindler's List", "The Green Mile", "Barry Lyndon", "The Deer Hunter", "Avengers: Endgame", "Oppenheimer", "The Wolf of Wall Street", "The Lord of the Rings: The Two Towers", "Judgment at Nuremberg", "The Lord of the Rings: The Fellowship of the Ring", "The Good, the Bad and the Ugly", "Braveheart", "Casino"], correctTexts: ["3h 58m", "3h 49m", "3h 47m", "3h 32m", "3h 27m", "3h 22m", "3h 21m", "3h 15m", "3h 9m", "3h 5m", "3h 3m", "3h 1m", "3h", "3h", "2h 59m", "2h 59m", "2h 58m", "2h 58m", "2h 58m", "2h 58m"] },
        { id: "full_film_list_shortest", poolId: "full_film_list", label: "shortest", title: "Shortest Films in imdb Top 250", description: "Uh-oh, this one is tough", answers: ["Sherlock Jr.", "The Kid", "The General", "Before Sunset", "Toy Story", "My Neighbor Totoro", "The Iron Giant", "Modern Times", "City Lights", "Demon Slayer: Kimetsu no Yaiba - Tsuzumi Mansion Arc", "The Lion King", "Grave of the Fireflies", "Paths of Glory", "Rashomon", "Bicycle Thieves", "Children of Heaven", "Stand by Me", "Monty Python and the Holy Grail", "Monsters, Inc.", "Mary and Max"], correctTexts: ["1921", "1924", "1925", "1926", "1927", "1928", "1931", "1931", "1936", "1939", "1939", "1939", "1940", "1940", "1940", "1941", "1942", "1942", "1944", "1946"] },
        { id: "full_film_list_most_recent", poolId: "full_film_list", label: "Most Recent Additions", title: "imdb250 - probably out of date", description: "", answers: ["Dune: Part Two", "Maharaja", "The Wild Robot", "Oppenheimer", "12th Fail", "Spider-Man: Across the Spider-Verse", "Top Gun: Maverick", "Jai Bhim", "Spider-Man: No Way Home", "Demon Slayer: Kimetsu no Yaiba - Tsuzumi Mansion Arc", "Hamilton", "The Father", "Avengers: Endgame", "Ford v Ferrari", "Joker", "Parasite", "1917", "Klaus", "Capernaum", "Avengers: Infinity War"], correctTexts: ["2024", "2024", "2024", "2023", "2023", "2023", "2022", "2021", "2021", "2021", "2020", "2020", "2019", "2019", "2019", "2019", "2019", "2019", "2018", "2018"] },
        { id: "english_monarchy_short_reign", poolId: "english_monarchy", label: "short_reign", title: "Shortest Reign (England since 899)", description: "About 25% of a Liz II between them", answers: ["Lady Jane Grey", "Edward V", "Edmund II lronside", "Harold II", "Edward VIII", "Richard III", "Harthacnut", "Edward The Martyr", "Charles III", "James II", "Edwy (Eadwig)", "Harold I Harefoot", "Mary I", "Edward VI", "Edmund", "William IV", "Edward VII", "Henry V", "Edred", "Richard I The Lion Heart"], correctTexts: ["9d", "4m 23d", "7m 7d", "9m 8d", "10m 21d", "2y 1m 27d", "2y 2m 21d", "2y 8m 10d", "3y 6m 12d", "3y 10m 3d", "3y 10m 7d", "4y 4m 4d", "5y 3m 29d", "6y 5m 7d", "V6", "6y 11m 24d", "9y 3m 12d", "9y 5m 11d", "9y 5m 28d", "9y 8m 30d"] }, { id: "english_monarchy_longest_reign", poolId: "english_monarchy", label: "longest_reign", title: "Longest Reigning English Monarchs", description: "HAAAAAPY AAAND GLOOORRIUS", answers: ["Elizabeth II", "Victoria", "George III", "Henry III", "Edward III", "Elizabeth I", "Henry VI", "Aethelred II The Unready", "Henry VIII", "Henry I", "Henry II", "Edward I Longshanks", "George II", "George V", "Edward The Elder", "Charles II", "Charles I", "Henry VII", "Edward The Confessor", "Richard II"], correctTexts: ["70y 7m 1d", "63y 7m 2d", "59y 3m 2d", "56y 29d", "50y 4m 25d", "44y 4m 5d", "39y 1m 18d", "38y 1m 5d", "37y 9m 7d", "35y 3m 28d", "34y 8m 11d", "34y 7m 14d", "33y 1m 14d", "25y 8m 15d", "24y 9m 15d", "24y 8m 9d", "23y 10m 4d", "23y 7m 28d", "23y 6m 28d", "22y 7m 23d"] }, { id: "english_monarchy_latest", poolId: "english_monarchy", label: "latest", title: "Most Recent UK Monarches", description: "At least one George", answers: ["Charles III", "Elizabeth II", "George VI", "Edward VIII", "George V", "Edward VII", "Victoria", "William IV", "George IV", "George III", "George II", "George I", "Anne", "William III and Queen Mary II", "James II", "Charles II", "Charles I", "James I", "Elizabeth I", "Mary I"], correctTexts: ["2022-2026*", "1952-2022", "1936-1952", "1936-1936(*)", "1910-1936", "1901-1910", "1837-1901", "1830-1837", "1820-1830", "1760-1820", "1727-1760(*)", "1714-1727", "1702-1714", "1689-1702", "1685-1688(*)", "1660-1685", "1625-1649", "1603-1625(*)", "1558-1603", "1553-1558"] },
        { id: "best_selling_musicians_wiki", poolId: "best_selling_musicians", label: "wiki", title: "Best Selling Musicians", description: "If you trust Wikipedia", answers: ["The Beatles", "Michael Jackson", "Elvis Presley", "Elton John", "Queen", "Madonna", "Led Zeppelin", "Rihanna", "Pink Floyd", "Eminem", "Mariah Carey", "Whitney Houston", "Taylor Swift", "Beyoncé", "Ed Sheeran", "AC/DC", "Eagles", "Celine Dion", "The Rolling Stones", "Drake"], correctTexts: ["600M", "500M", "500M", "300M", "300M", "300M", "300M", "250M", "250M", "220M", "220M", "220M", "200M", "200M", "200M", "200M", "200M", "200M", "200M", "170M"] }, { id: "best_selling_musicians_UK", poolId: "best_selling_musicians", label: "UK", title: "Best Selling Musicians", description: "from the UK", answers: ["The Beatles", "Elton John", "Queen", "Led Zeppelin", "Pink Floyd", "Ed Sheeran", "The Rolling Stones", "Coldplay", "Phil Collins", "Adele", "Fleetwood Mac", "Rod Stewart", "Bee Gees", "Eric Clapton", "Paul McCartney", "Dire Straits", "George Michael", "David Bowie", "Def Leppard", "Genesis"], correctTexts: ["600M", "300M", "300M", "300M", "250M", "200M", "200M", "160M", "150M", "120M", "120M", "120M", "120M", "100M", "100M", "100M", "100M", "100M", "100M", "100M"] }, { id: "best_selling_musicians_US", poolId: "best_selling_musicians", label: "US", title: "Best Selling Musicians", description: "from the US", answers: ["Michael Jackson", "Elvis Presley", "Madonna", "Eminem", "Mariah Carey", "Whitney Houston", "Taylor Swift", "Beyoncé", "Eagles", "Garth Brooks", "Kanye West", "Billy Joel", "Katy Perry", "Bruno Mars", "Britney Spears", "Metallica", "Bruce Springsteen", "Aerosmith", "Barbra Streisand", "Frank Sinatra"], correctTexts: ["500M", "500M", "300M", "220M", "220M", "220M", "200M", "200M", "200M", "170M", "160M", "160M", "151M", "150M", "150M", "150M", "150M", "150M", "150M", "150M"] }, { id: "best_selling_musicians_world", poolId: "best_selling_musicians", label: "world", title: "Best Selling Musicians", description: "Excluding UK/US", answers: ["Rihanna", "AC/DC", "Celine Dion", "Drake", "Justin Bieber", "U2", "ABBA", "Julio Iglesias", "Roberto Carlos", "Nicki Minaj", "Shania Twain", "B'z", "Shakira", "Andrea Bocelli", "Ayumi Hamasaki", "Johnny Hallyday", "The Weeknd", "Enya", "Bryan Adams", "Bob Marley"], correctTexts: ["250M (Barbados)", "200M (Australia)", "200M (Canada)", "170M (Canada)", "150M (Canada)", "150M (Ireland)", "150M (Sweden)", "150M (Spain)", "120M (Brazil)", "100M (Trinidad and Tobago)", "100M (Canada)", "100M (Japan)", "95M (Colombia)", "90M (Italy)", "80M (Japan)", "80M (France)", "75M (Canada)", "75M (Ireland)", "75M (Canada)", "75M (Jamaica)"] },
        { id: "girlsforenames_1974", poolId: "forenames", label: "1974 UK Girls", title: "1974 Girls' Names (UK)", description: "Not many Bessies", answers: ["Sarah", "Claire", "Nicola", "Emma", "Lisa", "Joanne", "Michelle", "Helen", "Samantha", "Karen", "Amanda", "Rachel", "Louise", "Julie", "Clare", "Rebecca", "Sharon", "Victoria", "Caroline", "Susan"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "girlsforenames_1984", poolId: "forenames", label: "1984 UK Girls", title: "1984 Girls' Names (UK)", description: "Not many Gertrudes", answers: ["Sarah", "Laura", "Gemma", "Emma", "Rebecca", "Claire", "Victoria", "Samantha", "Rachel", "Amy", "Jennifer", "Nicola", "Katie", "Lisa", "Kelly", "Natalie", "Louise", "Michelle", "Hayley", "Hannah"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "girlsforenames_1994", poolId: "forenames", label: "1994 UK Girls", title: "1994 Girls' Names (UK)", description: "Not many Mabels", answers: ["Rebecca", "Lauren", "Jessica", "Charlotte", "Hannah", "Sophie", "Amy", "Emily", "Laura", "Emma", "Chloe", "Sarah", "Lucy", "Katie", "Bethany", "Jade", "Megan", "Alice", "Rachel", "Samantha"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "girlsforenames_2004", poolId: "forenames", label: "2004 UK Girls", title: "2004 Girls' Names (UK)", description: "Not many Almas", answers: ["Emily", "Ellie", "Jessica", "Sophie", "Chloe", "Olivia", "Lucy", "Charlotte", "Katie", "Megan", "Grace", "Hannah", "Amy", "Ella", "Mia", "Lily", "Holly", "Amelia", "Abigail", "Emma"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "girlsforenames_2014", poolId: "forenames", label: "2014 UK Girls", title: "2014 Girls' Names (UK)", description: "Not many Berthas", answers: ["Amelia", "Olivia", "Isla", "Emily", "Poppy", "Ava", "Isabella", "Jessica", "Lily", "Sophie", "Grace", "Sophia", "Mia", "Evie", "Ruby", "Ella", "Scarlett", "Isabelle", "Chloe", "Sienna"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "girlsforenames_mambo5", poolId: "forenames", label: "mambo5", title: "Mambo #5 Names", description: "In order of appearance", answers: ["Angela", "Pamela", "Sandra", "Rita", "Monica", "Erica", "Tina", "Mary", "Jessica", "You", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], correctTexts: ["I like", "I like", "I like/In the sun", "I like/All I need", "In my life", "By my side", "What I see", "All night long", "Here I am", "Makes me your man", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"] },
        { id: "boysforenames_1974", poolId: "forenames", label: "1974 UK Boys", title: "1974 Boys' Names (UK)", description: "Not many Archibalds", answers: ["Paul", "Mark", "David", "Andrew", "Richard", "Christopher", "James", "Simon", "Michael", "Matthew", "Stephen", "Lee", "John", "Robert", "Darren", "Daniel", "Steven", "Jason", "Nicholas", "Jonathan"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "boysforenames_1984", poolId: "forenames", label: "1984 UK Boys", title: "1984 Boys' Names (UK)", description: "Not many Cedrics", answers: ["Christopher", "James", "David", "Daniel", "Michael", "Matthew", "Andrew", "Richard", "Paul", "Mark", "Thomas", "Adam", "Robert", "John", "Lee", "Benjamin", "Steven", "Jonathan", "Craig", "Stephen"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "boysforenames_1994", poolId: "forenames", label: "1994 UK Boys", title: "1994 Boys' Names (UK)", description: "Not many Balthazars", answers: ["Thomas", "James", "Jack", "Daniel", "Matthew", "Ryan", "Joshua", "Luke", "Samuel", "Jordan", "Adam", "Michael", "Alexander", "Christopher", "Benjamin", "Joseph", "Liam", "Jake", "William", "Andrew"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "boysforenames_2004", poolId: "forenames", label: "2004 UK Boys", title: "2004 Boys' Names (UK)", description: "Not many Claudes", answers: ["Jack", "Joshua", "Thomas", "James", "Daniel", "Samuel", "Oliver", "William", "Benjamin", "Joseph", "Harry", "Matthew", "Lewis", "Charlie", "Luke", "George", "Callum", "Mohammed", "Alexander", "Dylan"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "boysforenames_2014", poolId: "forenames", label: "2014 UK Boys", title: "2014 Boys' Names (UK)", description: "Not many Clarences", answers: ["Oliver", "Jack", "Harry", "Jacob", "Charlie", "Thomas", "George", "James", "William", "Joshua", "Henry", "Joseph", "Samuel", "Alexander", "Daniel", "Max", "Mohammed", "Benjamin", "Edward", "Jake"], correctTexts: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"] }, { id: "boysforenames_PMs", poolId: "forenames", label: "PMs", title: "Most Common UK PM Name", description: "Patriarchy gonna patriatrch", answers: ["William", "Robert", "Henry", "George", "John", "Charles", "Arthur", "David", "Spencer", "Edward", "Frederick", "Harold", "-", "-", "-", "-", "-", "-", "-", "-"], correctTexts: ["8", "4", "4", "3", "3", "2", "2", "2", "2", "2", "2", "2", "-", "-", "-", "-", "-", "-", "-", "-"] },
        { id: "chemicals_atmosphere", poolId: "chemicals", label: "atmosphere", title: "Atmospheric Gases", description: "*parp*", answers: ["Nitrogen", "Oxygen", "Argon", "Carbon Dioxide", "Neon", "Helium", "Methane", "Krypton", "Hydrogen", "Xenon", "Ozone", "Nitrogen Dioxide", "Iodine", "Carbon Monoxide", "Ammonia"], correctTexts: ["78.084%", "20.946%", "0.934%", "0.0004", "0.001818%", "0.000524%", "0.000187%", "0.000114%", "0.00005%", "0.0000087%", "0.000007%", "0.000002%", "0.000001%", "trace", "trace"] }, { id: "chemicals_human", poolId: "chemicals", label: "human", title: "The Human Body", description: "Most common elements", answers: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen", "Calcium", "Phosphorus", "Sulfur", "Potassium", "Sodium", "Chlorine", "Magnesium"], correctTexts: ["65%", "18.5%", "9.5%", "2.6%", "1.3%", "0.6%", "0.3%", "0.2%", "0.2%", "0.2%", "0.1%"] }, { id: "chemicals_ele_light", poolId: "chemicals", label: "ele_light", title: "Lightest Elements", description: "by atomic mass", answers: ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Potassium", "Argon", "Calcium"], correctTexts: ["1.008", "4.0026", "7", "9.012183", "10.81", "12.011", "14.007", "15.999", "18.99840316", "20.18", "22.9897693", "24.305", "26.981538", "28.085", "30.973762", "32.07", "35.45", "39.0983", "39.9", "40.08"] },
        { id: "english_football_clubs_23_03_26", poolId: "english_football_clubs", label: "23_03_26", title: "Top Flight Points", description: "goals Goals GOALS!", answers: ["Liverpool", "Arsenal", "Manchester United", "Everton", "Aston Villa", "Manchester City", "Chelsea", "Tottenham Hotspur", "Newcastle United", "Sunderland", "West Bromwich Albion", "West Ham United", "Blackburn Rovers", "Wolverhampton Wanderers", "Bolton Wanderers", "Sheffield Wednesday", "Leeds United", "Nottingham Forest", "Derby County", "Sheffield United"], correctTexts: ["4393", "4393", "4037", "4777", "4329", "3878", "3657", "3653", "3723", "3371", "3146", "2731", "2720", "2719", "2802", "2582", "2205", "2323", "2468", "2470"] }, { id: "english_football_clubs_worst_tf_gd", poolId: "english_football_clubs", label: "worst_tf_gd", title: "Worst Goal Difference", description: "All time top flight ", answers: ["Birmingham City", "Stoke City", "Leicester City", "West Ham United", "Norwich City", "Fulham", "Southampton", "Crystal Palace", "West Bromwich Albion", "Coventry City", "Sheffield United", "Middlesbrough", "Bolton Wanderers", "Notts County", "Charlton Athletic", "Burnley", "Cardiff City", "Watford", "Portsmouth", "Grimsby Town"], correctTexts: ["-607", "-604", "-461", "-445", "-445", "-409", "-373", "-354", "-352", "-350", "-343", "-340", "-311", "-309", "-227", "-214", "-205", "-194", "-187", "-184"] }, { id: "english_football_clubs_tf_titles", poolId: "english_football_clubs", label: "tf_titles", title: "Most Top Flight Titles", description: "A load of balls", answers: ["Liverpool", "Manchester United", "Arsenal", "Manchester City", "Everton", "Aston Villa", "Chelsea", "Sunderland", "Newcastle United", "Sheffield Wednesday", "Blackburn Rovers", "Wolverhampton Wanderers", "Leeds United", "Huddersfield Town", "Tottenham Hotspur", "Derby County", "Burnley", "Preston North End", "Portsmouth", "-"], correctTexts: ["20", "20", "13", "10", "9", "7", "6", "6", "4", "4", "3", "3", "3", "3", "2", "2", "2", "2", "2", "-"] }, { id: "english_football_clubs_facup", poolId: "english_football_clubs", label: "facup", title: "Most FA Cup wins", description: "Wem-ber-ley!", answers: ["Arsenal", "Manchester United", "Liverpool", "Chelsea", "Tottenham Hotspur", "Manchester City", "Aston Villa", "Newcastle United", "Blackburn Rovers", "Everton", "West Bromwich Albion", "Bolton Wanderers", "Wolverhampton Wanderers", "Sheffield United", "West Ham United", "Sheffield Wednesday", "-", "-", "-", "-"], correctTexts: ["14", "13", "8", "8", "8", "7", "7", "6", "6", "5", "5", "4", "4", "4", "3", "3", "-", "-", "-", "-"] },


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

    //window.TOP_TEN_QUESTIONS.sort((a, b) => {
    //    const poolCompare = a.poolId.localeCompare(b.poolId);
    //    if (poolCompare !== 0) return poolCompare;
    //    return a.label.localeCompare(b.label);
    //});
})();