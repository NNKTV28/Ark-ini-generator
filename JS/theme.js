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
  }