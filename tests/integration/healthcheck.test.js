const request = require("supertest");
const { app } = require("../../backend/server");

describe("Health Check", () => {
  it("should return 200 and status OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
  });
});
