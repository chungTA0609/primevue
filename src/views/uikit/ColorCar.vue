<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/service/ProductService';
import axiosInstance from '../../service/axiosInstance';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
onMounted(() => {
    productService.getProductss().then((data) => (products.value = data));
});
const productService = new ProductService();
const dt = ref();
const products = ref();
const brands = ref();
const brandDialog = ref(false);
const deleteBrandDialog = ref(false);
const product = ref({});
// const img = ref(null);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const isLoading = ref(false);

const openNew = () => {
    product.value = {};
    submitted.value = false;
    brandDialog.value = true;
};
const hideDialog = () => {
    brandDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        try {
            isLoading.value = true;

            // const res = await uploadImg(img.value);
            // product.value.logo = res.data.data ?? '';
            product.value.logo = '';
            if (product.value.id) {
                products.value[findIndexById(product.value.id)] = product.value;
                await axiosInstance.put(`/colors/${product.value.id}`, { ...product.value, hex: product.value.hex.includes('#') ? product.value.hex : '#' + product.value.hex });
            } else {
                products.value.push(product.value);
                await axiosInstance.post(`/colors`, { ...product.value, hex: product.value.hex.includes('#') ? product.value.hex : '#' + product.value.hex });
            }
            brandDialog.value = false;
            product.value = {};
            isLoading.value = false;

            getAllBrand();
        } catch (error) {
            console.log(error);
            isLoading.value = false;
            toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
        }
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    brandDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteBrandDialog.value = true;
};
const deleteProduct = async (product) => {
    try {
        isLoading.value = true;

        await axiosInstance.delete(`/colors/${product.id}`);
        deleteBrandDialog.value = false;
        isLoading.value = false;

        getAllBrand();
    } catch (error) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
        deleteBrandDialog.value = false;
    }
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

onMounted(() => {
    getAllBrand();
});
const getAllBrand = async () => {
    try {
        const res = await axiosInstance.get('/colors');
        brands.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
</script>
<template>
    <Toast />

    <div class="mt-3">
        <div class="setting-container">
            <div class="card">
                <DataTable ref="dt" selectionMode="single" :value="brands" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý màu xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                        <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                    </template>

                    <Column field="name" :header="'Tên màu xe'" style="min-width: 30rem"></Column>
                    <Column :header="'Màu xe'" style="min-width: 30rem">
                        <template #body="slotProps">
                            <!-- {{ slotProps.data }} -->
                            <div :style="`width: 24px; height: 24px;border:1px solid #000;background: ${slotProps.data.hex}`"></div>
                        </template>
                    </Column>
                    <Column :exportable="false">
                        <template #body="slotProps">
                            <div style="float: right">
                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="brandDialog" :style="{ width: '450px' }" :header="'Màu xe'" :modal="true">
                <div v-if="!isLoading">
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <div v-if="submitted && !product.name" class="text-red-500">Hãy nhập tên màu.</div>
                    </div>
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Chọn màu xe</label>
                        <ColorPicker v-model="product.hex" />
                    </div>
                </div>
                <div style="display: flex" v-else>
                    <ProgressSpinner style="align-items: center"></ProgressSpinner>
                </div>

                <template #footer>
                    <Button v-if="!isLoading" label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                    <Button v-if="!isLoading" label="Lưu" icon="pi pi-check" @click="saveProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteBrandDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4" v-if="!isLoading">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product"
                        >Bạn có chắc muốn xóa <b>{{ product.name }}</b
                        >?</span
                    >
                </div>
                <div style="display: flex" v-else>
                    <ProgressSpinner style="align-items: center"></ProgressSpinner>
                </div>
                <template #footer>
                    <Button v-if="!isLoading" label="Không" icon="pi pi-times" text @click="deleteBrandDialog = false" />
                    <Button v-if="!isLoading" label="Có" icon="pi pi-check" @click="deleteProduct(product)" />
                </template>
            </Dialog>
        </div>
    </div>
</template>
<style scoped>
.setting-container {
    margin-bottom: 24px;
}
</style>
