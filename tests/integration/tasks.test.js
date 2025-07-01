const request = require("supertest");
const { app } = require("../../backend/server");

describe("Tasks API", () => {
  let token;
  let createdTaskId;

  beforeAll(async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "password",
    });
    token = response.body.token;
  });

  it("should fetch all tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "Test Task",
      description: "Created during test",
      priority: "high",
    };

    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.status).toBe("todo");

    createdTaskId = response.body.id;
  });

  it("should get a single task by ID", async () => {
    const response = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdTaskId);
  });

  it("should update a task", async () => {
    const updates = {
      status: "in-progress",
      description: "Updated description",
    };

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updates);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "in-progress");
    expect(response.body).toHaveProperty("description", "Updated description");
  });

  it("should delete a task", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getResponse.status).toBe(404);
  });
});
