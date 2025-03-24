<template>
  <div class="fence-container">
    <!-- LEFT SVG -->
    <svg
      class="fence-svg fence-left"
      :style="leftStyle"
      width="5"
      height="100%"
      viewBox="0 0 5 42"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.882481 1.20506C0.405124 14.4318 0.948001 27.6886 2.52047 40.8249C2.70767 42.3916 5.02894 42.4117 4.84174 40.8249C3.26927 27.6986 2.73575 14.4418 3.20375 1.20506C3.25991 -0.401823 0.938641 -0.39178 0.882481 1.20506Z"
        fill="#16263C"
      />
    </svg>

    <!-- TOP SVG -->
    <svg
      class="fence-svg fence-top"
      :style="topStyle"
      width="100%"
      height="6"
      viewBox="0 0 310 6"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.20562 3.3012C6.33488 3.2309 11.4735 3.22086 16.6121 3.20077C24.9331 3.18068 33.2635 3.17064 41.5845 3.18068C52.2642 3.18068 62.9345 3.20077 73.6143 3.2309C85.9694 3.26103 98.3245 3.3012 110.68 3.35142C123.84 3.40163 137 3.47193 150.151 3.54223C163.301 3.61254 176.649 3.70292 189.902 3.8134C203.156 3.92387 215.174 4.0243 227.81 4.15486C238.958 4.27538 250.096 4.40594 261.244 4.56662C270.22 4.69718 279.206 4.84783 288.182 5.04869C294.154 5.18929 300.135 5.3299 306.106 5.60106C307.033 5.64123 307.96 5.69145 308.886 5.7517C310.374 5.84209 310.374 3.35142 308.886 3.26103C303.766 2.94969 298.628 2.81914 293.498 2.68858C285.177 2.46763 276.856 2.31698 268.535 2.18642C257.865 2.01569 247.185 1.87509 236.515 1.75457C224.16 1.61397 211.814 1.5035 199.459 1.39302C186.299 1.28255 173.148 1.19216 159.988 1.11182C146.828 1.03147 133.481 0.961173 120.236 0.900914C106.992 0.840656 94.9643 0.800484 82.3284 0.760311C71.1807 0.730182 60.033 0.700053 48.8946 0.69001C39.909 0.69001 30.9235 0.679967 21.9473 0.69001C15.9663 0.700053 9.99462 0.710096 4.01361 0.770355C3.08697 0.770355 2.16034 0.790441 1.2337 0.800484C-0.254532 0.82057 -0.263892 3.31124 1.2337 3.29116L1.20562 3.3012Z"
        fill="#16263C"
      />
    </svg>

    <!-- RIGHT SVG -->
    <svg
      class="fence-svg fence-right"
      :style="rightStyle"
      width="3"
      height="100%"
      viewBox="0 0 3 36"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.142212 2.00155C0.142212 12.9284 0.142212 23.8653 0.142212 34.7921C0.142212 36.399 2.46346 36.399 2.46346 34.7921C2.46346 23.8653 2.46346 12.9284 2.46346 2.00155C2.46346 0.394665 0.142212 0.394665 0.142212 2.00155Z"
        fill="#16263C"
      />
    </svg>

    <!-- BOTTOM SVG -->
    <svg
      class="fence-svg fence-bottom"
      :style="bottomStyle"
      width="100%"
      height="4"
      viewBox="0 0 315 4"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M313.877 0.803445C301.569 0.220949 289.195 0.492108 276.877 0.592538C262.687 0.703012 248.498 0.923959 234.317 1.02439C228.673 1.06456 223.029 1.03443 217.385 1.0043C209.635 0.964131 201.894 0.913918 194.144 0.873746C183.334 0.813488 172.523 0.763271 161.703 0.723099C149.17 0.672884 136.646 0.622667 124.113 0.592538C111.58 0.562409 98.3264 0.532283 85.4284 0.532283C73.5225 0.532283 61.6073 0.542323 49.7014 0.592538C40.0887 0.63271 30.4761 0.692968 20.8728 0.823528C15.0228 0.903872 9.15409 0.964131 3.30412 1.27547C2.57404 1.31564 1.84397 1.35581 1.11389 1.42611C-0.364985 1.56672 -0.374345 4.05739 1.11389 3.91679C5.86875 3.47489 10.6704 3.49498 15.4346 3.40459C24.2236 3.2439 33.022 3.1736 41.811 3.12339C53.2676 3.05308 64.7335 3.033 76.1901 3.02296C88.9665 3.02296 101.743 3.02296 114.519 3.05308C127.295 3.08321 140.006 3.12338 152.755 3.1736C164.118 3.21377 175.481 3.26399 186.844 3.32425C195.473 3.36442 204.103 3.41463 212.733 3.46485C217.572 3.49498 222.402 3.53515 227.241 3.5452C240.055 3.56528 252.869 3.32425 265.682 3.18364C279.545 3.04304 293.425 2.84218 307.287 3.09326C309.487 3.13343 311.687 3.18365 313.886 3.29412C315.384 3.36442 315.374 0.873746 313.886 0.803445H313.877Z"
        fill="#16263C"
      />
    </svg>

    <!-- TEXT CONTENT -->
    <div class="fence-heading" v-html="heading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  heading: String,
});

