import request from "supertest";
import app from "../src/app";

describe("Health Controller", () => {
    it("should return API health status", async () => {
        // Arrange
        const endpoint = "/api/v1/health";

        // Act
        const response = await request(app).get(endpoint);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
        expect(response.body.status).toBe("OK");
    });
});