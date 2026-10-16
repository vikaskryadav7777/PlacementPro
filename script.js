/* =========================================================
   PlacementPro - Advanced Placement Preparation Portal
   Comprehensive Engine & Question Bank
========================================================= */

let currentUser = JSON.parse(localStorage.getItem("placementUser")) || null;

let quizQuestions = [];
let currentQuestion = 0;
let quizScore = 0;
let quizAnswers = {};
let quizTimer = null;
let currentQuizType = "aptitude";
let currentQuizAreaId = "quizArea";
let mockTestActive = false;

/* =========================================================
   COMPREHENSIVE QUESTION BANK (250+ Questions)
   Covering: AMCAT, CoCubes, eLitmus, TCS, Infosys, Accenture,
   Cognizant, C/C++, Java, Python, DBMS, OS, CN, DSA, OOP, Pseudocode
========================================================= */

const questions = {

    /* ---------------------------------------------------------
       1. QUANTITATIVE APTITUDE (20 Questions)
    --------------------------------------------------------- */
    aptitude: [
        {
            q: "A number is increased by 20% and then decreased by 20%. What is the net percentage change in the number?",
            options: ["4% decrease", "4% increase", "No change", "2% decrease"],
            answer: 0,
            explanation: "Net change = x + y + (xy)/100 = 20 - 20 - (20×20)/100 = -4%, which is a 4% decrease."
        },
        {
            q: "If 15 men can complete a project in 20 days working 8 hours a day, in how many days can 25 men complete the same project working 6 hours a day?",
            options: ["14 days", "16 days", "18 days", "20 days"],
            answer: 1,
            explanation: "Using M1×D1×H1 = M2×D2×H2: (15 × 20 × 8) = (25 × D2 × 6) => 2400 = 150 × D2 => D2 = 16 days."
        },
        {
            q: "A train 180 meters long is running at a speed of 72 km/h. How many seconds will it take to pass an electric pole?",
            options: ["7 seconds", "8 seconds", "9 seconds", "10 seconds"],
            answer: 2,
            explanation: "Speed in m/s = 72 × (5/18) = 20 m/s. Time = Distance / Speed = 180 / 20 = 9 seconds."
        },
        {
            q: "Two pipes A and B can fill a cistern in 12 hours and 16 hours respectively. If both pipes are opened together, how long will they take to fill the cistern?",
            options: ["6 hours 51 minutes", "7 hours 12 minutes", "6 hours 45 minutes", "7 hours 30 minutes"],
            answer: 0,
            explanation: "Part filled in 1 hour = 1/12 + 1/16 = 7/48. Total time = 48/7 hours = 6 hours (6/7 × 60) ≈ 6 hours 51 minutes."
        },
        {
            q: "A vendor bought bananas at 6 for Rs. 10 and sold them at 4 for Rs. 8. Find his overall gain or loss percentage.",
            options: ["10% gain", "20% gain", "15% loss", "25% gain"],
            answer: 1,
            explanation: "Cost Price of 1 banana = 10/6 = Rs. 5/3. Selling Price of 1 banana = 8/4 = Rs. 2. Profit = 2 - 5/3 = 1/3. Gain % = (1/3 ÷ 5/3) × 100 = 20% gain."
        },
        {
            q: "In an election between two candidates, the winner got 58% of the total valid votes and won by a margin of 4,800 votes. What was the total number of valid votes polled?",
            options: ["25,000", "28,000", "30,000", "32,000"],
            answer: 2,
            explanation: "Winner got 58%, so loser got 42%. Difference = 58% - 42% = 16%. 16% of Total = 4,800 => Total = (4800 / 16) × 100 = 30,000 votes."
        },
        {
            q: "The average weight of 24 students in a class is 40 kg. If the teacher's weight is included, the average weight increases by 1 kg. What is the teacher's weight?",
            options: ["60 kg", "62 kg", "65 kg", "68 kg"],
            answer: 2,
            explanation: "Total weight of 24 students = 24 × 40 = 960 kg. Total weight of 25 persons = 25 × 41 = 1025 kg. Teacher's weight = 1025 - 960 = 65 kg."
        },
        {
            q: "A sum of money invested at compound interest doubles itself in 5 years. In how many years will it become 8 times of itself at the same rate?",
            options: ["10 years", "12 years", "15 years", "20 years"],
            answer: 2,
            explanation: "Amount becomes 2^1 in 5 years. To become 8 times (2^3), time required = 3 × 5 = 15 years."
        },
        {
            q: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that all the vowels always come together?",
            options: ["50,400", "25,200", "12,600", "18,400"],
            answer: 0,
            explanation: "Vowels in CORPORATION: O, O, A, I, O (5 vowels: 3 O's, 1 A, 1 I). Consonants: C, R, P, R, T, N (6 consonants: 2 R's). Treat 5 vowels as 1 unit. Total units = 6 + 1 = 7. Arrangements of 7 units = 7! / 2! = 2520. Vowels internal arrangements = 5! / 3! = 20. Total = 2520 × 20 = 50,400."
        },
        {
            q: "Two dice are thrown simultaneously. What is the probability that the sum of numbers obtained is a prime number?",
            options: ["5/12", "7/12", "1/2", "15/36"],
            answer: 0,
            explanation: "Prime sums possible: 2 (1 outcome), 3 (2), 5 (4), 7 (6), 11 (2). Total favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15/36 = 5/12."
        },
        {
            q: "What is the difference between simple interest and compound interest on Rs. 8,000 for 2 years at 5% per annum?",
            options: ["Rs. 15", "Rs. 20", "Rs. 25", "Rs. 30"],
            answer: 1,
            explanation: "Difference for 2 years = P × (R/100)^2 = 8000 × (5/100)^2 = 8000 × (25/10000) = Rs. 20."
        },
        {
            q: "A person covers a certain distance at 60 km/h and returns to the starting point at 40 km/h. What is his average speed for the entire journey?",
            options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
            answer: 0,
            explanation: "Average speed for equal distances = (2 × s1 × s2) / (s1 + s2) = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h."
        },
        {
            q: "Find the smallest number which when divided by 8, 12, 15 and 20 leaves a remainder of 3 in each case.",
            options: ["117", "123", "243", "363"],
            answer: 1,
            explanation: "LCM(8, 12, 15, 20) = 120. Required number = LCM + Remainder = 120 + 3 = 123."
        },
        {
            q: "A boat travels 24 km upstream in 6 hours and 28 km downstream in 4 hours. What is the speed of the stream?",
            options: ["1.5 km/h", "2 km/h", "2.5 km/h", "3 km/h"],
            answer: 0,
            explanation: "Speed downstream = 28/4 = 7 km/h. Speed upstream = 24/6 = 4 km/h. Speed of stream = (Downstream - Upstream)/2 = (7 - 4)/2 = 1.5 km/h."
        },
        {
            q: "In what ratio must tea worth Rs. 60 per kg be mixed with tea worth Rs. 75 per kg so that the mixture is worth Rs. 65 per kg?",
            options: ["1:2", "2:1", "3:2", "2:3"],
            answer: 1,
            explanation: "By Alligation rule: (75 - 65) / (65 - 60) = 10 / 5 = 2:1."
        },
        {
            q: "The ratio of present ages of A and B is 4:5. Eight years hence, the ratio of their ages will be 5:6. What is the present age of A?",
            options: ["24 years", "28 years", "32 years", "36 years"],
            answer: 2,
            explanation: "Let ages be 4x and 5x. (4x + 8)/(5x + 8) = 5/6 => 24x + 48 = 25x + 40 => x = 8. Present age of A = 4 × 8 = 32 years."
        },
        {
            q: "A can do a piece of work in 10 days and B in 15 days. They work together for 3 days and then A leaves. In how many more days will B finish the remaining work?",
            options: ["6 days", "7.5 days", "8 days", "9 days"],
            answer: 1,
            explanation: "A's 1 day work = 1/10, B's 1 day work = 1/15. Together in 3 days = 3 × (1/10 + 1/15) = 3 × (5/30) = 1/2. Remaining work = 1 - 1/2 = 1/2. B finishes 1/2 work in (1/2) / (1/15) = 7.5 days."
        },
        {
            q: "At what angle are the hands of a clock inclined at 20 minutes past 3 o'clock?",
            options: ["15°", "20°", "25°", "30°"],
            answer: 1,
            explanation: "Angle = |(30 × H) - (11/2 × M)| = |(30 × 3) - (11/2 × 20)| = |90 - 110| = 20°."
        },
        {
            q: "If log10 2 = 0.3010 and log10 3 = 0.4771, what is the value of log10 18?",
            options: ["1.2552", "1.3412", "1.1890", "1.4221"],
            answer: 0,
            explanation: "18 = 2 × 3^2. log10 18 = log10 2 + 2 × log10 3 = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552."
        },
        {
            q: "A metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm each. How many such small spheres can be formed?",
            options: ["9", "18", "27", "36"],
            answer: 2,
            explanation: "Number of spheres = Volume of large sphere / Volume of small sphere = (4/3 π × 6^3) / (4/3 π × 2^3) = 6^3 / 2^3 = 216 / 8 = 27."
        }
    ],

    /* ---------------------------------------------------------
       2. LOGICAL REASONING (20 Questions)
    --------------------------------------------------------- */
    reasoning: [
        {
            q: "Find the missing number in the series: 3, 8, 18, 38, 78, ?",
            options: ["156", "158", "162", "168"],
            answer: 1,
            explanation: "Pattern: (Previous number × 2) + 2. (3×2)+2=8, (8×2)+2=18, (18×2)+2=38, (38×2)+2=78, (78×2)+2=158."
        },
        {
            q: "In a certain code language, if 'COMPUTER' is written as 'RFUVQNPC', how will 'MEDICINE' be written in that code?",
            options: ["EOJDEJFM", "EOJDJEFM", "EOJDJTEM", "FNJEJDOE"],
            answer: 1,
            explanation: "First and last letters are swapped (M and E swap to E and M). The middle letters are incremented by 1 and reversed: E->F, D->E, I->J, C->D, I->J, N->O. Reversing yields EOJDJEFM."
        },
        {
            q: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
            options: ["Brother", "Uncle", "Father", "Grandfather"],
            answer: 2,
            explanation: "'The only son of my mother' refers to Suresh himself. The boy is his son, so Suresh is the father."
        },
        {
            q: "Statements: All cars are cats. All cats are fans.\nConclusions:\nI. All cars are fans.\nII. Some fans are cars.",
            options: ["Only I follows", "Only II follows", "Neither I nor II follows", "Both I and II follow"],
            answer: 3,
            explanation: "Cars ⊂ Cats ⊂ Fans. Therefore, All cars are fans (I) is true, and Some fans are cars (II) is also true."
        },
        {
            q: "A person travels 7 km North, turns right and travels 4 km, then turns right again and travels 4 km. How far and in which direction is he from his starting point?",
            options: ["5 km North-East", "5 km South-East", "4 km North", "7 km East"],
            answer: 0,
            explanation: "Displacement: North = 7 - 4 = 3 km. East = 4 km. Distance = √(3^2 + 4^2) = √25 = 5 km in the North-East direction."
        },
        {
            q: "Find the odd one out: 64, 125, 216, 343, 512, 729, 1000",
            options: ["64", "216", "343", "729"],
            answer: 2,
            explanation: "All are cubes: 4^3=64, 5^3=125, 6^3=216, 7^3=343, 8^3=512, 9^3=729, 10^3=1000. Among these, 64, 216, 729 are also powers/squares, but 343 is an odd prime cubed (7^3) with sum of digits = 10, whereas all others are even or 9^3."
        },
        {
            q: "If 'P' means '+', 'Q' means '-', 'R' means '×', and 'S' means '÷', what is the value of: 36 S 4 R 7 P 8 Q 12?",
            options: ["55", "59", "61", "67"],
            answer: 1,
            explanation: "36 ÷ 4 × 7 + 8 - 12 = 9 × 7 + 8 - 12 = 63 + 8 - 12 = 71 - 12 = 59."
        },
        {
            q: "In a row of 35 students, Rohan is 12th from the left end and Sunita is 18th from the right end. How many students are seated between Rohan and Sunita?",
            options: ["4", "5", "6", "7"],
            answer: 1,
            explanation: "Total = Left rank + Right rank + Students between. 35 = 12 + 18 + x => 35 = 30 + x => x = 5 students."
        },
        {
            q: "Looking at a clock reflecting in a mirror, the time appears to be 8:35. What is the actual time?",
            options: ["3:25", "3:35", "4:25", "4:35"],
            answer: 0,
            explanation: "Actual time = 11:60 - Mirror time = 11:60 - 8:35 = 3:25."
        },
        {
            q: "Complete the letter series: AB, DEF, HIJK, ?, STUVWXY",
            options: ["MNOPQ", "LMNO", "NOPQR", "MNPQR"],
            answer: 0,
            explanation: "Group 1: 2 letters (AB), skip 1 (C). Group 2: 3 letters (DEF), skip 1 (G). Group 3: 4 letters (HIJK), skip 1 (L). Group 4: 5 letters (MNOPQ), skip 1 (R). Group 5: 6 letters (STUVWXY)."
        },
        {
            q: "A is the brother of B. C is the mother of A. D is the father of C. E is the mother of D. How is A related to D?",
            options: ["Grandmother", "Grandfather", "Grandson", "Granddaughter"],
            answer: 2,
            explanation: "C is A's mother. D is C's father. Thus, D is the maternal grandfather of A. Since A is male, A is the grandson of D."
        },
        {
            q: "Which word CANNOT be formed using the letters of the word 'INFRASTRUCTURE'?",
            options: ["FRACTURE", "TRAINER", "CURTAIN", "STRUCTURE"],
            answer: 1,
            explanation: "'TRAINER' contains the letter 'N', which is not present in INFRASTRUCTURE."
        },
        {
            q: "Five friends A, B, C, D and E are standing in a line facing North. D is to the immediate right of E. B is standing between A and E. Who is in the middle of the line?",
            options: ["A", "B", "E", "D"],
            answer: 2,
            explanation: "Arrangement from left to right: A - B - E - D - C (or E is between B and D). Since B is between A and E, and D is right of E, order is A, B, E, D, C. E is in the middle."
        },
        {
            q: "One morning after sunrise, Vikram and Shailesh were standing in a lawn with their backs toward each other. Vikram's shadow fell exactly towards his left. In which direction was Shailesh facing?",
            options: ["East", "West", "North", "South"],
            answer: 3,
            explanation: "In morning, sun is in East, shadows fall West. If shadow is to Vikram's left, Vikram is facing North. Since Shailesh is back-to-back with Vikram, Shailesh is facing South."
        },
        {
            q: "Statements: Some mangoes are apples. No apple is a banana.\nConclusions:\nI. Some mangoes are not bananas.\nII. Some bananas are mangoes.",
            options: ["Only I follows", "Only II follows", "Either I or II follows", "Neither follows"],
            answer: 0,
            explanation: "The part of mangoes that are apples cannot be bananas. Thus, 'Some mangoes are not bananas' is guaranteed to be true (Conclusion I follows)."
        },
        {
            q: "Find the missing number in the grid:\n[ 4  9  2 ]\n[ 3  5  7 ]\n[ 8  1  ? ]",
            options: ["5", "6", "7", "9"],
            answer: 1,
            explanation: "Each row and column sums to 15 (a 3x3 Magic Square). For row 3: 8 + 1 + ? = 15 => ? = 6."
        },
        {
            q: "If 1st January 2024 was a Monday, what day of the week was 31st December 2024?",
            options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            answer: 1,
            explanation: "2024 is a leap year (366 days). In a leap year, the year ends on the day after the day it began. Since Jan 1 was Monday, Dec 31 was Tuesday."
        },
        {
            q: "Find the next term: Z1A, X2D, V6G, T24J, R120M, ?",
            options: ["P720P", "P720O", "O720P", "Q720P"],
            answer: 0,
            explanation: "Letters 1: Z, X, V, T, R, P (-2). Numbers: 1, 2, 6, 24, 120, 720 (×2, ×3, ×4, ×5, ×6). Letters 2: A, D, G, J, M, P (+3). Term is P720P."
        },
        {
            q: "Choose the pair that shares the same relationship as 'OASIS : DESERT':",
            options: ["Island : Ocean", "Forest : Tree", "Mountain : Peak", "River : Canal"],
            answer: 0,
            explanation: "An oasis is a fertile spot surrounded by a desert; similarly, an island is a body of land surrounded by an ocean."
        },
        {
            q: "In an exam, Rahul's rank is 11th from the top and 27th from the bottom among those who passed. 6 boys did not participate and 5 failed. How many boys were there in total?",
            options: ["45", "46", "47", "48"],
            answer: 2,
            explanation: "Passed boys = 11 + 27 - 1 = 37. Total boys = Passed (37) + Did not participate (6) + Failed (5) = 48 - 1 = 47 boys."
        }
    ],

    /* ---------------------------------------------------------
       3. VERBAL ABILITY (20 Questions)
    --------------------------------------------------------- */
    verbal: [
        {
            q: "Choose the synonym of 'METICULOUS':",
            options: ["Careless", "Thorough & Precise", "Hasty", "Arrogant"],
            answer: 1,
            explanation: "Meticulous means showing great attention to detail; very careful and precise."
        },
        {
            q: "Choose the antonym of 'EPHEMERAL':",
            options: ["Transient", "Permanent & Everlasting", "Fleeting", "Fragile"],
            answer: 1,
            explanation: "Ephemeral means lasting for a very short time. Its antonym is permanent or everlasting."
        },
        {
            q: "Identify the error in the sentence:\n'Neither of the two candidates (A) have submitted (B) their application forms (C) before the deadline (D).'",
            options: ["A", "B", "C", "D"],
            answer: 1,
            explanation: "'Neither' is singular and requires a singular verb: 'has submitted' instead of 'have submitted'."
        },
        {
            q: "Select the sentence with the correct grammatical structure:",
            options: [
                "He is more superior than his colleague.",
                "He is superior to his colleague.",
                "He is superior than his colleague.",
                "He is more superior to his colleague."
            ],
            answer: 1,
            explanation: "Adjectives like superior, inferior, senior, junior are followed by preposition 'to', not 'than', and do not take 'more'."
        },
        {
            q: "What is the meaning of the idiom 'To bite the bullet'?",
            options: [
                "To eat something bitter",
                "To face a grim situation with fortitude and courage",
                "To give up in battle",
                "To start a violent conflict"
            ],
            answer: 1,
            explanation: "'To bite the bullet' means to bravely face an inevitable and difficult situation."
        },
        {
            q: "Choose the correct one-word substitution for: 'A person who is indifferent to both pleasure and pain.'",
            options: ["Sadist", "Epicure", "Stoic", "Ascetic"],
            answer: 2,
            explanation: "A 'Stoic' is an individual who endures pain or hardship without display of feelings and without complaint."
        },
        {
            q: "Fill in the blank: The committee was unanimously pleased _____ the presentation made by the intern.",
            options: ["with", "at", "by", "for"],
            answer: 0,
            explanation: "The adjective 'pleased' takes preposition 'with' when referring to a person or their work."
        },
        {
            q: "Choose the correctly spelled word:",
            options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
            answer: 2,
            explanation: "The correct spelling is 'Accommodate' with double 'c' and double 'm'."
        },
        {
            q: "Change to Passive Voice: 'The chef prepared an exquisite seven-course meal.'",
            options: [
                "An exquisite seven-course meal is prepared by the chef.",
                "An exquisite seven-course meal was prepared by the chef.",
                "An exquisite seven-course meal had prepared by the chef.",
                "An exquisite seven-course meal has been prepared by the chef."
            ],
            answer: 1,
            explanation: "Simple past active ('prepared') changes to simple past passive ('was prepared')."
        },
        {
            q: "Choose the synonym of 'CANDID':",
            options: ["Deceptive", "Frank & Outspoken", "Secretive", "Shy"],
            answer: 1,
            explanation: "Candid means truthful, straightforward, and frank."
        },
        {
            q: "Choose the antonym of 'CANDOR':",
            options: ["Honesty", "Insincerity / Deceit", "Fairness", "Directness"],
            answer: 1,
            explanation: "Candor means quality of being open and honest. Its antonym is insincerity or deceit."
        },
        {
            q: "Fill in the blank: The new economic policy is expected to _____ substantial investments into the renewable energy sector.",
            options: ["elicit", "illicit", "allude", "elude"],
            answer: 0,
            explanation: "'Elicit' means to evoke or draw out. ('Illicit' means illegal; 'Allude' means hint at; 'Elude' means escape)."
        },
        {
            q: "What does the idiom 'Burn the midnight oil' mean?",
            options: [
                "To waste natural resources",
                "To work or study late into the night",
                "To commit arson",
                "To work early in the morning"
            ],
            answer: 1,
            explanation: "'Burn the midnight oil' means to study or work until very late at night."
        },
        {
            q: "Choose the correct indirect speech: She said, 'I have finished writing my research paper.'",
            options: [
                "She said that she finished writing her research paper.",
                "She said that she had finished writing her research paper.",
                "She said that she has finished writing her research paper.",
                "She said that she will finish writing her research paper."
            ],
            answer: 1,
            explanation: "Present perfect 'have finished' changes to past perfect 'had finished' in indirect speech."
        },
        {
            q: "Select the correctly spelled word:",
            options: ["Conscientious", "Consciencious", "Conscientous", "Conscensious"],
            answer: 0,
            explanation: "The correct spelling is 'Conscientious' (wishing to do what is right, thorough)."
        },
        {
            q: "One-word substitution: 'A remedy for all diseases or difficulties.'",
            options: ["Antidote", "Panacea", "Antibiotic", "Placebo"],
            answer: 1,
            explanation: "A 'Panacea' is a universal cure or solution for all ills."
        },
        {
            q: "Identify the error: 'If he would have arrived on time (A), we would have caught (B) the scheduled express train (C) easily (D).'",
            options: ["A", "B", "C", "D"],
            answer: 0,
            explanation: "In conditional type 3, the if-clause uses past perfect ('If he had arrived'), never 'would have'."
        },
        {
            q: "Choose the synonym of 'UBIQUITOUS':",
            options: ["Rare", "Omnipresent & Everywhere", "Ancient", "Harmful"],
            answer: 1,
            explanation: "Ubiquitous means present, appearing, or found everywhere."
        },
        {
            q: "Fill in the blank: The company took prompt disciplinary action against the employee for failing to _____ with safety protocols.",
            options: ["comply", "conform", "adhere", "agree"],
            answer: 0,
            explanation: "'Comply' is followed by preposition 'with'. ('Adhere' takes 'to', 'conform' takes 'to')."
        },
        {
            q: "Choose the antonym of 'PLACATE':",
            options: ["Appease", "Pacify", "Irritate & Enrage", "Soothe"],
            answer: 2,
            explanation: "Placate means to make someone less angry or hostile. Its antonym is irritate, enrage, or provoke."
        }
    ],

    /* ---------------------------------------------------------
       4. COMPANY APTITUDE SPECIAL (TCS, Infy, Accenture, AMCAT) (18 Questions)
    --------------------------------------------------------- */
    company_aptitude: [
        {
            q: "[TCS NQT] A trader marks his goods 40% above the cost price and allows a discount of 15% on the marked price. What is his net profit percentage?",
            options: ["18%", "19%", "20%", "22%"],
            answer: 1,
            explanation: "Let CP = 100. MP = 140. SP = 140 × (1 - 0.15) = 140 × 0.85 = 119. Profit % = 119 - 100 = 19%."
        },
        {
            q: "[Infosys Cryptarithmetic] In the cryptarithmetic addition SEND + MORE = MONEY, what single digit does the letter 'M' represent?",
            options: ["1", "2", "8", "9"],
            answer: 0,
            explanation: "Since the sum of two 4-digit numbers produces a 5-digit number, the leading carry digit M must always be 1."
        },
        {
            q: "[Infosys Cryptarithmetic] In the cryptarithmetic puzzle BASE + BALL = GAMES, where B=7 and A=4, what is the value of G?",
            options: ["1", "2", "5", "8"],
            answer: 0,
            explanation: "Adding two 4-digit numbers starting with B=7 (74.. + 74..) gives a 5-digit number GAMES. The highest sum is ~15,000, so leading digit G must be 1."
        },
        {
            q: "[Accenture Cognitive] If '+' means '×', '-' means '÷', '×' means '+', and '÷' means '-', what is the value of:\n20 + 4 - 8 × 16 ÷ 6?",
            options: ["18", "20", "22", "24"],
            answer: 1,
            explanation: "Rewriting: 20 × 4 ÷ 8 + 16 - 6 = (80 ÷ 8) + 16 - 6 = 10 + 16 - 6 = 20."
        },
        {
            q: "[AMCAT Quantitative] If x + 1/x = 5, what is the value of x^3 + 1/x^3?",
            options: ["110", "115", "120", "125"],
            answer: 0,
            explanation: "Formula: x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 5^3 - 3(5) = 125 - 15 = 110."
        },
        {
            q: "[eLitmus Advanced Quants] What is the units digit in the numerical expression (7^95 - 3^58)?",
            options: ["0", "2", "4", "6"],
            answer: 2,
            explanation: "Cyclicity of 7 is 4: 95 mod 4 = 3 => 7^3 ends in 3. Cyclicity of 3 is 4: 58 mod 4 = 2 => 3^2 ends in 9. Units digit = (13 - 9) = 4."
        },
        {
            q: "[TCS NQT Reasoning] In a certain code, '743' means 'mangoes are good', '657' means 'eat good food', and '934' means 'mangoes are ripe'. Which digit represents 'ripe'?",
            options: ["3", "4", "7", "9"],
            answer: 3,
            explanation: "Common between '743' and '934' are 'mangoes are' (digits 4 and 3). In '934', the remaining word is 'ripe' and remaining digit is 9."
        },
        {
            q: "[CoCubes Quants] A sum of money amounts to Rs. 6,690 after 3 years and to Rs. 10,035 after 6 years on compound interest. Find the original principal sum.",
            options: ["Rs. 4,460", "Rs. 4,500", "Rs. 4,620", "Rs. 4,800"],
            answer: 0,
            explanation: "Let principal be P. P(1+r)^3 = 6690 and P(1+r)^6 = 10035. Dividing gives (1+r)^3 = 10035/6690 = 1.5. P = 6690 / 1.5 = Rs. 4,460."
        },
        {
            q: "[Accenture Abstract Logic] Pointing to a gentleman, Deepak said, 'His only brother is the father of my daughter's father.' How is the gentleman related to Deepak?",
            options: ["Father", "Uncle", "Grandfather", "Brother-in-law"],
            answer: 1,
            explanation: "'My daughter's father' is Deepak himself. His father is Deepak's father. The gentleman is the only brother of Deepak's father, which makes him Deepak's Uncle."
        },
        {
            q: "[TCS NQT Numerical] What is the median of the following set of observations: 12, 17, 11, 23, 19, 28, 14, 21, 16?",
            options: ["16", "17", "18", "19"],
            answer: 1,
            explanation: "Sorted order: 11, 12, 14, 16, 17, 19, 21, 23, 28. There are 9 elements; the 5th element is 17."
        },
        {
            q: "[Infosys Analytical] 6 members A, B, C, D, E, F are seated in a circle. B is between D and C. A is second to the left of E and second to the right of C. Who is facing A?",
            options: ["B", "D", "E", "F"],
            answer: 0,
            explanation: "Constructing circle: C is opposite E, B is opposite A. Hence, B is directly facing A."
        },
        {
            q: "[AMCAT Quantitative] The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, what is the other number?",
            options: ["279", "283", "308", "318"],
            answer: 2,
            explanation: "Product of numbers = HCF × LCM => 275 × Other = 11 × 7700 => Other = 84700 / 275 = 308."
        },
        {
            q: "[eLitmus Cryptarithmetic] If POINT + ZERO = ENERGY, what is the maximum possible value of the word ENERGY?",
            options: ["104829", "106824", "108534", "109842"],
            answer: 2,
            explanation: "Standard eLitmus cryptarithmetic solver yields optimal assignment with E=1, N=0, E=1, R=8, G=5, Y=4 producing 108534."
        },
        {
            q: "[TCS NQT Numerical] The mean and mode of a frequency distribution are 28 and 16 respectively. Using the empirical relationship, what is the median?",
            options: ["22", "24", "25", "26"],
            answer: 1,
            explanation: "Mode = 3(Median) - 2(Mean) => 16 = 3(Median) - 2(28) => 16 = 3(Median) - 56 => 3(Median) = 72 => Median = 24."
        },
        {
            q: "[Accenture Critical Reasoning] Statement: 'Enroll your child in our preschool to guarantee early cognitive development.'\nAssumption I: Parents want their children to develop cognitive skills early.\nAssumption II: The preschool has methods designed for cognitive growth.",
            options: ["Only I is implicit", "Only II is implicit", "Neither is implicit", "Both I and II are implicit"],
            answer: 3,
            explanation: "An advertisement assumes that people desire the advertised benefit (I) and that the institution can deliver it (II)."
        },
        {
            q: "[CoCubes Computer Fundamentals] How many bits are there in an IPv6 address?",
            options: ["32 bits", "64 bits", "128 bits", "256 bits"],
            answer: 2,
            explanation: "IPv4 uses 32 bits, whereas IPv6 uses 128 bits (represented as eight groups of four hexadecimal digits)."
        },
        {
            q: "[AMCAT Logical] Find the next term in the alphanumeric series: C4X, F9U, I16R, ?",
            options: ["L25O", "K25P", "L27O", "M25N"],
            answer: 0,
            explanation: "First letter: C(+3)->F(+3)->I(+3)->L. Number: 2^2=4, 3^2=9, 4^2=16, 5^2=25. Last letter: X(-3)->U(-3)->R(-3)->O. Term is L25O."
        },
        {
            q: "[TCS NQT Verbal] Spot the error in: 'Scarcely had the speaker finished (A) when the audience stood up (B) and started applauding (C) loudly (D).'",
            options: ["A", "B", "C", "No Error"],
            answer: 3,
            explanation: "The correlative conjunction 'Scarcely... when' is used correctly with inverted auxiliary 'had the speaker finished'."
        }
    ],

    /* ---------------------------------------------------------
       5. C / C++ PROGRAMMING (18 Questions)
    --------------------------------------------------------- */
    c_cpp: [
        {
            q: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a[] = {10, 20, 30, 40, 50};\n    int *p = a;\n    printf(\"%d \", *(p + 3));\n    printf(\"%d\", p[1]);\n    return 0;\n}",
            options: ["40 20", "30 20", "40 10", "30 10"],
            answer: 0,
            explanation: "*(p + 3) accesses index 3, which is 40. p[1] is identical to *(p + 1), which is 20."
        },
        {
            q: "What is the output of the following C code?\n#define SQUARE(x) x * x\nint main() {\n    int ans = SQUARE(2 + 3);\n    printf(\"%d\", ans);\n    return 0;\n}",
            options: ["25", "11", "13", "16"],
            answer: 1,
            explanation: "Macros perform textual replacement: SQUARE(2 + 3) becomes 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11 due to operator precedence."
        },
        {
            q: "On a standard 64-bit architecture, what is the size of a pointer variable in C/C++?",
            options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the data type pointed to"],
            answer: 2,
            explanation: "On any 64-bit system, memory addresses are 64 bits (8 bytes) wide, regardless of the target data type."
        },
        {
            q: "What is the purpose of declaring a destructor as 'virtual' in a C++ base class?",
            options: [
                "To make the class abstract",
                "To prevent inheritance",
                "To ensure the derived class destructor is called when an object is deleted via a base pointer",
                "To improve memory allocation speed"
            ],
            answer: 2,
            explanation: "A virtual destructor guarantees proper cleanup by calling the derived destructor first followed by the base destructor when deleting through a Base*."
        },
        {
            q: "What is the output of the following C program?\nint main() {\n    int x = 5;\n    if (x == 5)\n        printf(\"A\");\n    else if (x > 2)\n        printf(\"B\");\n    else\n        printf(\"C\");\n    return 0;\n}",
            options: ["A", "AB", "ABC", "B"],
            answer: 0,
            explanation: "In an if-else if ladder, only the first matching true branch executes. Once 'x == 5' matches, 'A' prints and the ladder terminates."
        },
        {
            q: "Which of the following operators CANNOT be overloaded in C++?",
            options: ["+ and -", "== and !=", ":: and . and ?: and sizeof", "[] and ()"],
            answer: 2,
            explanation: "In C++, scope resolution (::), member access (.), pointer-to-member (.*), ternary (?:), and sizeof cannot be overloaded."
        },
        {
            q: "What does the 'malloc()' function return if memory allocation fails?",
            options: ["0", "NULL", "-1", "Throws an Exception"],
            answer: 1,
            explanation: "If malloc() cannot allocate the requested memory heap space, it returns NULL. C does not have built-in exceptions."
        },
        {
            q: "What is a 'dangling pointer' in C?",
            options: [
                "A pointer that hasn't been initialized yet",
                "A pointer pointing to a deallocated/freed memory location",
                "A NULL pointer",
                "A pointer pointing to the first element of an array"
            ],
            answer: 1,
            explanation: "A dangling pointer arises when the memory it points to has been freed, but the pointer still holds that address."
        },
        {
            q: "What is the output of the following C snippet?\nint a = 10;\nint *p = &a;\nint **pp = &p;\nprintf(\"%d\", **pp);",
            options: ["Address of a", "Address of p", "10", "Compilation Error"],
            answer: 2,
            explanation: "*pp dereferences to pointer p, and **pp dereferences to the value of a, which is 10."
        },
        {
            q: "What is the time complexity of searching for an element in an 'std::map' in C++ (implemented as a Red-Black Tree)?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation: "std::map is implemented using self-balancing Red-Black binary search trees, guaranteeing O(log n) operations."
        },
        {
            q: "What happens to a 'static' local variable declared inside a function across multiple invocations?",
            options: [
                "It gets reinitialized every time the function is called",
                "It retains its value between function calls throughout program execution",
                "It causes a stack overflow",
                "It becomes a global variable accessible outside the function"
            ],
            answer: 1,
            explanation: "Static local variables are initialized only once (in the data segment) and retain their values across function calls."
        },
        {
            q: "What is the output of this code?\nint x = 10, y = 20;\nx = x ^ y;\ny = x ^ y;\nx = x ^ y;\nprintf(\"%d %d\", x, y);",
            options: ["10 20", "20 10", "0 0", "20 20"],
            answer: 1,
            explanation: "Three consecutive XOR operations between two integer variables swap their values without using a temporary variable: x becomes 20, y becomes 10."
        },
        {
            q: "Why does the structure below typically occupy 8 bytes instead of 5 on a 32/64-bit system?\nstruct Demo {\n    char c;\n    int i;\n};",
            options: ["Due to dynamic typing", "Due to memory alignment & structure padding", "Because char is 4 bytes in struct", "Compiler error"],
            answer: 1,
            explanation: "Processors read data aligned to 4 or 8-byte boundaries. 3 padding bytes are added after the 1-byte char to align the 4-byte int, totaling 8 bytes."
        },
        {
            q: "In C++, what is an 'abstract class'?",
            options: [
                "A class with no member variables",
                "A class containing at least one pure virtual function (= 0)",
                "A class with all private constructors",
                "A class that cannot be inherited"
            ],
            answer: 1,
            explanation: "A class containing at least one pure virtual function (e.g., virtual void draw() = 0;) is abstract and cannot be directly instantiated."
        },
        {
            q: "What is the difference between 'const int *p' and 'int * const p'?",
            options: [
                "No difference",
                "'const int *p' means the integer value is constant; 'int * const p' means the pointer address is constant",
                "'const int *p' means the pointer is constant; 'int * const p' means the integer is constant",
                "Both make the entire array constant"
            ],
            answer: 1,
            explanation: "In 'const int *p', the value pointed to is read-only. In 'int * const p', the pointer itself cannot be redirected to another address."
        },
        {
            q: "What does the 'extern' storage class specifier signify in C?",
            options: [
                "The variable is local to the current file",
                "The variable is defined in another translation unit / file and shared globally",
                "The variable is stored in CPU registers",
                "The variable is dynamically allocated at runtime"
            ],
            answer: 1,
            explanation: "'extern' informs the compiler that a variable or function is defined elsewhere in another file or unit."
        },
        {
            q: "What is the output of the following recursive function for fun(4)?\nint fun(int n) {\n    if (n <= 1) return 1;\n    return n + fun(n - 1);\n}",
            options: ["4", "7", "10", "24"],
            answer: 2,
            explanation: "fun(4) = 4 + fun(3) = 4 + 3 + fun(2) = 4 + 3 + 2 + fun(1) = 4 + 3 + 2 + 1 = 10."
        },
        {
            q: "Which header file is required to use 'std::sort' in C++?",
            options: ["<iostream>", "<algorithm>", "<vector>", "<stdlib.h>"],
            answer: 1,
            explanation: "The C++ standard template library algorithms like std::sort, std::find, and std::reverse are defined in <algorithm>."
        }
    ],

    /* ---------------------------------------------------------
       6. JAVA PROGRAMMING (18 Questions)
    --------------------------------------------------------- */
    java: [
        {
            q: "What is the output of the following Java snippet?\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println((s1 == s2) + \" \" + s1.equals(s2));",
            options: ["true true", "false true", "true false", "false false"],
            answer: 1,
            explanation: "'==' checks memory reference (s1 is in String Pool, s2 is on Heap), returning false. '.equals()' checks character value equality, returning true."
        },
        {
            q: "Which Java collection implementation allows key-value pairs while maintaining the exact insertion order?",
            options: ["HashMap", "TreeMap", "LinkedHashMap", "Hashtable"],
            answer: 2,
            explanation: "LinkedHashMap maintains a doubly-linked list running through all its entries, preserving insertion order."
        },
        {
            q: "Can an interface in Java 8 or later contain method implementations?",
            options: [
                "No, interfaces can only have abstract methods",
                "Yes, using default and static methods",
                "Yes, using private abstract methods only",
                "Only if the interface is marked final"
            ],
            answer: 1,
            explanation: "Java 8 introduced 'default' and 'static' methods with concrete implementations in interfaces."
        },
        {
            q: "What will happen if a 'try' block contains a 'return' statement and there is also a 'finally' block?",
            options: [
                "The finally block will not execute",
                "The finally block will execute before the method actually returns",
                "Compilation error",
                "Runtime exception"
            ],
            answer: 1,
            explanation: "The 'finally' block is guaranteed to execute before the method completes, even if the try or catch block contains a return."
        },
        {
            q: "Where are object instances stored in Java JVM architecture?",
            options: ["Stack memory", "Heap memory", "Metaspace / Method area", "CPU Registers"],
            answer: 1,
            explanation: "All object instances in Java are dynamically allocated on the Heap memory. References to them reside on the Stack."
        },
        {
            q: "What is the contract between 'equals()' and 'hashCode()' in Java?",
            options: [
                "If two objects have the same hashCode, they must be equal",
                "If two objects are equal according to equals(), their hashCodes must be identical",
                "There is no relationship between them",
                "hashCodes must always be unique for every object"
            ],
            answer: 1,
            explanation: "The official contract states: If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode()."
        },
        {
            q: "What is the difference between calling 'thread.start()' and 'thread.run()' in Java?",
            options: [
                "No difference",
                "'start()' creates a new thread of execution; 'run()' executes in the calling thread synchronously",
                "'start()' is deprecated",
                "'run()' runs with higher CPU priority"
            ],
            answer: 1,
            explanation: "Calling 'start()' registers the thread with the OS scheduler and begins asynchronous execution in a new thread. Calling 'run()' just executes it as a normal method on the current thread."
        },
        {
            q: "Which keyword prevents a class member variable from being serialized when using Java Serialization?",
            options: ["volatile", "transient", "synchronized", "static"],
            answer: 1,
            explanation: "The 'transient' keyword specifies that a field should not be serialized when an object is written to a stream."
        },
        {
            q: "Why is 'String' immutable in Java?",
            options: [
                "For memory caching in String Pool",
                "For multithreading safety",
                "For security (class loading, network connections)",
                "All of the above"
            ],
            answer: 3,
            explanation: "Immutability allows safe String pooling, eliminates thread synchronization issues, and protects security parameters."
        },
        {
            q: "What does the 'volatile' keyword ensure in Java multithreading?",
            options: [
                "Atomicity of compound operations",
                "Memory visibility across threads (reads/writes directly to main memory)",
                "Mutual exclusion lock",
                "Prevents garbage collection"
            ],
            answer: 1,
            explanation: "'volatile' ensures that reads and writes to a variable are visible to all threads immediately by bypassing CPU thread caches."
        },
        {
            q: "What is the default capacity and load factor of an empty 'HashMap' in Java?",
            options: ["Capacity 10, Load Factor 0.5", "Capacity 16, Load Factor 0.75", "Capacity 32, Load Factor 0.8", "Capacity 8, Load Factor 0.75"],
            answer: 1,
            explanation: "By default, HashMap initializes with a capacity of 16 buckets and a load factor of 0.75 (resizing when 12 buckets are filled)."
        },
        {
            q: "Which of the following is a 'Checked' exception in Java?",
            options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"],
            answer: 2,
            explanation: "IOException is a checked exception (extends Exception) that must be handled or declared. The others are unchecked (extend RuntimeException)."
        },
        {
            q: "What is the purpose of the '@FunctionalInterface' annotation in Java 8?",
            options: [
                "Indicates that the interface has exactly one abstract method",
                "Marks the interface as serializable",
                "Forces all methods to be static",
                "Prevents lambda expression usage"
            ],
            answer: 0,
            explanation: "A functional interface has exactly one abstract method and can be used as the target for lambda expressions and method references."
        },
        {
            q: "What is the output of:\nint a = 5, b = 2;\nSystem.out.println(a / b + \" \" + (double)a / b);",
            options: ["2 2.0", "2.5 2.5", "2 2.5", "2.0 2.5"],
            answer: 2,
            explanation: "Integer division '5 / 2' yields 2. In '(double)a / b', floating-point division produces 2.5."
        },
        {
            q: "Which method in Java Garbage Collector can be called to suggest reclaiming unused memory?",
            options: ["Runtime.getRuntime().gc() / System.gc()", "System.delete()", "Thread.clean()", "Object.destroy()"],
            answer: 0,
            explanation: "System.gc() or Runtime.getRuntime().gc() sends a hint to the JVM that garbage collection may be run, though it does not guarantee immediate collection."
        },
        {
            q: "What is the time complexity of 'ArrayList.get(index)' vs 'LinkedList.get(index)' in Java?",
            options: ["O(1) for both", "O(1) for ArrayList, O(n) for LinkedList", "O(n) for ArrayList, O(1) for LinkedList", "O(log n) for both"],
            answer: 1,
            explanation: "ArrayList uses a contiguous array supporting O(1) random access. LinkedList must traverse node by node taking O(n) time."
        },
        {
            q: "Can a constructor in Java be declared as 'private'?",
            options: [
                "No, constructors must be public",
                "Yes, commonly used in Singleton pattern and utility classes",
                "Only in abstract classes",
                "Only in inner classes"
            ],
            answer: 1,
            explanation: "Private constructors prevent external instantiation, fundamental to the Singleton design pattern."
        },
        {
            q: "What does Java 8 Stream API 'filter()' method return?",
            options: ["A List", "A Map", "A new Stream (Intermediate operation)", "A void value"],
            answer: 2,
            explanation: "'filter()' is an intermediate, lazy operation that returns a new Stream containing elements matching the predicate."
        }
    ],

    /* ---------------------------------------------------------
       7. PYTHON PROGRAMMING (16 Questions)
    --------------------------------------------------------- */
    python: [
        {
            q: "Which of the following data types is MUTABLE in Python?",
            options: ["Tuple", "String", "List", "Integer"],
            answer: 2,
            explanation: "Lists (and dictionaries, sets) are mutable in Python; their elements can be modified in place. Tuples, strings, and ints are immutable."
        },
        {
            q: "What is the output of the following Python code?\ns = 'PlacementPro'\nprint(s[::-1])",
            options: ["PlacementPro", "orPtnemecalP", "P", "SyntaxError"],
            answer: 1,
            explanation: "The slice step of -1 reverses the string: 'orPtnemecalP'."
        },
        {
            q: "What is the difference between 'is' and '==' operators in Python?",
            options: [
                "No difference",
                "'==' compares values for equality; 'is' compares memory identity (id)",
                "'is' compares values; '==' compares types",
                "'is' is deprecated"
            ],
            answer: 1,
            explanation: "'==' checks if values are equal. 'is' checks whether two variables refer to the identical object in memory (id(a) == id(b))."
        },
        {
            q: "What is the output of this Python list comprehension?\nres = [x * 2 for x in range(5) if x % 2 == 0]\nprint(res)",
            options: ["[0, 4, 8]", "[0, 2, 4]", "[2, 6]", "[0, 2, 4, 6, 8]"],
            answer: 0,
            explanation: "range(5) = [0, 1, 2, 3, 4]. Even numbers: 0, 2, 4. Multiplied by 2: [0, 4, 8]."
        },
        {
            q: "What is the data type of '*args' and '**kwargs' inside a Python function?",
            options: [
                "List and Dictionary",
                "Tuple and Dictionary",
                "Tuple and Set",
                "List and Tuple"
            ],
            answer: 1,
            explanation: "*args collects positional arguments into a Tuple; **kwargs collects keyword arguments into a Dictionary."
        },
        {
            q: "What does the 'yield' keyword do in Python?",
            options: [
                "Terminates the program immediately",
                "Converts the function into a generator that produces values lazily",
                "Imports a module",
                "Handles runtime exceptions"
            ],
            answer: 1,
            explanation: "'yield' pauses function execution and returns an intermediate value, creating a generator iterator."
        },
        {
            q: "What is a 'decorator' in Python?",
            options: [
                "A class method that prints strings",
                "A design function that takes another function as input and extends its behavior without modifying it",
                "A GUI widget",
                "A variable type"
            ],
            answer: 1,
            explanation: "A decorator wraps a function, modifying or extending its behavior dynamically (using the @decorator syntax)."
        },
        {
            q: "Can a Python 'list' be used as a key in a dictionary?",
            options: [
                "Yes, always",
                "No, because lists are mutable and unhashable",
                "Only if the list is empty",
                "Only in Python 3.10+"
            ],
            answer: 1,
            explanation: "Dictionary keys must be hashable and immutable. Lists are mutable and unhashable, raising a TypeError."
        },
        {
            q: "What will this code print?\ndef append_to(val, lst=[]):\n    lst.append(val)\n    return lst\nprint(append_to(1))\nprint(append_to(2))",
            options: ["[1] then [2]", "[1] then [1, 2]", "[1, 2] then [1, 2]", "Error"],
            answer: 1,
            explanation: "Default arguments in Python are evaluated once at function definition time. The same list is shared across calls, producing [1] then [1, 2]."
        },
        {
            q: "What does the 'Global Interpreter Lock' (GIL) do in CPython?",
            options: [
                "Locks variables from modification",
                "Ensures only one native thread executes Python bytecode at a time",
                "Prevents file access",
                "Secures database connections"
            ],
            answer: 1,
            explanation: "The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecodes concurrently."
        },
        {
            q: "What is the output of: print(type(lambda x: x + 1))?",
            options: ["<class 'int'>", "<class 'function'>", "<class 'lambda'>", "<class 'object'>"],
            answer: 1,
            explanation: "Lambda functions in Python are standard first-class function objects of type <class 'function'>."
        },
        {
            q: "What is the time complexity of checking membership ('x in my_set') in a Python 'set'?",
            options: ["O(1) average", "O(n) average", "O(log n)", "O(n log n)"],
            answer: 0,
            explanation: "Python sets are implemented using hash tables, offering O(1) average time complexity for lookups."
        },
        {
            q: "What does the '__init__' method represent in a Python class?",
            options: [
                "A destructor called when object is deleted",
                "A constructor initializer called automatically when a new instance is created",
                "A static method",
                "An import loader"
            ],
            answer: 1,
            explanation: "'__init__' is the constructor method in Python used to initialize newly created object attributes."
        },
        {
            q: "What is the difference between 'copy.copy()' (shallow) and 'copy.deepcopy()' in Python?",
            options: [
                "No difference",
                "Shallow copy copies the outer object but references inner nested objects; deep copy recursively copies all nested objects",
                "Deep copy is only for integers",
                "Shallow copy deletes the original"
            ],
            answer: 1,
            explanation: "Shallow copy duplicates the container but keeps references to nested objects. Deepcopy recursively duplicates everything."
        },
        {
            q: "What will 'bool([])', 'bool({})', and 'bool(0)' evaluate to in Python?",
            options: ["True, True, True", "False, False, False", "True, False, False", "False, True, True"],
            answer: 1,
            explanation: "Empty collections (lists, dicts, tuples, sets), empty strings, zero (0), and None evaluate to False in boolean context."
        },
        {
            q: "What is the output of: print([1, 2] * 3)?",
            options: ["[3, 6]", "[1, 2, 1, 2, 1, 2]", "[[1, 2], [1, 2], [1, 2]]", "Error"],
            answer: 1,
            explanation: "Multiplying a sequence by an integer repeats the elements: [1, 2, 1, 2, 1, 2]."
        }
    ],

    /* ---------------------------------------------------------
       8. DBMS & SQL (18 Questions)
    --------------------------------------------------------- */
    dbms: [
        {
            q: "In database management, what does the 'I' in ACID properties stand for?",
            options: ["Integrity", "Isolation", "Inheritance", "Index"],
            answer: 1,
            explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability."
        },
        {
            q: "A relation is in Second Normal Form (2NF) if it is in 1NF and:",
            options: [
                "Has no transitive dependencies",
                "All non-key attributes are fully functionally dependent on the entire primary key (no partial dependency)",
                "Has no multivalued dependencies",
                "All attributes are numeric"
            ],
            answer: 1,
            explanation: "2NF eliminates partial functional dependency; every non-prime attribute must depend on the whole candidate key."
        },
        {
            q: "Third Normal Form (3NF) is specifically designed to eliminate which type of dependency?",
            options: ["Partial dependency", "Transitive dependency", "Multivalued dependency", "Join dependency"],
            answer: 1,
            explanation: "3NF requires that a relation be in 2NF and have no transitive dependencies (non-key attribute determining another non-key attribute)."
        },
        {
            q: "Which SQL JOIN returns all records from the left table and the matched records from the right table?",
            options: ["INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "FULL OUTER JOIN"],
            answer: 1,
            explanation: "LEFT OUTER JOIN returns all rows from the left table, with NULLs for unmatched rows from the right table."
        },
        {
            q: "Can a PRIMARY KEY column contain NULL values in a relational database?",
            options: [
                "Yes, at most one NULL value",
                "No, primary keys must be UNIQUE and NOT NULL",
                "Yes, multiple NULLs are allowed",
                "Depends on the SQL engine"
            ],
            answer: 1,
            explanation: "A Primary Key uniquely identifies each row and strictly enforces both UNIQUE and NOT NULL constraints."
        },
        {
            q: "What is the key difference between the 'WHERE' clause and the 'HAVING' clause in SQL?",
            options: [
                "No difference",
                "'WHERE' filters rows before aggregation; 'HAVING' filters groups after aggregation",
                "'HAVING' is faster than 'WHERE'",
                "'WHERE' can only be used with numbers"
            ],
            answer: 1,
            explanation: "WHERE filters individual rows before grouping. HAVING filters summary groups produced by GROUP BY."
        },
        {
            q: "Which data structure is most widely used by relational database systems (like MySQL/PostgreSQL) for index implementation?",
            options: ["Binary Search Tree", "B+ Tree", "Hash Table", "Linked List"],
            answer: 1,
            explanation: "B+ Trees store all data pointers at the leaf nodes linked sequentially, optimizing range queries and disk block I/O."
        },
        {
            q: "What does 'Referential Integrity' ensure in a relational database?",
            options: [
                "That tables cannot be dropped",
                "That a foreign key value must match an existing primary key value in the referenced table or be NULL",
                "That data is encrypted on disk",
                "That passwords cannot be plain text"
            ],
            answer: 1,
            explanation: "Referential integrity prevents orphaned records by ensuring foreign keys point to valid primary key records."
        },
        {
            q: "Which transaction isolation level offers the highest level of data consistency and prevents Dirty Reads, Non-repeatable Reads, and Phantom Reads?",
            options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
            answer: 3,
            explanation: "Serializable is the strictest isolation level, completely isolating transactions as if they ran serially."
        },
        {
            q: "What is the difference between 'DELETE' and 'TRUNCATE' in SQL?",
            options: [
                "TRUNCATE is DDL, cannot be rolled back easily, and resets identity counters; DELETE is DML and removes rows one by one logging each",
                "DELETE drops the table structure; TRUNCATE does not",
                "TRUNCATE is slower than DELETE",
                "No difference"
            ],
            answer: 0,
            explanation: "TRUNCATE is a DDL operation that deallocates data pages quickly. DELETE is a DML operation that scans and logs row-by-row deletions."
        },
        {
            q: "What is a 'Candidate Key' in database theory?",
            options: [
                "Any key that has NULL values",
                "A minimal super key that uniquely identifies each record without redundant attributes",
                "A foreign key with index",
                "A temporary key created for joins"
            ],
            answer: 1,
            explanation: "A candidate key is a minimal set of attributes that can uniquely identify any database record."
        },
        {
            q: "What will the SQL query: 'SELECT COUNT(*) FROM Students;' return?",
            options: [
                "Total number of columns",
                "Total number of rows in the Students table, including those with NULLs",
                "Only rows where all columns are NOT NULL",
                "Error"
            ],
            answer: 1,
            explanation: "COUNT(*) counts the total number of rows in the table, regardless of whether individual columns contain NULL."
        },
        {
            q: "What is a 'View' in SQL?",
            options: [
                "A physically stored duplicate table",
                "A virtual table based on the result-set of an SQL statement",
                "A temporary index",
                "A database trigger"
            ],
            answer: 1,
            explanation: "A View is a virtual table containing rows and columns defined by an underlying SQL query."
        },
        {
            q: "Which SQL command is used to revoke permissions previously granted to a database user?",
            options: ["DELETE", "REVOKE", "REMOVE", "DENY"],
            answer: 1,
            explanation: "GRANT gives privileges, and REVOKE takes privileges away in Data Control Language (DCL)."
        },
        {
            q: "What is a 'correlated subquery' in SQL?",
            options: [
                "A subquery that runs once before the outer query",
                "A subquery that uses values from the outer query and evaluates once for every row processed by the outer query",
                "A query that joins two identical tables",
                "A subquery inside a stored procedure"
            ],
            answer: 1,
            explanation: "A correlated subquery references columns from the outer query and must be re-evaluated for every candidate row of the outer query."
        },
        {
            q: "Which normal form is stricter than 3NF and deals with relations having multiple overlapping candidate keys?",
            options: ["1NF", "2NF", "BCNF (Boyce-Codd Normal Form)", "4NF"],
            answer: 2,
            explanation: "BCNF is a stricter version of 3NF where for every functional dependency X -> Y, X must be a super key."
        },
        {
            q: "What does the SQL 'UNION' operator do by default?",
            options: [
                "Combines results of two queries and retains duplicates",
                "Combines results of two queries and removes duplicate rows",
                "Joins two tables side-by-side",
                "Multiplies two datasets"
            ],
            answer: 1,
            explanation: "UNION combines result sets and removes duplicate rows. UNION ALL keeps duplicates."
        },
        {
            q: "What is a 'dirty read' in database concurrency?",
            options: [
                "Reading from a corrupted disk block",
                "A transaction reading data that has been modified by another uncommitted transaction",
                "Reading data without an index",
                "Reading expired cache"
            ],
            answer: 1,
            explanation: "A dirty read occurs when Transaction A reads modifications made by Transaction B before B has committed (and B might roll back)."
        }
    ],

    /* ---------------------------------------------------------
       9. OPERATING SYSTEMS (18 Questions)
    --------------------------------------------------------- */
    os: [
        {
            q: "What resource is shared among threads of the same process?",
            options: [
                "Stack and registers",
                "Code segment, data segment, and open files",
                "Thread ID and program counter",
                "CPU state"
            ],
            answer: 1,
            explanation: "Threads of a process share the heap, code, data segments, and OS resources, but each thread has its own private stack and register state."
        },
        {
            q: "Which CPU scheduling algorithm can cause the 'Convoy Effect'?",
            options: ["Round Robin", "Shortest Job First", "First Come First Serve (FCFS)", "Priority Scheduling"],
            answer: 2,
            explanation: "FCFS suffers from the convoy effect when a CPU-bound process with a huge burst time holds the CPU, forcing many short I/O-bound processes to wait."
        },
        {
            q: "How many conditions (Coffman conditions) must hold simultaneously for a deadlock to occur in an operating system?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            explanation: "The 4 necessary conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait."
        },
        {
            q: "Banker's Algorithm in Operating Systems is used for:",
            options: ["Deadlock Detection", "Deadlock Prevention", "Deadlock Avoidance", "Deadlock Recovery"],
            answer: 2,
            explanation: "Banker's algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources (Deadlock Avoidance)."
        },
        {
            q: "What causes a 'Page Fault' in virtual memory systems?",
            options: [
                "An error in the application code",
                "Accessing a page that is not currently mapped into physical RAM",
                "A corrupted memory hardware chip",
                "Stack overflow"
            ],
            answer: 1,
            explanation: "A page fault occurs when a program tries to access a virtual memory address whose page table entry has the valid/present bit set to 0 (page is on disk)."
        },
        {
            q: "What is 'Thrashing' in an operating system?",
            options: [
                "A fast disk defragmentation process",
                "A state where the CPU spends more time swapping pages in and out than executing actual instructions",
                "Killing processes automatically",
                "A high-speed CPU overclocking state"
            ],
            answer: 1,
            explanation: "Thrashing occurs when the total working sets of active processes exceed available physical memory, causing non-stop page faults and page swapping."
        },
        {
            q: "What is a 'Counting Semaphore' vs a 'Binary Semaphore'?",
            options: [
                "No difference",
                "Binary semaphore has values 0 and 1 (mutex); Counting semaphore can take arbitrary non-negative integer values",
                "Counting semaphore is used only for files",
                "Binary semaphore can count up to 10"
            ],
            answer: 1,
            explanation: "A binary semaphore is restricted to values 0 and 1. A counting semaphore can take any non-negative integer to manage a finite pool of identical resources."
        },
        {
            q: "Which page replacement algorithm suffers from 'Belady's Anomaly' (where increasing page frames increases page faults)?",
            options: ["Least Recently Used (LRU)", "Optimal Page Replacement", "First In First Out (FIFO)", "LFU"],
            answer: 2,
            explanation: "FIFO page replacement suffers from Belady's Anomaly, where allocating more memory frames can paradoxically increase page fault counts."
        },
        {
            q: "What is the primary role of the Translation Lookaside Buffer (TLB)?",
            options: [
                "A hardware cache used to speed up virtual-to-physical address translation",
                "A disk controller",
                "A temporary printer queue",
                "A thread scheduler"
            ],
            answer: 0,
            explanation: "The TLB is a high-speed associative hardware cache that stores recent virtual-to-physical page table translations."
        },
        {
            q: "What is the 'Turnaround Time' of a process?",
            options: [
                "Completion Time - Arrival Time",
                "Completion Time - Burst Time",
                "Waiting Time + Burst Time",
                "Both A and C"
            ],
            answer: 3,
            explanation: "Turnaround time is the total time elapsed from arrival to completion: Turnaround Time = Completion Time - Arrival Time = Waiting Time + Burst Time."
        },
        {
            q: "Which system call is used in Unix/Linux to create a new child process?",
            options: ["new()", "fork()", "create()", "spawn()"],
            answer: 1,
            explanation: "The 'fork()' system call creates a duplicate child process by duplicating the calling parent process address space."
        },
        {
            q: "What are the three essential requirements that any valid solution to the Critical Section problem must satisfy?",
            options: [
                "Speed, Accuracy, Security",
                "Mutual Exclusion, Progress, and Bounded Waiting",
                "Deadlock, Starvation, Paging",
                "Read, Write, Execute"
            ],
            answer: 1,
            explanation: "A correct critical-section solution must satisfy Mutual Exclusion (only one inside), Progress (decisions made without delay), and Bounded Waiting (no starvation)."
        },
        {
            q: "What is 'SPOOLing' in operating systems?",
            options: [
                "Simultaneous Peripheral Operations On-Line (buffering data for slow peripheral devices like printers)",
                "Splitting memory into pages",
                "Encrypting network packets",
                "Overclocking memory bus"
            ],
            answer: 0,
            explanation: "SPOOLing stands for Simultaneous Peripheral Operations On-Line, intercepting print jobs and buffering them on disk until the peripheral device is ready."
        },
        {
            q: "What information is typically stored in a Process Control Block (PCB)?",
            options: [
                "Process ID, Process State, Program Counter, CPU registers, Memory management info",
                "User browser history",
                "Source code comments",
                "Only the process name"
            ],
            answer: 0,
            explanation: "The PCB stores critical process execution state: PID, state, PC, registers, scheduling priority, and memory allocation info."
        },
        {
            q: "Which CPU scheduling algorithm is non-preemptive by definition?",
            options: ["Round Robin", "FCFS (First Come First Served)", "SRTF (Shortest Remaining Time First)", "Preemptive Priority"],
            answer: 1,
            explanation: "FCFS executes processes strictly in arrival order until completion or I/O block, without preemption."
        },
        {
            q: "What is the difference between 'Internal Fragmentation' and 'External Fragmentation'?",
            options: [
                "Internal occurs inside allocated blocks; External occurs between allocated blocks in free memory",
                "Internal occurs on hard disks; External occurs in RAM",
                "Internal is worse than External",
                "No difference"
            ],
            answer: 0,
            explanation: "Internal fragmentation happens when allocated memory blocks are larger than requested. External fragmentation occurs when total free memory is enough, but not contiguous."
        },
        {
            q: "In Round Robin scheduling, what happens if the time quantum is chosen to be extremely large?",
            options: [
                "It degenerates into First Come First Serve (FCFS)",
                "It causes excessive context switching",
                "It causes deadlocks",
                "It improves response time"
            ],
            answer: 0,
            explanation: "If the time quantum is larger than the burst time of any process, no preemption happens and Round Robin behaves identically to FCFS."
        },
        {
            q: "What is a 'Zombie Process' in Unix/Linux systems?",
            options: [
                "A process that has completed execution but still has an entry in the process table because its parent hasn't read its exit status via wait()",
                "A process consuming 100% CPU",
                "A virus process",
                "An unkillable background daemon"
            ],
            answer: 0,
            explanation: "A zombie process has terminated execution, but its exit status remains in the process table until its parent calls wait()."
        }
    ],

    /* ---------------------------------------------------------
       10. COMPUTER NETWORKS (18 Questions)
    --------------------------------------------------------- */
    cn: [
        {
            q: "At which layer of the OSI model does an IP Router primarily operate?",
            options: ["Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)", "Application Layer (Layer 7)"],
            answer: 1,
            explanation: "Routers forward packets across networks using logical IP addresses, operating at Network Layer (Layer 3)."
        },
        {
            q: "What is the sequence of packets exchanged during a standard TCP connection establishment (3-Way Handshake)?",
            options: ["ACK -> SYN -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "SYN -> ACK -> DATA", "HELLO -> ACK -> CONNECT"],
            answer: 1,
            explanation: "Client sends SYN; Server responds with SYN-ACK; Client acknowledges with ACK to establish connection."
        },
        {
            q: "What is the subnet mask for a network specified with CIDR notation '/26'?",
            options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
            answer: 2,
            explanation: "/26 means 26 consecutive 1-bits. The last octet has 11000000 = 128 + 64 = 192. Subnet mask is 255.255.255.192."
        },
        {
            q: "Which protocol resolves a known IP address to a physical hardware MAC address on a local area network?",
            options: ["DNS", "ARP (Address Resolution Protocol)", "DHCP", "ICMP"],
            answer: 1,
            explanation: "ARP broadcasts on the local network asking 'Who has IP X? Send me your MAC address.'"
        },
        {
            q: "What is the size of a standard Ethernet MAC (Media Access Control) address?",
            options: ["32 bits", "48 bits (6 bytes)", "64 bits", "128 bits"],
            answer: 1,
            explanation: "A MAC address consists of 48 bits (6 bytes), typically written in hexadecimal notation like 00:1A:2B:3C:4D:5E."
        },
        {
            q: "Which protocol and port does standard DNS query resolution primarily use?",
            options: ["TCP port 80", "UDP port 53", "TCP port 443", "UDP port 67"],
            answer: 1,
            explanation: "Standard DNS name resolution queries use UDP port 53 for fast, lightweight lookups without handshake overhead."
        },
        {
            q: "What mechanism is used by TCP to implement 'Flow Control' between sender and receiver?",
            options: ["Sliding Window Protocol", "Three-way handshake", "CRC check", "Token Ring"],
            answer: 0,
            explanation: "TCP uses a dynamic Sliding Window protocol where the receiver advertises its available buffer window (rwnd) in every ACK packet."
        },
        {
            q: "What is the correct order of the 4 steps in the DHCP lease negotiation process?",
            options: ["Discover -> Offer -> Request -> Acknowledge (DORA)", "Request -> Discover -> Offer -> Accept", "Ping -> Connect -> Lease -> ACK", "Sync -> Handshake -> Lease -> Connect"],
            answer: 0,
            explanation: "DHCP follows DORA: DHCP Discover (broadcast), DHCP Offer (unicast/broadcast), DHCP Request (broadcast), DHCP Acknowledge."
        },
        {
            q: "What security protocol encrypts HTTP traffic in modern HTTPS web connections?",
            options: ["SSH", "TLS (Transport Layer Security) / SSL", "IPSec", "PGP"],
            answer: 1,
            explanation: "HTTPS encrypts normal HTTP data streams over port 443 using TLS (Transport Layer Security, formerly SSL)."
        },
        {
            q: "Which network utility tool utilizes ICMP 'Echo Request' and 'Echo Reply' messages to test host reachability?",
            options: ["netstat", "ping", "traceroute", "nslookup"],
            answer: 1,
            explanation: "The 'ping' utility sends ICMP Echo Request messages and listens for ICMP Echo Reply packets to verify connectivity and measure latency."
        },
        {
            q: "Which of the following IP address ranges is reserved for Private IPv4 networks according to RFC 1918?",
            options: [
                "10.0.0.0 to 10.255.255.255",
                "172.16.0.0 to 172.31.255.255",
                "192.168.0.0 to 192.168.255.255",
                "All of the above"
            ],
            answer: 3,
            explanation: "RFC 1918 defines 10.0.0.0/8 (Class A), 172.16.0.0/12 (Class B), and 192.168.0.0/16 (Class C) as private, non-routable addresses."
        },
        {
            q: "What is the primary difference between TCP and UDP?",
            options: [
                "TCP is connection-oriented, reliable, and ordered; UDP is connectionless, unreliable, and fast",
                "UDP is encrypted; TCP is not",
                "TCP is for video streaming only",
                "No difference"
            ],
            answer: 0,
            explanation: "TCP guarantees delivery with acknowledgments, retransmissions, and ordering. UDP sends datagrams with minimal overhead and no delivery guarantee."
        },
        {
            q: "What is the function of Network Address Translation (NAT)?",
            options: [
                "To assign domain names",
                "To modify network address information in IP packet headers while in transit, enabling multiple private IPs to share public IPs",
                "To encrypt Wi-Fi passwords",
                "To block spam emails"
            ],
            answer: 1,
            explanation: "NAT maps multiple private IP addresses behind a single public IP address, conserving IPv4 space and adding security."
        },
        {
            q: "In modern computer networks, what is a 'Collision Domain' in an Ethernet switch port?",
            options: [
                "The entire local area network",
                "Each individual switch port operates as its own isolated collision domain",
                "Collisions occur on every packet",
                "Only wireless networks have collisions"
            ],
            answer: 1,
            explanation: "Unlike shared hubs, an Ethernet switch dedicates full duplex bandwidth to each port, isolating each port into its own collision domain."
        },
        {
            q: "Which routing protocol uses the Dijkstra Shortest Path First (SPF) algorithm?",
            options: ["RIP (Routing Information Protocol)", "OSPF (Open Shortest Path First)", "BGP (Border Gateway Protocol)", "EIGRP"],
            answer: 1,
            explanation: "OSPF is a link-state routing protocol that calculates shortest loop-free paths using Dijkstra's algorithm."
        },
        {
            q: "What does the 'TTL' (Time to Live) field in an IPv4 packet header prevent?",
            options: [
                "Packets from circulating endlessly in routing loops",
                "Data from being decrypted",
                "Bandwidth overuse",
                "Packet fragmentation"
            ],
            answer: 0,
            explanation: "Each router decrements the TTL field by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is returned, preventing routing loops."
        },
        {
            q: "Which OSI layer is responsible for data compression, syntax translation, and encryption/decryption?",
            options: ["Session Layer (Layer 5)", "Presentation Layer (Layer 6)", "Application Layer (Layer 7)", "Transport Layer (Layer 4)"],
            answer: 1,
            explanation: "The Presentation Layer (Layer 6) handles formatting, data compression, and encryption/decryption (e.g., ASCII, JPEG, SSL)."
        },
        {
            q: "What is the default port number used by the Secure Shell (SSH) protocol?",
            options: ["21", "22", "23", "25"],
            answer: 1,
            explanation: "SSH runs on port 22. (FTP=21, Telnet=23, SMTP=25)."
        }
    ],

    /* ---------------------------------------------------------
       11. DATA STRUCTURES & ALGORITHMS (18 Questions)
    --------------------------------------------------------- */
    dsa: [
        {
            q: "What is the worst-case time complexity of the QuickSort algorithm?",
            options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            answer: 2,
            explanation: "QuickSort runs in O(n^2) in the worst case (e.g., when the chosen pivot is consistently the smallest or largest element on already sorted data)."
        },
        {
            q: "How can you detect a cycle in a singly linked list using O(1) auxiliary space?",
            options: [
                "Hash Table of visited nodes",
                "Floyd's Cycle-Finding Algorithm (Tortoise and Hare pointer)",
                "Count the number of nodes",
                "Sort the list"
            ],
            answer: 1,
            explanation: "Floyd's algorithm uses two pointers: a slow pointer moving 1 step and a fast pointer moving 2 steps. If a cycle exists, they will meet in O(n) time and O(1) space."
        },
        {
            q: "An In-order traversal of a valid Binary Search Tree (BST) will always visit the nodes in:",
            options: ["Reverse sorted order", "Strictly ascending / sorted order", "Level-by-level order", "Random order"],
            answer: 1,
            explanation: "In-order traversal visits Left -> Root -> Right. By definition of a BST, all left descendants are smaller than root, and right are larger, producing sorted ascending output."
        },
        {
            q: "What is the time complexity to insert a new element into a Binary Max Heap of size 'n'?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation: "The new element is placed at the end of the heap array and bubbled up along the tree height, taking at most O(log n) swaps."
        },
        {
            q: "Which graph traversal algorithm uses a 'Queue' data structure and explores nodes level by level?",
            options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
            answer: 1,
            explanation: "BFS uses a FIFO Queue to visit all immediate neighbors before moving on to the next depth level."
        },
        {
            q: "Which of the following sorting algorithms is GUARANTEED to be 'stable'?",
            options: ["QuickSort", "HeapSort", "MergeSort", "SelectionSort"],
            answer: 2,
            explanation: "MergeSort is stable: it preserves the relative order of equal elements because left elements take precedence when merging equal values."
        },
        {
            q: "What is the maximum number of nodes in a binary tree of height 'h' (where a tree with only a root node has height 1)?",
            options: ["2^h", "2^h - 1", "2^(h-1)", "h^2"],
            answer: 1,
            explanation: "Sum of geometric progression: 1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1 nodes."
        },
        {
            q: "What is the average time complexity of searching for a key in a Hash Table with well-distributed keys?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation: "With a uniform hash function and low load factor, hash table lookups take O(1) constant time on average."
        },
        {
            q: "Which data structure is ideally suited for evaluating a postfix mathematical expression (Reverse Polish Notation)?",
            options: ["Queue", "Stack", "Binary Tree", "Priority Queue"],
            answer: 1,
            explanation: "Operands are pushed onto a Stack. When an operator is encountered, operands are popped, evaluated, and the result is pushed back."
        },
        {
            q: "Can Dijkstra's Shortest Path algorithm correctly handle graphs with NEGATIVE edge weights?",
            options: [
                "Yes, always",
                "No, Dijkstra assumes non-negative edge weights; Bellman-Ford must be used instead",
                "Only if the graph is a tree",
                "Only with an adjacency matrix"
            ],
            answer: 1,
            explanation: "Dijkstra's greedy choice fails with negative edge weights. The Bellman-Ford algorithm must be used for graphs with negative edges."
        },
        {
            q: "What is the auxiliary space complexity of standard MergeSort on an array of size 'n'?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            answer: 2,
            explanation: "MergeSort requires an auxiliary array of size O(n) to merge subarrays."
        },
        {
            q: "What data structure is used internally by the Breadth First Search (BFS) algorithm vs Depth First Search (DFS)?",
            options: ["Queue for BFS, Stack (or recursion) for DFS", "Stack for BFS, Queue for DFS", "Tree for both", "Heap for both"],
            answer: 0,
            explanation: "BFS uses a FIFO Queue; DFS uses a LIFO Stack (either explicitly or via the system call recursion stack)."
        },
        {
            q: "What is the time complexity to find the minimum element in a standard Min-Heap?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            explanation: "The minimum element in a Min-Heap is always located at the root node (index 0), retrievable in O(1) time."
        },
        {
            q: "Which algorithm finds the Minimum Spanning Tree (MST) of a connected, undirected graph using a greedy edge-by-edge approach with a Disjoint Set Union (DSU)?",
            options: ["Prim's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall", "Tarjan's Algorithm"],
            answer: 1,
            explanation: "Kruskal's algorithm sorts all edges by weight and adds edges using Union-Find (DSU) to avoid cycles."
        },
        {
            q: "What is the worst-case time complexity of searching an element in a balanced AVL tree with 'n' nodes?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            explanation: "AVL trees maintain strict balance (height difference <= 1), guaranteeing O(log n) worst-case search, insertion, and deletion."
        },
        {
            q: "What is the Kadane's Algorithm used for?",
            options: [
                "Finding the Maximum Subarray Sum in contiguous 1D array in O(n) time",
                "Sorting an array",
                "Detecting graph cycles",
                "Finding shortest paths"
            ],
            answer: 0,
            explanation: "Kadane's algorithm solves the Maximum Subarray Sum problem in linear O(n) time and O(1) space."
        },
        {
            q: "In an array representation of a binary heap, if a node is at index 'i' (0-indexed), what is the index of its left child?",
            options: ["2*i", "2*i + 1", "2*i + 2", "i / 2"],
            answer: 1,
            explanation: "For zero-indexed arrays: Left child = 2*i + 1, Right child = 2*i + 2, Parent = floor((i - 1) / 2)."
        },
        {
            q: "What is the optimal time complexity to find the intersection of two unsorted arrays of size 'n' and 'm'?",
            options: ["O(n × m)", "O(n + m) using a HashSet", "O((n+m) log(n+m))", "O(1)"],
            answer: 1,
            explanation: "Insert all elements of the first array into a HashSet in O(n) time, then check elements of the second array in O(m) time. Total = O(n + m)."
        }
    ],

    /* ---------------------------------------------------------
       12. OBJECT-ORIENTED PROGRAMMING (15 Questions)
    --------------------------------------------------------- */
    oops: [
        {
            q: "Which OOP concept allows the same function name to exhibit different behaviors based on input arguments or calling objects?",
            options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
            answer: 1,
            explanation: "Polymorphism (meaning 'many forms') enables one interface with multiple implementations (e.g., method overloading and overriding)."
        },
        {
            q: "What is an example of 'Compile-Time Polymorphism'?",
            options: ["Method Overriding", "Method Overloading", "Virtual Functions", "Dynamic Binding"],
            answer: 1,
            explanation: "Method Overloading is resolved by the compiler at compile time based on parameter signatures."
        },
        {
            q: "What is the 'Diamond Problem' in object-oriented programming languages?",
            options: [
                "A syntax error in pointers",
                "Ambiguity that arises in multiple inheritance when a class inherits from two classes that both inherit from a common base class",
                "A deadlock in multithreading",
                "An issue with garbage collection"
            ],
            answer: 1,
            explanation: "The diamond problem occurs when Class D inherits from B and C, both of which inherit from A, causing ambiguity over which implementation of A's methods D should inherit."
        },
        {
            q: "What does 'Encapsulation' mean in object-oriented design?",
            options: [
                "Bundling data and methods that operate on that data into a single unit (class) and restricting direct access using access modifiers",
                "Writing functions inside loops",
                "Making all variables public",
                "Compiling code into binaries"
            ],
            answer: 0,
            explanation: "Encapsulation binds data and code together into a single unit while hiding internal state details from outside interference."
        },
        {
            q: "What does the 'Liskov Substitution Principle' (LSP) in SOLID design principles state?",
            options: [
                "Classes should be closed for extension",
                "Objects of a superclass should be replaceable with objects of a subclass without breaking application correctness",
                "Every class must have an interface",
                "Inheritance should never be used"
            ],
            answer: 1,
            explanation: "LSP requires that subtypes must behave in such a way that code expecting a supertype continues working seamlessly."
        },
        {
            q: "What is the fundamental difference between 'Abstraction' and 'Encapsulation'?",
            options: [
                "No difference",
                "Abstraction is about hiding internal complexity and showing essential features; Encapsulation is about binding data and restricting access",
                "Abstraction is only in C++; Encapsulation is in Java",
                "Encapsulation is for functions; Abstraction is for variables"
            ],
            answer: 1,
            explanation: "Abstraction focuses on 'what' an object does (interface). Encapsulation focuses on 'how' it does it and protecting the internal state."
        },
        {
            q: "In an aggregation relationship ('has-a') between a Department and Professors, what happens if the Department is destroyed?",
            options: [
                "The Professors are also destroyed",
                "The Professors continue to exist independently (weak 'has-a' relationship)",
                "Compilation error",
                "The entire university is destroyed"
            ],
            answer: 1,
            explanation: "In Aggregation, the child object can exist independently of the parent container. In Composition, the child's lifetime is bound to the parent."
        },
        {
            q: "Can a constructor be declared as 'abstract' in Java or C++?",
            options: [
                "Yes, to enforce constructor implementation",
                "No, constructors cannot be abstract because they are invoked to instantiate an object of a specific concrete type",
                "Only in C++",
                "Only in interfaces"
            ],
            answer: 1,
            explanation: "Constructors cannot be abstract or virtual because they are responsible for creating concrete objects; an abstract constructor has no logical meaning."
        },
        {
            q: "What does 'Loose Coupling' in software engineering mean?",
            options: [
                "Components have high inter-dependencies",
                "Components are weakly linked so changes to one component minimize impact on other components",
                "Code without functions",
                "Variables without types"
            ],
            answer: 1,
            explanation: "Loose coupling ensures classes interact through well-defined interfaces without depending tightly on each other's internal implementations."
        },
        {
            q: "What is 'Dynamic Method Dispatch' in Java and C++?",
            options: [
                "A mechanism by which a call to an overridden method is resolved at runtime rather than compile time",
                "Calling static methods",
                "Calling private methods",
                "Inline expansion"
            ],
            answer: 0,
            explanation: "Dynamic method dispatch uses the runtime object type (via virtual table/vptr) to decide which overridden method implementation to execute."
        },
        {
            q: "What does the 'Single Responsibility Principle' (SRP) state?",
            options: [
                "A class should have only one reason to change (only one single responsibility/purpose)",
                "A method should have only one argument",
                "A program should have only one class",
                "A class should have only one constructor"
            ],
            answer: 0,
            explanation: "SRP states that every class or module should be responsible for a single piece of functionality, reducing side effects during refactoring."
        },
        {
            q: "Which relationship is represented by class inheritance?",
            options: ["IS-A relationship", "HAS-A relationship", "USES-A relationship", "NONE of the above"],
            answer: 0,
            explanation: "Inheritance models an 'IS-A' relationship (e.g., Dog IS-A Animal). Composition models a 'HAS-A' relationship (e.g., Car HAS-A Engine)."
        },
        {
            q: "What is the difference between 'Method Overriding' and 'Method Overloading'?",
            options: [
                "Overloading happens in the same class with different parameters; Overriding happens in a subclass with the same signature",
                "Overriding is compile-time; Overloading is runtime",
                "They are synonyms",
                "Overloading requires virtual keyword"
            ],
            answer: 0,
            explanation: "Overloading provides multiple methods with the same name but different signatures within the same class. Overriding redefines an inherited method in a subclass with the identical signature."
        },
        {
            q: "What is a 'Copy Constructor'?",
            options: [
                "A constructor that duplicates a file on disk",
                "A constructor that initializes an object using another existing object of the same class",
                "A default constructor provided by compiler",
                "A constructor with no parameters"
            ],
            answer: 1,
            explanation: "A copy constructor creates a new object by copying the values/resources of an existing object of the same class."
        },
        {
            q: "Why are static methods unable to directly access non-static instance variables in a class?",
            options: [
                "Because static variables are private",
                "Because static methods belong to the class itself and can be called without an instance of the class (no 'this' reference)",
                "Because instance variables are stored in ROM",
                "Because static methods run before main"
            ],
            answer: 1,
            explanation: "Static methods are associated with the class, not with any specific instance. They lack the implicit 'this' pointer required to locate instance variables."
        }
    ],

    /* ---------------------------------------------------------
       13. PSEUDOCODE & LOGIC TRACING (Accenture, Capgemini, AMCAT) (18 Questions)
    --------------------------------------------------------- */
    pseudocode: [
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 5, b = 9, c = 2\na = a ^ b\nb = b ^ c\nPrint a + b",
            options: ["20", "22", "23", "25"],
            answer: 2,
            explanation: "Step 1: a = 5 ^ 9 (0101 ^ 1001 = 1100 in binary = 12).\nStep 2: b = 9 ^ 2 (1001 ^ 0010 = 1011 in binary = 11).\nStep 3: a + b = 12 + 11 = 23."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger p, q, r\nSet p = 1, q = 2\nfor (r = 1 to 4)\n    p = p + q\n    q = q + 1\nend for\nPrint p",
            options: ["12", "15", "18", "21"],
            answer: 1,
            explanation: "Iteration 1 (r=1): p = 1 + 2 = 3, q = 3.\nIteration 2 (r=2): p = 3 + 3 = 6, q = 4.\nIteration 3 (r=3): p = 6 + 4 = 10, q = 5.\nIteration 4 (r=4): p = 10 + 5 = 15, q = 6.\nFinal output: 15."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a, b, count\nSet count = 0\nfor (a = 1 to 3)\n    for (b = a to 3)\n        count = count + 1\n    end for\nend for\nPrint count",
            options: ["6", "9", "3", "5"],
            answer: 0,
            explanation: "a=1: b runs from 1 to 3 (3 times).\na=2: b runs from 2 to 3 (2 times).\na=3: b runs from 3 to 3 (1 time).\nTotal count = 3 + 2 + 1 = 6."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger x, y\nSet x = 14, y = 3\nx = x >> 1\ny = (x & y) + 4\nPrint y",
            options: ["5", "6", "7", "8"],
            answer: 2,
            explanation: "x >> 1 is 14 / 2 = 7.\nx & y = 7 & 3 (0111 & 0011 = 0011 = 3).\ny = 3 + 4 = 7."
        },
        {
            q: "What will be the output of the recursive pseudocode for fun(5)?\n\nfunction fun(Integer n)\n    if (n <= 1)\n        return 1\n    end if\n    return n + fun(n - 2)\nend function",
            options: ["8", "9", "12", "15"],
            answer: 1,
            explanation: "fun(5) = 5 + fun(3) = 5 + (3 + fun(1)) = 5 + 3 + 1 = 9."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger m, n\nSet m = 29, n = 5\nm = (m mod n) * 4 + (m / n)\nPrint m",
            options: ["18", "21", "24", "26"],
            answer: 1,
            explanation: "m mod n = 29 mod 5 = 4.\nm / n = 29 / 5 = 5 (integer division).\nm = (4 * 4) + 5 = 16 + 5 = 21."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 4, b = 7, c = 10\nif ((a + b) > c)\n    c = c + a\nelse\n    c = c + b\nend if\nPrint c",
            options: ["14", "17", "10", "11"],
            answer: 0,
            explanation: "a + b = 4 + 7 = 11. Since 11 > 10 is true, the if branch executes: c = 10 + 4 = 14."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger arr[4] = {2, 5, 8, 11}\nInteger sum = 0, i\nfor (i = 0 to 3)\n    if (arr[i] mod 2 == 0)\n        sum = sum + arr[i]\n    end if\nend for\nPrint sum",
            options: ["10", "16", "26", "8"],
            answer: 0,
            explanation: "The loop checks each element for evenness: arr[0]=2 (even), arr[1]=5 (odd), arr[2]=8 (even), arr[3]=11 (odd). Sum = 2 + 8 = 10."
        },
        {
            q: "What will be the output of the following bitwise pseudocode?\n\nInteger a, b\nSet a = 6, b = 3\na = (a | b) ^ (a & b)\nPrint a",
            options: ["3", "5", "7", "9"],
            answer: 1,
            explanation: "a | b = 6 | 3 (0110 | 0011 = 0111 = 7).\na & b = 6 & 3 (0110 & 0011 = 0010 = 2).\na = 7 ^ 2 (0111 ^ 0010 = 0101 = 5)."
        },
        {
            q: "What will be the output of the following while loop?\n\nInteger x, y\nSet x = 20, y = 3\nwhile (x > 5)\n    x = x - y\n    y = y + 1\nend while\nPrint x",
            options: ["2", "3", "4", "5"],
            answer: 0,
            explanation: "Iter 1: x = 20 - 3 = 17, y = 4.\nIter 2: x = 17 - 4 = 13, y = 5.\nIter 3: x = 13 - 5 = 8, y = 6.\nIter 4: x = 8 - 6 = 2, y = 7.\nx is now 2 (<= 5). Loop ends. Output is 2."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 8, b = 12\nc = a & b\nif (c > 0)\n    Print a + b\nelse\n    Print a - b\nend if",
            options: ["-4", "4", "20", "8"],
            answer: 2,
            explanation: "8 in binary = 1000. 12 in binary = 1100. 8 & 12 = 1000 = 8. Since c = 8 > 0 is true, it prints a + b = 8 + 12 = 20."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger i, sum\nSet sum = 0\nfor (i = 1 to 5)\n    if (i == 3)\n        continue\n    end if\n    sum = sum + i\nend for\nPrint sum",
            options: ["10", "12", "15", "9"],
            answer: 1,
            explanation: "The loop sums 1, 2, 4, 5 (skipping 3). Sum = 1 + 2 + 4 + 5 = 12."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger p, q\nSet p = 15, q = 4\np = p >> (q - 2)\nPrint p",
            options: ["1", "3", "7", "15"],
            answer: 1,
            explanation: "q - 2 = 4 - 2 = 2. p >> 2 = 15 >> 2 = 15 / 4 = 3 (integer division)."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nfunction calc(Integer a, Integer b)\n    if (a < b)\n        return a + b\n    end if\n    return a - b + calc(a - 1, b)\nend function\ncalc(5, 3)",
            options: ["6", "8", "10", "12"],
            answer: 2,
            explanation: "calc(5, 3): 5 >= 3 => returns 5 - 3 + calc(4, 3) = 2 + calc(4, 3).\ncalc(4, 3): 4 >= 3 => returns 4 - 3 + calc(3, 3) = 1 + calc(3, 3).\ncalc(3, 3): 3 >= 3 => returns 3 - 3 + calc(2, 3) = 0 + calc(2, 3).\ncalc(2, 3): 2 < 3 => returns 2 + 3 = 5.\nTotal = 2 + 1 + 0 + 5 = 8 (Wait: 5-3=2; 4-3=1; 3-3=0; calc(2,3)=5 -> 2+1+0+5=8)."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a = 7, b = 2\nSet a = a << b\nPrint a",
            options: ["14", "21", "28", "32"],
            answer: 2,
            explanation: "a << b = 7 << 2 = 7 × 2^2 = 7 × 4 = 28."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a = 1, b = 2, c = 3\nif (a > b && b < c || a < c)\n    Print \"True\"\nelse\n    Print \"False\"\nend if",
            options: ["True", "False", "Error", "None"],
            answer: 0,
            explanation: "(a > b && b < c) is (1 > 2 && 2 < 3) = (False && True) = False. False || (a < c) = False || (1 < 3) = False || True = True."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger count = 0, n = 16\nwhile (n > 1)\n    n = n / 2\n    count = count + 1\nend while\nPrint count",
            options: ["3", "4", "5", "8"],
            answer: 1,
            explanation: "n values: 16 -> 8 (count=1) -> 4 (count=2) -> 2 (count=3) -> 1 (count=4). Loop terminates because 1 is not > 1. Output = 4."
        },
        {
            q: "What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 10, b = 20, c = 30\na = b\nb = c\nc = a\nPrint a + b + c",
            options: ["60", "70", "80", "90"],
            answer: 1,
            explanation: "a becomes 20. b becomes 30. c becomes a (which is now 20). a + b + c = 20 + 30 + 20 = 70."
        }
    ],

    /* ---------------------------------------------------------
       14. COMPANY TECHNICAL PAPERS (TCS, Infy, Accenture, AMCAT) (18 Questions)
    --------------------------------------------------------- */
    company_tech: [
        {
            q: "[TCS NQT Tech] What will be the output of the following C code?\n#include <stdio.h>\nint main() {\n    int a = 1;\n    printf(\"%d %d %d\", a, ++a, a++);\n    return 0;\n}",
            options: [
                "1 2 2",
                "3 3 1",
                "Compiler-dependent / Undefined behavior in C standard",
                "1 2 3"
            ],
            answer: 2,
            explanation: "In C, modifying a variable multiple times without an intervening sequence point in a single function call arguments list produces undefined behavior."
        },
        {
            q: "[TCS NQT Tech] What is the purpose of the 'volatile' qualifier in embedded C programming?",
            options: [
                "Forces the variable into CPU registers",
                "Informs the compiler that the variable's value can change unexpectedly (e.g., by hardware interrupt), preventing compiler optimization",
                "Makes the variable read-only",
                "Increases variable precision"
            ],
            answer: 1,
            explanation: "'volatile' ensures the compiler reads the variable from its actual memory location every time rather than caching it in a CPU register."
        },
        {
            q: "[Infosys Technical] In Java, what is the difference between 'Vector' and 'ArrayList'?",
            options: [
                "Vector is thread-safe (synchronized); ArrayList is not synchronized and is faster in single-threaded environments",
                "ArrayList is synchronized; Vector is not",
                "Vector cannot store objects",
                "No difference"
            ],
            answer: 0,
            explanation: "Vector methods are synchronized, incurring thread locking overhead. ArrayList is not synchronized and provides better performance in modern applications."
        },
        {
            q: "[Infosys Technical] What is the result of the SQL expression: 'SELECT 15 + NULL;' in standard SQL?",
            options: ["15", "0", "NULL", "Error"],
            answer: 2,
            explanation: "In standard SQL, any arithmetic operation involving a NULL operand always evaluates to NULL."
        },
        {
            q: "[Accenture Technical] In Cloud Computing, which service delivery model provides virtual machines, virtual storage, and virtual networking infrastructure?",
            options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "FaaS (Function as a Service)"],
            answer: 2,
            explanation: "IaaS (e.g., AWS EC2, Azure VMs) provides raw virtualized computing, storage, and networking resources."
        },
        {
            q: "[Accenture Technical] Which network topology connects all nodes to a central hub, switch, or concentrator?",
            options: ["Ring Topology", "Bus Topology", "Star Topology", "Mesh Topology"],
            answer: 2,
            explanation: "In a Star topology, all devices are connected independently to a central device (switch or hub)."
        },
        {
            q: "[AMCAT Computer Programming] What is the prefix expression for the infix expression: '(A + B) * (C - D)'?",
            options: ["* + A B - C D", "+ A B * - C D", "* A + B C - D", "+ * A B - C D"],
            answer: 0,
            explanation: "Operators precede operands: (A + B) -> +AB; (C - D) -> -CD; Multiplication -> * +AB -CD = '* + A B - C D'."
        },
        {
            q: "[AMCAT Computer Programming] What is the maximum number of leaf nodes in a full binary tree with 'n' total nodes?",
            options: ["n / 2", "(n + 1) / 2", "n - 1", "2n"],
            answer: 1,
            explanation: "In a strictly full binary tree, leaf nodes L and internal nodes I satisfy L = I + 1. Since n = L + I = 2L - 1, L = (n + 1) / 2."
        },
        {
            q: "[TCS NQT Tech] Which SQL statement removes all records from a table without firing table DELETE triggers and without logging row-level deletions?",
            options: ["DROP TABLE", "DELETE FROM", "TRUNCATE TABLE", "REMOVE TABLE"],
            answer: 2,
            explanation: "TRUNCATE TABLE deallocates pages directly, executes without row-by-row logging, and does not activate DELETE triggers."
        },
        {
            q: "[Infosys Technical] What is the default TCP port number for the MySQL database server?",
            options: ["1433", "1521", "3306", "5432"],
            answer: 2,
            explanation: "MySQL defaults to port 3306. (SQL Server=1433, Oracle=1521, PostgreSQL=5432)."
        },
        {
            q: "[Accenture Technical] Which symmetric encryption algorithm standard uses key lengths of 128, 192, or 256 bits and is widely adopted globally?",
            options: ["RSA", "AES (Advanced Encryption Standard)", "MD5", "Diffie-Hellman"],
            answer: 1,
            explanation: "AES is the world standard symmetric block cipher, replacing DES."
        },
        {
            q: "[AMCAT Programming] In a singly linked list with only a pointer to the head node, what is the time complexity to delete the last node?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            answer: 2,
            explanation: "To delete the last node, you must traverse all the way to the second-to-last node to set its next pointer to NULL, taking O(n) time."
        },
        {
            q: "[TCS NQT Tech] In C, what does calling 'realloc(ptr, 0)' effectively do?",
            options: [
                "Allocates 0 bytes",
                "Equivalent to calling free(ptr) and returns NULL",
                "Causes a crash",
                "Locks the memory block"
            ],
            answer: 1,
            explanation: "In standard C89/C99, calling realloc with a size of 0 on an allocated pointer frees the memory block and returns NULL."
        },
        {
            q: "[Infosys Technical] Can an abstract class in Java have a constructor?",
            options: [
                "No, abstract classes cannot have constructors",
                "Yes, it is executed when an instance of a concrete subclass is instantiated via super()",
                "Only if all methods are static",
                "Only if the constructor is private"
            ],
            answer: 1,
            explanation: "Abstract classes have constructors to initialize fields defined in the abstract class when a concrete subclass object is created."
        },
        {
            q: "[Accenture Technical] What type of security attack involves sending fraudulent emails appearing to come from reputable sources to steal sensitive credentials?",
            options: ["DDoS Attack", "Phishing Attack", "Man-in-the-Middle Attack", "SQL Injection"],
            answer: 1,
            explanation: "Phishing is social engineering where attackers deceive users into revealing credentials through spoofed emails and websites."
        },
        {
            q: "[TCS NQT Tech] In C++, what is a 'pure virtual function'?",
            options: [
                "A function with no return type",
                "A virtual function declared in a base class that has no definition and is assigned '= 0'",
                "A static inline function",
                "A function defined in a header file"
            ],
            answer: 1,
            explanation: "A pure virtual function has the '= 0' specifier in its declaration, forcing derived classes to provide an implementation."
        },
        {
            q: "[Infosys Technical] What will happen if you attempt to modify a collection while iterating through it using a standard for-each loop in Java?",
            options: [
                "ArrayOutOfBoundsException",
                "ConcurrentModificationException",
                "NullPointerException",
                "The loop completes successfully"
            ],
            answer: 1,
            explanation: "Java collections check modification counts (modCount); altering elements during iteration triggers a ConcurrentModificationException (fail-fast behavior)."
        },
        {
            q: "[AMCAT Programming] What is the space complexity of a recursive implementation of Fibonacci function without memoization?",
            options: ["O(1)", "O(n) due to maximum recursion call stack depth", "O(2^n)", "O(log n)"],
            answer: 1,
            explanation: "While its time complexity is exponential O(2^n), the maximum depth of the call stack at any given moment is O(n)."
        }
    ]
};

// Aliases for quick access and backward compatibility
questions.technical = questions.c_cpp;

// Helper to look up human-readable title
const moduleTitles = {
    aptitude: "🧮 Quantitative Aptitude",
    reasoning: "🧩 Logical Reasoning",
    verbal: "📚 Verbal Ability",
    company_aptitude: "🏢 Company Aptitude Special",
    c_cpp: "💻 C / C++ Programming",
    java: "☕ Java Core & Advanced",
    python: "🐍 Python Programming",
    dbms: "🗄️ DBMS & SQL",
    os: "⚙️ Operating Systems",
    cn: "🌐 Computer Networks",
    dsa: "🌳 Data Structures & Algorithms",
    oops: "🧱 Object-Oriented Programming",
    pseudocode: "💻 Pseudocode & Logic Tracing",
    company_tech: "🏢 Company Technical Papers",
    technical: "🧠 Technical MCQs"
};

/* =========================================================
   CATEGORY FILTER FUNCTIONS
========================================================= */

function filterAptitude(category, btn) {
    document.querySelectorAll("#aptitudeFilterTabs .filter-tab").forEach(tab => tab.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const cards = document.querySelectorAll("#aptitudeModuleGrid .module-card");
    cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function filterTechnical(category, btn) {
    document.querySelectorAll("#technicalFilterTabs .filter-tab").forEach(tab => tab.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const cards = document.querySelectorAll("#technicalModuleGrid .module-card");
    cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        showToast("Please fill all fields.");
        return;
    }

    const user = {
        name,
        email,
        password,
        role: "student",
        solved: 125,
        tests: 8
    };

    localStorage.setItem("placementUser", JSON.stringify(user));
    currentUser = user;
    showToast("Account created successfully!");
    setTimeout(loadApp, 400);
}

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const saved = JSON.parse(localStorage.getItem("placementUser"));

    if (saved && saved.email === email && saved.password === password) {
        currentUser = saved;
        loadApp();
        return;
    }

    if (email && password) {
        currentUser = {
            name: email.split("@")[0],
            email,
            password,
            role: "student",
            solved: 125,
            tests: 8
        };
        localStorage.setItem("placementUser", JSON.stringify(currentUser));
        loadApp();
    } else {
        showToast("Enter email and password.");
    }
}

function demoLogin() {
    currentUser = {
        name: "Vikas Yadav",
        email: "vikas@placementpro.edu",
        password: "demo",
        role: "student",
        solved: 142,
        tests: 12
    };
    localStorage.setItem("placementUser", JSON.stringify(currentUser));
    loadApp();
}

function loadApp() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    updateUserUI();
    updateResume();
    loadRoadmap();
    selectProblem(0);
}

function logout() {
    document.getElementById("app").classList.add("hidden");
    document.getElementById("authPage").classList.remove("hidden");
    showLogin();
}

/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {
    if (!currentUser) return;

    const name = currentUser.name || "Student";

    const topUserName = document.getElementById("topUserName");
    if (topUserName) topUserName.textContent = name;

    const welcomeName = document.getElementById("welcomeName");
    if (welcomeName) welcomeName.textContent = name;

    const topAvatar = document.getElementById("topAvatar");
    if (topAvatar) topAvatar.textContent = name.charAt(0).toUpperCase();

    const leaderName = document.getElementById("leaderName");
    if (leaderName) leaderName.textContent = name;

    const leaderAvatar = document.getElementById("leaderAvatar");
    if (leaderAvatar) leaderAvatar.textContent = name.charAt(0).toUpperCase();

    const statSolved = document.getElementById("statSolved");
    if (statSolved) statSolved.textContent = currentUser.solved || 125;

    const statTests = document.getElementById("statTests");
    if (statTests) statTests.textContent = currentUser.tests || 8;

    const profileName = document.getElementById("profileName");
    if (profileName) profileName.value = name;

    const profileEmail = document.getElementById("profileEmail");
    if (profileEmail) profileEmail.value = currentUser.email || "";
}

/* =========================================================
   NAVIGATION
========================================================= */

function openPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

    const target = document.getElementById(page);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    const active = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (active) active.classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        aptitude: "Aptitude Practice",
        technical: "Technical MCQs",
        coding: "Coding Practice",
        interview: "Interview Preparation",
        resume: "Resume Builder",
        roadmap: "Placement Roadmap",
        mock: "Mock Tests",
        analytics: "Performance Analytics",
        leaderboard: "Leaderboard",
        profile: "My Profile",
        admin: "Admin Panel"
    };

    const topPageTitle = document.getElementById("topPageTitle");
    if (topPageTitle) topPageTitle.textContent = titles[page] || "PlacementPro";

    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

