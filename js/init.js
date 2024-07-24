import * as tools from './tools.js';
import Elements from './generates.js';

document.addEventListener('DOMContentLoaded', async function () {
    Elements.generateElements('rain', '.loader', 20, 30, 20, 30);
    Elements.generateElements('favicon', './img/Icon/icon', 'image/png');
    Elements.generateElements('star', '.section-banner', 25, 100);
    Elements.generateElements('timeCard', '.time_card');
    Elements.generateElements('backgroundColor', '.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);
    //generateElements.generateElements('backgroundColor', '.center_inner_content_container', false, false, null, null, null, 0, 255, 0, 1);
    tools.avatarExpand('.avatar', '.avatar_cover', "尊敬的访客！", true, 30);
   
    const minLoadTime = tools.minLoadTime(1); // 5 seconds minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]);
    tools.showContent('.loader', 3);
});

