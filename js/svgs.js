/*
生成SVG图标，太阳
generateSunSVG(): 返回一个SVG元素
*/

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

/*
生成SVG图标，月亮
generateMoonSVG(): 返回一个SVG元素
*/


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

export { 
        generateSunSVG, 
        generateMoonSVG 
};