const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const Users = require("../users/users-model.js");

router.post('/register', (req, res) => {
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.add(credentials)
    .then(user => {
      res.status(200).json({ data: user});
    })
    .catch(error => {
      res.status(500).json({ message: error.message})
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = createToken(user);

        res.status(200).json({ message: "Welcome to the API", token })
      } else {
        res.status(400).json({ message: "Invalid Login" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

function createToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

  const options = {
    expiresIn: "1d",
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
