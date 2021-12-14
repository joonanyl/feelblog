<template>
  <v-container style="width: 50%">
    <v-card class="text-center" style="padding: 25px">
      <v-card-title primary-title class="justify-center"
        >Register an account</v-card-title
      >

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="usernameRules"
          label="Username"
          prepend-inner-icon="mdi-account"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password_repeat"
          label="Enter your password again"
          prepend-inner-icon="mdi-lock"
          required
        ></v-text-field>

        <v-btn
          color="blue"
          class="mr-4"
          @click="register"
          dark
          id="btn"
          >
          Register</v-btn>
        
        <v-card-text v-if="msg">{{ msg }}</v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import AuthService from '../services/AuthService'
export default {
  data() {
    return {
      username: "",
      password: "",
      password_repeat: "",
      msg: "",
    };
  },
  methods: {
    async register() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        }
        const response = await AuthService.register(credentials)
        this.msg = response.msg
      } catch (err) {
        this.msg = err.response.data.msg
      }
    }
  },
}
</script>

<style scoped>
#btn:hover {
  transform: scale(1.05);
}
</style>
