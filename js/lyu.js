const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

const elleSprite = {
    tee: 'data:image/webp;base64,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',
    hoodie: 'data:image/webp;base64,UklGRi4XAABXRUJQVlA4TCIXAAAvtcBTEIeguG3byK/sP1rGuI+27yJrqIkkSVn/rk4MRpfRo9pIUpsvgIj+W6IBIielIpYnyLbpAO+P8wAAwPd/HaWj6J4wjHYjScyHt5RwxyRUDYD9u+z/KbwNYFtHkmxbFc7McmXWZFf9/59rkRLA8MQ8PkFgRP99QZJkSZIkW+Rq6fnqASYxjzAr59SY+P7x+h8/bSbRi7L47s9fF63vZhK9IoujNR5tKtErsvjIDybRK7L49eFEM4lekIU+tu2vK5eYRK/HovX18bX3ufeHmkn0iiy2A5tL9HIspN/H92n38VtiEr0mi7duOtHLsdjy+9t4yJ+bSfSCLL40IumTTFQ5k5T1i0t0h5ls/9Jpq79+MIkqLb5S1t8/mETEHEtnsn+6u+1NJbqbBTHh0qzODybRa7PopyRa0yWJ7jHhJugmEvmpifomFj1eFvF/hydSE3PUKtDEApAQnkjMHAmLkAeM1JNIFjETLZlqrK+vhv0k/Hy1lbLKRKK1xQSt0GKOWoH7SZqwsljMUYWESMFGS72caDUTLeao1RyVNJbE8PGkLC0Wc1yjzhaInySE/Fij5Rz1bIv5HCstEo+tFsZj7zWUel8CCc2ZGhRbSJhFlNjn+5v2+sNmTxLhY9z6AVhcOb33XltME/1YBtp64INMcSALv9sDX4FWj3enRMtPkdM5/lhH8sCGLFIia68fszmuJzzCBEnEIjqMmaAUJxoCgb1xahMNNau9N4iNo2psAt0SzJxNJIpiCyX1UnaBX7V5CnQbi4Ag2t4gu8MYMXWKYNEYsuFE3IQ3GqnH43CjiWw3Cpi17eCxsUQmEjVO+OECXEEDXo3TXe0QD1APRocV/h4UqbsFouBeT/Ag5qhiuqXx98BB2ugJ4xHG0FCthBjy8JkXusCsI5OwBaqL+BDUyCN4wmHtUv4qYFt/oZMv9Iz9tQUNJYQJQBLJAiFK2+hIBGnY4bQoBAYipYeNHIbmGMMEkVIJHQFgZTUjM3HU8NAAcExliJx3IxIWKhHTIBIxZwQcCTETUGMeCI60970kKAszYWGPjT1S0rtJED/Z/+U/vplEd7O4Gz3eo/ju4kR3s3gOH3uPavSnmUS4+d0sakk144WZRIT53Swqj1EzblvjnV4mEWF+N4s6rpYxZA1v8zGJGPO7WZQRK8aL7haTiJnJ3SzK0HfoRgcSkYgyv5tFIW/+Ps4vXRJMImrCN7MoxKMZvUpGSXgizvx2FnUPp2pUohIx5vezKHx6D0WruETETO5u8c0s67R+i0rEmN/OgrxaI9UT+hk6JSqe8LMtmKs13ibuykSamD/Fgphj6V3OL4ZnJuonWpRdrWUcEZWuIoLCmsAsilRdrUONFv3WZS+VyBHEfZ4VSyQk0N6eUnW1ThWjjdKRdWl5RUWXkgVKR/A5au+yq7VyM7pGOZGWKCUatA0OvyNIIowUKMBcrdGZrE/kIpEElcAOJe2CqQWKuTFqs1drxF3LV6ymiXBCgoXI0gI4L8I+0PJRebXODejFKpJSohhqRRylYoIFs6wAya+RQFI8JaV3Hxq9aHJEBPfEfhnoXd2hM11Gsg1bpDzITPyWzhd/97H0G+YYMdHeP5BEoT14gC2AOi2k/XO8nQQChaAYEny1PpP58ICIdR1ywIGShaGj3x3WpgIRF1jKHI20QSS4L8Tn2Ir1o5FAEtwYhmsxSNDT3sRQQDSQoOdgAbMthKSArZHmM14SIfO0wEEyYxxVHoKIATu+CMBEYLdvaajHT9PQOt4wxjjOWjaBQ5ywBNntM3AIfKGPe5n10nn4DQZ+CrWP1NaG1tHCFALQyyn2mIZoxxf6J4ZClQge+C9HILRlvJQbJliixMiSloE8Tssp6NL3dgywJi8cUjExENJxJpCwshO6gOQsiHe4zJRtnNg9YofdQX95ZDF5jYwjO776ToV7GQEVbBREFDXAjpAJP+wVioVybHRXxCShMASODg7xUo4gJwBFqk51VEQ+alKmhUOQGACZlI64Vmerk+Dpx5prtNkBWJM+FaInkZYSnTIBEpNG14YSrS00Ofp8/KNP/bMuteG2G8dxjglMAgpEVK14oDD48Ar4Jz7gPrWwBa5pjiv7YTyQFP5WPtBGt7gF5pvj6n4YD6T35c/+z1Itd4//LP9uIhFlfjeLSuw+Wh97N5GIMr+bRenhuPP12EwixvxuFqWHFd7k3XsziQjzu1nUEd65Clm/Pr6YRIz53SzKCG81faSdr0QiyvxuFnVoEHa+fotJxMzkdhaVS18+vs+3b+GJOPO7WVQi/X4fW1/PTyIRNZPbWVSutPP1pBIx5rezqFxh56vOTyoRMZO7WdRerT/ju7ybSERN+G4WtVdr26MlaSIRZc5kfY5F6dV6sr2WSUSY62YW1F0OQ9/D3G4ma0Ei5mpNVL3C+2kLiaqIIJ6zl1mRwqt1R7/QixGJhAw/zVFE1o0IKibC8Sau1hBRr3tFRzoAHiGRMAuCxlCeI3W1hn5Ih1YkvfXSSDrojgu2wIiJEHIk/GqN0NOZLCc8RcsytWeJBFtALyaY2SALr/2XevJeM0+kqUJIMgW1gF5McAeryVLl3cdF3t66DDTZY7tgVSqvmGaFTkvygwhDvjKVXa1ne3/3KpOmidZJ98Wj+117wxa2oZmkTD/ASEPF+NUaIZoDftdQHjsmgi7+oQqXQYsdLIwpjkbxAo17RUKv1tiLWckcbcxgtvEVA6HEytm7LtLk8sqZI48QCCVOErewgUyhUkaf0kZegfzqRlfoEGBzECn1sLAF9hQGGICOJGLogqiRCNQjzNEx6rDSD3BPjrMNCMqBkAj6JD3EwaH0gR87FMfPYp3Vci6XVw5pkzVg+GsQX+YgffgU/gzSsUYSlrUNHTtVax6xEBwaIITP+DJHN2q2hDMWlrTH39sg7RMZfjYDkEbICHDRe/c4KedykJPG1Ji5FFYXEyMJi5rwPJYkJWwByKhi3nMpHNuQu6A8WTqII6Ra2WFhzNPGf4P1fsZXIORB7ImV4ocNcspiHvgzBLbS1P9aqWBHOtBerE/li3jwaMADf4qlpZCPtigHritPWsuoynQvO+9xpLXmcTrpdbcgDwntJiUhR1wQKU+vNaa17VrD4YEkGj2yHmentWTiwWBDpGp5E63y00vl1HC+hxU+uT69VXZN3/ysUhla4a/9o32HVtl83/y8Uhn9if75/0ihjGzRCO/6MIlQ87tZlP8sb4SxzSTCze9mUXoEkgaTiDC/m0UdX8eMX0wixvxuFnVcGs7vZhKJKPO7WZTx+2t/fHV61xZPxJnfzqLu6dw7f3VCJhFjfi+LSs7vt4REJKLM72ZRx/v3EfiUqESM+d0sSvcL/05vM8OJSPP7WVSu33GbDpWIMb+bRe3l+hxByUTETO5nUXq5Ti9kOBE14eqsKrDgb0yANk2D0kQT82KLNm9ReLm+HIxb2K6eo90wIt4D99Si7nLtKfdJxGCxWesu192eACVqHtwCqrFCWpa6y3ULf2G0AsLniKJgwQBEUjpf9G0OphcAx1g8xx6AI1HnJ5jgV3e5Vtj2ihFb+uo5iqAn9PrkT6m7XEvwTBQdmDmiJA/oOXfoCMo/FF6uNQRAwjlR8Rw1aARlkMZbUvy4Lb5cDw8UhTzVc0x7uhEmFksUy/hA6eX6oXyg6tJG58gBnZOHpGyCzRdGaCATN3l23LiNRSXuJ/v9ET3A3cwb2Rks9yO9LFCwZb9dGD383lAtaNngFLfnJTi8MRjL8ynu+GmEYIizBYOWnOYPGDGvsnTlQ4GPekRikMmplwB1KX4GF5IWRQyOoOsQiuQ9gKco9dFan0hJKPD5Cm1Tak+RTCFsrKOAik3YiuX4WEJa9fiBeyw5Y3WtGctU6yXlYwvplBV+V7FnLVup2zsNBdXeEGcoZjNCmskwZmiTagqxFBwWirXpYQAwTJx+njTE3gosD52TX8JfrhuoPrPFEuVMYa3d1V6xqpHVS8JMNiJ4KuQ/HT4dIyS/E2yAfR7BHlGfNJrrqhminSxSKnQ/rKac+YRFxo3G8kj263PVowHOqRaD7E4gc1EeJeDWmIXa6Ibh60g8BN1Q/Z3ZAx8D9iQVspE483dZ9HZDVa+G2cxiNfoJ9jpQuPmAbqhy1Y12ppNUaJk68q4jCd/+PLWA9lKvwyonyl+nxlWlKVEC2yWR9nMq5Sd8MegdHk+oyPEWurpSrgj7/5hKOfxX/sdmEuHmd7Oo/1neDsMkws3vZvGEI27iYRIR5nezqOPXjOOLScSY38kCX8Qbr+7jkthEIsr8bhaFxLd3vz6+9m8mETOTu1kU7nKOj7HviErEmN/Nog4l3r5PKhExk/tZFC4Fju93JhFjfjeLUoLH77c+iUTUTG5nUb30++2kEjHmd7OovVYPTCYiZnI3i+pr9RgxlwifyXMsRFkUX6sVag0mEWFenlVu1qL4Wh1aDW8i0TMm3DZTKRMWZq7VBL5/IjnCZCWu1TjuxuiQqBw4a0ja3SJgrtX4y0IQCoiaI2whCJEEC5Veq8UI5kGWzlGONPiMdlXK4NdqlF8DwYlsMXOEgXYLT2iCFnytJrAwkocq55gcENqtbvBJkxHD12qUoQITPwSYOWL0QMs43TOEvs4loVd+nAaZFMGVc8y1LUS2QOmAwCs/s/TAO+XyOaLMHg8JyprTMvceqLwR4pZtm5mjwUTXfuU2ECc0uu+NWYTj8WbkoPDFGzSU2CijxWUcpLBIoUmD99cOwCUhma6bEmoNOxjtCJgpAC8Ibl0HQPpEfNrPIKxnIBBDSJMXAIL0axSkOPJmEBwVHr+OcWBsZIzqY9Yqe00898SrDHyWUqEloLUMUVvgEVpAtFgPpxJpuFqDwwIIkgc2fDTODg1eXtKyf1X4TdUdO50pHUYJQnM+M93QXMJwjemlMHm76kIvNJBDA4qLPefJxslr2SZOImG/PhXWmpF3Y7SmDfOMcExKVwi3hBCSq2PatV6KpNX/1cEZmtr1imEatPaZiuBuratWZ3Esr8TWyguE7Ykd/y0SmNXLy34WWzlNaKh7/VqCm9u9J7uVBVuEVyKxXdit1S3T+yOyDDuz9gCre1cnzAFiK/GsV8YsoqWAVhAZ/qcCj71ToCWWsE3Bi7p33UIz9eysVwYtYmqgy0SG7/wlanIgoQ1ocadckfYppTI0Rbq5fUKnzKZ9TqnMNMr/l3l8d3wH8grAJHpFFs4PKtErsHjONwHziiy6O77lRCV6PRY9fzCJXo7F5xQxiV6PhXImiUr0gizyNgMu0WuwwCNtJtErsPhvPtHvWSAm0UuwgNNuKtFLsuhAN5Oo1KJTVirRU2aC7R9ND5cmwuc4i2omET5HG9cw4dfNJCLmKEB8MuHCRGImjGf1lNJEJbgukaaJcLBAqR0VkwgHuIrGqEGwLtEcxDxnXaJ0h7rERKJm5qhZ1DaTyMQcez0T0MIX+Wu8Lmk8URNz3JpFbRtP1Cbm2MuZoBZuTdHqEwqKmpij5lEbR93EHFurmaAW6omhFmiVaK8SzVh1IfOojQ5SIfe8+ZvPUcJmIoCS7/sKOJFTdfieYIBmimBPgHrjFilL/l6x0EQr7ZNItHdSAK+xVYm8kkiOyFBScezCb0LJjhXxW1tg2PQNcxV+T0saCh4DWYWS3O/eVhuw8KwDfkYiYsuwb5Jowt73QboREowCghGGmOpa1A8iCEMRPkft+h8kiNQNgIS9iAKrXoLYNUAMBamabl9xT/g4jM+xG+SwhgqYCF7qRgOFMyIbjtqN0y2YA6UbD9tNcDBj3JiFElhUEoOd7lZCOI1+j07lNK3nYhQBp+80/GoEMpK2DZ/KttEFn66oYBsUbPRvUq9YNzaU2CKGmhor/3REkEioYAwaa1OE1Oqio4faR5xpnSuszoxn0nuDkYBAWQFrR+OZBLtRNJCngIUuNuN5orqec6KAuM8SURqYBKZeVA+Tve2dNW79PVzdXON/i1L5u5lE/+YWhEAsGplEjPndLGr56FQyMokI87tZ1B7H5N0wJhFhfjeLSr4+Zm9+MokI87tZVNIEXWN+N4un8KlnJOrbWdQ9pGggSXgizvxuFnXw5Shvfi+LZ/HvneiJPCeRnmPxHO7QqE71bmdR+fhJRHVFo3o3i9LD8WOQSsSY12atsCDvjNBejklUPWEmK29RemdkAmdEzJGxeNIciTsjQrxVmsgFiTBBcsTsnR6GbQN4lkjEhHELyM94Is3myNwZoRK2oGNSvpVNWBMLDIVEIMIsvpqgWxg90AR4whDiEUCORLE07+lMlv9IYI7gCQsfyTqRZjMRRCvOserOKIaBOtiUEisg3QzJQgxIIgq8a+0GA4n5zpm1mjBoAQMmOqWICqH+UeIs016E0mImhfdf6sy61Mhf15kECPSYBAW/x60NDJ6RoCzGTDANv10rUnpHeTrsT8SAv3by4vu6Blryx95oX5j+nxMa+6rK4ai9ozzfcTxEwERwIIeWxjYa9XI2SKrWuTtKBPk+hIPA+0IAQQGtlJ1vMWBMzKSYw0YRQ6huTiHYntyxoEuInwpZbZKEUGxSQbZ6YB0C2vbxr5xwYhENVUsn2hduKWTFuBbkYMfaD3wFxkg+ZGkRJxLvjASeGEkYeJGo8KGDdZk2irUTQrcXK1Sd81M4wxh9CH3qbgtEHTeJAnQYI/RDACiIZWNIvvgMvwC5PFDSgklnEzhCVoSOxFTLFxiC7AlhabKmwa6FDsXMghpiNVz5a/Z1mL18mhWjfczoEfB8fApgFizkBUg7kpFMcZeqDqCeVTgwi7R/NUpaYDUbUi9mGLEsLVfapwtWsJNJgo1uS+tEkzIVb1OVTinYZUpazPfPjktCMNyex4k0gWPa6s26qVleAKf9swPhPvTPlgr74ckkma63siKH05qwuPjXDn//4hn9cG3XyxTKzCQJiz/jMY7/G7TJz/jCyt3FibrvZvEEfuUv0cgkIszvZkEe8AbS44NJRJjfzaLymDw+vphEjPndLJ5BEzRlfjeLMiQcqcj8ZhaVSPmdx8pEU25hUQTxzhqeiDO/l8V/vj55M1mL/AotbsvvpySSbmdRv35SiRjz+1kUr3B5YRIRM3mKRe0cv7vg+mYiETNHNCubiLKAb4tQcA1NEj1lwn7KHKnbInwmTdClc+yKRMyAS2+LFHpeCM0SuXCOQdBMInKOqrwtkg1qSLLhJWYmEwuBiUZi8HyJoWFiWhgNGp8wihDEkAItkDg0YzERTUix0azrky98KJrNRBDqQeFt0aRlXS0prxRa8IS9RtECmmMFYm8wgFQBcY0yPmERFpAfitKf6Cy8LWImMou0xcxEZXfCmRZinub+eEMXcwv0wFLFRnmTExZuobVEGi+qEY527W3R2Nlpb/xrJxMT3luCJGLhbCCPw2+00RW+qjJ2k8UBt7AKcyQioRYjUrcBRnWM7UdNO5yvSPhNFu53K8JC0BAwSowkY3cYuHeAmclTOGwGQa+xi+Vu2cnlzeh6jweDVP6L0JxujA31ozpCJLU2wM9unUa71sMYqcU7BdewQscohRZQyKsv1XOrOlqyHI4Fqb+KIPWfop1Q2iChYUPHuFMFiryQnE7AAmmsSUc8v/WYMc4m1mYm4IZYy6jBrAWefLiJVlZTM9haEX6hMxTBEAKX0iHwLAbgrNeC0qQEONOX2qcUjgleiozDtlFxw7+X2AO+V56dwVRCajX5npST2gDS44S+6nPIGdMAeY6oCCSSrjixHEXSxrVAR1QDOtgdEgI7eePlWI68w19yGiqvnacIFcQzRXvju2W97q0lrBtUiDNJtLiNiMefjbyYphUsOkWsIJ4ocsXturcuaWc9e/qzww1oYG+yaYUq8ift4y39xrM2nOhPrpP/FY7KTpnd+cumJSvlqlI5tMnhd1/+YwM='
};

