const request = require("supertest");
const { app } = require("../../backend/server");

describe("Authentication API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("email", "test@example.com");
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
