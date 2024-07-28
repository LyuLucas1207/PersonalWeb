import * as helpers from './helpers.js';
import * as svgs from './svgs.js';
import * as events from './events.js';
import * as creates from './creates.js';
import { singleton } from './lib-js/singleton.js';

/*
生成网页icon
=======================Export===========================
generateFavicon(): 生成网页icon,调用randomImgGenerator
*/
function generateFavicon(url, type) {
    const iconHerf = helpers.getRandomImg(1, 12, 1, 2, url, 'png');
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.type = type;
    if (favicon === null) return;
    favicon.href = iconHerf;
}

/*
生成加载动画
=======================Export===========================
numRainDrops: 雨滴数量
rangeRain_left: 雨滴左右范围
numRainHits: 雨滴击中数量
rangeHit_left: 雨滴击中左右范围
generateRain(): 初始化加载动画
checkResourcesLoaded(): 检查资源是否加载完成
seconds: 最小加载时间
minLoadTime(): 最小加载时间
loaderSelector: 加载动画选择器
time: 动画时间
showContent(): 显示内容
*/
function generateRain(loaderSelector = '.loader', numRainDrops = 20, rangeRain_left = 25, numRainHits = 20, rangeHit_left = 25) {
    if (!document.querySelector(loaderSelector)) return;
    document.querySelectorAll(loaderSelector).forEach(loader => {
        let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
        let dropstyle_height = [];
        let dropstyle_top = [];
        let dropstyle_left = [];
        let hitstyle_left = [];
        let animationDuration_rain = [];
        let animationDuration_hit = [];
        for (let i = 0; i < numRainDrops; i++) {
            dropstyle_height.push(Math.floor(Math.random() * 2 + 1) + unit);
            dropstyle_top.push(Math.floor(Math.random() * 2) + unit);
            dropstyle_left.push(Math.floor(Math.random() * rangeRain_left) + unit);
            animationDuration_rain.push(Math.floor(-Math.random() * 5) + 's');/*from 0s to -5s, animation-delay*/
        }
        for (let i = 0; i < numRainHits; i++) {
            hitstyle_left.push(Math.floor(Math.random() * rangeHit_left) + unit);
            animationDuration_hit.push(Math.floor(-Math.random() * 1) + 's');
        }
        const cloud = creates.createElementWithClass('div', 'cloud');
        const cloudLeft = creates.createElementWithClass('div', 'cloud_left');
        const cloudRight = creates.createElementWithClass('div', 'cloud_right');
        cloud.appendChild(cloudLeft);
        cloud.appendChild(cloudRight);
        const rain = creates.createElementWithClass('div', 'rain');
        for (let i = 0; i < numRainDrops; i++) {
            const drop = creates.createElementWithClass('div', 'drop');
            drop.style.height = dropstyle_height[i];
            drop.style.top = dropstyle_top[i];
            drop.style.left = dropstyle_left[i];
            drop.style.animationDelay = animationDuration_rain[i];
            rain.appendChild(drop);
        }
        const surface = creates.createElementWithClass('div', 'surface');
        for (let j = 0; j < numRainHits; j++) {
            const hit = creates.createElementWithClass('div', 'hit');
            hit.style.left = hitstyle_left[j];
            hit.style.animationDuration = animationDuration_hit[j];
            surface.appendChild(hit);
        }
        loader.appendChild(cloud);
        loader.appendChild(rain);
        loader.appendChild(surface);
    });
}

