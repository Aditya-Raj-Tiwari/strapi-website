<template>
    <div>
        <button v-show="!loadingChat"
            class="open-zammad-chat flex items-center space-x-2 px-4 py-2 rounded animate-bounceUp"
            :style="{ backgroundColor: primaryColor, color: secondaryColor, borderColor: secondaryColor }">
            <span :style="{ color: secondaryColor }" class="mr-6">Chat mit uns ! </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="none" :stroke="secondaryColor"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="inline-block">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    primaryColor: {
        type: String,
        default: '#122A43', // Default primary color
    },
    secondaryColor: {
        type: String,
        default: '#FF5722', // Default secondary color
    },
});

const loadingChat = ref(true);

onMounted(() => {
    // Load jQuery first
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.async = true;
    script.onload = () => {
        if (typeof window.$ === 'undefined') {
            console.error('jQuery failed to load');
            return;
        }

        // Load the Zammad chat script
        const chatScript = document.createElement('script');
        chatScript.src = 'https://support.webimpact.io/assets/chat/chat.min.js';
        chatScript.async = true;
        chatScript.onload = () => {
            if (typeof window.ZammadChat !== 'undefined') {
                console.log('Loaded Chat');

                // Modify WebSocket URL similar to the provided script
                const originalWebSocket = window.WebSocket;
                window.WebSocket = function (url, protocols) {
                    if (url.includes('undefined')) {
                        url = 'wss://support.webimpact.io/ws';
                    }
                    return new originalWebSocket(url, protocols);
                };

                const zammadChat = new window.ZammadChat({
                    fontSize: '12px',
                    chatId: 1,
                    debug: false,
                    show: true,
                    title: `<strong style="color: ${props.secondaryColor}">Hilfe benötigt?</strong> Schreiben Sie uns!`,
                    background: props.primaryColor,
                });

                // Apply custom styles after Zammad chat is loaded
                const customStyles = `
          .zammad-chat .zammad-chat-text {
            color: ${props.secondaryColor} !important;
          }
          .zammad-chat .zammad-chat-button {
            background-color: ${props.secondaryColor} !important;
            color: ${props.primaryColor} !important;
            border: 1px solid ${props.secondaryColor} !important;
          }
          .zammad-chat .zammad-chat-header {
            background-color: ${props.primaryColor} !important;
            color: ${props.secondaryColor} !important;
          }
        `;

                const styleSheet = document.createElement('style');
                styleSheet.type = 'text/css';
                styleSheet.innerText = customStyles;
                document.head.appendChild(styleSheet);

                // Set up the button click event to toggle the chat
                document.querySelector('.open-zammad-chat').addEventListener('click', () => {
                    zammadChat.toggle();
                });

                // Indicate that the chat is ready
                loadingChat.value = false;
            } else {
                console.error('ZammadChat failed to load');
            }
        };
        document.head.appendChild(chatScript);
    };
    document.head.appendChild(script);
});
</script>

<style scoped lang="scss">
.open-zammad-chat {
    position: fixed;
    bottom: 20px;
    right: 90px;
    z-index: 999;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: #fff;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    >svg {
        stroke: #fff;
    }
    >span {
        color: #fff !important;
    }

    &:hover {
        background-color: var(--primary-color);
        >svg {
            stroke: #fff;
        }
        >span {
            color: #fff !important;
        }
    }

    >span{
        margin-right: 10px;
    }
}

@media screen and (max-width: 768px) {
    .open-zammad-chat {
        right: 20px;
    }
}
</style>
