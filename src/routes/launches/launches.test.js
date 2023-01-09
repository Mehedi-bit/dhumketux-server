const request = require('supertest')
const app = require('../../app')

const { 
    mongoConnect, 
    mongoDisconnect 
} = require('../../services/mongo')


describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    describe('Test GET /launches', () => {
        test('It should be response with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'ASIA Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'March 28, 2030',
        }
    
        const launchDataWithoutDate = {
            mission: 'ASIA Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
        }
    
        const launchDataWithInvalidDate = {
            mission: 'ASIA Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'abx',
        }
    
        test('It should be response with 201 created', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201)
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            expect(responseDate).toBe(requestDate)
    
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)
            
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            })
        })
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400)
            
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            })
        })
    })
})