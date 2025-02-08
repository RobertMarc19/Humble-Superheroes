const express = require("express");
const router = express.Router();

let database = [];

router.post("/superheroes/save", (req, res) => {
  //save the heroes, superpowers and humblescores in the database
  const { superhero, superpower, humblescore } = req.body;
  const exists = database.some(hero => hero.superhero.toLowerCase() === superhero.toLowerCase()); //Check if the superhero already exists (Batman and batman are the same)

  if (exists) {
    return res.status(400).json({ error: "This superhero already exists!" });
  }
  database.push({ superhero, superpower, humblescore: Number(humblescore) });
  res.send({ message: "Superhero saved successfully" });
});

router.get("/superheroes/display", (req, res) => {
  // Sort the heroes by humblescore
  let sortedHeroes = database.sort((a, b) => b.humblescore - a.humblescore);
  res.json(sortedHeroes);
});

module.exports = router;
module.exports.database = database;
