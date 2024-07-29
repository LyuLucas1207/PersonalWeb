/*
duration:延迟时间
func:需要防抖的函数

debounce():返回一个新的函数,
*/


function debounce(func, duration = 1000){
    let timeId;//记录上一次的定时器
    return function(...args){ //传入剩余参数
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            func(...args);
        }, duration);
    };
}

export {
    debounce
}