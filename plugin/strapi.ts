import type { Plugin } from '@nuxt/types';

// Extend the Nuxt Types to include the new function
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $fetchHomepage(): Promise<HomePageData | null>;
  }

  interface Context {
    $fetchHomepage(): Promise<HomePageData | null>;
  }
}

export interface LogoImage {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

interface HomePageData {
  data: {
    attributes: {
      banner: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  };
}

const strapiPlugin: Plugin = (context, inject) => {
  const fetchHomepage = async (): Promise<HomePageData | null> => {
    try {
      // Make sure to populate all necessary fields
      const response = await context.$strapi.find('homepage', {
        populate: ['banner', 'otherFields']
      });
      const homepageData: HomePageData = response as HomePageData;
      return homepageData;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      return null;
    }
  };


  inject('fetchHomepage', fetchHomepage);
}

export default strapiPlugin;
