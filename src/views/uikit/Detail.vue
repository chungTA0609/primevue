f
<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '../../service/axiosInstance';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute();
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
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const dataDetail = ref();
const getDataBySlug = async () => {
    try {
        const res = await axiosInstance.get(`/cars/${route.params.id}`);
        dataDetail.value = res.data.data;
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
onMounted(() => {
    getDataBySlug();
});

const tranmissionName = computed(() => {
    return transmissionList.value.find((el) => {
        return dataDetail.value.drivetrain ? dataDetail.value.drivetrain.includes(el.code) : '';
    })?.name;
});
</script>
<template>
    <Toast />

    <div class="grid p-fluid">
        <div class="col-12 md:col-12" style="min-width: 1200px">
            <div class="card" v-if="dataDetail">
                <h5>
                    {{ dataDetail.name }}
                    {{ dataDetail.price ? ' / ' + dataDetail.price.toLocaleString('en-US') + 'đ (' + dataDetail.priceText + ' đồng)' : '' }}
                </h5>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="card mt-4" style="height: 470px">
                            <h5>Thông số kĩ thuật của xe</h5>
                            <div style="display: flex">
                                <div class="col-12 md:col-6">
                                    <div class="grid formgrid">
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Năm sản xuất: </b></p>
                                            <p>{{ dataDetail.manufacturingYear }}</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Tình trạng: </b></p>
                                            <p>
                                                {{ dataDetail.status === 'OLD' ? 'Xe đã dùng' : 'Xe mới' }}
                                            </p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b>Số km đã đi: </b></p>
                                            <p>{{ dataDetail.kmDriven }} km</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Xuất xứ: </b></p>
                                            <p>{{ dataDetail.origin.name }}</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Kiểu dáng: </b></p>
                                            <p>{{ dataDetail.style.name }}</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Hộp số: </b></p>
                                            <p>{{ dataDetail.transmission }}</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 md:col-6">
                                    <div class="grid formgrid">
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Động cơ: </b></p>
                                            <p>2.7L</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Màu ngoại thất: </b></p>
                                            <p>{{ dataDetail.outsideColor.name }}</p>
                                            <hr />
                                        </div>

                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Màu nội thất: </b></p>
                                            <p>{{ dataDetail.insideColor.name }}</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b>Số chỗ ngồi: </b></p>
                                            <p>7 chỗ</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Số cửa: </b></p>
                                            <p>2012 cửa</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Dẫn động: </b></p>
                                            <p>{{ tranmissionName }}</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 md:col-4">
                        <div class="card mt-4" style="height: 470px">
                            <Galleria
                                :nextButton="false"
                                :prevButton="false"
                                :value="dataDetail.images"
                                :responsiveOptions="galleriaResponsiveOptions"
                                :numVisible="3"
                                :circular="true"
                                containerStyle="max-width: 800px; max-height: 820px; margin: auto"
                            >
                                <template #item="slotProps">
                                    <img :src="slotProps.item" :alt="slotProps.item.alt" style="width: 350px; height: 350px; display: block" />
                                </template>
                                <template #thumbnail="slotProps">
                                    <img :src="slotProps.item" :alt="slotProps.item.alt" style="width: 40px; height: 40px; display: block" />
                                </template>
                            </Galleria>
                        </div>
                    </div>
                </div>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="card" style="max-height: 455px">
                            <h5>Thông tin mô tả</h5>
                            <p>{{ dataDetail.description }}</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="card" style="max-height: 180px">
                            <h5>Thông tin liên hệ</h5>
                            <p>
                                <b> Tên: {{ dataDetail.username }} </b>
                            </p>
                            <p>
                                Điện thoại: <b>{{ dataDetail.userPhoneNum }}</b>
                            </p>
                            <p>Địa chỉ: {{ dataDetail.address }}</p>
                        </div>
                        <!-- <div class="card" style="max-height: 270px">
                            <h5>Từ khóa phổ biến</h5>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                        </div> -->
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
