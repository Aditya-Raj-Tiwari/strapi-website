// plugins/strapi.ts

// Define TypeScript interfaces
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
      // Add other fields as necessary
      otherFields?: any;
    };
  };
}

// Extend NuxtApp interface to include fetchHomepage
declare module '#app' {
  interface NuxtApp {
    $fetchHomepage: () => Promise<HomePageData | null>;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchHomepage = async (): Promise<HomePageData | null> => {
    try {
      // Make sure to populate all necessary fields
      const response = await useStrapi().find('homepage', {
        populate: ['banner', 'otherFields'],
      });
      const homepageData: HomePageData = response as HomePageData;
      return homepageData;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      return null;
    }
  };

  // Provide the fetchHomepage function to the Nuxt app
  nuxtApp.provide('fetchHomepage', fetchHomepage);
});
