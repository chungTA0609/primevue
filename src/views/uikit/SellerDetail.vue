<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../../service/axiosInstance';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
const vipPopup = useConfirm();
// const expiredPopup = useConfirm();
const toast = useToast();
// const toast2 = useToast();

const dropdownItem = ref(0);
const gearItem = ref(0);
const province = ref(0);
const selectedNode = ref(0);
const firstPrice = ref(0);
const lastPrice = ref(0);

const queryCar = () => {
    axiosInstance.post('/cars/query', {
        // ...queryParams,
        brandId: selectedNode.value,
        originId: dropdownItem.value,
        cityId: province.value,
        styleId: gearItem.value,
        fuelId: selectedNode.value,
        minPrice: firstPrice.value,
        maxPrice: lastPrice.value,
        page: 1,
        pageSize: 100,
        sortItems: [
            {
                field: 'brandId',
                desc: true
            }
        ]
    });
};
// const paramChange = computed(() => {
//     queryCar();
//     return !dropdownItem.value || gearItem.value || province.value || selectedNode.value || firstPrice.value || lastPrice.value;
// });
onMounted(() => {
    queryCar();
});

const confirm1 = (event) => {
    vipPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Lỗi', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <div class="header-contain">
                    <h5>Thông tin người dùng</h5>
                    <div style="width: 280px; display: flex">
                        <h5 style="margin-right: 12px; margin-top: 5px">Đặt tài khoản thành VIP</h5>
                        <div class="btn-pop">
                            <ConfirmPopup
                                ><template #message="slotProps">
                                    <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                                        <p>Đặt thành viên này thành VIP</p>
                                    </div>
                                </template></ConfirmPopup
                            >
                            <Button id="vip" ref="popup" @click="confirm1($event)" label="VIP" class="mr-2"></Button>
                        </div>
                    </div>
                </div>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-4" style="display: flex">
                        <p class="mr-1" style="font-size: 1000">Tên:</p>
                        <p><b>Nguyễn Minh Phường </b></p>
                    </div>
                    <div class="field col-12 md:col-4 flex">
                        <p class="mr-1" style="font-size: 1000">Số điện thoại:</p>
                        <p><b>0123456789</b></p>
                    </div>
                    <div class="field col-12 md:col-4 flex">
                        <p class="mr-1" style="font-size: 1000">Địa chỉ:</p>
                        <p><b>Thanh Xuyên, Hoàng Long, Phú Xuyên, Hà Nội</b></p>
                    </div>
                    <div class="field col-12 md:col-4 flex">
                        <p class="mr-1" style="font-size: 1000">Membership:</p>
                        <p><b>Không</b></p>
                    </div>
                    <div class="field col-12 md:col-4 flex">
                        <p class="mr-1" style="font-size: 1000">Email:</p>
                        <p><b>Chung@gmail.com</b></p>
                    </div>
                    <div class="field col-12 md:col-4 flex">
                        <p class="mr-1" style="font-size: 1000">Khu vực:</p>
                        <p><b>Hà Nội</b></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="flex" style="justify-content: space-between">
                    <h5>Danh sách xe đang bán</h5>
                    <div class="right-part" style="float: right"><h9>Tổng: 12345</h9></div>
                </div>
                <hr />
                <Paginator :rows="10" :totalRecords="120"></Paginator>
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
.header-contain {
    display: flex;
    justify-content: space-between;
}
</style>
