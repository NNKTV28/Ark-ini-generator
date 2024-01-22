const iniFilePreview = document.getElementById("iniFilePreviewId");
const pvpCommandPreview = document.getElementById("pvpCommandPreviewId");
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
        iniFilePreview.style.display = 'none';
        pvpCommandPreview.style.display = 'none';
      }else{
        uploadFileButton.style.display = 'block';
        downloadDileButton.style.display = 'block';
        iniFilePreview.style.display = 'block';
      }
      
      if(renderedSection == 'pvpSettingsSection'){
        uploadFileButton.style.display = 'none';
        downloadDileButton.style.display = 'none';
        iniFilePreview.style.display = 'none';
        pvpCommandPreview.style.display = 'block';
      }else{
        uploadFileButton.style.display = 'block';
        downloadDileButton.style.display = 'block';
        iniFilePreview.style.display = 'block'
        pvpCommandPreview.style.display = 'none';
      }

    } 
  }
  
  function modifyIniSection(){
  }
  function modifySettingsSection(){
  }
  function mapPingsSection(){
    let notePings = File.ReadAllText(MINI_MAP_NOTES);

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
  
      iniContent.value = initialCommand;
    }
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