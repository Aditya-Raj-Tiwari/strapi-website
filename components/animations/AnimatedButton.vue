<!-- AnimatedButton.vue -->
<template>
    <div class="animated-button-container">
        <!-- External Link -->
        <a v-if="isExternal" :href="formattedLink" target="_blank" rel="noopener noreferrer" class="animated-button"
            >
            <svg class="button-svg" width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%"></rect>
            </svg>
            <span>{{ text }}</span>
        </a>

        <!-- Internal Link -->
        <nuxt-link v-else :to="link" class="animated-button" >
            <svg class="button-svg" width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%"></rect>
            </svg>
            <span>{{ text }}</span>
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'var(--primary-color)',
    },
});

// Computed property to determine if the link is external
const isExternal = computed(() => {
    return /^(https?:\/\/|www\.)/.test(props.link);
});

// Computed property to format external links starting with www.
const formattedLink = computed(() => {
    if (/^www\./.test(props.link)) {
        return `https://${props.link}`;
    }
    return props.link;
});
</script>

<style lang="scss" scoped>
.animated-button {
    position: relative;
    display: inline-block;
    padding: 0.75em 1.5em;
    font-size: 1.1rem;
    font-weight: 100;
    color: var(--primary-color);
    text-transform: uppercase;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.6s ease;
    border: 2px solid var(--primary-color);
    margin-top: 2rem;
    text-align: center;
    width: 100%;
    font-weight: bold;
    border-radius: 5px;
    letter-spacing: 1px;
    font-family: "Quicksand", sans-serif;
    font-optical-sizing: auto;

    &:hover {
        font-weight: bold;
        letter-spacing: 2px;
        color: var(--primary-color);



        .button-svg rect {
            stroke: var(--primary-color);
            stroke-width: 0.1px;
            stroke-dasharray: 15, 310;
            stroke-dashoffset: 48;
            transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
        }
    }

    .button-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;

        rect {
            fill: none;
            stroke: var(--primary-color);
            stroke-width: 2;
            stroke-dasharray: 422, 0;
            transition: all 0.35s linear;
        }
    }

    span {
        position: relative;
        z-index: 1;
    }
}
</style>
