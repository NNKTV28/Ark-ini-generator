const MINI_MAP_NOTES = "../PingLocations/MINI_MAP_NOTES.txt";

const FILE_TYPE = "text/plain";
const FILENAME = "GameUserSettings.ini";

const iniFile = document.getElementById('gameUsersettingsFileInput');
const sections = ['informationSection', 'modifyIniSection', 'modifySettingsSection', 'mapPingsSection', 'pvpSettingsSection', 'visualSettingsSection'];
const uploadFileButton = document.getElementById('uploadAndDownloadButtons');
const downloadDileButton = document.getElementById('downloadButton');
let renderedSection = "";

let gameUserSettingsIni = "";
let uploadedFile = false;
const settings = {
  autoBrightness: "bUseAutoBrightness",
  drawGrass: "bDrawGrass",
  showTrees: "wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range"
};

const switchIDs = [
  "brightnessSwitch",
  "grassSwitch",
  "treesSwitch",
  "volumetricCloudsSwitch"
];

/**
 * Finds the index of the [DISPLAY] section header in the gameUserSettingsIni string.
 * This allows us to insert new display settings at the correct location later.
 */
const displayIndex = gameUserSettingsIni.indexOf("[DISPLAY]");
const engineIndex = gameUserSettingsIni.indexOf("[Engine.RenderingSettings]");
const scriptIndex = gameUserSettingsIni.indexOf("[Scripts/ShooterGame.ShooterGameUserSettings]");

const defaultGameUserSettings =
"[GENERAL]\nRenderResX=1920\nRenderResY=1080\n" +
"[GRAPHICS]\nDefaultWindowMode=2\nScreenPercentage=100\nMaxShadowDistance=5000\n" +
"[LEVELOFDETAIL]\nResolutionQuality=1\nViewDistanceQuality=2\nShadow Quality=1\nAnti-Aliasing Quality=1\nEffects Quality=1\nTexture Quality=1\nPost Process Quality=1\nVisual Impairment=1\nMotion Blur=0\nAllow Facing Change On Next Character=0\nAlways Visible Shadows=1\nVolumetric Fog=0\nHBAO=0\nCascade Color Grading=0\nMotion Blur Gain=1.0\nBloomIntensity=1.0\nColor Grading Intensity=1.0\nSkin Color Correction=1\nTessellation Density=0.0\nDetail Texture Scale=1.0\nGlobal Occlusion Quality=0\nLensFlare Density=1.0\nWetness Intensity=1.0\nEye Adaptation Speed=0.0\nNear Visibility=1.0\nCinematic Anti-Aliasing Quality=1\nSharpening Intensity=1.0\nGhost Shadow Fadeout Distance=1000\nDark Light Layer Start Distance=500\nAuto-Exposure Min Bias=0.0\nAuto-Exposure Max Bias=0.0\nColor Scale Red=1.0\nColor Scale Green=1.0\nColor Scale Blue=1.0\nCinematic Dynamic Ambient Occlusion Radius=0.0\nCinematic Volumetric Fog Scattering Albedo=0.0\nCinematic Volumetric Fog Radius Scale=0.0\n"

const slider = document.getElementById("viewDistanceSlider");
const output = document.getElementById("viewDistanceSlider");
output.innerHTML = slider.value;

slider.oninput = function () {
  if (this.value == "1") {
    output.innerHTML = "Low";
  } else if (this.value == "2") {
    output.innerHTML = "Medium";
  } else if (this.value == "3") {
    output.innerHTML = "High";
  } else {
    output.innerHTML = "Ultra";
  }
};

/*
const improvePVPCommand = 
`grass.Enable 0 | r.Water.SingleLayer.Reflection 0 | r.LightShaftQuality 0 | r.VolumetricCloud 0 | r.VolumetricFog 0 | r.BloomQuality 0 | r.Lumen.Reflections.Allow 0 | r.Lumen.DiffuseIndirect.Allow 0 | r.Shadow.Virtual.Enable 0 | r.Shadow.CSM.MaxCascades 0 | sg.FoliageQuality 0 | sg.TextureQuality 0 | wp.Runtime.HLOD 0 | r.MipMapLODBias 1 | r.DistanceFieldShadowing 0 | r.Streaming.PoolSize 1 | r.Nanite.MaxPixelsPerEdge 4 | r.Lumen.ScreenProbeGather.RadianceCache.ProbeResolution 16 | r.PostProcessing.DisableMaterials 1 | r.ContactShadows 0 | r.depthoffieldquality 0 | r.depthoffieldquality 0 | r.fog 0 | r.lightshafts 0 | r.LightCulling.Quality 0 | foliage.LODDistanceScale 0 | r.shadowquality 0 | r.DynamicGlobalIlluminationMethod 0 | r.SkylightIntensityMultiplier 5 | r.Shading.FurnaceTest.SampleCount 0 | r.ScreenPercentage 50 | r.detailmode 0 | r.viewdistance 0 | r.foliage.WPODisableMultiplier 1 | r.foliage.AutoBoundsWPODisableMax 1 | r.Shading.FurnaceTest 1 | r.Shading.EnergyConservation 0`
*/

