<template>
    <div class="footer-container">
        <svg class="top-line" xmlns="http://www.w3.org/2000/svg" data-name="Ebene 3" viewBox="0 0 858.35 48.56">
            <path
                d="M26.7 25.48c101.61-2.82 205.36-2.03 307.06-.56 170.42-.7 341.36-3.88 511.76.56v.5c-170.4 4.44-341.35 1.26-511.76.56-57.83.5-121.34 1.9-179.12 1.31-42.36-.26-85.64-.74-127.94-1.87z"
                style="fill:#ef7b14;stroke-width:0" />
        </svg>
        <img class="main-img" :src="footerImage" alt="logo" />
        <div class="inner-conatiner">
            <footer class="footer flex bg-base-200 text-base-content p-10 intro">
                <nav>
                    <h6 class="footer-title">Interesse geweckt ?</h6>
                    <p>Lassen Sie sich beraten!
                        <br> Wir freuen uns auf Ihren Anruf!
                    </p>
                    <h6 class="call">
                        <div class="line-svg">
                            <img :src="lineImage" alt="line" />
                        </div>
                        0297789990
                    </h6>
                    <div class="logo-sec">
                        <img :src="logo" alt="" width="70px" height="70px">
                        <div class="content">
                            <p class="logo_name">webimpact GmbH</p>
                            <p>Wesstr. 27</p>
                            <p>57392 Schmallenberg</p>
                        </div>
                    </div>
                </nav>
                <data class="nav-section">
                    <!-- Dynamic links for navigation items -->
                    <nav v-for="(items, category) in groupedNavItems" :key="category">
                        <h6 class="footer-title">{{ category }}</h6>
                        <template v-for="navItem in items" :key="navItem.id">
                            <nuxt-link v-if="!isExternalLink(navItem.url)" :to="navItem.url" class="link link-hover">
                                {{ navItem.title }}
                            </nuxt-link>
                            <a v-else :href="formatExternalLink(navItem.url)" target="_blank" rel="noopener noreferrer"
                                class="link link-hover">
                                {{ navItem.title }}
                            </a>
                        </template>
                    </nav>

                    <!-- Social Links -->
                    <nav v-if="socialLinks.length">
                        <h6 class="footer-title">Social</h6>
                        <div class="social-icons">
                            <template v-for="social in socialLinks" :key="social.id">
                                <nuxt-link v-if="!isExternalLink(social.url)" :to="social.url" class="social-icon">
                                    <img :src="social.imageUrl" :alt="social.url" class="social-icon" width="30px"
                                        height="30px" />
                                </nuxt-link>
                                <a v-else :href="formatExternalLink(social.url)" target="_blank"
                                    rel="noopener noreferrer" class="social-icon">
                                    <img :src="social.imageUrl" :alt="social.url" class="social-icon" width="30px"
                                        height="30px" />
                                </a>
                            </template>
                        </div>
                    </nav>
                </data>
            </footer>
        </div>

        <!-- Partners Section -->
        <div class="partners-section">
            <h3>Unsere Partner:</h3>
            <div class="partners-images">
                <template v-for="partner in partnersData" :key="partner.id">
                    <nuxt-link v-if="!isExternalLink(partner.url)" :to="partner.url" class="partner-link">
                        <img :src="partner.imageUrl" alt="" />
                    </nuxt-link>
                    <a v-else :href="formatExternalLink(partner.url)" target="_blank" rel="noopener noreferrer"
                        class="partner-link">
                        <img :src="partner.imageUrl" alt="" />
                    </a>
                </template>
            </div>
        </div>

        <!-- Dynamic Copyright -->
        <div class="copyright-sec">
            <div class="links">
                <template v-for="page in copyrightPages" :key="page.id">
                    <nuxt-link v-if="!isExternalLink(page.url)" :to="page.url" class="link">
                        {{ page.name }}
                    </nuxt-link>
                    <a v-else :href="formatExternalLink(page.url)" target="_blank" rel="noopener noreferrer"
                        class="link">
                        {{ page.name }}
                    </a>
                </template>
            </div>
            <p>webimpact GmbH. © 2024. Alle Rechte vorbehalten.</p>
        </div>
    </div>
</template>



<script setup lang="ts">
import { useAsyncData } from 'nuxt/app';
import { computed } from 'vue';

