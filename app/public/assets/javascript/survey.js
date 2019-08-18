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
    let optionCounter = 1;

    questions.forEach(element => {
        const surveyDiv = $(".survey");
        // Create a new Div
        const questionDiv = $("<div class='question'>");
        const question = element.q;
        counter++;
        
        const questionHtml =    $(`<h3><strong>Question ${counter}</strong></h3>
                                <h4>${question}?</h4>`);
        
        const select = $('<select name="" id="" class="custom-select custom-select-lg"></select>');
        const option = $("<option selected hidden>Open this select menu</option>");
        
        questionDiv.append(questionHtml);
        surveyDiv.append(questionDiv);
        
        questionDiv.append(select);
        select.append(option);

        selects.forEach(element => {
            const optionMenu = $(`<option value='${optionCounter}'>${element}</option>`);
            select.append(optionMenu);
            optionCounter++;
        });
        
    });
}

renderSurveyQuestions();