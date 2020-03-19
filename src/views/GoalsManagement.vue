<template>
  <v-data-table
    :headers="headers"
    :items="getPickedDateGoals"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.icon="{ item }">
      <v-icon>
        {{item.icon}}
      </v-icon>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name"
                      label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <IconPicker v-model="editedItem.icon" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text
                @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text
                @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  addGoalSetting,
  editGoalSetting,
  deleteGoalSetting,
} from '@/api'

import IconPicker from '@/components/IconPicker.vue'

export default Vue.extend({
  components: {
    IconPicker,
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Icon', value: 'icon' },
      { text: 'Description', value: 'description' },
      { text: 'Current streak', value: 'streakCount' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: '',
    editedItem: {
      goalId: '',
      name: '',
      description: '',
      icon: '',
    },
    defaultItem: {
      goalId: '',
      name: '',
      description: '',
      icon: '',
    },
  }),

  computed: {
    ...mapGetters(['getPickedDateGoals']),
    formTitle() {
      return this.editedIndex === ''
        ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val: boolean) {
      if (!val) {
        this.close()
      }
    },
  },

  methods: {
    editItem(item: SettingGoalInArray) {
      this.editedIndex = item.goalId
      this.editedItem = { ...item }
      this.dialog = true
    },
    async deleteItem(item: SettingGoalInArray) {
      await deleteGoalSetting(item)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = ''
      }, 300)
    },
    async save() {
      if (this.editedIndex !== '') {
        await editGoalSetting(this.editedItem)
      } else {
        await addGoalSetting(this.editedItem)
      }
      this.close()
    },
  },
  // created() {
  //   this.$store.dispatch('initSettingGoalListener')
  // },
})
</script>
