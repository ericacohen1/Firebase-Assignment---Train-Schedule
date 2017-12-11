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

   
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    // difference bw time in minutes
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    // remaing time after using modulus for time difference and frequency
    var Remainder = diffTime % frequency;
    // frequency - remainder to figure out how far away the next train is 
    var minutesAway = frequency - Remainder;
    // using moment to see when the next train will be here
    // minutes away is added to the current time to calculate this 
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");


    // Add each train's data into the table
    $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

