<template>
  <div class="same-top-style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style scoped lang="scss">
.same-top-style {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 20px 0;
  padding: 0 20px;
  color: #fff;
  background: linear-gradient(90deg, #609dcf, #4492d1 100%);
}
</style>