<template>
  <div class="pb-16">
    <div :class="pageClass">
      <div class="max-content">
        <div
          v-for="(zoneItem, index) in finalZoneData"
          :key="`${zoneItem.id}-${zoneItem.__component}`"
        >
          <VIntersect v-if="zoneItem.__component === 'teamSection'">
            <component
              :is="getComponent('header.header')"
              v-bind="formatProps(zoneItem.header)"
            />
            <div class="about-team__grid mb-32">
              <component
                v-for="teamMember in zoneItem.teamMembers"
                :key="teamMember.id"
                :is="getComponent('team.team')"
                v-bind="formatProps(teamMember)"
              />
            </div>
          </VIntersect>
          <VIntersect v-else>
            <component
              :is="getComponent(zoneItem.__component)"
              v-bind="formatProps(zoneItem)"
            />
          </VIntersect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute } from "nuxt/app";
import { computed, ref, watch, onMounted } from "vue";
import { defineAsyncComponent } from "vue";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import VIntersect from "@/components/VIntersect.vue";

const route = useRoute();
const slugParam = route.params.slug;
const finalSlug = Array.isArray(slugParam) ? slugParam[slugParam.length - 1] : slugParam;

const { findOne } = useStrapi();

// Fetch navigation data
const { data: navigationData } = await useAsyncData("navigationDataForSlug", () =>
  findOne("navigation/render/main-navigation")
);

// Organize navigation
function organizeNavigation(data) {
  const map = new Map();
  data.forEach((item) => {
    if (!item.parent) map.set(item.id, { ...item, items: [] });
  });
  data.forEach((item) => {
    if (item.parent && map.has(item.parent.id)) {
      map.get(item.parent.id).items.push(item);
    }
  });
  return Array.from(map.values());
}

const organizedNav = organizeNavigation(navigationData.value || []);

function findNavItem(items, targetPath) {
  for (const item of items) {
    if (item.path === targetPath) return item;
    if (item.items && item.items.length) {
      const found = findNavItem(item.items, targetPath);
      if (found) return found;
    }
  }
  return null;
}

const currentNavItem = findNavItem(organizedNav, finalSlug);
if (!currentNavItem || !currentNavItem.related) {
  throw new Error(`No related content found for slug: ${finalSlug}`);
}

const { __contentType, id } = currentNavItem.related;
const contentType = __contentType.split(".").pop();
const singleTypes = ["service", "reference", "about"];
let fetchData;

if (singleTypes.includes(contentType)) {
  fetchData = () =>
    findOne(contentType, {
      populate: { zone: { populate: "*" } },
    });
} else {
  const collectionName = contentType.endsWith("s") ? contentType : contentType + "s";
  fetchData = () =>
    findOne(collectionName, id, {
      populate: { zone: { populate: "*" } },
    });
}

const { data, pending, error } = await useAsyncData(`${finalSlug}Data`, fetchData);

const pageClass = `page-${finalSlug}`;

const strapiBaseUrl = "https://strapi.webimpact.io";

const computeImageUrl = (imageField) => {
  if (imageField && imageField.data) {
    const imageData = Array.isArray(imageField.data)
      ? imageField.data[0]
      : imageField.data;
    return imageData && imageData.attributes
      ? `${strapiBaseUrl}${imageData.attributes.url}`
      : "";
  }
  return "";
};

