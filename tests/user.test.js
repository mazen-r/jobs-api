const request = require('supertest')
const app = require('../server')

describe("test user login", () => {
    test("it should responses with status 200", async () => {
        const res = await request(app).post('/api/v1/auth/login')
        .send({
            email: "test@email.com",
            password: "secret"
        })
        expect(res.status).toEqual(200)
    })
})