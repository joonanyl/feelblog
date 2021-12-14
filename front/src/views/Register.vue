<template>
  <v-layout align-start row fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" style="margin-top: 5vh">
          <RegisterForm style="width: 100%" v-model="formData" />
        </v-col>
        <v-col cols="12" sm="5" class="text-center" style="margin-top: 5vh">
            <h1>Have an account already?</h1>
            <LoginForm style="width: 100%; margin-top: 1vh" />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import LoginForm from "../components/LoginForm.vue";
export default {
  data: () => ({
    formData: {}
  }),
  components: {
    RegisterForm,
    LoginForm,
  },
  methods: {
    getFormData() {
      console.log(this.formData)
    }
  }
};
</script>

<style scoped></style>
