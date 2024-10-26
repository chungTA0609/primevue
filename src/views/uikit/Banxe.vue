<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const confirmPopup = useConfirm();
const toast = useToast();

const autoValue = ref(null);
const router = useRouter();
const dropdownValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const brand = ref(dropdownValues.value[0]);
const name = ref(dropdownValues.value[0]);
const date = ref(dropdownValues.value[0]);
const version = ref(null);
const shape = ref(dropdownValues.value[0]);
const origin = ref(dropdownValues.value[0]);
const kmUsed = ref(null);
const statusCar = ref(dropdownValues.value[0]);
const gear = ref(dropdownValues.value[0]);
const fuelType = ref(dropdownValues.value[0]);
const treeSelectNodes = ref(null);
const price = ref(null);
const interior = ref(null);
const exterior = ref(null);
const places = ref(null);
const driveSystem = ref(null);
// const op = ref(null);
const pagination = ref(1);
const dateExpired = ref(null);

const countryService = new CountryService();
const nodeService = new NodeService();
const listSellCar = reactive([]);
const fileArr = reactive([]);
onMounted(() => {
    countryService.getCountries().then((data) => (autoValue.value = data));
    nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
    if (listSellCar.length <= 0) router.push('/ban-xe/dang-tin');
});
const enableButton = computed(() => {
    return !!brand.value && !!name.value && !!date.value && !!shape.value && !!origin.value && !!statusCar.value && !!price.value;
});

const confirm = (event) => {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            dateExpired.value = null;
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
watch(pagination, (val) => {
    console.log(val);

    // queryParams.page = val / 10 + 1;

    // queryCar();
});
</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-12" v-if="listSellCar.length === 0">
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
                                    <Dropdown :invalid="!brand" v-model="brand" :options="dropdownValues" optionLabel="name" placeholder="Hãng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Tên xe <b style="color: red">*</b></h5>
                                    <Dropdown v-model="name" :options="dropdownValues" optionLabel="name" placeholder="Tên xe" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Năm sản xuất <b style="color: red">*</b></h5>
                                    <Dropdown v-model="date" :options="dropdownValues" optionLabel="name" placeholder="Năm" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Phiên bản</h5>
                                    <InputText v-model="version" placeholder="Phiên bản" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Kiểu dáng <b style="color: red">*</b></h5>
                                    <Dropdown v-model="shape" :options="dropdownValues" optionLabel="name" placeholder="Kiểu dáng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Xuất xứ <b style="color: red">*</b></h5>
                                    <Dropdown v-model="origin" :options="dropdownValues" optionLabel="name" placeholder="Xuất xứ" />
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
                                    <Dropdown v-model="gear" :options="dropdownValues" optionLabel="name" placeholder="Hộp số" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Nhiên liệu</h5>
                                    <Dropdown v-model="fuelType" :options="dropdownValues" optionLabel="name" placeholder="Loại nhiên liệu" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="card mt-4">
                            <h5>Thông số kĩ thuật của xe</h5>

                            <div class="grid formgrid mt-4">
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Giá <b style="color: red">*</b></h5>
                                    <InputNumber class="price" v-model="price" inputId="currency-us" mode="currency" currency="VND" locale="en-US" fluid placeholder="đồng" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Ngoại thất</h5>
                                    <Dropdown v-model="exterior" :options="dropdownValues" optionLabel="name" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Nội thất</h5>
                                    <Dropdown v-model="interior" :options="dropdownValues" optionLabel="name" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Số chỗ ngồi</h5>
                                    <InputNumber v-model="places" inputId="integeronly" fluid placeholder="Nhập số chỗ ngồi" />
                                </div>
                                <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2">
                                    <h5>Dẫn động</h5>
                                    <Dropdown v-model="driveSystem" :options="dropdownValues" optionLabel="name" />
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
                            <FileUpload v-model="fileArr" name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />
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
                                    <InputText placeholder="Địa chỉ chi tiết" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 flex" style="justify-content: end">
                        <Button label="Đăng tin" style="width: 120px" :disabled="!enableButton"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 md:col-12" v-else>
            <div class="card">
                <div class="header-card">
                    <h5>Danh sách xe bán của bạn</h5>
                    <div class="right-part flex">
                        <p style="float: right; padding-top: 12px; margin-right: 12px">Tổng: 12345</p>
                        <Button style="width: 120px" label="Đăng tin bán" @click="router.push('/ban-xe/dang-tin')"></Button>
                    </div>
                </div>
                <hr />

                <Paginator v-model:first="pagination" :rows="10" :totalRecords="120"></Paginator>
                <div class="col-12 car-comp">
                    <CarInfoComp>
                        <div class="flex flex-wrap gap-2 mt-1" style="float: right">
                            <div>
                                <ConfirmPopup
                                    ><template #message="slotProps">
                                        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                                            <p>Chọn ngày tin hết hạn</p>
                                            <Calendar v-model="dateExpired" />
                                        </div> </template
                                ></ConfirmPopup>
                                <Button ref="popup" @click="confirm($event)" label="Đặt ngày hết hạn" class="mr-2"></Button>
                            </div></div
                    ></CarInfoComp>
                </div>
                <div class="col-12 car-comp">
                    <CarInfoComp
                        ><div class="flex flex-wrap gap-2 mt-1" style="float: right">
                            <div>
                                <ConfirmPopup
                                    ><template #message="slotProps">
                                        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                                            <p>Chọn ngày tin hết hạn</p>
                                            <Calendar v-model="dateExpired" />
                                        </div> </template
                                ></ConfirmPopup>
                                <Button ref="popup" @click="confirm($event)" label="Đặt ngày hết hạn" class="mr-2"></Button>
                            </div></div
                    ></CarInfoComp>
                </div>
                <div class="col-12 car-comp">
                    <CarInfoComp
                        ><div class="flex flex-wrap gap-2 mt-1" style="float: right">
                            <div>
                                <ConfirmPopup
                                    ><template #message="slotProps">
                                        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                                            <p>Chọn ngày tin hết hạn</p>
                                            <Calendar v-model="dateExpired" />
                                        </div> </template
                                ></ConfirmPopup>
                                <Button ref="popup" @click="confirm($event)" label="Đặt ngày hết hạn" class="mr-2"></Button>
                            </div></div
                    ></CarInfoComp>
                </div>
                <div class="col-12 car-comp">
                    <CarInfoComp
                        ><div class="flex flex-wrap gap-2 mt-1" style="float: right">
                            <div>
                                <ConfirmPopup
                                    ><template #message="slotProps">
                                        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                                            <p>Chọn ngày tin hết hạn</p>
                                            <Calendar v-model="dateExpired" />
                                        </div> </template
                                ></ConfirmPopup>
                                <Button ref="popup" @click="confirm($event)" label="Đặt ngày hết hạn" class="mr-2"></Button>
                            </div></div
                    ></CarInfoComp>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h5 {
    margin-bottom: 5px;
}

.header-card {
    display: flex;
    justify-content: space-between;
}
</style>
