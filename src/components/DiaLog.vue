<template>
  <teleport to="#modal">
    <div class="modal">this is a modal</div>
  </teleport>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.modal {
  width: 100px;
  height: 100px;
  background: white;
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
</style>
