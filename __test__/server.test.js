// const supertest = require("supertest");
// const { app } = require("../src/server");
// const { users } = require("../src/auth/models/index");
// const bcrypt = require("bcrypt");

// const request = supertest(app);

// describe("Authentication Routes", () => {
//   beforeEach(async () => {
//     await users.destroy({ where: {} });
//   });

//   it("should create a new user on POST /signup", async () => {
//     const response = await request.post("/signup").send({
//       username: "testuser",
//       password: "testpassword",
//     });

//     expect(response.status).toBe(201);
//     expect(response.body.username).toBe("testuser");
//   });

//   it("should authenticate a user on POST /signin", async () => {
//     const hashedPassword = await bcrypt.hash("testpassword", 5);
//     await users.create({ username: "testuser", password: hashedPassword });

//     const response = await request
//       .post("/signin")
//       .set(
//         "Authorization",
//         "Basic " + Buffer.from("testuser:testpassword").toString("base64")
//       )
//       .send();

//     expect(response.status).toBe(201);
//     expect(response.body.user.username).toBe("testuser");
//   });
// });
