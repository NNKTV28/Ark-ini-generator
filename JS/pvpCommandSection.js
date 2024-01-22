let commandOutput = "";
let settings = [
    {
        name: "disableGrass",
        commandOutput: "b.grassEnabled=0 || ",
    }
]
function togglePvpSetting(setting) {
    
  if(setting.name == "disableGrass"){
    if (setting.checked == true) {
        commandOutput += settings.disableGrass.commandOutput;
        pvpCommandText.textContent += commandOutput;
        
    }else {
        // remove the b.grassEnabled=0 || from the commandOutput
        commandOutput = commandOutput.replace(settings.disableGrass.commandOutput, "");
        // remove the command from the text
        pvpCommandText.textContent = pvpCommandText.textContent.replace(commandOutput, "");
    }
  }
}
