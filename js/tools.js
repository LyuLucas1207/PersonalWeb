

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
  检查图片是否加载成功
  src: 图片url
  checkImage(): 返回一个promise对象，resolve为true表示图片加载成功，resolve为false表示图片加载失败
*/
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




export {
    checkResourcesLoaded,
    showContent,
    minLoadTime,
    checkImage
};