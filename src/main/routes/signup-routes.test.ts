import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    beforeAll(async () => {
      await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    beforeEach(async () => {
      const accountCollection = MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
    })

    await request(app)
      .post('/api/signup')
      .send({
        name: 'Leandro',
        email: 'leandro@gmail.com',
        password: '123',
        password_confirmation: '123'
      })
      .expect(200)
  })
})
