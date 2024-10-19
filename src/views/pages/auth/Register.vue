<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

import { useForm } from 'vee-validate';
import * as yup from 'yup'; // For schema-based validation
import { toTypedSchema } from '@vee-validate/yup';
import { useRouter } from 'vue-router';

const router = useRouter();
const { layoutConfig } = useLayout();
const { errors, defineField, handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            username: yup.string().required('Vui lòng nhập tên tài khoản'),
            address: yup.string().required('Vui lòng nhập địa chỉ'),
            email: yup.string().email('Vui lòng nhập đúng định dạng email'),
            fullName: yup.string().required('Vui lòng nhập tên'),
            phoneNumber: yup.string().required('Vui số điện thoại'),
            password: yup.string().required('Vui lòng nhập mật khẩu.'),
            rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        })
    )
});
const isEmail = (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})/.test(value);
};
const [email, emailAttrs] = defineField('email');
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber');
const [otherPhoneNumber, otherPhoneNumberAttrs] = defineField('otherPhoneNumber');
const [address, addressAttrs] = defineField('address');
const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');
const [rePassword, rePasswordAttrs] = defineField('rePassword');
const [fullName, fullNameAttrs] = defineField('fullName');

// Define the submit handler
const onSubmit = handleSubmit((values) => {
    console.log(values); // Do something with the valid form data
});
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const disableSubmit = computed(() => {
    console.log(isEmail(password.value));
    console.log(errors.value);

    return !isEmail(password.value) || !(Object.keys(errors.value).length === 0 && errors.value.constructor === Object);
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" @click="router.push('/')" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <div class="field">
                            <label for="username" class="block text-900 text-xl font-medium mb-2">Tên truy cập <b style="color: red">*</b></label>
                            <InputText v-bind="usernameAttrs" id="username" type="text" placeholder="Tên truy cập" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="username" :invalid="!!errors.username" />
                            <div class="error-msg">{{ errors.username }}</div>
                        </div>
                        <div class="field">
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Mật khẩu <b style="color: red">*</b></label>
                            <Password
                                v-bind="passwordAttrs"
                                :feedback="true"
                                id="password1"
                                v-model="password"
                                placeholder="Mật khẩu"
                                :toggleMask="true"
                                class="w-full mb-3"
                                inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"
                                :invalid="!!errors.password"
                                ><template #header> </template>
                                <template #footer>
                                    <Divider />
                                    <ul class="pl-2 ml-2 my-0 leading-normal">
                                        <li>Mật khẩu phải sử dụng từ 6-20 ký tự.(A-Z, a-z, 0-9.Không sử dụng ký tự đặc biệt, dấu cách)</li>
                                        <li>Tránh dùng tên truy cập trong mật khẩu</li>
                                    </ul>
                                </template></Password
                            >
                            <div class="error-msg">{{ errors.password }}</div>
                        </div>
                        <div class="field">
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Nhập lại mật khẩu <b style="color: red">*</b></label>
                            <Password
                                v-bind="rePasswordAttrs"
                                :feedback="false"
                                id="password2"
                                v-model="rePassword"
                                placeholder="Nhập lại mật khẩu"
                                :toggleMask="true"
                                class="w-full mb-3"
                                inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"
                                :invalid="!!errors.rePassword"
                            ></Password>
                            <div class="error-msg">{{ errors.rePassword }}</div>
                        </div>
                        <div class="field">
                            <label for="fullName" class="block text-900 text-xl font-medium mb-2">Tên đây đủ <b style="color: red">*</b></label>
                            <InputText v-bind="fullNameAttrs" id="fullName" type="text" placeholder="Tên đầy đủ" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="fullName" :invalid="!!errors.fullName" />
                            <div class="error-msg">{{ errors.fullName }}</div>
                        </div>
                        <div class="field">
                            <label for="phoneNumber" class="block text-900 text-xl font-medium mb-2">Số điện thoại <b style="color: red">*</b></label>
                            <InputText v-bind="phoneNumberAttrs" id="phone" type="text" placeholder="Số điện thoại" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="phoneNumber" :invalid="!!errors.phoneNumber" />
                            <div class="error-msg">{{ errors.phoneNumber }}</div>
                        </div>
                        <div class="field">
                            <label for="fullName" class="block text-900 text-xl font-medium mb-2">Số điện thoại khác</label>
                            <InputText v-bind="otherPhoneNumberAttrs" id="otherPhone" type="text" placeholder="Số điện thoại khác" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="otherPhoneNumber" :invalid="!!errors.otherPhoneNumber" />
                            <div class="error-msg">{{ errors.otherPhoneNumber }}</div>
                        </div>
                        <div class="field">
                            <label for="fullName" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText v-bind="emailAttrs" id="email1" type="text" placeholder="Email" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="email" :invalid="!!errors.email" />
                            <div class="error-msg">{{ errors.email }}</div>
                        </div>
                        <div class="field">
                            <label for="fullName" class="block text-900 text-xl font-medium mb-2">Khu vực sinh sống <b style="color: red">*</b></label>
                            <Dropdown v-bind="emailAttrs" id="region" placeholder="Email" class="mb-2 w-full" style="padding: 1rem; max-height: 70%" v-model="email" :invalid="!!errors.email" />
                            <div class="error-msg">{{ errors.email }}</div>
                        </div>
                        <div class="field">
                            <label for="fullName" class="block text-900 text-xl font-medium mb-2">Địa chỉ <b style="color: red">*</b></label>
                            <InputText v-bind="addressAttrs" id="address" type="text" placeholder="Địa chỉ" class="w-full md:w-30rem mb-2" style="padding: 1rem" v-model="address" :invalid="!!errors.address" />
                            <div class="error-msg">{{ errors.address }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <a @click="router.push('/auth/login')" class="font-medium no-underline ml-2 text-left cursor-pointer" style="color: var(--primary-color)">Đăng nhập</a>
                            <a @click="router.push('/auth/forgot-password')" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Quên mật khẩu?</a>
                        </div>
                        <Button label="Đăng ký" class="w-full p-3 text-xl" @click="onSubmit" :disabled="disableSubmit"></Button>
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
