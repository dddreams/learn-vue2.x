export const validatas = {
    //是否为空
    isEmpty: function(str){
        return !/0+/.test(str) && !str;
    },
    //不能为空
    notEmpty: function(str){
        return /0+/.test(str) || str;
    },
    //数字
    isNumber: function(str){
        return /^[0-9]*$/.test(str);
    },
    //邮编
    isZipCode: function(str){
        return /^[0-9]{6}$/.test(str);
    },
    //身份证
    isIdCardNo: function(str){
        return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(str);
    },
    //手机号码
    isMobile: function(str){
        return str.length == 11 && /^1[3|4|5|8|7][0-9]\d{4,8}$/.test(str);
    },
    //QQ号码
    isQQ: function(str){
        return /^[1-9]\d{4,9}$/.test(str);
    },
    //email
    isEmail: function(str){
        return /\w@\w*\.\w/.test(str);
    },
    //url
    isUrl: function(str){
        return /(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9](\/.*)*\/?/.test(str);
    },
    //固定电话
    isPhone: function(str){
        return /^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-?[0-9]{1,4})?$/.test(str);
    },
    //手机号码或固定电话
    isTel: function(str){
        var _length = str.length,
            _mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/,
            _tel = /^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-?[0-9]{1,4})?$/;
        return (_tel.test(str) && _length <= 12) || (_mobile.test(str) && _length == 11);
    },
    //ip地址
    isIp: function(str){
        return /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(str);
    },
    //只允许输入中英文字符，数字和下划线
    userName: function(str){
        return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str);
    },
    //只允许输入中英文字符，数字和下划线,括号  以及 ·.、
    userNameExtend:function(str){
        return /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/.test(str);
    },
    //字母和数字的验证
    chrnum: function(str){
        return /^([a-zA-Z0-9]+)$/.test(str);
    },
    //小数校验2位
    decimal2: function(str){
        return /^-?\d+\.?\d{0,2}$/.test(str);
    },
    //中文的验证
    chinese: function(str){
        return /^[\u4e00-\u9fa5]+$/.test(str);
    },
    //密码的验证
    userPassword: function(str){
        return /^[0-9a-zA-Z]{6,14}$/.test(str);
    },
    //是否默认密码
    isDefaultPassword: function(str){
        return ('jzfp@2015' != str);
    },
    //必须含有字母和数字
    isNumAndLetter: function(str){
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/.test(str);
    },
    //图片的验证
    isPic: function(str){
        return /.jpg|.png|.gif|.jpeg$/.test(str.toLowerCase());
    },
    //校验正整数
    isInteger: function(str){
        return  /^[1-9]+[0-9]*$/.test(str.replace(/\s/g, ''));
    },
    //校验正整数
    isPInt: function(str){
        return  !str||/^[0-9]*[0-9][0-9]*$/.test(str);
    },
    //只能输入0或不能以0开头的正整数哦
    isZorInt: function(str){
        return  !str||/^(0|[1-9][0-9]*)$/.test(str);
    },
    //只能是数字、小数点后2位，格式不正确哦！
    onlyZorNum2: function(str){
        return  !str||/^(0|[1-9][0-9]*)(\.(\d){1,2})?$/.test(str);
    },
    //只允许输入英文字符，数字和下划线
    onlyEn_Num: function(str){
        return /^\w+$/.test(str);
    },
    //只允许输入中英文字符，数字和下划线
    onlyCn_En_Num: function(str){
        return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str.replace(/\s/g, ''));
    },
    //只能包括中英文字母、数字、下划线和中文标点符号
    onlyCn_En_Num_Point: function(str){
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！？@、]+$/.test(str);
    },
    //只能包括中英文字母、数字、下划线和中文标点符号及部分特殊符号
    onlyCn_En_Num_Point_extend: function(str){
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！？@、\(\)\{\}·.\[\]\（\）\【\】]+$/.test(str)  && !str;
    },
    //只能包括中英文字母、数字、下划线、中文标点符号、英文逗号、空格和回车及部分特殊符号
    onlyCn_En_Num_Point_all_extend: function(str){
        return /^[a-zA-Z0-9_\u4e00-\u9fa5，。“”；！?？@、：‘’~￥\*\/\%\－\+\(\)\{\}·.\[\]\（\）\【\】\n\s]+$/.test(str)  && !str;
    },
    //只能是数字、小数点后两位
    onlyNum_Point: function(str){
        return !str|| /^(\d)*(\.(\d){1,2})?$/.test(str);
    },
    //只能是数字、小数点后三位
    onlyNum_Point3: function(str){
        return !str|| /^(\d)*(\.(\d){0,3})?$/.test(str);
    },
    //只能是数字、小数点后四位
    onlyNum_Point4: function(str){
        return  !str||/^(0|[1-9][0-9]*)(\.(\d){1,4})?$/.test(str);
    },
    //radio不能为空
    radioChecked: function(str){
        return /0+/.test(str) || str;
    },
    // checkbox 至少选择一项
    checkedOne: (str) => {
        if (Array.isArray(str)) {
            return str.length > 0
        } else {
            return !!str
        }
    },
    // checkbox 至少选择两项
    checkedTwo: (str) => {
        if (Array.isArray(str)) {
            return str.length >= 2
        }
    },
    // checkbox 至少选择三项
    checkedThree: (str) => {
        if (Array.isArray(str)) {
            return str.length >= 3
        }
    },
    // 5级行政区划，必须选择到村
    cascadVillage: (str) => {
        return /0+/.test(str) || str
    },
    /*
     *字符串长度，smin:最小值；最大值,一个中文长度为2
     *@param str,要验证的字符串
     *@param params,参数数组
     */
    cnLength: function(str, params){
        var _length = str.length,
            _totalLen = _length,
            smin = 0,
            smax = 0;
        if(params instanceof Array){
            switch(params.length){
                case 0:
                    return false;
                    break;
                case 1:
                    smax = parseInt(params[0]);
                    if(smax == 0 || isNaN(smax)){
                        return false;
                    }
                    break;
                default:
                    smin = parseInt(params[0]);
                    smax = parseInt(params[1]);
                    if(smax == 0 || isNaN(smax) || isNaN(smin)){
                        return false;
                    }
            }
        }else{
            return false;
        }
        for(var i = 0; i < _length; i++) {
            if(str.charCodeAt(i) > 127) {
                _totalLen++;
            }
        }
        return _totalLen >= smin && _totalLen <= smax;
    },
    /*
     *数字大小，smax:最大值
     *@param str,要验证的数字
     *@param params,参数数组
     */
    cnMax: function(str, params){
        return Number(str)<=Number(params);
    },
    /*
     *数字大小，smax:最小值
     *@param str,要验证的数字
     *@param params,参数数组
     */
    cnMin: function(str, params){
        return Number(str)>Number(params);
    },
   //校验年月的格式
    yyyyMM: function(str){
        return /^[12]\d{3}[\年]((0([1-9]))|(1(0|1|2))|([1-9]))[\月]$/.test(str);
    },
    //错误信息
    errorMsg: {
        "isChecked":"县属性不能为空！",
        "notEmpty": "不能为空哦！",
        "isNumber": "只能输入数字哦！",
        "isZipCode": "邮政编码不正确哦!",
        "isIdCardNo": "身份证号码不正确哦!",
        "isMobile": "手机号码格式错啦!",
        "isPhone": "电话号码格式错啦!",
        "isTel": "联系电话格式错啦!",
        "isQQ": "QQ号码格式错啦！",
        "isEmail": "email格式错啦！",
        "isUrl": "网址格式错啦！",
        "isIp": "ip地址格式错啦!",
        "cnLength": "长度要介于{0}到{1}之间哦!",
        "cnMax": "请输入介于0到{0}之间的数字哦!",
        "cnMin": "请输入大于{0}的数字哦!",
        "userName": "只能包括中英文、数字和下划线哦!",
        "chrnum": "只能输入数字和字母(字符A-Z, a-z, 0-9)哦！",
        "chinese": "只能输入中文哦！",
        "userPassword": "登录密码只能为6-14位大写字母、小写字母、数字和符号其中三项字符哦！",
        "isDefaultPassword": "登录密码不能为默认密码哦！",
        "isSimplePassword": "登录密码太简单哦！",
        "isThreeOfNumAndUplAndLowlAndSymbol":"密码强度不符合，密码必须包含大写字母、小写字母、数字和符号其中三项哦！",
        "isKeyOrder":"密码强度不符合，密码应该避免键盘排序密码哦！",
        "isPic": "只能是jpg、png、gif、jpeg格式的图片哦！",
        "isPInt": "只能输入非负整数哦！",
        "isZorInt": "只能输入0或正整数，格式不正确哦！",
        "onlyZorNum2": "只能输入数字，小数点后保留2位，格式不正确哦！",
        "isInteger": "只能输入正整数哦！",
        "greaterThan1": "只能输入小于{0}的正整数哦！",
        "onlyEn_Num": "只能输入英文，数字和下划线哦!",
        "onlyCn_En_Num": "只能输入中英文，数字和下划线哦!",
        "onlyCn_En_Num_Point": "只能输入中英文，数字、下划线和中文标点符号哦!",
        "onlyCn_En_Num_Point_extend": "只能输入中英文，数字、下划线和中文标点符号及部分特殊符号哦!",
        "orgTreeValid": "您还没有选择用户哦！",
        "decimal2":"请输入数字，小数点后保留2位哦！",
        "equalTo": "请输入相同的值哦！",
        "onlyNum_Point":"只能输入非负数，最多小数点后两位哦！",
        "isNumAndLetter":"密码必须包含字母和数字，长度只能为8-30位！",
        "onlyNum_Point3":"只能输入数字，最多小数点后三位哦！",
        "onlyNum_Point4":"只能输入数字，最多小数点后四位哦！",
        "onlyCn_En_Num_Point_all_extend":"只能包括中英文字母、数字、下划线、部分中文标点符号、空格和回车及部分特殊符号哦！",
        "checkCard": "请输入正确的身份证号或残疾证号！",
        "radioChecked": "必须选择一项哦！",
        "checkedOne": "至少选择一项哦！",
        "checkedTwo": "至少选择两项哦！",
        "checkedThree": "至少选择三项哦！",
        "cascadVillage": "必须选择到村哦!",
        "yyyyMM": "年月格式不符合规范哦！",
    },
}
