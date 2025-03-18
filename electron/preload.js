const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('@electron/remote');

// Expõe APIs do Electron para o processo de renderização
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => {
    console.log('Preload: Minimizando janela via remote');
    try {
      const currentWindow = BrowserWindow.getFocusedWindow();
      if (currentWindow) {
        currentWindow.minimize();
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.error('Erro ao minimizar:', error);
      return Promise.reject(error);
    }
  },
  maximize: () => {
    console.log('Preload: Maximizando/restaurando janela via remote');
    try {
      const currentWindow = BrowserWindow.getFocusedWindow();
      if (currentWindow) {
        if (currentWindow.isMaximized()) {
          currentWindow.unmaximize();
        } else {
          currentWindow.maximize();
        }
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.error('Erro ao maximizar/restaurar:', error);
      return Promise.reject(error);
    }
  },
  close: () => {
    console.log('Preload: Fechando janela via remote');
    try {
      const currentWindow = BrowserWindow.getFocusedWindow();
      if (currentWindow) {
        currentWindow.close();
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.error('Erro ao fechar:', error);
      return Promise.reject(error);
    }
  }
});

// Expõe APIs do Node.js para o processo de renderização
contextBridge.exposeInMainWorld('nodeAPI', {
  fs: {
    readFileSync: (filePath, options) => fs.readFileSync(filePath, options),
    writeFileSync: (filePath, data) => fs.writeFileSync(filePath, data),
    existsSync: (filePath) => fs.existsSync(filePath)
  },
  path: {
    join: (...args) => path.join(...args)
  },
  app: {
    getPath: (name) => app.getPath(name)
  }
});
