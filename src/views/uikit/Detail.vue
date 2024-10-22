f
<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, onMounted } from 'vue';
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
import { PhotoService } from '@/service/PhotoService';
const autoValue = ref(null);
const images = ref([]);
const treeSelectNodes = ref(null);
const countryService = new CountryService();
const nodeService = new NodeService();
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
const photoService = new PhotoService();

onMounted(() => {
    countryService.getCountries().then((data) => (autoValue.value = data));
    nodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
    photoService.getImages().then((data) => (images.value = data));
});
</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-12">
            <div class="card">
                <h5>Xe Ford Focus S 2.0 AT 2013</h5>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="card mt-4" style="height: 470px">
                            <h5>Thông số kĩ thuật của xe</h5>
                            <div style="display: flex">
                                <div class="col-12 md:col-6">
                                    <div class="grid formgrid">
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Năm sản xuất: </b></p>
                                            <p>2012</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Tình trạng: </b></p>
                                            <p>Xe đã dùng</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b>Số km đã đi: </b></p>
                                            <p>200 km</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Xuất xứ: </b></p>
                                            <p>2012</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Kiểu dáng: </b></p>
                                            <p>SUV</p>
                                            <hr />
                                        </div>
                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Hộp số: </b></p>
                                            <p>Tự động</p>
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
                                            <p>Đen</p>
                                            <hr />
                                        </div>

                                        <div class="col-12 mb-2 lg:col-12 lg:mb-2 mt-2 p-fluid" style="display: flex; font-size: 1.5rem">
                                            <p style="margin-right: 12px"><b> Màu nội thất: </b></p>
                                            <p>Hồng</p>
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
                                            <p>AWD - 4 bánh toàn thời gian</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 md:col-4">
                        <div class="card mt-4" style="height: 470px">
                            <Galleria :value="images" :responsiveOptions="galleriaResponsiveOptions" :numVisible="3" :circular="true" containerStyle="max-width: 800px; max-height: 820px; margin: auto">
                                <template #item="slotProps">
                                    <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                                </template>
                                <template #thumbnail="slotProps">
                                    <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                                </template>
                            </Galleria>
                        </div>
                    </div>
                </div>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="card" style="max-height: 455px">
                            <h5>Thông tin mô tả</h5>
                            <p>Xe đã hoàn tất làm đẹp Maru-Kuri độc quyền tại Toyota Hiroshima</p>
                            <p>- Loại xe : Toyota Fortuner Xăng</p>
                            <p>- Hộp số: Số tự đđộng</p>
                            <p>- Số ghế: 7 chỗ</p>
                            <p>- Năm sản xuất:2022</p>
                            <p>- Số KM: 42,000 km</p>
                            <p>- Màu: Bạc</p>
                            <p>- Biển số : 51</p>
                            <p>- Chủ xe : Cá nhân</p>
                            <p>- Trang bị theo xe và gắn thêm : Film cách nhiệt , trải sàn…</p>
                            <p>- Xe đã kiểm tra 176 hạng mục theo tiêu chuẩn Toyota Việt Nam</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="card" style="max-height: 180px">
                            <h5>Thông tin liên hệ</h5>
                            <p><b>Nguyễn Minh Phường </b></p>
                            <p>Điện thoại: <b>0938 832 385</b></p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh , P22, Q. Bình Thạnh TP HCM</p>
                        </div>
                        <div class="card" style="max-height: 270px">
                            <h5>Từ khóa phổ biến</h5>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                            <p>Địa chỉ: 220 Nguyễn Hữu Cảnh</p>
                        </div>
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
