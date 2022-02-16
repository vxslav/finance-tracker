const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
import { getAuth } from "firebase/auth";

import { query, where } from "firebase/firestore";

export const loginAction = (email, pass) => {
    return function(dispatch) {


        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
          
          const firstName = user.firstName;
          const lastName = user.lastName;
          const email = user.email;
          const avatar = user.avatar;
          const emailVerified = user.emailVerified;
          const id = user.id
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email' == email && 'password' == pass));
    }
}
