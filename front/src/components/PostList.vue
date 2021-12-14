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

<!--
posts: [
        {
          title: "First post!",
          writer: "Joona",
          date: "07.12.2021",
          emotion: "happy",
          content: "This is my first blog post!",
        },
        {
            title: "Second post",
            writer: "Joona",
            date: "08.12.2021",
            emotion: "surprised",
            content: "This is my second blog post!",
        },
        {
            title: "Post three",
            writer: "Joona",
            date: "10.12.2021",
            emotion: "angry",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            title: "Post four",
            writer: "Joona",
            date: "10.12.2021",
            emotion: "sad",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        }
      ],
-->
