const {
  app,
  BrowserWindow,
  ipcRenderer,
  ipcMain,
  globalShortcut,
} = require("electron");

try {
  require("electron-reloader")(module);
} catch {}

var win;
var debug = true;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: `${__dirname}/www/img/icon.png`,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile(`${__dirname}/public/html/index.html`);
  win.menuBarVisible = false;
  // win.maximize();

  win.on("closed", () => {
    win = null;
  });

  // Adding new features
  globalShortcut.register("F11", () => {
    // Exiting maximize mode
    if (win.isMaximized() && win.isFocused()) {
      win.unmaximize();
    }

    // Entering maximize mode
    else if (win.isFocused()) {
      win.maximize();
    }
  });

  // Adding debug features
  if (debug) {
    win.webContents.toggleDevTools();
    
    globalShortcut.register("Ctrl+B", () => {
      // Opening dev tools
      if (win.isFocused()) {
        win.webContents.toggleDevTools();
      }
    });
  }
}

app.on("ready", createWindow);
