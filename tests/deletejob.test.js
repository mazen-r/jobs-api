const request = require('supertest')
const app = require('../server')

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZhY2Y4NjI2NmEwYmZkNTlmNDBjYmQiLCJuYW1lIjoidGVzdCIsImlhdCI6MTY2MDY1Mzk2OH0.qX8-fkAaHmA7zcaN-c0Ep5KByAU3Fzx9ljU66wecAeQ'

describe("Delete a Job", () => {

    test("it should response with status 200", async () => {
        const res = await request(app).delete('/api/v1/jobs/62fb925453dceceb2e247a65') // delete a job
        .set(
            'Authorization', `Bearer ${token}`
        )
        expect(res.status).toEqual(200)
    })
    
    test("it should response with 401", async () => {
        const res = await request(app).delete('/api/v1/jobs/62fb925453dceceb2e247a65') // delete a job without authorization
        expect(res.status).toEqual(401)
        expect(res.text).toEqual('{"msg":"Authentication invalid"}')
    })    
})