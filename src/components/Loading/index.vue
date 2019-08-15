<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<template>
    <Spin fix v-if="loading">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
</template>
<script>
    export default {
        name: 'Loading',
        data () {
            return {
                loading: false
            }
        },
        created() {
            this.$bus.$on('loading', (data) => {
                this.loading = !!data;
            })
        },
        watch: {
            loading: function (b) {
                this.loading = b;
            }
        }
    }
</script>
