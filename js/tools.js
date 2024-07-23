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
selector: 选择器, 选择头像元素
greeting: 问候语
greeting_model(): 问候语
=======================Export===========================
avatarExpand(): 头像展开
*/
function greeting_model(greeting, accordingToTime, showingTime, flag = 'loaderAfter') {
    if (greeting === null) return;
    const { modalBackground, modalContent } = helpers.createModalBackground(flag);
    greeting = helpers.getGreeting(greeting, accordingToTime, '日出金山，早上好！', '日中繁花，中午好！', '日落西山，晚上好！', '夜幕降临，深夜好！');
    const greetingP = document.createElement('p');
    greetingP.textContent = greeting;
    const ButtonContainer = helpers.elementWithClass('div', 'button_container');
    const reloadButton = helpers.createButton('重新加载', function () {
        location.reload();
    });
    const BackgroundButton = helpers.createButton('切换背景', function () {
        randomImgGenerator(1, 13, 1, 2, 'body', './img/Background/background', 'jpg');
    });
    ButtonContainer.appendChild(BackgroundButton);
    ButtonContainer.appendChild(reloadButton);
    modalContent.appendChild(greetingP);
    modalContent.appendChild(ButtonContainer);
    document.body.appendChild(modalBackground);

    helpers.closeModalOnClickOutside(modalBackground, modalContent);
    setTimeout(() => {
        if (document.body.contains(modalBackground)) {
            document.body.removeChild(modalBackground);
        }
    }, showingTime * 1000);
}

function avatarExpand(selector, selector_cover = null, greeting = null, accordingToTime = false, showingTime = 3, name = 'Lucas') {
    const avatar = document.querySelector(selector);
    greeting_model(greeting, accordingToTime, showingTime, 'loaderAfter');
    if (selector_cover === null) {
        selector_cover = selector + '_cover';
    }
    const avatarCover = avatar.querySelector(selector_cover);
    avatarCover.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (!this.classList.contains('expanded')) {
            this.classList.add('expanded');
            // coverOnElement(selector, borderRadius = null, backgroundColor = 'rgba(255,255,255,0)', flagOfInnerFunction = false, executeFunction = null)
            helpers.coverOnElement('.avatar_img', '50%', 'rgba(255,255,255,0.1)', true, function (e) {
                randomImgGenerator(1, 7, 1, 2, '.avatar_img', './img/Avatar/avatar', 'jpg');
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
            const avatarName = helpers.elementWithClass('div', 'avatar_name');
            avatarName.textContent = name;
            avatarName.style.animation = 'colorChange 1s forwards';
            this.appendChild(avatarName);
            helpers.coverOnElement('.avatar_name', '0', 'rgba(255, 255, 255, 0)', false, null);
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
        if (avatarCover.classList.contains('expanded') && !avatar.contains(e.target)) {
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

/*
随机生成图片
min: 图片最小编号
max: 图片最大编号
minformat - maxformagt: 图片格式总类（1为png, 2为jpg, 3为webp, 4为jpeg, 5为svg)
fotmat: 图片格式
category: 可能的值有 标签，class, id, 以及其他的选择器
=======================Export===========================
randomImgGenerator():配置已经生成好的检验过关的url, min和max 将会被getRandomImg使用
*/
async function randomImgGenerator(min, max, minformat = 1, maxformat = 2, category = 'body', imgUrl = './img/Background/background', format = null) {
    let selector = document.querySelector(category);
    let exitPic = false;
    let randomImg;
    do {
        randomImg = helpers.getRandomImg(min, max, minformat, maxformat, imgUrl, format);
        exitPic = await helpers.checkImage(randomImg);
    } while (!exitPic);
    selector.style.backgroundImage = `url(${randomImg})`;
}

export {
    checkResourcesLoaded,
    showContent,
    minLoadTime,
    /*avatar*/
    avatarExpand,
    /*background*/
    randomImgGenerator
};