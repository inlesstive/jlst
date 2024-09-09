<script>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const prev = ref(null);
    const next = ref(null);
    const thumbsSwiper = ref(null);
    const store = useProductStore();
    const store_home = useHomeStore();

    const route = useRoute();
    const config = useRuntimeConfig();

    const product = computed(() => store.product);
    const home = computed(() => store_home.data);



    onBeforeMount(() => {
      store.getProduct(route.params.id);
      store_home.fetchData();

      
    });

    const bread = computed(() => {
        product?.product_title
    })

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    const breadcrumb = computed(() => {
      return [
        { title: 'Главная', to: '/' },
        { title: 'Результат поиска', to: '/' },
        { title: `${product.value?.product_title}` || 'Загрузка...', to: '/' },
      ];
    });

    return {
      thumbsSwiper,
      setThumbsSwiper,
      prev,
      next,
      product,
      breadcrumb,
      modules: [FreeMode, Navigation, Thumbs],
      config,
      home,
      bread
    };
  },
};

</script>

<template>
    <div>

        
        <Search />
        <section class="pt-[10px] pb-[30px] lg:pt-[15px] lg:pb-[15px]">
        <div class="container flex flex-wrap items-center gap-[10px]">
            <div v-for="(link, idx) in breadcrumb" :key="idx" class="flex gap-[10px] text-color-8 text-sm leading-[135%]">
                <NuxtLink
                    :to="link.to"
                    :class="breadcrumb.length - 1 == idx ? 'text-black underline' : ''"
                >{{link.title}}</NuxtLink>
                <span v-if="idx != (breadcrumb.length - 1)">/</span>
            </div>
        </div>
    </section>

        <section class="mb-[30px] lg:mb-[126px]">
            <div class="container flex flex-col xl:flex-row items-start gap-[30px] xl:gap-6">
                <div class="w-full xl:w-[calc(100%_-_641px)] flex flex-col lg:flex-row lg:items-stretch gap-[15px] lg:gap-6 lg:h-[680px]">
                    <div class="w-full lg:w-[calc(100%_-_129px)]">
                        <swiper
                            :spaceBetween="10"
                            :thumbs="{ swiper: thumbsSwiper }"
                            :modules="modules"
                            :loop="true"
                            :navigation="{
                                prevEl: prev,
                                nextEl: next,
                            }"
                            ref="productSwp"
                            class="w-full border border-color-6 border-solid rounded-[3px] h-[308px] lg:h-full"
                        >
                            <swiper-slide v-for="item in product?.product_img?.data" :key="item" class="h-full">
                                <img :src="config.public.upload + item.attributes.url" alt="" class="w-full h-full object-cover">
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="w-full lg:w-[105px] flex flex-row lg:flex-col gap-3 justify-between items-center">
                        <button ref="prev">
                            <img src="~/assets/images/swp-btn-prev.svg" alt="" class="-rotate-90 lg:rotate-0">
                        </button>
                        <swiper
                            @swiper="setThumbsSwiper"
                            :spaceBetween="18"
                            :slidesPerView="2"
                            :watchSlidesProgress="true"
                            :modules="modules"
                            :breakpoints="{
                                '1024': {
                                    'direction': 'vertical',
                                    slidesPerView: 5
                                },
                                '700': {
                                    slidesPerView: 5
                                },
                                '576': {
                                    slidesPerView: 4
                                },
                                '490': {
                                    slidesPerView: 3,
                                    spaceBetween: 12,
                                },
                            }"
                            class="w-[calc(100%_-_112px)] lg:w-full h-[106px] lg:h-[calc(100%_-_102px)] product-swp"
                        >
                            <swiper-slide v-for="item in product?.product_img?.data" :key="item" class="border border-color-6 border-solid rounded-[3px] relative min-h-[106px] lg:min-h-max">
                                <img :src="config.public.upload + item.attributes.url" alt="" class="w-full h-full object-cover">
                            </swiper-slide>
                        </swiper>
                        <button ref="next">
                            <img src="~/assets/images/swp-btn-next.svg" alt="" class="-rotate-90 lg:rotate-0">
                        </button>
                    </div>
                </div>
                <div class="w-full xl:w-[617px]">
                    <h2 class="text-4xl md:text-5xl text-black leading-10 md:leading-[115%] tracking-[-0.6px] mb-[15px] md:mb-[30px]">{{product?.product_title}}</h2>
                    <div class="flex flex-wrap md:flex-nowrap items-center justify-between gap-[5px] mb-[22px] md:mb-[42px]">
                        <div class="flex items-center gap-[5px] text-color-4 text-lg leading-7">
                            <span>Арт.</span>
                            <span class="text-black font-semibold">{{product?.product_articul}}</span>
                        </div>
                        <p class="flex items-center gap-[5px]">
                            <span
                                :class="[
                                    'w-[10px] h-[10px] rounded-full',
                                    product?.product_stock ? 'bg-[#00CE15]' : 'bg-red-500'
                                ]"
                            ></span>
                            <span class="text-lg font-semibold leading-7 tracking-[-0.2px]">
                                {{ product?.product_stock ? 'В наличии' : 'Нет в наличии' }}
                            </span>
                        </p>

                        <div class="flex items-center justify-center gap-[10px] w-full md:w-auto">
                            <div class="flex items-center gap-[5px]">
                                <svg v-for="i in 5" :key="i" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.08854 12.0329L3.72186 17.9509C3.67954 18.1301 3.69225 18.3179 3.75832 18.4898C3.82439 18.6617 3.94075 18.8096 4.09221 18.9143C4.24368 19.019 4.42319 19.0756 4.60732 19.0767C4.79144 19.0778 4.97162 19.0233 5.12431 18.9204L10.1187 15.5909L15.113 18.9204C15.2692 19.0242 15.4535 19.0776 15.641 19.0735C15.8285 19.0694 16.0102 19.0079 16.1618 18.8974C16.3133 18.787 16.4274 18.6327 16.4886 18.4555C16.5499 18.2782 16.5554 18.0865 16.5044 17.906L14.8268 12.0357L18.9874 8.29154C19.1206 8.17156 19.2158 8.01514 19.2611 7.84165C19.3064 7.66815 19.2999 7.48518 19.2423 7.31537C19.1847 7.14555 19.0786 6.99634 18.9371 6.88618C18.7956 6.77602 18.625 6.70974 18.4462 6.69555L13.2171 6.27913L10.9543 1.27011C10.8821 1.10882 10.7648 0.97186 10.6165 0.875757C10.4683 0.779653 10.2953 0.728516 10.1187 0.728516C9.94196 0.728516 9.76904 0.779653 9.62077 0.875757C9.4725 0.97186 9.35521 1.10882 9.28305 1.27011L7.02024 6.27913L1.79109 6.69464C1.61539 6.70855 1.44743 6.77279 1.3073 6.87967C1.16716 6.98655 1.06078 7.13153 1.00088 7.29728C0.940987 7.46304 0.930113 7.64254 0.96956 7.81431C1.00901 7.98608 1.09711 8.14284 1.22332 8.26586L5.08854 12.0329ZM7.70541 8.06498C7.86913 8.05208 8.02637 7.99538 8.16064 7.90081C8.29491 7.80624 8.40126 7.67729 8.46855 7.52748L10.1187 3.87597L11.7688 7.52748C11.836 7.67729 11.9424 7.80624 12.0767 7.90081C12.2109 7.99538 12.3682 8.05208 12.5319 8.06498L16.1752 8.35391L13.1749 11.0542C12.9144 11.2891 12.8107 11.6505 12.9061 11.988L14.0554 16.0101L10.6286 13.7252C10.4782 13.6243 10.3012 13.5704 10.12 13.5704C9.93888 13.5704 9.76183 13.6243 9.61142 13.7252L6.03054 16.1128L6.99364 11.943C7.02895 11.7897 7.02421 11.6298 6.97988 11.4788C6.93554 11.3278 6.8531 11.1908 6.74048 11.0808L3.95392 8.364L7.70541 8.06498Z" fill="#E77C40"/>
                                </svg>
                            </div>
                            <p class="text-color-8 text-sm leading-[135%]">{{product?.product_review}} Отзывов</p>
                        </div>
                    </div>
                    <div class="flex items-start justify-center gap-[10px] mb-[10px] md:mb-[30px]">
                        <h3 class="text-4xl md:text-5xl leading-10 md:leading-[115%] tracking-[-0.3px]">{{product?.product_cost}}₽</h3>
                        <h4 class="text-color-4 text-lg md:text-2xl leading-5 md:leading-7 tracking-[-0.3px] line-through">{{product?.product_discount}}₽</h4>
                    </div>
                    <div class="flex flex-col gap-[10px] items-center mb-[10px] md:mb-[30px]">
                        <div class="flex items-center justify-center gap-6">
                            <Calculate btnClass="w-10 md:w-[56px]" class="w-[138px] md:w-[210px] h-[43px] md:h-[59px]" />
                            <Btn class="h-[43px] md:h-[59px] w-[113px] md:w-[179px]">В корзину</Btn>
                        </div>
                        <Btn class="w-[239px] md:w-[413px] h-[43px] bg-color-7 text-white">Быстрая покупка</Btn>
                    </div>
                    <ul class="bg-color-6 p-[15px] md:py-[30px] md:px-12 rounded-[3px] flex flex-col gap-[10px] md:gap-3 mb-[10px] md:mb-[30px]">
                        <li class="flex items-end justify-between" v-for="item in product?.product_condition" :key="item">
                            <p class="flex-shrink-0 text-xs md:text-base leading-4 md:leading-[22px] text-color-4">{{item.type}}</p>
                            <div class="w-full border-t border-t-color-8 border-dashed"></div>
                            <p class="flex-shrink-0 text-xs md:text-base leading-4 md:leading-[22px] text-black">{{item.text}}</p>
                        </li>
                    </ul>
                    <ul class="flex flex-wrap items-start gap-3 md:gap-6">
                        <li class="flex items-start gap-3 w-[calc(50%_-_12px)]">
                            <img src="~/assets/images/skill-icon-1.svg" alt="">
                            <div>
                                <h4 class="text-base md:text-xl leading-[22px] md:leading-8 tracking-[-0.2px]">Поставки</h4>
                                <p class="text-xs md:text-base leading-4 md:leading-[135%]">Поставки запчастей <br> с Европы и Азии</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-3 w-[calc(50%_-_12px)]">
                            <img src="~/assets/images/skill-icon-2.svg" alt="">
                            <div>
                                <h4 class="text-base md:text-xl leading-[22px] md:leading-8 tracking-[-0.2px]">Гарантия</h4>
                                <p class="text-xs md:text-base leading-4 md:leading-[135%]">От 6 до 12 месяцев гарантия <br> на все товары</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-3 w-[calc(50%_-_12px)]">
                            <img src="~/assets/images/skill-icon-3.svg" alt="">
                            <div>
                                <h4 class="text-base md:text-xl leading-[22px] md:leading-8 tracking-[-0.2px]">Доставка</h4>
                                <p class="text-xs md:text-base leading-4 md:leading-[135%]">Бесплатная доставка <br> до ТК Деловые линии, ПЭК</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-3 w-[calc(50%_-_12px)]">
                            <img src="~/assets/images/skill-icon-4.svg" alt="">
                            <div>
                                <h4 class="text-base md:text-xl leading-[22px] md:leading-8 tracking-[-0.2px]">Оплата</h4>
                                <p class="text-xs md:text-base leading-4 md:leading-[135%]">Оплаты принимаем <br> по безналичному расчету</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="mb-[30px] lg:mb-[53px] bg-[linear-gradient(157.72deg,_rgb(142,142,142)_34.658%,_rgb(40,40,40)_74.923%,_rgb(80,80,80)_87.523%)] lg:bg-none">
            <div class="container relative z-[1] text-white lg:bg-[linear-gradient(157.72deg,_rgb(142,142,142)_34.658%,_rgb(40,40,40)_74.923%,_rgb(80,80,80)_87.523%)] pt-6 pb-[232px] lg:pt-10 lg:pb-10 lg:px-[120px] rounded-[3px]">
                <h2 class="mb-6 text-[36px] lg:text-5xl leading-10 lg:leading-[115%] tracking-[-0.4px] font-normal text-center lg:text-left" v-html="home?.sapre_second_title.replace(/\n/g, '<br>')"></h2>
                <div class="flex flex-col lg:flex-row items-center gap-6">
                    <Btn class="h-[60px] w-[278px]">{{ home?.spare_second_button }}</Btn>
                    <p class="lowercase text-base leading-[120%] tracking-[0.15px]">
                        Или <NuxtLink to="/">войдите в Личный кабинет</NuxtLink>
                    </p>
                </div>
                <img :src="config.public.upload + home?.spare_second_img?.data?.attributes?.url" alt="" class="absolute object-contain z-[-1] left-[50%] lg:left-auto -translate-x-2/4 lg:translate-x-0 bottom-0 lg:bottom-auto lg:right-[42px] lg:top-[-70px] 2xl:top-[-128px] min-w-[390px] w-[390px] lg:w-[580px] xl:w-[650px] 2xl:w-[777px]">
            </div>
        </section>
    </div>
</template>
