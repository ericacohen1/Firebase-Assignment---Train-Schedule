// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1qG82Xf76vlM4Fxy8dYFS2Yd3r9MiPM8",
    authDomain: "coding-bootcamp-erica.firebaseapp.com",
    databaseURL: "https://coding-bootcamp-erica.firebaseio.com",
    projectId: "coding-bootcamp-erica",
    storageBucket: "coding-bootcamp-erica.appspot.com",
    messagingSenderId: "872758653773"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-input").val().trim(), "HH:mm").format("");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // 


    // // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    // console.log(empMonths);

    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>");
});