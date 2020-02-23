import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// const cors = require('cors')({origin: true})
import * as cors from 'cors'
import {
  COLLECTION_DAY_DATA,
  START_STREAK,
  STREAK_NUM,
  IS_END_STREAK,
} from './constants'


const corsHandler = cors({ origin: true })

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()
const dayColl = firestore.collection(COLLECTION_DAY_DATA)
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.editGoalData = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(400).send('Please send a POST request')
    }
    const {
      pickedDate,
    } = request.body
    const editData = {
      [request.body.id]: {
        [START_STREAK]: request.body[START_STREAK],
        [STREAK_NUM]: request.body[STREAK_NUM],
        [IS_END_STREAK]: request.body[IS_END_STREAK],
      },
    }
    await dayColl.doc(pickedDate).set(editData, {
      merge: true,
    })
    response.send('Sucessfully set doc')
  })
})
