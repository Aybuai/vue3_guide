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
    <Suspense>
      <template #default>
        <async-show />
      </template>
      <template #fallback>
        <h1>Loading !...</h1>
      </template>
    </Suspense>
    <h1>X:{{ pageX }}, Y:{{ pageY }}</h1>
    <button @click="handleClick">ðð»+1</button>
    <DiaLog />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, toRefs, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import DiaLog from "@/components/DiaLog.vue";
import AsyncShow from "@/components/AsyncShow.vue";

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

// çå¬
watch([helloStr, () => data.count], (newVal, oldVal) => {
  document.title = newVal[0];
  console.log("oldVal", oldVal);
  console.log("newVal", newVal);
});

// éè¦è½¬æ¢ä¸ä¸ååºå¼ï¼ä¸ç¶è§£æåºæ¥åå°±å¤±å»äºååºå¼
const refData = toRefs(data);
const { count, double, handleClick } = refData;

// å¯¼å¥çéç¨ç»ä»¶æ¹æ³
const { pageX, pageY } = useMousePosition();

// è·åTSç±»åæ¨å¯¼
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
