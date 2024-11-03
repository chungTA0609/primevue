<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axiosInstance from '../../service/axiosInstance';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
onMounted(() => {});
const dt = ref();
const models = ref();
const modelDialog = ref(false);
const deleteModelDialog = ref(false);
const isLoading = ref(false);
const product = ref({});
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

    if (product?.value.name?.trim()) {
        try {
            isLoading.value = true;

            // const res = await uploadImg(img.value);
            // product.value.logo = res.data.data ?? '';
            // product.value.logo = '';
            if (product.value.id) {
                await axiosInstance.put(`/origins/${product.value.id}`, product.value);
            } else {
                await axiosInstance.post(`/origins`, product.value);
            }
            modelDialog.value = false;
            product.value = {};
            isLoading.value = false;

            getAllOrigin();
        } catch (error) {
            console.log(error);
            isLoading.value = false;

            toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
        }
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    modelDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteModelDialog.value = true;
};
const deleteProduct = async (product) => {
    try {
        isLoading.value = true;

        await axiosInstance.delete(`/origins/${product.id}`);
        deleteModelDialog.value = false;
        isLoading.value = false;

        getAllOrigin();
    } catch (error) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });

        deleteModelDialog.value = false;
    }
};

onMounted(() => {
    getAllOrigin();
});
const getAllOrigin = async () => {
    try {
        const res = await axiosInstance.get('/origins');
        models.value = res.data.data;
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
                <DataTable ref="dt" selectionMode="single" :value="models" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý xuất xứ xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                        <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                    </template>

                    <Column field="name" :header="'Nơi xuất xứ'" style="min-width: 30rem"></Column>
                    <Column :exportable="false">
                        <template #body="slotProps">
                            <div style="float: right">
                                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="modelDialog" :style="{ width: '450px' }" :header="'Nơi xuất xứ'" :modal="true">
                <div v-if="!isLoading">
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <div v-if="submitted && !product.name" class="text-red-500">Hãy nhập tên mẫu xe.</div>
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

            <Dialog v-model:visible="deleteModelDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
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
                    <Button v-if="!isLoading" label="Không" icon="pi pi-times" text @click="deleteModelDialog = false" />
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
