const supertest = require("supertest");

const server = require("./server");

const db = require("../database/db-connection");
const opTruck = require("../models/op-model");
const truckMenu = require("../models/truck-model");
const Menus = require("../models/menu-model");
// register operator
describe("Register", () => {
  it("returns 500 if username already exists", async () => {
    const data = { username: "david", password: "pass" };
    const res = await supertest(server)
      .post("/api/op-auth/register")
      .send(data);
    expect(res.statusCode).toBe(500);
  });
  it("returns 400 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server)
      .post("/api/op-auth/register")
      .send(data);
    expect(res.statusCode).toBe(400);
  });
  it("returns 400 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server)
      .post("/api/op-auth/register")
      .send(data);
    expect(res.statusCode).toBe(400);
  });

  it("returns a json object", async () => {
    const data = { username: "david", password: "pass" };
    const res = await supertest(server)
      .post("/api/op-auth/register")
      .send(data);
    expect(res.type).toBe("application/json");
  });
});

describe("Register", () => {
  it("returns 404 if username already exists", async () => {
    const data = { username: "david", password: "pass" };
    const res = await supertest(server)
      .post("/api/dinner-auth/register")
      .send(data);
    expect(res.statusCode).toBe(404);
  });
  it("returns 404 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server)
      .post("/api/dinner-auth/register")
      .send(data);
    expect(res.statusCode).toBe(404);
  });
  it("returns 404 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server)
      .post("/api/dinner-auth/register")
      .send(data);
    expect(res.statusCode).toBe(404);
  });
});

describe("Login", () => {
  it("Can login to existing user", async () => {
    const data = { username: "david", password: "pass" };
    const res = await supertest(server).post("/api/op-auth/login").send(data);
    expect(res.statusCode).toBe(200);
  });
  it("returns 401 if username does not exist", async () => {
    const data = { username: "david1234", password: "david" };
    const res = await supertest(server).post("/api/op-auth/login").send(data);
    expect(res.statusCode).toBe(401);
  });
  it("returns 400 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server).post("/api/op-auth/login").send(data);
    expect(res.statusCode).toBe(400);
  });
  it("returns 400 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server).post("/api/op-auth/login").send(data);
    expect(res.statusCode).toBe(400);
  });
  it("returns 400 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server).post("/api/op-auth/login").send(data);
    expect(res.type).toBe("application/json");
  });
});
describe("Login", () => {
  it("returns 401 if username does not exist", async () => {
    const data = { username: "david1234", password: "david" };
    const res = await supertest(server)
      .post("/api/diner-auth/login")
      .send(data);
    expect(res.statusCode).toBe(401);
  });
  it("returns 400 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server)
      .post("/api/diner-auth/login")
      .send(data);
    expect(res.statusCode).toBe(400);
  });
  it("returns 400 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server)
      .post("/api/diner-auth/login")
      .send(data);
    expect(res.statusCode).toBe(400);
  });
  it("returns 400 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server)
      .post("/api/diner-auth/login")
      .send(data);
    expect(res.type).toBe("application/json");
  });
});

describe("returns all trucks", () => {
  it("returns trucks", async () => {
    await supertest(server)
      .get("/api/trucks")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3NzU4MjAsImV4cCI6MTU5NTg2MjIyMH0.zD2yqOpLUmQWEAFmdE8-0atZKvGHMzCAbYqJBchrm7k"
      )
      .then((res) => expect(res.status).toBe(200));
  });
});
// post test
describe("adds truck", () => {
  it("returns 201, post created", async () => {
    await supertest(server)
      .post("/api/ops/1/trucks")
      .send({
        truckName: "Jr's Subs",
        imgOfTruck:
          "https://i.pinimg.com/originals/0d/a0/8e/0da08ef303a123ae388ab9913313775e.jpg",
        customerRatingAvg: 3,
        currentLocation: "4321 Avenue Ln",
        departTime: "04/20/2021 4:20 AM",
      })
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3ODMwNDYsImV4cCI6MTU5NTg2OTQ0Nn0.Z3TXKhuzliLDJUsbzJloZqOdzJXDvHLSLAOQq5PWKKY"
      )
      .then((res) => expect(res.status).toBe(201));
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).post("/api/ops/1/trucks");
    expect(res.type).toBe("application/json");
  });
});
describe("adds menu", () => {
  it("returns 201, adds menu", async () => {
    await supertest(server)
      .post("/api/trucks/1/menu")
      .send({
        menuName: "Chicken Cheese Steak",
        menuDesc: "chicken, cheese, onions, peppers, mushrooms",
        menuPhoto:
          "https://66.media.tumblr.com/40cbbf249ed007af5898c526732dbc7c/tumblr_p2vposCTFZ1ufzelwo1_1280.png",
        menuPrice: 7,
        customerRatingAvg: 3,
      })
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3ODMwNDYsImV4cCI6MTU5NTg2OTQ0Nn0.Z3TXKhuzliLDJUsbzJloZqOdzJXDvHLSLAOQq5PWKKY"
      )
      .then((res) => expect(res.status).toBe(201));
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).post("/api/trucks/1/menu");
    expect(res.type).toBe("application/json");
  });
});

