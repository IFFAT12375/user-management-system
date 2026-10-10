const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "User Management API",
    version: "1.0.0",
    description:
      "Interactive API documentation. Protected routes require a bearer access token. " +
      "Register and login issue an HttpOnly refresh cookie, which the same-origin Swagger UI sends to refresh and logout.",
  },
  servers: [{ url: "/api", description: "Current backend origin" }],
  tags: [
    { name: "Authentication", description: "Registration, login, and session routes" },
    { name: "Users", description: "User management routes" },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a regular user",
        description: "Registration always creates a User role. The role cannot be selected by the caller.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "User registered and signed in",
            headers: {
              "Set-Cookie": {
                description: "HttpOnly refreshToken cookie",
                schema: { type: "string" },
              },
            },
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          409: { $ref: "#/components/responses/Conflict" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            headers: {
              "Set-Cookie": {
                description: "HttpOnly refreshToken cookie",
                schema: { type: "string" },
              },
            },
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/auth/refresh": {
      post: {
        tags: ["Authentication"],
        summary: "Refresh the access token",
        description: "Uses the HttpOnly refreshToken cookie issued by registration or login.",
        responses: {
          200: {
            description: "New access token issued",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            accessToken: { type: "string" },
                          },
                          required: ["accessToken"],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Log out",
        description: "Clears the refreshToken cookie.",
        responses: {
          200: { $ref: "#/components/responses/Success" },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get the current user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Current user retrieved",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            user: { $ref: "#/components/schemas/User" },
                          },
                          required: ["user"],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "List users",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Users fetched successfully",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: { $ref: "#/components/schemas/User" },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create a user (Admin only)",
        description: "Creates a regular User. Extra fields, including role, are rejected.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateUserRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserSuccessResponse" },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          409: { $ref: "#/components/responses/Conflict" },
        },
      },
    },
    "/users/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "MongoDB user ID",
          schema: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
        },
      ],
      get: {
        tags: ["Users"],
        summary: "Get user details",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "User fetched successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserSuccessResponse" },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update user details (Admin only)",
        description: "Only name and email can be updated. Role and password are not accepted.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateUserRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserSuccessResponse" },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete a user (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { $ref: "#/components/responses/Success" },
          400: { $ref: "#/components/responses/BadRequest" },
          401: { $ref: "#/components/responses/Unauthorized" },
          403: { $ref: "#/components/responses/Forbidden" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Paste the accessToken returned by register, login, or refresh.",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", minLength: 2, maxLength: 50, example: "Alex User" },
          email: { type: "string", format: "email", example: "alex@example.com" },
          password: { type: "string", minLength: 6, format: "password", example: "secret123" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "alex@example.com" },
          password: { type: "string", format: "password", example: "secret123" },
        },
      },
      CreateUserRequest: {
        type: "object",
        required: ["name", "email", "password"],
        additionalProperties: false,
        properties: {
          name: { type: "string", minLength: 2, maxLength: 50, example: "Sam User" },
          email: { type: "string", format: "email", example: "sam@example.com" },
          password: { type: "string", minLength: 6, format: "password", example: "secret123" },
        },
      },
      UpdateUserRequest: {
        type: "object",
        minProperties: 1,
        additionalProperties: false,
        properties: {
          name: { type: "string", minLength: 2, maxLength: 50, example: "Updated Name" },
          email: { type: "string", format: "email", example: "updated@example.com" },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1f77bcf86cd799439011" },
          name: { type: "string", example: "Alex User" },
          email: { type: "string", format: "email", example: "alex@example.com" },
          role: { type: "string", enum: ["Admin", "User"], example: "User" },
        },
        required: ["_id", "name", "email", "role"],
      },
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: {},
        },
        required: ["success", "message", "data"],
      },
      AuthResponse: {
        allOf: [
          { $ref: "#/components/schemas/SuccessResponse" },
          {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  user: { $ref: "#/components/schemas/User" },
                  accessToken: { type: "string" },
                },
                required: ["user", "accessToken"],
              },
            },
          },
        ],
      },
      UserSuccessResponse: {
        allOf: [
          { $ref: "#/components/schemas/SuccessResponse" },
          {
            type: "object",
            properties: {
              data: { $ref: "#/components/schemas/User" },
            },
          },
        ],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          errors: { nullable: true },
        },
        required: ["success", "message", "errors"],
      },
    },
    responses: {
      Success: {
        description: "Request succeeded",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SuccessResponse" },
          },
        },
      },
      BadRequest: {
        description: "Validation failed",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Unauthorized: {
        description: "Authentication is required or credentials are invalid",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Forbidden: {
        description: "Admin access is required",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Conflict: {
        description: "A user with the supplied email already exists",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      ServerError: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
    },
  },
};

module.exports = openapiSpec;
