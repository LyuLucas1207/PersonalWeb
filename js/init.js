import * as tools from './tools.js';
import * as events from './events.js';
import * as parallels from './lib-js/parallelTask.js';
import * as helpers from './helpers.js';

import Elements from './generates.js';
import { Favicon, Rain, RandomBackgroundColor, Star, Time } from './generatesClass.js';


const favicon = new Favicon('./img/Icon/icon', 'image/png', 'png', 12);
const rain = new Rain('.loader', 20, 30, 20, 30);
const randomBackgroundColor = new RandomBackgroundColor('.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);
const star = new Star('.section-banner', 125, 100);
const time = new Time('.time_card', () => {
    helpers.getRandomImgUrl(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
});

// Generate various elements and functionalities
const fn1 = () => Elements.generateElements('rain', rain);
const fn2 = () => Elements.generateElements('favicon', favicon);
const fn3 = () => Elements.generateElements('star', star);
const fn4 = () => Elements.generateElements('timeCard', time);
const fn5 = () => Elements.generateElements('wave', '.wave_container', 5, ["切换背景", "切换头像"], [() => {
    helpers.getRandomImgUrl(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
},
() => {
    helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
}
],
    ["WorldV"]);
const fn6 = () => Elements.generateElements('backgroundColor', randomBackgroundColor);
const fn7 = () => Elements.generateElements('greeting', 'loaderAfter', true, 30,
    () => {
        return helpers.getGreeting("尊敬的访客", '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
    },
    ["重新加载", "切换背景", "切换头像"],
    () => {
        location.reload();
    },
    () => {
        helpers.getRandomImgUrl(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
    },
    () => {
        helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
    }
);

document.addEventListener('DOMContentLoaded', async function () {
    helpers.getRandomImgUrl(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
    helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
    const fnList = parallels.wrappedFunctions(fn1, fn2, fn3, fn4, fn5, fn6, fn7);
    // Execute all function definitions once DOM is fully loaded，await will wait for all tasks to complete
    await parallels.addMicrotask('Microtask', fnList);

    await Promise.all([
        tools.minLoadTime(1), // Set minimum load time
        tools.checkResourcesLoaded() // Ensure all resources are loaded
    ]).then(() => {
        tools.showContent('.loader', 3); // Show content after loading
    });

    events.avatarExpand('.avatar_cover', "Lucas", () => {
        helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
    });
});