/* =========================================================
   QUIZ ENGINE
========================================================= */

function startQuiz(type) {
    currentQuizType = type || "aptitude";
    mockTestActive = false;

    // Pick source question bank
    const sourceQuestions = questions[type] || questions.aptitude;
    quizQuestions = [...sourceQuestions];
    currentQuestion = 0;
    quizScore = 0;
    quizAnswers = {};

    // Determine target quiz container based on current page
    const technicalPage = document.getElementById("technical");
    if (technicalPage && technicalPage.classList.contains("active")) {
        currentQuizAreaId = "technicalQuizArea";
    } else {
        currentQuizAreaId = "quizArea";
    }

    const area = document.getElementById(currentQuizAreaId);
    if (!area) return;

    const title = moduleTitles[type] || "Practice Quiz";

    area.innerHTML = `
        <div class="quiz-container-card">
            <div class="quiz-header-bar">
                <h2>
                    <span>${title}</span>
                    <span class="quiz-badge">${quizQuestions.length} Questions</span>
                </h2>
                <div style="display:flex;gap:10px;align-items:center;">
                    <button class="secondary-btn" style="padding:6px 14px;font-size:13px;" onclick="closeQuizArea()">✕ Close</button>
                </div>
            </div>

            <div class="quiz-layout">
                <div class="question-card" id="questionCard"></div>

                <div class="quiz-side">
                    <h3 style="margin-bottom:6px;">Time Remaining</h3>
                    <div class="timer" id="quizTimer">15:00</div>

                    <h4 style="margin:12px 0 8px;font-size:13px;color:var(--muted);">Question Palette</h4>
                    <div class="question-palette" id="palette"></div>

                    <br>
                    <button class="primary-btn full" onclick="finishQuiz()">
                        ✓ Submit & Finish Quiz
                    </button>
                </div>
            </div>
        </div>
    `;

    renderQuestion();
    startTimer(900); // 15 minutes
    area.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeQuizArea() {
    clearInterval(quizTimer);
    const area = document.getElementById(currentQuizAreaId);
    if (area) area.innerHTML = "";
}

function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    const card = document.getElementById("questionCard");
    if (!card || !q) return;

    // Render formatted question text with code styling if pseudocode
    let formattedText = q.q;
    let codeHtml = "";
    if (formattedText.includes("\\n")) {
        const parts = formattedText.split("\\n");
        const head = parts[0];
        const code = parts.slice(1).join("\\n").trim();
        if (code.length > 0) {
            codeHtml = `<pre class="pseudocode-box"><code>${escapeHtml(code)}</code></pre>`;
            formattedText = head;
        }
    }

    card.innerHTML = `
        <div class="question-number">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </div>

        <div class="question-text">
            ${escapeHtml(formattedText)}
        </div>

        ${codeHtml}

        <div>
            ${q.options.map((option, index) => `
                <div class="option ${quizAnswers[currentQuestion] === index ? "selected" : ""}"
                     onclick="selectAnswer(${index})">
                    <strong>${String.fromCharCode(65 + index)}.</strong>
                    <span>${escapeHtml(option)}</span>
                </div>
            `).join("")}
        </div>

        <div style="margin-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;gap:8px;">
                <button class="secondary-btn" onclick="prevQuestion()" ${currentQuestion === 0 ? "disabled style='opacity:0.5;cursor:not-allowed;'" : ""}>
                    ← Previous
                </button>
                <button class="secondary-btn" onclick="clearAnswer()">
                    Clear Answer
                </button>
            </div>
            <div>
                ${currentQuestion < quizQuestions.length - 1
                    ? `<button class="primary-btn" onclick="nextQuestion()">Next Question →</button>`
                    : `<button class="primary-btn" style="background:#059669;" onclick="finishQuiz()">Finish Quiz ✓</button>`
                }
            </div>
        </div>
    `;

    renderPalette();
}

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function selectAnswer(index) {
    quizAnswers[currentQuestion] = index;
    renderQuestion();
}

