<template>
  <v-container class="my-10">
    <PostCard
      v-for="post in posts"
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
import PostService from "../services/PostService";

export default {
  data: () => ({
    posts: [],
  }),
  components: {
    PostCard,
  },
  async created() {
    //resp.result - array with objects, resp.isSuccess - boolean, status of operation
    const resp = await PostService.getAllPosts();
    this.posts = resp.result
  },
};
</script>