<script setup>
// 显示部分内容，点开后可以显示全部内容
import {computed, ref} from "vue";
import {Icon} from "tdesign-icons-vue-next";

const showMore = ref(false)
const maxDisplayLength = ref(50)
// const text = "这是一段很长的文本，这是需要显示的文字哦,asdhfkaj asdfasdfa asdfa sdf asdf asdf sa ddjkfhkjhaoiweoiwhjaiofdhoashdfkjlhasoidhfpoihqoeihfioahdoifghaoisuheofpihasiodhgfjashdghasoidhgopaihsdoifhashdfhasoidhfopiashdfhasidhfioashdpf"
// const iconName = ref("chevron-down")
const { text } = defineProps(["text"])

const truncatedText = computed(() => {
  if (showMore.value){
    return text
  }else {
    return text.length > maxDisplayLength.value
        ? text.slice(0, maxDisplayLength.value) + '...'
        : text;
  }
})

const iconName = computed(() => {
  return showMore.value ? "chevron-up" : "chevron-down";
})

const toggleShowMore = () => {
  showMore.value = !showMore.value
}
</script>

<template>
  <div>
    <div class="text-box">
      {{ truncatedText }}
      <span class="text-check-button" >
        <t-button @click="toggleShowMore" variant="text" title="展开">
        <icon :name="iconName"/>
      </t-button>
      </span>
    </div>
  </div>
</template>

<style scoped>
  .text-box {
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .text-check-button {
    margin-right: 10px;
    float: right;
  }

</style>