function clearAnswer() {
    delete quizAnswers[currentQuestion];
    renderQuestion();
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function goQuestion(index) {
    currentQuestion = index;
    renderQuestion();
}

function renderPalette() {
    const palette = document.getElementById("palette");
    if (!palette) return;

    palette.innerHTML = quizQuestions.map((_, i) => `
        <button class="palette-btn ${i === currentQuestion ? "current" : ""} ${quizAnswers[i] !== undefined ? "done" : ""}"
                onclick="goQuestion(${i})">
            ${i + 1}
        </button>
    `).join("");
}

function startTimer(durationSeconds) {
    clearInterval(quizTimer);
    let seconds = durationSeconds || 600;

    quizTimer = setInterval(() => {
        seconds--;
        const timer = document.getElementById(mockTestActive ? "mockTimer" : "quizTimer");
        if (timer) {
            const minutes = Math.floor(seconds / 60);
            const sec = String(seconds % 60).padStart(2, "0");
            timer.textContent = `${minutes}:${sec}`;
        }

        if (seconds <= 0) {
            clearInterval(quizTimer);
            if (mockTestActive) {
                finishMockTest();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(quizTimer);

    quizScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    quizQuestions.forEach((q, i) => {
        if (quizAnswers[i] === undefined) {
            skippedCount++;
        } else if (quizAnswers[i] === q.answer) {
            quizScore++;
            correctCount++;
        } else {
            wrongCount++;
        }
    });

    const accuracy = Math.round((quizScore / quizQuestions.length) * 100);

    if (currentUser) {
        currentUser.solved = (currentUser.solved || 125) + Object.keys(quizAnswers).length;
        currentUser.tests = (currentUser.tests || 8) + 1;
        localStorage.setItem("placementUser", JSON.stringify(currentUser));
        updateUserUI();
    }

    showModal(
        "🎉 Quiz Results",
        `
        <div style="text-align:center;padding:10px;">
            <div style="font-size:60px;margin-bottom:10px;">
                ${accuracy >= 70 ? "🏆" : accuracy >= 40 ? "📚" : "💪"}
            </div>

            <h2 style="font-size:32px;color:var(--text);margin-bottom:5px;">
                ${quizScore} / ${quizQuestions.length}
            </h2>

            <p style="color:var(--muted);font-size:15px;margin-bottom:20px;">
                Accuracy: <strong style="color:var(--primary);">${accuracy}%</strong>
            </p>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:25px;">
                <div style="background:#ecfdf5;padding:12px;border-radius:12px;border:1px solid #bbf7d0;">
                    <div style="color:#047857;font-size:20px;font-weight:800;">${correctCount}</div>
                    <small style="color:#065f46;">Correct</small>
                </div>
                <div style="background:#fef2f2;padding:12px;border-radius:12px;border:1px solid #fecaca;">
                    <div style="color:#b91c1c;font-size:20px;font-weight:800;">${wrongCount}</div>
                    <small style="color:#991b1b;">Incorrect</small>
                </div>
                <div style="background:#f3f4f6;padding:12px;border-radius:12px;border:1px solid #e5e7eb;">
                    <div style="color:#4b5563;font-size:20px;font-weight:800;">${skippedCount}</div>
                    <small style="color:#6b7280;">Skipped</small>
                </div>
            </div>

            <div style="display:flex;gap:12px;justify-content:center;">
                <button class="secondary-btn" onclick="reviewQuizAnswers()">
                    📖 Review All Answers
                </button>
                <button class="primary-btn" onclick="closeModal(); closeQuizArea();">
                    Continue Practice
                </button>
            </div>
        </div>
        `
    );
}

function reviewQuizAnswers() {
    closeModal();
    const area = document.getElementById(mockTestActive ? "mockArea" : currentQuizAreaId);
    if (!area) return;

    let reviewHtml = `
        <div class="quiz-container-card">
            <div class="quiz-header-bar">
                <h2>📖 Detailed Solution & Answer Review</h2>
                <button class="secondary-btn" onclick="closeQuizArea()">✕ Close Review</button>
            </div>

            <div>
    `;

    quizQuestions.forEach((q, i) => {
        const userChoice = quizAnswers[i];
        const isCorrect = userChoice === q.answer;
        const isSkipped = userChoice === undefined;

        reviewHtml += `
            <div class="review-item">
                <div class="review-qhead">
                    <span style="font-weight:700;color:var(--primary);">Question ${i + 1}</span>
                    ${isSkipped
                        ? '<span class="badge yellow">SKIPPED</span>'
                        : isCorrect
                        ? '<span class="badge green">✓ CORRECT</span>'
                        : '<span class="badge red">✗ INCORRECT</span>'
                    }
                </div>

                <p style="font-weight:600;margin-bottom:12px;line-height:1.5;">${escapeHtml(q.q)}</p>

                <div>
                    ${q.options.map((opt, optIdx) => {
                        let optClass = "review-option";
                        if (optIdx === q.answer) optClass += " correct-choice";
                        if (userChoice === optIdx && !isCorrect) optClass += " user-wrong";
                        return `
                            <div class="${optClass}">
                                <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}
                                ${optIdx === q.answer ? ' <span style="float:right;">✓ Correct Answer</span>' : ''}
                                ${userChoice === optIdx && !isCorrect ? ' <span style="float:right;">✗ Your Answer</span>' : ''}
                            </div>
                        `;
                    }).join("")}
                </div>

                <div class="explanation-box">
                    <strong>💡 Explanation:</strong>
                    ${escapeHtml(q.explanation || "Detailed step-by-step derivation for placement exam.")}
                </div>
            </div>
        `;
    });

    reviewHtml += `
            </div>
            <div style="text-align:center;margin-top:20px;">
                <button class="primary-btn" onclick="closeQuizArea()">Done Reviewing</button>
            </div>
        </div>
    `;

    area.innerHTML = reviewHtml;
    area.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================================================
   MOCK TESTS
========================================================= */

function startMockTest(type = "full") {
    mockTestActive = true;
    currentQuestion = 0;
    quizScore = 0;
    quizAnswers = {};

    let testName = "Full Placement Assessment";
    let duration = 2700; // 45 min

    if (type === "aptitude") {
        testName = "Aptitude Assessment (Quants & Logic)";
        quizQuestions = [...questions.aptitude.slice(0, 15), ...questions.reasoning.slice(0, 10)];
        duration = 1800; // 30 min
    } else if (type === "technical") {
        testName = "Technical Core Assessment";
        quizQuestions = [
            ...questions.c_cpp.slice(0, 6),
            ...questions.java.slice(0, 6),
            ...questions.dbms.slice(0, 6),
            ...questions.os.slice(0, 6),
            ...questions.dsa.slice(0, 6)
        ];
        duration = 2100; // 35 min
    } else if (type === "tcs") {
        testName = "TCS NQT Placement Simulation";
        quizQuestions = [
            ...questions.company_aptitude.slice(0, 10),
            ...questions.aptitude.slice(0, 10),
            ...questions.company_tech.slice(0, 10)
        ];
        duration = 2100; // 35 min
    } else if (type === "infosys") {
        testName = "Infosys Assessment Simulation";
        quizQuestions = [
            ...questions.company_aptitude.slice(0, 8),
            ...questions.reasoning.slice(0, 9),
            ...questions.pseudocode.slice(0, 8)
        ];
        duration = 1800; // 30 min
    } else if (type === "accenture") {
        testName = "Accenture Cognitive & Pseudocode Mock";
        quizQuestions = [
            ...questions.pseudocode.slice(0, 12),
            ...questions.company_aptitude.slice(0, 8),
            ...questions.verbal.slice(0, 5)
        ];
        duration = 1800; // 30 min
    } else {
        // Full mixed test
        testName = "Full Placement Simulation Test";
        quizQuestions = [
            ...questions.aptitude.slice(0, 8),
            ...questions.reasoning.slice(0, 8),
            ...questions.verbal.slice(0, 6),
            ...questions.c_cpp.slice(0, 4),
            ...questions.java.slice(0, 4),
            ...questions.dbms.slice(0, 4),
            ...questions.dsa.slice(0, 4),
            ...questions.pseudocode.slice(0, 2)
        ];
        duration = 2700; // 45 min
    }

    const area = document.getElementById("mockArea");
    if (!area) return;

    area.innerHTML = `
        <div class="quiz-container-card">
            <div class="quiz-header-bar">
                <h2>
                    <span>${testName}</span>
                    <span class="quiz-badge">${quizQuestions.length} Questions</span>
                </h2>
                <button class="secondary-btn" style="padding:6px 14px;font-size:13px;" onclick="closeMockArea()">✕ Cancel Test</button>
            </div>

            <div class="quiz-layout">
                <div class="question-card" id="mockQuestionCard"></div>

                <div class="quiz-side">
                    <h3 style="margin-bottom:6px;">Test Timer</h3>
                    <div class="timer" id="mockTimer">30:00</div>
                    <p style="color:var(--muted);font-size:13px;line-height:1.5;">Answer carefully. Timer will automatically submit upon completion.</p>

                    <h4 style="margin:16px 0 8px;font-size:13px;color:var(--muted);">Question Palette</h4>
                    <div class="question-palette" id="mockPalette"></div>

                    <br>
                    <button class="primary-btn full" onclick="finishMockTest()">
                        Submit Mock Test ✓
                    </button>
                </div>
            </div>
        </div>
    `;

    renderMockQuestion();
    startTimer(duration);
    area.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeMockArea() {
    clearInterval(quizTimer);
    const area = document.getElementById("mockArea");
    if (area) area.innerHTML = "";
}

function renderMockQuestion() {
    const q = quizQuestions[currentQuestion];
    const card = document.getElementById("mockQuestionCard");
    if (!card || !q) return;

    card.innerHTML = `
        <div class="question-number">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </div>

        <div class="question-text">
            ${escapeHtml(q.q)}
        </div>

        <div>
            ${q.options.map((opt, i) => `
                <div class="option ${quizAnswers[currentQuestion] === i ? "selected" : ""}"
                     onclick="selectMockAnswer(${i})">
                    <strong>${String.fromCharCode(65 + i)}.</strong> ${escapeHtml(opt)}
                </div>
            `).join("")}
        </div>

        <div style="margin-top:24px;display:flex;justify-content:space-between;align-items:center;">
            <button class="secondary-btn" onclick="prevMockQuestion()" ${currentQuestion === 0 ? "disabled style='opacity:0.5;'" : ""}>
                ← Previous
            </button>
            ${currentQuestion < quizQuestions.length - 1
                ? `<button class="primary-btn" onclick="nextMockQuestion()">Next Question →</button>`
                : `<button class="primary-btn" style="background:#059669;" onclick="finishMockTest()">Submit Test ✓</button>`
            }
        </div>
    `;

    renderMockPalette();
}

function selectMockAnswer(index) {
    quizAnswers[currentQuestion] = index;
    renderMockQuestion();
}

function nextMockQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderMockQuestion();
    }
}

function prevMockQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderMockQuestion();
    }
}

function goMockQuestion(index) {
    currentQuestion = index;
    renderMockQuestion();
}

function renderMockPalette() {
    const palette = document.getElementById("mockPalette");
    if (!palette) return;

    palette.innerHTML = quizQuestions.map((_, i) => `
        <button class="palette-btn ${i === currentQuestion ? "current" : ""} ${quizAnswers[i] !== undefined ? "done" : ""}"
                onclick="goMockQuestion(${i})">
            ${i + 1}
        </button>
    `).join("");
}

function finishMockTest() {
    clearInterval(quizTimer);

    let score = 0;
    quizQuestions.forEach((q, i) => {
        if (quizAnswers[i] === q.answer) score++;
    });

    const accuracy = Math.round((score / quizQuestions.length) * 100);

    if (currentUser) {
        currentUser.tests = (currentUser.tests || 8) + 1;
        currentUser.solved = (currentUser.solved || 125) + Object.keys(quizAnswers).length;
        localStorage.setItem("placementUser", JSON.stringify(currentUser));
        updateUserUI();
    }

    showModal(
        "📝 Mock Test Result",
        `
        <div style="text-align:center;padding:10px;">
            <div style="font-size:60px;">🏆</div>
            <h2 style="margin:10px 0;font-size:32px;">${score} / ${quizQuestions.length}</h2>
            <p style="color:var(--muted);margin-bottom:20px;">Score: <strong>${accuracy}%</strong></p>
            <div style="display:flex;gap:10px;justify-content:center;">
                <button class="secondary-btn" onclick="reviewQuizAnswers()">📖 Review Answers</button>
                <button class="primary-btn" onclick="closeModal(); closeMockArea(); openPage('analytics');">View Analytics</button>
            </div>
        </div>
        `
    );
}

/* =========================================================
   CODING PRACTICE
========================================================= */

const codingProblems = [
    {
        title: "Reverse a String",
        difficulty: "Easy • Strings",
        description: "Write a function reverseString(str) that takes a string and returns it reversed.",
        example: 'reverseString("hello") -> "olleh"',
        code: `function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log("Result:", reverseString("hello"));
console.log("Result:", reverseString("PlacementPro"));`
    },
    {
        title: "Two Sum",
        difficulty: "Easy • Arrays & Hash Map",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        example: 'twoSum([2, 7, 11, 15], 9) -> [0, 1]',
        code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

console.log("Indices:", twoSum([2, 7, 11, 15], 9));
console.log("Indices:", twoSum([3, 2, 4], 6));`
    },
    {
        title: "Binary Search",
        difficulty: "Easy • Searching & Arrays",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return -1.",
        example: 'binarySearch([1, 3, 5, 7, 9, 11], 7) -> 3',
        code: `function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

console.log("Found at index:", binarySearch([1, 3, 5, 7, 9, 11], 7));
console.log("Found at index:", binarySearch([1, 3, 5, 7, 9, 11], 4));`
    },
    {
        title: "Valid Parentheses",
        difficulty: "Medium • Stack",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        example: 'isValid("()[]{}") -> true, isValid("(]") -> false',
        code: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.pop() !== map[char]) return false;
        }
    }
    return stack.length === 0;
}

console.log("Valid ('()[]{}'):", isValid("()[]{}"));
console.log("Valid ('([)]'):", isValid("([)]"));`
    },
    {
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium • DP & Kadane's",
        description: "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        example: 'maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) -> 6 (subarray [4, -1, 2, 1])',
        code: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
}

console.log("Max Subarray Sum:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`
    },
    {
        title: "Longest Substring Without Repeating",
        difficulty: "Medium • Sliding Window",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        example: 'lengthOfLongestSubstring("abcabcbb") -> 3 ("abc")',
        code: `function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0, maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

console.log("Longest substring length:", lengthOfLongestSubstring("abcabcbb"));
console.log("Longest substring length:", lengthOfLongestSubstring("bbbbb"));`
    },
    {
        title: "Detect Cycle in Linked List",
        difficulty: "Easy • Two Pointers (Floyd's)",
        description: "Determine if a linked list has a cycle using Floyd's Tortoise and Hare pointer algorithm.",
        example: 'hasCycle(node) -> true / false',
        code: `class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// Test with 3-node cycle
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
node3.next = node1; // cycle
console.log("Has cycle:", hasCycle(node1));`
    },
    {
        title: "Palindrome Number",
        difficulty: "Easy • Math",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise without converting to string.",
        example: 'isPalindrome(121) -> true, isPalindrome(-121) -> false',
        code: `function isPalindrome(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let reverted = 0;
    while (x > reverted) {
        reverted = reverted * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return x === reverted || x === Math.floor(reverted / 10);
}

console.log("121 is palindrome:", isPalindrome(121));
console.log("-121 is palindrome:", isPalindrome(-121));
console.log("10 is palindrome:", isPalindrome(10));`
    }
];

function selectProblem(index) {
    document.querySelectorAll(".problem-item").forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });

    const p = codingProblems[index] || codingProblems[0];
    const problemTitle = document.getElementById("problemTitle");
    if (problemTitle) problemTitle.textContent = p.title;

    const problemDescription = document.getElementById("problemDescription");
    if (problemDescription) {
        problemDescription.innerHTML = `
            ${p.description}
            <br><br>
            <strong>Example:</strong> ${p.example}
        `;
    }

    const codeEditor = document.getElementById("codeEditor");
    if (codeEditor) codeEditor.value = p.code;

    const codeOutput = document.getElementById("codeOutput");
    if (codeOutput) codeOutput.textContent = "Output will appear here...";
}

