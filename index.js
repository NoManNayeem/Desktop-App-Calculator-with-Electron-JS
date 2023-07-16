const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const { ipcMain } = require('electron');

ipcMain.handle('calculate', (event, expression) => {
    try {
        const result = eval(expression);
        return result.toString();
    } catch (error) {
        console.error('Error occurred during calculation:', error);
        return 'Error';
    }
});
