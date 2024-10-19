<script setup>
import { onMounted, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import CarInfoComp from '../components/CarInfoComp.vue';
import axiosInstance from '../service/axiosInstance';
const { isDarkTheme } = useLayout();

const products = ref(null);
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
const productService = new ProductService();
const branchSearch = ref('');
const setBranch = (branch) => {
    console.log(branch);

    branchSearch.value = branch;
    console.log(branchSearch.value);
    queryCar();
};
const queryCar = () => {
    axiosInstance.post('/cars/query', {
        // ...queryParams,
        brandId: branchSearch.value,
        page: 1,
        pageSize: 100,
        sortItems: [
            {
                field: 'brandId',
                desc: true
            }
        ]
    });
};
onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
    axiosInstance.post('/cars/query', {
        page: 1,
        pageSize: 100,
        sortItems: [
            {
                field: 'styleId',
                desc: true
            }
        ]
    });
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
</script>

<template>
    <div class="card" style="padding-bottom: 0px">
        <h5>Tìm kiếm</h5>
        <TabView>
            <TabPanel header="Tìm kiếm tin mua">
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-12">
                        <IconField iconPosition="left">
                            <InputText type="text" placeholder="Search" style="width: 100%" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div></div
            ></TabPanel>
            <TabPanel header="Tìm kiếm tin bán">
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-12">
                        <IconField iconPosition="left">
                            <InputText type="text" placeholder="Search" style="width: 100%" />
                            <InputIcon class="pi pi-search" />
                        </IconField>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Tìm theo hãng xe">
                <Button v-for="(button, i) in listButton" :key="i" @click="setBranch(button)" :label="button" severity="contrast" :outlined="branchSearch !== button" class="mb-2 mr-2" />
            </TabPanel>
        </TabView>
    </div>
    <div class="card">
        <div class="header-card">
            <h5>Mua bán ô tô</h5>
            <div class="right-part"><h9 style="float: right">Tổng: 12345</h9></div>
        </div>
        <hr />
        <div class="col-12 car-comp">
            <CarInfoComp></CarInfoComp>
        </div>
        <div class="col-12 car-comp">
            <CarInfoComp></CarInfoComp>
        </div>
        <div class="col-12 car-comp">
            <CarInfoComp></CarInfoComp>
        </div>
        <div class="col-12 car-comp">
            <CarInfoComp></CarInfoComp>
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
}
</style>
