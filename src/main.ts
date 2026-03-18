import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

// ロックを取得
const gotTheLock = app.requestSingleInstanceLock();

if(!gotTheLock) {
  // ロックが取れなかった（=すでに別のプロセスが起動している）ので終了
  app.quit();
} else {
  let splashWindow: BrowserWindow;
  let mainWindow: BrowserWindow;

  const createWindow = () => {

    splashWindow = new BrowserWindow({
      show: false,
      width: 400,
      height: 300,
      frame: false,
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: true,
      }
    })

    // 読み込みが完了した瞬間に表示する
    splashWindow.once('ready-to-show', () => {
      splashWindow.show();
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      splashWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/splash.html`);
    } else {
      splashWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/splash.html`),
      );
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({
      show: false,
      width: 1920,
      height: 1080,
      minWidth: 1200,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // メニューバーを非表示にする
    Menu.setApplicationMenu(null);

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      );
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // splashWindow.webContents.openDevTools();
  };

  ipcMain.once('app-ready', () => {
    // splashWindowが存在し、かつ「破壊されていない」場合のみcloseを呼ぶ
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.close();
    }

    // mainWindowも同様にチェックしておくと安全
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.maximize();
      mainWindow.show();
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.

}