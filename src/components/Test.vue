<!--测试页面-->
<template>
  <div class="container">
    <h2>配置智能体</h2>
    <div v-if="hasError" class="error-message">* 基本配置信息（必填）</div>
    <form @submit.prevent="handleSubmit">
      <label for="name">名称:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="introduction">简介:</label>
      <textarea id="introduction" v-model="introduction" required></textarea>

      <label for="configuration">配置信息:</label>
      <textarea id="configuration" v-model="configuration" required></textarea>

      <h3>模型能力</h3>
      <div v-for="(ability, index) in abilities" :key="index">
        <input type="checkbox" :id="'ability-' + index" :value="ability" v-model="selectedAbilities" />
        <label :for="'ability-' + index">{{ ability }}</label>
      </div>

      <button type="submit">发布</button>
    </form>

    <div class="preview-area">
      <p>请在左侧输入配置信息，描述你想要的应用。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      introduction: '',
      configuration: '',
      selectedAbilities: [],
      abilities: ['联想能力', 'A绘画', '代码能力'],
      hasError: false,
    };
  },
  methods: {
    handleSubmit() {
      this.hasError = !this.name || !this.introduction || !this.configuration;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.error-message {
  color: red;
}

.preview-area {
  width: 50%;
  padding: 2rem;
}
</style>