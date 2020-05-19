
var RevealAnim = gsap.timeline({ paused: true });

var startPos = []
var SmallBottle = new BABYLON.Vector3(0.1, 0.1, 0.1);
var BigBottle = new BABYLON.Vector3(0.15, 0.15, 0.15);

function BringPacksBehind() {

    var c = 0

    for (let bottle of PacksList) {

        //save Start Position
        startPos.push(bottle.position)

        //bring bottles behind daily
        if (c == 3) {
            //console.log("");
        }
        else{
            bottle.position = new BABYLON.Vector3(0, 0, 0.02);
            bottle.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
            if (c == 0 || c == 1 || c == 2)
                bottle.rotation.y = 180 * (Math.PI / 180)
                
            else
                bottle.rotation.y = -180 * (Math.PI / 180)
        }
        c++
    }

}


function BufferStartAnim(){
    for(let i=0; i < PacksList.length; i++){
        if(i==3){
            //Do Nothing
        }
        else if(i == 0 || i == 6){
            AddOneReveal(i, "0")
        }
        else if(i == 1 || i == 5){
            AddOneReveal(i, "0.4")
        }
        else if(i == 2 || i == 4){
            AddOneReveal(i, "0.8")
        }
    }
}

function AddOneReveal(i, delay){
    RevealAnim.to(PacksList[i].position, { x: startPos[i].x, y: startPos[i].y, z: startPos[i].z, ease: "power2.out", duration: 2 }, delay);
    RevealAnim.to(PacksList[i].rotation, { y: 0 , ease: "power4.out", duration: 1.9 }, "<0.1");
    RevealAnim.to(PacksList[i].scaling, { x: 1, y: 1, z: 1, ease: "power4.out", duration: 1.9 }, "<"); 
}

function RevealRange(){
    window.setTimeout(()=>{
        RevealAnim.restart()
    }, 1000)
}

var AnimateReveal = async function () {
    BringPacksBehind()
    await BufferStartAnim();
    await RevealRange();
}
function ResetRangePos() {
    var c = 0
    for (let elem of PacksList) {
        elem.position.x = startPos[c]
        c++
    }

}

