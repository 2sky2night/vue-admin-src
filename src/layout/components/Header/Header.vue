<template>
  <div class="header-container">
    <div class="top-bar">
      <div>
        <!--面包屑和菜单按钮-->
        <el-icon @click="toggleShow" class="toggle-side-bar-btn">
          <Menu />
        </el-icon>
        <BreadCrumdList />
      </div>
      <div>
        <FuncBtns />
        <!--用户功能下拉组-->
        <DropBox />
        <span>admin</span>
        <Setting />
      </div>
    </div>
    <!--下方是路由的历史记录-->
    <RouteTags />
    <div>

    </div>
  </div>
</template>
<script lang='ts' setup>
import Setting from './Setting/Setting.vue';
import RouteTags from './RouteTags/RouteTags.vue'
import BreadCrumdList from './BreadCrumdList/BreadCrumdList.vue';
import useSideBar from "@/hooks/useSideBar";
import FuncBtns from './FuncBtns/FuncBtns.vue';
import DropBox from './DropBox/DropBox.vue';
// 获取sideBar仓库的数据
const { toggleShow, showFlag } = useSideBar()

</script>
<style scoped>
.header-container {
  background-color: var(--el-bg-color);
  user-select: none;
  box-shadow: var(--el-box-shadow);
}

.toggle-side-bar-btn {
  cursor: pointer;
  margin-right: 10px;
}

span {
  user-select: none;
  font-weight: 600;
  margin: 0 10px;
  font-size: 12px;
  color: var(--el-text-color-primary)
}

.top-bar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.top-bar>div {
  display: flex;
  align-items: center;
}
</style>