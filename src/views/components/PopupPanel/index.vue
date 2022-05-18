<template>
  <div class="popup-panel" :class="[active ? 'bg1' : 'bg2']">
    <div class="panel">
      <span>{{ content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPanel',
  props: {
    content: {
      required: true
    },
    active: {
      required: true
    }
  },
  mounted() {
    // console.log(this.content, this.active);
  }
}
</script>
<style lang="scss" scoped>
.popup-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 177px;
  height: 108px;
  text-align: center;
  .panel {
    width: 150px;
    height: 47px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.bg1 {
  background: url(./assets/popup-active.png) no-repeat;
}
.bg2 {
  background: url(./assets/popup.png) no-repeat;
}
</style>