/*
对选择器生成随机background-color
selector: 选择器
flag_same:统一设置相同颜色还是循环设置不同颜色 true为统一设置相同颜色，false为循环设置不同颜色
false:如果颜色或者透明度有数值，则循环时某个值不会发生变化，
        如果颜色或者透明度为null，则循环时某个值会发生变化
true:如果颜色或者透明度有数值，则统一设置时某个值不会发生变化，
        如果颜色或者透明度为null，则统一设置时某个值会发生变化
flag_opacity: 统一设置相同透明度还是循环设置不同透明度 true为统一设置相同透明度，false为循环设置不同透明度
color_r: 颜色r值
color_g: 颜色g值
color_b: 颜色b值
opacity: 透明度
min_color: 颜色最小值
max_color: 颜色最大值
min_opacity: 透明度最小值
max_opacity: 透明度最大值
generateRandomBackgroundColor(): 生成随机background-color
*/
function generateRandomBackgroundColor(selector, flag_same = true, flag_opacity = true, color_r = null, color_g = null, color_b = null, opacity = null, min_color = 0, max_color = 255, min_opacity = 0, max_opacity = 1) {
    let randomColor_r = color_r === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_r, color_r, false);
    let randomColor_g = color_g === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_g, color_g, false);
    let randomColor_b = color_b === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_b, color_b, false);
    let randomOpacity = opacity === null ? helpers.getRandom_T_Opacity_F_Color(min_opacity, max_opacity, true) : helpers.getRandom_T_Opacity_F_Color(opacity, opacity, true);
    document.querySelectorAll(selector).forEach((element) => {
        if (!flag_opacity) { /*循环设置不同透明度*/
            randomOpacity = helpers.getRandom_T_Opacity_F_Color(min_opacity, max_opacity, true);
        }
        if (!flag_same) {/*循环设置不同颜色*/
            randomColor_r = color_r === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_r, color_r, false);
            randomColor_g = color_g === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_g, color_g, false);
            randomColor_b = color_b === null ? helpers.getRandom_T_Opacity_F_Color(min_color, max_color, false) : helpers.getRandom_T_Opacity_F_Color(color_b, color_b, false);
        }
        element.style.backgroundColor = `rgba(${randomColor_r},${randomColor_g},${randomColor_b},${randomOpacity})`;
    });
}

/*
随机生成地球周围星星
num: 星星数量, 
range: 星星范围,
selector: 选择器
createStar: 生成星星, 生成星星div, 生成星星div两个子div, 一个上半部分，一个下半部分，每个子div有两个圆角
=======================Export===========================
selector: 选择器, 选择星星生成的位置
generateStar: 用于判断刷新页面时重新生成星星
*/
function createStar(num, range, selector) {
    document.querySelectorAll(selector).forEach((sectionBanner) => {
        let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
        let position = helpers.getRandomPosition(num, unit, range);
        for (let i = 0; i < num; i++) {
            let starDiv = document.createElement('div');
            starDiv.id = `star-${i}`;
            starDiv.style.position = 'absolute';
            starDiv.style.transform = `translate(-50%, -50%)`;
            starDiv.style.left = position[i].left;// Fallback values
            starDiv.style.top = position[i].top;
            starDiv.style.left = `calc(50% + ${position[i].left})`;
            starDiv.style.top = `calc(50% + ${position[i].top})`;
            starDiv.style.animation = `twinkling ${Math.floor(Math.random() * 5 + 1)}s infinite`;

            let star_up = creates.createElementWithClass('div', 'curved-corner-star');
            let star_down = creates.createElementWithClass('div', 'curved-corner-star');
            let star_up_right = creates.createElementWithClass('div', 'curved-corner-topright');
            let star_up_left = creates.createElementWithClass('div', 'curved-corner-topleft');
            let star_down_right = creates.createElementWithClass('div', 'curved-corner-bottomright');
            let star_down_left = creates.createElementWithClass('div', 'curved-corner-bottomleft');

            star_up.appendChild(star_up_right);
            star_up.appendChild(star_up_left);
            star_down.appendChild(star_down_right);
            star_down.appendChild(star_down_left);
            starDiv.appendChild(star_down);
            starDiv.appendChild(star_up);
            sectionBanner.appendChild(starDiv);
        }
    });

}
function generateStar(selector, num, range) {
    createStar(num, range, selector);
    window.addEventListener('resize', function () {
        let sectionBanner = document.querySelector(selector);
        while (sectionBanner.firstChild) {
            sectionBanner.removeChild(sectionBanner.firstChild);
        }
        createStar(num, range);
    });
}