const zoneData = computed(() => {
  const zone = data.value?.data?.attributes?.zone || [];
  const items = [];
  let index = 0;
  let carouselBuffer = [];
  let verticalCarouselBuffer = [];

  while (index < zone.length) {
    const item = zone[index];

    if (item.__component === "carousel.carousel") {
      const isSeparate =
        item.seperate_component === true || item.seperate_component === "true";
      if (isSeparate) {
        if (carouselBuffer.length > 0) {
          items.push({
            __component: "carousel.group",
            carouselItems: carouselBuffer,
            id: `group-carousel-${carouselBuffer[0].id}`,
          });
          carouselBuffer = [];
        }
        items.push({
          __component: "carousel.group",
          carouselItems: [item],
          id: `single-carousel-${item.id}`,
        });
        index++;
      } else {
        carouselBuffer.push(item);
        index++;
      }
    } else if (item.__component === "vertical-carousel.vertical-carousel") {
      const isSeparate =
        item.seperate_component === true || item.seperate_component === "true";
      if (isSeparate) {
        if (verticalCarouselBuffer.length > 0) {
          items.push({
            __component: "vertical-carousel.group",
            verticalCarouselItems: verticalCarouselBuffer,
            id: `group-vertical-carousel-${verticalCarouselBuffer[0].id}`,
          });
          verticalCarouselBuffer = [];
        }
        items.push({
          __component: "vertical-carousel.group",
          verticalCarouselItems: [item],
          id: `single-vertical-carousel-${item.id}`,
        });
        index++;
      } else {
        verticalCarouselBuffer.push(item);
        index++;
      }
    } else {
      if (carouselBuffer.length > 0) {
        items.push({
          __component: "carousel.group",
          carouselItems: carouselBuffer,
          id: `group-carousel-${carouselBuffer[0].id}`,
        });
        carouselBuffer = [];
      }

      if (verticalCarouselBuffer.length > 0) {
        items.push({
          __component: "vertical-carousel.group",
          verticalCarouselItems: verticalCarouselBuffer,
          id: `group-vertical-carousel-${verticalCarouselBuffer[0].id}`,
        });
        verticalCarouselBuffer = [];
      }

      items.push(item);
      index++;
    }
  }

  if (carouselBuffer.length > 0) {
    items.push({
      __component: "carousel.group",
      carouselItems: carouselBuffer,
      id: `group-carousel-${carouselBuffer[0].id}`,
    });
  }

  if (verticalCarouselBuffer.length > 0) {
    items.push({
      __component: "vertical-carousel.group",
      verticalCarouselItems: verticalCarouselBuffer,
      id: `group-vertical-carousel-${verticalCarouselBuffer[0].id}`,
    });
  }

  return items;
});

const finalZoneData = computed(() => {
  const items = zoneData.value;
  const finalItems = [];
  let currentTeamSection = null;

  for (const item of items) {
    if (
      item.__component === "header.header" &&
      item.heading &&
      item.heading.toLowerCase().includes("team")
    ) {
      if (currentTeamSection) {
        finalItems.push(currentTeamSection);
        currentTeamSection = null;
      }

      currentTeamSection = {
        __component: "teamSection",
        id: `team-section-${item.id}`,
        header: {
          heading: item.heading,
          heading_size: item.heading_size,
          header_line_position: item.header_line_position,
          heading_type: item.heading_type,
        },
        teamMembers: [],
      };
    } else if (item.__component === "team.team") {
      if (currentTeamSection) {
        currentTeamSection.teamMembers.push(item);
      } else {
        finalItems.push(item);
      }
    } else {
      if (currentTeamSection) {
        finalItems.push(currentTeamSection);
        currentTeamSection = null;
      }
      finalItems.push(item);
    }
  }

  if (currentTeamSection) {
    finalItems.push(currentTeamSection);
  }

  return finalItems;
});

