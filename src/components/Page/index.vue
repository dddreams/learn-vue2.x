<template>
    <div class="page-box" v-if="isShowPage">
        <Page 
            :current="pageObject.pageNum"
            :page-size="pageObject.pageSize"
            :total="pageObject.total" 
            show-total
            show-elevator
            prev-text="上一页" 
            next-text="下一页"
            @on-change="handleCurrentChange"
        >
        </Page>
    </div>
</template>
<script>
export default {
    props: {
        pageObject: {
             type: Object,
             default: function() {
                 return {
                    pageNum : 1,
                    pageSize: 10,
                    total   : 0
                 }
             }
        } 
    },
    computed: {
        isShowPage() {
            return this.pageObject.total / this.pageObject.pageSize > 1
        }
    },
    methods: {
        handleCurrentChange(nextPage) {
            this.$emit('handleCurrentChange', nextPage)
        }
    }
}
</script>

<style scoped>
.page-box {
    padding: 20px 0!important;
    text-align: center;
    font-size: 14px;
    width: 100%;
}
</style>


