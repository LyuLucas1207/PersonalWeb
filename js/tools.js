import * as helpers from './helpers.js';
import * as svgs from './svgs.js';
import * as createOverloads from './lib-js/createOverload.js';

/*
生成网页icon
=======================Export===========================
generateFavicon(): 生成网页icon,调用randomImgGenerator
*/
function generateFavicon(url) {
    const iconHerf = helpers.getRandomImg(1, 12, 1, 2, url, 'png');
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.type = 'image/png';
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

function generateRain(numRainDrops = 20, rangeRain_left = 25, numRainHits = 20, rangeHit_left = 25, loaderSelector = '.loader') {
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
        const cloud = helpers.elementWithClass('div', 'cloud');
        const cloudLeft = helpers.elementWithClass('div', 'cloud_left');
        const cloudRight = helpers.elementWithClass('div', 'cloud_right');
        cloud.appendChild(cloudLeft);
        cloud.appendChild(cloudRight);
        const rain = helpers.elementWithClass('div', 'rain');
        for (let i = 0; i < numRainDrops; i++) {
            const drop = helpers.elementWithClass('div', 'drop');
            drop.style.height = dropstyle_height[i];
            drop.style.top = dropstyle_top[i];
            drop.style.left = dropstyle_left[i];
            drop.style.animationDelay = animationDuration_rain[i];
            rain.appendChild(drop);
        }
        const surface = helpers.elementWithClass('div', 'surface');
        for (let j = 0; j < numRainHits; j++) {
            const hit = helpers.elementWithClass('div', 'hit');
            hit.style.left = hitstyle_left[j];
            hit.style.animationDuration = animationDuration_hit[j];
            surface.appendChild(hit);
        }
        loader.appendChild(cloud);
        loader.appendChild(rain);
        loader.appendChild(surface);
    });
}

