// Autor: LucasLyu

/*
生成加载动画
elementType: 生成元素类型
className: 生成元素类名
createRain: 生成雨滴元素
=======================Export===========================
numRainDrops: 雨滴数量
rangeRain_left: 雨滴左右范围
numRainHits: 雨滴击中数量
rangeHit_left: 雨滴击中左右范围
initializeLoader: 初始化加载动画
checkResourcesLoaded: 检查资源是否加载完成
seconds: 最小加载时间
minLoadTime: 最小加载时间
loaderSelector: 加载动画选择器
time: 动画时间
showContent: 显示内容
*/

function createRain(elementType, className) {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}
function initializeLoader(numRainDrops = 20, rangeRain_left = 25, numRainHits = 20, rangeHit_left = 25) {
  if (!document.querySelector('.loader')) return;
  let unit = window.innerWidth > 1000 ? 'vh' : 'vw';
  let dropstyle_height = [];
  let dropstyle_top = [];
  let dropstyle_left = [];
  let hitstyle_left = [];
  /*from 0s to -5s, animation-delay*/
  let animationDuration_rain = [];
  let animationDuration_hit = [];
  for(let i = 0; i < numRainDrops; i++) {
    dropstyle_height.push(Math.floor(Math.random() * 2 + 1) + unit);
    dropstyle_top.push(Math.floor(Math.random() * 2) + unit);
    dropstyle_left.push(Math.floor(Math.random() * rangeRain_left) + unit);
    animationDuration_rain.push(Math.floor(-Math.random() * 5) + 's');
  }

  for(let i = 0; i < numRainHits; i++) {
    hitstyle_left.push(Math.floor(Math.random() * rangeHit_left) + unit);
    animationDuration_hit.push(Math.floor(-Math.random() * 1) + 's');
  }
  const loader = document.querySelector('.loader');

  const cloud = createRain('div', 'cloud');
  const cloudLeft = createRain('div', 'cloud_left');
  const cloudRight = createRain('div', 'cloud_right');
  cloud.appendChild(cloudLeft);
  cloud.appendChild(cloudRight);

  const rain = createRain('div', 'rain');
  for (let i = 0; i < numRainDrops; i++) {
      const drop = createRain('div', 'drop');
      drop.style.height = dropstyle_height[i];
      drop.style.top = dropstyle_top[i];
      drop.style.left = dropstyle_left[i];
      drop.style.animationDelay = animationDuration_rain[i];
      rain.appendChild(drop);
  }


  const surface = createRain('div', 'surface');
  for (let j = 0; j < numRainHits; j++) {
      const hit = createRain('div', 'hit');
      hit.style.left = hitstyle_left[j];
      hit.style.animationDuration = animationDuration_hit[j];
      surface.appendChild(hit);
  }


  loader.appendChild(cloud);
  loader.appendChild(rain);
  loader.appendChild(surface);
}
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
  /* transition: opacity time ease-out; */
  // document.querySelector(loaderSelector).style.display = 'none';
  //add animation @keyframes out_from_bottom

  let loader = document.querySelector(loaderSelector);
  // 时间是time秒
  loader.style.animation = `out_from_bottom ${time}s ease-out`;
  loader.style.animationFillMode = 'forwards';

  setTimeout(() => {
    loader.style.display = 'none';

  }
  , time * 1000);


}


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
    img.onload = function () {
      resolve(true);
    };
    img.onerror = function () {
      resolve(false);
    };
    img.src = src;
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

/*
创建时间卡片
format24Hour: 是否使用24小时制, 如果是false, 将会使用12小时制
getCurrentTime: 获取当前时间
getCurrentDay: 获取当前日期
generateSunSVG: 生成太阳svg
generateMoonSVG: 生成月亮svg
=======================Export===========================
createTimeCard: 创建时间卡片
*/

function getCurrentTime(format24Hour) {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = '';

  if (!format24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    /*重写getCurrentTime*/
    getCurrentTime = function (format24Hour){
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let ampm = '';

      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const timeString = `${hours}:${minutes}:${seconds}`;
      return { timeString, ampm };
    }
  } else {
    getCurrentTime = function (format24Hour){
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let ampm = '';

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const timeString = `${hours}:${minutes}:${seconds}`;
      return { timeString, ampm };
    }
  }
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds}`;
  return { timeString, ampm };
}
// 获取当前日期
function getCurrentDay() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  /* weekday: long => Monday, short => Mon, narrow => M
    * year: numeric => 2012, 2-digit => 12
    * month: long => January, short => Jan, narrow => J
    * day: numeric => 2-digit => 02
    */
  return now.toLocaleDateString('en-US', options);
}
function generateSunSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '1em');
  svg.setAttribute('height', '1em');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('stroke-width', '0');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('stroke', 'currentColor');
  svg.classList.add('sun');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M8 1a.5.5 0 0 1 .5-.5h.5v1H8.5a.5.5 0 0 1-.5-.5zM8 15a.5.5 0 0 1 .5-.5h.5v1H8.5a.5.5 0 0 1-.5-.5zM3.646 2.354a.5.5 0 0 1 .708 0l.5.5-.708.708-.5-.5a.5.5 0 0 1 0-.708zM12.146 11.854a.5.5 0 0 1 .708 0l.5.5-.708.708-.5-.5a.5.5 0 0 1 0-.708zM1 8.5a.5.5 0 0 1 .5-.5h1v1H1.5a.5.5 0 0 1-.5-.5zM14 8.5a.5.5 0 0 1 .5-.5h1v1h-1.5a.5.5 0 0 1-.5-.5zM3.646 12.646a.5.5 0 0 1 0-.708l.5-.5.708.708-.5.5a.5.5 0 0 1-.708 0zM12.146 2.354a.5.5 0 0 1 0-.708l.5-.5.708.708-.5.5a.5.5 0 0 1-.708 0z');
  svg.appendChild(path2);

  return svg;
}
function generateMoonSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '1em');
  svg.setAttribute('height', '1em');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('stroke-width', '0');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('stroke', 'currentColor');
  svg.classList.add('moon');
  
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124 .06A.752.752 0 0 1 6 .278z');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z');
  svg.appendChild(path2);

  return svg;
}
function createTimeCard(selector) {
  const timeCard = document.querySelector(selector);
  if (!timeCard) return;

  function updateClock() {
    const format24Hour = Math.random() < 0.5; // 随机选择时间格式
    const { timeString, ampm } = getCurrentTime(format24Hour);
    const dayText = getCurrentDay();
    const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18; // 判断是白天还是晚上
    const svgIcon = isDayTime ? generateSunSVG() : generateMoonSVG();

    const timeTextP = document.createElement('p');
    timeTextP.classList.add('time-text');
    
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeString;
    timeTextP.appendChild(timeSpan);

    if (ampm) {
      const ampmSpan = document.createElement('span');
      ampmSpan.classList.add('time-sub-text');
      ampmSpan.textContent = ampm;
      timeTextP.appendChild(ampmSpan);
    }

    const dayTextP = document.createElement('p');
    dayTextP.classList.add('day-text');
    dayTextP.textContent = dayText;

    while (timeCard.firstChild) {
      timeCard.removeChild(timeCard.firstChild);
    }

    timeCard.appendChild(timeTextP);
    timeCard.appendChild(dayTextP);
    timeCard.appendChild(svgIcon);
  }

  updateClock();
  setInterval(updateClock, 1000);
}



export {
  initializeLoader,
  checkResourcesLoaded,
  showContent,
  minLoadTime,
  randomBackgroundGenerator, 
  controlStar, 
  createTimeCard
};