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
const models = ref();
const brand = ref(null);
const brands = ref();
const fileArr = ref(null);
const modelDialog = ref(false);
const isLoading = ref(false);
const deleteModelDialog = ref(false);
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

            const res = await uploadImg(fileArr.value);

            product.value.logo = res.data.data ?? '';
            product.value.brandId = brand.value.id;
            if (product.value.id) {
                products.value[findIndexById(product.value.id)] = product.value;
                await axiosInstance.put(`/models/${product.value.id}`, product.value);
            } else {
                products.value.push(product.value);
                await axiosInstance.post(`/models`, product.value);
            }
            isLoading.value = false;

            modelDialog.value = false;
            product.value = {};
            getModelByBrand();
        } catch (error) {
            isLoading.value = true;
            console.log(error);
            toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
        }
    }
};

const uploadImg = async (element) => {
    try {
        const formData = new FormData();
        formData.append('file', element);

        return await axiosInstance.post('/files/upload', formData, {
            headers: {
                Accept: undefined
            }
        });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
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
        await axiosInstance.delete(`/models/${product.id}`);
        deleteModelDialog.value = false;
        getModelByBrand();
        isLoading.value = false;
    } catch (error) {
        isLoading.value = false;
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
    getAllBrand();
});
const getAllBrand = async () => {
    try {
        const res = await axiosInstance.get('/brands');
        brands.value = res.data.data;
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getModelByBrand = async () => {
    try {
        const res = await axiosInstance.get(`/models?brandId=${brand.value.id}`);
        models.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const onSelectFile = (event) => {
    fileArr.value = event.files[0];
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
                            <h4 class="m-0">Quản lý mẫu xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                        <Dropdown @change="getModelByBrand" v-model="brand" class="mr-2" :options="brands" optionLabel="name" placeholder="Tên xe" />
                        <Button :disabled="!brand" label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                    </template>

                    <Column field="name" :header="'Tên mẫu xe'" style="min-width: 30rem"></Column>
                    <Column :header="'Logo '">
                        <template #body="slotProps">
                            <img :src="slotProps.data.logo" :alt="slotProps.data.logo" class="rounded" style="width: 100px; height: 100px" />
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

            <Dialog v-model:visible="modelDialog" :style="{ width: '450px' }" :header="'Thông tin mẫu xe'" :modal="true">
                <div>
                    <div class="mt-3" v-if="!isLoading">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <div v-if="submitted && !product.name" class="text-red-500">Hãy nhập tên mẫu xe.</div>
                    </div>
                    <div class="mt-3" v-if="!isLoading">
                        <label for="inventoryStatus" class="block font-bold mb-3">Logo </label>
                        <img v-if="product.logo" :src="product.logo" :alt="product.image" class="block m-auto pb-4" style="width: 100px; height: 100px" />
                        <FileUpload ref="fileupload" name="demo[]" @select="onSelectFile" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload />
                    </div>
                    <div style="display: flex" v-else>
                        <ProgressSpinner style="align-items: center"></ProgressSpinner>
                    </div>
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
