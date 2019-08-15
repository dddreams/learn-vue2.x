<template>
    <div id="layout">
        <Loading />
        <router-view/>
    </div>
</template>

<script>
    import Loading from '@/components/Loading'
    export default {
        name: 'Layout',
        components: { Loading }
    }
</script>
<style>
    @import url(../assets/css/reset.css);
    @import url(../assets/css/base.css);
</style>