/*
生成随机透明度或者随机颜色
min: 透明度最小值
max: 透明度最大值
flag: 是否生成随机透明度，true表示生成随机透明度，false表示生成随机颜色
    如果为true,则返回一个随机透明度，min和max从0到1之间
    如果为false,则返回一个随机颜色，min和max从0到255之间
getRandom_T_Opacity_F_Color(): 返回一个随机透明度或者随机颜色
*/

function getRandom_T_Opacity_F_Color(min, max, flag = false) {
    if (flag) {
        return Math.random() * (max - min) + min; /*最大范围从0到1之间，其中包括0但不包括1*/
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min; /*返回min到max之间的随机整数,最大范围从0到255之间，包括0和255*/
    }
}





/*
生成随机图片
minformat: 图片格式最小编号
maxformat: 图片格式最大编号
url: 图片分类文件夹路径
format: 图片格式
getRandomImg(): 生成随机图片url
*/
function getRandomImg(min, max, minformat = 1, maxformat = 2, url = './img/Background/background', format = null) {
    let randomformat = Math.floor(Math.random() * (maxformat - minformat + 1)) + minformat;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    if (format === 'jpg' || format === 'png' || format === 'jpeg' || format === 'webp' || format === 'gif' || format === 'svg' || format === 'bmp' || format === 'ico') {
        return `${url}` + `_` + `${randomNum}.${format}`;
    } else {
        if (randomformat === 1) {
            return `${url}` + `_` + `${randomNum}.jpg`;
        } else if (randomformat === 2) {
            return `${url}` + `_` + `${randomNum}.png`;
        } else {
            return `${url}` + `_` + `${1}.jpg`;
        }
    }
}
/*
  检查图片是否加载成功
  src: 图片url
  checkImage(): 返回一个promise对象，resolve为true表示图片加载成功，resolve为false表示图片加载失败
*/
function checkImage(src) {
    return new Promise((resolve) => {
        let img = new Image();
        img.onload = function () {
            resolve(true);
        };
        img.onerror = function () {
            resolve(false);
        };
        img.src = src;
    });
}

/*
随机生成图片
min: 图片最小编号
max: 图片最大编号
minformat - maxformagt: 图片格式总类（1为png, 2为jpg, 3为webp, 4为jpeg, 5为svg)
fotmat: 图片格式
category: 可能的值有 标签，class, id, 以及其他的选择器
=======================Export===========================
getRandomImgUrl():配置已经生成好的检验过关的url, min和max 将会被getRandomImg使用
*/
async function getRandomImgUrl(min, max, minformat = 1, maxformat = 2, category = 'body', imgUrl = './img/Background/background', format = null) {
    let selector = document.querySelector(category);
    let exitPic = false;
    let randomImg;
    do {
        randomImg = getRandomImg(min, max, minformat, maxformat, imgUrl, format);
        console.log(randomImg);
        exitPic = await checkImage(randomImg);
    } while (!exitPic);
    selector.style.backgroundImage = `url(${randomImg})`;
}

/*
生成随机位置
num: 生成随机位置的个数
unit: 位置单位
range: 位置范围,例如range=100,则值在-50到50之间
getRandomPosition(): 返回一个包含num个随机位置的数组，每个位置包含left,top,right,bottom四个属性
*/
function getRandomPosition(num, unit, range) {
    let position = [];
    for (let i = 0; i < num; i++) {
        let left = Math.floor(Math.random() * range - range / 2);
        let top = Math.floor(Math.random() * range - range / 2);
        let right = Math.floor(Math.random() * range - range / 2);
        let bottom = Math.floor(Math.random() * range - range / 2);
        position.push({
            left: `${left}${unit}`,
            top: `${top}${unit}`,
            right: `${right}${unit}`,
            bottom: `${bottom}${unit}`
        });
    }
    return position;
}

/* 
创建一个按钮并添加事件监听器
text: 按钮文本
onClickHandler: 按钮点击事件处理函数
createButton(): 返回一个按钮元素
Example:
const reloadButton = createButton('重新加载', function () {
location.reload();
});
*/
function createButton(text, onClickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClickHandler);
    return button;
}

/*
创建一个指定类型和类名的元素
elementType: 元素类型
className: 元素类名
elementWithClass(): 返回一个指定类型和类名的元素
Example: const cloud = elementWithClass('div', 'cloud');
*/
function elementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}


