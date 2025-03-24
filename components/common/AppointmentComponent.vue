<template>
  <div class="get-in-contact">
    <div class="get-in-contact__grid">
      <img class="get-in-contact__image" :src="image" :alt="content" />
      <div class="get-in-contact__grid-image">
        <CommonHexagon
          class="teaser-hexagon"
          :content="button_text"
          :button_link="button_link"
          :color="'var(--primary-color)'"
        />
      </div>
      <div class="get-in-contact__grid-content">
        <div class="heading" v-html="heading"></div>
        <div class="p" v-html="description"></div>
      </div>
    </div>

    <!-- Adjusted Curved Text Element -->
    <div class="get-in-contact__curved-text-container">
      <!-- Top Curve (curved downwards) -->
      <svg
        class="get-in-contact__curve get-in-contact__curve--top"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          class="curve-path"
          d="M0,0 Q50,20 100,0"
          :stroke="currentColor"
          fill="transparent"
          stroke-width="3"
          stroke-linecap="butt"
          transform="translate(0,20) scale(1, -1)"
        />
      </svg>

      <!-- Centered Text with Dynamic Link -->
      <component
        :is="isExternal ? 'a' : 'nuxt-link'"
        :href="isExternal ? formattedLink : null"
        :to="!isExternal ? button_link : null"
        :target="isExternal ? '_blank' : '_self'"
        :rel="isExternal ? 'noopener noreferrer' : null"
        class="get-in-contact__curved-text"
      >
        {{ curvedText }}
      </component>

      <!-- Bottom Curve (also curved downwards) -->
      <svg
        class="get-in-contact__curve get-in-contact__curve--bottom"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          class="curve-path"
          d="M0,0 Q50,20 100,0"
          :stroke="currentColor"
          fill="transparent"
          stroke-width="3"
          stroke-linecap="butt"
          transform="translate(0,20) scale(1, -1)"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  button_text: {
    type: String,
    default: "jetzt kontakt aufnehmen",
  },
  button_link: {
    type: String,
    default: "",
  },
  curvedText: {
    type: String,
    default: "Jetzt Termin Vereinbaren",
  },
  content: {
    // Added content prop for alt text
    type: String,
    default: "",
  },
});

// Reference to the current color for dynamic styling
const currentColor = ref("var(--primary-color)");

// Computed property to determine if the link is external
const isExternal = computed(() => {
  return /^(https?:\/\/|www\.)/.test(props.button_link);
});

// Computed property to format external links starting with www.
const formattedLink = computed(() => {
  if (/^www\./.test(props.button_link)) {
    return `https://${props.button_link}`;
  }
  return props.button_link;
});
</script>

<style lang="scss" scoped>
.get-in-contact {
  margin-bottom: 7rem;

  .heading {
    line-height: 62px;
    margin-bottom: 2rem;
  }

  .p {
    font-size: 1.125rem;

    > *:not(h1, h2, h3, h4, h5, h6) {
      text-decoration: underline;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    position: relative;

    &-image {
      display: flex;
      justify-content: flex-end;
      bottom: 0;
      z-index: 3;
      left: 50%;
    }
  }

  .teaser-hexagon {
    bottom: 2%;
    right: 50% !important;
  }

  &__image {
    position: relative;
    width: 100%;
    order: 2;
    max-height: 100%;
    max-width: 50%;
    object-fit: contain;
  }

  /* Adjusted Curved Text Container Styles */
  &__curved-text-container {
    position: relative;
    text-align: center;
    margin: 2rem 0;

    .get-in-contact__curve {
      width: 100%;
      height: 40px;
      overflow: visible;
    }

    .curve-path {
      stroke: var(--primary-color);
      stroke-width: 3;
      fill: transparent;
      stroke-linecap: butt;
      transition: stroke 0.3s ease;
    }

    .get-in-contact__curved-text {
      display: inline-block;
      margin: 1.5rem 0;
      color: var(--primary-color);
      font-weight: 700;
      position: relative;
      z-index: 1;
      font-size: 2rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    /* Hover Effects */
    .get-in-contact__curved-text:hover {
      color: var(--secondary-color) !important;
      /* Change to your secondary color */
    }

    &:hover .curve-path {
      stroke: var(--secondary-color);
    }

    .get-in-contact__curved-text:hover ~ .curve-path,
    .get-in-contact__curve--top:hover .curve-path,
    .get-in-contact__curve--bottom:hover .curve-path {
      stroke: var(--secondary-color);
      /* Change curve color */
    }

    .get-in-contact__curved-text:hover ~ .get-in-contact__curve .curve-path {
      animation: dash 1s forwards;
    }

    @keyframes dash {
      from {
        stroke-dashoffset: 1000;
      }

      to {
        stroke-dashoffset: 0;
      }
    }

    .get-in-contact__curve--top {
      margin-bottom: -20px;
    }

    .get-in-contact__curve--bottom {
      margin-top: -20px;
    }
  }
}

/* Existing media queries */
@media screen and (min-width: 1200px) {
  .get-in-contact {
    margin: 6rem 0;
    position: relative;

    &__grid {
      grid-template-columns: 55% 45%;

      &-content {
        max-width: 400px;
      }
    }

    .teaser-hexagon {
      display: block;
      bottom: unset;
      right: unset;
      position: absolute;
      bottom: 0px;
    }

    &__image {
      position: absolute;
      bottom: -30%;
      left: 0;
      object-fit: contain;
    }
  }
}

.get-in-contact__curved-text-container:hover {
  .get-in-contact__curve--top {
    path {
      stroke: var(--secondary-color);
    }
  }

  .get-in-contact__curve--bottom {
    stroke: var(--secondary-color);
  }

  .get-in-contact__curved-text {
    color: var(--secondary-color) !important;
  }
}

@media screen and (min-width: 1024px) {
  .get-in-contact {
    &__image {
      bottom: unset;
    }
  }
}

@media screen and (max-width: 1200px) {
  .get-in-contact__grid-image {
    position: absolute;
    bottom: 0;
    right: -25%;
  }

  .get-in-contact__image{
    max-width: 80%;
  }
}
</style>
