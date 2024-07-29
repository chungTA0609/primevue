<template>
  <div class="grid">
    <div class="col-12 md:col-12">
      <Form>
        <div class="card p-fluid">
          <h5>Form Demo</h5>
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
          <div class="field" style="display: grid">
            <label for="option1">Option</label>
            <Dropdown id="test" :options="dropdownItems" v-model="option" optionLabel="name" placeholder="Select One">
            </Dropdown>
          </div>
          <div class="field">
            <label for="address">Address</label>
            <Textarea id="address" rows="4" v-model="address" :invalid="!!errors.address"></Textarea>
            <small style="color: red">{{ errors.address }}</small>
          </div>
          <Button label="Submit" @click="onSubmit" :disabled="disableBtn"></Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { computed, ref } from "vue";
import { string, object } from "yup";
import "../../validation";

const dropdownItems = ref([
  { name: "Option 1", code: "Option 1" },
  { name: "Option 2", code: "Option 2" },
  { name: "Option 3", code: "Option 3" },
]);
const formSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(10),
  address: string().required(),
  option: object().required(),
});
const { handleSubmit, errors, defineField, setFieldTouched, meta } = useForm({
  validationSchema: formSchema,
});
const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");
const [option] = defineField("option");
const [address] = defineField("address");
const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
// const resetError = () => {
//   resetForm();
// };
const touchField = (field: string) => {
  setFieldTouched(field, true);

  // resetError();
};

const disableBtn = computed(() => {
  return !meta.value.valid;
});
</script>

<style scoped>
.field {
  display: grid;
}
</style>
