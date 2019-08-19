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
// $(".submit").on("click", function(event) {
    event.preventDefault();
    
    const scores = [];
    let isNaN = false;
    
    // get form values
    const surveyName = $("#survey-name").val().trim();
    const surveyPhoto = $("#survey-photo").val().trim();
    
    // validate user has completed survey...
    if (surveyName === '' || surveyPhoto === '' ) {
      alert("Please provide name and photo link");
      return;
    }

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
        name: surveyName,
        photo: surveyPhoto,
        scores: scores,
    };

    // DJF - this was throwing an error because I was using a minified version of jQuery...
    //<!-- full jquery -->
    //<script src="https://code.jquery.com/jquery.js"></script>
    // $.post("/api/friends", newFriend, function(data) {
    //   console.log(data);
    // });

    const url = "/api/friends";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newFriend),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {})
      .catch(error => console.error("Error:", error));

    
    let matchedFriend = friendMatch(newFriend);
    if (matchedFriend) {
      $('#exampleModal').modal('toggle')
    } 

    resetSurvey();

});

// Reset Suvey forms after submit btn click...
function resetSurvey () {
    $("#survey-name").val("");
    $("#survey-photo").val("");
    $('select.custom-select').val("Open this select menu");
};

// friendMatch - will loop through the Friends arary and try to find a close match. Array is newest created friend...
function friendMatch(arr) {
  const totalDiffArr = [];
  
  let totalDiff = 0;
  $.get("/api/friends", function(data) {  
    data.forEach(element => {
      dataScore = element.scores;
      console.log(dataScore);
      
      // // DJF - at this point element.scores = friend1.score = [1,2,3,4,5,1,2,3,4,5] we just need to compare to the matched answer in our arr value...
      for (i=0; i < dataScore.length-1; i++) {
        let userRes = arr[i];
        let diff = Math.abs(userRes - dataScore[i]);
        //totalDiff + diff;
      }
      // console.log(totalDiff);
      // totalDiff now represents the match value for a single comparison. We need to stash that and check the others...
      
      // totalDiffArr.push(totalDiff);
    });
  });
  console.log(totalDiff);
  return false;
}

function toggleModal() {
  $('#exampleModal').modal('toggle')
};

// $("#myModalTest").on('click', (e) => {
// });

renderSurveyQuestions();