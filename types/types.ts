// ~/types/index.ts
export interface HomePageData {
[x: string]: any;
    Title: string;
  }


// types.ts

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageAttributes {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | any;
  createdAt: string;
  updatedAt: string;
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface Image {
  data: ImageData;
}

export type ZoneItem = {
  __component?: string;
  company_name?: string;
  title?: string;
  description?: string;
  image?: Image;
  customer_image?: Image;
  customer_title_person?: string;
  customer_name_person?: string;
  heading?: string;
  heading_size?: string;
  header_line_position?: string;
};

export type Review = {
  __component?: string;
  company_name?: string;
  title?: string;
  description?: string;
  image?: Image;
  review?: string;
  customer_image?: Image;
  customer_title_person?: string;
  customer_name_person?: string;
  heading?: string;
  heading_size?: string;
  header_line_position?: string;
};

export type ZoneValue = ZoneItem | Review;
