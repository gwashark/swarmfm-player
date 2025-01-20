document.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(async () => {
    const TauriWindow = await window.__TAURI__.window.getCurrentWindow();
    const autoStart = window.__TAURI__.autostart;
    const { ask } = window.__TAURI__.dialog;
    const opener = window.__TAURI__.opener;

    if (await autoStart.isEnabled()) {
      document.getElementById("titlebar-autostart").classList.add("on");
      document.getElementById("titlebar-autostart").title = "Auto Start (ON)";
    } else {
      document.getElementById("titlebar-autostart").classList.remove("on");
      document.getElementById("titlebar-autostart").title = "Auto Start (OFF)";
    }

    document
      .getElementById("titlebar-minimize")
      .addEventListener("click", () => TauriWindow.minimize());
    document
      .getElementById("titlebar-close")
      .addEventListener("click", () => TauriWindow.close());
    document
      .getElementById("titlebar-autostart")
      .addEventListener("click", async () => {
        try {
          if (await autoStart.isEnabled()) {
            await autoStart.disable();
            document
              .getElementById("titlebar-autostart")
              .classList.remove("on");
            document.getElementById("titlebar-autostart").title =
              "Auto Start (OFF)";
          } else {
            await autoStart.enable();
            document.getElementById("titlebar-autostart").classList.add("on");
            document.getElementById("titlebar-autostart").title =
              "Auto Start (ON)";
          }
        } catch (e) {
          const ghissue = await ask(
            "An error occured while trying to enable/disable autostart.\n There may be an on-going issue about this. Would you like to check?",
            {
              title: "Swarm-FM (Mini Player)",
            }
          );
          if (ghissue) {
            opener.openUrl("https://github.com/gwashark/swarmfm-player/issues");
          }
        }
      });
    document
      .getElementById("titlebar-pintotop")
      .addEventListener("click", async () => {
        if (
          document.getElementById("titlebar-pintotop").classList.contains("on")
        ) {
          await TauriWindow.setAlwaysOnTop(false);
          document.getElementById("titlebar-pintotop").classList.remove("on");
          document.getElementById("titlebar-pintotop").title =
            "Pin to Top (OFF)";
          document.getElementById("titlebar-minimize").style.display = "block";
        } else {
          await TauriWindow.setAlwaysOnTop(true);
          document.getElementById("titlebar-pintotop").classList.add("on");
          document.getElementById("titlebar-pintotop").title =
            "Pin to Top (ON)";
          document.getElementById("titlebar-minimize").style.display = "none";
        }
      });
  }, 100);
});

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

document.addEventListener('contextmenu', event => event.preventDefault());