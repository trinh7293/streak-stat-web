<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>
                          Join
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                             <v-text-field
                              prepend-icon="mdi-cow"
                              v-model="displayName"
                              :counter="30"
                              :rules="displayNameRules"
                              label="Display Name"
                              required
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-account"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                data-cy="joinEmailField"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                v-model="password"
                                :rules="passwordRules"
                                data-cy="joinPasswordField"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          to="/login"
                          >To Login</v-btn
                        >
                        <v-btn
                            color="yellow"
                            :disabled="!valid"
                            @click="submit"
                            data-cy="joinSubmitBtn"
                            >Join</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import { userJoin } from '@/api'

export default Vue.extend({
  name: 'Join',
  data() {
    return {
      valid: false,
      displayName: '',
      email: '',
      password: '',
      displayNameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length <= 30)
          || 'Name must be less than 30 characters',
      ],
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+/.test(v)
          || 'E-mail must be valid',
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => (v && v.length >= 6)
          || 'Password must be greater than 6 characters',
      ],
    }
  },
  methods: {
    async submit() {
      if (this.form.validate()) {
        try {
          await userJoin(
            this.email,
            this.password,
            this.displayName,
          )
        } catch (error) {
          this.$toasted.global.my_app_error(error)
          console.log('error In Join: ', error)
        }
      }
    },
  },
  computed: {
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & {
        validate: () => boolean;
       }
    },
  },
})
</script>

<style scoped></style>
