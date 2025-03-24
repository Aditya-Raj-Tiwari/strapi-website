// utilities/formatProps.ts
import { computeImageUrl } from './imageUtils';

export const formatProps = (zoneItem) => {
    return {
        ...zoneItem,
        heading: zoneItem.heading ? `<${zoneItem.heading_size}>${zoneItem.heading}</${zoneItem.heading_size}>` : `<h1>${zoneItem.heading || ""}</h1>`,
        description: zoneItem.description || "",
        image: zoneItem.image ? computeImageUrl(zoneItem.image) : "",
        header_line_position: zoneItem.header_line_position || "left",
    };
};
