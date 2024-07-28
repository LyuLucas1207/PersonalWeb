/* 
创建一个按钮并添加事件监听器
text: 按钮文本
onClickHandler: 按钮点击事件处理函数
createButton(): 返回一个按钮元素
Example:
const reloadButton = createButton('重新加载', function () {
location.reload();
});
*/
function createButton(text, onClickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClickHandler);
    return button;
}

/*
创建一个指定类型和类名的元素
elementType: 元素类型
className: 元素类名
createElementWithClass(): 返回一个指定类型和类名的元素
Example: const cloud = createElementWithClass('div', 'cloud');
*/
function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

/* 
创建模态窗口的背景和内容元素
flag: 用于区分不同的模态窗口：${flag}_modal-background, ${flag}_modal-content
createModalBackground(): 返回模态背景和内容元素
*/
function createModalBackground(flag) {
    const modalBackground = document.createElement('div');
    modalBackground.className = `${flag}_modal-background`;
    const modalContent = document.createElement('div');
    modalContent.className = `${flag}_modal-content`;
    modalBackground.appendChild(modalContent);
    return { modalBackground, modalContent };
}

/*
绘制透明circle
selector: 选择器,选择需要在某个元素上绘制circle
borderRadius: circle的border-radius
flagOfInnerFunction: 如果是true表示执行内部addEventListner中executeFunction的函数，如果是false表示执行不用addEventListner的函数
executeFunction: 执行函数
backgroundColor: circle的背景颜色
createCover(): 绘制透明circle
*/

function createCover(selector, borderRadius = null, backgroundColor = 'rgba(255,255,255,0)', flagOfInnerFunction = false, executeFunction = null) {
    const element = document.querySelector(selector);
    const circle = createElementWithClass('div', 'circle');
    circle.style.width = `${element.offsetWidth}px`;
    circle.style.height = `${element.offsetHeight}px`;
    circle.style.position = 'absolute';
    // circle.style.borderRadius = borderRadius;
    if (borderRadius === null) {
        circle.style.borderRadius = element.offsetHeight > element.offsetWidth ? `${element.offsetWidth / 2}px` : `${element.offsetHeight / 2}px`;
    } else {
        circle.style.borderRadius = borderRadius;
    }
    circle.style.backgroundColor = backgroundColor;
    element.appendChild(circle);
    if (flagOfInnerFunction) {
        circle.addEventListener('click', executeFunction);
    }
}







export {
    createButton,
    createElementWithClass,
    createModalBackground,
    createCover
}