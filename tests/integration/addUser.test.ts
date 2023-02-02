import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../src/api/app'
import sinon from 'sinon'
import { User } from '../../src/database/models/User'

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

  describe('quando o email já está cadastrado no banco de dados', () => {
    const newUserMock = {
      id: 1,
      username: 'any_username',
      email: 'any_user@mail.com',
      password: 'any_pass'
    }

    afterEach(sinon.restore)

    it('deve retornar um status 409', async () => {
      sinon.stub(User, 'findOne').resolves(newUserMock as User)

      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'valid-email@mail.com',
          password: 'valid_any_password',
          username: 'valid_any_username'
        })
      expect(httpResponse.status).to.equal(409)
      expect(httpResponse.body).to.deep.equal({ error: 'O email já está cadastrado' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    const newUserMock = {
      id: 1,
      username: 'any_username',
      email: 'any_user@mail.com',
      password: 'any_pass'
    }

    const { password: _, ...userWithoutPass } = newUserMock

    afterEach(() => { sinon.restore() })

    it('deve retornar um status 201', async () => {
      sinon.stub(User, 'findOne').resolves(null)
      sinon.stub(User, 'create').resolves(newUserMock as User)

      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({
          email: 'valid-email@mail.com',
          password: 'valid_any_password',
          username: 'valid_any_username'
        })
      expect(httpResponse.status).to.equal(201)
      expect(httpResponse.body).to.have.all.keys(['id', 'email', 'username'])
      expect(httpResponse.body).not.have.property('password')
      expect(httpResponse.body).to.deep.equal(userWithoutPass)
    })
  })
})
