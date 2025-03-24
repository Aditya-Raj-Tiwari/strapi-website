<template>
  <div class="partners">
    <div class="partners-heading heading-border--left">
      <h2>
        Ein starker Partner <br />
        für starke Marken
      </h2>
    </div>
    <div class="partners-grid" :class="{ hideShadow: showAll }">
      <div class="partners-grid-item" v-for="n in visibleParnters" :key="n">
        <img loading="lazy" alt="" />
      </div>
    </div>
    <button v-if="!showAll" @click="showAllPartners" class="partners-button">
      Alle anzeigen
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

let visibleParnters = ref(12);
const allPartners = ref(29);
let showAll = ref(false);

function showAllPartners() {
  if (visibleParnters.value < allPartners.value) {
    visibleParnters.value = allPartners.value;
    showAll.value = true;
  }
}
</script>

<style lang="scss" scoped>
.partners {
  margin-top: 0;

  &-heading {
    padding-bottom: 0;
    padding-top: 9rem;

    &::before {
      top: unset;
      bottom: 0;
    }
  }
  &-grid {
    --gap: 10px;
    --columns: 2;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: var(--gap);
    margin-top: 2rem;
    position: relative;

    &.hideShadow::after {
      background: none;
      height: 0;
      width: 0;
    }

    &:after {
      width: calc(100% + 20px);
      height: 300px;
      background: linear-gradient(0deg, #f2f2f2, transparent);
      position: absolute;
      bottom: 0;
      left: 0;
      content: close-quote;
    }

    &-item {
      width: calc(
        (100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns))
      );
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;

      img {
        width: auto;
        height: 60px;
      }
    }
  }

  &-button {
    border-radius: 12px;
    background-color: transparent;
    border: 2px solid #223a56;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 0.825rem;
    padding: 0.75rem 1rem;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }
}

@media screen and (min-width: 768px) {
  .partners {
    margin-top: 2rem;

    &-heading {
      padding-top: 4rem;
    }
    &-grid {
      --gap: 20px;
      --columns: 4;
      margin-top: 5rem;
    }

    &-button {
      font-size: 1rem;
      padding: 1rem 2rem;
    }
  }
}

@media screen and (min-width: 1024px) {
  .partners {
    margin-top: 0;

    &-button {
      font-size: 1.3125rem;
      padding: 1rem 2rem;
    }
  }
}
</style>
