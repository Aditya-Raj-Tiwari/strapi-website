<template>
  <div class="review text-white mb-16">
    <div class="review-content ">
      <div class="review-content-text text-white">
        <p class="text-white">{{ props.review.customer_name }}</p>
        <h6>{{ props.review.project_name }}</h6>
        <p class="text-white pb-5 break-words">{{ props.review.Description }}</p>
      </div>
      <div class="review-block"></div>
      <div class="review-image-container">
        <img loading="lazy" :src="props.review.project_pic" :alt="props.review.project_name" />
      </div>
      <div class="review__customer">
        <div class="review__customer-presentation">
          <!-- Show this block only if any of the fields needed are present -->
          <div class="review__customer-text break-words"
            v-if="props.review.customer_title_person || props.review.customer_name_person || props.review.image_description">
            <!-- Mobile section: show only if title or name is present -->
            <div class="review__customer-description review__customer-description--mobile"
              v-if="props.review.customer_title_person || props.review.customer_name_person">
              <p class="review__customer-positio break-wordsn" v-if="props.review.customer_title_person">
                {{ props.review.customer_title_person }}
              </p>
              <p class="review__customer-name break-words" v-if="props.review.customer_name_person">
                {{ props.review.customer_name_person }}
              </p>
            </div>
            <!-- Show image_description only if present -->
            <div v-if="props.review.image_description">
              {{ props.review.image_description }}
            </div>
          </div>

          <div class="review__customer-info" :class="{ 'no-text': !hasCustomerInfo }">
            <img loading="lazy" :src="props.review.customer_pic" :alt="props.review.customer_name_person"
              class="hexagon-image" />
            <!-- Desktop section: show only if title or name is present -->
            <div class="review__customer-description review__customer-description--desktop"
              v-if="props.review.customer_title_person || props.review.customer_name_person">
              <p class="review__customer-position break-words" v-if="props.review.customer_title_person">
                {{ props.review.customer_title_person }}
              </p>
              <p class="review__customer-name break-words" v-if="props.review.customer_name_person">
                {{ props.review.customer_name_person }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Review {
  customer_name: string;
  project_name: string;
  Description: string;
  Title?: string;
  image_description?: string;
  customer_pic?: string;
  customer_title_person?: string;
  customer_name_person?: string;
  project_pic?: string;
}

const hasCustomerInfo = computed(() => {
  return Boolean(
    props.review.customer_title_person ||
    props.review.customer_name_person ||
    props.review.image_description
  );
});

const props = defineProps<{
  review: Review;
}>();
</script>



<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.review {
  display: none;

  &.active {
    display: block;
  }

  &-heading {
    text-align: right;
  }

  &-content {
    position: relative;
    color: $white;
    margin-top: -2rem;

    &-text {
      position: relative;
      max-width: 100%;
      padding: 1.5rem 1rem;
      z-index: 1;
      background-color: var(--primary-color);

      h6 {
        margin-bottom: 1rem;
      }
    }
  }

  &-block {
    background-color: var(--primary-color);
    height: 100%;
    width: 65%;
    position: absolute;
    top: 0;
    left: -6rem;
    z-index: 0;
    display: none;
  }

  &-image-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #F2F2F2;
      border-radius: 4px;
      animation: fadeIn 1s ease-in-out;
      /* Apply fade-in animation */
    }
  }

  &__customer {
    position: static;
    color: $fontBlack;
    width: 100%;
    margin-top: 1rem;

    &-presentation {
      position: relative;
      left: 0;
      bottom: 0;
      display: flex;
    }

    &-text {
      position: absolute;
      right: 0;
      top: 20px;
      background-color: #fff;
      width: 68%;
      border-radius: 10px;
      padding: 1rem 0.5rem 0.5rem;
      margin-left: auto;
      box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.4);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 90%;
        width: 0;
        height: 0;
        border: 39px solid transparent;
        border-top-color: #ffffff;
        border-bottom: 0;
        border-right: 0;
        margin-left: -19.5px;
        margin-bottom: -39px;
      }
    }

    &-info {
      position: absolute;
      top: 180px;
      display: flex;
      align-items: center;
      width: 100%;
      gap: 1.5rem;
      pointer-events: none;
      z-index: 2;

      &.no-text{
        top: 0;
        right:-20rem;
        left: unset;
      }

      img {
        max-width: 170px;
        max-height: 170px;
        border-radius: 50%;
        box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.4);
        /* Apply fade-in animation */
      }
    }

    &-position {
      color: gray;
      font-size: 0.875rem;
    }

    &-name {
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
    }



    &-description {
      &--desktop {
        display: block !important;


      }

      &--mobile {
        padding-bottom: 1rem;
      }
    }

    @media screen and (max-width: 1200px) {

      &-description {
        &--desktop {
          display: none !important;
        }
      }
    }
  }
}

