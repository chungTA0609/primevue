<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import axiosInstance from '../../service/axiosInstance';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownItems = ref([
    { name: 'Tất cả', code: 'all' },
    { name: 'Xe mới', code: 'new' },
    { name: 'Xe cũ', code: 'used' }
]);
const gearItems = ref([
    { name: 'Tất cả', code: 'all' },
    { name: 'Số sàn', code: 'handle' },
    { name: 'Số tự động', code: 'auto' }
]);
const provinces = ref([
    { name: 'Toàn quốc', code: 'all' },
    { name: 'Hà Nội', code: 'HNI' },
    { name: 'TP. Hồ Chí Minh', code: 'HCM' }
]);

const dropdownItem = ref();
const gearItem = ref();
const province = ref();
const style = ref();
const selectedNode = ref();
const firstPrice = ref();
const fuel = ref();
const origin = ref();
const lastPrice = ref();
const pagination = ref(0);
const car = ref({ list: [] });
const queryParams = reactive({
    // ...queryParams,
    page: 0,
    pageSize: 10,
    sortItems: [
        {
            field: 'styleId',
            desc: true
        }
    ]
});
const brandList = ref([]);
const fuelList = ref([]);
const colorList = ref([]);
const originList = ref([]);
const styleList = ref([]);
const transmissionList = ref([
    {
        code: 'FWD',
        name: 'FWD - Dẫn động cầu trước'
    },
    {
        code: 'RWD',
        name: 'RWD - Dẫn động cầu sau'
    },
    {
        code: '4WD',
        name: '4WD - Dẫn động 4 bánh'
    },
    {
        code: 'AWD',
        name: 'AWD - 4 bánh toàn thời gian'
    }
]);
const queryCar = async (type = null) => {
    try {
        queryParams.page = pagination.value;

        queryParams.brandId = selectedNode.value?.id;
        queryParams.cityId = province.value;
        queryParams.originId = origin.value?.id;
        queryParams.styleId = style.value?.id;
        queryParams.fuelId = fuel.value?.id;
        queryParams.tranmission = fuel.value?.id;
        if (type) queryParams.sortItems[0].field = type;

        const res = await axiosInstance.post('/cars/query', {
            ...queryParams
        });
        car.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllBrand = async () => {
    try {
        const res = await axiosInstance.get('/brands');
        brandList.value = res.data.data.map((element) => {
            return element;
        });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllFuel = async () => {
    try {
        const res = await axiosInstance.get('/fuels');
        fuelList.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllColor = async () => {
    try {
        const res = await axiosInstance.get('/colors');
        colorList.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllCities = async () => {
    try {
        const res = await axiosInstance.get('/address/cities');
        provinces.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllOrigin = async () => {
    try {
        const res = await axiosInstance.get('/origins');
        originList.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllStyle = async () => {
    try {
        const res = await axiosInstance.get('/styles');
        styleList.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
// const getDistrictByCity = async (cityCode) => {
//     try {
//         const res = await axiosInstance.get('/address/district', { cityCode: cityCode });
//         brandList.value = res.data.data.map((element) => {
//             console.log(element);
//             return element;
//         });
//         console.log(brandList.value);
//     } catch (error) {
//                 toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });

//     }
// };
// const getWardByDistrict = async (districtCode) => {
//     try {
//         const res = await axiosInstance.get('/address/wards', { districtCode: districtCode });
//         brandList.value = res.data.data.map((element) => {
//             return element;
//         });
//         console.log(brandList.value);
//     } catch (error) {
//                 toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });

//     }
// };
onMounted(() => {
    getAllBrand();
    getAllCities();
    getAllStyle();
    getAllOrigin();
    getAllColor();
    getAllFuel();
    queryCar();
});
watch(pagination, (val) => {
    queryParams.page = val / 10;

    queryCar();
});
</script>

<template>
    <Toast />

    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <h5>Tìm kiếm</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="name1">Hãng xe</label>
                        <Dropdown @change="queryCar('brandId')" id="state" v-model="selectedNode" :options="brandList" optionLabel="name" placeholder="Chọn tình hãng xe"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="state">Tình trạng xe</label>
                        <Dropdown @change="queryCar(null)" id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Chọn tình trạng xe"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="province">Tỉnh thành</label>
                        <Dropdown @change="queryCar('cityId')" id="province" v-model="province" :options="provinces" optionLabel="name" placeholder="Chọn tỉnh thành"> </Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="gear">Hộp số</label>
                        <Dropdown id="gear" @change="queryCar" v-model="gearItem" :options="gearItems" optionLabel="name" placeholder="Chọn loại hộp số"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="price">Khoảng giá</label>
                        <div class="price-display">
                            <InputNumber @update:modelValue="queryCar('minPrice')" class="price" v-model="firstPrice" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid />
                            <p style="margin-top: 5px">-</p>
                            <InputNumber @update:modelValue="queryCar('maxPrice')" class="price" v-model="lastPrice" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid />
                        </div>
                    </div>
                    <Panel style="width: 100%" header="Mở rộng điều kiện tìm kiếm" :toggleable="true" :collapsed="true">
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-4">
                                <label for="fuel">Nhiên liệu</label>
                                <Dropdown @change="queryCar('fuelId')" id="fuel" v-model="fuel" :options="fuelList" optionLabel="name" placeholder="Chọn loại nhiên liệu"></Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="origin">Xuất xứ</label>
                                <Dropdown @change="queryCar('originId')" id="origin" v-model="origin" :options="originList" optionLabel="name" placeholder="Chọn nơi xuất xứ"></Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="color">Màu xe</label>
                                <Dropdown @change="queryCar('outsideColorId')" id="color" v-model="color" :options="colorList" optionLabel="name" placeholder="Chọn màu xe"> </Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="style">Kiểu dáng</label>
                                <Dropdown @change="queryCar('styleId')" id="style" v-model="style" :options="styleList" optionLabel="name" placeholder="Chọn tình hãng xe"></Dropdown>
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="place">Số chỗ ngồi</label>
                                <InputNumber @update:modelValue="queryCar" v-model="place" inputId="currency-us" fluid placeholder="Số chỗ ngồi" />
                            </div>
                            <div class="field col-12 md:col-4">
                                <label for="gear">Dẫn động</label>
                                <Dropdown @change="queryCar('tranmission')" id="tranmission" v-model="tranmission" :options="transmissionList" optionLabel="name" placeholder="Dẫn động"> </Dropdown>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card" v-if="car.list.length">
                <Paginator v-model:first="pagination" :rows="10" :totalRecords="car.list.length"></Paginator>
                <div class="col-12 car-comp" v-for="(carEl, index) in car.list" :key="index">
                    <CarInfoComp :dataCar="carEl"></CarInfoComp>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.price-display {
    display: flex;
    justify-content: space-between;
}
.price {
    width: 270px;
}
</style>
