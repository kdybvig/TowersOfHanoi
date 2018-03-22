let stoneUp = false;
let heighta = 5; // height of tower a
let heightb = 0;
let heightc = 0;
let stacka = 11111; //tracks which stones are in tower A
let stackb = 0;
let stackc = 0;
let active;  // the number of the active stone
let activeID; // the html id of the stone
let active10; 
let heightx;
let stackx;
let numStones = 5;
let liftHeight = "50%";
let lastTower;
let minMoves = 31;
let yourMoves = 0;
let startTime = Math.floor(Date.now()/1000);
let recordTime;
let recordMoves;


function checkTime () {
  var currentTime = Math.floor(Date.now()/1000);
  var diff = currentTime - startTime;
  var m = Math.floor(diff/60);
  var s = diff%60;
  if (s < 10) {
    s = "0" + s;
  }
  if (m < 10) {
    m = "0" + m;
  }
  document.getElementById("minutes").innerHTML = m;
  document.getElementById("seconds").innerHTML = s;
}
setInterval(function(){ checkTime() }, 1000);

function stoneChanger () {
  recordTime = 0;
  recordMoves = 0;
  document.getElementById("newTime").innerHTML = "00:00"
  document.getElementById("newMoves").innerHTML = "0"
  numStones = parseInt(document.getElementById("numStones").value);
  minMoves = Math.pow(2, numStones) - 1;
  document.getElementById("minMoves").innerHTML = minMoves;
  restartGame();
  heighta = numStones;
  liftHeight = numStones*10 + "%"
  let newWidth = 1000;
  let widthChange = Math.floor(750/(numStones));
  let newMargin = -450;
  for (i = 1; i <= numStones; i++) {
    newWidth -= widthChange;
    newMargin += widthChange/2;
    $("#stone-"+i).css("width", newWidth+"%");
    $("#stone-"+i).css("margin-left", newMargin+"%");
  }
  for (i = numStones; i < 8; i++) {
    $("#stone-"+(i+1)).css("display", "none");
  } 
}

function restartGame () {
    startTime = Math.floor(Date.now()/1000);
function checkTime () {
  var currentTime = Math.floor(Date.now()/1000);
  var diff = currentTime - startTime;
  var m = Math.floor(diff/60);
  var s = diff%60;
  if (s < 10) {
    s = "0" + s;
  }
  if (m < 10) {
    m = "0" + m;
  }
  document.getElementById("minutes").innerHTML = m;
  document.getElementById("seconds").innerHTML = s;
}
setInterval(function(){ checkTime() }, 1000);
          document.getElementById("error-message").innerHTML = ""
          yourMoves = 0;
          document.getElementById("yourMoves").innerHTML = yourMoves;
          stacka = 11111;
          heighta = numStones;
          stackb = 0;
          heightb = 0;
          stackc = 0;
          heightc = 0;
          stoneUp = false;
        $("#end-game").css("display","none");
        $(".screen").css("display","block");
        for (i=0; i < numStones; i++) {
          $("#stone-" + (i+1)).appendTo("#tower-a");
          $("#stone-" + (i+1)).css("bottom", i*10 + "%");
        }
        for (i = 5; i < numStones; i++) {
          stacka += Math.pow(10, i)
          $("#stone-"+(i+1)).css("display", "block");
        }
}
// liftStone turns towers white and raises stone
function liftStone (stoneID) {
  if (stoneUp == false) {
  stoneUp = true;
      $(stoneID).css("bottom", liftHeight); 
}
}

//moveStone moves a stone and adjusts heights
function moveStone (towerID, stoneID, height) {
  if (stoneUp == true) {
        stoneUp = false; $(stoneID).appendTo(towerID);
 $(stoneID).css("bottom",`${height*10}%`);
    if (lastTower != towerID) {
      yourMoves ++;
      document.getElementById("yourMoves").innerHTML = yourMoves;
    }
        }
}

// clickTower either moves the top stone of a tower up or moves the stone currently up to the top of a tower, if it is smaller than the top stone of that tower
function clickTower (towerID) {
  document.getElementById("error-message").innerHTML = ""
   if (!stoneUp && stackx) {
       lastTower = towerID;
       active = stackx.toString().length;
       active10 = 0.1*Math.pow(10, active);
       liftStone ("#stone-"+active);
       heightx --;
       stackx = stackx - active10;
     } 
      else if (stoneUp) {
        if (active10 > stackx) {moveStone (towerID, "#stone-"+active , heightx)
        heightx ++;
        stackx = stackx + active10;
                        } else {
                          document.getElementById("error-message").innerHTML = "A stone cannot be placed on top of a smaller stone."
                        }
}
}
$( document ).ready(function() {
document.getElementById("minMoves").innerHTML = minMoves;
document.getElementById("yourMoves").innerHTML = yourMoves;
//  tower a
$("#tower-a").click(function(){
   stackx = stacka
  heightx = heighta
  clickTower("#tower-a")
  stacka = stackx
  heighta = heightx
})

 // tower b
$("#tower-b").click(function(){
  stackx = stackb
  heightx = heightb
  clickTower("#tower-b")
  stackb = stackx
  heightb = heightx
})
// tower c
$("#tower-c").click(function(){
    stackx = stackc
    heightx = heightc
    clickTower("#tower-c")
    stackc = stackx
    heightc = heightx               
        if (heightc == numStones) {
        $("#endscreen").css("display","block")
        $("body").css("background-color", "lightgreen")
        $(".screen").css("display","none")
        var newTime = Math.floor(Date.now()/1000) - startTime;
        var newMoves = yourMoves;
        $("#replay").click(function(){
          restartGame();
          $("#endscreen").css("display","none")
          $("body").css("background-color","#846")
          if (newTime < recordTime || !recordTime) {
            recordTime = newTime;
            newM = Math.floor(newTime/60);
            newS = newTime%60;
            if (newM < 10) {
              newM = "0" + newM;
            }
            if (newS < 10) {
              newS = "0" + newS;
            }
            document.getElementById("newTime").innerHTML = newM + ":" + newS;
          }
          console.log(newMoves);
          if (newMoves < recordMoves || !recordMoves) {
            recordMoves = newMoves;
            document.getElementById("newMoves").innerHTML = newMoves;
          }
        })
                             }
}) 
})
