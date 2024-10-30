<script setup>
import { ref, onBeforeMount } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRouter } from 'vue-router';
const customer2 = ref(null);
const filters1 = ref(null);
const loading2 = ref(null);
const idFrozen = ref(false);
const products = ref(null);
const router = useRouter();

const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'vip':
            return 'warning';

        case 'renewal':
            return null;
    }
};

onBeforeMount(() => {
    // productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    // customerService.getCustomersLarge().then((data) => {
    //     customer1.value = data;
    //     loading1.value = false;
    //     customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    // });
    // customerService.getCustomersLarge().then((data) => (customer2.value = data));
    // customerService.getCustomersMedium().then((data) => (customer3.value = data));
    loading2.value = false;

    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const gotoSeller = (event) => {
    router.push('/seller/1');
};
const gotoBuyer = (event) => {
    router.push('/buyer/1');
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Quản lý người bán</h5>
                <DataTable selectionMode="single" @rowSelect="gotoSeller($event)" :value="customer2" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both" class="mt-3">
                    <Column field="id" header="ID" style="min-width: 100px" :frozen="idFrozen"></Column>
                    <Column field="name" header="Tên" style="min-width: 200px" frozen></Column>
                    <Column field="email" header="Email" :style="{ width: '200px' }">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.email }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="date" header="Số điện thoại" style="min-width: 200px"></Column>
                    <Column field="company" header="Khu vực" style="min-width: 200px"></Column>
                    <Column field="status" header="Vip" style="min-width: 50px">
                        <template #body="{ data }">
                            <Tag :severity="getSeverity(data.status)">{{ data.status.toUpperCase() }}</Tag>
                        </template>
                    </Column>
                    <Column field="country.name" header="Địa chỉ" style="min-width: 400px"></Column>
                </DataTable>
            </div>
            <div class="card mt-4">
                <h5>Quản lý người mua</h5>
                <DataTable selectionMode="single" @rowSelect="gotoBuyer($event)" :value="customer2" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both" class="mt-3">
                    <Column field="id" header="ID" style="min-width: 100px" :frozen="idFrozen"></Column>
                    <Column field="name" header="Tên" style="min-width: 200px" frozen></Column>
                    <Column field="country.name" header="Email" :style="{ width: '200px' }">
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <span>{{ data.country.name }}</span>
                            </div>
                        </template>
                    </Column>
                    <Column field="date" header="Số điện thoại" style="min-width: 200px"></Column>
                    <Column field="company" header="Khu vực" style="min-width: 200px"></Column>
                    <Column field="status" header="Vip" style="min-width: 200px">
                        <template #body="{ data }">
                            <Tag :severity="getSeverity(data.status)">{{ data.status.toUpperCase() }}</Tag>
                        </template>
                    </Column>
                    <Column field="activity" header="Địa chỉ" style="min-width: 200px"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
