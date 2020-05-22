<template>
  <draggable id="trash" v-model="trash" :group="group">
    <b-icon-trash font-scale="10"></b-icon-trash>
  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'

  export default{
    components: {
      Draggable
    },
    props: ['group'],
    data(){
      return{
        trash: []
      }
    }
  }
</script>

<style scoped lang="scss">
  #trash {
    height: 200px;
    width: 100%;
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #f6f6f6;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