function runCode() {
    const code = document.getElementById("codeEditor").value;
    const output = document.getElementById("codeOutput");

    try {
        const logs = [];
        const originalLog = console.log;

        console.log = function(...args) {
            logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : a).join(" "));
        };

        new Function(code)();

        console.log = originalLog;

        output.textContent = logs.length ? logs.join("\\n") : "Code executed successfully (no logs).";
        showToast("Code executed successfully!");
    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
}

/* =========================================================
   INTERVIEW PREPARATION
========================================================= */

function showInterview(question) {
    const answers = {
        "Tell me about yourself.": `
            <h3>Tell Me About Yourself (HR Round)</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Framework: Present → Past → Future (2 minutes)</strong>
            </p>
            <br>
            <strong>Sample Response:</strong>
            <p style="line-height:1.8;color:#4b5563;">
                "I am a Computer Science graduate passionate about full-stack engineering and problem solving. During my academic journey, I mastered Data Structures, Java, and modern web development, building projects like a comprehensive Placement Preparation Portal. I have solved 150+ DSA challenges and enjoy optimizing algorithms. I am eager to contribute my technical foundation, adapt quickly, and create meaningful software impact at your organization."
            </p>
        `,

        "Why should we hire you?": `
            <h3>Why Should We Hire You?</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Framework: Skills + Cultural Fit + Problem Solving</strong>
            </p>
            <br>
            <strong>Sample Response:</strong>
            <p style="line-height:1.8;color:#4b5563;">
                "You should hire me because I offer a strong blend of core computer science fundamentals and practical hands-on project experience. Beyond my coding skills, I am a proactive team player who thrives on continuous learning. I understand company coding standards, value clean architecture, and have proven my ability to grasp new frameworks quickly."
            </p>
        `,

        "What are your strengths and weaknesses?": `
            <h3>Strengths & Weaknesses</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Strengths:</strong> Problem solving, persistence in debugging, and clear communication.<br>
                <strong>Weakness Strategy:</strong> Pick a real technical area and explain your action plan.
            </p>
            <br>
            <strong>Sample Response:</strong>
            <p style="line-height:1.8;color:#4b5563;">
                "My key strength is analytical problem-solving and structured task execution. An area I am actively improving is public speaking in large conferences; to overcome this, I have been volunteering to lead technical project demos and seminars, which has significantly boosted my confidence."
            </p>
        `,

        "Where do you see yourself in five years?": `
            <h3>Where Do You See Yourself in Five Years?</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Framework: Depth of Tech Expertise → Leadership & Mentorship</strong>
            </p>
            <br>
            <strong>Sample Response:</strong>
            <p style="line-height:1.8;color:#4b5563;">
                "In five years, I envision myself as a seasoned Senior Software Engineer specializing in scalable distributed architectures. I aim to take ownership of complex production modules, mentor junior developers, and contribute directly to high-impact product roadmap decisions."
            </p>
        `,

        "OOP Concepts": `
            <h3>OOP Core Concepts (Technical Interview)</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>1. Encapsulation:</strong> Binding data and methods into a class and restricting direct access via private fields with public getters/setters.<br>
                <strong>2. Abstraction:</strong> Hiding implementation complexity and exposing clean interfaces (e.g., abstract classes and interfaces).<br>
                <strong>3. Inheritance:</strong> Mechanism where a child class acquires the properties and behaviors of a parent class (IS-A relationship).<br>
                <strong>4. Polymorphism:</strong> Ability of an object to take many forms. Compile-time (Method Overloading) and Runtime (Method Overriding).<br>
                <strong>SOLID Principles:</strong> Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
            </p>
        `,

        "DBMS": `
            <h3>DBMS & SQL Interview Questions</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>• ACID Properties:</strong> Atomicity (all or none), Consistency (valid state), Isolation (independent transactions), Durability (persisted on disk).<br>
                <strong>• Normalization:</strong> 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (every determinant is candidate key).<br>
                <strong>• Joins:</strong> INNER (matches), LEFT (all left + matched right), RIGHT, FULL OUTER.<br>
                <strong>• Indexing:</strong> B+ Trees allow efficient O(log N) searches and range queries on disk.
            </p>
        `,

        "Operating System": `
            <h3>Operating Systems Interview Topics</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>• Process vs Thread:</strong> Process is an independent program in execution with separate memory. Thread is a lightweight sub-process sharing the same address space.<br>
                <strong>• CPU Scheduling:</strong> FCFS, SJF, Round Robin (time quantum), Priority Scheduling.<br>
                <strong>• Deadlock:</strong> 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Avoidance: Banker's Algorithm.<br>
                <strong>• Virtual Memory & Paging:</strong> Translation of virtual addresses to physical RAM via Page Tables and TLB cache.
            </p>
        `,

        "DSA": `
            <h3>Data Structures & Algorithms Interview Sheet</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>• Time Complexities:</strong> QuickSort/MergeSort (O(n log n)), Binary Search (O(log n)), Hash Table lookup (O(1)).<br>
                <strong>• Common Traversal Patterns:</strong> Two Pointers, Sliding Window, Fast & Slow Pointers (Floyd's Cycle), Tree In-order/Pre-order/Post-order, BFS & DFS.<br>
                <strong>• Dynamic Programming:</strong> Identifying overlapping subproblems and optimal substructure. Memoization (top-down) vs Tabulation (bottom-up).
            </p>
        `,

        "TCS Interview Experience": `
            <h3>TCS Ninja & Digital Interview Experience</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Rounds:</strong> Technical + Managerial + HR (often combined panel).<br>
                <strong>Technical:</strong> Pointers in C, SQL Joins, write code for Palindrome or Fibonacci, explain your final year project architecture.<br>
                <strong>Managerial & HR:</strong> Willingness to relocate, night shifts, handling project deadlines, conflict resolution in a team.
            </p>
        `,

        "Infosys Interview Experience": `
            <h3>Infosys Specialist & Systems Engineer</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Rounds:</strong> Online Assessment (Cryptarithmetic, Quants, Reasoning, Pseudocode) -> Technical & HR Interview.<br>
                <strong>Key Focus:</strong> Heavy emphasis on Core Java/Python OOP, SQL subqueries, project live walkthrough, and basic DSA (arrays, string reversals, linked lists).
            </p>
        `,

        "Accenture Interview Experience": `
            <h3>Accenture ASE & FSE Interview Experience</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Rounds:</strong> Cognitive Assessment + Technical Pseudocode + Communication Test -> Technical/HR Interview.<br>
                <strong>Key Focus:</strong> Cloud fundamentals, network basics, STAR method for situation-based questions ("Describe a time you solved a tough bug").
            </p>
        `,

        "Wipro Interview Experience": `
            <h3>Wipro Elite NLTH Interview Experience</h3>
            <p style="line-height:1.8;color:#4b5563;">
                <strong>Rounds:</strong> Online Aptitude & Coding -> Combined TR & HR Interview.<br>
                <strong>Key Focus:</strong> Resume verification, OOP 4 pillars, C programming basics, string manipulation, and adaptability.
            </p>
        `
    };

    const container = document.getElementById("interviewAnswer");
    if (container) {
        container.innerHTML = answers[question] || `
            <h3>Interview Preparation</h3>
            <p style="line-height:1.8;color:#4b5563;">
                Select a topic from the left to view frameworks, sample answers, and recruiter insights.
            </p>
        `;
    }
}

