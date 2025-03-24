<template>
  <div class="certification">
    <h4>Plentymarkets® Zertifizierungen</h4>
    <div class="certification-carousel">
      <a :href="formatUrl(item.url)" v-for="(item, index) in certificates" :key="item.id"
        class="certification-carousel-item" target="_blank" rel="noopener noreferrer">
        <img loading="lazy" :alt="item.title" :width="item.width || 60" :height="item.height || 70"
          :src="item.imageUrl" />
        <h6>{{ item.title }}</h6>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineProps({
  certificates: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Function to properly format URLs
const formatUrl = (url: string): string => {
  if (!url) return '#';

  // Check if the URL already has a protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Add https:// protocol if missing
  return `https://${url}`;
};
</script>

<style lang="scss">
.certification {
  margin: 5rem auto;

  &-carousel {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0 0;
    flex-wrap: wrap;
    gap: 1rem;

    &-item {
      display: flex;
      min-width: 140px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: white;
      border-radius: 6px;
      box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.17);
      text-decoration: none;
      /* Added to improve link appearance */
      transition: transform 0.2s ease;
      /* Added for hover effect */

      &:hover {
        transform: translateY(-2px);
        /* Added subtle hover effect */
      }

      h6 {
        padding-top: 0.75rem;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .certification {
    margin: 5rem auto;

    &-carousel {
      padding: 2rem 0;
    }
  }
}
</style>