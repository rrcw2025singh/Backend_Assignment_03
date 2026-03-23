import { authorize } from "../src/api/v1/middleware/authorize";

describe("authorize middleware", () => {
    const mockRes: any = {};
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should allow access when user role is allowed", () => {
        // Arrange
        const req: any = {
            user: {
                uid: "abc123",
                role: "admin",
            },
        };

        const middleware = authorize({ allowedRoles: ["admin"] });

        // Act
        middleware(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalledWith();
    });

    it("should deny access when user is missing", () => {
        // Arrange
        const req: any = {};

        const middleware = authorize({ allowedRoles: ["admin"] });

        // Act
        middleware(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("User is not authenticated");
    });

    it("should deny access when role is missing", () => {
        // Arrange
        const req: any = {
            user: {
                uid: "abc123",
            },
        };

        const middleware = authorize({ allowedRoles: ["admin"] });

        // Act
        middleware(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("User role is missing");
    });

    it("should deny access when role is not allowed", () => {
        // Arrange
        const req: any = {
            user: {
                uid: "abc123",
                role: "user",
            },
        };

        const middleware = authorize({ allowedRoles: ["admin"] });

        // Act
        middleware(req, mockRes, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        const error = mockNext.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: insufficient permissions");
    });
});