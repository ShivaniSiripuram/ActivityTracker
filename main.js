const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const activeWin = require('active-win');

const logFilePath = path.join(__dirname, 'activities.json');

let win; 


app.whenReady().then(() => {
  fs.writeFile(logFilePath, '', (err) => {
    if (err) {
      console.error('Error clearing log file:', err);
    } else {
      console.log('activities.json cleared.');
    }
  });

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Track active window every second with error handling
  setInterval(async () => {
    try {
      const window = await activeWin();
      const logEntry = {
        type: 'window-focus',
        details: window ? window.title : 'No active window',
        timestamp: new Date().toISOString()
      };

      // Write the log to file
      fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', err => {
        if (err) {
          console.error('Failed to log activity:', err);
        }
      });

      // Send log to renderer
      win.webContents.send('activity-data', logEntry);
    } catch (err) {
      // Suppress specific errors related to activeWin and print only necessary information
      if (!err.message.includes('xprop') && !err.message.includes('xwininfo')) {
        console.error('activeWin failed:', err.message);
      }
    }
  }, 1000);
});

// Handle activity logging from renderer
ipcMain.on('log-activity', (event, activity) => {
  const logEntry = {
    ...activity,
    timestamp: new Date().toISOString()
  };

  fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', err => {
    if (err) console.error('Failed to log activity:', err);
  });

  event.sender.send('activity-data', logEntry);
});
