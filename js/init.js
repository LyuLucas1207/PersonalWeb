import * as tools from './tools.js';
import Elements from './generates.js';
import * as parallels from './lib-js/parallelTask.js';
import * as helpers from './helpers.js';

// Generate various elements and functionalities
const fn1 = () => Elements.generateElements('rain', '.loader', 20, 30, 20, 30);
const fn2 = () => Elements.generateElements('favicon', './img/Icon/icon', 'image/png');
const fn3 = () => Elements.generateElements('star', '.section-banner', 25, 100);
const fn4 = () => Elements.generateElements('timeCard', '.time_card');
const fn5 = () => Elements.generateElements('backgroundColor', '.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);
const fn6 = () => Elements.generateElements('greeting', 'loaderAfter', true, 30, () => {
    return helpers.getGreeting("尊敬的访客", '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
});

/*
    or 
    const fn = () => helpers.getGreeting("尊敬的访客", true, '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
    const fn6 = () => Elements.generateElements('greeting', 'loaderAfter', true, 30, fn);
*/

document.addEventListener('DOMContentLoaded', async function () {
    const fnList = parallels.wrappedFunctions(fn1, fn2, fn3, fn4, fn5, fn6);
    // Execute all function definitions once DOM is fully loaded，await will wait for all tasks to complete
    await parallels.addMicrotask(1, fnList);
    tools.avatarExpand('.avatar_cover', "Lucas");
    const minLoadTime = tools.minLoadTime(1); // Set minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]); // Ensure all resources are loaded
    tools.showContent('.loader', 3); // Show content after loading
});
