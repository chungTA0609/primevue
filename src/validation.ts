import { defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

// Define the validation rules
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

// Configure VeeValidate with localization
configure({
  generateMessage: localize("en", {
    messages: {
      required: "This field is required",
      email: "This field must be a valid email",
      min: "This field must be at least {length} characters",
    },
  }),
});
