<template>
  <main>
     <v-btn
      color="blue"
      class="ma-2 white--text"
      :to='url'
    >
      {{title}}
      <v-icon right dark>{{icon}}</v-icon>
    </v-btn>
    <!-- <router-link :to='url'>{{title}}</router-link> -->
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  props: ['url', 'title', 'icon'],
})
</script>
