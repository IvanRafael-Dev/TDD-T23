import { UserModelGeneric } from './../../src/models/UserModel'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../src/api/app'
import sinon from 'sinon'

chai.use(chaiHttp)

// add user -> email, password, username
describe('POST /users', () => {
  describe('quando o email não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({})
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'o campo email é obrigatório' })
    })
  })

  describe('quando o password não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'valid-email@mail.com' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'o campo password é obrigatório' })
    })
  })

  describe('quando o username não é informado', () => {
    it('deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ email: 'valid-email@mail.com', password: 'any_password' })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ error: 'o campo username é obrigatório' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 201', async () => {
      sinon.stub(UserModelGeneric.prototype, 'create').resolves({
        id: 1,
        password: 'mock_any_pass',
        email: 'mock_any_email',
        username: 'mock_any_username'
      })

      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'valid-email@mail.com',
          password: 'any_password',
          username: 'any_username'
        })
      expect(httpResponse.status).to.equal(201)
      expect(httpResponse.body).to.have.all.keys(['id', 'email', 'username'])

      sinon.restore()
    })
  })
})
