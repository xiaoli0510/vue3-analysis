<script setup>
import { h } from 'vue';
//h函数
const Btn = (props, ctx) => {
  // const vnode = h('div',{class:'class1'},children子节点) vnode必须唯一
  return h('div', {
    class: 'class1 class2',
    onClick: () => {
      ctx.emit('on-click', 123)
    }
  }, ctx.slots.default())
}
const getNum = (num) => {
  console.log(num);
}
</script>

<template>
  <div>这是</div>
  <Btn text="是个按钮" @on-click="getNum">
    <template #default>这是默认的插槽</template>
  </Btn>
</template>