import footerImage from '~/assets/images/grafik_FOOTER.png';
import lineImage from '~/assets/images/pfeil.png';
import logo from '~/assets/images/logo.png';

const query = `populate[nav]=*&populate[nav_image][populate]=image&populate[partners_image]=*&populate[partner_info][populate]=image&populate=copyright_pages`;

const { data: footerData } = await useAsyncData('footerData', () =>
    $fetch(`https://strapi.webimpact.io/api/footer?${query}`)
);

const strapiBaseUrl = 'https://strapi.webimpact.io';


const computeImageUrl = (imageField) => {
    if (imageField && imageField.data && imageField.data.attributes && imageField.data.attributes.url) {
        return `${strapiBaseUrl}${imageField.data.attributes.url}`;
    }
    return '';
};

const normalizeUrl = (url) => {
    if (!url) return '';
    // We'll remove adding https:// here because we'll handle formatting dynamically
    return url.trim();
};

// Helper to determine if link is external
const isExternalLink = (url) => {
    if (!url) return false;
    return /^(https?:\/\/|www\.)/.test(url);
};

// Helper to format external links that start with www.
const formatExternalLink = (url) => {
    if (!url) return '#';
    if (/^www\./.test(url)) {
        return `https://${url}`;
    }
    return url;
};

const processedNavItems = computed(() => {
    const navItems = footerData.value?.data?.attributes?.nav || [];
    return navItems.map((item) => ({
        ...item,
        url: normalizeUrl(item.url),
    }));
});

const groupedNavItems = computed(() => {
    const grouped = {};
    processedNavItems.value.forEach((item) => {
        const category = item.parent_category || 'Other';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(item);
    });
    return grouped;
});

const socialLinks = computed(() => {
    const links = footerData.value?.data?.attributes?.nav_image || [];
    return links.map((link) => ({
        id: link.id,
        url: normalizeUrl(link.url),
        imageUrl: computeImageUrl(link.image),
    }));
});

const partnersData = computed(() => {
    const partners = footerData.value?.data?.attributes?.partner_info || [];
    return partners.map((partner) => ({
        id: partner.id,
        url: normalizeUrl(partner.url),
        imageUrl: computeImageUrl(partner.image),
    }));
});

const copyrightPages = computed(() => {
    const pages = footerData.value?.data?.attributes?.copyright_pages || [];
    return pages.map((page) => ({
        id: page.id,
        name: page.name,
        url: page.url,
    }));
});

</script>


<style lang="scss">
.footer-container {
    min-height: 576px;
    position: relative;

    span,
    a,
    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    svg {
        font-family: "Quicksand", sans-serif;
        font-optical-sizing: auto;
    }

    .top-line {
        position: absolute;
        top: calc(-51px);
        z-index: 1;
        max-height: 97px;
        min-height: 97px;
    }

    .inner-conatiner {
        display: flex;
        flex-direction: column;
        background-color: var(--primary-color);
        padding-left: 600px;
        max-width: 86%;
        min-height: 360px;

        footer {
            padding: 30px;
            padding-top: 40px;
            position: relative;
            display: flex;
            flex-direction: row;

            .nav-section {
                display: flex;
                justify-content: flex-start;
                width: 100%;
                padding-left: 40px;

                nav {
                    h6 {
                        margin-bottom: 2rem;
                    }
                }
            }

            .seperate-line {
                position: absolute;
                top: 0;
                left: 30%;
                z-index: 1;
                transform: rotate(90deg);
                height: 150px;
                width: 120px;
            }

            span,
            div,
            a,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            svg {
                color: #fff !important;
                fill: #fff !important;
            }

            .logo-sec {
                display: flex;

                .content {
                    margin-left: 20px;

                    p {
                        margin: 0;
                    }

                    .logo_name {
                        font-weight: bold;
                    }
                }

                img {
                    width: 90px;
                    height: 90px;
                    object-fit: contain;
                }
            }

            nav {
                display: flex;
                flex-direction: column;
                margin-right: 30px;
                min-width: fit-content;

                p {
                    font-size: 1rem;
                    max-width: 400px;
                }

                a {
                    cursor: pointer;
                    margin-bottom: 10px;
                }

                h6 {
                    margin: 1rem 0;
                    font-size: 1rem;
                }
            }

            .call {
                position: relative;

                .line-svg {
                    position: absolute;
                    top: -150px;
                    left: -167px;
                    z-index: 1;

                    img {
                        width: 177px;
                        height: 162px;
                        transform: rotate(16deg);
                    }
                }
            }
        }
    }

    .copyright-sec {
        background-color: rgba(228, 228, 228, 0.7);
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
            color: #4b4b4b;
        }

        .links {
            padding-bottom: 5px;

            a,
            nuxt-link {
                color: #4b4b4b;

                &::after {
                    content: "|";
                    margin: 0 20px;
                }

                &:last-child {
                    &::after {
                        content: "";
                        margin: 0;
                    }
                }
            }
        }
    }

    .social-icons {
        display: flex;
        flex-direction: column;

        img {
            width: 50px;
        }
    }

    .main-img {
        width: 570px;
        position: absolute;
        left: 0;
    }

    /* Updated Partners Section */
    .partners-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;

        h3 {
            margin-bottom: 1rem;
            font-size: 1.5rem;
            color: #333;
        }

        .partners-images {
            display: flex;
            justify-content: center;
            align-items: center;

            a {
                margin: 0 20px;

                img {
                    max-width: 100px;
                    height: auto;
                }
            }
        }
    }
}

