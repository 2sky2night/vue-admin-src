<template>
  <div class="page">
    <TopData />
    <ul class="infor-box">
      <DataCard v-for="(item, index) in inforList" :key="index" :title="item.title" :content="item.content"
        :color="item.color" />
    </ul>
    <ExpCharts/>
  </div>
</template>

<script lang="ts" setup>
import TopData from './TopData/TopData.vue'
import DataCard from './DataCard/DataCard.vue';
import ExpCharts from '@/components/ExpCharts/ExpCharts.vue';
const inforList = [
  { title: '支出财务', content: '10.3万', color: "#dd005b" },
  { title: '收入财务', content: '10.5万', color: "#8bc34a" },
  { title: '一般支出', content: '99.5万', color: "#fecc07" },
  { title: '其他支出', content: '99.5万', color: "#32b1ff" },
]
</script>

<style scoped>
.infor-box {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

@media screen and (min-width: 550px) {
  .infor-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1000px) {
  .infor-box {
    display: flex;
    flex-direction: row;
  }
  :deep(.data-card){
    flex-grow: 1;
  }
}
</style>