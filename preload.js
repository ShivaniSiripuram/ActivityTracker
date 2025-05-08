
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendActivity: (activity) => ipcRenderer.send('log-activity', activity),
  onActivityData: (callback) => ipcRenderer.on('activity-data', (event, data) => callback(data))
});
