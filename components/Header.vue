<template>
  <div id="page-header">
    <div
      class="header"
      :class="{
        'header--fixed': scrollDown && !isOpen && !isMobile,
        'header--expanded': isHeaderExpanded && !isMobile,
      }"
      @mouseenter="enterHeader"
      @mouseleave="leaveHeader"
    >
      <!-- Desktop Header and Expanded Menu -->
      <template v-if="!isMobile">
        <!-- Desktop Header -->
        <div class="max-content header-container desktop-menu">
          <div>
            <NuxtLink to="/">
              <img
                loading="lazy"
                alt="webimpact logo"
                :src="imageUrl"
                class="header-logo header-logo--desktop"
              />
            </NuxtLink>
            <NuxtLink to="/">
              <img
                loading="lazy"
                :src="imageUrl"
                alt="webimpact logo"
                class="header-logo header-logo--mobile"
              />
            </NuxtLink>
          </div>
          <ul class="flex nav-menu">
            <li
              v-for="item in navigation"
              :key="item.id"
              class="nav-item"
              @mouseenter="item.items && expandHeader(item)"
            >
              <NuxtLink
                class="header-link"
                :to="getDynamicPath(item)"
                :style="{ color: props.ctaColor }"
                @click="collapseHeader"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Expanded Menu -->
        <div v-if="isHeaderExpanded" class="expanded-menu">
          <div class="expanded-menu-content">
            <ul class="expanded-menu-items mb-12">
              <li
                v-for="child in hoveredNavItem.items"
                :key="child.id"
                class="expanded-menu-item"
              >
                <NuxtLink
                  class="expanded-menu-link h3"
                  :to="getDynamicPath(child)"
                  @click="collapseHeader"
                >
                  {{ child.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- Mobile Version -->
      <!-- Only render mobile menu after mounted to avoid SSR mismatch -->
      <template v-else-if="isMounted">
        <div class="flex justify-between max-content">
          <div>
            <NuxtLink to="/">
              <img
                loading="lazy"
                alt="webimpact logo"
                :src="imageUrl"
                class="header-logo header-logo--desktop"
              />
            </NuxtLink>
            <NuxtLink to="/">
              <img
                loading="lazy"
                alt="webimpact logo"
                :src="imageUrl"
                class="header-logo header-logo--mobile"
              />
            </NuxtLink>
          </div>
          <UButton
            icon="simple-line-icons:menu"
            @click="isOpen = true"
            class="mr-4 flex justify-center mt-2 w-9 h-9 sm:w-16 sm:h-16"
          />
          <USlideover v-model="isOpen">
            <UCard
              class="flex flex-col flex-1 max-h-screen overflow-y-auto"
              :ui="{
                body: { base: 'flex-1' },
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
              }"
            >
              <template #header>
                <UBreadcrumb
                  class="flex justify-start pl-0 ml-0 breadcrumbs"
                  :links="breadcrumbLinks"
                >
                  <template #default="{ link, isActive }">
                    <UBadge
                      @click="closeMenu"
                      :color="isActive ? 'primary' : 'white'"
                      class="rounded-full truncate"
                    >
                      <NuxtLink :to="link.to">
                        <span
                          v-if="link.label === 'Home'"
                          class="flex items-center home-breadcrumb justify-start"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#C3CFD9"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                            ></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        </span>
                        <span v-else>{{ link.label }}</span>
                      </NuxtLink>
                    </UBadge>
                  </template>
                </UBreadcrumb>
                <UButton
                  variant="ghost"
                  size="lg"
                  icon="i-heroicons-x-mark-20-solid"
                  class="absolute end-5 top-5 z-10 min-w-100 close-header"
                  square
                  padded
                  @click="closeMenu"
                />
              </template>

              <!-- Mobile Accordion Navigation -->
              <div
                class="flex flex-col w-full min-w-100 nav-links-mobile space-y-2 p-4 overflow-y-auto max-h-screen"
              >
                <div
                  v-for="item in navigation"
                  :key="item.id"
                  class="w-full flex flex-col"
                >
                  <!-- Parent with children -->
                  <div
                    v-if="item.items && item.items.length"
                    @click="toggleItem(item.id)"
                    class="group flex items-center justify-between w-full rounded-md px-4 py-2 cursor-pointer transition-colors duration-200 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
                    :class="{
                      'bg-[var(--secondary-color)] text-white':
                        isActiveLink(getDynamicPath(item)) || hasActiveChild(item),
                    }"
                  >
                    <span
                      class="font-semibold"
                      :class="{
                        'text-white':
                          isActiveLink(getDynamicPath(item)) || hasActiveChild(item),
                      }"
                    >
                      {{ item.title }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      :class="{ 'rotate-180': isOpenItem(item.id) }"
                      class="h-5 w-5 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  <!-- Single item (no children) -->
                  <NuxtLink
                    v-else
                    class="block font-semibold px-4 py-2 rounded-md transition-colors duration-200 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
                    :class="{
                      'bg-[var(--secondary-color)] text-white': isActiveLink(
                        getDynamicPath(item)
                      ),
                    }"
                    :to="getDynamicPath(item)"
                    @click="closeMenu"
                  >
                    {{ item.title }}
                  </NuxtLink>

                  <!-- Child Items with Transition -->
                  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div
                      v-if="item.items && item.items.length && isOpenItem(item.id)"
                      class="pl-6 space-y-1 overflow-hidden"
                    >
                      <!-- Parent's own link inside the accordion -->
                      <NuxtLink
                        class="block py-1 rounded-md pl-4 font-medium transition-colors duration-200 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
                        :class="{
                          'text-[var(--secondary-color)]': isActiveLink(
                            getDynamicPath(item)
                          ),
                        }"
                        :to="getDynamicPath(item)"
                        @click="closeMenu"
                      >
                        {{ item.title }}
                      </NuxtLink>

                      <!-- Child links -->
                      <NuxtLink
                        v-for="child in item.items"
                        :key="child.id"
                        class="block py-1 rounded-md pl-4 transition-colors duration-200 text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
                        :class="{
                          'text-[var(--secondary-color)]': isActiveLink(
                            getDynamicPath(child)
                          ),
                        }"
                        :to="getDynamicPath(child)"
                        @click="closeMenu"
                      >
                        {{ child.title }}
                      </NuxtLink>
                    </div>
                  </transition>
                </div>
              </div>

              <template #footer>
                <div class="w-full py-4"></div>
              </template>
            </UCard>
          </USlideover>
        </div>
      </template>
    </div>

    <!-- Page Overlay -->
    <div
      v-if="isHeaderExpanded && !isMobile"
      class="page-overlay"
      @click="collapseHeader"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";

