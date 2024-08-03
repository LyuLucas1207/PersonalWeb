import * as helpers from './helpers.js';
import * as svgs from './svgs.js';
import * as events from './events.js';
import * as creates from './creates.js';
import { singleton } from './lib-js/singleton.js';
import { debounce } from './lib-js/debounce.js';
import { Favicon, Rain, RandomBackgroundColor, Star, Time, GreetingModel, WaveSet } from './generatesClass.js';

/*
生成网页icon
=======================Export===========================
generateFavicon(): 生成网页icon,调用randomImgGenerator
*/
function generateFavicon(FaviconClass) {
    if (FaviconClass instanceof Favicon) {
        const iconHerf = helpers.getRandomImg(1, FaviconClass.IconNum, 1, 2, FaviconClass.Url, FaviconClass.Format);
        const favicon = document.querySelector('link[rel="icon"]');
        favicon.type = FaviconClass.Type;
        if (favicon === null) return;
        favicon.href = iconHerf;
    } else {
        throw new Error('This is not Favicon Class');
    }
}

/*
生成加载动画
=======================Export===========================
generateRain(): 初始化加载动画
*/
function generateRain(RainClass) {
    if (!(RainClass instanceof Rain)) throw new Error('This is not Rain Class');
    if (!document.querySelector(RainClass.Selector)) return;
    document.querySelectorAll(RainClass.Selector).forEach(loader => {
        let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
        let dropstyle_height = [];
        let dropstyle_top = [];
        let dropstyle_left = [];
        let hitstyle_left = [];
        let animationDuration_rain = [];
        let animationDuration_hit = [];
        for (let i = 0; i < RainClass.NumRainDrops; i++) {
            dropstyle_height.push(Math.floor(Math.random() * 2 + 1) + unit);
            dropstyle_top.push(Math.floor(Math.random() * 2) + unit);
            dropstyle_left.push(Math.floor(Math.random() * RainClass.RangeRainLeft) + unit);
            animationDuration_rain.push(Math.floor(-Math.random() * 5) + 's');/*from 0s to -5s, animation-delay*/
        }
        for (let i = 0; i < RainClass.NumRainHits; i++) {
            hitstyle_left.push(Math.floor(Math.random() * RainClass.RangeHitLeft) + unit);
            animationDuration_hit.push(Math.floor(-Math.random() * 1) + 's');
        }
        const rain_cloud = creates.createElementWithClass('div', 'rain_cloud');
        const rain_cloudLeft = creates.createElementWithClass('div', 'rain_cloud_left');
        const rain_cloudRight = creates.createElementWithClass('div', 'rain_cloud_right');
        rain_cloud.appendChild(rain_cloudLeft);
        rain_cloud.appendChild(rain_cloudRight);
        const rain = creates.createElementWithClass('div', 'rain');
        for (let i = 0; i < RainClass.NumRainDrops; i++) {
            const drop = creates.createElementWithClass('div', 'drop');
            drop.style.height = dropstyle_height[i];
            drop.style.top = dropstyle_top[i];
            drop.style.left = dropstyle_left[i];
            drop.style.animationDelay = animationDuration_rain[i];
            rain.appendChild(drop);
        }
        const surface = creates.createElementWithClass('div', 'surface');
        for (let j = 0; j < RainClass.NumRainHits; j++) {
            const hit = creates.createElementWithClass('div', 'hit');
            hit.style.left = hitstyle_left[j];
            hit.style.animationDuration = animationDuration_hit[j];
            surface.appendChild(hit);
        }
        loader.appendChild(rain_cloud);
        loader.appendChild(rain);
        loader.appendChild(surface);
    });
}

