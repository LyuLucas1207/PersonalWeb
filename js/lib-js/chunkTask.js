/*
    这个函数是用来处理大量数据的，将大量数据分成小块，然后在空闲时间执行
    datas: 数据
    consumer: 消费者函数


    使用方法：
    const btn = document.getElementById('btn');
    const datas = new Array(1000).fill(0).map((item, index) => index);
    btn.onclick = function(){
    const consumer = (task, index) => { //index是可选的
        const div = document.createElement('div');
        div.textContent = task;
        document.body.appendChild(div);
    };
    performChunk(datas, consumer);
    };

    const btn = document.getElementById('btn');
    btn.onclick = function(){
    const consumer = (task, index) => { //index是可选的
        const div = document.createElement('div');
        div.textContent = index;
        document.body.appendChild(div);
    };
    const chunkSplitor = (task) => {
        setTimeout(() => {
            task(
                (time) => {
                    return time < 16; //毫秒，浏览器每秒刷新60次，16毫秒刷新一次
                );
        }, 300);
    }

    performChunk(10000, consumer, chunkSplitor);

    };
*/




function performChunk(datas, consumer, chunkSplitor = null) {
    if (typeof datas === 'number') {
        datas = new Array(datas);
    }
    if (!datas || datas.length === 0) {
        return;
    }
    let index = 0;
    function executes() {
        if (index === datas.length) {
            return;
        }
        if (chunkSplitor === null || typeof chunkSplitor !== 'function') {
            requestIdleCallback((idle) => {
                while (idle.timeRemaining() > 0 && index < datas.length) {
                    const task = datas[index];
                    consumer(task, index);
                    index++;
                }
                executes();
            });
        } else {
            chunkSplitor((hasTime) => {
                const now = Date.now();
                while (hasTime(Date.now() - now) && index < datas.length) {
                    const task = datas[index];
                    consumer(task, index);
                    index++;
                }
                executes();
            });
        }
    }
    executes();
}

export {
    performChunk
}