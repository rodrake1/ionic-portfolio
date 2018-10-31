import firebase from "firebase";

export class AuthService {
  private dbAddress = 'https://ionic-recipe-book-65c93.firebaseio.com/';

  singup(email: 'string', password: 'string') {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  singin(email: 'string', password: 'string') {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUSer() {
    return firebase.auth().currentUser;
  }

  getDbAddress() {
    return this.dbAddress;
  }
}