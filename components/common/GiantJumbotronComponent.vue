<template>
    <div class="about-founded mb-32 lg:ml-32">
        <div class="about-founded__heading heading-border--right">
            <h2>{{ sectionTitle }}</h2>
            <h3>{{ sectionSubHeading }}</h3>
        </div>
        <div class="about-founded__content">
            <div class="about-founded__content-logos-wrapper" ref="imageWrapper">
                <img loading="lazy" class="about-founded__content-logos" :src="image" alt="Logo" ref="logoImage"
                    @load="handleImageLoad" />
            </div>
            <div class="about-founded__content-text">
                <div class="text-white" v-html="heading"></div>
                <h6 class="text-white">{{ subHeading }}</h6>
                <p class="text-white">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    sectionTitle: {
        type: String,
        required: true
    },
    sectionSubHeading: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    subHeading: {
        type: String,
        required: true
    }
});

const imageWrapper = ref(null);
const logoImage = ref(null);

// Enhanced image positioning function that handles both mobile and desktop
const adjustImagePosition = () => {
    if (!imageWrapper.value || !logoImage.value) return;

    if (window.innerWidth <= 571) {
        // Mobile centering logic
        const wrapperWidth = imageWrapper.value.offsetWidth;
        const imageWidth = logoImage.value.offsetWidth;
        const leftPosition = (wrapperWidth - imageWidth) / 2;

        logoImage.value.style.position = 'relative';
        logoImage.value.style.left = `${leftPosition}px`;
        logoImage.value.style.right = 'auto';
        logoImage.value.style.transform = 'translateX(0)';
        logoImage.value.style.top = '0';
    } else {
        // Desktop positioning
        logoImage.value.style.position = 'absolute';
        logoImage.value.style.left = '';
        logoImage.value.style.right = '';
        logoImage.value.style.transform = '';

        // Set different positions based on viewport width
        if (window.innerWidth > 1200) {
            logoImage.value.style.left = '-25%';
        } else {
            logoImage.value.style.left = '-17%';
        }
        logoImage.value.style.top = '-30%';
    }
};

const handleImageLoad = () => {
    adjustImagePosition();
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

const debouncedAdjustImage = debounce(adjustImagePosition, 250);

onMounted(() => {
    window.addEventListener('resize', debouncedAdjustImage);
    adjustImagePosition();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedAdjustImage);
});
</script>

<style lang="scss" scoped>
.about-founded {
    max-width: 1100px;

    .text-white>* {
        color: $white;
    }

    h6 {
        margin-bottom: 1rem;
    }

    &__heading {
        text-align: left;
        padding-bottom: 0;
        z-index: 0;
        margin-right: 1rem;

        h3 {
            margin-top: 20px;
        }

        &::after {
            content: '';
            position: absolute;
            top: 30px;
            bottom: 0;
            z-index: -1;
            background-color: var(--primary-color);
            width: 3px;
            right: -15px;
        }
    }

    &__content {
        background-color: var(--primary-color);
        color: $white;
        max-width: 1000px;
        margin-left: auto;
        margin-top: 1rem;
        position: relative;
        overflow: visible;

        &-logos-wrapper {
            position: relative;
            width: 100%;
            height: auto;
            overflow: visible;
            // Ensure wrapper maintains height in desktop view
            min-height: 200px;
        }

        &-logos {
            position: absolute;
            height: 40%;
            width: auto;
            transition: all 0.3s ease;
            z-index: 1;
        }

        &-text {
            padding: 10rem 1rem 2rem;
            position: relative;
            z-index: 0;
        }
    }
}

@media screen and (min-width: 991px) {
    .about-founded__heading {
        text-align: right;
        padding-bottom: 0;
        line-height: 130px;

        h3 {
            line-height: 70px;
        }
    }
}

@media screen and (min-width: 768px) {
    .about-founded__content {
        &-text {
            padding: 3rem 3rem 3rem 20rem;
        }

        &-logos {
            height: 150%;
            left: -25%;
            top: -30%;
            position: absolute;
        }

        &-logos-wrapper {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
    }
}

@media screen and (min-width:576px) and (max-width: 1200px) {
    .about-founded__content {
        &-text {
            padding: 3rem 3rem 3rem 22rem;
        }

        &-logos {
            left: 1% !important;
            top: 10% !important;
            width: 100%;
            height: 100%;
            max-width: 300px;
            max-height: 300px;
            object-fit: cover;
        }
    }
}

@media screen and (max-width: 571px) {
    .about-founded__content {
        &-text {
            padding: 1rem;
        }

        &-logos-wrapper {
            position: relative;
            width: 100%;
            height: auto;
            margin-bottom: 1rem;
            min-height: auto;
        }

        &-logos {
            position: relative;
            max-width: 90%;
            height: auto;
            max-height: 300px;
            object-fit: contain;
            margin: 0 auto;
            top: 0;
        }

        
    }
.about-founded {
&__heading {
        &::after {
            display: none;
        }
    }
}}
</style>