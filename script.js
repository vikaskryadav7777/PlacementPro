

/* =========================================================
GLOBAL DATA
========================================================= */

let currentUser =
    JSON.parse(localStorage.getItem("placementUser")) || null;

let quizQuestions = [];
let currentQuestion = 0;
let quizScore = 0;
let quizAnswers = {};
let quizTimer = null;

const questions = {

    aptitude:[
        {
            q:"A number is increased by 20%. The new number is 240. What was the original number?",
            options:["180","200","220","210"],
            answer:1,
            explanation:"240 ÷ 1.20 = 200."
        },
        {
            q:"If 5 workers complete a work in 12 days, how many days will 10 workers take?",
            options:["3","6","10","24"],
            answer:1,
            explanation:"Workers and days are inversely proportional."
        },
        {
            q:"What is 25% of 360?",
            options:["80","90","100","120"],
            answer:1,
            explanation:"360 × 25/100 = 90."
        },
        {
            q:"The average of 10, 20 and 30 is:",
            options:["15","20","25","30"],
            answer:1,
            explanation:"(10+20+30)/3 = 20."
        },
        {
            q:"If a train travels 120 km in 2 hours, its speed is:",
            options:["40 km/h","50 km/h","60 km/h","80 km/h"],
            answer:2,
            explanation:"Speed = Distance/Time = 120/2 = 60 km/h."
        }
    ],

    reasoning:[
        {
            q:"Find the next number: 2, 4, 8, 16, ?",
            options:["20","24","32","36"],
            answer:2,
            explanation:"Each number is multiplied by 2."
        },
        {
            q:"If CAT is coded as DBU, then DOG is coded as:",
            options:["EPH","EPG","FPH","DOH"],
            answer:0,
            explanation:"Each letter moves one position forward."
        },
        {
            q:"Which number does not belong? 2, 4, 8, 16, 31",
            options:["2","8","16","31"],
            answer:3,
            explanation:"The sequence should continue by doubling."
        }
    ],

    verbal:[
        {
            q:"Choose the synonym of 'Rapid'.",
            options:["Slow","Fast","Weak","Late"],
            answer:1,
            explanation:"Rapid means fast or quick."
        },
        {
            q:"Choose the antonym of 'Ancient'.",
            options:["Old","Historic","Modern","Past"],
            answer:2,
            explanation:"Modern is the opposite of ancient."
        },
        {
            q:"Choose the correct sentence.",
            options:[
                "He go to college.",
                "He goes to college.",
                "He going college.",
                "He gone college."
            ],
            answer:1,
            explanation:"He is singular, so 'goes' is correct."
        }
    ],

    technical:[
        {
            q:"Which OOP concept allows the same function name to behave differently?",
            options:[
                "Encapsulation",
                "Polymorphism",
                "Inheritance",
                "Abstraction"
            ],
            answer:1,
            explanation:"Polymorphism allows one interface with multiple implementations."
        },
        {
            q:"Which data structure follows LIFO?",
            options:["Queue","Stack","Array","Tree"],
            answer:1,
            explanation:"Stack follows Last In First Out."
        },
        {
            q:"Which SQL command is used to retrieve data?",
            options:["INSERT","UPDATE","SELECT","DELETE"],
            answer:2,
            explanation:"SELECT retrieves records from a database."
        },
        {
            q:"Which protocol is connection-oriented?",
            options:["UDP","TCP","IP","HTTP"],
            answer:1,
            explanation:"TCP establishes a connection before data transmission."
        },
        {
            q:"Which scheduling algorithm uses a time quantum?",
            options:[
                "FCFS",
                "SJF",
                "Round Robin",
                "Priority"
            ],
            answer:2,
            explanation:"Round Robin uses a fixed time quantum."
        }
    ]

};


/* =========================================================
AUTHENTICATION
========================================================= */

function showRegister(){

    document.getElementById("loginBox")
        .classList.add("hidden");

    document.getElementById("registerBox")
        .classList.remove("hidden");

}


function showLogin(){

    document.getElementById("registerBox")
        .classList.add("hidden");

    document.getElementById("loginBox")
        .classList.remove("hidden");

}


function registerUser(){

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    if(!name || !email || !password){

        showToast("Please fill all fields.");
        return;

    }

    const user = {
        name,
        email,
        password,
        role:"student",
        solved:125,
        tests:8
    };

    localStorage.setItem(
        "placementUser",
        JSON.stringify(user)
    );

    currentUser = user;

    showToast("Account created successfully!");

    setTimeout(loadApp,500);

}


