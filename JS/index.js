const form = document.getElementById("ark-settings-form");
let gameUserSettingsIni = "";
let uploadedFile = false;
const settings = {
  autoBrightness: "bUseAutoBrightness"
};
const defaultGameUserSettings =
"[GENERAL]\nRenderResX=1920\nRenderResY=1080\n" +
"[GRAPHICS]\nDefaultWindowMode=2\nScreenPercentage=100\nMaxShadowDistance=5000\n" +
"[LEVELOFDETAIL]\nResolutionQuality=1\nViewDistanceQuality=2\nShadow Quality=1\nAnti-Aliasing Quality=1\nEffects Quality=1\nTexture Quality=1\nPost Process Quality=1\nVisual Impairment=1\nMotion Blur=0\nAllow Facing Change On Next Character=0\nAlways Visible Shadows=1\nVolumetric Fog=0\nHBAO=0\nCascade Color Grading=0\nMotion Blur Gain=1.0\nBloomIntensity=1.0\nColor Grading Intensity=1.0\nSkin Color Correction=1\nTessellation Density=0.0\nDetail Texture Scale=1.0\nGlobal Occlusion Quality=0\nLensFlare Density=1.0\nWetness Intensity=1.0\nEye Adaptation Speed=0.0\nNear Visibility=1.0\nCinematic Anti-Aliasing Quality=1\nSharpening Intensity=1.0\nGhost Shadow Fadeout Distance=1000\nDark Light Layer Start Distance=500\nAuto-Exposure Min Bias=0.0\nAuto-Exposure Max Bias=0.0\nColor Scale Red=1.0\nColor Scale Green=1.0\nColor Scale Blue=1.0\nCinematic Dynamic Ambient Occlusion Radius=0.0\nCinematic Volumetric Fog Scattering Albedo=0.0\nCinematic Volumetric Fog Radius Scale=0.0\n"

const improvePVPCommand = 
`grass.Enable 0 | r.Water.SingleLayer.Reflection 0 | r.LightShaftQuality 0 | r.VolumetricCloud 0 | r.VolumetricFog 0 | r.BloomQuality 0 | r.Lumen.Reflections.Allow 0 | r.Lumen.DiffuseIndirect.Allow 0 | r.Shadow.Virtual.Enable 0 | r.Shadow.CSM.MaxCascades 0 | sg.FoliageQuality 0 | sg.TextureQuality 0 | wp.Runtime.HLOD 0 | r.MipMapLODBias 1 | r.DistanceFieldShadowing 0 | r.Streaming.PoolSize 1 | r.Nanite.MaxPixelsPerEdge 4 | r.Lumen.ScreenProbeGather.RadianceCache.ProbeResolution 16 | r.PostProcessing.DisableMaterials 1 | r.ContactShadows 0 | r.depthoffieldquality 0 | r.depthoffieldquality 0 | r.fog 0 | r.lightshafts 0 | r.LightCulling.Quality 0 | foliage.LODDistanceScale 0 | r.shadowquality 0 | r.DynamicGlobalIlluminationMethod 0 | r.SkylightIntensityMultiplier 5 | r.Shading.FurnaceTest.SampleCount 0 | r.ScreenPercentage 50 | r.detailmode 0 | r.viewdistance 0 | r.foliage.WPODisableMultiplier 1 | r.foliage.AutoBoundsWPODisableMax 1 | r.Shading.FurnaceTest 1 | r.Shading.EnergyConservation 0`

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
  }

  // Update the brightness checkbox if "autoBrightness" is selected
  const brightnessCheckbox = document.getElementById("BrightnessCheckbox");
  if (
    checkedItems.some((item) => item.name === "autoBrightness") &&
    gameUserSettingsIni.includes(`bUseAutoBrightness="true"`)
  ) {
    brightnessCheckbox.checked = true;
  }
  
  const scriptIndex = gameUserSettingsIni.indexOf("[Scripts/ShooterGame.ShooterGameUserSettings]");
  for (const item of checkedItems) {
    switch (item.name) {
      case "resourcePings":
        if (scriptIndex !== -1) {
          gameUserSettingsIni = gameUserSettingsIni.slice(0, scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length) + "\n" + settings.autoBrightness + "=true" + gameUserSettingsIni.slice(scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length);
        } else {
          gameUserSettingsIni += "[Scripts/ShooterGame.ShooterGameUserSettings]\n" + settings.autoBrightness + "=true"; // add [DISPLAY] if it's not found in the gameUserSettingsIni
        }
        break;
      case "cavePings":
        if (scriptIndex !== -1) {
          gameUserSettingsIni = gameUserSettingsIni.slice(0, scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length) + "\n" + settings.autoBrightness + "=true" + gameUserSettingsIni.slice(scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length);
        } else {
          gameUserSettingsIni += "[Scripts/ShooterGame.ShooterGameUserSettings]\n" + settings.autoBrightness + "=true"; // add [DISPLAY] if it's not found in the gameUserSettingsIni
        }
        break;
      case "notePings":
        if (scriptIndex !== -1) {
          gameUserSettingsIni = gameUserSettingsIni.slice(0, scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length) + "\n" + settings.autoBrightness + "=true" + gameUserSettingsIni.slice(scriptIndex + "[Scripts/ShooterGame.ShooterGameUserSettings]".length);
        } else {
          gameUserSettingsIni += "[Scripts/ShooterGame.ShooterGameUserSettings]\n" + settings.autoBrightness + "=true"; // add [DISPLAY] if it's not found in the gameUserSettingsIni
        }
        break;
      // auto brightness switch
      case "autoBrightness":
        const displayIndex = gameUserSettingsIni.indexOf("[DISPLAY]");
        if (displayIndex !== -1) {
          gameUserSettingsIni = gameUserSettingsIni.slice(0, displayIndex + "[DISPLAY]".length) + "\n" + settings.autoBrightness + "=true" + gameUserSettingsIni.slice(displayIndex + "[DISPLAY]".length);
        } else {
          gameUserSettingsIni += "[DISPLAY]\n" + settings.autoBrightness + "=true"; // add [DISPLAY] if it's not found in the gameUserSettingsIni
        }
        break;
      default:
        break; // handle other cases as needed
    }
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
