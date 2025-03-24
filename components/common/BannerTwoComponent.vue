<template>
    <div>
        <div class="reference_teaser">
            <div :class="'reference_heading heading-border--' + props.header_line_position" v-html="heading"></div>
            <div class="reference_teaser-content">
                <img loading="lazy" class="reference_teaser-image" :src="image" alt="cat" />
                <div class="reference_teaser-block">
                    <div class="reference_teaser-know-how"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    image: {
        type: String,
        default: ''
    },
    heading: {
        type: String,
        default: ''
    },
    header_line_position: {
        type: String,
        default: 'left'
    }
});


</script>


<style lang="scss" scoped>
.reference_teaser {
    width: 100%;

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
                height: 300px;
                -o-object-fit: contain;
                object-fit: cover;
                position: relative;
                z-index: 1;
            }

            &-know-how {
                background-image: url(../../assets/images/mug_shot.png);
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

@media screen and (min-width: 768px) {
    .reference_teaser {
        width: 100%;

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
                    height: 380px;
                    width: 500px;
                    left: calc(30% + 350px);
                    top: -100px;
                }

                &-image {
                    left: -200px;
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
</style>
