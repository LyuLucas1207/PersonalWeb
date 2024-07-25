/*
实现包装函数，将函数列表中的函数包装成异步函数
@params ...fns {Function[]} - 函数列表
@return {Function[]} - 包装后的async函数列表
*/
function wrappedFunctions(...fns) {
    if (!fns.length) {
        return;
    }
    /*判断是否是函数*/
    if (!fns.every(fn => typeof fn === 'function')) {
        throw new Error('All items in the list must be functions');
    }
    fns = fns.map(fn => {
        return async () => {
            await fn();
        }
    });
    return fns;
}

/*
将函数列表中的函数添加到微任务队列中，并等待所有函数执行完成
@params fns {Function[]} - 函数列表
@return {Promise}
*/
function addMicrotask(fns) {
    return new Promise((resolve) => {
        fns.forEach(fn => {
            queueMicrotask(fn);
        });
        queueMicrotask(resolve);
    }); //如果你需要函数几乎同时开始并快速连续执行，且不需要处理函数返回的异步结果，使用 queueMicrotask。

    // return Promise.all(fns.map(fn => fn())); //如果你需要并行执行多个异步函数，并处理它们的完成或失败状态，使用 Promise.all。
    // return fns.reduce((promise, fn) => promise.then(() => fn()), Promise.resolve());//如果函数执行有严格的顺序要求，需要前一个完成后才能开始下一个，使用 Promise 链方法。
}


/*
实现并发执行任务的功能
@params {Function[]} tasks - 任务列表,任务列表实际上是一个函数列表，并不是单一一个函数
@params {Number} limit - 并发数
@return {Promise}
*/

function parallelTask(tasks, limit = 5) {
    return new Promise((resolve, reject) => {
        if(tasks.length === 0) {
            resolve();
            return;
        }
        let nextTask = 0;
        let completed = 0;
        function next() {
            const task = tasks[nextTask++];//next++表示先取值再自增
            task().then(() => {
                completed++;
                if(nextTask < tasks.length) {
                    next();
                } else if(completed === tasks.length) {
                    resolve();
                } else {
                    return;
                }
            }).catch(reject);
        }
        for(let i = 0; i < limit && i < tasks.length; i++) {
            next();
        }
    });
}

export {
    wrappedFunctions,
    addMicrotask,
    parallelTask
};