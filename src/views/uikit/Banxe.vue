<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const confirmPopup = useConfirm();
const toast = useToast();

const router = useRouter();

// const op = ref(null);
const pagination = ref(1);
const dateExpired = ref(null);

const listSellCar = reactive([]);
onMounted(() => {
    if (listSellCar.length <= 0) router.push('/ban-xe/dang-tin');
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
            toast.add({ severity: 'info', summary: 'Lỗi', detail: 'You have rejected', life: 3000 });
        }
    });
};
watch(pagination, () => {
    // queryParams.page = val / 10 + 1;
    // queryCar();
});
</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-12">
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
