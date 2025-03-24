<template>
  <div class="teaser">
    <div class="teaser-content">
      <div class="teaser-content--text">
        <h6 class="text-white">{{ title }}</h6>
        <p class="text-white">{{ description }}</p>
        <CommonHexagon class="teaser-hexagon" :button_link="button_link" :content="button_text"
          color="var(--secondary-color)" :class="hexagonClasses" />
      </div>
      <div class="teaser-block" v-if="title || description"></div>
      <img :class="imageClasses" loading="lazy" class="teaser-image" :src="image" alt="cat" />
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';

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

// Computed property to determine image classes
const imageClasses = computed(() => {
  if (props.title || props.description) {
    return 'w-2 h-9 sm:w-16 sm:h-16 object-cover filter brightness-50';
  } else {
    return 'w-full h-auto object-cover filter brightness-50';
  }
});

// Computed property to determine hexagon classes
const hexagonClasses = computed(() => {
  return {
    'teaser-hexagon': true,
    'no-content': !props.title && !props.description,
  };
});
</script>


<style lang="scss" scoped>
.teaser {
  margin-top: 7.5rem;

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
    background-color: var(--primary-color);
    height: 100%;
    max-height: 400px;
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
    min-height: 350px;
    max-height: 450px;
    -o-object-fit: contain;
    object-fit: cover;
    filter: brightness(0.5);
    z-index: 0;

    &.w-full {
      max-width: 100%;
      width: 100%;
      left: auto;
      filter: brightness(1);
    }
  }

  &-hexagon {
    right: 0;

    &.no-content {
      bottom: -50%;
    }
  }
}

@media screen and (max-width: 991px) {
  .teaser {
    &-image {
      position: relative;
    }
  }

}

@media screen and (min-width: 1200px) {
  .teaser {
    &-content {

      &--text {
        padding: 4rem 0 4rem;
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

@media screen and (max-width:900px) {
  .teaser {

    &-content {
      color: $white;
      position: relative;
      padding: 0 15px;

      &--text {
        position: relative;
        max-width: 100%;
        padding: 4rem 0 6rem;
        z-index: 10;

        h6 {
          margin-bottom: 1rem;
          color: var(--secondary-color);
        }
      }
    }

    &-block {
      background-color: var(--primary-color);
      opacity: 0.7;
      z-index: 9;
      height: 100%;
      width: 110%;
      position: absolute;
      top: 0;
      left: -0.7rem;
      z-index: 0;
      padding: 20px;
    }

    &-image {
      position: absolute;
      top: -3rem;
      left: -30px;
      width: 110%;
      height: 100%;
      min-height: unset;
      -o-object-fit: contain;
      object-fit: cover;
      filter: brightness(0.5);
      z-index: -1;

    }

    &-hexagon {
      right: -50%;
      bottom: -6rem;
    }

    .heading-border--left {
      margin-left: 0px;
    }
  }
}

@media screen and (min-width: 900px) and (max-width: 1200px) {
  .teaser {
    padding: 0 1rem;
    margin-bottom: 5rem;

    &-block {
      z-index: 2;
      left: 0;
    }

    &-image {
      position: absolute;
      min-height: unset;
      max-width: 55%;
      -o-object-fit: contain;
      object-fit: cover;
      filter: brightness(0.5);
      z-index: 3;

    }

    &-content {
      z-index: 5;

      &--text {
        max-width: 40%;
        z-index: 5;
        left: 1.4rem;
      }
    }

    &-hexagon {
      z-index: 5;
      top: 5rem;
    }
  }
}
</style>
