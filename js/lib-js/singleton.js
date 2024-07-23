/*实现单例模式的函数*/
/*使用方法：
import {singleton} from './singleton.js';
class video{
    constructor(){
        this.name = 'video';
        this.size = 0;
    }

    play(){
        console.log('play video');
    }
}

const Video = singleton(video);
const video1 = new Video('video1', 100);
const video2 = new Video('video2', 200);

console.log(video1 === video2); // false, 两个实例不相等

const video3 = new Video('video1', 100);
console.log(video1 === video3); // true, 两个实例相等

*/




function isSame(value1, value2) {
    /*判断类型*/
    if (typeof value1 !== typeof value2) {
        return false;
    }
    /*判断是否为对象*/
    if (typeof value1 === 'object') {
        if (Object.keys(value1).length !== Object.keys(value2).length) {
            return false;
        }
        for (let key in value1) {
            if (!isSame(value1[key], value2[key])) {
                return false;
            }
        }
        return true;
    }
    /*判断是否为数组*/
    if (Array.isArray(value1)) {
        if (value1.length !== value2.length) {
            return false;
        }
        for (let i = 0; i < value1.length; i++) {
            if (!isSame(value1[i], value2[i])) {
                return false;
            }
        }
        return true;
    }
    /*判断是否为其他类型*/
    return value1 === value2;
}


/*
如果Ifrebuild为true，表示每次都创建一个新的实例,如果参数不同，重新创建实例
如果Ifrebuild为false，表示只创建一个实例，如果参数不同，抛出错误
*/


export function singleton(className, Ifrebuild = false) {
    let instance = null;
    let parameters;
    return new Proxy(className, {//之所在里面不用箭头函数，是因为箭头函数没有自己的this，箭头函数的this是继承自父级
        construct(target, args) {//不用...args，因为args本身就是参数列表
            if (!instance) {
                // instance = Reflect.construct(target, args);
                instance = new className(target, ...args);//这里使用...args，是因为args是一个数组
                parameters = args;
            }
            else {
                if (Ifrebuild) {
                    if (!isSame(parameters, args)) {
                        // instance = Reflect.construct(target, args);
                        instance = new className(target, ...args);
                        parameters = args;
                    }
                }
                else {
                    if (!isSame(parameters, args)) {
                        throw new Error('Different parameters are not allowed, you cannot create a new instance');
                    }
                }
            }
            return instance;
        }
    });
}



