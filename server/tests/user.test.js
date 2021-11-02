const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize;
// const { signToken } = require("../helpers/jwt");

const user = {
  username: "testing bosku",
  email: "test1@mail.com",
  password: "rahasia123"
};

const user2 = {
  username: "testing bossku",
  email: "test2@mail.com",
  password: "rahasia123"
};

// let userToken1, userToken2;
// let invalidToken =
//   "22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0-KbuFv7vvsZsciDBKSDugxIX19g";

describe("POST /users/register [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user2)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Should return object with id, username, email, with status code 201", (done) => {
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty(
          "username",
          user.username
        );
        expect(response.body).toHaveProperty("email", user.email);
        expect(response.body).not.toHaveProperty("password", user.password);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/register [CASE FAILED]", () => {
  beforeAll((done) => {
    User.create(user2)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Username is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      username: null,
      email: "test2@mail.com",
      password: "rahasia123"
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Username is required"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Username is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      username: "",
      email: "test2@mail.com",
      password: "rahasia123"
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Username is required"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      username: "testing bossku",
      email: "test2@mail.com",
      password: null,
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Password is required"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Password is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      username: "testing bossku",
      email: "test2@mail.com",
      password: "",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Password is required", "Min Length of Password is 5 or Max Length of Password is 30"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      username: "testing bossku",
      email: null,
      password: "rahasia123",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Email is required"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Email is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      username: "testing bossku",
      email: "",
      password: "rahasia123",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format", "Email is required"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email already registered, should return bad request message, status code 400", (done) => {
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(user2)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: `${user2.email} already registered`, //based on file error handler
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Must be email format, should return bad request message, status code 400", (done) => {
    const userFailed = {
      username: "testing bossku",
      email: "test1",
      password: "rahasia123"
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/login [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Should return object with id, email, role, status code 200", (done) => {
    const userSuccess = {
      email: "test1@mail.com",
      password: "rahasia123",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(userSuccess)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty(
          "password",
          userSuccess.password
        );
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", userSuccess.email);
        expect(response.body).toHaveProperty("username", user.username);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/login [CASE FAILED]", () => {
  test("Email is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: "test2@mail.com",
      password: "rahasia123",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "Email/Password is wrong",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: "test1@mail.com",
      password: "rahasia",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "Email/Password is wrong",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});