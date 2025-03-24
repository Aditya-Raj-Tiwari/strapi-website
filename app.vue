<template>
  <div class="main">
    <ZammadChat :primaryColor="primaryColor" :secondaryColor="secondaryColor" />
    <Header :ctaColor="primaryColor" :secondaryColor="secondaryColor" />
    <NuxtLoadingIndicator  :throttle="1200" />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHead } from '#app';

import ZammadChat from '~/integration/ZammadChat.vue';

const primaryColor = ref('#122A43'); // Default primary color
const secondaryColor = ref('#FF5722'); // Default secondary color

onMounted(async () => {
  try {
    // Fetch the primary and secondary colors from the API (e.g., Strapi)
    const response = await fetch('https://strapi.webimpact.io/api/miscellaneous?populate=*');
    const result = await response.json();
    primaryColor.value = result?.data?.attributes?.primary_color || primaryColor.value;
    secondaryColor.value = result?.data?.attributes?.secondary_color || secondaryColor.value;

    // Set the primary and secondary colors as CSS variables on the root element
    document.documentElement.style.setProperty('--primary-color', primaryColor.value);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor.value);

  } catch (error) {
    console.error('Failed to fetch colors:', error);
  }
});


</script>

<style lang="scss">
:root {
  --primary-color: #122A43;
  --secondary-color: #FF5722;
}

/* Apply default primary color only where necessary */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
div {
  color: var(--primary-color);
}

/* Specific styling based on background */
[data-bg="primary"] {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

[data-bg="secondary"] {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

/* Button styles based on primary/secondary */
button {
  border: 1px solid var(--primary-color) !important;
  transition: background-color 0.3s, color 0.3s;
  background-color: var(--primary-color) !important;
  color: #fff !important;
}

button:hover {
  color: #fff !important;
  background-color: var(--secondary-color) !important;
  border: 1px solid var(--secondary-color) !important;
}

/* Link styles */
a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  color: var(--secondary-color);
}
</style>
