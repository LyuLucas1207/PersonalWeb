import * as tools from './tools.js';

document.addEventListener('DOMContentLoaded', async function() {
    tools.initializeLoader(20, 30,20, 30);
    tools.randomBackgroundGenerator(1, 12);
    tools.controlStar(25, 100, '.section-banner');
    tools.createTimeCard('.time_card');
    const minLoadTime = tools.minLoadTime(1); // 5 seconds minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]);
    tools.showContent('.loader',3);
});
