<template>
  <nav class="navigation">
    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase white--text">
        <span class="font-weight-light text-no-wrap">Feel</span>
        <span class="text-uppercase text-no-wrap">Blog</span>
      </v-app-bar-title>

      <v-tabs class="d-flex justify-end">
        <v-tab to="/">Posts</v-tab>
        <!-- JOS STORESSA isLoggedIn true, piilota nämä ja vaihda esim account tabiin? -->
        <v-tab v-if="!this.$store.getters.isLoggedIn" to="/login">Log in</v-tab>
        <v-tab v-if="!this.$store.getters.isLoggedIn" to="/register">Register</v-tab>
        <v-tab to="/about">About</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-navigation-drawer v-model="sidebar" app class="blue" temporary dark>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5">Hello {{ username }}</v-list-item-title>
            <v-list-item-subtitle>@{{ username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>
      <v-list nav>
        <!-- v-model="selectedItem" jos haluaa valita tämänhetkisen tabin -->
        <v-list-item-group v-if="this.$store.getters.isLoggedIn" color="blue darken-4">
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>{{ accountLinks[0].icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ accountLinks[0].text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item v-else :to="accountLinks[1].route">
          <v-list-item-action>
            <v-icon>{{ accountLinks[1].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ accountLinks[1].text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// import AuthService from '../services/AuthService'

export default {
  name: "navigation",
  data() {
    return {
      sidebar: false,
      links: [
        { icon: "mdi-note-plus", text: "Write a post", route: "/create" },
        { icon: "mdi-account", text: "Account", route: "/account" },
      ],
      accountLinks: [
        { icon: "mdi-logout", text: "Logout" },
        { icon: "mdi-login", text: "Login", route: "/login"},
      ],
      username: '',
    }
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      // Jos haluaa pakottaa käyttäjän kirjautumaan ennen kuin päästää käyttämään sivua
      //this.$router.push('/login')
    }
    // Aseta usernamelle arvo storesta
    this.username = this.$store.getters.getUser.username
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.username = ''
      this.$router.push('/login')
    }
  },
}
</script>