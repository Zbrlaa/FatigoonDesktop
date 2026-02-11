const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Ajoute des fonctions si besoin plus tard
});