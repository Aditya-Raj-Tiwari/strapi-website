<template>
  <div class="member">
    <div class="member__content">
      <p class="member__content-name">{{ name }}</p>
      <div class="member__content-block w-100 lg:w-64">
        <h6 class=" text-white">{{ job_position }}</h6>
        <div class="text-cut text-white">{{ description }}</div>
        <img class="member__picture" :src="image" :alt="name" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  job_position: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.member {

  &__content {

    &-name {
      width: 75%;
      text-align: right;
      font-size: 4rem;
      font-family: "Amatic SC";
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    &-block {
      width: 75%;
      background-color: var(--secondary-color);
      color: $white;
      padding: 1rem 6rem 1rem 1rem;
      position: relative;

      h6 {
        margin-bottom: 1.5rem;
      }
    }
  }

  &__picture {
    position: absolute;
    left: 60%;
    bottom: -1.5rem;
    max-height: 100%;
    object-fit: cover;
  }
}



@media screen and (max-width: 991px) {
  .member {
    &__content {
      &-block {
        width: 85%;
        padding: 1rem 1rem 1rem 1rem;
        text-align: left;
      }

    &-name {
      text-align: left;
      }
    }

    &__picture {
      max-width: 90px;
      min-width: 150px;
      max-height: 150px;
      top: -70px;
      left: 70%;
    }
  }
}

</style>