const sprite = new Image();
sprite.src = elleSprite.tee;

const spriteSize = { width: 26, height: 42 };
const scaledSpriteSize = { width: spriteSize.width * 2, height: spriteSize.height * 2 };

const directions = {
    down: 0,
    downLeft: 1,
    downRight: 2,
    left: 3,
    right: 4,
    up: 5,
    upLeft: 6,
    upRight: 7,
};
let currentDirection = directions.down;
let frameIndex = 0;
const walkingFrameCount = 6;
const animationSpeed = 6;

// 定义菱形的左右为200像素，上下为100像素的边界
const diamondPaddingX = 190;
const diamondPaddingY = 95;

let spriteX = canvas.width / 2 - scaledSpriteSize.width / 2;
let spriteY = canvas.height / 2 - scaledSpriteSize.height / 2;
let targetX = spriteX;
let targetY = spriteY;
let speed = 2;
let isIdle = true;
let isMoving = false;

// 更新人物移动逻辑，确保不会越界
function update() {
    const dx = targetX - (spriteX + scaledSpriteSize.width / 2); // 以人物脚为标准
    const dy = targetY - (spriteY + scaledSpriteSize.height); // 以人物脚为标准
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (isMoving && distance > speed) {
        const angle = Math.atan2(dy, dx);
        let newX = spriteX + Math.cos(angle) * speed;
        let newY = spriteY + Math.sin(angle) * speed;

        // 边界检查：防止人物超出菱形范围
        if (isSpriteWithinDiamond(newX + scaledSpriteSize.width / 2, newY + scaledSpriteSize.height)) {
            spriteX = newX;
            spriteY = newY;
            isIdle = false;
            frameIndex++;
            if (frameIndex >= walkingFrameCount * animationSpeed) {
                frameIndex = 0;
            }
        }
    } else {
        isIdle = true;
        frameIndex = 0;
        isMoving = false;
    }

    draw();
    requestAnimationFrame(update);
}
// 更新人物朝向
function updateDirection(dx, dy) {



    const threshold = 70;

    if (Math.abs(dx) > Math.abs(dy) + threshold) {
        currentDirection = dx > 0 ? directions.right : directions.left;
    } else if (Math.abs(dy) > Math.abs(dx) + threshold) {
        currentDirection = dy > 0 ? directions.down : directions.up;
    } else {
        currentDirection = dy > 0
            ? (dx > 0 ? directions.downRight : directions.downLeft)
            : (dx > 0 ? directions.upRight : directions.upLeft);
    }
}