function login(){

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const saved =
        JSON.parse(localStorage.getItem("placementUser"));

    if(saved &&
       saved.email === email &&
       saved.password === password){

        currentUser = saved;
        loadApp();
        return;

    }

    if(email && password){

        currentUser = {
            name:email.split("@")[0],
            email,
            password,
            role:"student",
            solved:125,
            tests:8
        };

        localStorage.setItem(
            "placementUser",
            JSON.stringify(currentUser)
        );

        loadApp();

    }else{

        showToast("Enter email and password.");

    }

}


function demoLogin(){

    currentUser = {
        name:"Vikas",
        email:"vikas@example.com",
        password:"demo",
        role:"student",
        solved:125,
        tests:8
    };

    localStorage.setItem(
        "placementUser",
        JSON.stringify(currentUser)
    );

    loadApp();

}


function loadApp(){

    document.getElementById("authPage")
        .classList.add("hidden");

    document.getElementById("app")
        .classList.remove("hidden");

    updateUserUI();

    updateResume();

}


function logout(){

    document.getElementById("app")
        .classList.add("hidden");

    document.getElementById("authPage")
        .classList.remove("hidden");

    showLogin();

}


/* =========================================================
USER UI
========================================================= */

function updateUserUI(){

    if(!currentUser) return;

    const name =
        currentUser.name || "Student";

    document.getElementById("topUserName")
        .textContent = name;

    document.getElementById("welcomeName")
        .textContent = name;

    document.getElementById("topAvatar")
        .textContent =
        name.charAt(0).toUpperCase();

    document.getElementById("leaderName")
        .textContent = name;

    document.getElementById("leaderAvatar")
        .textContent =
        name.charAt(0).toUpperCase();

    document.getElementById("statSolved")
        .textContent =
        currentUser.solved || 125;

    document.getElementById("statTests")
        .textContent =
        currentUser.tests || 8;

    document.getElementById("profileName")
        .value = name;

    document.getElementById("profileEmail")
        .value = currentUser.email || "";

}


/* =========================================================
NAVIGATION
========================================================= */

