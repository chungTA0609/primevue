<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';
// import axiosInstance from '../service/axiosInstance';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useTokenCookie } from '../service/useTokenCookie';
const toast = useToast();
const { deleteTokenCookie } = useTokenCookie();
const store = useStore();
const { layoutConfig } = useLayout();
const router = useRouter();
const smoothScroll = (id) => {
    router.push({ path: id });
};
// const getMe = async () => {
//     try {
//         const res = await axiosInstance.get('/users/me');
//         console.log(res);
//     } catch (error) {}
// };
onMounted(() => {
    // getMe();
});
const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const items = [
    {
        label: 'Đăng xuất',
        command: () => {
            deleteTokenCookie();
            store.dispatch('user/updateIsLogin', false);
        }
    }
];

const save = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};
const isLogin = computed(() => store.getters['user/isLogin']);
</script>

<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" @click="router.push('/')"> <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-900 font-medium text-2xl line-height-3 mr-8">SAKAI</span> </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        <li>
                            <a @click="smoothScroll('/')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Trang chủ</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('/mua-xe')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Mua xe</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('/ban-xe')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Bán xe</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('/salon-xe')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Salon Ô tô</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('/phu-tung')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Phụ tùng</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('/admin')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Admin</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                        <Button v-if="!isLogin" @click="router.push('/auth/login')" label="Đăng nhập" class="p-button-text p-button-rounded border-none font-light line-height-2"></Button>
                        <Button v-if="!isLogin" @click="router.push('/auth/register')" label="đăng ký"></Button>
                        <SplitButton v-if="isLogin" label="Thông tin cá nhân" @click="save" :model="items" />
                    </div>
                </div>
            </div>

            <div id="highlights" class="py-4 px-4 lg:px-8 mx-0 lg:mx-8">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
#hero {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #eeefaf 0%, #c3e3fa 100%);
    height: 700px;
    overflow: hidden;
}

@media screen and (min-width: 768px) {
    #hero {
        -webkit-clip-path: ellipse(150% 87% at 93% 13%);
        clip-path: ellipse(150% 87% at 93% 13%);
        height: 530px;
    }
}

@media screen and (min-width: 1300px) {
    #hero > img {
        position: absolute;
    }

    #hero > div > p {
        max-width: 450px;
    }
}

@media screen and (max-width: 1300px) {
    #hero {
        height: 600px;
    }

    #hero > img {
        position: static;
        transform: scale(1);
        margin-left: auto;
    }

    #hero > div {
        width: 100%;
    }

    #hero > div > p {
        width: 100%;
        max-width: 100%;
    }
}
</style>
