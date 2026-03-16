window.TOP_TEN_QUESTION_TEMPLATES = [
  {
    id: "letters_desc",
    label: "Longest names",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by number of letters in the name`,
    description: "Letters only; spaces and punctuation are ignored.",
    sortDirection: "desc",
    metric: "letters"
  },
  {
    id: "letters_asc",
    label: "Shortest names",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by shortest name`,
    description: "Letters only; spaces and punctuation are ignored.",
    sortDirection: "asc",
    metric: "letters"
  },
  {
    id: "vowels_desc",
    label: "Most vowels",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by number of vowels in the name`,
    description: "A, E, I, O and U are counted as vowels.",
    sortDirection: "desc",
    metric: "vowels"
  },
  {
    id: "consonants_desc",
    label: "Most consonants",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by number of consonants in the name`,
    description: "Letters only; spaces and punctuation are ignored.",
    sortDirection: "desc",
    metric: "consonants"
  },
  {
    id: "unique_letters_desc",
    label: "Most distinct letters",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by number of distinct letters used`,
    description: "Case-insensitive; repeated letters count once each.",
    sortDirection: "desc",
    metric: "uniqueLetters"
  },
  {
    id: "repeat_letters_desc",
    label: "Most repeated letters",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by repeated-letter count`,
    description: "Computed as total letters minus the number of distinct letters.",
    sortDirection: "desc",
    metric: "repeatedLetters"
  },
  {
    id: "scrabble_desc",
    label: "Highest Scrabble score",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by Scrabble value of the name`,
    description: "Standard English Scrabble letter values.",
    sortDirection: "desc",
    metric: "scrabble"
  },
  {
    id: "alphabetical_asc",
    label: "Alphabetically earliest",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool in alphabetical order`,
    description: "Sorted A → Z using a normalised version of the name.",
    sortDirection: "asc",
    metric: "alphabetical"
  },
  {
    id: "alphabetical_desc",
    label: "Alphabetically latest",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool in reverse alphabetical order`,
    description: "Sorted Z → A using a normalised version of the name.",
    sortDirection: "desc",
    metric: "alphabetical"
  },
  {
    id: "words_desc",
    label: "Most words",
    promptBuilder: (pool) => `Top 10 ${pool.pluralLabel} in this answer pool by number of words in the name`,
    description: "Hyphenless word count separated by spaces.",
    sortDirection: "desc",
    metric: "words"
  }
];