// 判断人物是否在菱形区域内
function isSpriteWithinDiamond(x, y) {
    const centerXOffset = 0;  // 水平调整量
    const centerYOffset = 35; // 垂直调整量
    const centerX = canvas.width / 2 + centerXOffset;
    const centerY = canvas.height / 2 + centerYOffset;

    // 横向边界是200像素，纵向边界是100像素
    const halfWidth = diamondPaddingX;
    const halfHeight = diamondPaddingY;

    // 使用数学公式判断人物是否在菱形范围内，基于人物脚的坐标
    const isWithinDiamond = (Math.abs(x - centerX) / halfWidth)
        + (Math.abs(y - centerY) / halfHeight) <= 1;

    return isWithinDiamond;
}

// 绘制人物及动画帧
function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    let frameX, frameY;
    if (isIdle) {
        frameX = walkingFrameCount * spriteSize.width;
    } else {
        frameX = (Math.floor(frameIndex / animationSpeed) % walkingFrameCount) * spriteSize.width;
    }
    frameY = currentDirection * spriteSize.height;

    context.save();
    context.scale(2, 2);
    context.drawImage(sprite, frameX, frameY, spriteSize.width, spriteSize.height, spriteX / 2, spriteY / 2, spriteSize.width, spriteSize.height);
    context.restore();

    // // Draw diamond boundary
    // context.save();
    // context.strokeStyle = 'red'; // Set boundary color
    // context.lineWidth = 2;

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2 + 35; // Adjust as needed for vertical offset
    // const diamondWidth = 190; // Horizontal range (200 on both sides)
    // const diamondHeight = 95; // Vertical range (100 up and down)

    // context.beginPath();
    // context.moveTo(centerX, centerY - diamondHeight); // Top point
    // context.lineTo(centerX + diamondWidth, centerY); // Right point
    // context.lineTo(centerX, centerY + diamondHeight); // Bottom point
    // context.lineTo(centerX - diamondWidth, centerY); // Left point
    // context.closePath();
    // context.stroke();
}