/* 
点击模态内容以外的部分关闭模态窗口
modalBackground: 模态背景元素
modalContent: 模态内容元素
closeModalOnClickOutside(): 点击模态背景以外的部分关闭模态窗口
*/
function closeModalOnClickOutside(modalBackground, modalContent) {
    modalBackground.addEventListener('click', function (e) {
        if (!modalContent.contains(e.target)) {
            document.body.removeChild(modalBackground);
        }
    });
}


/* 
创建模态窗口的背景和内容元素
flag: 用于区分不同的模态窗口：${flag}_modal-background, ${flag}_modal-content
createModalBackground(): 返回模态背景和内容元素
*/
function createModalBackground(flag) {
    const modalBackground = document.createElement('div');
    modalBackground.className = `${flag}_modal-background`;
    const modalContent = document.createElement('div');
    modalContent.className = `${flag}_modal-content`;
    modalBackground.appendChild(modalContent);
    return { modalBackground, modalContent };
}

/* 
根据时间和条件生成问候语
greeting: 问候语
accordingToTime: 是否根据时间生成问候语
getGreeting(): 返回问候语
*/
function getGreeting(greeting, accordingToTime = true, morning = '早上好', afternoon = '下午好', evening = '晚上好', night = '深夜好') {
    if (accordingToTime) {
        const currentTime = new Date();
        const hour = currentTime.getHours();
        if (hour < 6) return night + greeting;
        if (hour < 12) return morning + greeting;
        if (hour < 18) return afternoon + greeting;
        return evening + greeting;
    }
    return greeting;
}

/*
获取当前时间
format24Hour: 是否使用24小时制,false表示使用12小时制,true表示使用24小时制
getCurrentTime(): 返回当前时间
*/
function getCurrentTime(format24Hour) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';

    if (!format24Hour) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        /*重写getCurrentTime*/
        getCurrentTime = function (format24Hour) {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            let ampm = '';

            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            const timeString = `${hours}:${minutes}:${seconds}`;
            return { timeString, ampm };
        }
    } else {
        getCurrentTime = function (format24Hour) {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            let ampm = '';

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            const timeString = `${hours}:${minutes}:${seconds}`;
            return { timeString, ampm };
        }
    }
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    return { timeString, ampm };
}

/*
获取当前日期
getCurrentDay(): 返回当前日期,s使用localeDateString()方法
*/
function getCurrentDay() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    /* weekday: long => Monday, short => Mon, narrow => M
      * year: numeric => 2012, 2-digit => 12
      * month: long => January, short => Jan, narrow => J
      * day: numeric => 2-digit => 02
      */
    return now.toLocaleDateString('en-US', options);
}

/*
绘制透明circle
selector: 选择器,选择需要在某个元素上绘制circle
borderRadius: circle的border-radius
flagOfInnerFunction: 如果是true表示执行内部addEventListner中executeFunction的函数，如果是false表示执行不用addEventListner的函数
executeFunction: 执行函数
backgroundColor: circle的背景颜色
coverOnElement(): 绘制透明circle
*/

function coverOnElement(selector, borderRadius = null, backgroundColor = 'rgba(255,255,255,0)', flagOfInnerFunction = false, executeFunction = null) {
    const element = document.querySelector(selector);
    const circle = elementWithClass('div', 'circle');
    circle.style.width = `${element.offsetWidth}px`;
    circle.style.height = `${element.offsetHeight}px`;
    circle.style.position = 'absolute';
    // circle.style.borderRadius = borderRadius;
    if (borderRadius === null) {
        circle.style.borderRadius = element.offsetHeight > element.offsetWidth ? `${element.offsetWidth / 2}px` : `${element.offsetHeight / 2}px`;
    } else {
        circle.style.borderRadius = borderRadius;
    }
    circle.style.backgroundColor = backgroundColor;
    element.appendChild(circle);
    if (flagOfInnerFunction) {
        circle.addEventListener('click', executeFunction);
    }
}


export {
    getRandom_T_Opacity_F_Color,
    getRandomImg,
    getRandomImgUrl,
    getRandomPosition,
    checkImage,
    createButton,
    elementWithClass,
    closeModalOnClickOutside,
    createModalBackground,
    getGreeting,
    getCurrentTime,
    getCurrentDay,
    coverOnElement
};