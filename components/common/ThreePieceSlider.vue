<template>
    <div class="carousel-container">
        <div class="carousel animate" ref="carousel">
            <div v-for="(slide, i) in slides" :key="i" class="slide animate" :class="{ active: i === activeSlide }"
                @transitionend="transitionCompleted">
                <p class="slide-solution-count">Leistung {{ i + 1 }}</p>
                <h6 class="slide-solution-name">{{ slide.headline }}</h6>
                <IconRocket v-if="slide.icon === 'rocket'" class="slide-solution-icon" />
                <IconBulb v-if="slide.icon === 'bulb'" class="slide-solution-icon" />
                <IconTarget v-if="slide.icon === 'target'" class="slide-solution-icon" />
            </div>
        </div>
        <div class="controls">
            <button @click="prev()" class="controls-button controls-button--left">
                <IconArrow />
            </button>
            <button @click="next()" class="controls-button controls-button--right">
                <IconArrow />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import IconRocket from "~/assets/icons/rocket.svg";
import IconBulb from "~/assets/icons/bulb.svg";
import IconTarget from "~/assets/icons/target.svg";
import IconArrow from "~/assets/icons/arrow.svg";

const emit = defineEmits(["activeSlide"]);

const slides = ref([
    {
        headline: "Headline 1 Blabla",
        icon: "rocket",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        headline: "Headline 2 Blabla",
        icon: "bulb",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        headline: "Headline 3 Blabla",
        icon: "target",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        headline: "Headline 4 Blabla",
        icon: "rocket",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
    {
        headline: "Headline 5 Blabla",
        icon: "bulb",
        description:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    },
]);

const amount = slides.value.length;
const translationComplete = ref(true);
let index = 0;
const carousel = ref();
let currTransl: Array<number> = [];
let moveOffset = 0;
let activeSlide = ref(0);

onMounted(() => {
    const firstSlide = carousel.value.children[0];
    const lastSlide = carousel.value.children[amount - 1];
    moveOffset = parseInt(firstSlide.offsetWidth);

    for (var i = 0; i < amount; i++) {
        currTransl[i] = -moveOffset;
    }

    carousel.value.insertBefore(lastSlide, firstSlide);

    emit("activeSlide", slides.value[0]);
});

function transitionCompleted() {
    translationComplete.value = true;
}

function prev() {
    if (translationComplete.value === true) {
        translationComplete.value = false;
        index--;
        if (index == -1) {
            index = amount - 1;
        }
        let outerIndex = index % amount;
        activeSlide.value = index;

        for (let i = 0; i < amount; i++) {
            const slide = carousel.value.children[i];
            slide.style.opacity = "1";
            slide.style.transform =
                "translateX(" + (currTransl[i] + moveOffset) + "px)";
            currTransl[i] = currTransl[i] + moveOffset;
        }
        let outerSlide = carousel.value.children[outerIndex];
        outerSlide.style.transform =
            "translateX(" + (currTransl[outerIndex] - moveOffset * amount) + "px)";
        outerSlide.style.opacity = "0";
        currTransl[outerIndex] = currTransl[outerIndex] - moveOffset * amount;
    }
    emit("activeSlide", slides.value[activeSlide.value]);
}

function next() {
    if (translationComplete.value === true) {
        translationComplete.value = false;
        let outerIndex = index % amount;
        index++;
        if (index == amount) {
            index = 0;
        }
        activeSlide.value = index;
        for (let i = 0; i < amount; i++) {
            const slide = carousel.value.children[i];
            slide.style.opacity = "1";
            slide.style.transform =
                "translateX(" + (currTransl[i] - moveOffset) + "px)";
            currTransl[i] = currTransl[i] - moveOffset;
        }
        let outerSlide = carousel.value.children[outerIndex];
        outerSlide.style.transform =
            "translateX(" + (currTransl[outerIndex] + moveOffset * amount) + "px)";
        outerSlide.style.opacity = "0";
        currTransl[outerIndex] = currTransl[outerIndex] + moveOffset * amount;
    }

    emit("activeSlide", slides.value[activeSlide.value]);
}
</script>

<style lang="scss" scoped>
.carousel-container {
    position: relative;
    height: 100%;

    .carousel {
        position: relative;
        display: flex;
        height: 100%;
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
    }

    .slide {
        position: relative;
        transform: translateX(-99.9999%);
        color: grey;
        flex: 1 0 100%;
        flex-basis: 33.33333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem 0;

        &.active {
            .slide-solution-icon {
                color: $fontBlack;
            }
        }

        &-solution-count {
            color: grey;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            font-size: 0.75rem;
        }

        &-solution-name {
            color: $fontBlack;
            font-size: 0.825rem;
            text-align: center;
        }

        &-solution-icon {
            width: 70px;
            height: 70px;
            padding: 1rem;
        }
    }

    .controls {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        width: 100%;

        &-button {
            background-color: transparent;
            border: none;
            padding: 0 1rem;
            cursor: pointer;

            svg {
                height: 24px;
                width: auto;
            }

            &--left {
                transform: rotate(-180deg);
            }
        }
    }
}

.animate {
    -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    transition-duration: 0.5s;
    transition-property: transform;
}

@media screen and (min-width: 768px) {
    .carousel-container {
        .slide {
            &-solution-count {
                font-size: 1rem;
            }

            &-solution-name {
                font-size: 1rem;
            }

            &-solution-icon {
                width: 120px;
                height: 120px;
            }
        }
    }
}

@media screen and (min-width: 1024px) {
    .carousel-container {
        .slide {
            &-solution-icon {
                width: 160px;
                height: 160px;
                padding: 2rem;
            }
        }
    }
}
</style>
