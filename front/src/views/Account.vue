<template>
  <v-container class="d-flex justify-center flex-column text-center">
    <AccountInfo />
  </v-container>
</template>

<script>
import ProfileService from "../services/ProfileService"
import AccountInfo from "../components/AccountInfo.vue"
export default {
  components: { AccountInfo },
  data() {
    return {
      accountInformation: [],
    };
  },
  async created() {
    this.accountInformation = ProfileService.getAllData();
  },
};
</script>
