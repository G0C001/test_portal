var questionPrompt = document.querySelector('.question-prompt');
var slidebar =document.querySelector('.slidebar')

slidebar.addEventListener('click', function() {
    if (questionPrompt.style.display === "grid") {
        questionPrompt.style.display = "none";
    } else {
        questionPrompt.classList.toggle('slide-in');
    }
});

// calculator js

var calculator_show = document.getElementById("calculator")
calculator_show.style.display = "none"

function calculator() {
    
    if (calculator_show.style.display==="none"){
        calculator_show.style.display = "block"

    }
    else{
        calculator_show.style.display = "none"

    }
}

let result = document.getElementById("inputext")


function calculate(number){
    result.value+=number;
}

function Result(){
    
    try{
        if (result.value===""){
            result.value=""
        }else{
        result.value=eval(result.value)
        }
    }
    catch(err){
        alert("enter the valid key")
        clr();
    }
}
function clr() {
    result.value=""
}
function del() {
    result.value=result.value.slice(0,-1)
}


// question prompt buttons

var questionSections = document.querySelectorAll('#question-section');
for (var i = 1; i < questionSections.length; i++) {
    questionSections[i].style.display = "none";
}
var currentSectionIndex = 0;
var question_clear_radio;

var questionButtons = document.querySelectorAll('.question-select-option');
questionButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        for (var i = 0; i < questionSections.length; i++) {
            questionSections[i].style.display = "none";
        }
        questionSections[index].style.display = "block";
        currentSectionIndex = index;
        question_clear_radio = questionSections[index];
    });
});

function BACKWARD() {
    if (currentSectionIndex > 0) {
        questionSections[currentSectionIndex].style.display = "none";
        currentSectionIndex--;
        questionSections[currentSectionIndex].style.display = "block";
    }
}

function FORWARD() {
    if (currentSectionIndex < questionSections.length - 1) {
        questionSections[currentSectionIndex].style.display = "none";
        currentSectionIndex++;
        questionSections[currentSectionIndex].style.display = "block";
    }
}
var autoClickButton = document.querySelectorAll('.question-select-option');
autoClickButton[0].click();

document.getElementById('clearButton').addEventListener('click', function() {
    var radioButtons = question_clear_radio.querySelectorAll('.answer-option-display input[type=radio]');
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


var submitClicked = false;
var RESULT_EXAM = {};

function SUBMIT() {
    if (!submitClicked) {
        var customAlert = document.getElementById("custom-alert");
        var alertMessage = document.getElementById("alert-message");
        customAlert.style.display = "block";
        alertMessage.textContent = "Check carefully before your submission.";
        setTimeout(function() {
            customAlert.style.display = "none";
            submitClicked = true;
        }, 1000);

    } else {
        var answerOptionDisplays = document.querySelectorAll('.answer-option-display');
        answerOptionDisplays.forEach(function(display, index) {
            var radioButtons = display.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(function(radio) {
                if (radio.checked) {
                    var selectedValue = radio.value;
                    RESULT_EXAM[index + 1] = selectedValue;
                }
            });
        });
        console.log(RESULT_EXAM);
        fetch(' ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(RESULT_EXAM),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            RESULT_EXAM = {};
            window.location.href = "score_card";
        })
        .catch(error => {
            console.error('Submission failed:', error);
        });
    }
}

