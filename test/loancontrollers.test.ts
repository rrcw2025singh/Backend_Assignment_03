import request from "supertest";
import app from "../src/app";

describe("Loan Controllers", () => {
    it("should return all loans", async () => {
        // Arrange
        const endpoint = "/api/v1/loans";

        // Act
        const response = await request(app).get(endpoint);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan applications retrieved");
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return loan by id", async () => {
        // Arrange
        const endpoint = "/api/v1/loans/1";

        // Act
        const response = await request(app).get(endpoint);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("id");
        expect(response.body.data.id).toBe(1);
    });

    it("should return 404 for invalid loan id", async () => {
        // Arrange
        const endpoint = "/api/v1/loans/999";

        // Act
        const response = await request(app).get(endpoint);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body.error.code).toBe("LOAN_NOT_FOUND");
    });

    it("should create a new loan", async () => {
        // Arrange
        const endpoint = "/api/v1/loans";
        const newLoan = {
            applicant: "Test User",
            amount: 75000,
        };

        // Act
        const response = await request(app).post(endpoint).send(newLoan);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Loan application created");
        expect(response.body.data.applicant).toBe("Test User");
    });

    it("should update an existing loan", async () => {
        // Arrange
        const endpoint = "/api/v1/loans/1";
        const updatedData = {
            status: "under_review",
        };

        // Act
        const response = await request(app).put(endpoint).send(updatedData);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan application updated");
        expect(response.body.data.status).toBe("under_review");
    });

    it("should return 400 when update body is missing", async () => {
        // Arrange
        const endpoint = "/api/v1/loans/1";

        // Act
        const response = await request(app).put(endpoint);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error.code).toBe("REQUEST_BODY_REQUIRED");
    });

    it("should delete a loan", async () => {
        // Arrange
        const endpoint = "/api/v1/loans/2";

        // Act
        const response = await request(app).delete(endpoint);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Loan application deleted");
    });
});