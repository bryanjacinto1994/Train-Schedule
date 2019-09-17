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

  var database = firebaseConfig.database();

  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = "";

