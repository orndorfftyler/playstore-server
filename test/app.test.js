	const supertest = require('supertest');
	const app = require('../app');
	const { expect } = require('chai');
    
    /* Testing plan: (I'm a little pressed for time - not sure I'll get to all these)
if (!sort && !genres) (separate suite)
 - 1 case to test format of response when no query params supplied
if (sort && !genres) (separate suite)
 - 1 case with incorrect sort param
 - 1 case with correct sort param
if (!sort && genres) (separate suite)
 - 1 case with incorrect genres param
 - 1 case with correct genres param
if (sort && genres) (separate suite)
 - 1 case with incorrect sort param
 - 1 case with incorrect genres param
 - 1 case with correct sort and genres params
    */

	describe('GET /apps (!sort && !genres)', () => {
	  it('should return an array of apps', () => {
	    return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)

            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Genres'
                );

        })
    })


});


describe('GET /apps (sort && !genres)', () => {

    it('VALID SORT should return an array of apps', () => {
      return supertest(app)
          .get('/apps')
          .query({ sort: 'Rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.lengthOf.at.least(1);
              const app = res.body[0];
              expect(app).to.include.all.keys(
                  'App', 'Category', 'Rating', 'Genres'
              );

      })
  })

    it('INVALID SORT should return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'aRting' })
            .expect(400, 'Sort must be one of rating or app');})


})

describe('GET /apps (!sort && genres)', () => {

    it('VALID GENRES should return an array of apps', () => {
      return supertest(app)
          .get('/apps')
          .query({ genres: 'Action' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.lengthOf.at.least(1);
              const app = res.body[0];
              expect(app).to.include.all.keys(
                  'App', 'Category', 'Rating', 'Genres'
              );

      })
  })

    it('INVALID GENRES should return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Murder-Mysterby' })
            .expect(400, 'Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');})


})

describe('GET /apps (sort && genres)', () => {

    it('VALID SORT VALID GENRES should return an array of apps', () => {
      return supertest(app)
          .get('/apps')
          .query({ genres: 'Action', sort:'Rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.lengthOf.at.least(1);
              const app = res.body[0];
              expect(app).to.include.all.keys(
                  'App', 'Category', 'Rating', 'Genres'
              );

      })
    })

    it('INVALID GENRES VALID SORT should return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Murder-Mysterby', sort:'Rating' })
            .expect(400, 'Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');})

    it('VALID GENRES INVALID SORT should return 400', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'Action', sort:'Edibility' })
            .expect(400, 'Sort must be one of rating or app');})
                

})
