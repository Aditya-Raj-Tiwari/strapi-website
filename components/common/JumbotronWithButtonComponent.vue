<template>
    <div class="education mb-32">
        <div class="education__heading heading-border--right" v-html="heading"></div>
        <div class="education__grid">
            <div class="education__content">
                <h6>{{ section_heading }}</h6>
                <p class="education__strong" v-html="description">
                </p>
                <AnimationsAnimatedButton :text="buttonText" :link="button_link" color="var(--primary-color)" />

            </div>
            <div class="education__image">
                <img loading="lazy" :src="image" :alt="content" class="education__image--team" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    heading: {
        type: String,
        default: '',
    },
    section_heading: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    buttonText: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '', // Provide a default URL if needed
    },
    button_link: {
        type: String,
        default: '',
    },

});
</script>

<style lang="scss" scoped>
.education {
    margin-bottom: 4rem;

    span {
        font-family: "Quicksand", sans-serif;
        font-optical-sizing: auto;
    }

    h6 {
        margin-bottom: 1rem;
    }

    &__strong {
        margin-top: 1rem;
    }

    &__heading {
        text-align: right;
        max-width: 830px;
        padding-bottom: 5rem;

        &::after,
        &::before {
            background: var(--primary-color);
            width: 3px;
            top: 30px;
        }

        &--right {
            right: -70px;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 2rem;
        position: relative;
    }

    &__content {
        order: 1;
    }

    &__image {
        order: 0;
        margin-top: -3rem;
        position: relative;
        margin-left: 60px;
        display: flex;

        img {
            max-width: 400px;
            max-height: 400px;
        }

        &--team {
            width: 100%;
            height: auto;
        }

        &--ihk {
            position: absolute;
            bottom: -10%;
            right: 0%;
            width: 200px;
            height: auto;
        }
    }

    .button {
        margin-top: 2rem;
        display: block;
        text-align: center;
        background-color: transparent !important;
        color: var(--primary-color) !important;

        &:hover {
            background-color: var(--primary-color) !important;
            color: white !important;
        }
    }
}

@media screen and (min-width: 768px) {
    .education {
        &__grid {
            grid-template-columns: 1fr 1fr;
            grid-gap: 1rem;
        }

        &__content {
            order: 0;
        }

        &__image {
            order: 1;

            &--ihk {
                width: 280px;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .education {
        &__image {
            order: 0;
            position: relative;
            margin-left: 0px;
            max-width: 250px;
            margin: 0 auto;
            margin-top: -3rem;
        }
    }

}


@media screen and (max-width: 1200px) {
    .education__heading{
        text-align: left;
    }
}
</style>
