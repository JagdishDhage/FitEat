import { db } from './firebaseConfig';
import { ref, set, update } from "firebase/database";

function writeUserData(userId, name, age, height, weight, email, imageUrl) {
  set(ref(db, 'users/' + userId), {
    username: name,
    age: age,
    height: height,
    weight: weight,
    email: email,
    profile_picture: imageUrl
  });
}

function writeUserBMIData(bmiResult, userId) {
  update(ref(db, 'users/Nutrients/' + userId), {
    bmiResult: bmiResult,
  });
}

function writeUserProteinData(protein, userId) {
  update(ref(db, 'users/Nutrients/' + userId), {
    Protein: protein,
  });
}

function writeUserCaloriesData(loss_Calorry, userId) {
  update(ref(db, 'users/Nutrients/' + userId), {
    loss_Calorry: loss_Calorry,
  });
}

export { writeUserProteinData, writeUserCaloriesData, writeUserBMIData, writeUserData };
