"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_controller_1 = require("../../controllers/generate.controller");
const openai_1 = __importDefault(require("openai"));
//mock the openai client and method
jest.mock("openai");
const mockCreate = jest.fn();
openai_1.default.mockImplementation(() => ({
    chat: {
        completions: {
            create: mockCreate,
        },
    },
}));
describe("generate controller", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            body: {
                topic: "python",
                numQuestions: 5,
                difficulty: "easy",
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return status 400 if topic is empty", async () => {
        req.body.topic = " ";
        await (0, generate_controller_1.generate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "topic must be mentioned",
        });
    });
    it("should repsond with questions on success", async () => {
        const mockResponse = {
            choices: [
                {
                    message: {
                        tool_calls: [
                            {
                                function: {
                                    arguments: JSON.stringify({
                                        questions: [
                                            {
                                                question: "What is Rust primarily known for?",
                                                options: [
                                                    "Web development",
                                                    "System programming",
                                                    "Mobile app development",
                                                    "Game development",
                                                ],
                                                correct: 1,
                                            },
                                            {
                                                question: "Which keyword is used to create a new variable in Rust?",
                                                options: ["let", "var", "new", "def"],
                                                correct: 0,
                                            },
                                            {
                                                question: "In Rust, what is the ownership system used for?",
                                                options: [
                                                    "Memory safety",
                                                    "Graphics rendering",
                                                    "Networking",
                                                    "Database management",
                                                ],
                                                correct: 0,
                                            },
                                            {
                                                question: "Which of the following is a feature of Rust?",
                                                options: [
                                                    "Garbage collected",
                                                    "Null pointer exceptions",
                                                    "Ownership and borrowing",
                                                    "Dynamic typing",
                                                ],
                                                correct: 2,
                                            },
                                            {
                                                question: "How do you print to the console in Rust?",
                                                options: [
                                                    "print!()",
                                                    "echo()",
                                                    "println!()",
                                                    "console.log()",
                                                ],
                                                correct: 2,
                                            },
                                        ],
                                    }),
                                },
                            },
                        ],
                    },
                },
            ],
        };
        mockCreate.mockResolvedValueOnce(mockResponse);
        await (0, generate_controller_1.generate)(req, res, next);
        expect(mockCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            questions: expect.any(Array),
        });
    });
    it("should return 500 if tool_calls are missing", async () => {
        const mockReponse = {
            choices: [
                {
                    message: {
                        tool_calls: [],
                    },
                },
            ],
        };
        mockCreate.mockReturnValueOnce(mockReponse);
        await (0, generate_controller_1.generate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "internal server error",
        });
    });
    it("should call next(error) on exception", async () => {
        mockCreate.mockRejectedValueOnce(new Error("OpenAi failure"));
        await (0, generate_controller_1.generate)(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
