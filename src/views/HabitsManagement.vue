<template>
  <main>
    <v-data-table
      :headers="headers"
      :items="getHabitStats"
      sort-by="calories"
      class="elevation-1"
      @click:row="editItem"
    >
      <template v-slot:item.icon="{ item }">
        <v-icon>
          {{item.icon}}
        </v-icon>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My HABITS</v-toolbar-title>
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
                Create Habit
              </v-btn>
            </template>
            <v-card>
              <v-form ref="form" v-model="valid">
                <v-card-title>
                  <span class="headline">
                    {{ formTitle }}
                  </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          v-model="editedItem.name"
                          prepend-icon="mdi-star"
                          :rules="nameRules"
                          label="Name" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          v-model="editedItem.description"
                          prepend-icon="mdi-cow"
                          :rules="descriptionRules"
                          label="description" />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <IconPicker
                          v-model="editedItem.icon" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text
                    @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text
                    @click="submit">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <!-- <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon> -->
        <v-icon
          small
          color="red"
          @click="dialogDelete = true"
        >
          mdi-delete
        </v-icon>
        <v-dialog
          v-model="dialogDelete"
          max-width="290"
        >
          <v-card>
            <v-card-title
              class="headline">
              Confirm delete habit
            </v-card-title>

            <v-card-text>
              This action will permently
              delete all your date data
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="dialogDelete = false"
              >
                Calcel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteItem(item)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <p>
      Click to habit to edit
    </p>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  addHabitSetting,
  editHabitSetting,
  deleteHabitSetting,
} from '@/api'

import IconPicker from '@/components/IconPicker.vue'

export default Vue.extend({
  components: {
    IconPicker,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Icon', value: 'icon' },
      { text: 'Description', value: 'description' },
      { text: 'Current streak', value: 'currentStreak' },
      { text: 'Best streak', value: 'bestStreak' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    valid: false,
    nameRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) => (v && v.length <= 20)
        || 'Name must be less than 20 characters',
    ],
    descriptionRules: [
      (v: string) => !!v || 'Description is required',
      (v: string) => (v && v.length <= 50)
        || 'Description must be less than 50 characters',
    ],
    editedIndex: '',
    editedItem: {
      habitId: '',
      name: '',
      description: '',
      icon: '',
    },
    defaultItem: {
      habitId: '',
      name: '',
      description: '',
      icon: '',
    },
  }),

  computed: {
    ...mapGetters(['getHabitStats']),
    form(): Vue & {
      validate: () => boolean;
      reset: () => void;
      } {
      return this.$refs.form as Vue & {
        validate: () => boolean;
        reset: () => void;
       }
    },
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
    checkClick(value: unknown) {
      console.log(value)
    },
    editItem(item: SettingHabit) {
      this.editedIndex = item.habitId
      this.editedItem = { ...item }
      this.dialog = true
    },
    async deleteItem(item: SettingHabit) {
      await deleteHabitSetting(item.habitId)
      this.$toasted.global.actionSuccess({
        message: 'Habit deleted',
      })
      this.dialogDelete = false
    },
    close() {
      this.dialog = false
      this.form.reset()
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = ''
      }, 300)
    },
    async submit() {
      if (this.form.validate()) {
        try {
          if (this.editedIndex !== '') {
            await editHabitSetting(this.editedItem)
          } else {
            await addHabitSetting(this.editedItem)
            this.$toasted.global.actionSuccess({
              message: 'Habit created',
            })
          }
          this.close()
        } catch (error) {
          this.$toasted.global.my_app_error(error)
          console.log('error in create habit', error)
          this.form.reset()
        }
      }
    },
  },
})
</script>
