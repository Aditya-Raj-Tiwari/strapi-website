<template>
  <!-- 
    1) The root .box is given :style="marginStyle"
    2) That marginStyle contains the custom properties (—margin-mobile, etc.)
  -->
  <div class="box" :class="headerLinePositionClass" :style="marginStyle">
    <div class="box__content" ref="contentContainer">
      <div class="box__description" v-html="description"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

/* 
  PROPS: We have four separate margins for each breakpoint. 
  Adjust defaults/names as needed for your use case.
*/
const props = defineProps({
  description: {
    type: String,
    required: true,
  },
  header_line_position: {
    type: String,
    required: false,
    validator: (value: string) => ['left', 'right'].includes(value),
  },

  // Desktop
  desktop_vertical_margin_above:    { type: [String, Number], default: '0px' },
  desktop_vertical_margin_right: { type: [String, Number], default: '0px' },
  desktop_vertical_margin_below:  { type: [String, Number], default: '0px' },
  desktop_vertical_margin_left:  { type: [String, Number], default: '0px' },

  // Tablet
  tablet_vertical_margin_above:    { type: [String, Number], default: '0px' },
  tablet_vertical_margin_right: { type: [String, Number], default: '0px' },
  tablet_vertical_margin_below:  { type: [String, Number], default: '0px' },
  tablet_vertical_margin_left:  { type: [String, Number], default: '0px' },

  // Mobile
  mobile_vertical_margin_above:    { type: [String, Number], default: '0px' },
  mobile_vertical_margin_right: { type: [String, Number], default: '0px' },
  mobile_vertical_margin_below:  { type: [String, Number], default: '0px' },
  mobile_vertical_margin_left:  { type: [String, Number], default: '0px' },
});

const contentContainer = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

// For your "header_line_position"
const headerLinePositionClass = computed(() => {
  return props.header_line_position || '';
});

/**
 * Safely convert a string/number prop to a string with 'px' if numeric.
 */
function toUnit(val: string | number | null | undefined) {
  if (val === null || val === undefined) {
    // Provide a safe fallback, e.g., '0px'
    return '0px';
  }

  if (typeof val === 'number') {
    return `${val}px`;
  }

  // Now val is guaranteed non-null string
  return val.trim();
}


/**
 * Build a single margin string, e.g. "10px 5px 10px 5px" from 4 separate props.
 */
function buildMarginString(top: string | number, right: string | number, bottom: string | number, left: string | number) {
  return [top, right, bottom, left].map(toUnit).join(' ');
}

/**
 * marginStyle -> inline styles with 3 custom properties for each breakpoint.
 * This ensures each component instance has its own set of CSS properties.
 */
const marginStyle = computed(() => {
  const mobileMargin = buildMarginString(
    props.mobile_vertical_margin_above,
    props.mobile_vertical_margin_right,
    props.mobile_vertical_margin_below,
    props.mobile_vertical_margin_left
  );

  const tabletMargin = buildMarginString(
    props.tablet_vertical_margin_above,
    props.tablet_vertical_margin_right,
    props.tablet_vertical_margin_below,
    props.tablet_vertical_margin_left
  );

  const desktopMargin = buildMarginString(
    props.desktop_vertical_margin_above,
    props.desktop_vertical_margin_right,
    props.desktop_vertical_margin_below,
    props.desktop_vertical_margin_left
  );

  return {
    '--margin-mobile': mobileMargin,
    '--margin-tablet': tabletMargin,
    '--margin-desktop': desktopMargin
  };
});

/**
 * If you’re still using the logic that enforces a minimum height if 
 * "header_line_position" is set, keep that here.
 */
function adjustContentHeight() {
  if (props.header_line_position && contentContainer.value) {
    const contentHeight = contentContainer.value.offsetHeight;
    const minHeight = 200;
    contentContainer.value.style.minHeight = `${Math.max(contentHeight, minHeight)}px`;
  } else if (contentContainer.value) {
    contentContainer.value.style.minHeight = '';
  }
}

onMounted(() => {
  adjustContentHeight();
  window.addEventListener('resize', adjustContentHeight);

  if (contentContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      adjustContentHeight();
    });
    resizeObserver.observe(contentContainer.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustContentHeight);

  if (resizeObserver && contentContainer.value) {
    resizeObserver.unobserve(contentContainer.value);
    resizeObserver.disconnect();
  }
});
</script>

<style scoped lang="scss">
.box {
  /* By default, use the mobile margin. Provide a fallback: */
  margin: var(--margin-mobile, 0px 0px 0px 0px);

  &__content {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    min-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__description {
    width: 100%;
    text-align: left;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  /* If you have special styling for .box.left or .box.right: */
  &.left {
    // e.g.: border-left: 3px solid #ddd;
  }
  &.right {
    // e.g.: border-right: 3px solid #ddd;
  }
}

/* 
  For tablet/desktop, override the margin 
  using the custom props we set inline (—margin-tablet, —margin-desktop).
*/
@media screen and (min-width: 768px) {
  .box {
    margin: var(--margin-tablet, 0px 0px 0px 0px);
  }
}

@media screen and (min-width: 991px) {
  .box {
    margin: var(--margin-desktop, 0px 0px 0px 0px);
  }
}
</style>
