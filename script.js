var PlayerRegistrationData = [];
var correct_response = 0;
var incorrect_response = 0;
var totalQuestions = 0;

function calculateAge() {
    var dobInput = document.getElementById('DOB').value;
    var dob = new Date(dobInput);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    // Validate age to be between 8 and 12
    if (age < 8 || age > 12) {
        alert('You need to be between 8 and 12 years old to participate.');
        document.getElementById('age').value = '';
        
    } else {
        // Display the calculated age in the 'age' input field
        document.getElementById('age').value = age;
    }
}


function Register() {
    var Firstname = document.getElementById('Fname').value;
    var Lastname = document.getElementById('Lname').value;
    var Gmail = document.getElementById('mail').value;
    var dob = document.getElementById('DOB').value;
    var gender = document.getElementById('Gender').value;
    var AGE = parseInt(document.getElementById('age').value, 10);
    var Education = document.getElementById('edu').value;

    totalQuestions = 0;

    if (Firstname.trim() === '') {
        alert('Please enter your First name.');
        return;
    }

    if (Lastname.trim() === '') {
        alert('Please enter your Last name.');
        return;
    }

    if (Gmail.trim() === '') {
        alert('Please enter your Email.');
        return;
    }

    if (dob.trim() === '') {
        alert('Please enter your date of birth.');
        return;
    }

    if (Education.trim() === '') {
        alert('Please enter your Education.');
        return;
    }

    var player = {
        Firstname: Firstname,
        Lastname: Lastname,
        Gmail: Gmail,
        dob: dob,
        gender: gender,
        AGE: AGE,
        Education: Education,
    };

    PlayerRegistrationData.push(player);

    // Disable specific form elements after registration
    var formElementsToDisable = document.querySelectorAll("#registrationForm input:not(#answer):not([type='button']), #registrationForm textarea, #registrationForm select");
    formElementsToDisable.forEach(function (element) {
        element.disabled = true;
    });

    var buttonElement = document.querySelector("#registrationForm .cool-button");
    buttonElement.disabled = true;

    var playGameBtnElement = document.getElementById("playbtn");
    playGameBtnElement.disabled = false;

}


function PlayGame() {
    document.getElementById('answer').disabled = false;
    const int1 = Math.floor(Math.random() * 9) + 1;
    const int2 = Math.floor(Math.random() * 5) + 1;
    const correct_answer = int1 * int2;

    totalQuestions++;

    document.getElementById('equation').innerText = int1 + " * " + int2 + " = ?";
    document.getElementById('answer').value = '';

    document.getElementById('table').style.display = 'table';
    document.getElementById('playarea').style.display = 'block';

    document.getElementById('acceptButton').disabled = false;
    document.getElementById('nextButton').disabled = false;

    return correct_answer;
}

function CheckAnswer() {
    const user_input = document.getElementById('answer').value;

    if (isNaN(user_input)) {
        alert("Please enter a valid number.");
        return;
    }

    const correct_answer = PlayGame();

    if (user_input == correct_answer) {
        correct_response++;
        alert("Correct!!!");
    } else {
        incorrect_response++;
        alert("Incorrect :(");
    }

    var answers = {
        correct_response: correct_response,
        incorrect_response: incorrect_response
    };

    PlayerRegistrationData.push(answers);

    showAllStats();
}

function findPercentageScore() {
    // Clear the 'showpercentage' statistic display area
    document.getElementById('showpercentage').value = '';

    // Get the first player's data (if available)
    var firstPlayer = PlayerRegistrationData[0] || {};
    var firstName = firstPlayer.Firstname || '';
    var lastName = firstPlayer.Lastname || '';

    // Combine first name and last name if available
    var playerName = firstName + lastName;


    // Get number of correct answers
    var correctAnswers = correct_response;

    // Calculate percentage score
    var percentageScore;

    if (totalQuestions === 0) {
        percentageScore = 0;
    } else {
        percentageScore = (correctAnswers / totalQuestions) * 100;
    }
    

    // Get the current date
    var currentDate = new Date().toLocaleDateString();

    // Display the statistics in the 'showpercentage' textarea
    var statisticsMessage = "Player's Name: " + playerName + "\n" +
        "Total Number of Questions: " + totalQuestions + "\n" +
        "Number of Correct Answers: " + correctAnswers + "\n" +
        "Percentage Score: " + percentageScore.toFixed(2) + "%\n" +
        "Current Date: " + currentDate;

    document.getElementById('showpercentage').value = statisticsMessage;

    // Reset the form and re-enable input fields
    var formElements = document.querySelectorAll("input, textarea, select");
    formElements.forEach(function (element) {
        element.disabled = false;
        element.value = '';
    });

    // Enable the register button
    document.querySelector(".cool-button").disabled = false;
}


function showAllStats() {
    // Clear the display area
    document.getElementById('showallplayers').value = '';

    // Iterate through each player's data in the PlayerRegistrationData array
    PlayerRegistrationData.forEach(function (player, index) {
        var playerName = player.Firstname + ' ' + player.Lastname;
        var age = player.AGE;

        var questionsAndAnswers = '';
        var playerStats = PlayerRegistrationData[index + 1]; // Player's stats are stored in the next entry

        // Calculate percentage score
        var totalQuestions = playerStats ? playerStats.correct_response + playerStats.incorrect_response : 0;
        var percentageScore = totalQuestions === 0 ? 0 : (playerStats.correct_response / totalQuestions) * 100;

        // Display the data in the showallplayers display area
        var playerDataString = playerName + ', ' + age + ', ' + ', Percentage Score: ' + percentageScore.toFixed(2) + '%\n';

        document.getElementById('showallplayers').value += playerDataString;
    });
}

