// Pings .txt files
const MINI_MAP_NOTES = "../PingLocations/MINI_MAP_NOTES.txt";

// File type and filename
const FILE_TYPE = "text/plain";
const FILENAME = "GameUserSettings.ini";

// Ini file input (label)
var iniFile = document.getElementById('gameUsersettingsFileInput');
// Defined sections
var sections = ['informationSection', 'modifyIniSection', 'modifySettingsSection', 'mapPingsSection', 'pvpSettingsSection', 'visualSettingsSection'];
// Upload file button
var uploadFileButton = document.getElementById('uploadAndDownloadButtons');
// Download file button
var downloadDileButton = document.getElementById('downloadButton');
// Ini file content text area
var iniContent = document.getElementById("iniFilePreviewTextAreaId");
// Main wrapper
var mainWrapper = document.getElementById("main-wrapper");
// PVP command text area
var pvpCommandText = document.getElementById("pvpCommandPreviewTextAreaId")


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

async function generateIniFile() {
  const gameUserSettingsField = document.getElementById("gameUsersettingsFileInput");
  
  if (gameUserSettingsField.files.length === 0) {
    gameUserSettingsIni = defaultGameUserSettings;
    uploadedFile = false;
  } else {
    try {
      await loadFileAsText();
      uploadedFile = true;
      
      // Validate file content
      if (!gameUserSettingsIni.includes("[DISPLAY]") ||
          !gameUserSettingsIni.includes("[Engine.RenderingSettings]") ||
          !gameUserSettingsIni.includes("[Scripts/ShooterGame.ShooterGameUserSettings]") ||
          !gameUserSettingsIni.includes("[GENERAL]")) {
        throw new Error("Invalid INI file format");
      }
    } catch (err) {
      console.error("Error loading file:", err);
      gameUserSettingsIni = defaultGameUserSettings;
      uploadedFile = false;
    }
  }

  // Update settings
  updateSettings();
  downloadFile();
}

// Download the generated file
function downloadFile() {
  try {
    const fileBlob = new Blob([gameUserSettingsIni], { type: FILE_TYPE });
    const url = URL.createObjectURL(fileBlob);
    const anchorTag = document.createElement("a");
    anchorTag.style.display = "none";
    anchorTag.href = url;
    anchorTag.download = FILENAME;
    document.body.appendChild(anchorTag);
    anchorTag.click();

    if (checkIfDownloadSuccessful()) {
      setTimeout(() => {
        document.body.removeChild(anchorTag);
        URL.revokeObjectURL(url);
      }, 100);
    }
  } catch (error) {
    console.error("Failed to download file", error);
  }
}

function checkIfDownloadSuccessful() {
  // Logic to check if file download succeeded
  return true;
}

// Toggle darkmode
function toggleTheme() {
  if (defaultTheme === "light") {
    document.querySelectorAll(".theme-light").forEach((element) => {
      element.classList.toggle("theme-light");
      element.classList.toggle("theme-dark");
    })
    defaultTheme = "dark";
  }else{
    document.querySelectorAll(".theme-dark").forEach((element) => {
      element.classList.toggle("theme-dark");
      element.classList.toggle("theme-light");
    })
    defaultTheme = "light";
  }
  
  //document.body.classList.toggle("darkmode");
  //document.getElementById("theme-toggle-button").checked = !document.getElementById("theme-toggle-button").checked;
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
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-spinner';
  document.body.appendChild(loadingIndicator);

  try {
    const file = document.getElementById("gameUsersettingsFileInput").files[0];
    const reader = new FileReader();
    
    const result = await new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });

    gameUserSettingsIni = result;
    showIniContent();
  } finally {
    document.body.removeChild(loadingIndicator);
  }
}

// Show only the selected section
// function showSection(sectionId, buttonId) { ... } // Moved to sectionFunctions.js

function modifyIniSection(){
}
function modifySettingsSection(){
}
function mapPingsSection(){
  let notePings = File.ReadAllText(MINI_MAP_NOTES);
  console.log(notePings);
  if(renderedSection == 'mapPingsSection'){
    if(uploadedFile){
      if (gameUserSettingsIni.contains("HLN-A Discovery"))
      {
        notePings.value = "checked";
      }else{
        
        // add the note pings content from MINI_MAP_NOTES.txt to the end of the uploaded iniFile
        let notePingsContent = MINI_MAP_NOTES.text();
        console.log(MINI_MAP_NOTES);
        gameUserSettingsIni += notePingsContent;
        console.log(gameUserSettingsIni);
      }
        
    }
  }
}
function pvpSettingsSection(){
  if(renderedSection == 'pvpSettingsSection'){
    let initialCommand = "";
    let checked = document.querySelectorAll(".pvpSettingsCommandCheckbox");
    let command = document.querySelectorAll(".pvpSettingsCommand");
    iniContent = initialCommand;

    iniContent.value = gameUserSettingsIni;
  }

}
function visualSettingsSection(){
  if(renderedSection == 'visualSettingsSection'){
    if(uploadedFile){
      if (gameUserSettingsIni.includes("bUseAutoBrightness=true")){
        brightnessSwitch[0].checked = true;
        console.log(brightnessSwitch[0].checked);
      }
    }
  }
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
  const sidebarDiv = document.getElementById("sidebar-div");
  const buttons = document.querySelectorAll(".sidebar-button");
  
  sidebarDiv.style.width = "50px";
  sidebarDiv.style.overflow = "hidden";
  
  buttons.forEach(btn => {
    btn.style.width = "40px";
    btn.style.padding = "10px 5px"; 
    btn.style.textIndent = "-9999px";
  });

  mainWrapper.style.marginLeft = "50px";
  
  document.getElementById("closebtn").style.background = "url('https://api.iconify.design/line-md/close-to-menu-transition.svg') no-repeat center center / contain";
}

function toggleNav() {
  const sidebarDiv = document.getElementById("sidebar-div");
  const isOpen = sidebarDiv.style.width === "250px";
  
  if (isOpen) {
    closeNav();
  } else {
    openNav();
  }
}

function updateSettings() {
  // Auto brightness
  gameUserSettingsIni = gameUserSettingsIni.replace(
    /bUseAutoBrightness=[01]/,
    `bUseAutoBrightness=${brightnessSwitch[0].checked ? 1 : 0}`
  );

  // Draw grass
  gameUserSettingsIni = gameUserSettingsIni.replace(
    /bDrawGrass=[01]/,
    `bDrawGrass=${grassSwitch[0].checked ? 1 : 0}`
  );
}