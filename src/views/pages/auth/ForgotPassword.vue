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

const { setTokenCookie } = useTokenCookie();

const router = useRouter();
const { layoutConfig } = useLayout();
const { errors, defineField, handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            email: yup.string().email('Vui lòng nhập đúng định dạng email').required('Vui lòng nhập email')
        })
    )
});

const [email, emailAttrs] = defineField('email');

// Define the submit handler
const onSubmit = handleSubmit(async (values) => {
    const res = await axiosInstance.post('/users/auth', {
        username: values.email
    });
    setTokenCookie(res.data.data.token, 1);
});
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const disableSubmit = computed(() => {
    return !(Object.keys(errors.value).length === 0 && errors.value.constructor === Object);
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" @click="router.push('/')" />
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Quên mật khẩu</div>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText v-bind="emailAttrs" id="email1" type="email" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" :invalid="!!errors.email" />
                        <div class="error-msg">{{ errors.email }}</div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <a @click="router.push('/auth/register')" class="font-medium no-underline ml-2 text-left cursor-pointer" style="color: var(--primary-color)">Đăng ký</a>
                            <a @click="router.push('/auth/login')" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Đăng nhập</a>
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
