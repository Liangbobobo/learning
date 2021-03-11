<template>
  <header class="simple-header">
    <i v-if="!isback" class="fanhui-icon" @click="goback"></i>
    <!-- isback ref noback， 如果isback 的值为true，渲染上面的i标签，isback为false显示
        下面的i 标签 -->
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <!-- 在自定义的sheader标签中，加入登录（name） -->
    <div class="simple-header-name">{{ name }}</div>
    <!-- 同一行中加入 一个样式 -->
    <i class="nbicon nbmore"></i>
  </header>
  <!-- ？header标签是否会另起一行，2.24 ：不会？ 加入另起一行的div 并设置样式 -->
  <div class="block" />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    //  绑定的显示在SimleHeader中的内容
    name: {
      // 设置prop的验证类型 以及默认值
      type: String,
      default: "",
    },
    back: {
      type: String,
      default: "",
    },
    //  判断是否返回返回
    noback: {
      type: Boolean,
      default: false,
    },
  },
  // emits 可以是数组或对象，从组件触发自定义事件，emits 可以是简单的数组，或者对象作为替代，允许配置和事件验证。
  emits: ["callback"],
  setup(props, ctx) {
    const isback = ref(props.noback);
    const router = useRouter();
    const goback = () => {
      if (!props.back) {
        router.go(-1);
      } else {
        router.push({ path: props.back });
      }
      ctx.emit("callback");
    };
    return {
      goback,
      isback,
    };
  },
};
</script>

<style lang="less" scoped>
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;

  line-height: 44px;
  padding: 0 10px;

  color: #252525;
  background: #fff;
  .simple-header-name {
    font-size: 14px;
  }
}
.block {
  height: 44px;
}
</style>
