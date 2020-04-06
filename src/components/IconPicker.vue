<template>
  <main>
    <v-btn
      color="blue"
      class="ma-2 white--text"
      @click='openDialog'
    >
      Select Icon
    </v-btn>
    <v-icon
      :color="value.color"
    >{{value.name}}</v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Select Icon</span>
          <v-icon
            :color="value.color"
          >{{value.name}}</v-icon>
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
          <v-card-title>
            <span class="headline">Select Color</span>
          </v-card-title>
          <v-row>
            <v-col
              v-for="(color, index) in listColor"
              :key="index"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card @click="selectColor(color)"
                flat tile class="d-flex">
                <v-icon
                  :color="color"
                >{{value.name}}</v-icon>
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
          <v-btn
            color="blue darken-1"
            text
            @click="submit">Select</v-btn>
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
      this.value.name = icon
      this.$emit('input', this.value)
    },
    selectColor(color: string) {
      this.value.color = color
      this.$emit('input', this.value)
    },
    submit() {
      this.$emit('input', this.value)
      this.close()
    },
  },
  computed: {
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    listColor: [
      'green',
      'red',
    ],
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
