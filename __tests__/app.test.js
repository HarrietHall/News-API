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

        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("article_id", expect.any(Number));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
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

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with new comment after adding it to the database", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Impressive article",
    };
    return request(app)
      .post("/api/articles/5/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", "Impressive article");
        expect(comment).toHaveProperty("article_id", 5);
        expect(comment).toHaveProperty("author", "butter_bridge");
        expect(comment).toHaveProperty("votes", 0);
        expect(comment).toHaveProperty("created_at", expect.any(String));
      });
  });
});
test("400 : Responds with message -'Bad Request' for an invalid article id", () => {
  const newComment = {
    username: "butter_bridge",
    body: "Impressive article",
  };
  return request(app)
    .post("/api/articles/notAnId/comments")
    .expect(400)
    .send(newComment)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request");
    });
});
test("404 : Responds with message -'Not Found' when article id is valid but does not exist", () => {
  const newComment = {
    username: "butter_bridge",
    body: "Impressive article",
  };
  return request(app)
    .post("/api/articles/99999999/comments")
    .expect(404)
    .send(newComment)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found");
    });
});
test("400: Responds with message -'Bad Request' when newComment has invalid keys", () => {
  const newComment = {
    not_a_username: "butter_bridge",
    not_a_body: "Impressive article",
  };
  return request(app)
    .post("/api/articles/5/comments")
    .send(newComment)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request");
    });
});
test("404: Responds with message -'Not Found' when username does not exist", () => {
  const newComment = {
    username: "Smithy",
    body: "What a read!",
  };
  return request(app)
    .post("/api/articles/5/comments")
    .send(newComment)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found");
    });
});
