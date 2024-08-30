import * as tools from './tools.js';
import * as events from './events.js';
import * as parallels from './lib-js/parallelTask.js';
import * as helpers from './helpers.js';

import Elements from './generates.js';
import {
    Favicon,
    GreetingModel,
    Rain,
    RandomBackgroundColor,
    RandomBackgroundImage,
    Star,
    Time,
    WaveSet
} from './generatesClass.js';

// Generate various elements and functionalities
const fn1 = () => Elements.generateElements('rain', rain);
const fn2 = () => Elements.generateElements('favicon', favicon);
const fn3 = () => Elements.generateElements('star', star);
const fn4 = () => Elements.generateElements('timeCard', time);
const fn5 = () => Elements.generateElements('wave', wave);
const fn6 = () => Elements.generateElements('backgroundColor', randomBackgroundColor);
const fn7 = () => Elements.generateElements('greeting', greeting);
const fn8 = () => Elements.generateElements('backgroundImage', background_body);
const fn9 = () => Elements.generateElements('backgroundImage', avatar_img);

const favicon = new Favicon('./img/Icon/icon', 'image/png', 'png', 12);
const rain = new Rain('.loader', 20, 30, 20, 30);
const randomBackgroundColor = new RandomBackgroundColor('.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);
const star = new Star('.section-banner', 125, 150);
const time = new Time('.time_card', () => {
});
const greeting = new GreetingModel('loaderAfter', false, 30,
    () => {
        return helpers.getGreeting("尊敬的访客", '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
    },
    ["重新加载", "切换背景", "切换头像"], [() => {
        location.reload();
    }, fn8, fn9]);

const wave = new WaveSet('.wave_container', 5, ["切换背景", "切换头像"], [fn8, fn9], ["WorldV"]);
const background_body = new RandomBackgroundImage('body', 1, 13, 1, 2, './img/Background/background', 'jpg');
const avatar_img = new RandomBackgroundImage('.avatar_img', 1, 30, 1, 2, './img/Avatar/avatar', 'jpg');


document.addEventListener('DOMContentLoaded', async function () {
    const fnList = parallels.wrappedFunctions(fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9);
    // Execute all function definitions once DOM is fully loaded，await will wait for all tasks to complete
    await parallels.addMicrotask('Microtask', fnList);

    await Promise.all([
        tools.minLoadTime(1), // Set minimum load time
        tools.checkResourcesLoaded() // Ensure all resources are loaded
    ]).then(() => {
        tools.showContent('.loader', 3); // Show content after loading
    });

    events.avatarExpand('.avatar_cover', "Lucas", fn9);
});
