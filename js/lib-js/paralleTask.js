/*
实现并发执行任务的功能
@params {Function[]} tasks - 任务列表,任务列表实际上是一个函数列表，并不是单一一个函数
@params {Number} limit - 并发数
*/

function paralleTask(tasks, limit = 5) {
    return new Promise((resolve, reject) => {
        if(tasks.length === 0) {
            resolve();
            return;
        }
        let next = 0;
        let completed = 0;
        function next() {
            const task = tasks[next++];//next++表示先取值再自增
            task().then(() => {
                completed++;
                if(next < tasks.length) {
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

export {paralleTask};