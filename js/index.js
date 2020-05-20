
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var BGDefault
var currentWorld = "turbine"

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    CreateCustomMaterials()
    LoadAssets(scene, assetsManager)
    camera = new BABYLON.ArcRotateCamera("Camera", 0 * (Math.PI / 180), 90 * (Math.PI / 180), 7, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 4
    camera.upperRadiusLimit = 10
    camera.upperBetaLimit = 90 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    var sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 48, 1.5, scene);
    sphereGlass.position.y = 2
    sphereGlass.visibility = 0;

    var sphereGlassMat = new BABYLON.PBRMaterial("sphereGlassMat", scene);
    sphereGlassMat.reflectionTexture = hdrTextureCity;
    sphereGlassMat.refractionTexture = hdrTextureCity;
    sphereGlassMat.linkRefractionWithTransparency = true;
    sphereGlassMat.indexOfRefraction = 0.52;
    sphereGlassMat.alpha = 0;
    sphereGlassMat.microSurface = 1;
    sphereGlassMat.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    sphereGlassMat.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    sphereGlass.material = sphereGlassMat;


    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    BGDefault = scene.createDefaultEnvironment({
        groundColor: new BABYLON.Color3(1, 1, 1),
        skyboxColor: new BABYLON.Color3(1, 1, 1)

    });
    BGDefault.skybox.setEnabled(false)
    BGDefault.rootMesh.position.y = -0.05


    //var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    //Handle Dragging MOuse

    scene.onPointerMove = function () {
        //updates rotation of hotspots
        if (currentWorld == "plane") {
            for (let hs of HsPLaneList) {
                //A_LooksAt_B(hs, camera)
            }
        }

        else if (currentWorld == "turbine") {

            for (let hs of HsTurbineList) {
                //A_LooksAt_B(hs, camera)
            }
        }

    }

    var showUI = false
    scene.onPointerDown = function () {

        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return (mesh.name.startsWith("PackCollider") && mesh.isPickable); });
        if (pickInfo && pickInfo.pickedMesh && !isAnimating) {

            //alert(pickInfo.pickedMesh.name);
            CurrentSelection = pickInfo.pickedMesh.name.split('PackCollider')[1];

            //avoid same selection
            if (PacksList[CurrentSelection].position.z == 2) {
                return;
            }
            //shoot Particles
            var pos = pickInfo.pickedMesh.getAbsolutePosition()
            pos.y = 1.3
            console.log(pos)
            createWinParticles(CurrentSelection, pos)
            
            window.setTimeout(()=>{
                selectParticles.stop();
            }, 1500)

            //Animate
            ChangeFocusPack(CurrentSelection)
            ShowSelectedAnim(CurrentSelection)
            switch (CurrentSelection) {
                case "0":
                    break;

                case "1":
                    break;

                case "2":
                    break;

                case "3":
                    break;

                case "4":
                    break;

                case "5":
                    break;

                case "6":
                    break;
            }

        }
    }
    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
    /*
    if (UpdateAnimRate) {
        AnimRate += 0.01
        TurnLightsOn(AnimRate)
        console.log(AnimRate)
    }
    */
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



/*
TO DO:
Mute video streaming: cvurrent fake mute
EXplision reveal pack
change urls
*/