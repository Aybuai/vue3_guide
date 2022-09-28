<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <div>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <h2>{{ helloStr }}</h2>
    <h1 v-if="loading">loading...</h1>
    <img v-if="loaded" :src="result?.message" alt="" />
    <h1>X:{{ pageX }}, Y:{{ pageY }}</h1>
    <button @click="handleClick">👍🏻+1</button>
    <DiaLog />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, toRefs, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import DiaLog from "@/components/DiaLog.vue";

// const count = ref(0);

// const double = computed(() => {
//   return count.value * 2;
// });

// const handleClick = () => {
//   count.value++;
// };

interface PublicType {
  count: number;
  double: number;
  handleClick: () => void;
}

let helloStr = ref("");
const data: PublicType = reactive({
  count: 0,
  double: computed(() => data.count * 2),
  handleClick: () => {
    data.count++;
    helloStr.value += "hello! ";
  },
});

// 监听
watch([helloStr, () => data.count], (newVal, oldVal) => {
  document.title = newVal[0];
  console.log("oldVal", oldVal);
  console.log("newVal", newVal);
});

// 需要转换一下响应式，不然解析出来后就失去了响应式
const refData = toRefs(data);
const { count, double, handleClick } = refData;

// 导入的通用组件方法
const { pageX, pageY } = useMousePosition();

// 获取TS类型推导
interface dogResult {
  message: string;
  status: string;
}
const { loading, loaded, result } = useURLLoader<dogResult>(
  "https://dog.ceo/api/breeds/image/random"
);
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