// 处理输入事件并设置目标位置
function handleInput(event) {
    let inputX, inputY;

    if (event.type === 'click') {
        inputX = event.clientX - canvas.getBoundingClientRect().left;
        inputY = event.clientY - canvas.getBoundingClientRect().top;
    }

    // 设置人物脚的目标位置
    const footX = inputX;
    const footY = inputY;

    // 检查目标点是否在菱形区域内
    if (isSpriteWithinDiamond(footX, footY)) {
        targetX = footX;
        targetY = footY;
        updateDirection(targetX - (spriteX + scaledSpriteSize.width / 2), targetY - (spriteY + scaledSpriteSize.height));
        isMoving = true;
    }
}

canvas.addEventListener('click', handleInput);

// 更换服装功能
document.getElementById('hoodie').addEventListener('click', function () {
    sprite.src = elleSprite.hoodie;
    speed = 1;
});

document.getElementById('tee').addEventListener('click', function () {
    sprite.src = elleSprite.tee;
    speed = 2;
});

// 启动游戏
function startGame() {
    const bedswitch = document.querySelector('.bed-switch');
    const cansswitch = document.querySelector('.cans-switch');
    const homeday = document.querySelector('.home-floor');
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 18) {
        document.body.classList.remove('night_theme');  // 切换到日间主题
        document.body.classList.add('day_theme');       // 添加日间主题类
        bedswitch.classList.add('home-bed');
        cansswitch.classList.add('home-cans');
        bedswitch.classList.remove('home-bedn');
        cansswitch.classList.remove('home-cansn');
        homeday.style.filter = 'brightness(100%)';
        update();
    } else {
        document.body.classList.remove('day_theme');    // 切换到夜间主题
        document.body.classList.add('night_theme');     // 添加夜间主题类
        bedswitch.classList.add('home-bedn');
        bedswitch.classList.remove('home-bed');
        cansswitch.classList.add('home-cansn');
        cansswitch.classList.remove('home-cans');
        homeday.style.filter = 'brightness(50%)';
    }
}
sprite.onload = startGame;



