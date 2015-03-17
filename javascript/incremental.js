//starts money collecting loop
var timer = window.setInterval(function(){tick()}, 1000);

//adds money upon main button click
function gatherMoney(){
    game.money++;
    document.getElementById("money").innerHTML = game.money;
}

//adds building money every second
function tick(){
  game.money = game.money + (building1.qty * building1.persec);
  document.getElementById("money").innerHTML = game.money;
}

//buys a lemondade stand, increases money/sec and building1.qty
function buyLemonadeStand(){
  if(game.money >= building1.cost){
    game.money-=building1.cost;
    building1.qty++;
    document.getElementById("money").innerHTML = game.money;
    document.getElementById("building1Qty").innerHTML = building1.qty;
  }
}

//The main player object, The "money"
function gameSave(){
  this.money = 0;
}

//starts the player object and money once page is loaded
window.onload = function(){
  window.game = new gameSave();
};

//the abstract building object
function building(name, cost, persec){
  this.name = name;
  this.cost = cost;
  this.persec = persec;
  this.qty = 0;
}


window.building1 = new building("lemonade Stand", 10, 1); //lemonade stand