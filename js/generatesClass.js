/*
url:图片所在位置
type:ico的格式
format:所运用的图片级格式，设置成null表示随机
iconNum:图片集数量
*/

class Favicon {
    url = './img/Icon/icon';
    type = 'image/png';
    format = 'png';
    iconNum = 12;
    constructor(url, type, format, iconNum) {
        this.url = url;
        this.type = type;
        this.format = format;
        this.iconNum = iconNum;
    }
    get Url(){
        return this.url;
    }
    get Type(){
        return this.type;
    }
    get Format(){
        return this.format;
    }
    get IconNum(){
        return this.iconNum;
    }
}

/*
numRainDrops: 雨滴数量
rangeRain_left: 雨滴左右范围
numRainHits: 雨滴击中数量
rangeHit_left: 雨滴击中左右范围
*/
class Rain {
    selector = '.loader';
    numRainDrops = 20;
    rangeRain_left = 25;
    numRainHits = 20;
    rangeHit_left = 25;

    constructor(selector, numRainDrops, rangeRain_left, numRainHits, rangeHit_left) {
        this.selector = selector;
        this.numRainDrops = numRainDrops;
        this.rangeRain_left = rangeRain_left;
        this.numRainHits = numRainHits;
        this.rangeHit_left = rangeHit_left;
    }
    get Selector() {
        return this.selector;
    }
    get NumRainDrops() {
        return this.numRainDrops;
    }
    get RangeRainLeft() {
        return this.rangeRain_left;
    }
    get NumRainHits() {
        return this.numRainHits;
    }
    get RangeHitLeft() {
        return this.rangeHit_left;
    }
}

/*
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
*/
class RandomBackgroundColor{
    selector = null;
    flag_same = true;
    flag_opacity = true;
    color_r = null;
    color_g = null; 
    color_b = null; 
    opacity = null; 
    min_color = 0;
    max_color = 255; 
    min_opacity = 0; 
    max_opacity = 1;
    constructor (selector, flag_same, flag_opacity, color_r, color_g, color_b, opacity, min_color, max_color, min_opacity, max_opacity){
        this.selector = selector;
        this.flag_same = flag_same;
        this.flag_opacity = flag_opacity;
        this.color_r = color_r;
        this.color_g = color_g;
        this.color_b = color_b;
        this.opacity = opacity;
        this.min_color = min_color;
        this.max_color = max_color;
        this.min_opacity = min_opacity;
        this.max_opacity = max_opacity;
    }
    get Selector() {
        return this.selector;
    }
    get FlagSame() {
        return this.flag_same;
    }
    get FlagOpacity() {
        return this.flag_opacity;
    }
    get ColorR() {
        return this.color_r;
    }
    get ColorG() {
        return this.color_g;
    }
    get ColorB() {
        return this.color_b;
    }
    get Opacity() {
        return this.opacity;
    }
    get MinColor() {
        return this.min_color;
    }
    get MaxColor() {
        return this.max_color;
    }
    get MinOpacity() {
        return this.min_opacity;
    }
    get MaxOpacity() {
        return this.max_opacity;
    }
}

/*
selector: 选择器
num: 星星数量
range: 星星范围
*/

class Star{
    selector = '.section-banner';
    num = 125;
    range = 100;
    constructor(selector, num, range){
        this.selector = selector;
        this.num = num;
        this.range = range;
    }
    get Selector() {
        return this.selector;
    }
    get Num() {
        return this.num;
    }
    get Range() {
        return this.range;
    }
}

/*
selector: 选择器
fn: 函数
*/

class Time {
    selector = '.time_card';
    fn = null;
    constructor(selector, fn){
        this.selector = selector;
        this.fn = fn;
    }
    get Selector() {
        return this.selector;
    }
    get Fn() {
        return this.fn;
    }
}

/*
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

*/

class GreetingModel{
    
}



export { Favicon, Rain, RandomBackgroundColor, Star, Time};