/*
对选择器生成随机background-color
=======================Export===========================
generateRandomBackgroundColor(): 生成随机background-color
*/
function generateRandomBackgroundColor(RandomBackgroundColorClass) {
    if (!(RandomBackgroundColorClass instanceof RandomBackgroundColor)) throw new Error('This is not RandomBackgroundColor Class');
    let randomColor_r = RandomBackgroundColorClass.ColorR === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorR, RandomBackgroundColorClass.ColorR, false);
    let randomColor_g = RandomBackgroundColorClass.ColorG === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorG, RandomBackgroundColorClass.ColorG, false);
    let randomColor_b = RandomBackgroundColorClass.ColorB === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorB, RandomBackgroundColorClass.ColorB, false);
    let randomOpacity = RandomBackgroundColorClass.Opacity === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinOpacity, RandomBackgroundColorClass.MaxOpacity, true) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.Opacity, RandomBackgroundColorClass.Opacity, true);
    document.querySelectorAll(RandomBackgroundColorClass.Selector).forEach((element) => {
        if (!RandomBackgroundColorClass.FlagOpacity) {
            randomOpacity = helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinOpacity, RandomBackgroundColorClass.MaxOpacity, true);
        }
        if (!RandomBackgroundColorClass.FlagSame) {
            randomColor_r = RandomBackgroundColorClass.ColorR === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorR, RandomBackgroundColorClass.ColorR, false);
            randomColor_g = RandomBackgroundColorClass.ColorG === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorG, RandomBackgroundColorClass.ColorG, false);
            randomColor_b = RandomBackgroundColorClass.ColorB === null ? helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.MinColor, RandomBackgroundColorClass.MaxColor, false) : helpers.getRandom_T_Opacity_F_Color(RandomBackgroundColorClass.ColorB, RandomBackgroundColorClass.ColorB, false);
        }
        element.style.backgroundColor = `rgba(${randomColor_r},${randomColor_g},${randomColor_b},${randomOpacity})`;
    });
}

