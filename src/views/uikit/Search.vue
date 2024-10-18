<script setup>
import { ref } from 'vue';

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

const dropdownItem = ref('all');
const gearItem = ref('all');
const province = ref(null);
const selectedNode = ref(null);
const firstPrice = ref(null);
const lastPrice = ref(null);

const treeSelectNodes = ref([
    {
        key: '0',
        label: 'Audi',
        data: 'Documents Folder',
        children: [
            {
                key: '0-0',
                label: 'Work',
                data: 'Work Folder',
                children: [
                    { key: '0-0-0', label: 'Expenses.doc', data: 'Expenses Document' },
                    { key: '0-0-1', label: 'Resume.doc', data: 'Resume Document' }
                ]
            },
            { key: '0-1', label: 'Home', data: 'Home Folder', children: [{ key: '0-1-0', label: 'Invoices.txt', data: 'Invoices for this month' }] }
        ]
    },
    {
        key: '1',
        label: 'Bently',
        data: 'Events Folder',
        children: [
            { key: '1-0', label: 'Meeting', data: 'Meeting' },
            { key: '1-1', label: 'Product Launch', data: 'Product Launch' },
            { key: '1-2', label: 'Report Review', data: 'Report Review' }
        ]
    },
    {
        key: '2',
        label: 'BMW',
        data: 'Movies Folder',
        children: [
            {
                key: '2-0',
                label: 'Al Pacino',
                data: 'Pacino Movies',
                children: [
                    { key: '2-0-0', label: 'Scarface', data: 'Scarface Movie' },
                    { key: '2-0-1', label: 'Serpico', data: 'Serpico Movie' }
                ]
            },
            {
                key: '2-1',
                label: 'Robert De Niro',
                data: 'De Niro Movies',
                children: [
                    { key: '2-1-0', label: 'Goodfellas', data: 'Goodfellas Movie' },
                    { key: '2-1-1', label: 'Untouchables', data: 'Untouchables Movie' }
                ]
            }
        ]
    }
]);
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <h5>Tìm kiếm</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4">
                        <label for="name1">Hãng xe</label>
                        <TreeSelect v-model="selectedNode" :options="treeSelectNodes" placeholder="Chọn hãng xe"></TreeSelect>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="state">Tình trạng xe</label>
                        <Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Chọn tình trạng xe"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-4">
                        <label for="province">Tỉnh thành</label>
                        <Dropdown id="province" v-model="province" :options="provinces" optionLabel="name" placeholder="Chọn tỉnh thành"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="gear">Hộp số</label>
                        <Dropdown id="gear" v-model="gearItem" :options="gearItems" optionLabel="name" placeholder="Chọn loại hộp số"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="price">Khoảng giá</label>
                        <div class="price-display">
                            <InputNumber class="price" v-model="firstPrice" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid />
                            <p>-</p>
                            <InputNumber class="price" v-model="lastPrice" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
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
                <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
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
    width: 350px;
}
</style>
