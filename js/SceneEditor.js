var lightLinks, lightRechts, spotLightL, spotLightR, godrays
function CreateLighting() {
    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-1, -0.25, -1), scene);
    lightLinks.position = new BABYLON.Vector3(0, 2, -1);
    lightLinks.intensity = 2
    //lightLinks.shadowMinZ = -13

    lightRechts = new BABYLON.DirectionalLight("lightRechts", new BABYLON.Vector3(-1, -0.25, 1), scene);
    lightRechts.position = new BABYLON.Vector3(0, 2, 1);
    lightRechts.intensity = 1

}

let LightMesh
function EditMeshes() {
    //scene.getMeshByName("BackgroundPlane").position.y=-1.5
    scene.meshes.forEach(mesh => {
        //console.log(mesh.name)
        if (mesh.name == "BackgroundPlane") {
            mesh.position.y = -1.5
        }
    });
}

function AddShadows() {
    var groundShadow = BABYLON.Mesh.CreatePlane('groundShadow', 95, scene)
    groundShadow.rotation.x = Math.PI / 2
    groundShadow.position.y = 0.01
    groundShadow.material = new BABYLON.ShadowOnlyMaterial('shadowOnly', scene)
    groundShadow.material.alpha = 0.2
    groundShadow.receiveShadows = true

    var generator = new BABYLON.ShadowGenerator(4096 / 8, lightLinks);
    generator.setTransparencyShadow(true);
    generator.filter = 100

    for (var i = 0; i < scene.meshes.length; i++) {
        if (scene.meshes[i].name == "Car03_CollisionMesh") {
            generator.addShadowCaster(scene.meshes[i]);

        }
        else if (scene.meshes[i].name == "walls") {
            scene.meshes[i].receiveShadows = true;
        }

    }

}

function AddGlow() {
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 1.5;
    scene.meshes.forEach(elem => {
        if (elem.name.startsWith("Screen_") || elem.name == "Video_Screens") {
            //gl.addExcludedMesh(elem)
        }
    });

}

var changeEnv = async function (hdr, vis) {
    hdrSkyboxMaterial.dispose(false, true)
    await CreateEnvMaterial(hdr, vis);
    await UpdateEnvReflections(hdr);
    //await ChangeEnvMesh(vis);
}

function CreateEnvMaterial(hdr, vis) {

    hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdr.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = false;
    // Create Skybox
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.visibility = vis
}

function ChangeEnvMesh(vis) {

    if (vis == 0) {
        console.log("setting off")
    }
    else {
        console.log("setting on")
    }


}

var Hs_Plane_P
var HsPLaneList = []
var Hs_Turbine_P
var HsTurbineList = []
function SpawnHotspots() {
    //Plane
    Hs_Plane_P = new BABYLON.TransformNode("Hs_Plane_P", scene)
    var hs0 = new Hotspot("0", new BABYLON.Vector3(-3.5, 1.5, -2.5), HotspotInfoMat, Hs_Plane_P)
    HsPLaneList.push(hs0.Mesh);
    var hs1 = new Hotspot("1", new BABYLON.Vector3(3.5, 1, -2.5), HotspotMat, Hs_Plane_P)
    HsPLaneList.push(hs1.Mesh);
    var hs2 = new Hotspot("2", new BABYLON.Vector3(0.5, 3.2, -7), HotspotInfoMat, Hs_Plane_P)
    HsPLaneList.push(hs2.Mesh);

    //Turbine
    Hs_Turbine_P = new BABYLON.TransformNode("Hs_Turbine_P", scene)
    var hs3 = new Hotspot("3", new BABYLON.Vector3(2, 3.5, 0), HotspotInfoMat, Hs_Turbine_P)
    HsTurbineList.push(hs3.Mesh);
    var hs4 = new Hotspot("4", new BABYLON.Vector3(-5, 4, 0), HotspotMat, Hs_Turbine_P)
    HsTurbineList.push(hs4.Mesh);
    var hs5 = new Hotspot("5", new BABYLON.Vector3(-10, 4.5, 0), HotspotInfoMat, Hs_Turbine_P)
    HsTurbineList.push(hs5.Mesh);

    DisableElems(HsTurbineList)

}

function sayHello() {
    console.log("hello")
}


function ManageWorlds(world) {
    currentWorld = world
    if (world == "plane") {
        //spawn Plane HS
        //Select HDR
        changeEnv(hdrTexture, 1)
        //turn off
        Turbine_P.setEnabled(false)
        BGDefault.skybox.setEnabled(false)

        //turn on
        Plane_P.setEnabled(true)
        Roof_P.setEnabled(true)
        EnableElems(HsPLaneList);
        DisableElems(HsTurbineList)

        //reset camera
        camera.alpha = 0 * (Math.PI / 180)
        camera.beta = 85 * (Math.PI / 180)
        camera.radius = 18

    }
    else if (world == "turbine") {
        //spawn tubine HS
        //Select HDR
        changeEnv(CityEnvTask, 0)

        //turn on
        Turbine_P.setEnabled(true)
        BGDefault.skybox.setEnabled(true)

        //reset camera
        camera.alpha = 200 * (Math.PI / 180)
        camera.beta = 85 * (Math.PI / 180)
        camera.radius = 10

        window.setTimeout(EnableElems, 2000, HsTurbineList)
        DisableElems(HsPLaneList)
    }

}

function TeardownTurbine() {
    TurbineAnim.restart()
}

function DisableElems(list) {
    for (let elem of list) {
        elem.setEnabled(false)
    }
}

function EnableElems(list) {
    for (let elem of list) {
        elem.setEnabled(true)
    }
}