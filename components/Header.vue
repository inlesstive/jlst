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
    <header class="py-[10px] lg:py-[15px]">
        {{   }}
        <div class="flex items-center justify-between container">
            <NuxtLink to="/" class="flex items-center gap-[15px]">
                <img :src="config.public.upload + info?.logo?.data?.attributes?.url" alt="" class="w-[90px] lg:w-[180px]">
                <span class="text-sm text-black leading-[135%] hidden lg:block" v-html="info?.logo_text.replace(/\n/g, '<br>')"></span>
                    
            </NuxtLink>
            <div class="flex items-center gap-[30px]">
                <a :href="'tel:' + info?.contact_text" class="flex items-center gap-[5px]">
                    <img :src="config.public.upload + info?.contact?.data?.attributes?.url" alt="">
                    <span class="font-semibold text-base leading-6 tracking-[-0.2px] text-black hidden lg:block">{{info?.contact_text}}</span>
                </a>
                <ul class="flex items-center gap-[15px]">
                    <li>
                        <a :href="'mailto:' + info?.mail_link">
                            <img :src="config.public.upload + info?.mail?.data?.attributes?.url" alt="">
                        </a>
                    </li>
                    <li>
                        <a :href="info?.telegram_link">
                            <img :src="config.public.upload + info?.telegram?.data?.attributes?.url" alt="">
                        </a>
                    </li>
                    <li>
                        <a :href="info?.whatsapp_link">
                            <img :src="config.public.upload + info?.whatsapp?.data?.attributes?.url" alt="">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="flex gap-[10px] lg:gap-6">
                <NuxtLink to="/sign-in" class="flex items-center gap-2 text-black font-proxima-nova text-base">
                    <img src="~/assets/images/user.svg" alt="">
                    <span class="hidden lg:block">Вход в личный кабинет</span>
                </NuxtLink>
                <span class="bg-[linear-gradient(to_bottom,_rgba(193,195,221,0),_#686977,_rgba(193,195,221,0))] w-[1px] h-9"></span>
                <NuxtLink to="/sign-up" class="flex items-center gap-2 text-black font-proxima-nova text-base">
                    <img src="~/assets/images/user-plus.svg" alt="">
                    <span class="hidden lg:block">Регистрация</span>
                </NuxtLink>
            </div>
        </div>
    </header>
</template>