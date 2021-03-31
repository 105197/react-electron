import type {IpcMainInvokeEvent} from 'electron'
import {ipcMain} from 'electron'
import {BaseDefine} from "../../electron_ipc_type/src";
import {ClassUtil} from "@liuli-util/object";

type FilteredKeys<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never
}[keyof T]

/**
 * 装换为一个主进程可以实现的接口
 **/
export type IpcMainDefine<T> = {
    [P in FilteredKeys<T, (...args: any) => void>]: (e: IpcMainInvokeEvent, ...args: Parameters<T[P]>) => Promise<ReturnType<T[P]>>
}

export class IpcMainProvider {
    private readonly clazzMap = new Map<string, object>()
    private static getKey<T>(namespace: string, method: PropertyKey) {
        return namespace + '.' + method.toString()
    }

    register<T extends BaseDefine<string>>(
        namespace: T['namespace'],
        api: IpcMainDefine<T>,
    ): IpcMainDefine<T> {
        const instance = ClassUtil.bindMethodThis(api)
        const methods = ClassUtil.scan(instance)
        methods.forEach((method) => {
            const key = IpcMainProvider.getKey(namespace, method)
            ipcMain.handle(key, instance[method] as any)
            console.log('Register ipcMain.handle: ', key)
        })
        this.clazzMap.set(namespace, instance)
        return instance
    }

    unregister<T extends BaseDefine<string>>(
        namespace: T['namespace'],
        api: IpcMainDefine<T>,
    ): void {
        const methods = ClassUtil.scan(api)
        methods.forEach((method) => {
            const key = IpcMainProvider.getKey(namespace, method)
            ipcMain.removeHandler(key)
        })
        this.clazzMap.delete(namespace)
    }

}