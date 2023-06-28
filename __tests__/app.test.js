const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");
const endpointData = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("GET - api/topics", () => {
  test("200: Responds with an array of all topics:", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("description", expect.any(String));
          expect(topic).toHaveProperty("slug", expect.any(String));
        });
      });
  });
  test("404: responds with message - 'Not Found' for an invalid endpoint", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});

describe("GET - /api", () => {
  test("200: Responds with contents of endpoints.json", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpointData).toEqual(endpointData);
      });
  });
});

describe("GET -  /api/articles/:article_id", () => {
  test("200: Responds with article object with the specified article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        console.log(article)
    
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("article_id", expect.any(Number));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty(
          "article_img_url",
          expect.any(String)
        );
      });
  });
});
test("400 : Responds with message -'Bad Request' for an invalid article id", () => {
  return request(app)
    .get("/api/articles/notAnId")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request");
    });
});
test("404 : Responds with message -'Not Found' when article id is valid but does not exist", () => {
  return request(app)
    .get("/api/articles/99999999")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found");
    });
});





describe.only("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with new comment after adding it to the database", () => {
    const newComment = {
      username:'uhddfuwehf', body:'wggefuhwiuef'
    };
    return request(app)
      .post("/api/articles/:article_id/comments")
      .send(newComment)
      .expect(201)
      .then(({body}) => {
        expect(body).toBeInstanceOf(Object);
        // expect(body.restaurant).toMatchObject({
        //     'restaurant_id': expect.any(Number),
        //     'restaurant_name': expect.any(String),
        //     'area_id': expect.any(Number),
        //     'cuisine': expect.any(String),
        //     'website': expect.any(String),
          });
          expect(body.restaurant).toHaveProperty("username", expect.any(String));
          expect(body.restaurant).toHaveProperty("body", expect.any(String));

      });
  });
