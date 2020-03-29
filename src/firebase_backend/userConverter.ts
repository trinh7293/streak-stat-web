class User {
  displayName: string

  email: string

  constructor(
    displayName: string,
    email: string,
  ) {
    this.displayName = displayName
    this.email = email
  }
}

// Firestore data converter
export default {
  toFirestore(user: UserFirestoreDoc) {
    return {
      displayName: user.displayName,
      email: user.email,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new User(
      data?.displayName,
      data?.email,
    )
  },
}
