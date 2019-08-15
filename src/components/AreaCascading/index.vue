<template>
    <div id="cascading" :class="classes" ref="cascading">
        <span v-for="(item,index) in initParams.level">
            <input type="text" class="input_text" v-if="index==0" :value="rootName" readonly>
            <input type="hidden" v-if="index==0" :value="rootCode">

            <select v-if="index == 1" v-model="cityCode" @change="cityChange" :disabled="cityDis">
                <option value="">{{ initParams.inputTexts[index] }}</option>
                <option v-for="op in cityData" v-if="cityData" :value="op.areaCode">{{ op.areaName }}</option>
            </select>
            <input type="hidden" v-if="index==1"  v-model="cityName" >
            <input type="hidden" v-if="index==1"  v-model="cityCode" >

            <select v-if="index == 2" v-model="countyCode" @change="countyChange" :disabled="countyDis">
                <option value="">{{ initParams.inputTexts[index] }}</option>
                <option v-for="op in countyData" v-if="countyData" :value="op.areaCode">{{ op.areaName }}</option>
            </select>
            <input type="hidden" v-if="index==2" v-model="countyName">
            <input type="hidden" v-if="index==2" v-model="countyCode">

            <select v-if="index == 3" v-model="townCode" @change="townChange" :disabled="townDis">
                <option value="">{{ initParams.inputTexts[index] }}</option>
                <option v-for="op in townData" v-if="townData" :value="op.areaCode">{{ op.areaName }}</option>
            </select>
            <input type="hidden" v-if="index==3" v-model="townName">
            <input type="hidden" v-if="index==3" v-model="townCode">

            <select v-if="index == 4" v-model="villageCode" @change="villageChange" :disabled="villageDis">
                <option value="">{{ initParams.inputTexts[index] }}</option>
                <option v-for="op in villageData" v-if="villageData" :value="op.areaCode">{{ op.areaName }}</option>
            </select>
            <input type="hidden" v-if="index==4" v-model="villageName" >
            <input type="hidden" v-if="index==4" v-model="villageCode" >
        </span>

        <div v-if="validate" v-show="isShow" class="error-info" :style="dStyle">
            <div class="error-info-main">
                <p>{{ errorMsg }}</p>
                <b class="error-arrow"></b>
                <b class="error-close" @click="close"></b>
            </div>
        </div>

        <input type="hidden" v-model="currentCode">
    </div>
