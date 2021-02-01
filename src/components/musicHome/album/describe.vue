<template>
  <div class="describe">
    <p style="margin-bottom: 40px; font-weight: 600; font-size: 20px">专辑介绍</p>
    <p
      v-for="(item, index) in textFormat(description)"
      :key="index"
      style="opacity: 0.7; text-indent: 30px; letter-spacing: 1px; line-height: 40px"
    >
      {{ item }}
    </p>
    <br /><br /><br /><br />
  </div>
</template>

<script>
export default {
  name: "describe",
  props: {
    description: String,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    textFormat(text) {
      let newText = text.split("\n");
      return newText;
    },
  },
  created() {},
};
</script>

<style scoped>
.describe {
  width: 90%;
  margin-left: 1%;
}
</style>
