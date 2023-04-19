<template>
  <div class="route-tags-contianer" :style="{ padding: showBtnFlag ? '0 20px' : '0' }">
    <button v-ShowRouteBtn class="route-btn route-btn-left" @click="toLeft" v-show="showBtnFlag">
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </button>
    <div class="route-tags-box" ref="routeWindowDOM">
      <ul ref="routeTagsDOM" :style="{ left: routeTagsLeft + 'px' }">
        <RouteTag @deleteHistoryTag="toDeleteTag" :key="item.path" v-for="item in list" :title="item.title"
          :path="item.path" :is-active="item.isActive">
        </RouteTag>
      </ul>
    </div>
    <button v-ShowRouteBtn class="route-btn route-btn-right" @click="toRight" v-show="showBtnFlag">
      <el-icon>
        <ArrowRightBold />
      </el-icon>
    </button>
  </div>
</template>
<script lang='ts' setup>
import RouteTag from './RouteTag/RouteTag.vue';
import { useRoute, useRouter } from 'vue-router'
import { reactive, watch, ref } from 'vue'

// 路由历史记录
const list = reactive<{ title: string; path: string; isActive: boolean }[]>([])

// 路由信息
const $route = useRoute()

// 路由导航对象
const $router = useRouter()

// 路由历史记录容器的DOM
const routeTagsDOM = ref<HTMLElement | null>(null)

// 路由历史记录父容器窗口的DOM
const routeWindowDOM = ref<HTMLElement | null>(null)

// 路由历史记录容器的left偏移量
const routeTagsLeft = ref<number>(0)

// 滚动的距离
const offset = 100

// 是否显示左右按钮
const showBtnFlag = ref(true)

// 监听路由路径的变化,添加历史记录
watch(
  () => $route.path,
  () => {
    const getIndex = checkRepeat()
    if (getIndex !== -1) {
      // 存在就设置高亮
      activeTag(getIndex)
    } else {
      // 不存在保存该历史记录
      const route = {
        title: $route.meta ?
          $route.meta.title ? $route.meta.title as string : $route.path
          : $route.path,
        path: $route.path,
        isActive: false
      }
      // 高亮当前的历史记录
      activeTag(list.push(route) - 1)
    }
  },
  {
    immediate: true
  }
)

// 检查当前路由是否存在,存在返回下标,不存在返回-1
function checkRepeat() {
  return list.findIndex(ele => {
    return ele.path === $route.path
  })
}

//  传入下标,设置其高亮效果
function activeTag(index: number) {
  list.forEach(ele => {
    ele.isActive = false
  })
  list[index].isActive = true
}

// 删除某个历史记录
function toDeleteTag(path: string, isActive: boolean) {
  // 若删除的是当前激活的路由,则返回首页
  if (isActive) {
    $router.push('/dashboard')
    // 设置首页被高亮
    list.some(ele => {
      if (ele.path === '/dashboard') {
        ele.isActive = true
        return true
      }
    })
  }
  // 删除对应的历史记录
  list.some((ele, index, arr) => {
    if (ele.path === path) {
      arr.splice(index, 1)
      return true
    }
  })
  // 只要删除一个历史记录,让历史记录滚动到头部
  routeTagsLeft.value = 0
}

// 历史记录右滚动
function toRight() {
  // 若当前历史记录容器等于父容器则不能滚动或当前历史记录容器超过|left|的大小也不能进行移动
  const routeTagsWidth = (routeTagsDOM.value as HTMLElement).clientWidth
  const routeWindowWidth = (routeWindowDOM.value as HTMLElement).clientWidth
  const routeOffsetLeft = (routeTagsDOM.value as HTMLElement).offsetLeft


  // 若当前历史记录容器等于窗口容器宽度就不能进行滚动
  if (routeTagsWidth === routeWindowWidth) return

  // 若|left|的值+窗口容器宽度>=历史记录的宽度就不能进行滚动

  if (routeWindowWidth + ((-1) * routeOffsetLeft) < routeTagsWidth - offset) {
    // 安全范围内可以正常减去偏移量
    routeTagsLeft.value -= offset
  } else {
    // 非安全范围内着left的值为-(历史记录宽度-窗口容器宽度)
    routeTagsLeft.value = -(routeTagsWidth - routeWindowWidth)
  }

}

// 历史记录左滚动
function toLeft() {
  if (routeTagsLeft.value === 0) {
    // 若当前偏移量等于0,则不能往左滚动
    return
  }
  if ((-1) * routeTagsLeft.value <= offset) {
    // 若当前偏移量小于offset时再次点击了左滚动,则直接置为left=0
    routeTagsLeft.value = 0
    return
  }
  routeTagsLeft.value += offset
}

// 是否显示历史记录左右滚动按钮
function toShowRouteBtn() {
  if ((routeTagsDOM.value as HTMLElement).clientWidth <= (routeWindowDOM.value as HTMLElement).clientWidth) {
    // 路由历史记录没超过容器大小时
    showBtnFlag.value = false
    routeTagsLeft.value = 0
  } else {
    // 超过了显示按钮
    showBtnFlag.value = true
  }
}

// 自定义指令,当路由历史记录未超过窗口容器时不显示左右按钮
const vShowRouteBtn = () => {
  toShowRouteBtn()
}

window.addEventListener("resize", () => {
  toShowRouteBtn()
  routeTagsLeft.value = 0
})

</script>

<style scoped>
/**滚动路由历史记录的按钮 */
.route-btn {
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  height: 20px;
  color: var(--el-color-primary);
  background-color: inherit;
  border: none;
}

.route-btn:hover {
  color: var(--el-color-primary-light-3);
}

.route-btn-right {
  right: 3px;
}

.route-btn-left {
  left: 3px;
}

/**组件容器 */
.route-tags-contianer {
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color);
  border-bottom: 1px solid var(--el-border-color);
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  height: 30px;
}

/**路由历史记录容器* */
.route-tags-box {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/**路由历史记录 */
.route-tags-contianer ul {
  box-sizing: border-box;
  padding: 0 10px;
  left: 0;
  transition: .5s;
  white-space: nowrap;
  min-width: 100%;
  position: absolute;
}
</style>