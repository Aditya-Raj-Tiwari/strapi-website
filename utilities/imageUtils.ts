// utilities/imageUtils.ts
export const computeImageUrl = (imageField : object) => {
    const strapiBaseUrl = 'https://strapi.webimpact.io';
    return imageField && imageField.data ? `${strapiBaseUrl}${imageField.data.attributes.url}` : '';
};
