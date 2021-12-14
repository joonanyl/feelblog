<template>
  <div>
    <v-chip small :class="`${emotion} caption my-2`">{{ emotion }}</v-chip>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    emotion: String,
  },
};
</script>

<style scoped>
.v-chip.Happy {
  background: #fff176 !important;
}

.v-chip.Surprised {
  background: #f06292 !important;
}

.v-chip.Angry {
  background: #f44336 !important;
}

.v-chip.Sad {
  background: #1e88e5 !important;
}
</style>