// 获取需要的元素
const homePile = document.querySelector('.home-pile');
const homeCloset = document.getElementById('home-closet');
let isclick_pile = false;

// 点击 home-pile 时，显示 home-closet
homePile.addEventListener('click', () => {
    if (isclick_pile) {
        homeCloset.style.display = 'none';
        isclick_pile = false;
        playBeep();
    } else {
        homeCloset.style.display = 'block';
        isclick_pile = true;
        playBeep();
    }
});

// 点击除 home-closet 以外的地方，隐藏 home-closet
document.addEventListener('click', (event) => {
    // 检查点击的目标是否是 home-closet 内部或者 home-pile
    if (!homeCloset.contains(event.target) && !homePile.contains(event.target)) {
        homeCloset.style.display = 'none'; // 隐藏 home-closet
        isclick_pile = false;

    }
});


const homeskate = document.querySelector('.home-skate');
const homedeck = document.getElementById('home-deck');
let isclick_skate = false;
homeskate.addEventListener('click', () => {
    if (isclick_skate) {
        homedeck.style.display = 'none';
        isclick_skate = false;
        playBeep();
    } else {
        homedeck.style.display = 'block';
        isclick_skate = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homedeck.contains(event.target) && !homeskate.contains(event.target)) {
        homedeck.style.display = 'none';
        isclick_skate = false;
    }
});

