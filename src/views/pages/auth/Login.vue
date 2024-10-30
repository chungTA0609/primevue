<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

import { useForm } from 'vee-validate';
import * as yup from 'yup'; // For schema-based validation
import { toTypedSchema } from '@vee-validate/yup';
import { useRouter } from 'vue-router';
import axiosInstance from '../../../service/axiosInstance';
import { useTokenCookie } from '../../../service/useTokenCookie';
import { useStore } from 'vuex';

import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { setTokenCookie } = useTokenCookie();
const store = useStore();
const router = useRouter();
const { layoutConfig } = useLayout();
const { errors, defineField, handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            email: yup.string().required('Vui lòng nhập tên tài khoản'),
            password: yup.string().required('Vui lòng nhập mật khẩu.')
        })
    )
});

const isEmail = (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})/.test(value);
};

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// Define the submit handler
const onSubmit = handleSubmit(async (values) => {
    try {
        const res = await axiosInstance.post('/users/auth', {
            username: values.email,
            password: values.password
        });
        store.dispatch('user/updateIsLogin', true);
        toast.add({ severity: 'info', summary: 'Lỗi', detail: 'Đăng nhập thành công', life: 3000 });

        setTokenCookie(res.data.data.token, 1);
        getMe();
        router.push('/');
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
});

const getMe = async () => {
    try {
        const res = await axiosInstance.get('/users/me');
        store.dispatch('user/updateUserData', res.data.data);
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Lỗi hệ thống', life: 3000 });
    }
};
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const disableSubmit = computed(() => {
    return !isEmail(password.value) || !(Object.keys(errors.value).length === 0 && errors.value.constructor === Object);
});
</script>

<template>
    <Toast />
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" @click="router.push('/')" />
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Đăng nhập</div>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Tên truy cập</label>
                        <InputText v-bind="emailAttrs" id="email1" type="text" placeholder="Tên truy cập" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" :invalid="!!errors.email" />
                        <div class="error-msg">{{ errors.email }}</div>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password
                            v-bind="passwordAttrs"
                            :feedback="true"
                            id="password1"
                            v-model="password"
                            placeholder="Password"
                            :toggleMask="true"
                            class="w-full mb-3"
                            inputClass="w-full"
                            :inputStyle="{ padding: '1rem' }"
                            :invalid="!!errors.password"
                            ><template #header>
                                <div class="font-semibold text-xm mb-4">Pick a password</div>
                            </template>
                            <template #footer>
                                <Divider />
                                <ul class="pl-2 ml-2 my-0 leading-normal">
                                    <li>Mật khẩu phải sử dụng từ 6-20 ký tự.(A-Z, a-z, 0-9.Không sử dụng ký tự đặc biệt, dấu cách)</li>
                                    <li>Tránh dùng tên truy cập trong mật khẩu</li>
                                </ul>
                            </template></Password
                        >
                        <div class="error-msg">{{ errors.password }}</div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <a @click="router.push('/auth/register')" class="font-medium no-underline ml-2 text-left cursor-pointer" style="color: var(--primary-color)">Đăng ký?</a>
                            <a @click="router.push('/auth/forgot-password')" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Quên mật khẩu?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onSubmit" :disabled="disableSubmit"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
.error-msg {
    color: red;
}
</style>
