<template>
  <main>
    <v-btn
      color="blue"
      class="ma-2 white--text"
      @click='openDialog'
    >
      Select
      <v-icon right dark>{{value}}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Select Icon</span>
        </v-card-title>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(icon, index) in listIcon"
              :key="index"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card @click="selectIcon(icon)"
                flat tile class="d-flex">
                <v-icon>{{icon}}</v-icon>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    openDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    selectIcon(icon: string) {
      this.$emit('input', icon)
      this.close()
    },
  },
  computed: {
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    listIcon: [
      'mdi-run-fast',
      'mdi-sleep',
      'mdi-alarm',
      'mdi-head-snowflake-outline',
      'mdi-swim',
      'mdi-home',
      'mdi-cloud-search',
      'mdi-coffee',
      'mdi-offer',
      'mdi-controller-classic',
      'mdi-hiking',
      'mdi-car',
      'mdi-bike',
      'mdi-soccer',
      'mdi-book-open-page-variant',
      'mdi-briefcase',
    ],
  }),
})
</script>