/* Hexagon Image Styles */
.hexagon-image {
  width: 180px;
  /* Adjust size as needed */
  height: 180px;
  /* Adjust size as needed */
  clip-path: polygon(25% 5%,
      75% 5%,
      100% 50%,
      75% 95%,
      25% 95%,
      0% 50%);
  object-fit: cover;
  /* Optional: add a border */
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
  /* Optional: add shadow */
  transition: transform 0.3s ease;
  /* Optional: add hover effect */

  /* Optional Hover Effect */
  &:hover {
    transform: scale(1.05);
  }
}

@media screen and (min-width: 768px) {
  .review {
    &__customer {
      &-text {
        width: 82%;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .review {
    &__customer {
      &-text {
        padding: 1rem 0.5rem 3.5rem;
      }

      &-info {
        top: 20px;
        &.no-text {
            top: -50px;
            right: unset;
          }

        img {
          max-width: 120px;
          max-height: 120px;

        }
      }
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 571px) {
  .review {
    margin-bottom: 20rem;

    &__customer {
      &-text {
        padding: 1rem 0.5rem 3.5rem;
      }

      &-info {
        top: -5px;
        left: 30px;

        img {
          max-width: 120px;
          max-height: 120px;
        }
      }
    }
  }
}

@media screen and (max-width: 571px) {
  .review {
    &__customer {
      position: relative;
      display: block;

      &-presentation {
        display: flex;
        flex-direction: column;
      }

      &-text {
        position: relative;
        padding: 1rem 0.5rem 3.5rem;
        margin-left: 0;
        width: 100%;
      }

      &-info {
        display: block;
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding-top: 30px;

        img {
          max-width: 120px;
          max-height: 120px;

        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .review {
    &__customer {
      &-text {
        padding: 1rem 0.5rem 3.5rem;
      }

      &-info {
        img {
          max-width: 160px;
          max-height: 160px;
        }
      }
    }
  }
}


@media screen and (min-width: 1200px) {
  .review {
    &-content {
      margin-top: -6rem;

      &-text {
        background-color: transparent;
        padding: 4rem 0 7rem 6rem;
        max-width: 500px;
      }
    }

    &-block {
      display: block;
    }

    &-image-container {
      position: absolute;
      top: 2rem;
      left: 49%;
      width: 75%;
      height: 100%;
      border-radius: 3px;
    }

    &__customer {
      margin-top: 0;
      position: absolute;

      &-presentation {
        display: block;
        position: absolute;
        bottom: -3rem;
        left: 15%;
      }

      &-text {
        width: 500px;
        padding: 2rem;
        margin-left: 0;
        position: relative;
      }

      &-info {
        left: calc(100% + 1rem);
        bottom: -30%;
        position: absolute;
      }

      &-description {
        &--desktop {
          display: block;
        }

        &--mobile {
          display: none;
          padding-bottom: 1rem;
        }
      }
    }
  }
}
</style>
