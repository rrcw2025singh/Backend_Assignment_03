import request from "supertest";
import app from "../src/app";

describe("Loan API endpoints", () => {
    it("should return health check response", async () => {
        const response = await request(app).get("/api/v1/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body.version).toBe("1.0.0");
    });

    it("should return all loans", async () => {
        const response = await request(app).get("/api/v1/loans");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan applications retrieved");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return one loan by id", async () => {
        const response = await request(app).get("/api/v1/loans/1");

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
    });

    it("should create a new loan", async () => {
        const response = await request(app)
            .post("/api/v1/loans")
            .send({
                applicant: "Test User",
                amount: 75000,
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Loan application created");
        expect(response.body.data.applicant).toBe("Test User");
    });

    it("should update a loan", async () => {
        const response = await request(app)
            .put("/api/v1/loans/1")
            .send({
                status: "under_review",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan application updated");
        expect(response.body.data.status).toBe("under_review");
    });

    it("should delete a loan", async () => {
        const response = await request(app).delete("/api/v1/loans/2");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan application deleted");
    });
});