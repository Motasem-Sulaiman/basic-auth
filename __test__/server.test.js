const { app } = require("../src/server");
const { db } = require("../src/auth/models/index");
const supertest = require("supertest");
const mockServerMethods = supertest(app);

beforeAll(async () => {
  await db.sync();
});

describe("Authentication Routes", () => {
  describe("POST /signup", () => {
    test("should create a new user", async () => {
      const response = await mockServerMethods
        .post("/signup")
        .send({ username: "testuser", password: "testpassword" });

      expect(response.status).toBe(201);
      expect(response.body.username).toBe("testuser");
    });
  });

  describe("POST /signin", () => {
    test("should return the user object on successful login", async () => {
      const response = await mockServerMethods
        .post("/signin")
        .set(
          "Authorization",
          `Basic ${Buffer.from("testuser:testpassword").toString("base64")}`
        );

      expect(response.status).toBe(201);
      expect(response.body.user.username).toBe("testuser");
    });

    test('should return "Invalid Login" on unsuccessful login', async () => {
      const response = await mockServerMethods
        .post("/signin")
        .set(
          "Authorization",
          `Basic ${Buffer.from("testuser:wrongpassword").toString("base64")}`
        );

      expect(response.status).toBe(500);
      expect(response.text).toBe("wrong username or password");
    });
  });
});
afterAll(async () => {
  await db.drop();
});
