<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import CarInfoComp from '../components/CarInfoComp.vue';

const { isDarkTheme } = useLayout();

const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
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
                <Button label="Audi" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Bently" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="BMW" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Chevrolet" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Daewoo" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Ford" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Honda" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Huyndai" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Isuzu" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Jeep" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="KIA" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="LandRover" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Lexus" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Mazda" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Mercedes Benz" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="MG" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Mini" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Mitsubishi" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Nissan" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Peugeot" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Porsche" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Subaru" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Suzuki" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Toyota" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Vinfast" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Volkswagen" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Volvo" severity="contrast" outlined class="mb-2 mr-2" />
                <Button label="Tất cả các hãng" severity="contrast" outlined class="mb-2 mr-2" />
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
