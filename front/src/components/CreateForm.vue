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
import ProfileService from '../services/ProfileService'
//import PostService from "../services/PostService";
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
          //username: this.username - no need
        }

        const response = await ProfileService.createPost(post);

        //REST using examples:

        //get post by id (only, which was created by current user)
        //const response = await ProfileService.getPostById(2);

        //delete post
        //const response = await ProfileService.deletePostById(1)

        //update post
        //const response = await ProfileService.updatePostById(1, post)

        //get all user data (email, phone etc.)
        //const response = await ProfileService.getAllData();

        //get user property (as email, phone etc.)
        //const response = await ProfileService.getPropertyByName("username");
        //const property = response.result[0].username;

        //update user property (as email, phone etc.)
        //const response = await ProfileService.updatePropertyByName("email", "test@mail.fi");

        //get all existing posts (no login needed)
        //const response = await PostService.getAllPosts();

        //search posts by title
        //const response = await PostService.searchPostsByTitle("l");

        //search posts by title
        //const response = await PostService.searchPostsByAuthor("username");

        //search posts by date of creation, function can make search with these params:
        // ("2021-12-16", "") from, ("", "2021-12-16") to, ("2021-12-16", "2021-12-17") from to
        //You can use html <input type="date"> for auto generating right dates
        //const response = await PostService.searchPostsByDate("2021-12-16", "2021-12-18");

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