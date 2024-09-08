<script setup>

const config = useRuntimeConfig();
const store = useCounterStore()
// we could also extract the data, but it's already present in the store


const info = computed(() => {
  return store.data;
});
onBeforeMount(() => {
  store.fetchData();
});
</script>

<template>
    <footer class="bg-[#292929] text-white py-[75px]">
        <div class="container flex flex-col lg:flex-row items-center justify-between gap-[10px] lg:gap-10">
            <NuxtLink to="/" class="flex flex-col xl:flex-row items-center gap-[15px]">
                <img :src="config.public.upload + info?.logo?.data?.attributes?.url" alt="" class="w-[180px] lg:w-auto">
                <span class="text-sm leading-[135%]" v-html="info?.logo_text.replace(/\n/g, '<br>')" ></span>
            </NuxtLink>
            <div class="flex items-center gap-[30px]">
                <a href="tel:+74950000000" class="flex items-center gap-[5px]">
                    <img src="~/assets/images/phone-white.svg" alt="">
                    <span class="font-semibold text-base leading-6 tracking-[-0.2px] text-white">{{ info?.contact_text}}</span>
                </a>
                <ul class="flex items-center gap-[15px]">
                    <li>
                        <a :href="'mailto:' + info?.mail_link">
                            <img src="~/assets/images/mail-white.svg" alt="">
                        </a>
                    </li>
                    <li>
                        <a :href="info?.telegram_link">
                            <img src="~/assets/images/telegram-white.svg" alt="">
                        </a>
                    </li>
                    <li>
                        <a :href="info?.whatsapp_link">
                            <img src="~/assets/images/whatsapp-white.svg" alt="">
                        </a>
                    </li>
                </ul>
            </div>
            <p class="font-proxima-nova text-base">{{info?.adress}}</p>
            <p class="font-proxima-nova text-base" v-html="info?.politican">
                
            </p>
        </div>
    </footer>
</template>