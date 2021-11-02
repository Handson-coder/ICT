const app = require("../app");
const request = require("supertest");
const { Movie, sequelize } = require("../models");
const { queryInterface } = sequelize;

const movie = {
  title: "Test 1",
  synopsis: "Test 1 synopsis",
  trailerUrl: 'https://www.imdb.com/video/vi3446716441?playlistId=tt6644200&ref_=tt_ov_vihttps://www.imdb.com/video/vi862634009?playlistId=tt4574334&ref_=tt_pr_ov_vi',
  imgUrl: "https://ik.imagekit.io/iefyzkif2xd/Money_Heist_ySF2iDRw7.jpg",
  rating: 10,
  genre: "Action",
  price: 55000
}

const baseUrl = "/movies";
let movieId;

describe("GET /movies [CASE SUCCESS]", () => {
  beforeAll((done) => {
    Movie.create(movie)
      .then((result) => {
        movieId = result.dataValues.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Movies", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test('Should return object with id, title, synopsis, trailerUrl, imgUrl, rating, genre, status code 200', (done) => {
    request(app)
      .get(baseUrl)
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(200);
        response.body.forEach((movie) => {
          expect(movie.id).toStrictEqual(expect.any(Number))
          expect(movie.title).toStrictEqual(movie.title)
          expect(movie.synopsis).toStrictEqual(movie.synopsis)
          expect(movie.trailerUrl).toStrictEqual(movie.trailerUrl)
          expect(movie.imgUrl).toStrictEqual(movie.imgUrl)
          expect(movie.rating).toStrictEqual(movie.rating)
          expect(movie.genre).toStrictEqual(movie.genre)
          expect(movie.price).toStrictEqual(movie.price)
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
})

describe("GET /movies/:id [CASE SUCCESS]", () => {
  beforeAll((done) => {
    Movie.create(movie)
      .then((result) => {
        movieId = result.dataValues.id;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Movies", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test('Should return object with id, title, synopsis, trailerUrl, imgUrl, rating, genre, status code 200', (done) => {
    request(app)
      .get(baseUrl + `/${movieId}`)
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.id).toStrictEqual(expect.any(Number))
        expect(response.body.title).toStrictEqual(movie.title)
        expect(response.body.synopsis).toStrictEqual(movie.synopsis)
        expect(response.body.trailerUrl).toStrictEqual(movie.trailerUrl)
        expect(response.body.imgUrl).toStrictEqual(movie.imgUrl)
        expect(response.body.rating).toStrictEqual(movie.rating)
        expect(response.body.genre).toStrictEqual(movie.genre)
        expect(response.body.price).toStrictEqual(movie.price)
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET movies/:id [CASE FAILED]", () => {
  test("Should return object with message 'Data not found', status code 404", (done) => {
    request(app)
      .get(baseUrl + "/0")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Data not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});