// get tests
describe("Get operator", () => {
  // it("returns operators", async () => {
  //   const res = await supertest(server).get("/api/ops");
  //   expect(res.statusCode).toBe(200);
  // });

  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/ops");
    expect(res.type).toBe("application/json");
  });
});
describe("Get operator by id", () => {
  // it("returns operator", async () => {
  //   const res = await supertest(server).get("/api/ops/1");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/ops/1");
    expect(res.type).toBe("application/json");
  });
});
describe("Get diners", () => {
  // it("returns diners", async () => {
  //   const res = await supertest(server).get("/api/diners");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/diners");
    expect(res.type).toBe("application/json");
  });
});
describe("Get diner", () => {
  // it("returns diner", async () => {
  //   const res = await supertest(server).get("/api/diners/1");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/diners/1");
    expect(res.type).toBe("application/json");
  });
});
describe("Get trucks", () => {
  // it("returns trucks", async () => {
  //   const res = await supertest(server).get("/api/trucks");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/trucks");
    expect(res.type).toBe("application/json");
  });
});
describe("Get truck", () => {
  // it("returns truck", async () => {
  //   const res = await supertest(server).get("/api/trucks/1");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/trucks/1");
    expect(res.type).toBe("application/json");
  });
});
describe("Get truck menu", () => {
  // it("returns truck menu", async () => {
  //   const res = await supertest(server).get("/api/trucks/1/menu");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/trucks/1/menu");
    expect(res.type).toBe("application/json");
  });
});
describe("Get  menu", () => {
  // it("returns  menu", async () => {
  //   const res = await supertest(server).get("/api/menus");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/menus");
    expect(res.type).toBe("application/json");
  });
});
describe("Get  menu by id", () => {
  // it("returns  menu", async () => {
  //   const res = await supertest(server).get("/api/menus/1");
  //   expect(res.statusCode).toBe(200);
  // });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/menus/1");
    expect(res.type).toBe("application/json");
  });
});
// puts
describe("edits truck", () => {
  it("returns 201, edits truck", async () => {
    await supertest(server)
      .put("/api/trucks/1")
      .send({
        truckName: "Jr's Super Subs",
        imgOfTruck:
          "https://i.pinimg.com/originals/0d/a0/8e/0da08ef303a123ae388ab9913313775e.jpg",
        customerRatingAvg: 5,
        currentLocation: "4321 Avenue Ln",
        departTime: "04/20/2021 4:20 AM",
      })
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3ODMwNDYsImV4cCI6MTU5NTg2OTQ0Nn0.Z3TXKhuzliLDJUsbzJloZqOdzJXDvHLSLAOQq5PWKKY"
      )
      .then((res) => expect(res.status).toBe(201));
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).put("/api/trucks/1");
    expect(res.type).toBe("application/json");
  });
});
describe("adds menu", () => {
  it("returns 201, adds menu", async () => {
    await supertest(server)
      .put("/api/menus/1")
      .send({
        menuName: "Super Chicken Cheese Steak",
        menuDesc: "chicken, cheese, onions, peppers, mushrooms, soft sub roll",
        menuPhoto:
          "https://66.media.tumblr.com/40cbbf249ed007af5898c526732dbc7c/tumblr_p2vposCTFZ1ufzelwo1_1280.png",
        menuPrice: 7,
        customerRatingAvg: 3,
      })
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3ODMwNDYsImV4cCI6MTU5NTg2OTQ0Nn0.Z3TXKhuzliLDJUsbzJloZqOdzJXDvHLSLAOQq5PWKKY"
      )
      .then((res) => expect(res.status).toBe(201));
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/menus/1");
    expect(res.type).toBe("application/json");
  });
});
describe("update operators login", () => {
  it("returns 201, edits login", async () => {
    await supertest(server)
      .put("/api/ops/1")
      .send({
        username: "tommy",
        password: "pass",
      })
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInVzZXJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTU3ODMwNDYsImV4cCI6MTU5NTg2OTQ0Nn0.Z3TXKhuzliLDJUsbzJloZqOdzJXDvHLSLAOQq5PWKKY"
      )
      .then((res) => expect(res.status).toBe(201));
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).put("/api/ops/1");
    expect(res.type).toBe("application/json");
  });
});
// deletes
describe("delete operator", () => {
  // it("deletes operator", async () => {
  //   const res = await supertest(server).delete("/api/ops/1");
  //   expect(res.statusCode).toBe(200);
  // });
  it("deletes operator", async () => {
    const res = await supertest(server).delete("/api/ops/1");
    expect(res.statusCode).toBe(200);
  });

  it("returns a JSON object", async () => {
    const res = await supertest(server).put("/api/ops/1");
    expect(res.type).toBe("application/json");
  });
});
describe("delete diner", () => {
  it("deletes diner", async () => {
    const res = await supertest(server).delete("/api/diners/4");
    expect(res.statusCode).toBe(200);
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).delete("/api/diners/4");
    expect(res.type).toBe("application/json");
  });
});
describe("delete truck", () => {
  it("deletes truck", async () => {
    const res = await supertest(server).delete("/api/trucks/7");
    expect(res.statusCode).toBe(200);
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).delete("/api/trucks/7");
    expect(res.type).toBe("application/json");
  });
});
describe("delete menu", () => {
  it("deletes menu", async () => {
    const res = await supertest(server).delete("/api/menus/18");
    expect(res.statusCode).toBe(200);
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).delete("/api/menus/18");
    expect(res.type).toBe("application/json");
  });
});
