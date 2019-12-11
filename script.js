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

   let validationMethod = {
      checkInput: function(id){
                     if (id.value.length <= 0) {
                        return false;
                     }
                  },
      checkString:   function(id){
                        stringValue = Number(id.value)
                        if (!isNaN(stringValue)){
                           return false
                           }
                        },
      checkNumber:   function(id){
                        numberValue = Number(id.value)
                        if (isNaN(numberValue)){
                           return false
                        }
                     }
   };

   function validateArray(arr, type){
      for (i=0; i<arr.length;i++){
         if (validationMethod.checkInput(arr[i]) === false){
            window.alert("All fields are required.");
            return;
         } else if (validationMethod.checkString(arr[i]) === false && type === "string"){
            window.alert("Please enter a valid name.");
            return;
         } else if (validationMethod.checkNumber(arr[i]) === false && type === "number"){
            window.alert("Please enter a valid number.");
            return;
         }
      }
      return true;
   };

   function reportFuelLevel(fuelLevelParam = Number(fuelLevel.value)) {
      if (fuelLevelParam < 10000){
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         fuelStatus.innerHTML = "Fuel level too low for launch";
      } else return true;
   };

   function reportCargoMass(cargoMassParam = Number(cargoMass.value)) {
      if (cargoMassParam > 10000){
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         cargoStatus.innerHTML = "Cargo mass too high for launch";
      } else return true;
   };

   function reportLaunchStatus() {
      pilotStatus.innerHTML = `Pilot, ${pilotName.value}, is ready.`;
      copilotStatus.innerHTML = `Co-pilot, ${copilotName.value}, is ready.`;
      if (reportCargoMass() && reportFuelLevel()){
         faultyItems.style.visibility = "hidden";
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle is ready for launch";
         return true;
      } else {
         reportFuelLevel();
         reportCargoMass();
      }
   };
   
   function reportMission() {
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            let target = Math.floor(Math.random()*json.length);
            missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[target].name}</li>
                  <li>Diameter: ${json[target].diameter}</li>
                  <li>Star: ${json[target].star}</li>
                  <li>Distance from Earth: ${json[target].distance}</li>
                  <li>Number of Moons: ${json[target].moons}</li>
               </ol>
               <img src="${json[target].image}">
            `;
         })  
      })
   };

   launchForm.addEventListener("submit", function(){
      event.preventDefault();
      let formNumberArray = [fuelLevel, cargoMass];
      let formStringArray = [pilotName, copilotName];
      if (validateArray(formStringArray, "string") && validateArray(formNumberArray, "number")){
         if (reportLaunchStatus()){
            reportMission();
         }
      };
      
      
   });
 });

