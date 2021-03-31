import {copy,remove} from 'fs-extra'
import * as path from 'path'
async function copyByMap(copyMap:[string,string][]){
    await Promise.all(
        copyMap.map(async ([src,distDir])=>{
            const srcPath=path.resolve(__dirname,src)
            const distPath=path.resolve(__dirname,distDir,path.basename(srcPath))
            await copy(srcPath,distPath)
        })
    ).catch(()=>{
        console.log('22222')
    })
}

/**
 * 清理最终生成目录
*/
export async function clean(){
    await remove(path.resolve(__dirname,'dist'))
    await remove(path.resolve(__dirname,'release'))
}

/**
 * 复制资源到dist目录下
 */
export async function copyStatic(){
    await copyByMap([['../rs_renderer/build','dist/']])
}

