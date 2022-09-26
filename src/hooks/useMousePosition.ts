import { reactive, onMounted, onUnmounted, toRefs } from "vue";

export default function useMousePosition() {
  const x = reactive({
    count: 0,
  });
  const y = reactive({
    count: 0,
  });

  const mousePosition = (e: MouseEvent) => {
    x.count = e.pageX;
    y.count = e.pageY;
  };

  onMounted(() => {
    document.addEventListener("click", mousePosition);
  });

  onUnmounted(() => {
    document.removeEventListener("click", mousePosition);
  });

  // toRefs 防止 reactive 类型的数据失去响应式
  const pageX = toRefs(x).count;
  const pageY = toRefs(y).count;

  return { pageX, pageY };
}