const props = defineProps({
  ctaColor: {
    type: String,
    default: "orange",
  },
});

const isOpen = ref(false);
const isMobile = ref(false);
const scrollDown = ref(false);
const strapiBaseUrl = "https://strapi.webimpact.io";

const isHeaderExpanded = ref(false);
const hoveredNavItem = ref(null);
const isMouseInsideHeader = ref(false);

const route = useRoute();
const isMounted = ref(false); // Flag to ensure we only show mobile menu after mounted

const { findOne } = useStrapi();
const { data: navigationData } = await useAsyncData("navigationData", () =>
  findOne("navigation/render/main-navigation")
);

//mobile nav
const openItems = ref<number[]>([]);

function toggleItem(itemId: number) {
  const index = openItems.value.indexOf(itemId);
  if (index > -1) {
    openItems.value.splice(index, 1);
  } else {
    openItems.value.push(itemId);
  }
}

function isOpenItem(itemId: number) {
  return openItems.value.includes(itemId);
}

function isActiveLink(path: string) {
  return route.path === path;
}

function hasActiveChild(item: any) {
  if (!item.items) return false;
  return item.items.some((child: any) => isActiveLink(getDynamicPath(child)));
}

function ensureOpenForActiveLink() {
  if (!navigation.value) return;
  navigation.value.forEach((parent) => {
    const parentPath = getDynamicPath(parent);
    const isParentActive = isActiveLink(parentPath);
    const activeChild =
      parent.items &&
      parent.items.find((child: any) => isActiveLink(getDynamicPath(child)));

    if (isParentActive || activeChild) {
      if (!openItems.value.includes(parent.id) && parent.items && parent.items.length) {
        openItems.value.push(parent.id);
      }
    }
  });
}

// Watch route to open relevant accordion if active
watch(
  () => route.path,
  () => ensureOpenForActiveLink()
);

// Transition hooks
function beforeEnter(el: HTMLElement) {
  el.style.height = "0";
  el.style.opacity = "0";
}
function enter(el: HTMLElement) {
  requestAnimationFrame(() => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";
  });
}
function leave(el: HTMLElement) {
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
  requestAnimationFrame(() => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = "0";
    el.style.opacity = "0";
  });
}

// Function to organize items into a nested structure
const organizeNavigation = (data) => {
  const navigationMap = new Map();

  data.forEach((item) => {
    if (!item.parent) {
      navigationMap.set(item.id, { ...item, items: [] });
    }
  });

  data.forEach((item) => {
    if (item.parent) {
      const parent = navigationMap.get(item.parent.id);
      if (parent) {
        parent.items.push(item);
      }
    }
  });

  return Array.from(navigationMap.values());
};

const navigation = computed(() => organizeNavigation(navigationData.value || []));

// Breadcrumb Links
const breadcrumbLinks = computed(() => {
  const currentPath = route.path;
  const breadcrumb = [];
  breadcrumb.push({ label: "Home", to: "/" });

  const findBreadcrumbItem = (items, path) => {
    for (const item of items) {
      const itemPath = getDynamicPath(item);
      if (itemPath === path) {
        return item;
      }
      if (item.items && item.items.length) {
        const childResult = findBreadcrumbItem(item.items, path);
        if (childResult) {
          return { ...childResult, parent: item };
        }
      }
    }
    return null;
  };

  const foundItem = findBreadcrumbItem(navigation.value, currentPath);
  if (foundItem) {
    if (foundItem.parent) {
      breadcrumb.push({
        label: foundItem.parent.title,
        to: getDynamicPath(foundItem.parent),
      });
    }
    breadcrumb.push({ label: foundItem.title, to: getDynamicPath(foundItem) });
  }

  return breadcrumb;
});

