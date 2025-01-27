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
  document.getElementById("titlebar-mute").addEventListener("click", () => {
    if (player.isMuted()) {
      document.getElementById("titlebar-mute").querySelector("path").setAttribute("d", "M11.243 12.993a.75.75 0 0 1-.53-1.281a5.256 5.256 0 0 0 0-7.425a.75.75 0 1 1 1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-.702 3.498-1.977 4.773a.75.75 0 0 1-.53.22zm-2.665-1.415a.75.75 0 0 1-.53-1.281a3.254 3.254 0 0 0 0-4.596a.75.75 0 1 1 1.061-1.061a4.756 4.756 0 0 1 0 6.718a.75.75 0 0 1-.53.22zM6.5 15a.5.5 0 0 1-.354-.146L2.292 11H.499a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h1.793l3.854-3.854A.499.499 0 0 1 7 1.5v13a.5.5 0 0 1-.5.5");
      document.getElementById("titlebar-mute").querySelector("path").setAttribute("viewBox", "0 0 16 16");
      player.unMute();
    } else {
      document.getElementById("titlebar-mute").querySelector("path").setAttribute("d", "M15 9.674V11h-1.326L12 9.326L10.326 11H9V9.674L10.674 8L9 6.326V5h1.326L12 6.674L13.674 5H15v1.326L13.326 8zM6.5 15a.5.5 0 0 1-.354-.146L2.292 11H.499a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h1.793l3.854-3.854A.499.499 0 0 1 7 1.5v13a.5.5 0 0 1-.5.5");
      document.getElementById("titlebar-mute").querySelector("path").setAttribute("viewBox", "0 0 512 512");
      player.mute();
    }
});
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