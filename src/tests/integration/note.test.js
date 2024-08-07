const app = require('../../app')
const supertest = require('supertest')
const req = supertest(app)
const Note = require("../../models/note")

// Integration Tests programmatically test the API used by the application

describe('Add Note', () => {
    it('Should add a new note and redirect to login', async () => {
        // Delete the note if it exists before running the test
        await Note.deleteMany({ title: "[INTEGRATION TEST] New Note" });

        const res = await req
            .post('/')
            .send({
                title: "[INTEGRATION TEST] New Note",
                description: "This note was created at " + new Date(),
            })

        expect(res.statusCode).toEqual(302)
        expect(res.headers['location']).toEqual('/')

        // Check if the note was successfully added to the database
        expect(await Note.exists({ title: "[INTEGRATION TEST] New Note" })).toBe(true)

    })
})
