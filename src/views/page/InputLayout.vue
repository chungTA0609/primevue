<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <h5>Input Text</h5>
                <div class="grid form-grid">
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <InputText type="text" placeholder="Default"></InputText>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <InputText type="text" placeholder="Disabled" :disabled="true"></InputText>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <IconField iconPosition="right">
                            <InputText type="text" placeholder="Invalid" invalid />
                            <InputIcon class="pi pi-search"></InputIcon>
                        </IconField>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <FloatLabel iconPosition="right">
                            <label for="username">Username</label>
                            <InputText type="text" placeholder="Username" />
                        </FloatLabel>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <Textarea placeholder="Your Message" :autoResize="true" rows="3" cols="198"></Textarea>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <h5>Auto Complete</h5>
                        <AutoComplete placeholder="Search" id="dd" :multiple="true" v-model="selectedAutoValue"
                            :suggestions="autoFilteredValue" @complete="searchCountry($event)" optionLabel="name" />
                    </div>
                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <h5>Date Picker</h5>
                        <DatePicker v-model="templatedisplay" showIcon fluid iconDisplay="input">
                            <!-- <i class="pi pi-clock" @click="slotProps.clickCallback" /> -->
                            <!-- <template #inputicon="slotProps"> </template> -->
                        </DatePicker>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <h5>Radio Button</h5>
                        <div class="list-radio" style="display: flex">
                            <div class="col-12 md:col-4">
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option1" name="option" value="Chicago" v-model="radioValue" />
                                    <label for="option1">Chicago</label>
                                </div>
                            </div>
                            <div class="col-12 md:col-4">
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option2" name="option" value="Los Angeles" v-model="radioValue" />
                                    <label for="option2">Los Angeles</label>
                                </div>
                            </div>
                            <div class="col-12 md:col-4">
                                <div class="field-radiobutton mb-0">
                                    <RadioButton id="option3" name="option" value="New York" v-model="radioValue" />
                                    <label for="option3">New York</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <h5>Check box</h5>
                        <div class="list-checkbox" style="display: flex">
                            <div class="col-12 md:col-4">
                                <div class="field-checkbox mb-0">
                                    <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                                    <label for="checkOption1">Chicago</label>
                                </div>
                            </div>
                            <div class="col-12 md:col-4">
                                <div class="field-checkbox mb-0">
                                    <Checkbox id="checkOption2" name="option" value="Los Angeles"
                                        v-model="checkboxValue" />
                                    <label for="checkOption2">Los Angeles</label>
                                </div>
                            </div>
                            <div class="col-12 md:col-4">
                                <div class="field-checkbox mb-0">
                                    <Checkbox id="checkOption3" name="option" value="New York"
                                        v-model="checkboxValue" />
                                    <label for="checkOption3">New York</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0">
                        <h5>Switch</h5>
                        <ToggleButton v-model="checked" onLabel="On" offLabel="Off" />
                    </div>
                </div>

                <h5></h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import FloatLabel from "primevue/floatlabel";
import { onMounted, ref } from "vue";
import { MockService } from "../../services/mockService";
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const autoValue = ref(null);
const mockService = new MockService();
const templatedisplay = ref();
const radioValue = ref(null);
const checked = ref(false);
onMounted(async () => {
    await getCountry();
});
const getCountry = async () => {
    autoValue.value = await mockService.getCountry();
};
const searchCountry = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            autoFilteredValue.value = [...autoValue.value];
        } else {
            autoFilteredValue.value = autoValue.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};
</script>

<style></style>