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
*/
class RandomBackgroundImage{
    selector = null;
    min = 1;
    max = 13;
    minformat = 1;
    maxformat = 2;
    url = './img/Background/background';
    format = 'jpg';
    constructor(selector, min, max, minformat, maxformat, url, format){
        this.selector = selector;
        this.min = min;
        this.max = max;
        this.minformat = minformat;
        this.maxformat = maxformat;
        this.url = url;
        this.format = format;
    }
    get Selector() {
        return this.selector;
    }
    get Min() {
        return this.min;
    }
    get Max() {
        return this.max;
    }
    get Minformat() {
        return this.minformat;
    }
    get Maxformat() {
        return this.maxformat;
    }
    get Url() {
        return this.url;
    }
    get Format() {
        return this.format;
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
flag: 标志, 用于生成对应class的model
accordingToTime: 根据时间显示
showingTime: 显示时间
greeting: 问候语, 可以是函数
buttonName: 按钮名字
buttonFunction: 按钮功能
*/

class GreetingModel{
    flag = 'loaderAfter';
    accordingToTime = null;
    showingTime = 30;
    greeting = null;
    buttonName = [];
    buttonFunction = [];
    constructor(flag, accordingToTime, showingTime, greeting, buttonName, buttonFunction){
        this.flag = flag;
        this.accordingToTime = accordingToTime;
        this.showingTime = showingTime;
        this.greeting = greeting;
        this.buttonName = buttonName;
        this.buttonFunction = buttonFunction;
    }
    get Flag() {
        return this.flag;
    }
    get AccordingToTime() {
        return this.accordingToTime;
    }
    get ShowingTime() {
        return this.showingTime;
    }
    get Greeting() {
        return this.greeting;
    }
    get ButtonName() {
        return this.buttonName;
    }
    get ButtonFunction() {
        return this.buttonFunction;
    }
}

/*
selector: 选择器
waveNum: 波浪数量
buttonName: 按钮名字
buttonFunction: 按钮功能
str: 字符串,用于底下文字
*/
class WaveSet {
    selector = '.wave_container';
    waveNum = 5;
    buttonName = [];
    buttonFunction = [];
    str = [];
    constructor(selector, waveNum, buttonName, buttonFunction, str){
        this.selector = selector;
        this.waveNum = waveNum;
        this.buttonName = buttonName;
        this.buttonFunction = buttonFunction;
        this.str = str;
    }
    get Selector() {
        return this.selector;
    }
    get WaveNum() {
        return this.waveNum;
    }
    get ButtonName() {
        return this.buttonName;
    }
    get ButtonFunction() {
        return this.buttonFunction;
    }
    get Str() {
        return this.str;
    }
}



export { Favicon, Rain, RandomBackgroundColor, RandomBackgroundImage ,Star, Time, GreetingModel, WaveSet };

