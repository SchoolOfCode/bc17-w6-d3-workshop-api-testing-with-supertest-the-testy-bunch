import request from "supertest";
import { test, expect } from "vitest";
import app from "../app.js";
import {resetUsersTable} from "../db/helpers.js";

test("Health check route should work!", async () => {

	let r = await request(app).get("/api/health");
	expect(r.statusCode).toBe(200);
	expect(r.body.success).toBe(true)
	expect(r.body.payload).toBe("API is running correctly")
	expect(r.headers["content-type"]).toBe("application/json; charset=utf-8")

})


test("Users route should be functional", async () => {
	
	let result = await request(app).get("/api/users");
	expect(result.statusCode).toBe(200);
    expect(result.body.success).toBe(true)
	expect(Array.isArray(result.body.payload)).toBe(true)
	expect('id' in result.body.payload[0]).toBe(true)
	expect('username' in result.body.payload[0]).toBe(true)
	expect(result.headers["content-type"]).toBe("application/json; charset=utf-8")
})
 
 
//we first checked if payload is actually an Array  expect(Array.isArray(result.body.payload)).toBe(true)