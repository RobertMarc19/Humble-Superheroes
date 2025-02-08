const request = require("supertest");
const express = require("express");
const router  = require("../routes/superheroes");
const { database } = require("../routes/superheroes");

const app = express();
app.use(express.json());
app.use("/", router);
router.use(express.json());

beforeEach(() => {
  database.length = 0;
});

describe("POST /superheroes/save", () => {
  it("should return 400 if the superhero already exists", async () => {
    database.push({ superhero: "Batman", superpower: "Detective skills", humblescore: 10 });

    const response = await request(app)
      .post("/superheroes/save")
      .send({ superhero: "Batman", superpower: "Detective skills", humblescore: 10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("This superhero already exists!");
  });

  it("should save a new superhero successfully", async () => {
    const response = await request(app)
      .post("/superheroes/save")
      .send({ superhero: "Superman", superpower: "Super strength", humblescore: 8 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Superhero saved successfully");
  });
});

describe("GET /superheroes/display", () => {
    it("should return a list of superheroes", async () => {
      database.push({ superhero: "Batman", superpower: "Detective skills", humblescore: 10 });
      database.push({ superhero: "Superman", superpower: "Super strength", humblescore: 8 });
  
      const response = await request(app).get("/superheroes/display");
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].superhero).toBe("Batman");
      expect(response.body[1].superhero).toBe("Superman");
    }); 
  });