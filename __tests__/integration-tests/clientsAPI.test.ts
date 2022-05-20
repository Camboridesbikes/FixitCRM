import 'jest'
import { FastifyInstance } from 'fastify'

import App from '../../src/App'

describe('client api integration tests', () => {
    let server : FastifyInstance
    beforeAll(() => { })

    beforeEach(async () => {
        
        server = await  App();

        server.ready();

        jest.clearAllMocks();
    })

    it("POST add client RETURNS 200 and client id", async () => {
        const response = await server.inject()
            .post('/api/clients/add')
            .body({
                name: "testy testerson",
                email: "test@test.com",
                phone: 12345,
            })
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)[0]).toEqual({
            client_id: expect.any(Number)
        })
    })

    it("GET all clients RETURNS 200 and client names", async () => {
        const response = await server.inject({method: 'GET', url: '/api/clients/all'})

        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(response.body)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    client_name: "testy testerson",
                    email: "test@test.com",
                    phone_number: 12345,
                    client_id: expect.any(Number)
                })
            ])
        )
    })

    it("GET client by id RETURNS 200 and client info", async () => {
        
        const response = await server.inject()
            .get(`/api/clients/id/1`)
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    client_name: "testy testerson",
                    email: "test@test.com",
                    phone_number: 12345,
                    client_id: expect.any(Number)
                })
            ])
        )
        
    })

    it('GET clients by name RETURNS 200 and named client by name of testy testerson', async () => {
        const response = await server.inject()
            .get(`/api/clients/name/testy`)
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)[0]).toEqual(
                expect.objectContaining({
                    client_name: "testy testerson",
                    email: "test@test.com",
                    phone_number: 12345,
                    client_id: expect.any(Number)
                })
        )
    })

    it('GET clients by name RETURNS 200 and both clients testy and john', async () => {
        //
        server.inject()
            .post('/api/clients/add')
            .body({
                name: "john testerson",
                email: "test2@test.com",
                phone: 12345,
            }).then( async () => {

        const response = await server.inject()
            .get(`/api/clients/name/testy`)
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    client_name: "testy testerson",
                    email: "test@test.com",
                    phone_number: 12345,
                    client_id: expect.any(Number)
                }),
                expect.objectContaining({
                    client_name: "testy testerson",
                    email: "test@test.com",
                    phone_number: 12345,
                    client_id: expect.any(Number)
                }),
            ])
        )
    })
    })
})
