<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import CarInfoComp from '../components/CarInfoComp.vue';
import axiosInstance from '../service/axiosInstance';
import { useRouter } from 'vue-router';

const router = useRouter();
const { isDarkTheme } = useLayout();
const tinBan = ref(null);
const tinMua = ref(null);
const listButton = ref([
    'Audi',
    'Bently',
    'BMW',
    'Chevrolet',
    'Daewoo',
    'Ford',
    'Honda',
    'Huyndai',
    'Isuzu',
    'Jeep',
    'KIA',
    'LandRover',
    'Lexus',
    'Mazda',
    'Mercedes Benz',
    'MG',
    'Mini',
    'Mitsubishi',
    'Nissan',
    'Peugeot',
    'Porsche',
    'Subaru',
    'Suzuki',
    'Toyota',
    'Vinfast',
    'Volkswagen',
    'Volvo',
    'Tất cả các hãng'
]);
const lineOptions = ref(null);
const branchSearch = ref('');
const car = ref({ list: [] });
const pagination = ref(0);
const value = ref(0);

const setBranch = (branch) => {
    branchSearch.value = branch;
    if (branch === 'Tất cả các hãng') router.push('/mua-xe');
    queryCar();
};
const queryCar = async () => {
    const res = await axiosInstance.post('/cars/query', {
        // ...queryParams,
        // brandId: branchSearch.value,
        page: pagination.value / 10,
        pageSize: 10,
        sortItems: [
            {
                field: 'styleId',
                desc: true
            }
        ]
    });
    car.value = res.data.data;
};
onMounted(() => {
    // productService.getProductsSmall().then((data) => (products.value = data));
    queryCar();
});

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

const search = async () => {
    const res = await axiosInstance.post('/cars/query', {
        // ...queryParams,
        keyword: value.value === 0 ? tinMua.value : tinBan.value,
        page: pagination.value / 10,
        pageSize: 10,
        sortItems: [
            {
                field: 'styleId',
                desc: true
            }
        ]
    });
    car.value = res.data.data;
};
watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
watch(pagination, (val) => {
    queryCar();
});
</script>

<template>
    <div class="card" style="padding-bottom: 0px; min-width: 1630px">
        <h5>Tìm kiếm</h5>
        <TabView v-model:activeIndex="value">
            <TabPanel header="Tìm kiếm tin mua" value="0">
                <div class="formgrid flex">
                    <div class="col-11" style="padding: 0; margin-right: 5px">
                        <IconField iconPosition="left">
                            <InputText @keyup.enter="search" v-model="tinMua" type="text" placeholder="Search" style="width: 100%" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                    <div class="col-1" style="padding: 0">
                        <Button label="Tìm kiếm" @click="search"></Button>
                    </div></div
            ></TabPanel>
            <TabPanel header="Tìm kiếm tin bán" value="1">
                <div class="formgrid flex">
                    <div class="col-11" style="padding: 0; margin-right: 5px">
                        <IconField iconPosition="left">
                            <InputText v-model="tinBan" @keyup.enter="search" type="text" placeholder="Search" style="width: 100%" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                    <div class="col-1" style="padding: 0">
                        <Button label="Tìm kiếm" @click="search"></Button>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Tìm theo hãng xe" value="2">
                <Button v-for="(button, i) in listButton" :key="i" @click="setBranch(button)" :label="button" severity="contrast" :outlined="branchSearch !== button" class="mb-2 mr-2" />
            </TabPanel>
        </TabView>
    </div>
    <div class="card" v-if="car.list.length">
        <div class="header-card">
            <h5>Mua bán ô tô</h5>
            <div class="right-part">
                <h9 style="float: right">Tổng: {{ car.totalSize }}</h9>
            </div>
        </div>
        <Paginator v-model:first="pagination" :rows="10" :totalRecords="car.totalSize"></Paginator>
        <hr />
        <div class="col-12 car-comp" v-for="(carEl, index) in car.list" :key="index">
            <CarInfoComp :dataCar="carEl"></CarInfoComp>
        </div>
    </div>
</template>
<style scoped>
.header-card {
    display: flex;
    justify-content: space-between;
}
.car-comp {
    padding: 5px;
    min-width: 1570px;
}
</style>