const homefax = document.querySelector('.home-fax');
const homebubble = document.getElementById('home-bubble');
let isclick_fax = false;
homefax.addEventListener('click', () => {
    if (isclick_fax) {
        homebubble.style.display = 'none';
        isclick_fax = false;
        playBeep();
    } else {
        homebubble.style.display = 'block';
        isclick_fax = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homebubble.contains(event.target) && !homefax.contains(event.target)) {
        homebubble.style.display = 'none';
        isclick_fax = false;
    }
});


const homebadge = document.querySelector('.home-badge');
const homeblist = document.getElementById('home-blist');
let isclick_badge = false;
homebadge.addEventListener('click', () => {
    if (isclick_badge) {
        homeblist.style.display = 'none';
        isclick_badge = false;
        playBeep();
    } else {
        homeblist.style.display = 'block';
        isclick_badge = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homeblist.contains(event.target) && !homebadge.contains(event.target)) {
        homeblist.style.display = 'none';
        isclick_badge = false;
    }
});

const homemobile = document.querySelector('.home-mobile');
const homedscroll = document.getElementById('home-dscroll');
let isclick_mobile = false;
homemobile.addEventListener('click', () => {
    if (isclick_mobile) {
        homedscroll.style.display = 'none';
        isclick_mobile = false;
        playBeep();
    } else {
        homedscroll.style.display = 'block';
        isclick_mobile = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homedscroll.contains(event.target) && !homemobile.contains(event.target)) {
        homedscroll.style.display = 'none';
        isclick_mobile = false;
    }
});

