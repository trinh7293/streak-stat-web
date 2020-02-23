<template>
  <main>
    now: {{dateStr}}
     <br>
    future: {{dateFutureStr}}
     <br>
    <v-btn v-on:click='testAddDatePast'>testAddDatePast</v-btn>
    <v-btn v-on:click='testAddFuture'>testAddFuture</v-btn>
    <v-btn v-on:click='testAddDate'>testAddDate</v-btn>
    <v-btn v-on:click='getDate'>getDate</v-btn>
    <v-btn v-on:click='getDateFuture'>getDateFuture</v-btn>
    <v-btn v-on:click='compareDoc'>compareDoc</v-btn>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
import moment from 'moment'
import { dayColl } from '@/firebase_backend'

const docName = 'docName'
const docNameFuture = 'docNameFuture'
const docNamePast = 'docNamePast'

export default Vue.extend({
  data: () => ({
    dateStr: '',
    dateFutureStr: '',
  }),
  methods: {
    async getDate() {
      const docGet = await dayColl.doc(docName).get()
      const data = docGet.data()
      if (data) {
        const { date } = data
        console.log('date', date)
        this.dateStr = date.toDate()
      }
    },
    async getDateFuture() {
      const docGet = await dayColl.doc(docNameFuture).get()
      const data = docGet.data()
      if (data) {
        const { date } = data
        console.log('date', date)
        this.dateFutureStr = date.toDate()
      }
    },
    async compareDoc() {
      const now = await dayColl.doc(docName).get()
      const future = await dayColl.doc(docNameFuture).get()
      const past = await dayColl.doc(docNamePast).get()
      const nowData = now.data()
      const futureData = future.data()
      const pastData = past.data()
      if (nowData && futureData && pastData) {
        const nowDate = nowData.date
        const futureDate = futureData.date
        const pastDate = pastData.date
        // if (nowDate > futureDate) {
        //   console.log('nowDate > futureDate')
        // }
        // if (nowDate < futureDate) {
        //   console.log('nowDate < futureDate')
        // }
        const fuNow: boolean = futureDate > nowDate
        console.log('fuNow', fuNow)
        const fuPa: boolean = futureDate > pastDate
        console.log('fuPa', fuPa)
        const paNo: boolean = pastDate > nowDate
        console.log('paNo', paNo)
        // const current: boolean = futureDate > nowDate > pastDate
        // console.log('current', current)
      }
    },
    testAddDatePast() {
      dayColl.doc(docNamePast).set({
        date: moment('2020-02-24').toDate(),
      })
    },
    testAddDate() {
      dayColl.doc(docName).set({
        date: moment().toDate(),
      })
    },
    testAddFuture() {
      dayColl.doc(docNameFuture).set({
        date: moment('2020-02-26').toDate(),
      })
    },
  },
})
</script>

<style></style>
