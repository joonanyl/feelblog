<template>
  <v-container style="width: 50%">
    <v-card class="text-center" style="padding: 25px">
      <v-card-title primary-title class="justify-center">Log in</v-card-title>

      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="username"
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

        <v-btn color="blue" class="mr-4" dark id="btn" @click="login"
          >Log in</v-btn
        >
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
      msg: ""
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        }
        const response = await AuthService.login(credentials)
        this.msg = response.msg

        const token = response.token
        const user = response.user

        this.$store.dispatch('login',{ token, user })
        this.$router.push('/')
      } catch (err) {
        this.msg = err.response.data.msg
      }
    }
  },
};
</script>

<style scoped>
#btn:hover {
  transform: scale(1.05);
}
</style>
