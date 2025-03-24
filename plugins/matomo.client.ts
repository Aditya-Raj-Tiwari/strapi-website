// plugins/matomo.client.ts
import { defineNuxtPlugin } from '#app'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin(() => {
    // Only do this in the browser
    if (typeof window !== 'undefined') {
        // Initialize the Matomo data layer if not already initialized
        window._mtm = window._mtm || []
        window._mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })

            // Dynamically inject the Matomo container script
            ; (function () {
                const d = document
                const g = d.createElement('script')
                const s = d.getElementsByTagName('script')[0]
                g.async = true
                g.src = 'https://analytics.webimpact.io/js/container_DXPKVjCG.js'
                s.parentNode.insertBefore(g, s)
                console.log('Matomo container script injected')
            })()
    }

    // Listen for route changes and trigger a new page view on every navigation
    const router = useRouter()
    router.afterEach((_to, _from) => {
        if (typeof window !== 'undefined' && window._mtm) {
            window._mtm.push({
                event: 'mtm.PageView',
                // Add any additional page/URL metadata you need:
                url: window.location.href,
            })
        }

        console.log('Matomo container script injected on dynamic load')

    })
})
