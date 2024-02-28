// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import * as dbRead from './database/queries/dbQueries'

export type Channels = 'get-projects';

// const getProjectList = () => {
//   return dbRead.getProjectList();
// }

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  getProjects: () => ipcRenderer.invoke('get-projects'),
  createProject: (project: any) => ipcRenderer.invoke('create-project', project),
  getWorkByProjectID: (project_id: any) => ipcRenderer.invoke('get_work_by_project', project_id),
  createWork: (work: any) => ipcRenderer.invoke('create-work', work)
};

contextBridge.exposeInMainWorld('electron', electronHandler);


export type ElectronHandler = typeof electronHandler;
