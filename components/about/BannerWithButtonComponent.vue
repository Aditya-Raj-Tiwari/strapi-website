<template>
  <div class="teaser">
    <div class="heading-border--left" v-html="heading"></div>
    <div class="teaser-content">
      <div class="teaser-content--text">
        <h6 class="text-white">{{ title }}</h6>
        <p class="text-white">{{ description }}</p>
        <CommonHexagon class="teaser-hexagon" :button_link="button_link" :content="button_text" color="blue" />
      </div>
      <div class="teaser-block"></div>
      <ImageZoomComponent class="teaser-image" :src="image" :alt="cat" />
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';
import ImageZoomComponent from '~/components/animations/ImageZoomComponent.vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  button_text: {
    type: String,
    default: ''
  },
  button_link: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  heading: {
    type: String,
    default: ''
  }
});
</script>


<style lang="scss" scoped>
.teaser {
  &-content {
    color: $white;
    position: relative;

    &--text {
      position: relative;
      max-width: 312px;
      padding: 4rem 0 6rem;
      z-index: 1;

      h6 {
        margin-bottom: 1rem;
      }
    }
  }

  &-block {
    background-color: var(--secondary-color);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: -1rem;
    z-index: 0;
  }

  &-image {
    position: absolute;
    top: -7rem;
    right: 0;
    width: 100%;
    height: 110%;
    max-width: 800px;
    min-height: 450px;
    -o-object-fit: contain;
    object-fit: cover;
    filter: brightness(0.5);
  }

  &-hexagon {
    right: 0;
  }
}

@media screen and (max-width: 991px) {
  .teaser {
    &-image {
      position: relative;
      right: -15%;
      top: -10%;
      max-height: 300px;
      max-width: 350px;
      bottom: unset;
      object-fit: cover;
    }

    &-hexagon {
      right: unset;
      left: 80%;
    }

    &-block {
      top: -5%;
      height: 80%;
    }


  }

}

@media screen and (min-width: 768px) {
  .teaser {
    &-content {
      &--text {
        padding: 4rem 0 10rem;
      }
    }

    &-block {
      width: 75%;
    }

    &-hexagon {
      right: -50%;
    }
  }
}

@media screen and (min-width: 1024px) {
  .teaser {
    &-block {
      left: -6rem;
    }

    &-image {
      filter: unset;
    }

    &-hexagon {
      right: -50%;
    }
  }
}
</style>
