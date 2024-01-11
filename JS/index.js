const form = document.getElementById("ark-settings-form");
let gameUserSettingsIni = "";
let uploadedFile = false;
const settings = {
  autoBrightness: "bUseAutoBrightness",
  drawGrass: "bDrawGrass",
  showTrees: "wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range"
};

const displayIndex = gameUserSettingsIni.indexOf("[DISPLAY]");
const engineIndex = gameUserSettingsIni.indexOf("[Engine.RenderingSettings]");
const scriptIndex = gameUserSettingsIni.indexOf("[Scripts/ShooterGame.ShooterGameUserSettings]");

const brightnessSwitch = document.getElementsByName("autoBrightness");
const grassSwitch = document.getElementsByName("drawGrass");

const defaultGameUserSettings =
"[GENERAL]\nRenderResX=1920\nRenderResY=1080\n" +
"[GRAPHICS]\nDefaultWindowMode=2\nScreenPercentage=100\nMaxShadowDistance=5000\n" +
"[LEVELOFDETAIL]\nResolutionQuality=1\nViewDistanceQuality=2\nShadow Quality=1\nAnti-Aliasing Quality=1\nEffects Quality=1\nTexture Quality=1\nPost Process Quality=1\nVisual Impairment=1\nMotion Blur=0\nAllow Facing Change On Next Character=0\nAlways Visible Shadows=1\nVolumetric Fog=0\nHBAO=0\nCascade Color Grading=0\nMotion Blur Gain=1.0\nBloomIntensity=1.0\nColor Grading Intensity=1.0\nSkin Color Correction=1\nTessellation Density=0.0\nDetail Texture Scale=1.0\nGlobal Occlusion Quality=0\nLensFlare Density=1.0\nWetness Intensity=1.0\nEye Adaptation Speed=0.0\nNear Visibility=1.0\nCinematic Anti-Aliasing Quality=1\nSharpening Intensity=1.0\nGhost Shadow Fadeout Distance=1000\nDark Light Layer Start Distance=500\nAuto-Exposure Min Bias=0.0\nAuto-Exposure Max Bias=0.0\nColor Scale Red=1.0\nColor Scale Green=1.0\nColor Scale Blue=1.0\nCinematic Dynamic Ambient Occlusion Radius=0.0\nCinematic Volumetric Fog Scattering Albedo=0.0\nCinematic Volumetric Fog Radius Scale=0.0\n"

/*
const improvePVPCommand = 
`grass.Enable 0 | r.Water.SingleLayer.Reflection 0 | r.LightShaftQuality 0 | r.VolumetricCloud 0 | r.VolumetricFog 0 | r.BloomQuality 0 | r.Lumen.Reflections.Allow 0 | r.Lumen.DiffuseIndirect.Allow 0 | r.Shadow.Virtual.Enable 0 | r.Shadow.CSM.MaxCascades 0 | sg.FoliageQuality 0 | sg.TextureQuality 0 | wp.Runtime.HLOD 0 | r.MipMapLODBias 1 | r.DistanceFieldShadowing 0 | r.Streaming.PoolSize 1 | r.Nanite.MaxPixelsPerEdge 4 | r.Lumen.ScreenProbeGather.RadianceCache.ProbeResolution 16 | r.PostProcessing.DisableMaterials 1 | r.ContactShadows 0 | r.depthoffieldquality 0 | r.depthoffieldquality 0 | r.fog 0 | r.lightshafts 0 | r.LightCulling.Quality 0 | foliage.LODDistanceScale 0 | r.shadowquality 0 | r.DynamicGlobalIlluminationMethod 0 | r.SkylightIntensityMultiplier 5 | r.Shading.FurnaceTest.SampleCount 0 | r.ScreenPercentage 50 | r.detailmode 0 | r.viewdistance 0 | r.foliage.WPODisableMultiplier 1 | r.foliage.AutoBoundsWPODisableMax 1 | r.Shading.FurnaceTest 1 | r.Shading.EnergyConservation 0`
*/

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const checkedItems = [...form.elements].filter((item) => item.checked);
  
  if (checkedItems.length === 0) {
    alert("Please select at least one option.");
    return;
  }
  // check if user uploaded a file named GameUserSettings.ini
  let gameUserSettingsField = document.getElementById("gameUsersettingsFileInput");
  if (gameUserSettingsField.files.length === 0) {
    gameUserSettingsIni = defaultGameUserSettings;
    uploadedFile = false;
  }else{
    gameUserSettingsIni = await gameUserSettingsField.files[0].text();
    uploadedFile = true;
    // check if the file is empty
    if (gameUserSettingsIni.trim() === "") {
      gameUserSettingsIni = defaultGameUserSettings;
      uploadedFile = false;
    }
    // TODO: check if the uploaded file is a valid gameUserSettingsIni file
    // TODO: check if the uploaded file has any of the items already implemented and if it does then check the respective checkbox automatically
  }  
  
  for (const item of checkedItems) 
  {
    // Update the gameUserSettingsIni based on the selected options
    // TODO: Check if the checked items are under the needed indexes
    // this must be under displayIndex line
    if(item.name === "autoBrightness")
    {
      if(gameUserSettingsIni.includes(settings.autoBrightness))
      {
        gameUserSettingsIni = gameUserSettingsIni.replace(`bUseAutoBrightness="true"`, `bUseAutoBrightness="false"`)
      }else{
        gameUserSettingsIni = gameUserSettingsIni.replace(`bUseAutoBrightness="false"`, `bUseAutoBrightness="true"`)
      }
    }
    // this must be under engineIndex line
    if(item.name === "drawGrass")
    {
      // TODO: Check if the gameUserSettingsIni contains "bDrawGrass" and if not then create it and give it its selected value
      if(gameUserSettingsIni.includes(settings.drawGrass))
      {
        gameUserSettingsIni = gameUserSettingsIni.replace(`bDrawGrass="true"`, `bDrawGrass="false"`)
      }else{
        gameUserSettingsIni = gameUserSettingsIni.replace(`bDrawGrass="false"`, `bDrawGrass="true"`)
      }
    }
    // this must be under engineIndex line
    if(item.name === "showTrees")
    {
      // TODO: Check if the line exists and if not then create it
      if(gameUserSettingsIni.includes(settings.showTrees))
      {
        gameUserSettingsIni = gameUserSettingsIni.replace(`wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range=5000`, `wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range=0`)
      }else{
        gameUserSettingsIni = gameUserSettingsIni.replace(`wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range=0`, `wp.Runtime.OverrideRuntimeSpatialHashLoadingRange -range=5000`)
      }
    }
    gameUserSettingsIni = gameUserSettingsIni.replace(settings[item.name], item.value);
  }

  const blob = new Blob([gameUserSettingsIni], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "GameUserSettings.ini";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
});

// create a function that when the theme switch is interacted the body class will change to darkmode and when checked again to ligtmode

const themeSwitch = document.getElementById("theme-toggle-button");
themeSwitch.addEventListener("change", () => {
  if(themeSwitch.checked === true)
  {
    document.body.classList.toggle("");
  }else{
    document.body.classList.toggle("darkmode");
  }
  
});
function displayFileName() {
  var input = document.getElementById('gameUsersettingsFileInput');
  var fileName = input.value.split('\\').pop(); // Get only the file name, not the full path
  document.getElementById('customFileLabel').innerText = 'Selected file: ' + fileName;
}
