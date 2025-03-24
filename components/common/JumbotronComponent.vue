<template>
    <div class="rounder mb-16">
        <div class="rounder__grid" :class="{ 'content-first': header_line_position === 'left' }" ref="gridContainer">
            <div class="rounder__image" ref="imageContainer">
                <img loading="lazy" :src="image" alt="" ref="imgElement" />
            </div>

            <!-- Only render content if we have text; if you prefer an empty box, remove the v-if -->
            <div class="rounder__content" ref="contentContainer" v-if="hasTextContent">
                <h5 class="mb-4">{{ content_heading }}</h5>
                <div class="rounder__strong" v-html="description"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
    heading: String,
    description: String,
    content_heading: String,
    image: String,
    header_line_position: {
        type: String,
        default: 'right',
    },
});

const gridContainer = ref<HTMLElement | null>(null);
const imageContainer = ref<HTMLElement | null>(null);
const contentContainer = ref<HTMLElement | null>(null);
const imgElement = ref<HTMLImageElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const hasTextContent = computed(() => {
    return (
        (props.description && props.description.trim() !== '') ||
        (props.content_heading && props.content_heading.trim() !== '')
    );
});

const adjustHeights = () => {
    if (!imageContainer.value || !imgElement.value) return;

    // Only apply logic on desktop screens
    if (window.innerWidth >= 768) {
        if (hasTextContent.value && contentContainer.value) {
            // If there's text: match content's height or 300px, whichever is greater
            const textHeight = contentContainer.value.offsetHeight;
            const finalHeight = Math.max(textHeight, 300);
            imageContainer.value.style.height = finalHeight + 'px';
            imgElement.value.style.height = '100%';
            imgElement.value.style.width = '100%';
            imgElement.value.style.objectFit = 'cover';
        } else {
            // If no text, use a min height of 300px
            imageContainer.value.style.height = '300px';
            imgElement.value.style.height = '100%';
            imgElement.value.style.width = '100%';
            imgElement.value.style.objectFit = 'cover';
        }
    } else {
        // Mobile: revert to auto
        imageContainer.value.style.height = 'auto';
        imgElement.value.style.height = 'auto';
    }
};

onMounted(() => {
    nextTick(() => {
        adjustHeights();
    });

    // Adjust on window resize
    window.addEventListener('resize', adjustHeights);

    // Observe content changes with ResizeObserver
    if (contentContainer.value) {
        resizeObserver = new ResizeObserver(() => {
            adjustHeights();
        });
        resizeObserver.observe(contentContainer.value);
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustHeights);
    if (resizeObserver && contentContainer.value) {
        resizeObserver.unobserve(contentContainer.value);
        resizeObserver.disconnect();
        resizeObserver = null;
    }
});
</script>

<style scoped lang="scss">
.rounder {
    &__grid {
        display: block; // Mobile: single column
    }

    &__image {
        width: 100%;
        padding-top: 30px;
        overflow: hidden;
    }

    &__content {
        width: 100%;
        padding-top: 1rem;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
}

// Desktop
@media screen and (min-width: 768px) {
    .rounder__grid {
        display: flex;
        gap: 2rem;
        align-items: stretch;

        &.content-first {
            flex-direction: row-reverse;
        }
    }

    .rounder__image,
    .rounder__content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>