// Dynamic path logic
function getDynamicPath(item) {
  // If the item has a parent with a path, prepend it
  const parentSegment = item.parent && item.parent.path ? `/${item.parent.path}` : "";
  // We ignore related logic here and just return a user-friendly URL
  return parentSegment ? `${parentSegment}/${item.path}` : `/${item.path}`;
}

// Fetch company logo
const { data: miscData } = await useAsyncData("miscellaneousData", () =>
  findOne("miscellaneous", { populate: { company_logo: true } })
);
const imageUrl = computed(() =>
  miscData.value?.data.attributes.company_logo?.data?.attributes.url
    ? `${strapiBaseUrl}${miscData.value.data.attributes.company_logo.data.attributes.url}`
    : "https://webimpact.cstatic.io/uploads/Logo_webimpact_quer_703827a434.png"
);

// Handle menu close
function closeMenu() {
  isOpen.value = false;
}

function expandHeader(item) {
  if (!item.items || !item.items.length) {
    collapseHeader();
    return;
  }

  isHeaderExpanded.value = true;
  hoveredNavItem.value = item;
}

function collapseHeader() {
  isHeaderExpanded.value = false;
  hoveredNavItem.value = null;
}

function enterHeader() {
  isMouseInsideHeader.value = true;
}

function leaveHeader() {
  isMouseInsideHeader.value = false;
  setTimeout(() => {
    if (!isMouseInsideHeader.value) {
      collapseHeader();
    }
  }, 100);
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Check screen size
const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1025 || isTouchDevice();
};

onMounted(() => {
  // After mounted, we know window is available
  checkIsMobile();
  ensureOpenForActiveLink();
  isMounted.value = true; // Only show mobile menu after mounted

  window.addEventListener("resize", checkIsMobile);
  window.addEventListener("scroll", () => {
    scrollDown.value = window.scrollY > 100;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIsMobile);
  window.removeEventListener("scroll", () => {
    scrollDown.value = window.scrollY > 100;
  });
});
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  padding: 1rem 0;
  background-color: transparent;
  transition: all 0.3s ease;
  max-width: 100vw;
  z-index: 49;

  &--fixed {
    position: sticky;
    top: 0;
    background-color: white;
    box-shadow: 0 10px 14px rgba(0, 0, 0, 0.2);
    z-index: 49;
  }

  &--expanded {
    background-color: white;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: visible;
  }

  .nav-menu {
    display: flex;
    align-items: center;

    .nav-item {
      margin: 0 1rem;

      .header-link {
        // Keep your old style
        font-size: 1.3rem !important;
        font-weight: 900;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--primary-color) !important;

        // Position + display so pseudo-element is behind the text
        position: relative;
        display: inline-block;
        overflow: hidden; // Ensures the “filling” stays within link bounds

        // Optional transition on the text color
        transition: color 0.3s ease;

        &:hover {
          /* Switch text to white so it’s visible on the new background */
          color: var(--secondary-color) !important;
          /* Optional: small lift effect */
          transform: translateY(-2px);
        }
      }
    }
  }

  .expanded-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 999;
    padding: 2rem 0;
    animation: submenuSlideDown 0.3s ease-out;

    .expanded-menu-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;

      .expanded-menu-header {
        margin-bottom: 1rem;

        h2 {
          font-size: 1.5rem;
          font-weight: 700;
        }
      }

      .expanded-menu-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;

        .expanded-menu-item {
          .expanded-menu-link {
            display: block;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
            text-decoration: none;
            padding: 0.5rem 0;
            transition: color 0.3s ease;

            &:hover {
              color: var(--secondary-color);
            }
          }
        }
      }
    }
  }

  .header-logo {
    height: auto;
    padding-left: 1rem;

    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
      width: 200px;
    }
  }
}

@keyframes submenuSlideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 48;
}

.page-overlay::before {
  content: "";
  position: absolute;
  top: var(--header-height, 70px);
  left: 0;
  width: 100%;
  height: calc(100% - var(--header-height, 70px));
  backdrop-filter: blur(9px);
  background: rgba(255, 255, 255, 0.3);
  pointer-events: all;
}

:root {
  --header-height: 70px;
}

@media screen and (max-width: 1025px) {
  .header-container {
    display: none;
  }

  .header-logo {
    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
    }
  }
}

@media screen and (min-width: 1200px) {
  .header-logo {
    &--desktop {
      display: block;
    }

    &--mobile {
      display: none;
    }
  }
}

.desktop-menu {
  .header-logo {
    width: 300px;
    margin-bottom: 1rem;
  }
}
</style>
