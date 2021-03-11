<template>
  <div class="image-verify">
    <canvas
      ref="verify"
      :width="width"
      :height="height"
      @click="handledraw"
    ></canvas>
  </div>
</template>
<!-- 绘制验证码思路
1 加载时初始化图片验证码
2 点击图片重置验证码
3 随机数，
4 随机颜色
5 绘制图片函数 draw（1 ）
6 
 -->
<script>
import { ref, reactive, onMounted, toRefs } from "vue";
export default {
  setup() {
    // 对canvas 元素的引用
    const verify = ref(null);
    //  集中管理 数据状态，方便更改
    const state = reactive({
      pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      width: 120,
      height: 40,
      imagecode: "",
    });
    // 挂载时渲染 canvas
    onMounted(() => {
      state.imagecode = draw();
    });

    //点击验证码，更新图片
    const handledraw = () => {
      state.imagecode = draw();
    };

    // 设置随机数
    const randomNum = (mix, max) => {
      return (randomNum = parseInt(Math.random() * (max - min) + min));
    };
    // 设置随机颜色
    const randomColor = (min, max) => {
      const r = randomNum(min, max);
      const g = randomNum(min, max);
      const b = randomNum(min, max);
      return `rgb(${g},${g},${b})`;
    };

    // draw()绘制图片函数
    const draw = () => {
      const ctx = verify.value.getContext("2d");
      ctx.context.fillStyle = randomColor(180, 250);

      ctx.fillRect(0, 0, state.width, state.height);

      let imagecode = " ";
      //  产生随机四位验证码
      for (let i = 0; i <= 4; i++) {
        const text = state.pool[random(0, state.pool.length)];
        // 获取随机产生的验证码
        imagecode += text;

        // 随机字体大小
        const fontsize = random(20, 45);
        // 随机字体旋转
        const reg = random(-60, 60);

        // 在同一canvas中 产生四个文字并显示在不同位置的方式
        // 1.定义字体
        // 2.定义对齐方式
        // 3.定义不同颜色
        // 4.保存当前状态
        // 5.平移
        // 6.旋转
        // 7.填充字体
        // 8.restor出栈
        ctx.font = fontSize + "px Simhei";
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        ctx.save();
        ctx.translate(30 * i + 15, 15);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(text, -15 + 5, -15);
        ctx.restore();
      }
      // 随机产生五条干扰线 ?

      // 随机产生40个干扰小点 ?
      return imagecode;
    };
    return {
      ...toRefs(state),
      verify,
      handleDraw,
    };
  },
};
</script>
<style type="text/css">
.img-verify canvas {
  cursor: pointer;
}
</style>
