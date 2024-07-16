import * as tools from './tools.js';

document.addEventListener('DOMContentLoaded', async function() {
    tools.initializeLoader(20, 30,20, 30);
    //(selector, selector_cover = null, greeting = null, accordingToTime = false, showingTime = 3)
    tools.avatarExpand('.avatar', '.avatar_cover', "亲爱的吕先生，欢迎您！", true, 10);
    tools.randomBackgroundGenerator(1, 12);
    tools.controlStar(25, 100, '.section-banner');
    tools.createTimeCard('.time_card');
    const minLoadTime = tools.minLoadTime(1); // 5 seconds minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]);
    tools.showContent('.loader',3);
});

