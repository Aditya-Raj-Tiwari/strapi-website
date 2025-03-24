<template>
  <div class="services-overview mt-8">
    <div class="services-overview__content">
      <div class="services-overview__content-block">
        <div class="services-overview__content-block-monitor"
          :style="{ backgroundImage: `url(${currentServiceImage})` }">
        </div>
        <div class="services-overview__content-arrows">
          <button class="services-overview__arrow services-overview__arrow--left" @click="switchService('minus')"
            :disabled="selected === 0">
            <IconArrow />
          </button>
          <button class="services-overview__arrow" @click="switchService('plus')"
            :disabled="selected === services.length - 1">
            <IconArrow />
          </button>
        </div>
        <p class="services-overview__pre-headline text-white">
          {{ services[selected].sub_heading }}
        </p>
        <h6 class="text-white">{{ services[selected].service_heading }}</h6>
        <p class="text-white">{{ services[selected].description }}</p>
      </div>
      <div class="services-overview__content-buttons">
        <div class="content-button" :class="{ active: selected === i }" v-for="(service, i) in services" :key="i"
          @click="selectService(i)">
          <p class="services-overview__pre-headline text-white">
            {{ service.sub_heading }}
          </p>
          <h6 class="text-white">{{ service.service_heading }}</h6>
          <img loading="lazy" class="services-overview__icon object-cover object-center rounded-full w-8 h-8"
            :src="service.service_image" width="20px" height="20px"></img>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import IconArrow from "~/assets/icons/arrow.svg";

// Define props to be passed down from the parent component
const props = defineProps({
  heading: String,
  services: {
    type: Array as () => Array<{
      service_heading: string;
      sub_heading: string;
      description: string;
      image: string;
      service_image: string;
    }>,
    required: true,
  },
  ctaContent: {
    type: String,
    default: ''
  },
  ctaColor: {
    type: String,
    default: ''
  }
});

const selected = ref(0);

// Computed property to dynamically get the current service image
const currentServiceImage = computed(() => props.services[selected.value].image);

function selectService(i: number) {
  selected.value = i;
}

function switchService(direction: string) {
  if (direction === "minus") {
    selected.value = selected.value - 1;
  } else {
    selected.value = selected.value + 1;
  }
}
</script>


<style lang="scss" scoped>
.services-overview {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 7rem;
  margin-top: -2rem;

  h3 {
    position: relative;
    margin: 0;
    padding-top: 4rem;
    margin-bottom: 2rem;
    line-height: 42px;
    margin-top: -2rem;

    &::before {
      content: none;
      width: 3px;
      height: 100%;
      background-color: black;
      display: block;
      position: absolute;
      top: 0;
      left: -20px;
    }
  }

  &__icon {
    position: absolute;
    width: 70px;
    height: 100%;
    right: 0.5rem;
    top: 0.5rem;
  }

  &__content {
    width: 100%;



    &-block {
      background-color: var(--primary-color);
      color: $white;
      padding: 3rem 1rem 6rem;
      height: fit-content;
      position: relative;

      h6 {
        margin-bottom: 1rem;
      }

      &-monitor {
        width: 150px;
        height: 150px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: unset;
        left: unset;
        bottom: -6rem;
        right: 0;
      }
    }

    @media screen and (max-width:900px) {
      &-block {
        padding: 5rem 1rem 6rem;
      }
    }

    &-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.75rem;
      padding-top: 0.75rem;
      width: 80%;
      position: relative;
      color: $white;

      .teaser-hexagon {
        left: 1rem;
        bottom: -40px;
      }
    }

    &-arrows {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  &__arrow {
    background-color: $white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.25rem;
    cursor: pointer;

    &:first-of-type {
      margin-right: 0.5rem;
      transform: rotate(-180deg);
    }
  }

  .content-button {
    padding: 1rem 3rem 1rem 1rem;
    background-color: grey;
    cursor: pointer;
    display: none;
    position: relative;

    &.active {
      background-color: var(--primary-color);
    }
  }
}

@media screen and (min-width: 1200px) {
  .services-overview {
    padding-bottom: 7rem;

    h3 {
      padding-top: 9rem;

      &::before {
        content: "";

      }
    }

    &__content {
      width: 90%;

      &-block {
        padding: 4rem 4rem 4rem 18rem;
        height: fit-content;

        &-monitor {
          width: 400px;
          height: 100%;
          left: -200px;
          top: -5rem;
          bottom: unset;
          right: unset;
          background-size: contain;
        }
      }

      &-arrows {
        top: 1.5rem;
        right: 2rem;
      }

      &-buttons {
        .teaser-hexagon {
          left: calc(100% + 1rem);
          bottom: 0;
          display: none;
        }
      }
    }

    .content-button {
      display: block;
    }
  }
}



@media screen and (min-width: 1200px) {
  .services-overview {
    &__icon {
      width: 50px;
      height: 50px;
      position: absolute;

    }
  }
}

@media screen and (max-width:571px) {
  .services-overview {
    margin-bottom: 150px;
  }
}
</style>
