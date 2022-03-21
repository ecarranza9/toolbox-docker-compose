/* eslint-env mocha */
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'

chai.should()
chai.use(chaiHttp)

describe('Files API', () => {
  // Test GET File Data
  describe('GET /files/data', () => {
    it('it should GET a valid files data', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((err, res) => {
          if (err) return done(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.equal(4)
          expect(res.body[0]).to.have.property('file')
          expect(res.body[0]).to.have.property('lines').to.be.an('array')
          done()
        })
    })
    it('it should GET a specific file data and this is invalid', (done) => {
      chai.request(app)
        .get('/files/data')
        .query({ fileName: 'test1.csv' })
        .end((err, res) => {
          if (err) return done(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          expect(res.body).not.have.property('file')
          expect(res.body).not.have.property('lines')
          done()
        })
    })
    it('it should GET a specific file data and this is valid', (done) => {
      chai.request(app)
        .get('/files/data')
        .query({ fileName: 'test3.csv' })
        .end((err, res) => {
          if (err) return done(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          expect(res.body[0]).to.have.property('file')
          expect(res.body[0]).to.have.property('lines')
          expect(res.body[0].lines[0]).to.have.property('text').to.be.a('string')
          expect(res.body[0].lines[0]).to.have.property('number').to.be.a('number')
          expect(res.body[0].lines[0]).to.have.property('hex').to.be.a('string').lengthOf(32)
          done()
        })
    })
  })
})
