import {ipcMain, Notification} from "electron";
// import log from 'electron-log'
import {autoUpdater} from "electron-updater";

export function updateHandle(){
    ipcMain.on('checkForUpdate', async () => {
        // log.info('checkForUpdate: ', Date.now())
        //执行自动更新检查
        await autoUpdater.checkForUpdates()
    })
    autoUpdater.addListener('update-downloaded', (info) => {
        new Notification({
            title: '更新提醒',
            body: `新版本 ${info.version} 已经准备好，点击立刻更新！`,
        })
            .addListener('click', () => {
                autoUpdater.quitAndInstall()
            })
            .show()
    })
    autoUpdater.checkForUpdates()
}