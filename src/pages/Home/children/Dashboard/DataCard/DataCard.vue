<template>
    <li class="data-card" :style="{ backgroundColor: color }">
        <h2>{{ title }}</h2>
        <div>{{ content }}</div>
        <span>查看更多</span>
    </li>
</template>
<script lang='ts' setup>
interface DataCardProps {
    title: string;
    content: string;
    color: string
}
const props = defineProps<DataCardProps>()
</script>
<style scoped>
.data-card {
    cursor: pointer;
    user-select: none;
    color: white;
    position: relative;
    height: 100px;
    margin: 0px 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 10px;
    transition: .5s;
}

.data-card:hover {
    transform: translateY(-2px);
}

span:hover {
    color: white;
}

span {
    cursor: pointer;
    position: absolute;
    font-size: 12px;
    right: 10px;
    bottom: 10px;
}</style>