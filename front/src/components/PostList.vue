<template>
  <v-container class="my-10">
    <v-btn small depressed color="white" @click="showSearch">
      <v-icon left color="blue">mdi-magnify</v-icon>
      <span class="caption text-lowercase">find by title</span>
    </v-btn>
    <v-text-field
      v-if="search"
      v-model="searchInput"
      placeholder="Post title..."
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>

    <PostCard
      v-for="post in filterPosts"
      :key="post.title"
      :title="post.title"
      :writer="post.username"
      :date="post.date.slice(0, 10)"
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
    search: false,
    searchInput: "",
  }),
  components: {
    PostCard,
  },
  async created() {
    //resp.result - array with objects, resp.isSuccess - boolean, status of operation
    const resp = await PostService.getAllPosts();
    this.posts = resp.result;
  },
  methods: {
    showSearch() {
      if (!this.search) {
        this.search = true;
      } else {
        this.search = false;
      }
    },
  },
  computed: {
    filterPosts() {
      let tempPosts = this.posts;

      if (this.searchInput != "" && this.searchInput) {
        tempPosts = tempPosts.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchInput.toUpperCase())
        })
      }
      return tempPosts.reverse();
    }
  }
};
</script>