/*
随机生成地球周围星星
=======================Export===========================
generateStar(): 用于判断刷新页面时重新生成星星
*/
function createStar(StarClass) {
    if (!(StarClass instanceof Star)) throw new Error('This is not Star Class');
    document.querySelectorAll(StarClass.Selector).forEach((sectionBanner) => {
        let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
        let position = helpers.getRandomPosition(StarClass.num, unit, StarClass.Range);
        for (let i = 0; i < StarClass.num; i++) {
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
function generateStar(StarClass) {
    createStar(StarClass);
    window.addEventListener('resize', debounce(function () {
        let sectionBanner = document.querySelector(StarClass.Selector);
        while (sectionBanner.firstChild) {
            sectionBanner.removeChild(sectionBanner.firstChild);
        }
        createStar(StarClass);
    }));
}

/*
创建时间卡片
format24Hour: 是否使用24小时制, 如果是false, 将会使用12小时制
=======================Export===========================
generateTimeCard: 创建时间卡片
*/
function generateTimeCard(TimeClass) {
    if (!(TimeClass instanceof Time)) throw new Error('This is not Time Class');
    function updateClock(timeCard) {
        const format24Hour = Math.random() < 0.5; // Randomly choose 24-hour or 12-hour format
        const { timeString, ampm } = helpers.getCurrentTime(format24Hour);
        const dayText = helpers.getCurrentDay();
        const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18; // Determine if it's day or night
        const svgIcon = isDayTime ? svgs.generateSVG('sun') : svgs.generateSVG('moon');// Clear the existing content in the timeCard
        timeCard.textContent = '';// Create and append the time display
        const timeTextP = creates.createElementWithClass('p', 'time-text');
        // timeTextP.textContent = timeString + (ampm ? ' ' + ampm : '');
        timeTextP.textContent = timeString;
        if (ampm) {
            const ampmText = creates.createElementWithClass('span', 'time-sub-text');
            ampmText.textContent = ampm;
            timeTextP.appendChild(ampmText);
        }
        timeCard.appendChild(timeTextP);// Create and append the day display
        const dayTextP = creates.createElementWithClass('p', 'day-text');
        dayTextP.textContent = dayText;
        timeCard.appendChild(dayTextP);// Append the appropriate SVG icon
        timeCard.appendChild(svgIcon);
    }// Find all elements matching the selector and setup clocks for each
    document.querySelectorAll(TimeClass.Selector).forEach(timeCard => {
        if (!timeCard) return;
        updateClock(timeCard); // Update clock immediately for initialization
        setInterval(() => {
            updateClock(timeCard);
            if (TimeClass.fn) TimeClass.fn();
        }, 1000); // Set to update every second
    });
}

/*
生成问候语
generateGreetingModel（）: 生成问候语模态框
*/
function generateGreetingModel(GreetingModelClass) {
    if (!(GreetingModelClass instanceof GreetingModel)) throw new Error('This is not GreetingModel Class');
    if (GreetingModelClass.Greeting === null) return;
    const { modalBackground, modalContent } = creates.createModalBackground(GreetingModelClass.Flag);
    let greetingThing;
    if (typeof GreetingModelClass.Greeting === 'function') {
        greetingThing = GreetingModelClass.Greeting();// 如果greeting是一个函数，则调用函数
    } else if (typeof GreetingModelClass.Greeting === 'string') {
        if (GreetingModelClass.AccordingToTime) {
            greetingThing = helpers.getGreeting(GreetingModelClass.Greeting, GreetingModelClass.AccordingToTime, '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
        } else {
            greetingThing = GreetingModelClass.Greeting;
        }
    } else {
        throw new Error('greeting must be a function or a string');
    }
    const greetingP = document.createElement('p');
    greetingP.textContent = greetingThing;
    const ButtonContainer = creates.createElementWithClass('div', 'button_container');

    if (GreetingModelClass.ButtonName.length === 0) { // 如果没有按钮，则不生成按钮
        document.body.appendChild(modalBackground);
        modalContent.appendChild(greetingP);
        document.body.appendChild(modalBackground);
        return;
    } else { // 如果有按钮，则生成对应数量名字的按钮以及应用对应...buttonFunction中的函数
        for (let i = 0; i < GreetingModelClass.ButtonName.length; i++) {
            const BackgroundButton = creates.createButton(GreetingModelClass.ButtonName[i], function () {
                GreetingModelClass.ButtonFunction[i]();
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
    }, GreetingModelClass.ShowingTime * 1000);
}

/*
生成海浪背景
selector: 选择器, 选择海浪生成的位置
waveNum: 海浪数量
buttonfn: 按钮点击事件处理函数
WaveSet.ButtonName: 按钮文本
WaveSet.Str: p标签文本
generateWave(): 生成海浪
*/
function generateWave(WaveSetClass) {
    if (!(WaveSetClass instanceof WaveSet)) throw new Error('This is not WaveSet Class');
    let buttonNameLength = WaveSetClass.ButtonName.length;
    let buttonfnLength = WaveSetClass.ButtonFunction.length;
    let strLength = WaveSetClass.Str.length;

    let buttonNameCount = 0;
    let buttonfnCount = 0;
    let strCount = 0;

    document.querySelectorAll(WaveSetClass.Selector).forEach((waveContainer) => {
        let waveTop = []; /*random from 100% to 200%*/
        let waveDuration = []; /*random from 1000ms to 5000ms*/
        let waveWidth = []; /*150% to 200%*/
        let waveHeight = []; /*200% to 300%*/
        let waveOpacity = []; /*0.1 to 0.8*/
        let waveBorderRadius = []; /*30% to 50%*/
        for (let i = 0; i < WaveSetClass.WaveNum; i++) {
            waveTop.push(Math.floor(Math.random() * 100 + 100) + '%');/*random from 100% to 200%*/
            waveDuration.push(Math.floor(Math.random() * 4000 + 1000) + 'ms');/*random from 1000ms to 5000ms*/
            waveWidth.push(Math.floor(Math.random() * 50 + 150) + '%');/*150% to 200%*/
            waveHeight.push(Math.floor(Math.random() * 100 + 200) + '%');/*200% to 300%*/
            waveOpacity.push(Math.floor(Math.random() * 7 + 1) / 10);/*0.1 to 0.8*/
            waveBorderRadius.push(Math.floor(Math.random() * 20 + 30) + '%');/*30% to 50%*/
        }
        waveWidth[0] = '200%';
        waveHeight[0] = '300%';

        for (let i = 0; i < WaveSetClass.WaveNum; i++) {
            let wave = creates.createElementWithClass('div', 'wave');
            wave.id = `wave-${i}`;
            if (i !== 0) {
                wave.style.top = waveTop[i];
                wave.style.animationDuration = waveDuration[i];
            }
            wave.style.width = waveWidth[i];
            wave.style.height = waveHeight[i];
            wave.style.opacity = waveOpacity[i];
            wave.style.borderRadius = waveBorderRadius[i];
            waveContainer.appendChild(wave);
        }

        if (buttonNameCount < buttonNameLength || buttonfnCount < buttonfnLength || strCount < strLength) {
            const infotop = creates.createElementWithClass('div', 'infotop');
            if (buttonNameLength !== 0) {
                const button = creates.createButton(WaveSetClass.ButtonName[buttonNameCount], WaveSetClass.ButtonFunction[buttonfnCount]);
                infotop.appendChild(button);
                buttonNameCount++;
                buttonfnCount++;
            }
            if (strLength !== 0) {
                const p = document.createElement('p');
                p.textContent = WaveSetClass.Str[strCount];
                infotop.appendChild(p);
                strCount++;
            }
            waveContainer.appendChild(infotop);
        }
    });
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
addMethod(Elements, 'wave', generateWave);

export default Elements;