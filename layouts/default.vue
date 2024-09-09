<script setup>

const store1 = useHomeStore()
const store2 = useCounterStore()
const store3 = useProductStore()

</script>


<template>
    <div class="w-full overflow-hidden min-h-[100svh] font-source-sans font-normal">
        <!-- Header -->
        <Header />
        <!-- Header end -->


        <Loader class="loader" v-if="store1.isLoading && store3.isLoading"/>
        <slot />

        <!-- Footer -->
        <Footer />
        <!-- Footer end -->

        <Navigation />
    </div>
</template>

<style scoped>


.loader  {
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 50000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>