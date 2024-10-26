<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/service/ProductService';
import axiosInstance from '../../service/axiosInstance';
onMounted(() => {
    productService.getProductss().then((data) => (products.value = data));
    console.log(products.value);
});
const productService = new ProductService();
const dt = ref();
const products = ref();
const models = ref();
const modelDialog = ref(false);
const deleteModelDialog = ref(false);
const product = ref({});
const img = ref(null);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

const openNew = () => {
    product.value = {};
    submitted.value = false;
    modelDialog.value = true;
};
const hideDialog = () => {
    modelDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    submitted.value = true;
    console.log(img.value);

    if (product?.value.name?.trim()) {
        try {
            // const res = await uploadImg(img.value);
            // product.value.logo = res.data.data ?? '';
            product.value.logo = '';
            if (product.value.id) {
                products.value[findIndexById(product.value.id)] = product.value;
                await axiosInstance.put(`/styles/${product.value.id}`, product.value);
            } else {
                products.value.push(product.value);
                await axiosInstance.post(`/styles`, product.value);
            }
            modelDialog.value = false;
            product.value = {};
            getAllStyle();
        } catch (error) {
            console.log(error);
        }
    }
};
const editProduct = (prod) => {
    console.log(prod);

    product.value = { ...prod };
    modelDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteModelDialog.value = true;
};
const deleteProduct = async (product) => {
    try {
        await axiosInstance.delete(`/styles/${product.id}`);
        deleteModelDialog.value = false;
        getAllStyle();
    } catch (error) {
        deleteModelDialog.value = false;
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
    getAllStyle();
});
const getAllStyle = async () => {
    try {
        const res = await axiosInstance.get('/styles');
        models.value = res.data.data;
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <div class="mt-3">
        <div class="setting-container">
            <div class="card">
                <DataTable ref="dt" selectionMode="single" :value="models" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý kiểu xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                        <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                    </template>

                    <Column field="name" :header="'Tên kiểu xe'" sortable style="min-width: 30rem"></Column>
                    <Column :exportable="false">
                        <template #body="slotProps">
                            <div style="float: right">
                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="modelDialog" :style="{ width: '450px' }" :header="'Thông tin kiểu xe'" :modal="true">
                <div>
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <small v-if="submitted && !product.name" class="text-red-500">Hãy nhập tên mẫu xe.</small>
                    </div>
                </div>

                <template #footer>
                    <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Lưu" icon="pi pi-check" @click="saveProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteModelDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product"
                        >Bạn có chắc muốn xóa <b>{{ product.name }}</b
                        >?</span
                    >
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteModelDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteProduct(product)" />
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
