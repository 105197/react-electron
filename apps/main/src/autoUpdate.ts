import {ipcMain} from "electron";
// import log from 'electron-log'
import {autoUpdater} from "electron-updater";

export function updateHandle(){
    ipcMain.on('checkForUpdate', async () => {
        // log.info('checkForUpdate: ', Date.now())
        //执行自动更新检查
        await autoUpdater.checkForUpdates()
    })
    autoUpdater.checkForUpdates()
}