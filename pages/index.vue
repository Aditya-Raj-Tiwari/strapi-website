<!-- index.vue -->
<template>
  <div class="home pb-8">
    <div class="max-content">
      <VIntersect
        v-for="(zoneItem, index) in zoneData"
        :key="`${zoneItem.id}-${zoneItem.__component}-${index}`"
      >
        <component
          :is="getComponent(zoneItem.__component)"
          v-bind="formatProps(zoneItem)"
        />
      </VIntersect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { computed } from "vue";
import { defineAsyncComponent } from "vue";
import LoadingComponent from "@/components/common/LoadingComponent.vue";
import VIntersect from "@/components/VIntersect.vue";

const dynamicComponentLoader = (componentName: string) => {
  const componentMap = {
    "banner.banner": "BannerComponent",
    "banner-with-button.banner-with-buttons": "BannerWithButtonComponent",
    "jumbotron.jumbotron": "JumbotronComponent",
    "carousel.carousel": "CarouselComponent",
    "carousel.group": "CarouselComponent",
    "carousel.services": "ServicesCarouselComponent",
    "google.maps": "GoogleMapsComponent",
    "jumbotron.giant-jumbotron": "GiantJumbotronComponent",
    "jumbotron.jumbotron-with-button": "JumbotronWithButtonComponent",
    "header.header": "HeaderComponent",
    "vertical-carousel.group": "VerticalCarouselComponent",
    "appointment.appointment-component": "AppointmentComponent",
    "certificate.group": "CertificatesComponent",
    "text-box.text-box": "TextBoxComponent",
    "fence-text": "CommonFenceText",
    // Add other components as necessary
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

const { findOne } = useStrapi();
const { data, pending, error } = await useAsyncData("homepageData", () =>
  findOne("homepage", {
    populate: {
      banner: {
        populate: "*",
      },
      jumbotron: { populate: "*" },
      zone: { populate: "*" },
    },
  })
);

const strapiBaseUrl = "https://strapi.webimpact.io";

const zoneData = computed(() => {
  const items = [];
  let carouselBuffer = [];
  let verticalCarouselBuffer = [];
  const certificates = [];
  let firstCertificateIndex = null;

  data.value?.data?.attributes?.zone?.forEach((item, index) => {
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
      } else {
        carouselBuffer.push(item);
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
      } else {
        verticalCarouselBuffer.push(item);
      }
    } else if (item.__component === "certificate.certs") {
      certificates.push(item);
      if (firstCertificateIndex === null) {
        firstCertificateIndex = items.length;
      }
    } else {
      // Flush buffers before adding a new non-grouped item
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

      // Add the non-grouped item (e.g., text component)
      items.push(item);
    }
  });

  // Flush any remaining buffers after processing all items
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

  // Insert the grouped certificates at the correct position
  if (certificates.length > 0) {
    const certificateGroup = {
      __component: "certificate.group",
      certificateItems: certificates,
      id: `group-certificate-${certificates[0].id}`,
    };

    // If firstCertificateIndex is null, push to the end
    if (firstCertificateIndex === null) {
      items.push(certificateGroup);
    } else {
      items.splice(firstCertificateIndex, 0, certificateGroup);
    }
  }

  return items;
});

const computeImageUrl = (imageField) => {
  return imageField && imageField.data
    ? `${strapiBaseUrl}${imageField.data.attributes.url}`
    : "";
};

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
      ctaContent: "jetzt kontakt aufnehmen",
      ctaColor: "brown",
    };
  }

  if (zoneItem.__component === "certificate.group") {
    const certificates = zoneItem.certificateItems.map((certificateItem) => ({
      id: certificateItem.id,
      title: certificateItem.title,
      imageUrl: certificateItem.image ? computeImageUrl(certificateItem.image) : "",
      url: certificateItem.url,
      // Add other properties as needed
    }));

    return {
      certificates,
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
    subHeading: zoneItem.sub_heading || "",
    buttonText: zoneItem.button_text || "",
    button_link: zoneItem.button_link || "",
    url: zoneItem.url || "",
    section_heading: zoneItem.section_heading || "",
    background_image: zoneItem.background_image
      ? computeImageUrl(zoneItem.background_image)
      : "",
  };
};

const getComponent = (componentName: string) => {
  return dynamicComponentLoader(componentName);
};
</script>
