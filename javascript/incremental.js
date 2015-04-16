var buildings = []; //array of buildings
var upgrades = []; //array of upgrades
var active_button;  //The button showing on the HTML document
var active_tab; //The page showing on the HTML document
var buildingGoldPerSecond = 0; //Gold per second
var date = new Date(); //date object
var gameData = ""; //game save data
var moneyPerClick = 1; //money gained per click on main button

//starts money collecting loop
var timer = window.setInterval(function(){tick();}, 1000);

//adds money upon main button click
function gatherMoney(){
    game.money+=moneyPerClick;
    document.getElementById("money").innerHTML = game.money;
}

//adds building money
function tick(){
  for(var i = 0; i < buildings.length; i++){
    game.money = game.money + (game.buildingAmounts[i] * buildings[i].persec);
  }
  
  document.getElementById("money").innerHTML = game.money;
}

//buys a building, increases money/sec and buildingAmounts[id] amount
function buyBuilding(id){
  if(game.money >= game.buildingCosts[id]){
    game.money-= game.buildingCosts[id];
    game.buildingAmounts[id]++;
    game.buildingCosts[id] = game.buildingCosts[id] + (Math.ceil(game.buildingCosts[id] * buildings[id].costIncrease));
    buildingGoldPerSecond+=buildings[id].persec;
    document.getElementById("buildingCost").innerHTML = game.buildingCosts[id];
    document.getElementById("money").innerHTML = game.money;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[id];
    document.getElementById("MoneyPerSecTotal").innerHTML = buildingGoldPerSecond;
    if(id===9 && game.buildingAmounts[9]===1){
      alert("You have achieved greatness");
    }
  }
}

//buys an upgrade, removes it from view, adds the effect
function buyUpgrade(id){
  if(game.money >= upgrades[id].cost){
    game.money -= upgrades[id].cost;
    upgrades[id].effect();
    document.getElementById("upgradeBox" + id.toString()).className = "na";
    game.upgradesBought[id] = true;
    document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
    configBGPS();
    document.getElementById("MoneyPerSecTotal").innerHTML = buildingGoldPerSecond;
  }
}

//buys an upgrade, with money bypass
function buyUpgradeBypass(id){
  upgrades[id].effect();
  document.getElementById("upgradeBox" + id.toString()).className = "na";
  game.upgradesBought[id] = true;
  document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
  configBGPS();
  document.getElementById("MoneyPerSecTotal").innerHTML = buildingGoldPerSecond;
}

//The main player object
function gameSave(){
  this.money = 0;
  this.buildingAmounts = [];
  this.buildingCosts = [];
  this.upgradesBought = [];
  for(var i = 0;i < buildings.length; i++){
    this.buildingAmounts[i] = 0;
    this.buildingCosts[i] = buildings[i].baseCost;
  }
  for(var q = 0; i < upgrades.length; i++){
    this.upgradesBought[i] = false;
  }
}

//initilizes all things required upon page load
window.onload = function(){
  initBuildings();
  initUpgrades();
  initPlayer();
  active_tab = "mainTab";
};

//the abstract building object
function building(name, cost, persec, costIncrease){
  this.name = name;
  this.baseCost = cost;
  this.persec = persec;
  this.basePerSec = persec;
  this.costIncrease = costIncrease;
}

//the abstract upgrade object
function upgrade(name, cost, effect){
  this.name = name;
  this.cost = cost;
  this.effect = effect;
}

//searches for and returns a building
function searchBuilding(buildingName){
  for(var i = 0; i < buildings.length; i++){
    if(buildingName === buildings[i].name){
      return buildings[i];
    }
  }
}

//loads all the buildings into an array
function initBuildings(){
  active_button = 0;
  
  loadBuilding("Peasant", 10, 1, 0.01);
  loadBuilding("Farmer", 75, 5, 0.04);
  loadBuilding("Farming_family", 200, 10, 0.09);
  loadBuilding("Cow_barn", 500, 25, 0.14);
  loadBuilding("Large_farming_family", 2000, 40, 0.18);
  loadBuilding("Squire", 7000, 100, 0.2);
  loadBuilding("Noble", 15000, 500, 0.24);
  loadBuilding("Knight", 50000, 5000, 0.25);
  loadBuilding("King", 1000000, 25000, 0.25);
  loadBuilding("God", 2500000, 50000, 0.25);
}

