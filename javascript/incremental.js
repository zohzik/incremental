var buildings = []; //array of buildings
var active_button;  //The button showing on the HTML document

//starts money collecting loop
var timer = window.setInterval(function(){tick()}, 1000);

//adds money upon main button click
function gatherMoney(){
    game.money++;
    document.getElementById("money").innerHTML = game.money;
}

//adds building money every second
function tick(){
  for(var i = 0; i < buildings.length; i++){
    game.money = game.money + (game.buildingAmounts[i] * buildings[i].persec);
  }
  
  document.getElementById("money").innerHTML = game.money;
}

//buys a building, increases money/sec and buildingAmounts[id] amount
function buyBuilding(id){
  if(game.money >= buildings[id].cost){
    game.money-=buildings[id].cost;
    game.buildingAmounts[id]++;
    document.getElementById("money").innerHTML = game.money;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[id];
  }
}

//The main player object
function gameSave(){
  this.money = 0;
  this.buildingAmounts = [];
  for(var i = 0;i < buildings.length; i++){
    this.buildingAmounts[i] = 0;
  }
}

//starts the player object and money once page is loaded
window.onload = function(){
  initBuildings();
  window.game = new gameSave();
  active_button=0;
};

//the abstract building object
function building(name, cost, persec){
  this.name = name;
  this.cost = cost;
  this.persec = persec;
}

//loads all the buildings into an array
function initBuildings(){
  loadBuilding("Lemonade Stand", 10, 1);
  loadBuilding("Pizza place", 100, 5);
  loadBuilding("Office", 1000, 25);
}

//creates the individual buildings
function loadBuilding(name, cost, persec){
  var cur = buildings.length;
  buildings[cur] = new building(name, cost, persec);
}

//cycles through the different buildings on the html screen
function cycle(direction){
  if(direction==="left" && (buildings[active_button - 1] instanceof building)){
    document.getElementById(buildings[active_button].name).className = "na";
    document.getElementById(buildings[active_button - 1].name).className = "";
    active_button--;
    document.getElementById("buildingCost").innerHTML = buildings[active_button].cost;
    document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[active_button];
  }else if(direction==="right" && (buildings[active_button + 1] instanceof building)){
    document.getElementById(buildings[active_button].name).className = "na";
    document.getElementById(buildings[active_button + 1].name).className = "";
    active_button++;
    document.getElementById("buildingCost").innerHTML = buildings[active_button].cost;
    document.getElementById("buildingPerSec").innerHTML = buildings[active_button].persec;
    document.getElementById("buildingQty").innerHTML = game.buildingAmounts[active_button];
  }
}