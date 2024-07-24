<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <Form>
        <div class="card p-fluid">
          <h5>Vertical</h5>
          <div class="field">
            <label for="name1">Name</label>
            <InputText type="text" v-model="name" :invalid="!!errors.name" @blur="touchField('name')" />
            <small style="color: red">{{ errors.name }}</small>
          </div>
          <div class="field">
            <label for="email1">Email</label>
            <InputText type="text" v-model="email" :invalid="!!errors.email" @blur="touchField('email')" />
            <small style="color: red">{{ errors.email }}</small>
          </div>
          <div class="field">
            <label for="age1">Age</label>
            <InputText type="text" v-model="password" :invalid="!!errors.password" @blur="touchField('password')" />
            <small style="color: red">{{ errors.password }}</small>
          </div>
          <Button label="Submit" @click="onSubmit"></Button>
        </div>
      </Form>
      <div class="card"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
import { string, object } from "yup";
import "../../validation";
const formSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(10),
});
const { handleSubmit, errors, defineField, resetForm, setFieldTouched } =
  useForm({
    validationSchema: formSchema,
  });
const form = ref(null);
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
  console.log(form);
  console.log(nameAttrs);
  console.log(emailAttrs);
  console.log(passwordAttrs);
});
const resetError = () => {
  resetForm();
};
const touchField = (field: string) => {
  console.log(form);
  setFieldTouched(field, true);
  resetError();
};
</script>

<style></style>