/* =========================================================
   RESUME BUILDER
========================================================= */

function updateResume() {
    const fields = {
        previewName: document.getElementById("resumeName")?.value || currentUser?.name || "Your Name",
        previewEmail: document.getElementById("resumeEmail")?.value || currentUser?.email || "your@email.com",
        previewPhone: document.getElementById("resumePhone")?.value || "+91 XXXXX XXXXX",
        previewObjective: document.getElementById("resumeObjective")?.value || "",
        previewEducation: document.getElementById("resumeEducation")?.value || "",
        previewSkills: document.getElementById("resumeSkills")?.value || "",
        previewProjects: document.getElementById("resumeProjects")?.value || "",
        previewCertificates: document.getElementById("resumeCertificates")?.value || ""
    };

    Object.keys(fields).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = fields[id];
    });
}

/* =========================================================
   PLACEMENT ROADMAP TRACKER
========================================================= */

function toggleRoadmapPhase(phaseIndex) {
    const saved = JSON.parse(localStorage.getItem("placementRoadmap") || "{}");
    const checkbox = document.getElementById(`roadmapCheck${phaseIndex}`);
    if (checkbox) {
        saved[phaseIndex] = checkbox.checked;
        localStorage.setItem("placementRoadmap", JSON.stringify(saved));

        const title = document.getElementById(`roadmapTitle${phaseIndex}`);
        if (title) {
            title.classList.toggle("roadmap-completed-text", checkbox.checked);
        }
    }
}

