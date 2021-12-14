<template>
  <v-container class="my-10">
    <PostCard
      v-for="post in posts.slice().reverse()"
      :key="post.title"
      :title="post.title"
      :writer="post.writer"
      :date="post.date.slice(0,10)"
      :emotion="post.emotion"
      :content="post.content"
      class="my-3"
    />
  </v-container>
</template>

<script>
import PostCard from "./PostCard.vue";
import AuthService from "../services/AuthService";

export default {
  data: () => ({
    posts: [],
  }),
  components: {
    PostCard,
  },
  async created() {
    this.posts = await AuthService.getPosts()
  },
};
</script>