/*
创建时间卡片
format24Hour: 是否使用24小时制, 如果是false, 将会使用12小时制
=======================Export===========================
generateTimeCard: 创建时间卡片
*/
function generateTimeCard(selector, fn = null) {
    function updateClock(timeCard) {
        const format24Hour = Math.random() < 0.5; // Randomly choose 24-hour or 12-hour format
        const { timeString, ampm } = helpers.getCurrentTime(format24Hour);
        const dayText = helpers.getCurrentDay();
        const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18; // Determine if it's day or night
        const svgIcon = isDayTime ? svgs.generateSVG('sun') : svgs.generateSVG('moon');

        // Clear the existing content in the timeCard
        timeCard.textContent = '';

        // Create and append the time display
        const timeTextP = creates.createElementWithClass('p', 'time-text');
        timeTextP.textContent = timeString + (ampm ? ' ' + ampm : '');
        timeCard.appendChild(timeTextP);

        // Create and append the day display
        const dayTextP = creates.createElementWithClass('p', 'day-text');
        dayTextP.textContent = dayText;
        timeCard.appendChild(dayTextP);

        // Append the appropriate SVG icon
        timeCard.appendChild(svgIcon);
    }
    // Find all elements matching the selector and setup clocks for each
    document.querySelectorAll(selector).forEach(timeCard => {
        if (!timeCard) return;
        updateClock(timeCard); // Update clock immediately for initialization
        setInterval(() => {
            updateClock(timeCard);
            if (fn) fn();
        }, 1000); // Set to update every second
    });

}

/*
生成问候语
selector: 选择器, 选择头像元素
greeting: 问候语
accordingToTime: 是否根据时间生成问候语
showingTime: 显示时间
flag: 标志，用于生成模态框
generateGreetingModel（）: 生成问候语模态框
*/
function generateGreetingModel(flag = 'loaderAfter', accordingToTime, showingTime, greeting = null, buttonName = [], ...buttonFunction) {
    if (greeting === null) return;
    const { modalBackground, modalContent } = creates.createModalBackground(flag);
    let greetingThing;
    if (typeof greeting === 'function') {
        greetingThing = greeting();// 如果greeting是一个函数，则调用函数
    } else if (typeof greeting === 'string') {
        if (accordingToTime) {
            greetingThing = helpers.getGreeting(greeting, accordingToTime, '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
        } else {
            greetingThing = greeting;
        }
    } else {
        throw new Error('greeting must be a function or a string');
    }

    const greetingP = document.createElement('p');
    greetingP.textContent = greetingThing;
    const ButtonContainer = creates.createElementWithClass('div', 'button_container');

    if (buttonName.length === 0) { // 如果没有按钮，则不生成按钮
        document.body.appendChild(modalBackground);
        modalContent.appendChild(greetingP);
        document.body.appendChild(modalBackground);
        return;
    } else { // 如果有按钮，则生成对应数量名字的按钮以及应用对应...buttonFunction中的函数
        for (let i = 0; i < buttonName.length; i++) {
            const BackgroundButton = creates.createButton(buttonName[i], function () {
                buttonFunction[i]();
            });
            ButtonContainer.appendChild(BackgroundButton);
        }
    }
        
    modalContent.appendChild(greetingP);
    modalContent.appendChild(ButtonContainer);
    document.body.appendChild(modalBackground);

    events.closeModalOnClickOutside(modalBackground, modalContent);
    setTimeout(() => {
        if (document.body.contains(modalBackground)) {
            document.body.removeChild(modalBackground);
        }
    }, showingTime * 1000);
}



/*
导出固定class的生成元素
只能通过generateElements方法调用，单例模式防止多次实例化
*/

class GenerateElements {
    constructor() {
        this.generateElementsMap = new Map();
    }

    // Public method to generate elements
    generateElements(name, ...args) {
        const fn = this.generateElementsMap.get(name);
        if (fn) {
            return fn.apply(this, args);
        }
        throw new Error('No matching function');
    }
}

function addMethod(instance, name, fn) {
    if (typeof fn !== 'function' || !fn) {
        throw new Error('The last parameter must be a function');
    }
    instance.generateElementsMap.set(name, fn);
}

const GEs = new GenerateElements();
const Elements = singleton(GEs);
addMethod(Elements, 'favicon', generateFavicon);
addMethod(Elements, 'rain', generateRain);
addMethod(Elements, 'backgroundColor', generateRandomBackgroundColor);
addMethod(Elements, 'star', generateStar);
addMethod(Elements, 'timeCard', generateTimeCard);
addMethod(Elements, 'greeting', generateGreetingModel);

export default Elements;