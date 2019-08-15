
/**
 * 工具类
 */
import CryptoJS from 'crypto-js'

export const utils = {
    /**
     * md5 加密方法
     * @param str
     * @returns {*}
     */
    md5: (str) => {
        return CryptoJS.MD5(str).toString()
    },
    /**
     * AES加密方法
     * @param text
     * @param keyStr
     * @returns {string}
     */
    encryptText: (text, keyStr) => {
        let key  = CryptoJS.enc.Utf8.parse(keyStr);
        let readyText = CryptoJS.enc.Utf8.parse(text);
        let encryptedText = CryptoJS.AES.encrypt(readyText, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encryptedText.toString();
    },
    /**
     * AES 解密方法
     * @param text
     * @param keyStr
     * @returns {*}
     */
    decryptText: (text, keyStr) => {
        let key  = CryptoJS.enc.Utf8.parse(keyStr)
        let decryptText=  CryptoJS.AES.decrypt(text, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decryptText).toString();
    },
    /**
     * 获取 12 位行政区划等级
     * @param areaCode
     * @returns {number}
     */
    getLevel: (areaCode) => {
        if(!areaCode) return 0;
        let length = getVaildCode(areaCode).length;
        let level = 1;
        if (length>0&&length<=2) {//省级
            level = 1;
        }else if(length>2&&length<=4){ //市级
            level= 2;
        }else if(length>4&&length<=6){ //县级
            level= 3;
        }else if(length>6&&length<=9){ //乡级
            level= 4;
        }else if(length>9&&length<=12){ //村级
            level= 5;
        }
        return level;
    },
    /**
     * 根据行政区划等级填充 12 位行政区划编码
     * @param code
     * @returns {string}
     */
    fillCode: (code) => {
        let level = utils.getLevel(code);
        switch (level) {
            case 1 :
                code = code + '0000000000';
                break;
            case 2 :
                code = code + '00000000';
                break;
            case 3 :
                code = code + '000000';
                break;
            case 4 :
                code = code + '000';
                break;
            case 5 :
                break;
        }
        return code;
    },
    /**
     * 计算某元素的偏移量
     * @param target
     * @returns {{top: *, left: *}}
     */
    offset: (target) => {
        let top = 0, left = 0
        while(target.offsetParent) {
            top += target.offsetTop
            left += target.offsetLeft
            target = target.offsetParent
        }
        return {
            top: top,
            left: left,
        }
    },
    /**
     * 判断浏览器时候缩放 ratio != 100 表示进行了缩放
     * @returns {number}
     */
    detectZoom: () => {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        } else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    },
    /**
     * 数字转动效果，基于 jQuery
     * @param $
     * @param selector
     * @param point
     */
    numberAnimate: function ($, selector, point){
        $(selector).each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    if(!!now && !isNaN(now) && now.toString().indexOf('.') > 0){
                        now = Number(now).toFixed(point);
                    }
                    $(this).text(now);
                }
            });
        });
    },
    /**
     * 将数字转换为带单位的字符串
     * @param {Number} num 要转换的数字
     * @param {Number} point 保留极为小数
     * @return {Object} obj.res 转换后的结果， obj.unit 转换后的单位
     */
    toHasUnitString: (num,point) => {
        if(typeof point === 'undefined'){point = 2;}
        var obj = {};
        if(typeof num === 'undefined') {num = 0}
        num = Number(num);
        if(num >= 100000000){
            obj.data = (num / 100000000).toFixed(point);
            obj.unit = '亿';
        }else if(100000000 > num && num >= 10000){
            obj.data = (num / 10000).toFixed(point);
            obj.unit = '万';
        }else {
            if(!!num && !isNaN(num) && num.toString().indexOf('.') > 0){
                num = Number(num).toFixed(point);
            }
            obj.data = num;
            obj.unit = '';
        }
        return obj;
    }
};

function getVaildCode(code){
    let arr = code.split("").reverse();
    let c = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!='0'){
            c = i;
            break;
        }
    }
    return code.substring(0, 12 - c);
}

