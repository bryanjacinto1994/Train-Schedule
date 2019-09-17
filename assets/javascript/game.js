// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA7juTh--pff_nL0Wg4_i85BOuuvVIRvQE",
    authDomain: "train-schedule-1dc12.firebaseapp.com",
    databaseURL: "https://train-schedule-1dc12.firebaseio.com",
    projectId: "train-schedule-1dc12",
    storageBucket: "",
    messagingSenderId: "257312302570",
    appId: "1:257312302570:web:ee6680341d2f553cb0fe93"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Stored the firebase.database() function in a variable.
var dataRef = firebase.database();


//On click function that will pushed the information onto the firebase.
$("#add-train").on("click", function () {
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim(); 

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
//This pushes the information to the firebase.
    dataRef.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency

    });
   


});


//Creating new variables to make it easier to store data and append it onto the webpage with the use of snapshot via Firebase.
dataRef.ref().on("child_added", function (snapshot) {
    
    var tr = $("<tr>");
    var data = snapshot.val();
    var trainName = data.trainName;
    var trainDestination = data.trainDestination;
    var trainTime = data.trainTime;
    var trainFrequency = data.trainFrequency;
    var timeFreq = timeCompute(trainTime, trainFrequency);
    var minutesNext = timeFreq[0];
    var minutesAway = timeFreq[1];
    

//This appends the variables on to the browser.
    tr.append("<td>" + trainName + "</td>" + "<td>" + trainDestination + "</td>"  + "<td>" + trainFrequency + " minutes</td>" + "<td>" + minutesNext + "</td>");
    $("#tableBody").append(tr);
},
//Create a function the handles firebase errors.
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
//This function calculates the time for the train schedule.
function timeCompute(trainTime, trainFrequency) {
    var tFrequency = trainTime;
    var firstTime = trainFrequency;
    var firstTimeConverted = moment(firstTime, "hh:mm");
    var currentTime = moment();
    var diffTime = currentTime.diff(firstTimeConverted, "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");
    var trainFormat = [nextTrain.format("hh:mm a"), tMinutesTillTrain];
    return trainFormat;
}

//This function will show the current time displayed on the screen without the need to refresh the page.
function time() {
    var presentTime = moment().format("MMMM Do YYYY, hh:mm:ss a");
    $("#presentTime").html(presentTime)
}
setInterval(time, 1000);