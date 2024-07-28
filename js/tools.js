import * as helpers from './helpers.js';

async function checkResourcesLoaded() {
    return new Promise((resolve) => {
        window.addEventListener('load', () => {
            const images = Array.from(document.images);
            if (images.length === 0) {
                resolve();
                return;
            }
            let loadedCount = 0;
            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    });
                }
            });
            if (loadedCount === images.length) {
                resolve();
            }
        });
    });
}
function minLoadTime(seconds) {
    const ms = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function showContent(loaderSelector, time = 5) {
    let loader = document.querySelector(loaderSelector);
    // 时间是time秒
    loader.style.animation = `out_from_bottom ${time}s ease-out`;
    loader.style.animationFillMode = 'forwards';

    setTimeout(() => {
        loader.style.display = 'none';
    }, time * 1000);
}

/*
生成问候语
=======================Export===========================
selector: 选择器
selector_cover: 选择器的遮罩层
name: 名字
avatarExpand(): 头像展开
*/

function avatarExpand(selector_cover = null, name = 'Lucas') {
    helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
    const avatarCover = document.querySelector(selector_cover);
    avatarCover.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (!this.classList.contains('expanded')) {
            this.classList.add('expanded');
            helpers.createCover('.avatar_img', '50%', 'rgba(255,255,255,0.1)', true, function (e) {
                helpers.getRandomImgUrl(1, 30, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
                e.stopPropagation();
            });
        } else {
            this.classList.remove('expanded');
            const circle = avatarImg.querySelector('.circle');
            if (circle) {
                avatarImg.removeChild(circle);
            }
        }
        e.stopPropagation(); // Stop the click from propagating to avatarCover
    });

    avatarCover.addEventListener('click', function (e) {
        if (this.classList.contains('expanded')) {
            const avatarName = helpers.createElementWithClass('div', 'avatar_name');
            avatarName.textContent = name;
            avatarName.style.animation = 'colorChange 1s forwards';
            this.appendChild(avatarName);
            helpers.createCover('.avatar_name', '0', 'rgba(255, 255, 255, 0)', false, null);
        } else {
            const avatarName = this.querySelector('.avatar_name');
            if (avatarName) {
                this.removeChild(avatarName);
            }
        }
        e.stopPropagation(); // Stop the click from propagating to avatarCover
    });


    document.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (avatarCover.classList.contains('expanded') && !avatarCover.contains(e.target)) {
            avatarCover.classList.remove('expanded');
            const avatarName = avatarCover.querySelector('.avatar_name');
            if (avatarName) {
                avatarCover.removeChild(avatarName);
            }
            const circle = avatarImg.querySelector('.circle');
            if (circle) {
                avatarImg.removeChild(circle);
            }
        }
    });
}



export {
    checkResourcesLoaded,
    showContent,
    minLoadTime,
    /*avatar*/
    avatarExpand,
};