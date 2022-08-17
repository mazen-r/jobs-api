const { EXPECTATION_FAILED } = require('http-status-codes')
const request = require('supertest')
const app = require('../server')

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZhY2Y4NjI2NmEwYmZkNTlmNDBjYmQiLCJuYW1lIjoidGVzdCIsImlhdCI6MTY2MDY1Mzk2OH0.qX8-fkAaHmA7zcaN-c0Ep5KByAU3Fzx9ljU66wecAeQ'

describe("POST Job", () => {

    test("it should response with status 204", async () => {
        const res = await request(app).post('/api/v1/jobs') // create a job
        .set(
            'Authorization', `Bearer ${token}`
        )
        .send({
            position: "Dragon lvl Developer",
            company: "some company"
        })
        expect(res.status).toEqual(201)
    })
    
    test("it should response with 401", async () => {
        const res = await request(app).post('/api/v1/jobs') // post a job without authorization
        expect(res.status).toEqual(401)
        expect(res.text).toEqual('{"msg":"Authentication invalid"}')
    })    

    test("it should return Please providde position and company with status 400", async () => {
        const res = await request(app).post('/api/v1/jobs') // update a jon with no position and company
        .set(
            'Authorization', `Bearer ${token}`
        )        
        .send({
            position:"Dragon lvl Developer",
            company: ""
        })
        expect(res.status).toEqual(400)
        expect(res.text).toEqual('{"msg":"Company or Position fields cannot be empty"}')
    })
})