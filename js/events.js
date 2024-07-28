import * as creates from './creates.js';

/*
生成问候语
=======================Export===========================
selector: 选择器
selector_cover: 选择器的遮罩层
name: 名字
avatarExpand(): 头像展开
*/

function avatarExpand(selector_cover = null, name = 'Lucas', clickEvent = null) {
    const avatarCover = document.querySelector(selector_cover);
    avatarCover.addEventListener('click', function (e) {
        const avatarImg = avatarCover.querySelector('.avatar_img');
        if (!this.classList.contains('expanded')) {
            this.classList.add('expanded');
            creates.createCover('.avatar_img', '50%', 'rgba(255,255,255,0.1)', true, function (e) {
                clickEvent();
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
            const avatarName = creates.createElementWithClass('div', 'avatar_name');
            avatarName.textContent = name;
            avatarName.style.animation = 'colorChange 1s forwards';
            this.appendChild(avatarName);
            creates.createCover('.avatar_name', '0', 'rgba(255, 255, 255, 0)', false, null);
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


/* 
点击模态内容以外的部分关闭模态窗口
modalBackground: 模态背景元素
modalContent: 模态内容元素
closeModalOnClickOutside(): 点击模态背景以外的部分关闭模态窗口
*/
function closeModalOnClickOutside(modalBackground, modalContent) {
    modalBackground.addEventListener('click', function (e) {
        if (!modalContent.contains(e.target)) {
            document.body.removeChild(modalBackground);
        }
    });
}

export {
    avatarExpand,
    closeModalOnClickOutside
};
