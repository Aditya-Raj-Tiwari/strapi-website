<template>
    <div :class="['reviews', { 'reviews--no-buttons': reviews.length <= 1 }]">
        <CommonSingleReview v-for="(reviewItem, index) in reviews" :key="index" :review="reviewItem"
            :class="{ 'active': activeIndex === index }" />
        <div class="reviews__control" v-if="reviews.length > 1">
            <div class="reviews__control-arrows">
                <button class="reviews__control-arrow" @click="switchReview('minus')" :disabled="activeIndex === 0">
                    <IconArrow class="control-arrow control-arrow--left" />
                </button>
                <button class="reviews__control-arrow" @click="switchReview('plus')"
                    :disabled="activeIndex === reviews.length - 1">
                    <IconArrow class="control-arrow control-arrow--right" />
                </button>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, defineProps, withDefaults } from 'vue';
import IconArrow from '~/assets/icons/arrow.svg';

interface Review {
    company_name: string;
    project_name: string;
    description: string;
    title: string;
    image_description: string;
    customer_position: string;
    customer_name_person: string;
    project_pic: string;
    customer_pic: string;
}

const props = withDefaults(defineProps<{
    reviews: Review[];
    initialActiveIndex: number;
    headerText: string;
}>(), {
    initialActiveIndex: 0,
    headerText: ''
});

const activeIndex = ref(props.initialActiveIndex);

// Function to switch reviews based on direction
function switchReview(direction: string) {
    const oldIndex = activeIndex.value;
    if (direction === 'minus') {
        activeIndex.value = Math.max(0, activeIndex.value - 1);
    } else if (direction === 'plus') {
        activeIndex.value = Math.min(props.reviews.length - 1, activeIndex.value + 1);
    }
}
</script>


<style lang="scss" scoped>
.reviews {
    margin-bottom: 10rem;

    &--no-buttons {
         margin-bottom: 16rem;
    }

    &__heading {
        text-align: right;
        padding-bottom: 3rem;
    }

    &__control {
        text-align: right;
        padding-top: 1rem;
        margin-left: 0;

        &-arrows {
            display: flex;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        &-arrow {
            background-color: white;
            border: none;
            position: relative;
            z-index: 3;
            top: 1rem;
            border-radius: 0.375rem;
            padding: 0.7rem 1.5rem;
            /* Increase padding to make the button larger */
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            .control-arrow {
                width: 24px;
                /* Adjust icon size */
                height: 24px;
                /* Adjust icon size */
                display: block;

                &--left {
                    transform: rotate(-180deg);
                }
            }

            &:hover {
                background-color: #f0f0f0;
                /* Optional: Add a hover effect for better UX */
            }
        }
    }
}

.reviews--no-buttons {
    padding-top: 5rem;
}


@media screen and (max-width: 991px) {
    .reviews {
        margin-bottom: 4rem;
    }
}


@media screen and (max-width: 571px) {
    .reviews {
        margin-bottom: 4rem;

        &--no-buttons {
            margin-bottom: 4rem;
        }
    }
}

@media screen and (max-width: 991px) and (min-width: 571px) {
    .reviews {
        &__control {
            position: absolute;
            left: 0;
            bottom: -230px;
            margin-left: 0;

            &-arrows {
                padding-left: 0;
                justify-content: flex-end;
            }
        }
    }
}

@media screen and (max-width: 767px) and (min-width: 576px) {
    .reviews {

        &__control {
            position: absolute;
            left: 0;
            bottom: -230px;
            margin-left: 0;

            &-arrows {
                padding-left: 0;
                justify-content: flex-end;
            }
        }
    }
}

@media screen and (max-width: 1200px) and (min-width: 991px) {
    .reviews {
        margin-bottom: 205px;

        &--no-buttons {
            margin-bottom: 270px;
        }

        &__control {
            position: absolute;
            left: 0;
            bottom: -190px;
            margin-left: 0;
            z-index: 99;

            &-arrows {
                padding-left: 0;
                justify-content: flex-end;
            }
        }
    }
}


@media screen and (min-width: 1024px) {
    .reviews {
        &__control {
            &-arrows {
                padding-left: 1rem;
            }
        }
    }
}

@media screen and (min-width: 1200px) {
    .reviews {
        &__heading {
            padding-bottom: 9rem;

            &::after {
                top: 30px;
            }
        }

        &__control {
            margin-left: 0;

            &-arrows {
                padding-left: 0;
                justify-content: flex-end;
            }
        }
    }
}
</style>
