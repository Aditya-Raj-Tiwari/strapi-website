<!-- CommonHexagon.vue -->
<template>
  <div class="hexagon-container">
    <div id="hexagon-circle" :style="{ background: color }"></div>

    <component
      :is="isExternal ? 'a' : 'nuxt-link'"
      :href="isExternal ? formattedHref : null"
      :to="!isExternal ? button_link : null"
      :target="isExternal ? '_blank' : '_self'"
      :rel="isExternal ? 'noopener noreferrer' : null"
      class="hexagon-content"
    >
      {{ content }}
    </component>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

// Define component props
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "var(--secondary-color)",
  },
  button_link: {
    type: String,
    default: "",
  },
});

// Computed property to determine if the link is external
const isExternal = computed(() => {
  return /^(https?:\/\/|www\.)/.test(props.button_link);
});

// Computed property to format external links starting with www.
const formattedHref = computed(() => {
  if (/^www\./.test(props.button_link)) {
    return `https://${props.button_link}`;
  }
  return props.button_link;
});
</script>

<style lang="scss" scoped>
.hexagon {
  display: inline-block;
  vertical-align: middle;
  width: 120px;
  filter: drop-shadow(0px 1px 15px rgba(0, 0, 0, 0.23));
  position: relative;
  z-index: 99;
  fill: var(--primary-color);

  &-container {
    position: relative;
    display: inline-block;
    #hexagon-circle {
      transform: scale(1);
    }

    &:hover {
      #hexagon-circle {
        transform: scale(1.06);
        background: var(--secondary-color) !important;
        transition: all 0.3s ease;
      }
    }
  }

  &-content {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-weight: 900;
    text-align: center;
    font-size: 0.825rem;
    color: $white;
    z-index: 100;
  }
}

#hexagon-circle {
  position: relative;
  margin: 1em auto;
  width: 8em;
  /* Reduced from 10em to 8em (20% decrease) */
  height: 13.856em;
  /* Reduced from 17.32em to ~13.856em (20% decrease) */
  border-radius: 0.8em / 0.4em;
  /* Reduced from 1em / 0.5em to 0.8em / 0.4em */
  opacity: 1;
  background: var(--secondary-color);
  cursor: pointer;
  transform: rotate(30deg);

  &:hover {
    fill: var(--secondary-color) !important;
    background: var(--secondary-color) !important;
  }
  /* Rotate the hexagon */
}

#hexagon-circle:before,
#hexagon-circle:after {
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background: inherit;
  content: "";
}

#hexagon-circle:before {
  transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  /* IE 9 */
  -webkit-transform: rotate(60deg);
  /* Opera, Chrome, and Safari */
}

#hexagon-circle:after {
  transform: rotate(-60deg);
  -ms-transform: rotate(-60deg);
  /* IE 9 */
  -webkit-transform: rotate(-60deg);
  /* Opera, Chrome, and Safari */
}

.hexagon-content {
  cursor: pointer;
}

@media screen and (min-width: 576px) {
  .hexagon {
    &-content {
      font-size: 1.4rem;
    }
  }
}

@media screen and (min-width: 1024px) {
  .hexagon {
    width: 100px;

    &-content {
      font-size: 1.25rem;
    }

    &:hover {
      &-content {
        font-size: 1.3rem;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  #hexagon-circle {
    position: relative;
    left: -55px;
    margin: 1em auto;
    width: 4.5em;
    /* Reduced from 10em to 8em (20% decrease) */
    height: 7.794em;
    /* Reduced from 17.32em to ~13.856em (20% decrease) */
    border-radius: 0.8em / 0.4em;
    /* Reduced from 1em / 0.5em to 0.8em / 0.4em */
    opacity: 1;
    background: var(--secondary-color);
    cursor: pointer;
  }

  .hexagon-content {
    left: -20px;
    cursor: pointer;
    font-size: 1rem;
  }

  .hexagon {
    &-content {
      font-size: 0.9rem;
    }
  }
}
</style>
