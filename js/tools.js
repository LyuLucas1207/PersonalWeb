// Autor: LucasLyu

/*
随机生成背景图片
min: 背景图片最小编号
max: 背景图片最大编号
minformat: 背景图片格式最小编号
maxformat: 背景图片格式最大编号
generateRandomBackground: 将会随机生成图片url
checkImage: 会检测生成的url是否有效，里面使用异步方法调用需要使用await
=======================Export===========================
randomBackgroundGenerator,配置已经生成好的检验过关的url, min和max 将会被generateRandomBackground使用
*/
function generateRandomBackground(min, max, minformat, maxformat) {
  let randomformat = Math.floor(Math.random() * (maxformat - minformat + 1)) + minformat;
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomformat === 1) {
    return './img/Background/background_' + randomNum + '.png';
  } else if (randomformat === 2) {
    return './img/Background/background_' + randomNum + '.jpg';
  } else {
    return './img/Background/background_1.png';
  }
}

function checkImage(src) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
}

async function randomBackgroundGenerator(min, max) {
  let body = document.querySelector('body');
  let exitPic = false;
  let randomBackground;
  let minformat = 1;
  let maxformat = 2;

  do {
    randomBackground = generateRandomBackground(min, max, minformat, maxformat);
    exitPic = await checkImage(randomBackground);
  } while (!exitPic);

  body.style.backgroundImage = 'url(' + randomBackground + ')';
}

/*
随机生成地球周围星星
num: 星星数量, 
unit: 星星单位, 
range: 星星范围
generateStarPosition: 生成星星位置, 随机数字范围为-range/2到range/2
generateStar: 生成星星, 生成星星div, 生成星星div两个子div, 一个上半部分，一个下半部分，每个子div有两个圆角
=======================Export===========================
selector: 选择器, 选择星星生成的位置
controlStar: 用于判断刷新页面时重新生成星星
*/

function generateStarPosition(num, unit, range) {
  let position = [];
  for (let i = 0; i < num; i++) {
    let left = Math.floor(Math.random() * range - range / 2);
    let top = Math.floor(Math.random() * range - range / 2);
    position.push({
      left: `${left}${unit}`,
      top: `${top}${unit}`
    });
  }
  return position;
}

function generateStar(num, range) {
  let sectionBanner = document.querySelector('.section-banner');
  let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
  let position = generateStarPosition(num, unit, range);

  for (let i = 0; i < num; i++) {
    let starDiv = document.createElement('div');
    starDiv.id = `star-${i}`;
    starDiv.style.position = 'absolute';
    // Fallback values
    starDiv.style.left = position[i].left;
    starDiv.style.top = position[i].top;
    starDiv.style.left = `calc(50% + ${position[i].left})`;
    starDiv.style.top = `calc(50% + ${position[i].top})`;
    /*generate random twinkling time from 1 to 5*/
    starDiv.style.animation = `twinkling ${Math.floor(Math.random() * 5 + 1)}s infinite`;

    let star_up = document.createElement('div');
    star_up.className = 'curved-corner-star';
    let star_down = document.createElement('div');
    star_down.className = 'curved-corner-star';
    let star_up_right = document.createElement('div');
    star_up_right.className = 'curved-corner-topright';
    let star_up_left = document.createElement('div');
    star_up_left.className = 'curved-corner-topleft';
    let star_down_right = document.createElement('div');
    star_down_right.className = 'curved-corner-bottomright';
    let star_down_left = document.createElement('div');
    star_down_left.className = 'curved-corner-bottomleft';

    star_up.appendChild(star_up_right);
    star_up.appendChild(star_up_left);
    star_down.appendChild(star_down_right);
    star_down.appendChild(star_down_left);

    starDiv.appendChild(star_down);
    starDiv.appendChild(star_up);
    sectionBanner.appendChild(starDiv);
  }
}

function controlStar(num, range, selector) {
  generateStar(num, range);
  window.addEventListener('resize', function () {
    let sectionBanner = document.querySelector(selector);
    while (sectionBanner.firstChild) {
      sectionBanner.removeChild(sectionBanner.firstChild);
    }
    generateStar(num, range);
  });
}
export {
  randomBackgroundGenerator, controlStar
};