/*函数重载*/
/*实现思路：创建一个函数，该函数接受任意数量的参数，根据参数的类型，调用不同的函数*/
/*如何使用
import createOverload from './createOverload.js';
const searchUser = createOverload();
searchUser.addMethod(() => {
    console.log('check all users');
});

searchUser(); // check all users

const searchPage = (page, pageSize = 10) => {
    console.log(`check page ${page} with pageSize ${pageSize}`);
}
searchUser.addMethod('number', searchPage);
searchUser(1); // check page 1 with pageSize 10

searchUser.addMethod('string', (name) => {
    console.log(`search user ${name}`);
});

searchUser.addMethod('string', 'number', (name, age) => {
    console.log(`search user ${name} with age ${age}`);
});


searchUser('Tom'); // search user Tom
searchUser('Tom', 18); // search user Tom with age 18
*/

function createOverload() {
    const parameterMap = new Map();
    function overload(...args) {
        // const types = args.map(arg => {
        //     return typeof arg;
        // });
        // const fn = parameterMap.get(types.join(','));
        const key = args.map(arg => typeof arg).join(',');
        const fn = parameterMap.get(key);
        if (fn) {
            return fn.apply(this, args);
        }
        throw new Error('No matching function');
    }
    overload.addMethod = function (...args) {
        const fn = args.pop();
        if (typeof fn !== 'function' || !fn) {
            throw new Error('The last parameter must be a function');
        }
        const types = args;
        /*实现参数列表，例如：
        参数列表1： 函数1；
        参数列表2： 函数2；
        参数列表3： 函数3；
        */
        parameterMap.set(types.join(','), fn);
    }
    return overload;
}

export default createOverload;