const formatProps = (zoneItem) => {
  if (zoneItem.__component === "carousel.group") {
    const reviews = zoneItem.carouselItems.map((carouselItem) => ({
      ...carouselItem,
      project_pic: carouselItem.image ? computeImageUrl(carouselItem.image) : "",
      customer_pic: carouselItem.customer_image
        ? computeImageUrl(carouselItem.customer_image)
        : "",
      company_name: carouselItem.company_name,
      project_name: carouselItem.title,
      description: carouselItem.description,
      title: carouselItem.image_description,
      customer_position: carouselItem.customer_title_person,
      customer_name_person: carouselItem.customer_name_person,
    }));
    return {
      reviews,
      initialActiveIndex: 0,
      headerText: "Customer Reviews",
    };
  }

  if (zoneItem.__component === "vertical-carousel.group") {
    const services = zoneItem.verticalCarouselItems.map((carouselItem) => ({
      ...carouselItem,
      service_heading: carouselItem.service_heading,
      sub_heading: carouselItem.sub_heading,
      description: carouselItem.description,
      image: carouselItem.image ? computeImageUrl(carouselItem.image) : "",
      service_image: carouselItem.service_image
        ? computeImageUrl(carouselItem.service_image)
        : "",
    }));
    return {
      services,
      heading: "Leistungsübersicht",
      ctaContent: "Jetzt Kontakt aufnehmen",
      ctaColor: "brown",
    };
  }

  if (zoneItem.__component === "team.team") {
    return {
      name: zoneItem.name || "",
      description: zoneItem.description || "",
      image: zoneItem.image ? computeImageUrl(zoneItem.image) : "",
      job_position: zoneItem.job_position || "",
    };
  }

  return {
    ...zoneItem,
    heading: zoneItem.heading
      ? `<${zoneItem.heading_size}>${zoneItem.heading}</${zoneItem.heading_size}>`
      : `<h1>${zoneItem.heading || ""}</h1>`,
    description: zoneItem.description || "",
    image: zoneItem.image ? computeImageUrl(zoneItem.image) : "",
    header_line_position: zoneItem.header_line_position || "",
    headline: zoneItem.headline || "",
    sectionTitle: zoneItem.title || "",
    sectionSubHeading: zoneItem.section_sub_heading || "",
    subheading: zoneItem.sub_heading || "",
    buttonText: zoneItem.button_text || "",
    button_link: zoneItem.button_link || "",
    section_heading: zoneItem.section_heading || "",
    heading_type: zoneItem.heading_type || "",
    enable_zoom: zoneItem.enable_zoom || "false",
    background_image: zoneItem.background_image
      ? computeImageUrl(zoneItem.background_image)
      : "",
    content_heading: zoneItem.content_heading || "",
    desktop_vertical_margin_above: zoneItem.desktop_vertical_margin_above || "",
    desktop_vertical_margin_below: zoneItem.desktop_vertical_margin_below || "",
    desktop_vertical_margin_left: zoneItem.desktop_vertical_margin_left || "",
    desktop_vertical_margin_right: zoneItem.desktop_vertical_margin_right || "",
    tablet_vertical_margin_above: zoneItem.tablet_vertical_margin_above || "",
    tablet_vertical_margin_below: zoneItem.tablet_vertical_margin_below || "",
    tablet_vertical_margin_left: zoneItem.tablet_vertical_margin_left || "",
    tablet_vertical_margin_right: zoneItem.tablet_vertical_margin_right || "",
    mobile_vertical_margin_above: zoneItem.mobile_vertical_margin_above || "",
    mobile_vertical_margin_below: zoneItem.mobile_vertical_margin_below || "",
    mobile_vertical_margin_left: zoneItem.mobile_vertical_margin_left || "",
    mobile_vertical_margin_right: zoneItem.mobile_vertical_margin_right || "",
  };
};

const dynamicComponentLoader = (componentName: string) => {
  const componentMap = {
    "banner.banner": "BannerComponent",
    "banner-with-button.banner-with-buttons": "BannerWithButtonComponent",
    "jumbotron.jumbotron": "JumbotronComponent",
    "carousel.carousel": "CarouselComponent",
    "carousel.group": "CarouselComponent",
    "carousel.services": "ServicesCarouselComponent",
    "vertical-carousel.group": "VerticalCarouselComponent",
    "google.maps": "GoogleMapsComponent",
    "jumbotron.giant-jumbotron": "GiantJumbotronComponent",
    "jumbotron.jumbotron-with-button": "JumbotronWithButtonComponent",
    "header.header": "HeaderComponent",
    "team.team": "TeamMember",
    "common-three-slider-main": "CommonThreeSliderMain",
    "text-box.text-box": "TextBoxComponent",
    "fence-text.fence-text": "FenceText",
  };

  return defineAsyncComponent({
    loader: () => {
      if (componentMap[componentName]) {
        return import(`~/components/common/${componentMap[componentName]}.vue`);
      } else {
        return import("~/components/common/DefaultComponent.vue");
      }
    },
    loadingComponent: LoadingComponent,
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        retry();
      } else {
        fail();
      }
      console.error(`Failed to load component ${componentName}:`, error);
    },
    delay: 200,
    timeout: 3000,
  });
};

const getComponent = (componentName: string) => {
  return dynamicComponentLoader(componentName);
};
</script>

<style scoped>
.about-team {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .about-team {
    &__grid {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
      grid-row-gap: 5rem;
      margin-top: -5rem;
    }
  }
}
</style>
