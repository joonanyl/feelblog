<!-- 
    Muuta yksinäiseksi komponentiksi, 
    tee joku lista-tyylinen komponentti jossa on data 
    ja luo PostCardit niiden mukaisesti 
-->

<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attributes }">
      <v-card tile class="px-3 my-5" v-bind="attributes" v-on="on">
        <v-row row wrap>
          <v-col cols="12" md="6" :class="`pa-3 post ${emotion}`">
            <div class="caption grey--text">Post Title</div>
            <div>{{ title }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Writer</div>
            <div>{{ writer }}</div>
          </v-col>

          <v-col xs="2">
            <div class="caption grey--text">Date</div>
            <div>{{ date }}</div>
          </v-col>

          <v-col xs="2">
            <div>
              <EmotionChip :emotion="emotion"/>
            </div>
          </v-col>
        </v-row>

        <v-row cols="12">

        </v-row>
      </v-card>
    </template>
    <v-card class="text-center" min-height="600">
        <v-card-title class="justify-center">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-5 px-10">{{ content }}</v-card-text>
        <v-card-text>Posted on {{ date }} by {{ writer }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import EmotionChip from './EmotionChip.vue'
export default {
  props: {
    title: String,
    writer: String,
    date: String,
    emotion: String,
    content: String,
  },
  data: () => ({
      dialog: false
  }),
  components: {
    EmotionChip
  }
};
</script>

<style scoped>
.post.Happy {
  border-left: 0.5rem solid #fff176;
}

.post.Surprised {
  border-left: 0.5rem solid #f06292;
}

.post.Angry {
  border-left: 0.5rem solid #f44336;
}

.post.Sad {
  border-left: 0.5rem solid #1e88e5;
}
</style>
