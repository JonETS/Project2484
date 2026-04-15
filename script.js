$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    // checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.create-button').click(clickedAddButton);
  })
  
  //Made a pet constructor to create multiple pets
  class Pet{
    constructor(name, id){
        this.name = name;
        this.id = id; //used to find pet's elements in html
        this.weight = 20;
        this.happiness = 20;
        this.battles = 0;
        this.status = "healthy";
        this.statval = 10;
    }
    addWeight(value){
      this.weight = this.weight + value;
      console.log("Updated "+this.name+"'s weight: "+this.weight);//debug
    }
    subWeight(value){
      this.weight = this.weight - value;
      if(this.weight < 0){//weight min at 0
        this.weight = 0;
      }
      console.log("Updated "+this.name+"'s weight: "+this.weight);//debug
      if(this.weight == 0){
        deadPet(this, "weight");
      }
    }
    addHappiness(value){
      this.happiness = this.happiness + value;
      if(this.happiness > 100){//happiness maxed out at 100
        this.happiness = 100;
      }
      console.log("Updated "+this.name+"'s happiness: "+this.happiness);//debug
    }
    subHappiness(value){
      this.happiness = this.happiness - value;
      if(this.happiness < 0){//happiness min at 0
        this.happiness = 0;
      }
      console.log("Updated "+this.name+"'s happiness: "+this.happiness);//debug
      if(this.happiness == 0){
        deadPet(this, "happiness");
      }
    }
    addBattle(){
      this.battles = this.battles + 1;
      console.log("Updated "+this.name+"'s battles: "+this.battles);//debug
    }
    addStatval(value){
      this.statval = this.statval + value;
      if(this.statval > 10){//staval maxed out at 10
        this.statval = 10;
      }
      console.log("Updated "+this.name+"'s statval: "+this.statval);//debug
      this.updateStatus();//update status
    }
    subStatval(value){
      this.statval = this.statval - value;
      if(this.statval < 0){//staval min at 0
        this.statval = 0;
      }
      console.log("Updated "+this.name+"'s statval: "+this.statval);//debug
      this.updateStatus();//update status
    }
    updateStatus(){
      if(this.statval >= 7){//7-10, healthy
        this.status = "healthly";
      }
      else if(this.statval <= 6 && this.statval >= 4){//4-6, weary
        this.status = "weary";
      }
      else if(this.statval <=3 && this.statval >= 1){//1-3, sick
        this.status = "sick";
      }
      else{//0, dead
        this.status = "dead";
        deadPet(this, "status");
      }
      console.log("Updated "+this.name+"'s status: "+this.status);//debug
      updateVisual(this);
    }
  }

    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    //GLOBAL VARIABLE
    var counter = 0; //used to create ids for elements

    //---------------MY FUNCTIONS----------------------
    function clickedBattleButton(pet){
      console.log("BattleButton Clicked");
      pet.subHappiness(3);
      pet.subWeight(1);
      pet.addBattle(1);
      pet.subStatval(1);
      updatePetInfoInHtml(pet);
      checkValuesBeforeUpdatingMessage(pet, "battle");
    }
    function clickedRestButton(pet){
      console.log("RestButton Clicked");
      pet.subHappiness(1);
      pet.addStatval(1);
      updatePetInfoInHtml(pet);
      checkValuesBeforeUpdatingMessage(pet, "rest");
    }
    function deadPet(pet, cause){
      //disable buttons
      console.log("Pet is dead by+"+cause+", disabling buttons");
      var pet_id = pet.id;
      var treatID = "treat"+pet_id;
      var playID = "play"+pet_id;
      var exerciseID = "exercise"+pet_id;
      var battleID = "battle"+pet_id;
      var restID = "rest"+pet_id;
      document.getElementById(treatID).disabled = true;
      document.getElementById(playID).disabled = true;   
      document.getElementById(exerciseID).disabled = true;
      document.getElementById(battleID).disabled = true;
      document.getElementById(restID).disabled = true;

      //update message
      checkValuesBeforeUpdatingMessage(pet, cause);
    }
    
    function clickedDeleteButton(pet){
      console.log("DeleteButton Clicked");
      var pet_id = pet.id;
      var articleID = "article"+pet_id;
      var article = document.getElementById(articleID);
      $(article).stop(true,true).fadeOut(2000, function(){
        article.remove();//removes after animation is finished
      }); //fadeout method
    }
    function clickedAddButton(){
      console.log("ADD Button Clicked");//debug
      var input = document.getElementById("text-input"); //text field
        console.log("Name given:"+input.value);
        addPet(input.value);//no need to check for empty, because instances are handled using an id not connected to the name
    }
    function addPet(newName){//fade in
      //create pet
      counter = counter + 1; //increment counter for new ID
      var newpet = new Pet(newName, counter); // new pet

      //create id's for pet's elements
      var treatID = "treat"+counter;
      var playID = "play"+counter;
      var exerciseID = "exercise"+counter;
      var battleID = "battle"+counter;
      var restID = "rest"+counter;
      var nameSpanID = "name"+counter;
      var weightSpanID = "weight"+counter;
      var happinessSpanID = "happiness"+counter;
      var battlesSpanID = "battles"+counter;
      var statusSpanID = "status"+counter;
      var imageID = "image"+counter;
      var messageID = "message"+counter;
      var articleID = "article"+counter;

      //create buttons (treat, play, exercise, battle, rest)
      const treat = document.createElement('button');
      treat.id = treatID;
      treat.textContent = "TREAT";
      treat.addEventListener("click", () => clickedTreatButton(newpet)); //wrap function w/ argumentsas to not call immediately

      const play = document.createElement('button');
      play.id = playID;
      play.textContent = "PLAY";
      play.addEventListener("click", () => clickedPlayButton(newpet));

      const exercise = document.createElement('button');
      exercise.id = exerciseID;
      exercise.textContent = "EXERCISE";
      exercise.addEventListener("click", () => clickedExerciseButton(newpet));

      const battle = document.createElement('button');
      battle.id = battleID;
      battle.textContent = "BATTLE";
      battle.addEventListener("click", () => clickedBattleButton(newpet));

      const rest = document.createElement('button');
      rest.id = restID;
      rest.textContent = "REST";
      rest.addEventListener("click", () => clickedRestButton(newpet));

      //add into a div
      const buttons = document.createElement('div');
      buttons.classList = "button-container";//css class
      buttons.append(treat, play, exercise, battle, rest);//insertion

      //create dashboard divs and child elements for (name, weight, happiness, battles, status)
      const nameSpan = document.createElement('span');//where name will be placed
      nameSpan.id = nameSpanID; //id to link to this element
      nameSpan.textContent = newpet.name; //display the name
      const name = document.createElement('div');
      const nameStrong = document.createElement('strong');
      nameStrong.append(nameSpan);//add span inside strong
      name.append("Name: ", nameStrong);//add text and strong inside div

      console.log(nameSpan.id+"/"+nameSpan.textContent);//debug

      const weightSpan = document.createElement('span');//where weight will be placed
      weightSpan.id = weightSpanID;
      weightSpan.textContent = newpet.weight; //display the weight
      const weight = document.createElement('div');
      const weightStrong = document.createElement('strong');
      weightStrong.append(weightSpan, " pounds"); //add span and text into strong
      weight.append("Weight: ", weightStrong);//add text and strong inside div

      const happinessSpan = document.createElement('span');//where happiness will be placed
      happinessSpan.id = happinessSpanID;
      happinessSpan.textContent = newpet.happiness; //display the happiness
      const happiness = document.createElement('div');
      const happinessStrong = document.createElement('strong');
      happinessStrong.append(happinessSpan, " tail wags (per min)");//add span and text into strong
      happiness.append("Happiness: ", happinessStrong);//add text and strong into div

      const battlesSpan = document.createElement('span');//where battles will be placed
      battlesSpan.id = battlesSpanID;
      battlesSpan.textContent = newpet.battles; //display the battles
      const battles = document.createElement('div');
      const battlesStrong = document.createElement('strong');
      battlesStrong.append(battlesSpan, " fought");//add span and text into strong
      battles.append("Battles: ",battlesStrong);//add text and strong into div

      const statusSpan = document.createElement('span');//where status will be placed
      statusSpan.id = statusSpanID;
      statusSpan.textContent = newpet.status; //display the status
      const status = document.createElement('div');
      const statusStrong = document.createElement('strong');
      statusStrong.append(statusSpan);//add span into strong
      status.append("Status: ", statusStrong);//add text and strong into div

      //create dashboard message
      const message = document.createElement('strong');
      message.id = messageID;
      message.classList = "message";

      //create dashboard section
      const dashboard = document.createElement('section');
      dashboard.classList = "dashboard";//css class

      //add buttons div into dashboard
      dashboard.append(name, weight, happiness, battles, status, buttons, message); //insert dashboard divs and buttons into dashboard

      //create visual section
      const visual = document.createElement('section');
      visual.classList = "pet-image-container";//css class
      const image = document.createElement('img');
      image.id = imageID;
      image.classList = "pet-image";
      image.src = randomImage();
      visual.append(image);
      
      //create options section
      const options = document.createElement('section');
      options.classList = "options";
      const delbtn = document.createElement('button');
      delbtn.textContent = "DELETE";
      delbtn.addEventListener("click", () => clickedDeleteButton(newpet));
      options.append(delbtn);//add button to section

      //add sections into a article
      const article = document.createElement('article');
      article.id = articleID;
      article.append(visual, dashboard, options); //insert sections
      
      //add to main
      const main = document.querySelector('main'); //get main element in index.html
      main.append(article); //add article as child of main
      $(article).hide().stop(true,true).fadeIn(2000);//hide() makes the element not visible, lets the fadeIn happen

    }
    function randomImage(){
      var img;
      if(counter % 5 == 0){
        img = 'images/notourpyro.webp';
      }
      else{
        img= 'images/pyro.png';
      }
      return img;
    }
    //----------------------------------------------------

    function clickedTreatButton(pet) {
      console.log("TreatButton Clicked");//debug
      pet.addHappiness(1); //increase happiness
      pet.addWeight(1); //increase weight
      updatePetInfoInHtml(pet);
      checkValuesBeforeUpdatingMessage(pet, "treat");
    }
    
    function clickedPlayButton(pet) {
      console.log("PlayButton Clicked");//debug
      // pet_info.happiness = pet_info.happiness + 1;// Increase pet happiness
      // pet_info.weight = pet_info.weight - 1;// Decrease pet weight
      pet.addHappiness(1);
      pet.subWeight(1);
      updatePetInfoInHtml(pet);
      checkValuesBeforeUpdatingMessage(pet, "play");
    }
    
    function clickedExerciseButton(pet) {
      console.log("ExerciseButton Clicked");//debug
      // pet_info.happiness = pet_info.happiness - 1;// Decrease pet happiness
      // pet_info.weight = pet_info.weight - 1;// Decrease pet weight
      pet.subHappiness(1);
      pet.subWeight(1);
      updatePetInfoInHtml(pet);
      checkValuesBeforeUpdatingMessage(pet, "exercise")
    }
    
    function checkValuesBeforeUpdatingMessage(pet, action) {
      if(pet.happiness == 0){
          updateMessage(pet, "happiness");
      }
      else if(pet.weight == 0){
        updateMessage(pet, "weight");
      }
      else if (pet.statval == 0){
        updateMessage(pet, "status");
      }
      else{
        updateMessage(pet, action)
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml(pet) {
      // $('.name').text(pet_info['name']);
      // $('.weight').text(pet_info['weight']);
      // $('.happiness').text(pet_info['happiness']);
      // $('.battle').text(pet_info['battles']);
      // $('.status').text(pet_info['status']);

      var pet_id = pet.id;

      //update name
      var nameID = "name"+pet_id;
      console.log(nameID);//debug
      document.getElementById(nameID).textContent = pet.name;

      //update weight
      var weightID = "weight"+pet_id;
      console.log(weightID);//debug
      document.getElementById(weightID).textContent = pet.weight;

      //update happiness
      var happinessID = "happiness"+pet_id;
      console.log(happinessID);//debug
      document.getElementById(happinessID).textContent = pet.happiness;

      //update battles
      var battlesID = "battles"+pet_id;
      console.log(battlesID);//debug
      document.getElementById(battlesID).textContent = pet.battles;

      //update status
      var statusID = "status"+pet_id;
      console.log(statusID);//debug
      document.getElementById(statusID).textContent = pet.status;

    }

    function updateMessage(pet, action){
      var pet_id = pet.id;
      var messageID = "message"+pet_id;
      var message = document.getElementById(messageID);
      if(action == "treat"){
        message.textContent = "You fed "+pet.name+" a treat!";
      }
      else if(action == "play"){
        message.textContent = "You played with "+pet.name+"!";
      }
      else if(action == "exercise"){
        message.textContent = pet.name+" exercised!";
      }
      else if(action == "battle"){
        message.textContent = pet.name+" battled!";
      }
      else if(action == "rest"){
        message.textContent = pet.name+" took a rest!";
      }
      else if (action == "weight"){
        message.textContent = pet.name+" died from malnutrition";
      }
      else if (action == "happiness"){
        message.textContent = pet.name+" died from unhappiness";
      }
      else if (action == "status"){
        message.textContent = pet.name+" died from exhaustion";
      }
      $(message).stop(true,true).fadeIn(400); //fadeIn method, stop(true,true) clears queued animations and immediately runs this animation
      $(message).fadeOut(2000); //fadeOut method
    }

    function updateVisual(pet){
      var pet_id = pet.id;
      var imageID = "image"+pet_id;
      var image = document.getElementById(imageID);
      if(pet.statval >= 7){//healthy
        $(image).hide().stop(true,true).fadeIn(400, function(){
          image.style.filter = "grayscale(0%) brightness(1)";

        });
      }
      else if(pet.statval >= 4 && pet.statval <= 6){//weary
        $(image).hide().stop(true,true).fadeIn(400, function(){
          image.style.filter = "grayscale(50%) brightness(0.5)";
        });
      }
      else if(pet.statval >= 1 && pet.statval <=3){//sick
        $(image).hide().stop(true,true).fadeIn(400, function(){
          image.style.filter = "grayscale(100%) brightness(0.25)";
        });
      }
      else{//dead
        $(image).hide().stop(true,true).fadeIn(400, function(){
          image.style.filter = "grayscale(100%) brightness(0)";
        });
      }
    }
  