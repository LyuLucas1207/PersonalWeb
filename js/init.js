import * as tools from './tools.js';

document.addEventListener('DOMContentLoaded', async function () {
    tools.initializeLoader(20, 30, 20, 30);
    tools.generateFavicon('./img/Icon/icon');
    tools.generateRandomBackgroundColor('.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);
    // tools.generateRandomBackgroundColor('.center_inner_content_container', false, false, null, null, null, 0, 255, 0, 1);
    tools.avatarExpand('.avatar', '.avatar_cover', "尊敬的访客！", true, 30);
    tools.randomImgGenerator(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
    tools.randomImgGenerator(1, 7, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
    tools.controlStar(25, 100, '.section-banner');
    tools.createTimeCard('.time_card');
    const minLoadTime = tools.minLoadTime(1); // 5 seconds minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]);
    tools.showContent('.loader', 3);
});

