
let LightSwitch = true
let EnvSwitch = false
let showCommands = false
$(document).keyup(function (e) {


  if (e.keyCode === 49) {
    console.log("p Keyboard")
    //changeEnv(hdrTexture, 1)

  }

  else if (e.keyCode === 50) {
    console.log("p Keyboard")
    //changeEnv(hdrTextureCity, 1)

  }

  else if (e.keyCode === 51) {
    console.log("p Keyboard")
    //changeEnv(hdrTextureStudio, 0)

  }

  if(e.keyCode === 74){
    showCommands =! showCommands
    if(showCommands){
      $('#debugLabel').css('z-index', 0)
    }
    else{
      $('#debugLabel').css('z-index', -1)
    }


  }
  if(e.keyCode === 72){
    var state = document.getElementById("streamingDiv").style.zIndex
    if(state == "0"){
      document.getElementById("streamingDiv").style.zIndex ="-1"
    }
    else{
      document.getElementById("streamingDiv").style.zIndex = "0"
    }
  }

});

//UI controllers
//Back button
function show_backbutton() {
  $('.back-zoom').addClass('open');
}

$('.back-zoom').on('click', function (e) {
  e.preventDefault();
  hide_backbutton();
  TravelRotateCamBack();
  RevealInfopoints(false);
});

function hide_backbutton() {
  $('.back-zoom').removeClass('open');
};


//Infobox button
//callinfobox button
let showInfo = false;
$(document).keyup(function (e) {
  //if keypress "i"

  if (e.keyCode === 73) {
    RevealAnim.restart()
  }
  if (e.keyCode === 79) {
    //MuteVideoStreaming();
  }
});

function show_Info_Overlay() {
  $('.info-overlay').addClass('open')
  $('.info-overlay').removeClass('close')
  $('.infobox').addClass('open')
  $('.infobox').removeClass('close')
  $('.videobox').addClass('open')
  $('.videobox').removeClass('close')
}

function hide_Info_Overlay() {
  $('.info-overlay').addClass('close')
  $('.info-overlay').removeClass('open')
  $('.infobox').addClass('close')
  $('.infobox').removeClass('open')
  $('.videobox').addClass('close')
  $('.videobox').removeClass('open')
}