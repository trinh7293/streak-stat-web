<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            :src='user.avatarUrl'
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Habit Streak</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({

  data: () => ({
    drawer: null,
    user: {
      avatarUrl:
          'https://randomuser.me/api/portraits/men/85.jpg',
    },
    items: [
      {
        url: '/',
        title: 'Home',
        icon: 'mdi-home',
      },
      {
        url: '/goals',
        title: 'Goals',
        icon: 'mdi-star',
      },
      {
        url: '/statistic',
        title: 'Stats',
        icon: 'mdi-chart-bar',
      },
    ],
    mini: true,
  }),
  created() {
    this.$store.dispatch('initGoalSettingListener')
    this.$store.dispatch('initDayDataListener')
  },
})
</script>
