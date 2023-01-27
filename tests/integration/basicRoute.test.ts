import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../src/api/app'

chai.use(chaiHttp)

describe('Teste de rota básica', () => {
  describe('GET /', () => {
    it('deve retornar um status 200 com uma mensagem de "ok"', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: 'ok' })
    })
  })
})
