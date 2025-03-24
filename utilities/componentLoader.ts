// utilities/componentLoader.ts
import { defineAsyncComponent } from 'vue';
import LoadingComponent from '@/components/common/LoadingComponent.vue'; // Adjust path as necessary

export const dynamicComponentLoader = (componentName: string) => {
    const componentMap = {
        'banner.banner': 'ReferenceBannerComponent',
        'jumbotron.jumbotron': 'JumbotronComponent',
        'carousel.carousel': 'CarouselComponent',
        'carousel.group': 'CarouselComponent',
        'carousel.services': 'ServicesCarouselComponent',
        'google.maps': 'GoogleMapsComponent',
    };

    return defineAsyncComponent({
        loader: () => componentMap[componentName]
            ? import(`~/components/common/${componentMap[componentName]}.vue`)
            : import('~/components/common/DefaultComponent.vue'),

        loadingComponent: LoadingComponent,
        onError(error, retry, fail, attempts) {
            if (error.message.match(/fetch/)) {
                retry();
            } else if (attempts <= 3) {
                retry();
            } else {
                fail();
            }
            console.error(`Failed to load component ${componentName}:`, error);
        },
        delay: 200,
        timeout: 3000
    });
};



export const computeImageUrl = (imageField) => {
    const strapiBaseUrl = 'https://strapi.webimpact.io';
    return imageField && imageField.data ? `${strapiBaseUrl}${imageField.data.attributes.url}` : '';
};

export const formatProps = (zoneItem) => {
    return {
        ...zoneItem,
        heading: zoneItem.heading ? `<${zoneItem.heading_size}>${zoneItem.heading}</${zoneItem.heading_size}>` : `<h1>${zoneItem.heading || ""}</h1>`,
        description: zoneItem.description || "",
        image: zoneItem.image ? computeImageUrl(zoneItem.image) : "",
        header_line_position: zoneItem.header_line_position || "left",
    };
};

export const getComponent = (componentName: string) => {
    return dynamicComponentLoader(componentName);
};
