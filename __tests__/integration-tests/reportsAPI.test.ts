import 'jest'
import { FastifyInstance } from 'fastify'

import App from '../../src/App'

describe('report api integration tests', () => {
    let server : FastifyInstance
    beforeAll(() => { })

    beforeEach(async () => {
        
        server = await  App();

        server.ready();

        jest.clearAllMocks();
    })

    it("POST add report RETURNS 204", async () => {
        server.inject()
            .post('/api/clients/add')
            .body({
                name: "john doe",
                email: "addreport@test.com",
                phone: 12345,
            }).then(async data => {

                const param = data[0].client_id

                const response = await server.inject()
                    .post(`/api/reports/add/${param}`)
                
                    expect(response.statusCode).toEqual(204)
            })
        
    })

    it('GET report by client id RETURN 200 and report' , async () => {
        const response = await server.inject()
            .get('/api/reports/clientId/1')
    
    
        expect(response.statusCode).toEqual(200)
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                client_id: 1
            })
        )
    })

    it('GET report by report id RETURNS 200 and report with id == 1' , async () => {
        const response = await server.inject()
            .get('/api/reports/id/1')
    
        expect(response.statusCode).toEqual(200)
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                report_id: 1
            })
        )
    })

})