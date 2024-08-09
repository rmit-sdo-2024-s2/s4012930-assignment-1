const mockingoose = require('mockingoose');
const Note = require("../../models/note")

// Unit Tests only test the validation built into Note

describe('mockingoose', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks()
    })

    describe("Test Both Fields Are Set", () => {
        it('Throw validation error (Description Empty)', async () => {
            const todo = new Note({
                title: "Task Note",
                description: "" // "invalid description, it should be at least 1 character long"
            });

            const result = await todo.validateSync();
            expect(result.errors.description).toBeDefined(); // expect an error
        });

        it('pass validation (Both Fields Are Set)', async () => {
            const todo = new Note({
                title: "Task Note",
                description: "This is a description!" // "valid description with at least 1 character"
            });

            const result = await todo.validateSync();
            expect(result).toBeUndefined(); // expect no error
        });
    })
})