function generateIniFile() {
  // check if user uploaded a file named GameUserSettings.ini
  let gameUserSettingsField = document.getElementById(
    "gameUsersettingsFileInput"
  );
  if (gameUserSettingsField.files.length === 0) {
    gameUserSettingsIni = defaultGameUserSettings;
    uploadedFile = false;
  } else {
    gameUserSettingsIni = gameUserSettingsField.files[0].text();
    uploadedFile = true;

    // TODO: check if the uploaded file is a valid gameUserSettingsIni file
    // Parse the file and validate it contains expected sections
    // If not, then show an error message and return
    // If yes, then continue with the rest of the code
    // Check if the file contains the [DISPLAY] section
    if (!gameUserSettingsIni.includes("[DISPLAY]")) {
      return;
    }
    // Check if the file contains the [Engine.RenderingSettings] section
    if (!gameUserSettingsIni.includes("[Engine.RenderingSettings]")) {
      return;
    }
    // Check if the file contains the [Scripts/ShooterGame.ShooterGameUserSettings] section
    if (!gameUserSettingsIni.includes("[Scripts/ShooterGame.ShooterGameUserSettings]")) {
      return;
    }
    // Check if the file contains the [GENERAL] section
    if (!gameUserSettingsIni.includes("[GENERAL]")) {
      return;
    }
    // check if the file is empty
    if (gameUserSettingsIni.trim() === "") {
      gameUserSettingsIni = defaultGameUserSettings;
      uploadedFile = false;
    }
  }

  // Check if the user wants to enable auto brightness
  if (brightnessSwitch[0].checked) {
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bUseAutoBrightness=0",
      "bUseAutoBrightness=1"
    );
  }else {
    // Check if the user wants to disable auto brightness
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bUseAutoBrightness=1",
      "bUseAutoBrightness=0"
    );
  }
  // Check if the user wants to enable grass
  if (grassSwitch[0].checked) {
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bDrawGrass=0",
      "bDrawGrass=1"
    );
  }else {
    // Check if the user wants to disable grass
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bDrawGrass=1",
      "bDrawGrass=0"
    );
  }
  // Check if the user wants to enable grass
  if (grassSwitch[1].checked) {
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bDrawGrass=0",
      "bDrawGrass=1"
    );
  }else{
    gameUserSettingsIni = gameUserSettingsIni.replace(
      "bDrawGrass=1",
      "bDrawGrass=0"
    );
  }
  downloadFile();
  // Rest of submit handler
};


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
  document.body.classList.toggle("darkmode");
  document.getElementById("theme-toggle-button").checked = !document.getElementById("theme-toggle-button").checked;
}

// Display the selected file name in the custom file label
function displayFileName() {
  let fileName = iniFile.value.split('\\').pop(); // Get only the file name, not the full path
  document.getElementById('customFileLabel').innerText = 'Selected file: ' + fileName;
  uploadedFile = true;
  gameUserSettingsIni = iniFile.files[0].text();
  loadFileAsText();
}

function loadFileAsText() {
  let fileToLoad = document.getElementById("gameUsersettingsFileInput")
    .files[0];

  let fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    let textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("gameUsersettingsFileInput").value = textFromFileLoaded;
  };
  fileReader.readAsText(fileToLoad, "UTF-8");

  console.log("File loaded\n" + fileReader.value);
}

// Show only the selected section
function showSection(sectionId, buttonId) {
  // Hide all sections
  sections.forEach(section => {
      document.getElementById(section).style.display = 'none';
  });  

  // Remove 'selected' class from all buttons
  const buttons = document.querySelectorAll('.sidebar-button');
  buttons.forEach(btn => {
      btn.classList.remove('selected');
  });

  // Show the selected section
  document.getElementById(sectionId).style.display = 'block';

  // Add 'selected' class to the clicked button
  if(buttonId == null){
    alert("Button id is null")
  }else
  {
    document.getElementById(buttonId.id).classList.add('selected');
    renderedSection = sectionId;
    
    if(renderedSection == 'informationSection'){
      uploadFileButton.style.display = 'none';
      downloadDileButton.style.display = 'none';
    }else{
      uploadFileButton.style.display = 'block';
      downloadDileButton.style.display = 'block';
    }
  } 
}

function modifyIniSection(){
}
function modifySettingsSection(){
}
function mapPingsSection(){
  let notePings = document.getElementById('notePings');
  if(renderedSection == 'mapPingsSection'){
    if(uploadedFile){
      if (gameUserSettingsIni.contains("HLN-A Discovery"))
      {
        notePings.value = "checked";
      }else{
        // add the note pings content from MINI_MAP_NOTES.txt to the end of the uploaded iniFile
        let notePingsContent = fetch(MINI_MAP_NOTES);
        gameUserSettingsIni += notePingsContent;
      }
        
    }
  }
}
function pvpSettingsSection(){
}
function visualSettingsSection(){
  if(renderedSection == 'visualSettingsSection'){
    if(uploadedFile){
      if (gameUserSettingsIni.contains("bUseAutoBrightness=true")){
        brightnessSwitch[0].checked = true;
        console.log(brightnessSwitch[0].checked);
      }
        
    }
  }
}

