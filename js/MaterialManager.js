let woodMat, LeuchteMat
let videoMats = []
let coatMat;
let daily_alphaSwoosh, coll_alphaSwoosh, hair_alphaSwoosh, omg1_alphaSwoosh, omg2_alphaSwoosh, red_alphaSwoosh

let PartTexts = []
function CreateParticleTextures(){
    var hairParticles = new BABYLON.Texture("./assets/ParticleTextures/hair heart 3.png", scene)
    PartTexts.push(hairParticles)
    var collParticles = new BABYLON.Texture("./assets/ParticleTextures/coll spot.png", scene)
    PartTexts.push(collParticles)
    var omgParticles = new BABYLON.Texture("./assets/ParticleTextures/omg spot 1.png", scene)
    PartTexts.push(omgParticles)
    var dailyParticles = new BABYLON.Texture("./assets/ParticleTextures/daily spot.png", scene)
    PartTexts.push(dailyParticles)
    var flatterParticles = new BABYLON.Texture("./assets/ParticleTextures/flatter blume gruen 3.png", scene)
    PartTexts.push(flatterParticles)
    var redParticles = new BABYLON.Texture("./assets/ParticleTextures/red spot.png", scene)
    PartTexts.push(redParticles)
    var glowParticles = new BABYLON.Texture("./assets/ParticleTextures/glow heart 2.png", scene)
    PartTexts.push(glowParticles)

}

function ChangeMaterialProperties() {

    var white = new BABYLON.Color3.FromHexString("#FFFFFF");
    var black = new BABYLON.Color3.FromHexString("#000000");

    var omgMipMap = new BABYLON.Texture("./assets/HUM_OMG_German_rgb.jpg", scene, false, false)

    hair_alphaSwoosh = CreateVideoTexture("hair_alphaSwoosh",  "assets/videoTextures/hair bw.mp4")
    coll_alphaSwoosh = CreateVideoTexture("coll_alphaSwoosh",  "assets/videoTextures/collagen bw.mp4")
    omg_alphaSwoosh = CreateVideoTexture("omg_alphaSwoosh",  "assets/videoTextures/omg pflanze bw.mp4")
    daily_alphaSwoosh = CreateVideoTexture("daily_alphaSwoosh",  "assets/videoTextures/daily swoosh bw.mp4")
    flatter_alphaAuge = CreateVideoTexture("flatter_alphaAuge",  "assets/videoTextures/auge bw.mp4")
    red_alphaSwoosh = CreateVideoTexture("red_alphaSwoosh",  "assets/videoTextures/red swoosh bw.mp4")
    glow_alphaSuns = CreateVideoTexture("glow_alphaSuns",  "assets/videoTextures/glow bw.mp4")
    glow_colorSuns = CreateVideoTexture("glow_colorSuns",  "assets/videoTextures/glow color.mp4")
    glow_colorSuns.getAlphaFromRGB =false

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" || mat.name == "BackgroundSkyboxMaterial" || mat.name =="BackgroundPlaneMaterial") {
            continue;
        }
        mat.reflectionTexture = hdrTextureCity;
        if(mat.name == "h_swoosh"){
            mat.unlit = true
            mat.opacityTexture = hair_alphaSwoosh
        }
        else if(mat.name == "c_swoosh"){
            mat.unlit = true
            mat.opacityTexture = coll_alphaSwoosh
        }
        else if(mat.name == "o_swoosh"){
            mat.unlit = true
            mat.opacityTexture = omg_alphaSwoosh
        }
        else if(mat.name == "d_swoosh"){
            mat.unlit = true
            mat.opacityTexture = daily_alphaSwoosh
        }
        else if(mat.name == "f_auge"){
            mat.unlit = true
            mat.opacityTexture = flatter_alphaAuge
        }
        else if(mat.name == "r_swoosh"){
            mat.unlit = true
            mat.opacityTexture = red_alphaSwoosh
        }
        else if(mat.name == "g_sun_vid"){
            mat.unlit = true
            mat.opacityTexture = glow_alphaSuns
            mat.albedoTexture = glow_colorSuns
        }
        else if(mat.name == "inside glow"){
            mat.roughness = 0.5
            mat.bumpTexture.level = 0.75
        }
        else if(mat.name == "inside hair"){
            mat.roughness = 0.5
            mat.bumpTexture.level = 0.75
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
        else if(mat.name == "omg Label"){
            mat.albedoTexture = omgMipMap

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

