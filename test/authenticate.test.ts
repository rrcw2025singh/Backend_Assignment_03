import { authenticate } from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    const mockRes: any = {};
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call next with AuthenticationError when authorization header is missing", async () => {
        // Arrange
        const req: any = {
            headers: {},
        };

        // Act
        await authenticate(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("Missing or invalid authorization token");
    });

    it("should attach user and call next when token is valid", async () => {
        // Arrange
        const req: any = {
            headers: {
                authorization: "Bearer valid-token",
            },
        };

        (auth.verifyIdToken as jest.Mock).mockResolvedValue({
            uid: "abc123",
            email: "admin@test.com",
            admin: true,
            role: "admin",
        });

        // Act
        await authenticate(req, mockRes, mockNext);

        // Assert
        expect(req.user).toEqual({
            uid: "abc123",
            email: "admin@test.com",
            admin: true,
            role: "admin",
        });
        expect(mockNext).toHaveBeenCalledWith();
    });

    it("should call next with AuthenticationError when token is expired", async () => {
        // Arrange
        const req: any = {
            headers: {
                authorization: "Bearer expired-token",
            },
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValue({
            code: "auth/id-token-expired",
        });

        // Act
        await authenticate(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("Token has expired");
    });

    it("should call next with AuthenticationError when token is invalid", async () => {
        // Arrange
        const req: any = {
            headers: {
                authorization: "Bearer invalid-token",
            },
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValue({
            code: "auth/argument-error",
        });

        // Act
        await authenticate(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("Invalid authorization token");
    });
});