function loadRoadmap() {
    const saved = JSON.parse(localStorage.getItem("placementRoadmap") || "{}");
    for (let i = 0; i < 8; i++) {
        const checkbox = document.getElementById(`roadmapCheck${i}`);
        const title = document.getElementById(`roadmapTitle${i}`);
        if (checkbox && saved[i] !== undefined) {
            checkbox.checked = saved[i];
            if (title) title.classList.toggle("roadmap-completed-text", saved[i]);
        }
    }
}

/* =========================================================
   PROFILE
========================================================= */

function saveProfile() {
    if (!currentUser) return;

    currentUser.name = document.getElementById("profileName").value;
    currentUser.email = document.getElementById("profileEmail").value;
    currentUser.role = document.getElementById("profileRole")?.value || "Student";
    currentUser.github = document.getElementById("profileGithub")?.value || "";
    currentUser.linkedin = document.getElementById("profileLinkedin")?.value || "";

    localStorage.setItem("placementUser", JSON.stringify(currentUser));
    updateUserUI();
    showToast("Profile saved successfully!");
}

/* =========================================================
   ADMIN PANEL
========================================================= */

function openAdmin() {
    openPage("admin");
}

function addQuestion() {
    showModal(
        "➕ Add Placement Question",
        `
        <div class="form-group">
            <label>Module / Category</label>
            <select id="newCategory" style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--border);">
                <option value="aptitude">Quantitative Aptitude</option>
                <option value="reasoning">Logical Reasoning</option>
                <option value="verbal">Verbal Ability</option>
                <option value="company_aptitude">Company Aptitude (TCS/Infy/AMCAT)</option>
                <option value="c_cpp">C / C++ Programming</option>
                <option value="java">Java Programming</option>
                <option value="python">Python Programming</option>
                <option value="dbms">DBMS & SQL</option>
                <option value="os">Operating Systems</option>
                <option value="cn">Computer Networks</option>
                <option value="dsa">DSA</option>
                <option value="oops">OOP Concepts</option>
                <option value="pseudocode">Pseudocode & Logic</option>
                <option value="company_tech">Company Technical Papers</option>
            </select>
        </div>

        <div class="form-group">
            <label>Question Text</label>
            <textarea id="newQuestion" rows="3" placeholder="Enter question"></textarea>
        </div>

        <div class="form-group">
            <label>Options (comma separated)</label>
            <input id="newOptions" placeholder="Option A, Option B, Option C, Option D">
        </div>

        <div class="form-group">
            <label>Correct Answer Index (0 for A, 1 for B, 2 for C, 3 for D)</label>
            <input id="newAnswerIndex" type="number" min="0" max="3" placeholder="0">
        </div>

        <div class="form-group">
            <label>Detailed Explanation</label>
            <textarea id="newExplanation" rows="2" placeholder="Step-by-step solution derivation"></textarea>
        </div>

        <button class="primary-btn full" onclick="saveQuestion()">Save Question</button>
        `
    );
}

