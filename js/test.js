document.getElementById("mainContent").addEventListener("click", function () {
    var nav = document.getElementById("hiddenNav");
    var main = document.getElementById("mainContent");

    // 通过检查左边距是否为0来确定导航栏当前是否显示
    if (nav.style.transform === "translateX(100%)") {
        // 如果导航栏已显示，点击则收回导航栏
        nav.style.transform = "translateX(-100%)"; // 导航栏向左移回原位
        main.style.transform = "translateX(0)"; // 主内容区移回原位
    } else {
        // 如果导航栏未显示，点击则展开导航栏
        nav.style.transform = "translateX(100%)"; // 导航栏向右滑动显示
        main.style.transform = "translateX(20%)"; // 主内容区向右滑动
    }
});