</template>
<script>

    import { API_AREA_CODE } from "../../api";
    import { validatas } from "../../utils/validatas";
    import { utils } from "../../utils/utils";

    export default {
        props: {
            initParams:{type: Object, required: true},
            rules: String
        },
        data () {
            return {
                rootCode: '',
                rootName: '',
                cityCode:'',
                cityName:'',
                cityData:[],
                cityDis: false,
                countyCode:'',
                countyName: '',
                countyData:[],
                countyDis: false,
                townCode:'',
                townName: '',
                townData:[],
                townDis: false,
                villageCode:'',
                villageName: '',
                villageData:[],
                villageDis: false,

                currentCode: this.initParams.areaCode,
                level: this.getLevel(this.initParams.rootCode),

                // 校验相关
                ruleArrs: !this.rules ? '' : this.rules.split(' '),
                isShow: false,
                errorMsg: '',
                cClass: '',
                classes: '',
                dStyle: '',
                backPosition: '',
            }
        },
        methods: {
            cityChange() {
                this.currentCode = this.cityCode;
                this.onLoad("county", this.currentCode);
                this.countyCode = '', this.townCode = '', this.villageCode = '';
                this.countyName = '', this.townName = '', this.villageName = '';
                this.$emit('onChange', this.currentCode);
            },
            countyChange() {
                this.currentCode = this.countyCode;
                this.onLoad("town", this.currentCode);
                this.townCode = '', this.villageCode = '';
                this.townName = '', this.villageName = '';
                this.$emit('onChange', this.currentCode);
            },
            townChange() {
                this.currentCode = this.townCode;
                this.onLoad("village", this.currentCode);
                this.villageCode = '', this.villageName = '';
                this.$emit('onChange', this.currentCode);
            },
            villageChange() {
                this.currentCode = this.villageCode;
                this.onLoad("group", this.currentCode);
                this.$emit('onChange', this.currentCode);
            },
            getLevel(code) {
                if(code.endsWith('0000000000')){
                    return 1;
                } else if(code.endsWith('00000000')){
                    return 2;
                } else if(code.endsWith('000000')){
                    return 3;
                } else if(code.endsWith('000')){
                    return 4;
                } else {
                    return 5;
                }
            },
            onLoad(type,code) {
                if(!code){
                    this.reset(type);
                    return
                }
                this.$get(API_AREA_CODE, {parentCode: code}).then(res => {
                    if(res.data.code === 0){
                        let upType = '';
                        if(type == 'city') upType = 'root';
                        if(type == 'county') upType = 'city';
                        if(type == 'town') upType = 'county';
                        if(type == 'village') upType = 'town';
                        if(type == 'group') {
                            upType = 'village';
                            this[upType+"Name"] = res.data.data.areaName;
                            this[upType+"Code"] = res.data.data.areaCode;
                        } else {
                            this[type+"Data"] = res.data.data.children;
                            this[upType+"Name"] = res.data.data.areaName;
                            this[upType+"Code"] = res.data.data.areaCode;
                        }
                    }
                })
            },
            fill() {
                let level = this.getLevel(this.currentCode);
                this.loadRoot(level, this.currentCode);
            },
            loadRoot(level, areaCode) {
                let code = areaCode;
                switch (level) {
                    case 1:
                        this.onLoad("city", code);
                        break;
                    case 2:
                        code = areaCode.substring(0,2)+"0000000000";
                        this.onLoad("city", code);

                        code = areaCode.substring(0,4)+"00000000";
                        this.onLoad("county", code);
                        break;
                    case 3:
                        code = areaCode.substring(0,2)+"0000000000";
                        this.onLoad("city", code);

                        code = areaCode.substring(0,4)+"00000000";
                        this.onLoad("county", code);

                        code = areaCode.substring(0,6)+"000000";
                        this.onLoad("town", code);
                        break;
                    case 4:
                        code = areaCode.substring(0,2)+"0000000000";
                        this.onLoad("city", code);

                        code = areaCode.substring(0,4)+"00000000";
                        this.onLoad("county", code);

                        code = areaCode.substring(0,6)+"000000";
                        this.onLoad("town", code);

                        code = areaCode.substring(0,9)+"000";
                        this.onLoad("village", code);
                        break;
                    case 5:
                        code = areaCode.substring(0,2)+"0000000000";
                        this.onLoad("city", code);

                        code = areaCode.substring(0,4)+"00000000";
                        this.onLoad("county", code);

                        code = areaCode.substring(0,6)+"000000";
                        this.onLoad("town", code);

                        code = areaCode.substring(0,9)+"000";
                        this.onLoad("village", code);

                        code = areaCode;
                        this.onLoad("group", code);
                        break;
                }
            },
            reset(type) {
                switch (type) {
                    case "city":
                        this.cityData = '', this.countyData = '', this.townData = '', this.villageData = ''
                        this.currentCode = this.cityCode;
                        break;
                    case "county":
                        this.countyData = '', this.townData = '', this.villageData = ''
                        this.currentCode = this.countyCode;
                        break;
                    case "town":
                        this.townData = '',this.villageData = ''
                        this.currentCode = this.townCode;
                        break;
                    case "village":
                        this.villageData = ''
                        this.currentCode = this.villageCode;
                        break;
                    case "group":
                        break;
                }
            },
            isEdit() {
                switch (this.level) {
                    case 1:
                        break;
                    case 2:
                        this.cityDis = true;
                        break;
                    case 3:
                        this.cityDis = true;
                        this.countyDis = true;
                        break;
                    case 4:
                        this.cityDis = true;
                        this.countyDis = true;
                        this.townDis = true;
                        break;
                    case 5:
                        this.cityDis = true;
                        this.countyDis = true;
                        this.townDis = true;
                        this.villageDis = true;
                        break;
                }
            },

            validate(callback) {
                if(!this.rules) return ;
                this.offset();
                this.ruleArrs.forEach((item) => {
                    if(!validatas[item](this.villageCode)){
                        this.isShow = true;
                        this.errorMsg = validatas.errorMsg[item];
                        this.classes = `${this.cClass} error-mark`;
                        if (typeof callback === 'function') {
                            callback(this.isShow);
                        }
                        window.scrollTo(0, this.backPosition)
                        setTimeout(() => {
                            this.isShow = false;
                            this.errorMsg = '';
                            this.classes = this.cClass;
                        }, 2000)
                    }
                });

            },
            close() {
                this.isShow = false;
                this.errorMsg = '';
                this.classes = this.cClass;
            },
            offset(){
                let height = this.$refs.cascading.getBoundingClientRect().height;
                let top = utils.offset(this.$refs.cascading).top;
                let left = utils.offset(this.$refs.cascading).left;
                this.backPosition = top - 56;
                this.dStyle = `top: ${top+height}px;left: ${left}px;`;
            }
        },
        watch: {
            'initParams.areaCode': function () {
                this.currentCode = this.initParams.areaCode;
                this.level = this.getLevel(this.initParams.rootCode);
                this.fill();
            },
            'initParams.rootCode': function () {
                this.level = this.getLevel(this.initParams.rootCode);
                this.loadRoot(this.level, this.initParams.rootCode);
                this.isEdit();
            }
        },
        mounted() {
            this.loadRoot(this.level, this.initParams.rootCode);
            //this.fill();
            this.isEdit();
        }
    }
</script>
<style scoped>
#cascading{
    display: inline-block;
}
#cascading input, #cascading select{
    width: 115px;
    cursor: pointer;
    font-size: 14px;
    height: 34px;
    border: 1px solid #993300;
    border-radius: 6px;
    background: inherit;
    padding: 4px 7px;
    margin-right: 10px;
    outline: none;
    color: #993300;
}

</style>