function saveQuestion() {
    const category = document.getElementById("newCategory").value;
    const q = document.getElementById("newQuestion").value.trim();
    const opts = document.getElementById("newOptions").value.split(",").map(o => o.trim());
    const ans = parseInt(document.getElementById("newAnswerIndex").value, 10);
    const explanation = document.getElementById("newExplanation").value.trim();

    if (!q || opts.length < 2 || isNaN(ans)) {
        showToast("Please fill all fields properly.");
        return;
    }

    const newObj = {
        q,
        options: opts,
        answer: ans,
        explanation: explanation || "Verified placement question solution."
    };

    if (questions[category]) {
        questions[category].unshift(newObj);
    }

    const adminQuestions = JSON.parse(localStorage.getItem("adminQuestions") || "[]");
    adminQuestions.push({ category, ...newObj });
    localStorage.setItem("adminQuestions", JSON.stringify(adminQuestions));

    closeModal();
    showToast("Question added to " + category + "!");
}

/* =========================================================
   MODAL & TOAST NOTIFICATIONS
========================================================= */

function showModal(title, content) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalContent").innerHTML = content;
    document.getElementById("modal").classList.add("show");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* =========================================================
   APP INITIALIZATION
========================================================= */

window.addEventListener("load", () => {
    // Load any custom admin questions
    try {
        const custom = JSON.parse(localStorage.getItem("adminQuestions") || "[]");
        custom.forEach(item => {
            if (questions[item.category]) {
                questions[item.category].unshift(item);
            }
        });
    } catch (e) {}

    if (currentUser) {
        loadApp();
    }
});