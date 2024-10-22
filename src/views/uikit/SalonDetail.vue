f
<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from 'vue';
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
import { PhotoService } from '@/service/PhotoService';
import { ProductService } from '@/service/ProductService';
import { useRouter } from 'vue-router';
import { GoogleMap, Marker } from 'vue3-google-map';

const center = { lat: 40.689247, lng: -74.044502 };
const router = useRouter();
const autoValue = ref(null);
const productService = new ProductService();

const images = ref([]);
const dataviewValue = ref(null);
const treeSelectNodes = ref(null);
const countryService = new CountryService();
const nodeService = new NodeService();
const layout = ref('grid');

const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const photoService = new PhotoService();

onMounted(() => {
    countryService.getCountries().then((data) => (autoValue.value = data));
    nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));

    photoService.getImages().then((data) => (images.value = data));
});
</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>Salon Ô tô Siu Hùng</h5>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="card mt-4" style="max-height: 470px">
                            <h5>Thông tin salon xe</h5>
                            <div style="display: flex">
                                <div class="col-12 md:col-6">
                                    <div class="grid formgrid">
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1rem">
                                            <p style="margin-right: 12px"><b> Địa chỉ: </b></p>
                                            <p>138 Cộng Hòa, P4, Q. Tân Bình, TP HCM</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1rem">
                                            <p style="margin-right: 12px"><b> Điện Thoại: </b></p>
                                            <p>0903199921 - 0903925656 .</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1rem">
                                            <p style="margin-right: 12px"><b>Website: </b></p>
                                            <router-link>https://otosiuhung.com</router-link>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-4">
                            <h5>Một số hình ảnh về Salon Ô tô Siu Hùng</h5>
                            <Galleria :value="images" :responsiveOptions="galleriaResponsiveOptions" :numVisible="3" :circular="true" containerStyle="max-width: 800px; max-height: 820px; margin: auto">
                                <template #item="slotProps">
                                    <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                                </template>
                                <template #thumbnail="slotProps">
                                    <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                                </template>
                            </Galleria>
                        </div>
                        <div class="card">
                            <div class="flex" style="justify-content: space-between">
                                <h5>Xe đang bán tại Salon Ô tô Siu Hùng</h5>
                                <div class="right-part" style="float: right"><h9>Tổng: 12345</h9></div>
                            </div>
                            <hr />
                            <DataView :value="dataviewValue" :layout="layout" :rows="9">
                                <template #grid="slotProps">
                                    <div class="grid grid-nogutter">
                                        <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 p-2">
                                            <div class="content-card p-4 border-1 surface-border surface-card border-round flex flex-column">
                                                <div class="surface-50 flex justify-content-center border-round p-3">
                                                    <div class="relative mx-auto">
                                                        <img class="border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 400px" />
                                                    </div>
                                                </div>
                                                <div class="pt-2">
                                                    <div class="flex flex-row justify-content-between align-items-start gap-2">
                                                        <div>
                                                            <span class="text-lg font-medium text-900" @click="router.push('/detail/1')">{{ item.category }}</span>
                                                            <div v-if="!changeParam" class="font-medium text-secondary text-sm mt-1">{{ item.name }}</div>
                                                            <div class="text-lg font-medium text-800 mt-3">{{ item.description }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </DataView>
                            <Paginator v-model:first="pagination" :rows="10" :totalRecords="120"></Paginator>
                        </div>
                    </div>

                    <div class="col-12 md:col-4">
                        <div class="card mt-4" style="height: 470px">
                            <h5>Bản đồ đường đi</h5>

                            <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
                                <Marker :options="{ position: center }" />
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h5 {
    margin-bottom: 5px;
}
</style>
