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