function openPage(page){

    document.querySelectorAll(".page")
        .forEach(p=>p.classList.remove("active"));

    const target =
        document.getElementById(page);

    if(target)
        target.classList.add("active");

    document.querySelectorAll(".nav-item")
        .forEach(item=>item.classList.remove("active"));

    const active =
        document.querySelector(
            `.nav-item[data-page="${page}"]`
        );

    if(active)
        active.classList.add("active");

    const titles = {
        dashboard:"Dashboard",
        aptitude:"Aptitude Practice",
        technical:"Technical MCQs",
        coding:"Coding Practice",
        interview:"Interview Preparation",
        resume:"Resume Builder",
        roadmap:"Placement Roadmap",
        mock:"Mock Tests",
        analytics:"Performance Analytics",
        leaderboard:"Leaderboard",
        profile:"My Profile",
        admin:"Admin Panel"
    };

    document.getElementById("topPageTitle")
        .textContent =
        titles[page] || "PlacementPro";

    document.getElementById("sidebar")
        .classList.remove("open");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* =========================================================
SIDEBAR
========================================================= */

function toggleSidebar(){

    document.getElementById("sidebar")
        .classList.toggle("open");

}


/* =========================================================
QUIZ ENGINE
========================================================= */

function startQuiz(type){

    quizQuestions =
        questions[type] || questions.aptitude;

    currentQuestion = 0;
    quizScore = 0;
    quizAnswers = {};

    const area =
        document.getElementById("quizArea");

    if(area){

        area.innerHTML = `
            <div class="quiz-layout">
                <div class="question-card"
                     id="questionCard"></div>

                <div class="quiz-side">
                    <h3>Quiz Progress</h3>

                    <div class="timer"
                         id="quizTimer">
                        10:00
                    </div>

                    <div class="question-palette"
                         id="palette"></div>

                    <br>

                    <button class="primary-btn full"
                            onclick="finishQuiz()">
                        Finish Quiz
                    </button>
                </div>
            </div>
        `;

        renderQuestion();

        startTimer();

        area.scrollIntoView({
            behavior:"smooth"
        });

    }

}


function renderQuestion(){

    const q =
        quizQuestions[currentQuestion];

    const card =
        document.getElementById("questionCard");

    if(!card) return;

    card.innerHTML = `

        <div class="question-number">
            Question ${currentQuestion+1}
            of ${quizQuestions.length}
        </div>

        <div class="question-text">
            ${q.q}
        </div>

        <div>
            ${q.options.map((option,index)=>`

                <div class="option
                    ${quizAnswers[currentQuestion] === index
                    ? "selected":""
                    }"
                    onclick="selectAnswer(${index})">

                    <strong>
                        ${String.fromCharCode(65+index)}.
                    </strong>
                    ${option}

                </div>

            `).join("")}
        </div>

        <div style="margin-top:20px;
                    display:flex;
                    justify-content:space-between">

            <button class="secondary-btn"
                    onclick="previousQuestion()">
                ← Previous
            </button>

            <button class="primary-btn"
                    onclick="nextQuestion()">
                ${currentQuestion === quizQuestions.length-1
                    ? "Finish"
                    : "Next →"}
            </button>

        </div>

    `;

    renderPalette();

}


function selectAnswer(index){

    quizAnswers[currentQuestion] = index;

    renderQuestion();

}


function nextQuestion(){

    if(currentQuestion <
       quizQuestions.length-1){

        currentQuestion++;
        renderQuestion();

    }else{

        finishQuiz();

    }

}


function previousQuestion(){

    if(currentQuestion > 0){

        currentQuestion--;
        renderQuestion();

    }

}


function renderPalette(){

    const palette =
        document.getElementById("palette");

    if(!palette) return;

    palette.innerHTML =
        quizQuestions.map((_,i)=>`

        <button class="palette-btn
            ${i===currentQuestion ? "current":""}
            ${quizAnswers[i] !== undefined ? "done":""}"
            onclick="goQuestion(${i})">
            ${i+1}
        </button>

    `).join("");

}


function goQuestion(index){

    currentQuestion = index;
    renderQuestion();

}


function startTimer(){

    clearInterval(quizTimer);

    let seconds = 600;

    quizTimer = setInterval(()=>{

        seconds--;

        const timer =
            document.getElementById("quizTimer");

        if(timer){

            const minutes =
                Math.floor(seconds/60);

            const sec =
                String(seconds%60).padStart(2,"0");

            timer.textContent =
                `${minutes}:${sec}`;

        }

        if(seconds <= 0){

            clearInterval(quizTimer);
            finishQuiz();

        }

    },1000);

}


function finishQuiz(){

    clearInterval(quizTimer);

    quizScore = 0;

    quizQuestions.forEach((q,i)=>{

        if(quizAnswers[i] === q.answer)
            quizScore++;

    });

    if(currentUser){

        currentUser.solved =
            (currentUser.solved || 125)
            + quizQuestions.length;

        currentUser.tests =
            (currentUser.tests || 8) + 1;

        localStorage.setItem(
            "placementUser",
            JSON.stringify(currentUser)
        );

        updateUserUI();

    }

    showModal(
        "Quiz Result",
        `
        <div style="text-align:center">

            <div style="font-size:60px">
                ${quizScore >= quizQuestions.length*.7
                    ? "🎉"
                    : "📚"}
            </div>

            <h2>
                ${quizScore}/${quizQuestions.length}
            </h2>

            <p style="margin:10px 0;color:#6b7280">
                Accuracy:
                ${Math.round(
                    quizScore/quizQuestions.length*100
                )}%
            </p>

            <button class="primary-btn"
                    onclick="closeModal()">
                Continue Practice
            </button>

        </div>
        `
    );

}


/* =========================================================
CODING PRACTICE
========================================================= */

const codingProblems = [

    {
        title:"Reverse a String",
        description:"Write a function to reverse a given string.",
        code:`function reverseString(str) {
    return str.split("").reverse().join("");
}

console.log(reverseString("hello"));`
    },

    {
        title:"Two Sum",
        description:"Find two numbers whose sum equals the target.",
        code:`function twoSum(arr, target) {
    // Write your solution here
}

console.log(twoSum([2,7,11,15],9));`
    },

    {
        title:"Binary Search",
        description:"Search for an element in a sorted array.",
        code:`function binarySearch(arr, target) {
    // Write your solution here
}

console.log(binarySearch([1,2,3,4,5],4));`
    },

    {
        title:"Valid Parentheses",
        description:"Check whether brackets are correctly balanced.",
        code:`function isValid(str) {
    // Write your solution here
}

console.log(isValid("()[]{}"));`
    },

    {
        title:"Maximum Subarray",
        description:"Find the maximum sum of a contiguous subarray.",
        code:`function maxSubArray(arr) {
    // Write your solution here
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));`
    }

];


function selectProblem(index){

    document.querySelectorAll(".problem-item")
        .forEach((item,i)=>{
            item.classList.toggle("active",i===index);
        });

    const p =
        codingProblems[index];

    document.getElementById("problemTitle")
        .textContent = p.title;

    document.getElementById("problemDescription")
        .textContent = p.description;

    document.getElementById("codeEditor")
        .value = p.code;

    document.getElementById("codeOutput")
        .textContent =
        "Output will appear here...";

}


function runCode(){

    const code =
        document.getElementById("codeEditor")
        .value;

    const output =
        document.getElementById("codeOutput");

    try{

        const logs = [];

        const originalLog =
            console.log;

        console.log = function(...args){
            logs.push(args.join(" "));
        };

        new Function(code)();

        console.log = originalLog;

        output.textContent =
            logs.length
            ? logs.join("\n")
            : "Code executed successfully.";

        showToast("Code executed!");

    }catch(error){

        output.textContent =
            "Error: " + error.message;

    }

}


/* =========================================================
INTERVIEW
========================================================= */

function showInterview(question){

    const answers = {

        "Tell me about yourself.":`
            <h3>Tell Me About Yourself</h3>

            <p style="line-height:1.8;color:#4b5563">
            Use the Present → Past → Future structure.
            Start with your current education, mention your
            important technical skills and projects, then explain
            what type of role you are targeting.
            </p>

            <br>

            <strong>Sample structure:</strong>

            <p style="line-height:1.8;color:#4b5563">
            "I am a Computer Science Engineering student with a
            strong interest in software development. I have been
            working with programming languages such as Java,
            Python and JavaScript and have developed academic
            projects to strengthen my practical skills. I am
            currently looking for an opportunity where I can apply
            my skills, learn from experienced professionals and
            contribute to the organization."
            </p>
        `,

        "Why should we hire you?":`
            <h3>Why Should We Hire You?</h3>

            <p style="line-height:1.8;color:#4b5563">
            Connect your skills with the company's requirements.
            Focus on problem solving, adaptability, teamwork and
            willingness to learn.
            </p>
        `,

        "What are your strengths and weaknesses?":`
            <h3>Strengths & Weaknesses</h3>

            <p style="line-height:1.8;color:#4b5563">
            Choose strengths that can be demonstrated through
            examples. For weaknesses, mention a genuine but
            manageable area and explain how you are improving it.
            </p>
        `,

        "Where do you see yourself in five years?":`
            <h3>Five-Year Goal</h3>

            <p style="line-height:1.8;color:#4b5563">
            Show ambition while keeping your answer realistic.
            Focus on becoming technically strong, taking
            responsibility and contributing to important projects.
            </p>
        `

    };

    document.getElementById("interviewAnswer")
        .innerHTML =
        answers[question] || `
            <h3>Prepare Your Answer</h3>
            <p>Structure your response clearly and support it
            with real examples.</p>
        `;

}


/* =========================================================
RESUME BUILDER
========================================================= */

function updateResume(){

    const fields = {

        previewName:
            document.getElementById("resumeName")?.value ||
            currentUser?.name ||
            "Your Name",

        previewEmail:
            document.getElementById("resumeEmail")?.value ||
            currentUser?.email ||
            "your@email.com",

        previewPhone:
            document.getElementById("resumePhone")?.value ||
            "+91 XXXXX XXXXX",

        previewObjective:
            document.getElementById("resumeObjective")?.value ||
            "",

        previewEducation:
            document.getElementById("resumeEducation")?.value ||
            "",

        previewSkills:
            document.getElementById("resumeSkills")?.value ||
            "",

        previewProjects:
            document.getElementById("resumeProjects")?.value ||
            "",

        previewCertificates:
            document.getElementById("resumeCertificates")?.value ||
            ""

    };

    Object.keys(fields).forEach(id=>{

        const element =
            document.getElementById(id);

        if(element)
            element.textContent = fields[id];

    });

}


/* =========================================================
PROFILE
========================================================= */

function saveProfile(){

    if(!currentUser) return;

    currentUser.name =
        document.getElementById("profileName").value;

    currentUser.email =
        document.getElementById("profileEmail").value;

    currentUser.role =
        document.getElementById("profileRole").value;

    currentUser.github =
        document.getElementById("profileGithub").value;

    currentUser.linkedin =
        document.getElementById("profileLinkedin").value;

    localStorage.setItem(
        "placementUser",
        JSON.stringify(currentUser)
    );

    updateUserUI();

    showToast("Profile saved successfully!");

}


/* =========================================================
MOCK TEST
========================================================= */

function startMockTest(){

    const mockQuestions = [
        ...questions.aptitude.slice(0,3),
        ...questions.technical.slice(0,2)
    ];

    quizQuestions = mockQuestions;
    currentQuestion = 0;
    quizScore = 0;
    quizAnswers = {};

    const area =
        document.getElementById("mockArea");

    area.innerHTML = `
        <div class="quiz-layout">
            <div class="question-card"
                 id="mockQuestionCard"></div>

            <div class="quiz-side">

                <h3>Mock Test</h3>

                <div class="timer"
                     id="mockTimer">
                    10:00
                </div>

                <p style="color:#6b7280">
                    Answer all questions carefully.
                </p>

                <br>

                <button class="primary-btn full"
                        onclick="finishMockTest()">
                    Submit Test
                </button>

            </div>
        </div>
    `;

    renderMockQuestion();

    let seconds = 600;

    clearInterval(quizTimer);

    quizTimer = setInterval(()=>{

        seconds--;

        const timer =
            document.getElementById("mockTimer");

        if(timer){

            timer.textContent =
                `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`;

        }

        if(seconds <= 0)
            finishMockTest();

    },1000);

}


function renderMockQuestion(){

    const q =
        quizQuestions[currentQuestion];

    const card =
        document.getElementById("mockQuestionCard");

    if(!card) return;

    card.innerHTML = `

        <div class="question-number">
            Question ${currentQuestion+1}
            of ${quizQuestions.length}
        </div>

        <div class="question-text">
            ${q.q}
        </div>

        ${q.options.map((o,i)=>`

            <div class="option
                ${quizAnswers[currentQuestion]===i
                ? "selected":""}"
                onclick="selectMockAnswer(${i})">

                ${String.fromCharCode(65+i)}.
                ${o}

            </div>

        `).join("")}

        <br>

        <button class="primary-btn"
                onclick="nextMockQuestion()">
            ${currentQuestion===quizQuestions.length-1
                ? "Finish"
                : "Next →"}
        </button>

    `;

}


function selectMockAnswer(index){

    quizAnswers[currentQuestion] = index;

    renderMockQuestion();

}


function nextMockQuestion(){

    if(currentQuestion <
       quizQuestions.length-1){

        currentQuestion++;
        renderMockQuestion();

    }else{

        finishMockTest();

    }

}


function finishMockTest(){

    clearInterval(quizTimer);

    let score=0;

    quizQuestions.forEach((q,i)=>{

        if(quizAnswers[i]===q.answer)
            score++;

    });

    if(currentUser){

        currentUser.tests =
            (currentUser.tests || 8)+1;

        localStorage.setItem(
            "placementUser",
            JSON.stringify(currentUser)
        );

        updateUserUI();

    }

    showModal(
        "Mock Test Result",
        `
        <div style="text-align:center">

            <div style="font-size:55px">🏆</div>

            <h2>${score}/${quizQuestions.length}</h2>

            <p style="color:#6b7280;margin:10px">
                Score:
                ${Math.round(score/quizQuestions.length*100)}%
            </p>

            <button class="primary-btn"
                    onclick="closeModal()">
                View Analytics
            </button>

        </div>
        `
    );

}


/* =========================================================
ADMIN
========================================================= */

function openAdmin(){

    openPage("admin");

}


function addQuestion(){

    showModal(
        "Add Question",
        `
        <div class="form-group">
            <label>Question</label>
            <textarea id="newQuestion"
                      rows="4"
                      placeholder="Enter question"></textarea>
        </div>

        <div class="form-group">
            <label>Correct Answer</label>
            <input id="newAnswer"
                   placeholder="Enter correct answer">
        </div>

        <button class="primary-btn"
                onclick="saveQuestion()">
            Save Question
        </button>
        `
    );

}


function saveQuestion(){

    const q =
        document.getElementById("newQuestion").value;

    const a =
        document.getElementById("newAnswer").value;

    if(!q || !a){

        showToast("Fill all fields.");
        return;

    }

    const adminQuestions =
        JSON.parse(
            localStorage.getItem("adminQuestions") || "[]"
        );

    adminQuestions.push({
        question:q,
        answer:a
    });

    localStorage.setItem(
        "adminQuestions",
        JSON.stringify(adminQuestions)
    );

    closeModal();

    showToast("Question added successfully!");

}


/* =========================================================
MODAL
========================================================= */

function showModal(title,content){

    document.getElementById("modalTitle")
        .textContent=title;

    document.getElementById("modalContent")
        .innerHTML=content;

    document.getElementById("modal")
        .classList.add("show");

}


function closeModal(){

    document.getElementById("modal")
        .classList.remove("show");

}


/* =========================================================
TOAST
========================================================= */

function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);

}


/* =========================================================
INITIALIZATION
========================================================= */

window.addEventListener("load",()=>{

    if(currentUser){

        loadApp();

    }

});

