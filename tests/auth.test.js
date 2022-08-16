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
    
    test("it should return invalid credentials with status 401", async () => {
        const res = await request(app).post('/api/v1/auth/login')
        .send({
            email:"test@email.com",
            password: "wrongpass"
        })
        expect(res.status).toEqual(401)
        expect(res.text).toEqual('{"msg":"Invalid Credentials"}')
    })

    test("it should return Please provide email and password with status 400", async () => {
        const res = await request(app).post('/api/v1/auth/login')
        .send({
            email:"test@email.com"
        })
        expect(res.status).toEqual(400)
        expect(res.text).toEqual('{"msg":"Please provide email and password"}')
    })
})

describe("test user register", () => {

    test("it should return status 200", async () => {
        const res = await request(app).post('/api/v1/auth/register')
        .send({
            name: "mazen",
            email: "test2@email.com",
            password: "secret"
        })
        expect(res.status).toEqual(201)
    })

    test("it should return status 500", async () => {
        const res = await request(app).post('/api/v1/auth/register')
        .send({
            name: "mazen"
        })
        expect(res.status).toEqual(500)
    })
})