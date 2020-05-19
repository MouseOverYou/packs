let woodMat, LeuchteMat
let videoMats = []
let coatMat;
let daily_alphaSwoosh, coll_alphaSwoosh, hair_alphaSwoosh, omg1_alphaSwoosh, omg2_alphaSwoosh, red_alphaSwoosh 
function ChangeMaterialProperties() {

    var white = new BABYLON.Color3.FromHexString("#FFFFFF");
    var black = new BABYLON.Color3.FromHexString("#000000");

    daily_alphaSwoosh = CreateVideoTexture("daily_alphaSwoosh",  "assets/videoTextures/daily swoosh bw.mp4")
    coll_alphaSwoosh = CreateVideoTexture("coll_alphaSwoosh",  "assets/videoTextures/collagen bw.mp4")
    hair_alphaSwoosh = CreateVideoTexture("hair_alphaSwoosh",  "assets/videoTextures/hair bw.mp4")
    omg1_alphaSwoosh = CreateVideoTexture("omg1_alphaSwoosh",  "assets/videoTextures/omg pflanze 1 bw.mp4")
    omg2_alphaSwoosh = CreateVideoTexture("omg2_alphaSwoosh",  "assets/videoTextures/omg pflanze 2 bw.mp4")
    red_alphaSwoosh = CreateVideoTexture("red_alphaSwoosh",  "assets/videoTextures/red swoosh bw.mp4")

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }
        mat.reflectionTexture = hdrTextureCity;
        if(mat.name == "d_swoosh"){
            mat.unlit = true
            mat.opacityTexture =daily_alphaSwoosh
        }
        else if(mat.name == "h_swoosh"){
            mat.unlit = true
            mat.opacityTexture =hair_alphaSwoosh
        }
        else if(mat.name == "r_swoosh"){
            mat.unlit = true
            mat.opacityTexture = red_alphaSwoosh
        }
        else if(mat.name == "o_swoosh1"){
            mat.unlit = true
            mat.opacityTexture = omg1_alphaSwoosh
        }
        else if(mat.name == "o_swoosh2"){
            mat.unlit = true
            mat.opacityTexture = omg2_alphaSwoosh
        }
        else if(mat.name == "c_swoosh"){
            mat.unlit = true
            mat.opacityTexture = coll_alphaSwoosh
        }

        else if(mat.name.startsWith('_',1)){
            mat.unlit = true
        }

        else if (mat.name == "Floor A") {
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
        }
        else if(mat.name == "Floor B"){
            mat.opacityTexture = mat.albedoTexture;
            mat.opacityTexture .getAlphaFromRGB = true
            mat.albedoTexture = ""
            mat.transparencyMode = 2
            mat.albedoColor = black
            mat.unlit = true
            
        }
        else if(mat.name =="Glass"){
            mat.alpha = 0.4
            mat.albedoColor = white 
            mat.roughness = 0;
            mat.metallic = 0.6
        }
        else if(mat.name.startsWith("Glossy") ){
            mat.metallic = 0;
            mat.metallicF0Factor = 0.1
            mat.roughness = 0.1

        }

    }


}

function CreateVideoTexture(name, url){
    var vidText = new BABYLON.VideoTexture(name, url, scene, true, false);
    vidText.vScale = -1
    vidText.video.pause()
    vidText.video.loop = false
    vidText.getAlphaFromRGB =true
    return vidText;
}

function UpdateEnvReflections(hdr){
    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }

        mat.reflectionTexture = hdr;
    }

}
function scaleText(text, uValue, vValue, strength){
    text.uScale = uValue
    text.vScale = vValue
    if(strength == null){
        return
    }
    text.level = strength
}

var colMat, HotspotMat, HotspotInfoMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = true
    colMat.alpha = 0

    /*
    var hsInfoText = new BABYLON.Texture("./assets/hotspot_info.png", scene, true, true)
    var hsText = new BABYLON.Texture("./assets/hotspot.png", scene, true, true)
    HotspotMat = new BABYLON.PBRMaterial("HotspotMat", scene)
    HotspotMat.unlit = true
    HotspotMat.albedoTexture = hsText
    HotspotMat.opacityTexture = hsText

    HotspotInfoMat = new BABYLON.PBRMaterial("HotspotInfoMat", scene)
    HotspotInfoMat.unlit = true
    HotspotInfoMat.albedoTexture = hsInfoText
    HotspotInfoMat.opacityTexture = hsInfoText
    */

    
}

function createVideoMat() {

    var videoMat = new BABYLON.PBRMaterial("videoMat", scene);
    videoMats.push(videoMat)
    var dotsText = new BABYLON.Texture("./assets/videoDots2.jpg", scene, true, false)
    var ambientScreen = new BABYLON.Texture("./assets/screenAmbient.jpg", scene, true, false)
    videoMat.ambientTexture = ambientScreen
    videoMat.bumpTexture = dotsText
    videoMat.bumpTexture.level = 0
    videoMat.bumpTexture.uScale = 1
    videoMat.bumpTexture.vScale = 1
    videoMat.emissiveColor = new BABYLON.Color3.FromHexString("#313131")
    videoMat.metallic = 0
    videoMat.roughness = 0

    return videoMat;
}

