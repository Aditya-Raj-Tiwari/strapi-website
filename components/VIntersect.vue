<!-- VIntersect.vue -->
<template>
  <div ref="observerElement" class="v-intersect" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const observerElement = ref(null);
let observer = null;

const props = defineProps({
  classes: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  if (observerElement.value) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && observerElement.value) {
          observerElement.value.classList.add('in-view');
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(observerElement.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
.v-intersect {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
