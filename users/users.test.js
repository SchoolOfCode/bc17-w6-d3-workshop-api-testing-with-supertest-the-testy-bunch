import request from "supertest";
import { test, expect, beforeEach } from "vitest";
import app from "../app.js";
import { resetUsersTable } from "../db/helpers.js";
import { seedData } from "../db/seed-data.js";


beforeEach( async() => {
  await resetUsersTable(seedData) 
});



test("Health check route should work!", async () => {
  let r = await request(app).get("/api/health");
  expect(r.statusCode).toBe(200);
  expect(r.body.success).toBe(true);
  expect(r.body.payload).toBe("API is running correctly");
  expect(r.headers["content-type"]).toBe("application/json; charset=utf-8");
});

test("Users route should be functional", async () => {
  let result = await request(app).get("/api/users");
  expect(result.statusCode).toBe(200);
  expect(result.body.success).toBe(true);

  expect(Array.isArray(result.body.payload)).toBe(true);
  expect("id" in result.body.payload[0]).toBe(true);
  expect(typeof result.body.payload[0].id === "number").toBe(true);

  expect("username" in result.body.payload[0]).toBe(true);
  expect(typeof result.body.payload[0].username === "string").toBe(true);

  expect(result.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
});

//we first checked if payload is actually an Array  expect(Array.isArray(result.body.payload)).toBe(true)

test("Check if the response for a single user is correct", async () => {
	let r = await request(app).get("/api/users/13");
	let b =  r.body;

	expect(r.statusCode).toBe(200);

	expect(b.success).toBe(true);

	expect(b.payload.id).toBe(13);

	expect(b.payload.username).toBe("Richard");

	expect(r.headers["content-type"]).toBe(
    "application/json; charset=utf-8"
  );
})
