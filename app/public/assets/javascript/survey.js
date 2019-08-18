// Global Variables
const questions = [
    {q: "Chocolate Chip Cookies are the best desert"},
    {q: "Vanilla ice cream is the best flavor"},
    {q:"Chocolate ice cream is the best flavor"},
    {q:"Strawberry ice cream is the best"},
    {q:"Cookies and Cream ice cream is the best flavor"},
    {q:"Every now and then, a day at the beach is better than a day at work"},
    {q:"Marvel makes better movies than DC"},
    {q:"Going for a walk after a stressful day helps calm you down"},
    {q:"You enjoy spending time with friends"},
    {q:"Music helps you focus"},
];

const selects = ["1 (Strongly Disagree)","2","3","4","5 (Strongly Agree)"];

const renderSurveyQuestions = () => {
    let counter = 0;
    
    questions.forEach(element => {
        const surveyDiv = $(".survey");
        // Create a new Div
        const questionDiv = $("<div class='question'>");
        const question = element.q;
        counter++;
        
        const questionHtml =    $(`<h3><strong>Question ${counter}</strong></h3>
        <h4>${question}?</h4>`);
        
        const select = $('<select class="custom-select custom-select-lg"></select>');
        const option = $("<option selected hidden>Open this select menu</option>");
        
        questionDiv.append(questionHtml);
        surveyDiv.append(questionDiv);
        
        questionDiv.append(select);
        select.append(option);
        
        let optionCounter = 1;
        selects.forEach(element => {
            const optionMenu = $(`<option value='${optionCounter}'>${element}</option>`);
            select.append(optionMenu);
            optionCounter++;
        });
        
    });
}


// onClick of the Submit Survey Btn...
$("#postFriend").on("click", function(event) {
    event.preventDefault();
    
    const scores = [];
    let isNaN = false;
    
    // Whenever a user selects an option we need to push it into an array...
    $('select.custom-select option:selected').each(function() {
        let value = parseInt($(this).val().trim())
        scores.push(value);
    });

    // if user didn't fill out an answer exit the fnc early...
    for (i=0; i < scores.length; i++) {
        if (scores[i] === false || Number.isNaN(scores[i])) {
            alert("Must fill out all survey questions")
            isNaN = true;
            break
        }
    }

    if (isNaN) {
        return;
    }
    
    // Post new Friend...
    const newFriend = {
        name: $("#survey-name").val().trim(),
        photo: $("#survey-photo").val().trim(),
        scores: scores,
    };

    console.log(newFriend);

    $.post("/api/friends", newFriend).then(function(data) {
        console.log(data);
        alert("Survey successfully added");
    });
    
    // $.post("/api/characters", newCharacter)
    // .then(function(data) {
    //   console.log("add.html", data);
    //   alert("Adding character...");
    // })

    resetSurvey();

});

// Reset Suvey forms after submit btn click...
function resetSurvey () {
    $("#survey-name").val("");
    $("#survey-photo").val("");
    $('select.custom-select').val("Open this select menu");
};

renderSurveyQuestions();