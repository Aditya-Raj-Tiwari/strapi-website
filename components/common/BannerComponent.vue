<template>
    <div v-if="imageLoaded" class="mb-32">
        <h1 :class="'reference_heading heading-border--' + props.header_line_position" v-html="heading"
            v-if="heading != '<h1></h1>'"></h1>
        <div class="reference_teaser">
            <div class="reference_teaser-content">
                <!-- Conditionally render image or video based on the file extension of the image prop -->
                <template v-if="isVideo">
                    <video class="reference_teaser-image" :src="image" autoplay muted loop playsinline></video>
                </template>
                <template v-else>
                    <ImageZoomComponent v-if="props.enable_zoom" class="reference_teaser-image" :src="image"
                        alt="Image content" />
                    <img v-else loading="lazy" class="reference_teaser-image" :src="image" alt="Image content" />
                </template>
                <div class="reference_teaser-block"></div>
                <img v-if="background_image" :src="background_image" class="background-image" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ImageZoomComponent from '~/components/animations/ImageZoomComponent.vue';

const props = defineProps({
    image: {
        type: String,
        default: 'https://sm.ign.com/t/ign_de/photo/default/zelda-howlong-blog-1702007187505_73s5.2560.jpg'
    },
    heading: {
        type: String,
        default: ''
    },
    header_line_position: {
        type: String,
        default: 'left'
    },
    enable_zoom: {
        type: Boolean,
        default: false
    },
    background_image: {
        type: String,
        default: ''
    }
});

// Determine whether the media is a video or an image based on the file extension
const isVideo = computed(() => {
    const videoExtensions = ['mp4', 'mov', 'webm'];
    const extension = props.image.split('.').pop().toLowerCase();
    return videoExtensions.includes(extension);
});

const imageLoaded = ref(false);

onMounted(() => {
    imageLoaded.value = true;
});
</script>



<style lang="scss" scoped>
.reference_teaser {
    width: 100%;
    position: relative;

    .background-image {
        position: absolute;
        top: -170px;
        right: -120px;
        max-width: 600px;
        z-index: 3;
        display: none;

    }

    .reference_teaser-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 3rem;

        .reference_teaser {
            height: 100%;
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            width: 100%;

            &-content {
                position: relative;
            }



            &-block {
                background-color: $brown;
                height: 200px;
                width: 70%;
                position: absolute;
                right: 5px;
            }

            &-image {
                width: 90%;
                top: 50px;
                max-width: 1000px;
                height: 300px;
                -o-object-fit: contain;
                object-fit: cover;
                position: relative;
                z-index: 1;
            }

            &-know-how {
                width: 100%;
                min-height: 200px;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                position: absolute;
                z-index: 2;
                top: -100px;
                right: -70px;
            }
        }
    }

}

@media screen and (min-width: 1200px) {
    .reference_heading {
        padding-top: 0px;
        margin-bottom: 30px;
        line-height: 109px;
    }

    .reference_teaser {
        width: 100%;
        margin-top: 7em;


        .reference_teaser-content {
            position: relative;
            margin-bottom: -3rem;

            .reference_teaser {
                height: 700px;

                &-image {
                    top: -2rem;
                    width: 90%;
                    height: 400px;
                }

                &-block {
                    height: 480px;
                    width: 80%;
                    top: -100px;
                }

                &-image {
                    left: 0px;
                    height: 500px;
                    top: -50px;
                }

                &-know-how {
                    min-height: 500px;
                    left: 40%;
                    top: 5%;
                }
            }
        }
    }
}

@media screen and (min-width: 1200px) {

    .reference_teaser {
        width: 100%;

        .background-image {
            display: block
        }

        .reference_teaser-content {
            position: relative;
            margin-bottom: -3rem;

            .reference_teaser {
                height: 700px;

                &-image {
                    top: -2rem;
                    width: 90%;
                    height: 400px;
                }

                &-block {
                    height: 480px;
                    width: 800px;
                    left: calc(0% + 350px);
                    top: -100px;
                }

                &-image {
                    left: -190px;
                    height: 500px;
                    top: -50px;
                }

                &-know-how {
                    min-height: 500px;
                    left: 40%;
                    top: 5%;
                }
            }
        }
    }

}



@media screen and (max-width:571px) {
    .heading-border--right {
        padding-bottom: 9rem;

        &::after {
            content: "";
            right: -15px;
        }
    }
}
</style>
