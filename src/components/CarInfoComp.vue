<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// const props = defineProps({
//     title: {
//         type: String,
//         defaul: null
//     }
// });
const gotoDetail = () => {
    router.push('/detail/1');
};
</script>
<template>
    <div class="col-12" style="padding: 0">
        <div class="card" style="display: flex; padding: 2px">
            <div class="col-2">
                <div class="first-col">
                    <p><b>2017 - Xe cũ</b></p>
                    <img alt="logo" src="/demo/images/logo.svg" style="width: 80px; max-height: 80px" />
                    <p style="margin-top: 12px">Mã: 678910JQKA</p>
                </div>
            </div>
            <div class="col-7">
                <div class="des-title" @click="gotoDetail"><p>Xe Ford Focus S 2.0 AT 2013</p></div>
                <div class="description">
                    <p class="first-des">*Xe lắp ráp trong nước, màu đen, máy xăng 2.0 L, số tự động, 7 chỗ , đã đi 74,000 km ...</p>
                    <p class="second-des">Em bán Outlander bản 2.0 CVT Sản xuất 2022 Odo lăn bánh 74.000km Bảo dưỡng Full lịch sử Hãng Cam kết xe không tai nạn ảnh hưởng vận hành xe, không ngập nước, thuỷ ...</p>
                </div>
            </div>
            <div class="col-3">
                <div class="title-info">
                    <div class="price">155 triệu</div>
                    <div class="province">Piltover</div>
                </div>
                <div class="contact-info">
                    <div class="address">
                        <div class="name">Liên hệ: <b>Lê Trọng Đứk</b></div>
                        <div class="place">Thanh Xuyên, Hoàng Long, Phú Xuyên, Hà Nội</div>
                    </div>
                    <div class="phone-number">ĐT: 0909 799 678 - 0909 799 676</div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scope>
.des-title {
    font-size: 15px;
    font-weight: bold;
    color: #0331c4;
    margin-bottom: 15px;
}
.second-des {
    margin-top: 15px;
}
.title-info {
    display: flex;
    justify-content: space-between;
}
.price {
    font-size: 15px;
    font-weight: bold;
    color: #000;
}
.province {
    float: right;
    font-size: 15px;
    font-weight: bold;
    color: #000;
}
.contact-info {
    margin-top: 12px;
}
.phone-number {
    margin-top: 15px;
}
</style>
