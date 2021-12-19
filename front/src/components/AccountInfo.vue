<template>
  <v-container style="width: 50%">
    <v-card class="text-center" style="padding: 25px">
        <v-card-title primary-title class="justify-center">Account info</v-card-title>
        <v-form>
            <v-text-field
            v-model="username"
            label="Username"
            outlined
            clearable
            ></v-text-field>

            <v-btn
            color="blue"
            class="mr-4"
            @click="update"
            dark
            id="btn"
            >Update</v-btn>
            <p>{{ msg }}</p>
        </v-form>
    </v-card>
  </v-container>
</template>

<script>
import ProfileService from '../services/ProfileService'

export default {
    data() {
        return {
            username: '',
            msg: ''
        }
    },
    async created() {
        this.username = this.$store.getters.getUser.username
    },
    methods: {
        async update() {
            try {
                let response = await ProfileService.updatePropertyByName('username',this.username)
                this.msg =response.msg
            } catch (err) {
                this.msg = err.response.data.msg
            }
            
        }
    }
};
</script>

<style scoped>
#btn:hover {
  transform: scale(1.05);
}
</style>