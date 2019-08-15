<style scoped lang="less">
    .pdf{
        > span {
            display: block !important;
            width: 100%;
            margin: 0 auto;
        }
    }
</style>
<template>
    <div class="pdf">
        <pdf ref="pdf"
            v-for="i in numPages"
            :key="i"
            :src="pdfSrc"
            :page="i">
        </pdf>
    </div>
</template>
<script>
    import pdf from 'vue-pdf'
    export default {
        name: 'Pdf',
        components:{
            pdf
        },
        props:{
            src: String
        },
        data(){
            return {
                pdfSrc: '',
                numPages:1,
                activeIndex:0,
            }
        },
        mounted(){
            setTimeout(() => {
                this.pdfSrc = this.src;
                this.pdfTask(this.src)
            },100)
        },
        methods:{
            pdfTask(src){
                let self = this
                let loadingTask = pdf.createLoadingTask(src)
                loadingTask.then(pdf => {
                    self.src = loadingTask
                    self.numPages = pdf.numPages
                }).catch((err) => {
                    console.error('pdf加载失败')
                })
            }
        }
    }
</script>