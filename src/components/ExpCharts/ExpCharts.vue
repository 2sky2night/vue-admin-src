<template>
    <div>
        <h1>实例图表</h1>
        <ul>
            <Charts v-for="(item, index) in options" :key="index" :option="item.option" :height="item.height"
                :width="item.width" />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import options from './options'
import Charts from '@/components/Charts/Charts.vue';
</script>
<style scoped>
ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

@media screen and (max-width: 1000px) {
    ul {
        display: flex;
        flex-direction: column;
    }
}
</style>