async function checkResourcesLoaded() {
    return new Promise((resolve) => {
        window.addEventListener('load', () => {
            const images = Array.from(document.images);
            if (images.length === 0) {
                resolve();
                return;
            }
            let loadedCount = 0;
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    });
                }
            });
            if (loadedCount === images.length) {
                resolve();
            }
        });
    });
}
function minLoadTime(seconds) {
    const ms = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function showContent(loaderSelector, time = 5) {
    let loader = document.querySelector(loaderSelector);
    // 时间是time秒
    loader.style.animation = `out_from_bottom ${time}s ease-out`;
    loader.style.animationFillMode = 'forwards';

    setTimeout(() => {
        loader.style.display = 'none';
    }, time * 1000);
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
生成问候语
selector: 选择器, 选择头像元素
greeting: 问候语
greeting_model(): 问候语
=======================Export===========================
avatarExpand(): 头像展开
*/
function greeting_model(greeting, accordingToTime, showingTime, flag = 'loaderAfter') {
    if (greeting === null) return;
    const { modalBackground, modalContent } = helpers.createModalBackground(flag);
    greeting = helpers.getGreeting(greeting, accordingToTime, '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
    const greetingP = document.createElement('p');
    greetingP.textContent = greeting;
    const ButtonContainer = helpers.elementWithClass('div', 'button_container');
    const reloadButton = helpers.createButton('重新加载', function () {
        location.reload();
    });
    const BackgroundButton = helpers.createButton('切换背景', function () {
        randomImgGenerator(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
    });
    ButtonContainer.appendChild(BackgroundButton);
    ButtonContainer.appendChild(reloadButton);
    modalContent.appendChild(greetingP);
    modalContent.appendChild(ButtonContainer);
    document.body.appendChild(modalBackground);

    helpers.closeModalOnClickOutside(modalBackground, modalContent);
    setTimeout(() => {
        if (document.body.contains(modalBackground)) {
            document.body.removeChild(modalBackground);
        }
    }, showingTime * 1000);
}

function avatarExpand(selector, selector_cover = null, greeting = null, accordingToTime = false, showingTime = 3, name = 'Lucas') {
    const avatar = document.querySelector(selector);
    greeting_model(greeting, accordingToTime, showingTime, 'loaderAfter');
    if (selector_cover === null) {
        selector_cover = selector + '_cover';
    }
    const avatarCover = avatar.querySelector(selector_cover);
    avatarCover.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (!this.classList.contains('expanded')) {
            this.classList.add('expanded');
            // coverOnElement(selector, borderRadius = null, backgroundColor = 'rgba(255,255,255,0)', flagOfInnerFunction = false, executeFunction = null)
            helpers.coverOnElement('.avatar_img', '50%', 'rgba(255,255,255,0.1)', true, function (e) {
                randomImgGenerator(1, 7, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
                e.stopPropagation();
            });
        } else {
            this.classList.remove('expanded');
            const circle = avatarImg.querySelector('.circle');
            if (circle) {
                avatarImg.removeChild(circle);
            }
        }
        e.stopPropagation(); // Stop the click from propagating to avatarCover
    });

    avatarCover.addEventListener('click', function (e) {
        if (this.classList.contains('expanded')) {
            const avatarName = helpers.elementWithClass('div', 'avatar_name');
            avatarName.textContent = name;
            avatarName.style.animation = 'colorChange 1s forwards';
            this.appendChild(avatarName);
            helpers.coverOnElement('.avatar_name', '0', 'rgba(255, 255, 255, 0)', false, null);
        } else {
            const avatarName = this.querySelector('.avatar_name');
            if (avatarName) {
                this.removeChild(avatarName);
            }
        }
        e.stopPropagation(); // Stop the click from propagating to avatarCover
    });


    document.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (avatarCover.classList.contains('expanded') && !avatar.contains(e.target)) {
            avatarCover.classList.remove('expanded');
            const avatarName = avatarCover.querySelector('.avatar_name');
            if (avatarName) {
                avatarCover.removeChild(avatarName);
            }
            const circle = avatarImg.querySelector('.circle');
            if (circle) {
                avatarImg.removeChild(circle);
            }
        }
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
randomImgGenerator():配置已经生成好的检验过关的url, min和max 将会被getRandomImg使用
*/
async function randomImgGenerator(min, max, minformat = 1, maxformat = 2, category = 'body', imgUrl = './img/Background/background', format = null) {
    let selector = document.querySelector(category);
    let exitPic = false;
    let randomImg;
    do {
        randomImg = helpers.getRandomImg(min, max, minformat, maxformat, imgUrl, format);
        exitPic = await helpers.checkImage(randomImg);
    } while (!exitPic);
    selector.style.backgroundImage = `url(${randomImg})`;
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

            let star_up = helpers.elementWithClass('div', 'curved-corner-star');
            let star_down = helpers.elementWithClass('div', 'curved-corner-star');
            let star_up_right = helpers.elementWithClass('div', 'curved-corner-topright');
            let star_up_left = helpers.elementWithClass('div', 'curved-corner-topleft');
            let star_down_right = helpers.elementWithClass('div', 'curved-corner-bottomright');
            let star_down_left = helpers.elementWithClass('div', 'curved-corner-bottomleft');

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
function generateStar(num, range, selector) {
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


function generateTimeCard(selector) {
    function updateClock(timeCard) {
        const format24Hour = Math.random() < 0.5; // Randomly choose 24-hour or 12-hour format
        const { timeString, ampm } = helpers.getCurrentTime(format24Hour);
        const dayText = helpers.getCurrentDay();
        const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18; // Determine if it's day or night
        const svgIcon = isDayTime ? svgs.generateSVG('sun') : svgs.generateSVG('moon');

        // Clear the existing content in the timeCard
        timeCard.innerHTML = '';

        // Create and append the time display
        const timeTextP = helpers.elementWithClass('p', 'time-text');
        timeTextP.textContent = timeString + (ampm ? ' ' + ampm : '');
        timeCard.appendChild(timeTextP);

        // Create and append the day display
        const dayTextP = helpers.elementWithClass('p', 'day-text');
        dayTextP.textContent = dayText;
        timeCard.appendChild(dayTextP);

        // Append the appropriate SVG icon
        timeCard.appendChild(svgIcon);
    }
    // Find all elements matching the selector and setup clocks for each
    document.querySelectorAll(selector).forEach(timeCard => {
        if (!timeCard) return;
        updateClock(timeCard); // Update clock immediately for initialization
        setInterval(() => updateClock(timeCard), 1000); // Set to update every second
    });
}

export {
    /*favicon*/
    generateFavicon,
    /*loader*/
    generateRain,
    checkResourcesLoaded,
    showContent,
    minLoadTime,
    /*background-color*/
    generateRandomBackgroundColor,
    /*avatar*/
    avatarExpand,
    /*background*/
    randomImgGenerator,
    /*star*/
    generateStar,
    /*time card*/
    generateTimeCard,
    /*generateElements*/
};