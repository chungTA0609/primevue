<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
// import axios from 'axios';
import axiosInstance from '../../service/axiosInstance';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();

const autoValue = ref(null);
const dropdownValues = ref([
    { name: 'Xe cũ', code: 'OLD' },
    { name: 'Xe mới', code: 'NEW' }
]);
const gearValues = ref([
    { name: 'Số sàn', code: 'OLD' },
    { name: 'Số tự động', code: 'NEW' }
]);
const brand = ref(dropdownValues.value[0]);
const name = ref();
const date = ref();
const version = ref(null);
const shape = ref();
const origin = ref();
const kmUsed = ref(null);
const statusCar = ref();
const gear = ref();
const fuelType = ref();
const treeSelectNodes = ref(null);
const price = ref(null);
const interior = ref(null);
const exterior = ref(null);
const places = ref(null);
const driveSystem = ref(null);
const countryService = new CountryService();
const nodeService = new NodeService();
const fileupload = ref();
const province = ref();
const district = ref();
const address = ref();
const ward = ref();
const description = ref();
const fileArr = reactive([]);
const isLoading = ref(false);
const brandList = ref([]);
const models = ref([]);
const fuelList = ref([]);
const originList = ref([]);
const styleList = ref([]);
const colorList = ref([]);
const imgList = ref([]);
const provinces = ref([
    { name: 'Toàn quốc', code: 'all' },
    { name: 'Hà Nội', code: 'HNI' },
    { name: 'TP. Hồ Chí Minh', code: 'HCM' }
]);
const transmissionList = ref([
    {
        code: 'FWD',
        name: 'FWD - Dẫn động cầu trước'
    },
    {
        code: 'RWD',
        name: 'RWD - Dẫn động cầu sau'
    },
    {
        code: '4WD',
        name: '4WD - Dẫn động 4 bánh'
    },
    {
        code: 'AWD',
        name: 'AWD - 4 bánh toàn thời gian'
    }
]);
const districts = ref([]);
const wards = ref([]);
const getAllBrand = async () => {
    try {
        const res = await axiosInstance.get('/brands');
        brandList.value = res.data.data.map((element) => {
            return element;
        });
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllFuel = async () => {
    try {
        const res = await axiosInstance.get('/fuels');
        fuelList.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllCities = async () => {
    try {
        const res = await axiosInstance.get('/address/cities');
        provinces.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllOrigin = async () => {
    try {
        const res = await axiosInstance.get('/origins');
        originList.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllStyle = async () => {
    try {
        const res = await axiosInstance.get('/styles');
        styleList.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllColor = async () => {
    try {
        const res = await axiosInstance.get('/colors');
        colorList.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};

const getDistrictByCity = async (cityCode) => {
    try {
        const res = await axiosInstance.get(`/address/districts?cityCode=${cityCode.code}`);
        districts.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getWardByDistrict = async (districtCode) => {
    try {
        const res = await axiosInstance.get(`/address/wards?districtCode=${districtCode.code}`);
        wards.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const getAllModel = async () => {
    try {
        const res = await axiosInstance.get(`/models?brandId=${52}`);
        models.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const cityChange = () => {
    getDistrictByCity(province.value);
};
const districtChange = () => {
    getWardByDistrict(district.value);
};
onMounted(() => {
    getAllBrand();
    getAllCities();
    getAllStyle();
    getAllOrigin();
    getAllFuel();
    getAllColor();
    getAllModel();
    countryService.getCountries().then((data) => (autoValue.value = data));
    nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});
const enableButton = computed(() => {
    return !!brand.value && !!name.value && !!date.value && !!shape.value && !!origin.value && !!statusCar.value && !!price.value;
});

const showConfirm = () => {
    confirm.require({
        group: 'templating',
        header: 'Confirmation',
        message: 'Please confirm to proceed moving forward.',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectClass: 'p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Cancel',
        acceptLabel: 'Save',
        accept: () => {
            isLoading.value = true;
            Submit();
        },
        reject: () => {}
    });
};
const Submit = async () => {
    try {
        await upLoadProcess();
        pushCar();
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
        isLoading.value = false;
    }
};
const onUpload = async (event) => {
    fileArr.value = event.files;
    imgList.value = [];
};

const upLoadProcess = async () => {
    for (const element of fileArr.value) {
        await uploadImg(element);
    }
};
const pushCar = async () => {
    try {
        const res = await axiosInstance.post('/cars', {
            // ...carParam,
            name: name.value.name,
            description: description.value,
            manufacturingYear: parseInt(date.value),
            seatCapacity: parseInt(places.value),
            status: statusCar.value.code,
            transmission: driveSystem.value.code,
            drivetrain: gear.value.code,
            images: imgList.value,
            slug: (name.value.name + ' ' + version.value + ' ' + Date.now()).split(' ').join('-').toLowerCase(),
            version: version.value,
            kmDriven: parseInt(kmUsed.value),
            price: parseInt(price.value) * 1000000,
            logo: imgList.value[0],
            brandId: brand.value.id,
            modelId: name.value.id,
            styleId: shape.value.id,
            originId: origin.value.id,
            fuelId: fuelType.value.id,
            outsideColorId: exterior.value.id,
            insideColorId: interior.value.id,
            cityId: province.value.id,
            districtId: district.value.id,
            wardId: ward.value.id,
            address: [address.value, ward.value.name, district.value.name, province.value.name].join(', ')
        });
        isLoading.value = false;
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Đăng tin thành công', life: 3000 });

        router.push('/mua-xe');
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });

        console.log(error);
    }
};
const uploadImg = async (element) => {
    try {
        const formData = new FormData();
        formData.append('file', element);
        const res = await axiosInstance.post('/files/upload', formData, {
            headers: {
                Accept: undefined
            }
        });
        imgList.value.push(res.data.data);
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
</script>
<template>
    <Toast />

    <ConfirmDialog group="templating">
        <template #message="slotProps">
            <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border" v-if="!isLoading">
                <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
                <p>{{ slotProps.message.message }}</p>
            </div>
            <ProgressSpinner v-else />
        </template>
    </ConfirmDialog>
    <div class="grid p-fluid">
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>Đăng tin bán xe</h5>
                <Panel header="Làm thế nào để tin đăng bán xe đạt hiệu quả cao nhất?" :toggleable="true">
                    <p class="line-height-3 m-0">- Để tin đăng bán xe của bạn đạt hiệu quả cao nhất, được người mua quan tâm nhất thì thông tin mô tả về chiếc xe của bạn càng chi tiết càng tốt và đặc biệt nên có ảnh thật về xe của bạn.</p>
                    <p class="line-height-3 m-0">- Theo thống kê của bonbanh với các tin đăng bán xe có ảnh thật, người mua xe quan tâm hơn rất nhiều so với xe không có ảnh.</p>
                    <p class="line-height-3 m-0">- Hơn nữa, trong kết quả tìm kiếm xe, bonbanh sẽ ưu tiên thứ tự cho những tin có ảnh thật và đầy đủ thông tin hơn những tin không có ảnh và ít thông tin về xe.</p>
                    <p class="line-height-3 m-0">- Vì vậy, bạn không nên vội vàng đăng tin khi thông tin về chiếc xe của bạn chưa đầy đủ.</p>
                </Panel>
                <p class="line-height-3 m-0 mt-4 red">Chú ý: Tin đăng của bạn sẽ không được duyệt (ko được đăng) nếu :</p>
                <p class="line-height-3 m-0 mt-1 red">- Nội dung tin đăng không đúng, tin đăng có dạng quảng cáo, spam</p>
                <p class="line-height-3 m-0 mt-1 red">- Trong phần mô tả để thông tin liên hệ (số ĐT hay email). (Thông tin liên hệ sẽ được lấy trong phần thông tin cá nhân tương ứng với tài khoản của bạn).</p>
                <p class="line-height-3 m-0 mt-1 red"><b>Bạn vui lòng nhập đúng thông tin và đúng quy định để tin đăng được kiểm duyệt nhanh, xin cảm ơn ! </b></p>

                <div class="grid p-fluid">
                    <div class="col-12 md:col-6">
                        <div class="card mt-4">
                            <h5>Thông số kĩ thuật của xe</h5>

                            <div class="grid formgrid mt-4">
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Hãng sản xuất <b style="color: red">*</b></h5>
                                    <Dropdown :invalid="!brand" v-model="brand" :options="brandList" optionLabel="name" placeholder="Hãng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Tên xe <b style="color: red">*</b></h5>
                                    <Dropdown v-model="name" :options="models" optionLabel="name" placeholder="Tên xe" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Năm sản xuất <b style="color: red">*</b></h5>
                                    <InputText v-model="date" :options="dropdownValues" optionLabel="name" placeholder="Năm" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Phiên bản</h5>
                                    <InputText v-model="version" placeholder="Phiên bản" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Kiểu dáng <b style="color: red">*</b></h5>
                                    <Dropdown v-model="shape" :options="styleList" optionLabel="name" placeholder="Kiểu dáng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Xuất xứ <b style="color: red">*</b></h5>
                                    <Dropdown v-model="origin" :options="originList" optionLabel="name" placeholder="Xuất xứ" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Tình trạng <b style="color: red">*</b></h5>
                                    <Dropdown v-model="statusCar" :options="dropdownValues" optionLabel="name" placeholder="Tình trạng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Số km đã đi</h5>
                                    <InputText v-model="kmUsed" placeholder="Số km" />
                                </div>
                                <div class="col-12 mb-4 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Hộp số</h5>
                                    <Dropdown v-model="gear" :options="gearValues" optionLabel="name" placeholder="Hộp số" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Nhiên liệu</h5>
                                    <Dropdown v-model="fuelType" :options="fuelList" optionLabel="name" placeholder="Loại nhiên liệu" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="card mt-4">
                            <h5>Giá bán và thông tin bổ sung</h5>

                            <div class="grid formgrid mt-4">
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Giá <b style="color: red">*</b></h5>
                                    <InputNumber class="price" v-model="price" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid placeholder="Triệu đồng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Ngoại thất</h5>
                                    <Dropdown v-model="exterior" :options="colorList" optionLabel="name" placeholder="Màu ngoại thất" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Nội thất</h5>
                                    <Dropdown v-model="interior" :options="colorList" optionLabel="name" placeholder="Màu nội thất" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Số chỗ ngồi</h5>
                                    <InputNumber v-model="places" inputId="integeronly" fluid placeholder="Nhập số chỗ ngồi" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Dẫn động</h5>
                                    <Dropdown v-model="driveSystem" :options="transmissionList" optionLabel="name" placeholder="Hệ dẫn động" />
                                </div>
                            </div>
                        </div>
                        <div class="card mt-4">
                            <h5>Thông tin mô tả</h5>

                            <div class="grid formgrid mt-3">
                                <div class="field col-12">
                                    <Textarea
                                        id="address"
                                        rows="8"
                                        v-model="description"
                                        placeholder="Hãy nhập thông tin mô tả tóm tắt xe của bạn
Lưu ý:
	- Nhập tiếng việt có dấu
	- Không nhập thông tin liên hệ (số điện thoại,email) tại đây.
	- Không để giá xe ở đây
	- Không đăng quảng cáo tại đây"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 md:col-12">
                        <div class="card mt-4">
                            <h5>Đăng ảnh cho xe (ít nhất 5 ảnh tương ứng 5 góc chụp khác nhau nếu có)</h5>
                            <FileUpload v-model="fileArr" ref="fileupload" name="demo[]" @select="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />
                        </div>
                    </div>
                    <div class="col-12 md:col-12">
                        <div class="card mt-4">
                            <h5>Thông tin liên hệ (Bạn có thể thay đổi thông tin liên hệ khác nhau cho từng tin bán xe )</h5>
                            <div class="form-contact" style="display: flex">
                                <div class="col-12 mb-2 lg:col-4 lg:mb-2 mt-2">
                                    <h5>Tên:</h5>
                                    <InputText placeholder="Tên" />
                                </div>
                                <div class="col-12 mb-2 lg:col-4 lg:mb-2 mt-2">
                                    <h5>Liên hệ:</h5>
                                    <InputText placeholder="SĐT" />
                                </div>
                                <div class="col-12 mb-2 lg:col-4 lg:mb-2 mt-2">
                                    <h5>Liên hệ khác:</h5>
                                    <InputText placeholder="SĐT khác" />
                                </div>
                            </div>
                            <div class="form-contact" style="display: flex">
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Địa chỉ:</h5>
                                    <div style="display: flex">
                                        <div class="col-12 lg:col-4 lg:mb-2 mt-2" style="padding-left: 0; margin-right: 1rem">
                                            <h5>Thành phố</h5>
                                            <Dropdown v-model="province" @change="cityChange" :options="provinces" optionLabel="name" placeholder="Tỉnh/Thành phố" />
                                        </div>
                                        <div class="col-12 lg:col-4 lg:mb-2 mt-2">
                                            <h5>Quận/Huyện</h5>
                                            <Dropdown v-model="district" @change="districtChange" :options="districts" optionLabel="name" placeholder="Quận/Huyện" :disabled="!province" />
                                        </div>
                                        <div class="col-12 lg:col-4 lg:mb-2 mt-2">
                                            <h5>Phường/Xã</h5>
                                            <Dropdown v-model="ward" :options="wards" optionLabel="name" :disabled="!district" placeholder="Phường/Xã" />
                                        </div>
                                    </div>
                                    <InputText placeholder="Địa chỉ chi tiết" v-model="address" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 flex" style="justify-content: end">
                        <Button label="Đăng tin" @click="showConfirm" style="width: 120px" :disabled="!enableButton"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h5 {
    margin-bottom: 5px;
}
</style>
