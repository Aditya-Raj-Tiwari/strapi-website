<template>
    <div ref="headerElement" :class="[
        'rounder__heading',
        'pb-6',
        `heading-border--${header_line_position}`,
        `heading--${heading_type}`,
        { 'in-view': isInView }
    ]" v-html="heading"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    heading: {
        type: String,
        default: ''
    },
    header_line_position: {
        type: String,
        default: 'right'
    },
    heading_type: {
        type: String,
        default: 'wavy'
    }
});

const headerElement = ref(null);
const isInView = ref(false);
let observer = null;

const handleIntersect = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isInView.value = true;
            if (observer) {
                observer.disconnect();
            }
        }
    });
};

onMounted(() => {
    if (headerElement.value) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(headerElement.value);
    }
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
});
</script>

<style scoped lang="scss">
.heading-border--right::after {
    top: 20px;
}

.rounder__heading {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    position: relative;
    line-height: 109px;
    margin: 2rem 0;


    &.in-view {
        opacity: 1;
        transform: translateY(0);
    }

    /* Pseudoelements initial state */
    &::before,
    &::after {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.5s ease-in-out 1s, transform 0.5s ease-in-out 1s;
        content: '';
        position: absolute;
        /* Ensure pseudoelements are positioned correctly based on the border position */
    }

    &::after {
        right: 0;
    }

    &::before {
        left: 0;
    }

    /* Animate pseudoelements when in view */
    &.in-view::before,
    &.in-view::after {
        opacity: 1;
        transform: translateY(0);
    }

    /* Specific styles for borders */
    &.heading-border--left {
        text-align: left;

        &.heading--wavy {
            &::before {
                background: var(--primary-color);
                width: px;
                height: calc(100% - 6.5rem);
                top: 60px;
                left: -100px;
                /* Additional styles for the wavy effect */
                --s: 14px;
                /* size of the wave */
                --b: 10px;
                /* thickness of the line */
                --m: 0.4;
                /* curvature of the wave [0 2] */
                background: var(--primary-color);
                --R: calc(var(--s) * sqrt(var(--m) * var(--m) + 1) + var(--b) / 2);
                width: calc(2 * var(--R));
                --_g: #0000 calc(99% - var(--b)), #000 calc(101% - var(--b)) 99%, #0000 101%;
                mask: radial-gradient(var(--R) at top 50% right calc(-1 * var(--m) * var(--s)), var(--_g)) calc(50% - var(--s)/2 - var(--b)/2) calc(50% - 2 * var(--s)) / calc(var(--s) + var(--b)) calc(4 * var(--s)) repeat-y,
                    radial-gradient(var(--R) at top 50% left calc(-1 * var(--m) * var(--s)), var(--_g)) calc(50% + var(--s)/2 + var(--b)/2) 50% / calc(var(--s) + var(--b)) calc(4 * var(--s)) repeat-y;
            }
        }


    }

    &.heading-border--right {
        text-align: right;

        &.heading--wavy {
            &::after {
                background: var(--primary-color);
                width: 5px;
                height: calc(100% - 2.5rem);
                top: 60px;
                right: -100px;
                min-height: 200px;
                /* Additional styles for the wavy effect */
                --s: 24px;
                /* size of the wave */
                --b: 10px;
                /* thickness of the line */
                --m: 0.4;
                /* curvature of the wave [0 2] */
                background: var(--primary-color);
                --R: calc(var(--s) * sqrt(var(--m) * var(--m) + 1) + var(--b) / 2);
                width: calc(2 * var(--R));
                --_g: #0000 calc(99% - var(--b)), #000 calc(101% - var(--b)) 99%, #0000 101%;
                mask: radial-gradient(var(--R) at top 50% right calc(-1 * var(--m) * var(--s)), var(--_g)) calc(50% - var(--s)/2 - var(--b)/2) calc(50% - 2 * var(--s)) / calc(var(--s) + var(--b)) calc(4 * var(--s)) repeat-y,
                    radial-gradient(var(--R) at top 50% left calc(-1 * var(--m) * var(--s)), var(--_g)) calc(50% + var(--s)/2 + var(--b)/2) 50% / calc(var(--s) + var(--b)) calc(4 * var(--s)) repeat-y;
            }
        }
    }

}



@media screen and (max-width: 1200px) {
    .rounder__heading {
        padding-bottom: 3rem;
        line-height: 60px;

        h1 {
            font-size: 1.3rem;
        }
    }

    .rounder__heading::before,
    .rounder__heading::after {
        display: none;
    }
}

/* Optional: Respect prefers-reduced-motion for accessibility */
@media (prefers-reduced-motion: reduce) {

    .rounder__heading,
    .rounder__heading::before,
    .rounder__heading::after {
        transition: none;
        transform: none;
        opacity: 1;
    }
}
</style>