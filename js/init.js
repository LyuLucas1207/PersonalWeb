import * as tools from './tools.js';
import Elements from './generates.js';

// Generate various elements and functionalities
const fn1 = () => Elements.generateElements('rain', '.loader', 20, 30, 20, 30);
const fn2 = () => Elements.generateElements('favicon', './img/Icon/icon', 'image/png');
const fn3 = () => Elements.generateElements('star', '.section-banner', 25, 100);
const fn4 = () => Elements.generateElements('timeCard', '.time_card');
const fn5 = () => Elements.generateElements('backgroundColor', '.center_inner_content_container', true, false, 255, 255, 255, null, null, null, 0.1, 0.6);

function wrappedFunctions(...fns) {
    return fns;
}

// Function to add tasks to the microtask queue and wait for all to complete
function addMicrotask(fns) {
    return Promise.all(fns.map(fn => fn()));
}

document.addEventListener('DOMContentLoaded', async function () {
    const fnList = wrappedFunctions(fn1, fn2, fn3, fn4, fn5);
    // Execute all function definitions once DOM is fully loaded，await will wait for all tasks to complete
    await addMicrotask(fnList);

    tools.avatarExpand('.avatar', '.avatar_cover', "尊敬的访客！", true, 30);
   
    const minLoadTime = tools.minLoadTime(1); // Set minimum load time
    const resourcesLoaded = tools.checkResourcesLoaded();
    await Promise.all([minLoadTime, resourcesLoaded]); // Ensure all resources are loaded
    tools.showContent('.loader', 3); // Show content after loading
});
