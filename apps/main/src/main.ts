import {app,BrowserWindow} from 'electron'
import path=require('path')
import {updateHandle} from "./autoUpdate";


async function createView(){
    // 创建新的 electron 窗口
    const mainWindow = new BrowserWindow()
    // 载入生产环境的 url

    await mainWindow.loadURL(`file://${path.join(__dirname, './build/index.html')}`)
}

/**
 * main函数
 * */
async function main(){
     app.on("ready",createView )
    await updateHandle()
}
main()