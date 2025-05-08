const { ipcRenderer } = require('electron');

// Display incoming activity
ipcRenderer.on('activity-data', (event, logEntry) => {
  const activityLog = document.getElementById('activity-log');
  activityLog.innerHTML += `<p>${JSON.stringify(logEntry)}</p>`;
});

// Send user interaction to main
document.addEventListener('click', (event) => {
  ipcRenderer.send('log-activity', {
    type: 'click',
    details: { x: event.clientX, y: event.clientY },
  });
});

document.addEventListener('scroll', (event) => {
  ipcRenderer.send('log-activity', {
    type: 'scroll',
    details: { scrollTop: document.documentElement.scrollTop },
  });
});

document.addEventListener('keydown', (event) => {
  ipcRenderer.send('log-activity', {
    type: 'keydown',
    details: event.key,
  });
});
