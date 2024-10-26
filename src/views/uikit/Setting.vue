<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import axiosInstance from '../../service/axiosInstance';
import axios from 'axios';
onMounted(() => {
    productService.getProductss().then((data) => (products.value = data));
    console.log(products.value);
});
const productService = new ProductService();
const toast = useToast();
const dt = ref();
const products = ref();
const brands = ref();
const shapes = ref();
const origins = ref();
const brandDialog = ref(false);
const shapeDialog = ref(false);
const originDialog = ref(false);
const deleteBrandDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const img = ref(null);
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);

const openNew = () => {
    product.value = {};
    submitted.value = false;
    brandDialog.value = true;
};
const openNewShape = () => {
    product.value = {};
    submitted.value = false;
    shapeDialog.value = true;
};
const openNewOrigin = () => {
    product.value = {};
    submitted.value = false;
    originDialog.value = true;
};
const hideDialog = () => {
    brandDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    submitted.value = true;
    console.log(img.value);

    if (product?.value.name?.trim()) {
        try {
            const res = await uploadImg(img.value);
            product.value.logo = res.data.data;
            if (product.value.id) {
                products.value[findIndexById(product.value.id)] = product.value;
                axiosInstance.put(`/brands/${product.value.id}`, product.value);
            } else {
                product.value.id = createId();
                products.value.push(product.value);
                axiosInstance.post(`/brands`, product.value);
            }
            brandDialog.value = false;
            product.value = {};
            getAllBrand();
        } catch (error) {
            console.log(error);
        }
    }
};
const editProduct = (prod) => {
    console.log(prod);

    product.value = { ...prod };
    brandDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteBrandDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteBrandDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

const uploadImg = async (element) => {
    try {
        const formData = new FormData();
        formData.append('file', element);
        console.log(element);

        return await axios.post('https://33b9-171-241-32-111.ngrok-free.app/api/files/upload', formData, {
            headers: {
                Accept: undefined
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const createId = () => {
    return Math.floor(Math.random() * (1000000000000 - 1)) + 1;
};
const onSelectFile = (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    const formData = new FormData();

    console.log(event.files);
    img.value = file;
    reader.onload = async (e) => {
        // img.value = await e.target.result;
        // console.log(img.value);
    };

    const readed = reader.readAsDataURL(file);
    console.log(readed);
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

onMounted(() => {
    getAllBrand();
    getAllShape();
    getAllOrigin();
});
const getAllBrand = async () => {
    try {
        const res = await axiosInstance.get('/brands');
        brands.value = res.data.data;
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};
const getAllShape = async () => {
    try {
        const res = await axiosInstance.get('/styles');
        brands.value = res.data.data;
        console.log(products.value);
    } catch (error) {
        console.log(error);
    }
};
const getAllOrigin = async () => {
    try {
        const res = await axiosInstance.get('/origins');
        origins.value = res.data.data;
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <div class="mt-3">
        <div class="setting-container">
            <div class="card">
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="Thêm mới" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" selectionMode="single" :value="brands" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý Hãng</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <Column field="name" :header="'Tên hãng'" sortable style="min-width: 30rem"></Column>
                    <Column :header="'Logo '">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image" :alt="slotProps.data.logo" class="rounded" style="min-width: 10rem" />
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

            <Dialog v-model:visible="brandDialog" :style="{ width: '450px' }" :header="'Thông tin hãng'" :modal="true">
                <div>
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <small v-if="submitted && !product.name" class="text-red-500">Hãy nhập mã hãng.</small>
                    </div>
                    <div class="mt-3">
                        <label for="inventoryStatus" class="block font-bold mb-3">Logo </label>
                        <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />
                        <FileUpload ref="fileupload" name="demo[]" @select="onSelectFile" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload />
                    </div>
                </div>

                <template #footer>
                    <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Lưu" icon="pi pi-check" @click="saveProduct()" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteBrandDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product"
                        >Bạn có chắc muốn xóa <b>{{ product.name }}</b
                        >?</span
                    >
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteBrandDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product">Bạn muốn xóa tất cả hãng đã chọn?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Có" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>
        </div>
        <div class="setting-container">
            <div class="card">
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="Thêm mới" icon="pi pi-plus" class="mr-2" @click="openNewShape" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" selectionMode="single" :value="shapes" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý Kiểu xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <Column field="name" :header="'Tên kiểu xe'" sortable style="min-width: 30rem"></Column>
                    <Column :header="'Logo '">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image" :alt="slotProps.data.image" class="rounded" style="min-width: 10rem" />
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

            <Dialog v-model:visible="shapeDialog" :style="{ width: '450px' }" :header="'Thông tin kiểu xe'" :modal="true">
                <div>
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <small v-if="submitted && !product.name" class="text-red-500">Hãy nhập tên kiểu.</small>
                    </div>
                    <div class="mt-3">
                        <label for="inventoryStatus" class="block font-bold mb-3">Logo </label>
                        <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />
                        <FileUpload ref="fileupload" name="demo[]" @select="onSelectFile" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload />
                    </div>
                </div>

                <template #footer>
                    <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Lưu" icon="pi pi-check" @click="saveProduct()" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product"
                        >Bạn có chắc muốn xóa <b>{{ product.name }}</b
                        >?</span
                    >
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteProductDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product">Bạn muốn xóa tất cả hãng đã chọn?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Có" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>
        </div>
        <div class="setting-container">
            <div class="card">
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="Thêm mới" icon="pi pi-plus" class="mr-2" @click="openNewOrigin" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" selectionMode="single" :value="origins" dataKey="id" :rows="10" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between" style="justify-content: space-between">
                            <h4 class="m-0">Quản lý Xuất xứ xe</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText style="float: right" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <Column field="name" :header="'Tên nơi xuất xứ'" sortable style="min-width: 30rem"></Column>
                    <Column :header="'Logo '">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image" :alt="slotProps.data.logo" class="rounded" style="min-width: 10rem" />
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

            <Dialog v-model:visible="originDialog" :style="{ width: '450px' }" :header="'Thông tin kiểu xuất xứ'" :modal="true">
                <div>
                    <div class="mt-3">
                        <label for="name" class="block font-bold mb-2">Tên</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                        <small v-if="submitted && !product.name" class="text-red-500">Hãy nhập mã hãng.</small>
                    </div>
                </div>

                <template #footer>
                    <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Lưu" icon="pi pi-check" @click="saveProduct()" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product"
                        >Bạn có chắc muốn xóa <b>{{ product.name }}</b
                        >?</span
                    >
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteProductDialog = false" />
                    <Button label="Có" icon="pi pi-check" @click="deleteProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
                <div class="flex items-center gap-4">
                    <i class="pi pi-exclamation-triangle !text-3xl" />
                    <span v-if="product">Bạn muốn xóa tất cả hãng đã chọn?</span>
                </div>
                <template #footer>
                    <Button label="Không" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button label="Có" icon="pi pi-check" text @click="deleteSelectedProducts" />
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
