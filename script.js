window.addEventListener("load", function(){
   const launchForm = document.getElementById("launchForm");
   const pilotName = document.getElementsByName("pilotName")[0];
   const copilotName = document.getElementsByName("copilotName")[0];
   const fuelLevel = document.getElementsByName("fuelLevel")[0];
   const cargoMass = document.getElementsByName("cargoMass")[0];
   const pilotStatus = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");
   const faultyItems = document.getElementById("faultyItems");
   const launchStatus = document.getElementById("launchStatus");
   const missionTarget = document.getElementById("missionTarget");

   function inputValidation(id){
      // console.log("getting inputvalidation")
      // console.log(typeof(id.value))
      if (id.value.length <= 0) {
         // console.log("event prevented")
         // event.preventDefault();
         return false;
      }
   }
   function stringValidation(id){
      if (id.type === "text"){
         // console.log(id.value + "is type:" +typeof(id.value))
         stringValue = Number(id.value)
         // console.log(id.value + "is type:" +typeof(id.value))
         if (!isNaN(stringValue)){
            return false
         }
      }
   }
   function numberValidation(id){
      if (id.type === "number"){
         // console.log(id.value + "is type:" +typeof(id.value))
         numberValue = Number(id.value)
         // console.log(id.value + "is type:" +typeof(id.value))
         if (isNaN(numberValue)){
            return false
         }
      
      }
   }
   function inputValidationOnArray(arr){
      for (i=0; i<arr.length;i++){
         if (inputValidation(arr[i]) === false){
            window.alert("All fields are required.");
            return;
         } else if (stringValidation(arr[i]) === false){
            window.alert("Please enter a valid name.");
            return;
         } else if (numberValidation(arr[i]) === false){
            window.alert("Please enter a valid number.");
            return;
         }
      }
   }

   function checkFuelLevel(fuelLevelParam = Number(fuelLevel.value)) {
      // code fuel level check
            //if fuelLevel < 10,000 l, update div visibility, change text of launchStatus to red and display "Shuttle not ready for launch"
      if (fuelLevelParam < 10000){
         console.log("fuelLevel LOW")
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch"
         fuelStatus.innerHTML = "Fuel level too low for launch"
      } else return true
   }

   function checkCargoMass(cargoMassParam = Number(cargoMass.value)) {
      //code cargo mass check
      //if cargoMass > 10,000 kg, update div visibility, change text of launchStatus to red and display "Shuttle not ready for launch"
      if (cargoMassParam > 10000){
         console.log("cargo TOO FULL")
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch"
         cargoStatus.innerHTML = "Cargo mass too high for launch"
      } else return true
   }

   function checkLaunchStatus() {
      //code launch status check
      //if shuttle is ready to launch, change text of launchStatus to green and display "Shuttle is ready for launch"
      if (checkCargoMass() && checkFuelLevel()){
         console.log("LAUNCH READY")
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle is ready for launch";
      }
   }

   function reportMission() {
      //code json fetch here
      fetch("./planets.json").then(function(response) {
         response.json().then(function(json) {
         }  
      }
   }


   launchForm.addEventListener("submit", function(){
      event.preventDefault();
      let formInputArray = [pilotName, copilotName, fuelLevel, cargoMass];
      inputValidationOnArray(formInputArray);
      checkCargoMass();
      checkFuelLevel();
      checkLaunchStatus();
      pilotStatus.innerHTML = `Pilot, ${pilotName.value}, is ready.`
      copilotStatus.innerHTML = `Co-pilot, ${copilotName.value}, is ready.`
      
   });
 });




// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
