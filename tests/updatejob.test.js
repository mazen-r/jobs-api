const request = require('supertest')
const app = require('../server')

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZhY2Y4NjI2NmEwYmZkNTlmNDBjYmQiLCJuYW1lIjoidGVzdCIsImlhdCI6MTY2MDY1Mzk2OH0.qX8-fkAaHmA7zcaN-c0Ep5KByAU3Fzx9ljU66wecAeQ'

describe("Update a Job", () => {

    test("it should response with status 200", async () => {
        const res = await request(app).patch('/api/v1/jobs/62fb925453dceceb2e247a65') // update a job
        .set(
            'Authorization', `Bearer ${token}`
        )
        .send({
            position: "Dragon Master lvl Developer",
            company: "some company"
        })
        expect(res.status).toEqual(200)
    })
    
    test("it should response with 401", async () => {
        const res = await request(app).patch('/api/v1/jobs/62fb925453dceceb2e247a65') // update a job without authorization
        .send({
            position: "Dragon Master lvl Developer",
            company: "some company"
        })
        expect(res.status).toEqual(401)
        expect(res.text).toEqual('{"msg":"Authentication invalid"}')
    })    

    test("it should return Please providde position and company with status 400", async () => {
        const res = await request(app).patch('/api/v1/jobs/62fb925453dceceb2e247a65') // update a job with no position and company
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