//loads all the upgrades into an array
function initUpgrades(){
  loadUpgrade("upgradeBox0", 250, function(){
    moneyPerClick += 1;
  });
  loadUpgrade("upgradeBox1", 1000, function(){
    searchBuilding("Peasant").persec*=2;
  });
}

//creates the individual buildings and loads into array
function loadBuilding(name, cost, persec, costIncrease){
  var cur = buildings.length;
  buildings[cur] = new building(name, cost, persec, costIncrease);
}

//loads all the upgrades into an array
function loadUpgrade(name, cost, effect){
  var cur = upgrades.length;
  upgrades[cur] = new upgrade(name, cost, effect);
}

//cycles through the different buildings on the html screen
function cycle(direction){
  if(direction==="left" && (buildings[active_button - 1] instanceof building)){
    document.getElementById(buildings[active_button].name).className = "na";
    document.getElementById(buildings[active_button - 1].name).className = "";
    active_button--;
    document.getElementById("buildingCost").innerHTML = game.buildingCosts[active_button];
    document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[active_button];
  }else if(direction==="right" && (buildings[active_button + 1] instanceof building)){
    document.getElementById(buildings[active_button].name).className = "na";
    document.getElementById(buildings[active_button + 1].name).className = "";
    active_button++;
    document.getElementById("buildingCost").innerHTML = game.buildingCosts[active_button];
    document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[active_button];
  }
}

//finds the specific cookie
function getCookie(cName){
  var name = cName + "=";
  var cookieArray = document.cookie.split(";");
  for(var i = 0; i < cookieArray.length; i++){
    var cookieAt = cookieArray[i];
    while(cookieAt.charAt(0) === " "){cookieAt = cookieAt.substring(1);}
    if(cookieAt.indexOf(cName)===0) return cookieAt.substring(name.length, cookieAt.length);
  }
  
  return "";
}

//loads or starts new game
function initPlayer(){
  gameData = getCookie("player");
  if(gameData === ""){
    window.game = new gameSave();
  }else{
    window.game = JSON.parse(gameData);
    document.getElementById("buildingCost").innerHTML = game.buildingCosts[0];
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[0];
    for(var i = 0; i < upgrades.length; i++){
      if(game.upgradesBought[i]===true){
        buyUpgradeBypass(i);
      }
    }
    configBGPS();
    document.getElementById("MoneyPerSecTotal").innerHTML = buildingGoldPerSecond;
  }
}

//saves game
function saveGame(){
  document.cookie = "player=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = "player=" + JSON.stringify(game) + ";" + expires;
}

//deletes saved data
function deleteGame(){
  if(confirm("Are you sure you want to delete the save?") === true){
    document.cookie = "player=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    resetToDefaults();
  }
}

//switches the tabs over
function switchTab(tabName){
  document.getElementById(active_tab).className = "na";
  document.getElementById(tabName).className = "page";
  active_tab = tabName;
}

//reconfigures the buildingGoldPerSecond variable
function configBGPS(){
  buildingGoldPerSecond = 0;
  for(var i = 0; i < buildings.length; i++){
    buildingGoldPerSecond+=(buildings[i].persec * game.buildingAmounts[i]);
  }
}

//resets all buttons, pages, numbers, ext. to defaults
function resetToDefaults(){
  window.game = new gameSave();
  buildingGoldPerSecond = 0;
  for(var i = 0; i < buildings.length; i++){
    buildings[i].persec = buildings[i].basePerSec;
  }
  document.getElementById("MoneyPerSecTotal").innerHTML = 0;
  if(active_button === 0){
    cycle("right");
    cycle("left");
  }
  for(i = active_button; i > 0; i--){
    cycle("left");
  }
  for(i = 0; i < upgrades.length; i++){
    document.getElementById("upgradeBox"+i).className = "upgradeBox";
  }
}

