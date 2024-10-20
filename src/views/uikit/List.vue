<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import axiosInstance from '../../service/axiosInstance';
const dropdownItems = ref([
    { name: 'Tất cả', code: 'all' },
    { name: 'Xe mới', code: 'new' },
    { name: 'Xe cũ', code: 'used' }
]);

const provinces = ref([
    { name: 'Toàn quốc', code: 'all' },
    { name: 'Hà Nội', code: 'HNI' },
    { name: 'TP. Hồ Chí Minh', code: 'HCM' }
]);
const province = ref(1);

const dropdownItem = ref(0);

const dataviewValue = ref(null);
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);

const productService = new ProductService();
const queryParams = reactive({
    brandId: dropdownItem.value,
    cityId: province.value,
    page: 1,
    pageSize: 100,
    sortItems: [
        {
            field: 'brandId',
            desc: true
        }
    ]
});
const pagination = ref(1);

const querySalon = async () => {
    const res = await axiosInstance.post('/cars/query', { ...queryParams });
    console.log(res);
};

const changeParam = computed(() => {
    querySalon();
    return province.value !== 'aaaaaaaaaa' && dropdownItem.value;
});
onMounted(() => {
    querySalon();
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});

watch(pagination, (val) => {
    queryParams.page = val / 10 + 1;

    querySalon();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Danh sách salon oto - showroom ô tô</h5>
                <label for="state" style="margin-right: 10px">Salon oto / showroom oto chuyên:</label>
                <Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Chọn tình trạng xe"></Dropdown>
                <label for="province" style="margin: 0px 10px 0 20px">Tỉnh thành: </label>
                <Dropdown id="province" v-model="province" :options="provinces" optionLabel="name" placeholder="Chọn tỉnh thành"></Dropdown>

                <hr />
                <DataView :value="dataviewValue" :layout="layout" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #grid="slotProps">
                        <div class="grid grid-nogutter">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-3 p-2">
                                <div class="content-card p-4 border-1 surface-border surface-card border-round flex flex-column">
                                    <div class="surface-50 flex justify-content-center border-round p-3">
                                        <div class="relative mx-auto">
                                            <img class="border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 400px" />
                                        </div>
                                    </div>
                                    <div class="pt-2">
                                        <div class="flex flex-row justify-content-between align-items-start gap-2">
                                            <div>
                                                <span class="text-lg font-medium text-900">{{ item.category }}</span>
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
    </div>
</template>
<style scoped>
.content-card {
    padding-bottom: 12px !important;
    padding-top: 12px !important;
}
</style>