/** Generate a random number between min & max */
function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// We'll store random offset & rotation for each side
const topLine = ref({ rotate: 0, yOffset: 0 });
const bottomLine = ref({ rotate: 0, yOffset: 0 });
const leftLine = ref({ rotate: 0, xOffset: 0 });
const rightLine = ref({ rotate: 0, xOffset: 0 });

onMounted(() => {
  topLine.value = {
    rotate: randomBetween(-1, 1),
    yOffset: randomBetween(-5, -2),
  };

  bottomLine.value = {
    rotate: randomBetween(-1, 1),
    yOffset: randomBetween(2, 5),
  };

  leftLine.value = {
    rotate: randomBetween(-1, 1),
    xOffset: randomBetween(-5, -2),
  };

  rightLine.value = {
    rotate: randomBetween(-1, 1),
    xOffset: randomBetween(2, 5),
  };
});

/**
 * Computed styles for each side:
 * We absolutely position them around the container,
 * using random offsets & rotation.
 */
const topStyle = () => ({
  position: "absolute",
  top: `${topLine.value.yOffset}px`,
  left: 0,
  transform: `rotate(${topLine.value.rotate}deg)`,
  transformOrigin: "left center",
});

const bottomStyle = () => ({
  position: "absolute",
  bottom: `${bottomLine.value.yOffset}px`,
  right: 0,
  transform: `rotate(${bottomLine.value.rotate}deg)`,
  transformOrigin: "right center",
});

const leftStyle = () => ({
  position: "absolute",
  left: `${leftLine.value.xOffset}px`,
  top: 0,
  transform: `rotate(${leftLine.value.rotate}deg)`,
  transformOrigin: "center top",
});

const rightStyle = () => ({
  position: "absolute",
  right: `${rightLine.value.xOffset}px`,
  top: 0,
  transform: `rotate(${rightLine.value.rotate}deg)`,
  transformOrigin: "center top",
});
</script>

<style scoped lang="scss">
.fence-container {
  position: relative;
  display: inline-block;
  width: fit-content; /* Ensure the container takes the full width of its parent */
  padding: 0.4rem 1rem;
  /* Optionally set a specific height or let it adjust based on content */
  /* height: 200px; */
}

.fence-heading {
  margin: 0;
  color: var(--primary-color);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 1.3rem;
}

/* Common class for all 4 SVG lines */
.fence-svg {
  pointer-events: none; /* Let text be clickable */
  position: absolute;
}

/* Specific positioning for each fence */
.fence-top {
  top: 3px;
  left: 2px;
}

.fence-bottom {
  bottom: 2px;
  left: 1px;
}

.fence-left {
  left: 5px;
  top: 0;
}

.fence-right {
  right: 0;
  top: -1px;
}
</style>

