<template>
    <div class="page">
        <h1>滚动列表页面</h1>
        <div>
            <span>设置列表项</span>
            <el-input type="number" v-model="listNum"></el-input>
        </div>
        <ul>
            <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, watch } from 'vue'
const listNum = ref<number>(10)
const list = reactive(getArray(listNum.value))

watch(listNum, (v) => {
    list.splice(0, list.length)
    getArray(v).forEach(ele => {
        list.push(ele)
    })
})

function getArray(num: number) {
    return Array.from({ length: num }).map((ele, index) => `列表项   ${index + 1}`)
}

</script>
<style scoped></style>