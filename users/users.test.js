import request from "supertest";
import { test, expect } from "vitest";
import app from "../app.js";
import { json } from "express";


test("Health check route should work!", async () => {

	let r = await request(app).get("/api/health");
	expect(r.statusCode).toBe(200);
	expect(r.body.success).toBe(true)
	expect(r.body.payload).toBe("API is running correctly")
	expect(r.headers["content-type"]).toBe("application/json; charset=utf-8")

})

