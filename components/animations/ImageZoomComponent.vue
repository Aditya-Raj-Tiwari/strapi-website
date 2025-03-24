<template>
    <div class="zoom-container" :style="{ width: containerWidth, height: height }" @mousemove="handleMouseMove"
      >
        <img loading="lazy" :src="src" :alt="alt" class="zoom-image"  />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, watchEffect } from 'vue';

// Define the props for the component
const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    objectFit: {
        type: String,
        default: 'cover',
    },
    alt: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '100%', // Default width of the container
    },
    maxWidth: {
        type: String,
        default: '100%', // Default max-width of the container
    },
    maxHeight: {
        type: String,
        default: 'auto', // Default max-height of the container
    },
    height: {
        type: String,
        default: 'auto', // Default height of the container
    },
    zoomScale: {
        type: Number,
        default: 1.4, // Default zoom scale
    },
    transitionDuration: {
        type: String,
        default: '0.4s', // Default transition duration
    },
    enable: {
        type: Boolean,
        default: false,
    },
});

const enableZoom = ref(props.enable);
// Refs for dynamic properties
const containerWidth = ref(props.width);
const isZoomed = ref(false); // Track if the image is zoomed
const showOverlayFlag = ref(false); // Track if the overlay should be shown
let overlayTimer = null; // Timer for overlay display

// Watch the width prop to ensure correct initialization
watchEffect(() => {
    containerWidth.value = props.width;
});

// Function to handle mouse movement over the image
const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event;
    const { width, height } = target.getBoundingClientRect();

    // Calculate the percentage position of the mouse within the element
    const percentX = (offsetX / width) * 100;
    const percentY = (offsetY / height) * 100;

    // Set the transform origin based on mouse position
    target.style.transformOrigin = `${percentX}% ${percentY}%`;
};

// Function to toggle zoom on image click
const toggleZoom = (event) => {
    isZoomed.value = !isZoomed.value;
    event.target.style.transform = isZoomed.value
        ? `scale(${props.zoomScale})`
        : 'scale(1)';

    // Hide the overlay when zooming in
    if (isZoomed.value) {
        showOverlayFlag.value = false;
    }
};

// Function to start the timer for showing the overlay
const startOverlayTimer = () => {
    overlayTimer = setTimeout(() => {
        if (!isZoomed.value) {
            showOverlayFlag.value = true;
        }
    }, 400); // 0.4 seconds delay
};

// Function to hide overlay and reset zoom on mouse leave
const handleMouseLeave = (event) => {
    // Clear the timer if the mouse leaves before 0.4 seconds
    clearTimeout(overlayTimer);

    // Reset transform origin to center
    event.target.style.transformOrigin = 'center center';

    // Reset zoom and hide overlay
    if (!isZoomed.value) {
        showOverlayFlag.value = false;
    }
    event.target.style.transform = 'scale(1)';
};

onMounted(() => {
    enableZoom.value = props.enable;
   
});
</script>


<style scoped>
.zoom-container {
    overflow: hidden;
    display: inline-block;
    position: relative;
    transition: width var(--transition-duration) ease-in-out;
}

.zoom-image {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform var(--transition-duration) ease-in-out;
    transform-origin: center center;
    max-height: 500px;
    object-fit: cover !important;
}

.overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 200px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.8);
    /* Semi-transparent overlay */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    pointer-events: none;
    /* Allow clicks to pass through to the image */
    transition: opacity 0.5s ease-in-out;

    /* Smooth fade-in */
    svg {
        width: 50px;
        height: 50px;
        margin-left: 0.5rem;
        position: relative;
        top: -10px;
    }
}
</style>

