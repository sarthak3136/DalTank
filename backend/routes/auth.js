const express = require("express");
const router = express.Router();
const cors = require("cors");
const { connectToDB, closeConnection } = require("./mongo");
const { auth } = require("./firebase");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  updateProfile,
  signOut,
} = require("firebase/auth");

router.use(cors());

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentials.user.uid;
    const doc = {
      _id: uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    };
    await updateProfile(auth.currentUser, {
      displayName: firstName + " " + lastName,
    });
    const db = await connectToDB();
    const result = await db.collection("users").insertOne(doc);
    await closeConnection();
    res.status(201).json({ userId: uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Session
    req.session.user = userCredentials.user;
    const db = await connectToDB();
    const result = await db
      .collection("users")
      .findOne({ _id: userCredentials.user.uid });
    await closeConnection();

    let isAdmin = "false";
    if (result.email === "admin@gmail.com") {
      isAdmin = "true";
      console.log(result);
      res.status(200).json({ user: result, isAdmin });
      return;
    }
    res.status(200).json({ user: result, isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
