<template>
  <v-container style="width: 50%">
    <v-card class="text-center" style="padding: 25px">
      <v-card-title primary-title class="justify-center">
        Write a new post
      </v-card-title>
      <v-form ref="form">
        <v-text-field
          v-model="title"
          label="Title"
          prepend-inner-icon="mdi-subtitles"
          required
          :counter="25"
        ></v-text-field>
        <v-textarea 
        v-model="content"
        label="Content"
        :counter="255"
        required
        ></v-textarea>
        <v-select
        v-model="selectedEmotion"
        label="Emotion"
        :items="emotions"
        item-text="emotion"
        return-object
        required
        ></v-select>
        <v-btn
        color="blue"
        class="mr-4"
        @click="post"
        dark
        id="btn">
        Post
        </v-btn>
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
        title: "",
        content: "",
        emotions: [
          { emotion: "Happy" },
          { emotion: "Sad" },
          { emotion: "Surprised"},
          { emotion: "Angry" }
        ],
        username: this.$store.getters.getUser.username,
        selectedEmotion: null,
        msg: ""
    }
  },
  methods: {
    async post() {
      console.log(this.title)
      console.log(this.content)
      console.log(this.selectedEmotion.emotion)
      console.log(this.username)
      console.log(this.date)

      try {
        const post = {
          title: this.title,
          content: this.content,
          emotion: this.selectedEmotion.emotion,
          //username: this.username
        }
        const response = await AuthService.createPost(post)
        this.msg = response.msg
        this.$router.push('/')
      } catch (err) {
        this.msg = err.response.data.msg
      }
    }
  }
}
</script>

<style scoped>
#btn:hover {
  transform: scale(1.05);
}
</style>