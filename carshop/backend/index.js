const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const db = require("./database.js");
let users = db.users;

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

require("./passport.js");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        let time = new Date(decoded.exp * 1000);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length? users.users[users.users.length - 1].id + 1: 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

  let cars = {
      list: [
        { "id": 1, "brand": "BENZ","model": "#963471","color": "Black" ,"price": 1800000, "src":"/./pic/1.png"},
        { "id": 2, "brand": "BMW","model": "#789145","color": "White" ,"price": 2100000, "src":"/./pic/2.png"},
        { "id": 3, "brand": "TOYOTA","model": "#843271","color": "Red" ,"price": 1799000, "src":"/./pic/3.png"},
        { "id": 4, "brand": "HONDA","model": "#432186","color": "Blue" ,"price": 839000, "src":"/./pic/4.png"},
        { "id": 5, "brand": "MITSUBISHI","model": "#527439","color": "Orange" ,"price": 960000, "src":"/./pic/5.png"}]
    }
  
  router
    .route("/cars")
    .get((req, res) => {
      res.send(cars);
    })
    .post((req, res) => {
      console.log(req.body);
      let newcar = {};
      newcar.id = cars.list.length ? cars.list[cars.list.length - 1].id + 1 : 1;
      newcar.brand = req.body.brand;
      newcar.model= req.body.model;
      newcar.color = req.body.color;
      newcar.price= req.body.price;
      newcar.src= req.body.src;
      cars = { list: [...cars.list, newcar] };
      res.json(cars);
    });
  
  router
    .route("/cars/:carid")
    .get((req, res) => {
      let id = cars.list.findIndex((item) => +item.id == +req.params.carid)
      res.json(cars.list[id]);
    })
    .put((req, res) => {
      let id = cars.list.findIndex((item) => item.id == +req.params.carid);
      cars.list[id].brand = req.body.brand;
      cars.list[id].model = req.body.model;
      cars.list[id].color = req.body.color;
      cars.list[id].price = req.body.price;
      cars.list[id].src = req.body.src;
      res.json(cars.list);
    })
    .delete((req, res) => {
      cars.list = cars.list.filter((item) => +item.id !== +req.params.carid);
      res.json(cars.list);
    });
  
  
  router.route("/purchase/:carId")
  .post((req,res) => {
    let id = cars.list.findIndex((item) => +item.id == +req.params.carId)
    if (id == -1) {
      res.json({message: "Car not found"})
    }
    else {
      cars.list = cars.list.filter((item) => +item.id !== +req.params.carId);
      res.json(cars.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));