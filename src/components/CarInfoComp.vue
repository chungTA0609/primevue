<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    dataCar: {
        type: Object,
        defaul: null
    }
});

onMounted(() => {});
const gotoDetail = (slug) => {
    router.push(`/detail/${slug}`);
};
</script>
<template>
    <div class="col-12" style="padding: 0">
        <div class="card" style="display: flex; padding: 2px">
            <div class="col-2">
                <div class="first-col">
                    <p>
                        <b>{{ dataCar.manufacturingYear }} - Xe {{ dataCar?.status === 'OLD' ? 'cũ' : 'mới' }} </b>
                    </p>
                    <img alt="logo" :src="dataCar?.logo" style="width: 80px; max-height: 80px" />
                    <p style="margin-top: 12px">Mã: {{ dataCar?.code }}</p>
                </div>
            </div>
            <div class="col-7">
                <div class="des-title" @click="gotoDetail(dataCar?.slug)">
                    <p>{{ dataCar?.name }}</p>
                </div>
                <div class="description">
                    <p class="first-des">{{ props.dataCar?.description }}</p>
                    <!-- <p class="second-des">Em bán Outlander bản 2.0 CVT Sản xuất 2022 Odo lăn bánh 74.000km Bảo dưỡng Full lịch sử Hãng Cam kết xe không tai nạn ảnh hưởng vận hành xe, không ngập nước, thuỷ ...</p> -->
                </div>
            </div>
            <div class="col-3">
                <div class="title-info">
                    <div class="price">Giá số: {{ dataCar?.price ? dataCar?.price.toLocaleString('en-US') : '' }}</div>
                    <div class="price">Giá chữ: {{ dataCar?.priceText ? dataCar.priceText : '' }}</div>
                    <!-- <div class="province">{{ dataCar?.city?.name }}</div> -->
                </div>
                <div class="contact-info">
                    <div class="address">
                        <div class="name">Liên hệ: <b>Lê Trọng Đứk</b></div>
                        <div class="place">{{ props.dataCar?.address }}</div>
                    </div>
                    <div class="phone-number">ĐT: {{ dataCar?.userPhoneNum }}</div>
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
    /* display: flex;
    justify-content: space-between; */
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
