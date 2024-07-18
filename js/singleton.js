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




export function singleton(className) {
    let instance = null;
    let parameters;
    return new Proxy(className, {
        construct(target, args) {
            if (!instance) {
                instance = Reflect.construct(target, ...args);
                //instance = new className(target, ...args);
                parameters = args;
            }
            // else {
            //         if (!isSame(parameters, args)) {
            //                 instance = Reflect.construct(target, ...args);
            //                 //instance = new className(target, ...args);
            //                 parameters = args;
            //         }
            // }//如果参数不同，重新创建实例
            if (!isSame(parameters, args)) {
                throw new Error('Different parameters are not allowed, you cannot create a new instance');
            }//如果参数不同，重新创建实例
            return instance;

        }
    });
}
