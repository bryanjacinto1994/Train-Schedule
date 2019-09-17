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

  var dataRef = firebaseConfig.database();

  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = "";

  $("#add-train").on("click", function(){
      trainName = $("#trainName").val().trim();
      trainDestination = $("#trainDestination").val().trim();
      trainTime = $("#trainTime").val().trim();
      trainFrequency = $("#trainFrequency").val().trim();screen

      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#trainTime").val("");
      $("#trainFrequency").val("");
    
      dataRef.ref().push({
          trainName:  trainName,
          trainDestination: trainDestination,
          trainTime: trainTime,
          trainFrequency:  trainFrequency

      });

  });

function time(){
    var presentTime = moment.format("MMMM Do YYYY, hh:mm:ss a");
    $("#presentTime").html(presentTime)
}
setInterval(time, 1000);

dataRef.ref().on("child_added", function(snapshot){
    var timeFreq = timeCompute(time, freq);
    var momentTime = moment(time, "hh:mm");
    var tr = $("<tr>");
    var td = $("<td>");
    var tdc = $("</td>")

    tr.append(td + snapshot.val().trainName + tdc + td + trainDestination + tdc + td + momentTime.format("hh:mm a") + tdc + td + trainFrequency + " minutes" + tdc + td + timeFreq[0] + tdc + td + timeFreq[1] + " minutes" + tdc)
    $("#table").append(tr);
},

function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

