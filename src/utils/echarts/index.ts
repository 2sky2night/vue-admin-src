import * as echarts from 'echarts';
import useThemeStore from '@/store/theme/theme';
const themeStore = useThemeStore()
/**
 * 渲染图表
 * @param element - 渲染的元素
 * @param option - 渲染的配置项选项
 */
function renderCharts(element: HTMLElement, option: any) {
    // 获取当前是深色模式还是亮色模式
    const className = themeStore.isDark ? 'dark' : ''
    // 初始化图表
    const myChart = echarts.init(element, className);
    // 渲染图表
    option && myChart.setOption(option);
    return myChart
}
export default renderCharts