@media screen and (max-width: 1500px) {
    .footer-container {
        min-height: 476px;
        position: relative;

        .top-line {
            position: absolute;
            top: -43px;
            z-index: 1;
        }

        .main-img {
            width: 470px;
        }

        .inner-conatiner {
            display: flex;
            flex-direction: column;
            background-color: var(--primary-color);
            padding-left: 500px;
            max-width: 90%;
            min-height: 360px;
        }
    }
}

@media screen and (min-width: 991px) and (max-width:1500px) {
    .footer-container {
        min-height: 476px;
        position: relative;

        .top-line {
            position: absolute;
            top: -53px;
            z-index: 1;
            height: 97px;
            max-width: 100%;
        }

        .main-img {
            width: 400px;
        }

        .inner-conatiner {
            display: flex;
            flex-direction: column;
            background-color: var(--primary-color);
            padding-left: 500px;
            max-width: 100%;
            min-height: 360px;
        }
    }
}


nuxt-link {
    color: #fff;
    text-decoration: none;
}

@media screen and (max-width: 571px) {
    .footer-container {
        position: relative;

        .top-line {
            position: absolute;
            top: -10px;
            width: 100%;
            z-index: 1;
        }

        .main-img {
            display: none;
        }

        .inner-conatiner {
            display: flex;
            flex-direction: column;
            background-color: var(--primary-color);
            padding-left: 0px;
            max-width: 100%;
            min-height: 360px;

            footer {
                flex-direction: column;
                justify-content: flex-start;
                align-self: start;
                align-content: flex-start;

                &.intro {
                    nav {
                        margin-right: 0;
                        flex-direction: column;

                        .logo-sec {
                            margin: 1rem 0;
                        }
                    }
                }

                .nav-section {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    width: 100%;
                    padding-left: 0;

                    nav {
                        flex: 1 1 0;
                        margin-right: 30px;

                        h6 {
                            margin-bottom: 2rem;
                        }
                    }
                }

                .social-icon {
                    max-width: 70px;
                    margin-top: -15px;
                }
            }

            .call {
                position: relative;

                .line-svg {
                    display: none;
                }
            }
        }

        .copyright-sec {
            text-align: center;

            a,
            p {
                font-size: 0.8rem;
            }
        }

        .social-icons {
            display: flex;
            flex-direction: row;

            img {
                margin-right: 10px;
                padding-top: 10px;
                width: 50px;
            }
        }
    }
}
@media screen and (min-width: 571px) and (max-width:991px) {
    .footer-container {
        position: relative;

        .top-line {
            display: none;
        }

        .main-img {
            display: none;
        }

        .inner-conatiner {
            display: flex;
            flex-direction: column;
            background-color: var(--primary-color);
            padding-left: 0px;
            max-width: 100%;
            min-height: 360px;

            .line-svg {
                display: none;
            }

            footer {
                nav {
                    margin-right: 10px;
                }
            }
        }
    }
}


@media screen and (min-width:900px) and (max-width:1200px) {
    .footer-container {
        .top-line {
            display: none;
        }

        .main-img{
            width: 200px;
        }

        .inner-conatiner{
            padding-left: 180px;
        }
    }
}
</style>
