const request = require('supertest')
const app = require('../app')
const connectDB = require('../db/connect')

connectDB(process.env.MONGO_URI)

describe("test user login", () => {
    test("it should responses with status 200, json of user and token", () => {
        return request(app)
        .post("/login")
        .send({
            email: "test@email.com",
            password: "secret"
        })
        .then(res => {
            expect(res.statusCode).toBe(200)
        })
    })
})