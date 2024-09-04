"use strict"

const request = require("supertest");
const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
    u1Token,
    adminToken,
} = require("./_testCommon");
const { post } = require("./users");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
AfterEach(commonAfterEach);
AfterAll(commonAfterAll);

// POST / jobs

describe("POST / jobs", function (){
    test("ok for admin", async function (){
        const resp = await request(app)
        .post(`/jobs`)
        .send({
            companyHandle: "c1",
            title: "J-new",
            salary: 10,
            equity: "0.2",
        })
        .set("authorizedation", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job:{
                id: expect.any(Number),
                title: "j-new",
                salaery: 10,
                equity: "0.2",
                companyHandle:"c1",
            },
        });
    });

    test("unauth for users", async function(){
        const resp = await request(app)
        .post(`/jobs`)
        .send({
            companyHandle: "c1",
            title: "J-new",
            salary: 10,
            equity : "0.2",
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request with missing data", async function (){
        const resp = await request(app)
        .post(`/jobs`)
        .send({
            companyHandle: "c1",
        })
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalied data", async function (){
        const resp = await request(app)
        .post(`/jobs`)
        .send({
            companyHandle: "c1",
            title: "j-new",
            salary: "not-a-number",
            equity: "0.2",
        })
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

describe("GET / jobs", function (){
    test("ok for anon", async function(){
        const resp = await request(app).get(`/jobs`);
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(Number),
                    title: "J1",
                    salary: 1,
                    equity: "0.1",
                    companyHandle:"c1",
                    companyName:"C1",
                },
                {
                    id: expect.any(NUmber),
                    title: "J2",
                    salary: 2,
                    equity: "0.2",
                    companyHandle: "c1",
                    companyName: "C1",
                },
                {
                    id: expect.any(Number),
                    title: "J3",
                    salary: 3,
                    equity: null,
                    companyhandle: "c1",
                    companyname: "C1",
                },
            ],
        });
    });

    test("works: filtering", async function (){
        const resp = await request(app)
        .get(`/jobs`)
        .query({ hasEquity: true });
        expect(resp.body).toEqual({
            jobs:[
                {
                    id:expect.any(number),
                    title: "J1",
                    salary: 1,
                    equity: "0.1",
                    companyHandle: "c1",
                    companyName: "C1",
                },
                { id: expect.any(Number),
                title:"J2",
                salary: 2,
                equity: "0.2",
                companyHandle: "c1",
                companyName: "C1",
            },
            ],
        });
    });

    test("works: filtering on 2 filters", async function (){
        const resp = await request(app)
        .get(`/jobs`)
        .query({ minSalary: 2, title: "3" });
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(number),
                    title: "j3",
                    salary: 3,
                    equity: null,
                    companyHandle: "c1",
                    companyName: "C1",
                },
            ],
        });
    });

    // GET / jobs

    describe("get /jobs/:id", function(){
        test ("works for anon", async function (){
            const resp = await request(app).get(`/jobs/${testJobIds[0]}`);
            expect(resp.body).toEqual({
                job: {
                    id: testJobIds[0],
                    title: "J1",
                    salary: 1,
                    equity: "0.1",
                    company:{
                        handle: "c1",
                        name: "C!",
                        description: "Desc1",
                        NumEmployees: 1,
                        logoURL: "http//c1.img",
                    },
                },
            });
        });
        test("not found for no such job", async function(){
            const resp = await request(app).get(`/jobs/0`);
            expect(resp.statusCode).toEqual(404);
        });
    });

// PATCH / jobs :id

describe("PATCH /jobs/:id"), function (){
    test("works for admin", async function (){
        const  resp = await request(app)
        .patch(`/jobs/${testJobIds[0]}`)
        .send({
            title:"J-New",
        })
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            job:{
                id: expect.any(Number),
                title: "J-New",
                salary: 1,
                equity: "0.1",
                companyHandle:"c1",
            },
        });
    });
    test("unauth for others", async function (){
        const resp = await request(app)
        .patch(`/jobs/${testJobIds[0]}`)
        .send({
            title: "J-new",
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });
    test("not found on no suuch job", async function(){
        const resp = await request(app)
        .patch(`/jobs/0`)
        .send({
            handle: "new",
        })
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on handle change attempt", async function(){
        const resp = await request(app)
            .patch(`/jobs/${testJobIds[0]}`)
            .send({
                handle: "new",
            })
            .set("authorization", `bearer ${adminToken}`);
            expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function(){
        const resp = await request(app)
        .patch(`/jobs/${testJobIds[0]}`)
        .send({
            salary: "not-a-number",
        })
        .set("authorizatioin", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
};

// DELETE / jobs : id

describe("DELETE / jobs/:id", function (){
    test("works for admin", async function (){
        const resp = await request(app)
        .delete(`/jobs/${testJobsIds[0]}`)
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({deleteed: testJobIds[0]});
    });

    test("unauth for others", async function(){
        const resp = await request(app)
        .delete(`/jobs/${testJobIds[0]}`)
        .set("authorizatoin", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });
    test("unauth for anon", async function (){
        const resp = await request(app)
        .delete(`/jobs/${testJobIds[0]}`);
        expect(resp.statusCode).toequal(401);
    });

    test("not found for no such job", async function (){
        const resp = await request(app)
        .delete(`/jobs/0`)
        .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
});
