// Pings .txt files
const MINI_MAP_NOTES = "../PingLocations/MINI_MAP_NOTES.txt";

// File type and filename
const FILE_TYPE = "text/plain";
const FILENAME = "GameUserSettings.ini";

// Ini file input (label)
const iniFile = document.getElementById('gameUsersettingsFileInput');
// Defined sections
const sections = ['informationSection', 'modifyIniSection', 'modifySettingsSection', 'mapPingsSection', 'pvpSettingsSection', 'visualSettingsSection'];
// Upload file button
const uploadFileButton = document.getElementById('uploadAndDownloadButtons');
// Download file button
const downloadDileButton = document.getElementById('downloadButton');
// Ini file content text area
const iniContent = document.getElementById("iniFilePreviewTextAreaId");
// Main wrapper
const mainWrapper = document.getElementById("main-wrapper");
// PVP command text area
let pvpCommandText = document.getElementById("pvpCommandPreviewTextAreaId")


let renderedSection = "";
let defaultTheme = "light";
let gameUserSettingsIni = "";
let uploadedFile = false;

// Defined ini file indexes needed
const generalIndex = gameUserSettingsIni.indexOf("[GENERAL]");
const graphicsIndex = gameUserSettingsIni.indexOf("[GRAPHICS]");
const displayIndex = gameUserSettingsIni.indexOf("[DISPLAY]");
const engineIndex = gameUserSettingsIni.indexOf("[Engine.RenderingSettings]");
const scriptIndex = gameUserSettingsIni.indexOf("[Scripts/ShooterGame.ShooterGameUserSettings]");

// Default .ini file in case none is uploaded by the user
const defaultGameUserSettings =
"[GENERAL]\nRenderResX=1920\nRenderResY=1080\n" +
"[GRAPHICS]\nDefaultWindowMode=2\nScreenPercentage=100\nMaxShadowDistance=5000\n" +
"[LEVELOFDETAIL]\nResolutionQuality=1\nViewDistanceQuality=2\nShadow Quality=1\nAnti-Aliasing Quality=1\nEffects Quality=1\nTexture Quality=1\nPost Process Quality=1\nVisual Impairment=1\nMotion Blur=0\nAllow Facing Change On Next Character=0\nAlways Visible Shadows=1\nVolumetric Fog=0\nHBAO=0\nCascade Color Grading=0\nMotion Blur Gain=1.0\nBloomIntensity=1.0\nColor Grading Intensity=1.0\nSkin Color Correction=1\nTessellation Density=0.0\nDetail Texture Scale=1.0\nGlobal Occlusion Quality=0\nLensFlare Density=1.0\nWetness Intensity=1.0\nEye Adaptation Speed=0.0\nNear Visibility=1.0\nCinematic Anti-Aliasing Quality=1\nSharpening Intensity=1.0\nGhost Shadow Fadeout Distance=1000\nDark Light Layer Start Distance=500\nAuto-Exposure Min Bias=0.0\nAuto-Exposure Max Bias=0.0\nColor Scale Red=1.0\nColor Scale Green=1.0\nColor Scale Blue=1.0\nCinematic Dynamic Ambient Occlusion Radius=0.0\nCinematic Volumetric Fog Scattering Albedo=0.0\nCinematic Volumetric Fog Radius Scale=0.0\n"


// View distance slider
let viewDistanceSlider = document.getElementById("viewDistanceSlider");
let viewDistanceSliderOutput = document.getElementById("viewDistanceSliderOutput");

viewDistanceSlider.oninput = function() {
  if (viewDistanceSlider.value >= 1 && viewDistanceSlider.value <= 25) {
    viewDistanceSliderOutput.innerHTML = "Low";
  } else if (viewDistanceSlider.value >= 26 && viewDistanceSlider.value <= 50) {
    viewDistanceSliderOutput.innerHTML = "Medium";
  } else if (viewDistanceSlider.value >= 51 && viewDistanceSlider.value <= 75) {
    viewDistanceSliderOutput.innerHTML = "High";
  } else {
    viewDistanceSliderOutput.innerHTML = "Ultra";
  }
}
// Shadow quality slider
let shadowQualitySlider = document.getElementById("shadowQualitySlider");
let shadowQualitySliderOutput = document.getElementById("shadowQualitySliderOutput");

shadowQualitySlider.oninput = function() {
  if (shadowQualitySlider.value >= 1 && shadowQualitySlider.value <= 25) {
    shadowQualitySliderOutput.innerHTML = "Low";
  } else if (shadowQualitySlider.value >= 26 && shadowQualitySlider.value <= 50) {
    shadowQualitySliderOutput.innerHTML = "Medium";
  } else if (shadowQualitySlider.value >= 51 && shadowQualitySlider.value <= 75) {
    shadowQualitySliderOutput.innerHTML = "High";
  } else {
    shadowQualitySliderOutput.innerHTML = "Ultra";
  }
}



// Display the selected file name in the custom file label
function displayFileName() {
  let fileName = iniFile.value.split('\\').pop(); // Get only the file name, not the full path
  document.getElementById('customFileLabel').innerText = 'Selected file: ' + fileName;
  uploadedFile = true;
  gameUserSettingsIni = iniFile.files[0].text();
  loadFileAsText();
}

async function loadFileAsText() {
  let gameUserSettingsField = document.getElementById("gameUsersettingsFileInput");
  gameUserSettingsIni = await gameUserSettingsField.files[0].text();
  showIniContent();
}

function showIniContent(){
  if(renderedSection != 'informationSection' && renderedSection!='pvpSettingsSection'){
    iniContent.value = gameUserSettingsIni;  
  }
}
function copyIniContent(){
  iniContent.select();
  document.execCommand("copy");
}


function copyPvpCommand(){
  pvpCommandText.select();
  document.execCommand("copy");
}


function openNav() {
  document.getElementById("sidebar-div").style.width = "250px";
  mainWrapper.style.marginLeft = "250px";
  document.getElementById("closebtn").style.background = "url('https://api.iconify.design/line-md/menu-to-close-transition.svg') no-repeat center center / contain;";
}
function closeNav() {
  document.getElementById("sidebar-div").style.width = "50px";
  document.getElementById("sidebar-div").style.overflow = "hidden";
  document.getElementById("closebtn").style.background = "url('https://api.iconify.design/line-md/close-to-menu-transition.svg') no-repeat center center / contain;";

  document.querySelectorAll(".sidebar-button").style.width = "40px";
  document.querySelectorAll(".sidebar-button").style.padding = "10px 5px";
  document.querySelectorAll(".sidebar-button").style.textIndent = "-9999px";
  mainWrapper.style.marginLeft= "50";
}