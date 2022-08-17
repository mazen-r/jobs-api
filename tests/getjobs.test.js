const request = require('supertest')
const app = require('../server')

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZhY2Y4NjI2NmEwYmZkNTlmNDBjYmQiLCJuYW1lIjoidGVzdCIsImlhdCI6MTY2MDY1Mzk2OH0.qX8-fkAaHmA7zcaN-c0Ep5KByAU3Fzx9ljU66wecAeQ'

describe("GET Jobs", () => {

    test("it should response with status 200", async () => {
        const res = await request(app).get('/api/v1/jobs') // get all jobs
        .set(
            'Authorization', `Bearer ${token}` 
        )
        expect(res.status).toEqual(200)
    })

    test("it should reponse with 200", async () => {
        const res = await request(app).get('/api/v1/jobs/62fb925453dceceb2e247a65') // get job with id
        .set(
            'Authorization', `Bearer ${token}`
        )
        expect(res.status).toEqual(200)
    })

    test("it should response with 401", async () => {
        const res = await request(app).get('/api/v1/jobs/') // getting job without authorization
        expect(res.status).toEqual(401)
    })
  
    test("it should return 404", async () => {
        const res = await request(app).get('/api/v1/jobs/62fb925453dceceb2e247a61') // get a job with wrong id
        .set(
            'Authorization', `Bearer ${token}`
        )
        expect(res.status).toEqual(404)
    })
})