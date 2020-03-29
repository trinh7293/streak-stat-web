<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>
                          Login
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                prepend-icon="mdi-account"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                                data-cy="signinEmailField"
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="password"
                                label="Password"
                                type="password"
                                data-cy=
                                  "signinPasswordField"
                                v-model="password"
                                :rules="passwordRules"
                                required
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="yellow"
                          to="/join"
                        >Join</v-btn>
                        <v-btn
                          color="primary"
                          :disabled="!valid"
                          @click="submit"
                          data-cy="signinSubmitBtn"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            <!-- <p>You don't have an account
              ? You can <router-link
              to="/join">
            create one
            </router-link></p> -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import { userLogin } from '@/api'

export default Vue.extend({
  name: 'Signin',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
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
          await userLogin(
            this.email,
            this.password,
          )
        } catch (error) {
          this.$toasted.global.my_app_error(error)
          console.log('error In Login: ', error)
          this.form.reset()
        }
      }
    },
  },
  computed: {
    form(): Vue & {
      validate: () => boolean;
      reset: () => void;
      } {
      return this.$refs.form as Vue & {
        validate: () => boolean;
        reset: () => void;
       }
    },
  },
})
</script>

<style scoped></style>