const bigger = document.querySelector('.bigger');
const homedoomscroll = document.getElementById('home-doomscroll');
let isclick_bigger = false;

bigger.addEventListener('click', () => {
    if (isclick_bigger) {
        homedoomscroll.style.display = 'none';
        isclick_bigger = false;
        playBeep();
    } else {
        homedoomscroll.style.display = 'block';
        isclick_bigger = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homedoomscroll.contains(event.target) && !bigger.contains(event.target)) {
        homedoomscroll.style.display = 'none';
        isclick_bigger = false;
    }
});

const smaller = document.querySelector('.smaller');
smaller.addEventListener('click', () => {
    homedoomscroll.style.display = 'none';
    isclick_bigger = false;
    playBeep();
});

const homelaunch = document.querySelector('.home-launch');
const homeframe = document.getElementById('home-frame');
let isclick_launch = false;

homelaunch.addEventListener('click', () => {
    if (isclick_launch) {
        homeframe.style.display = 'none';
        isclick_launch = false;
        playBeep();
    } else {
        homeframe.style.display = 'block';
        isclick_launch = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homeframe.contains(event.target) && !homelaunch.contains(event.target)) {
        homeframe.style.display = 'none';
        isclick_launch = false;
    }
});

const full = document.querySelector('.full');
const homefull = document.getElementById('home-fullscreen');
let isclick_full = false;

full.addEventListener('click', () => {
    if (isclick_full) {
        homefull.style.display = 'none';
        isclick_full = false;
        playBeep();
    } else {
        homefull.style.display = 'block';
        isclick_full = true;
        playBeep();
    }
});

document.addEventListener('click', (event) => {
    if (!homefull.contains(event.target) && !full.contains(event.target)) {
        homefull.style.display = 'none';
        isclick_full = false;
    }
});

const minbutton = document.querySelector('.min');
minbutton.addEventListener('click', () => {
    homefull.style.display = 'none';
    isclick_full = false;
    playBeep();
});


let audioContext;

function playBeep() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(
        [440, 494.88, 523.25, 587.33, 659.25, 698.46, 783.99][Math.floor(Math.random() * 7)],
        audioContext.currentTime
    );

    gain.gain.setValueAtTime(0.06, audioContext.currentTime);
    osc.connect(gain).connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.03);
}