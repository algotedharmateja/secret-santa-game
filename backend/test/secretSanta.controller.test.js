const request = require("supertest");
const app = require("../src/app");
const path = require("path");

describe("Secret Santa API", () => {
  test("POST /v1/secret-santa/assign should handle CSV file uploads", async () => {
    const response = await request(app)
      .post("/v1/secret-santa/assign")
      .attach("employees", path.resolve(__dirname, "mock-employees.csv"));

    expect(response.status).toBe(200);
  });

  test("POST /v1/secret-santa/assign should return 400 if no file is uploaded", async () => {
    const response = await request(app).post("/v1/secret-santa/assign");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No employees file uploaded!");
  });
});

