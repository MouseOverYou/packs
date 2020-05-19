
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

//Change Focus PAck
var ChangePackAnim
var lastPack
function ChangeFocusPack(i){
    if(lastPack == undefined){
        lastPack = PacksList[3]
    }
    var backPos = PacksList[i].position
    ChangePackAnim = gsap.timeline();
    //Bring PAck back
    ChangePackAnim.to(lastPack.position,  {z: backPos.z, ease: "back.inOut(4)", duration: 1.75 });
    ChangePackAnim.to(lastPack.position, {x: backPos.x, ease: "power4.in", duration: 1.75 }, "<");
    ChangePackAnim.to(lastPack.scaling, {x: 1, y:1, z:1, ease: "power4.in", duration: 1.75 }, "<");
    //BRing pack to the front
    ChangePackAnim.to(PacksList[i].position, {z: 2, ease: "back.inOut(4)", duration: 1.75 }, 0);
    ChangePackAnim.to(PacksList[i].position, {x: 0, ease: "power4.in", duration: 1.75 }, "<");
    ChangePackAnim.to(PacksList[i].scaling, {x: 1.5, y:1.5, z:1.5, ease: "power4.in", duration: 1.75 }, "<");

    //save lastPack
    lastPack = PacksList[i]
}

//play animation

var grafikAnim;
function ShowSelectedAnim(i){
    //Turn root_node ON
    for(let k = 0; k<AnimsList.length; k++){
        if(i == k){
            window.setTimeout(()=>{
                AnimsList[k].setEnabled(true)
            },1750)
            
        }
        else{
            AnimsList[k].setEnabled(false)
        }

    }

    grafikAnim = gsap.timeline()
    AnimsList[i].getChildTransformNodes(true).forEach(elem => {
        //play video on texture
        if(elem.name.startsWith("Vid")){
            window.setTimeout(()=>{
                elem.getChildMeshes(true)[0].material.opacityTexture.video.play();
            }, 1750)
        }

        //set initial scaling
        elem.scaling = new BABYLON.Vector3(0,0,0)
        //animate scaling
        window.setTimeout(()=>{
            grafikAnim.to(elem.scaling, {x:1, y: 1, z:1, ease: "back.out(4)", duration: 0.5 }, "<0.2")
        },1750)
        window.setTimeout(()=>{
            grafikAnim.to(elem.scaling, {x:0, y: 0, z:0, ease: "back.out(4)", duration: 0.5 }, "<0.2")
        },5000)
        
    });

    //scale On rest of elements
    //play ANim backwards
    //blend out video

}

