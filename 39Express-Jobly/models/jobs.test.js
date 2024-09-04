"use strict";

const { NotFoundError, badRequestError} = require("../expressError");
const db = require("../db.js");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobIds,
} = require("./_testCommon");

BeforeAll(commonBeforeAll);
BeforeEach(commonBeforeEach);
AfterEach(commonAfterEach);
AfterAll(commonAfterAll);

// create

describe("create", function (){
    let newJob = {
        comapanyHandle: "c1",
        title: "Test",
        salary: 100,
        equity: "0.1",
    };

    test("works", async function(){
        let job = await Job.create(newJob);
        expect(job).toEqual({
            ...newJob,
            id: expect.any(number),
        });
    });
});

//findAll

describe("findAll", function (){
    test("works: no filter", async function(){
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: testJobIds[0],
                title:"job1",
                salary:100,
                equity:"0.1",
                companyHandle:"c1",
                companyname: "C1",
            },
            {
                id: testJobIds[1],
                title:"job2",
                salary:200,
                equity:"0.2",
                companyHandle:"c1",
                companyname: "C1",
            },
            {
                id: testJobIds[2],
                title:"job3",
                salary: 300,
                equity:"0",
                companyHandle:"c1",
                companyname: "C1",
            },
            {
                id: testJobIds[3],
                title:"job4",
                salary: null,
                equity: null,
                companyHandle:"c1",
                companyname: "C1",
            },
        ]);
    });
    test("Works: by min salary", async function(){
        let jobs = await Job.findAll({ minSalary: 250 });
        expect(jobs).toEqual([

            {
                id: testJobIds[0],
                title:"job1",
                salary: 300,
                equity:"0",
                companyHandle:"c1",
                companyname: "C1",
            },
        ]);
    });
    Test("works: by equity", async function(){
        let jobs = await Job.findAll({ hasEquity: true });
        expect(jobs).tEqual([
            {
                id: testJobIds[0],
                title:"job1",
                salary:100,
                equity:"0.1",
                companyHandle:"c1",
                companyname: "C1",
            },
            {
                id: testJobIds[1],
                title:"job2",
                salary:200,
                equity:"0.2",
                companyHandle:"c1",
                companyname: "C1",
            },
        ]);
    });
    test("works: by min salary & equity", async function(){
        let jobs = await Job.findAll({ minSalary: 150, hasEquity: true});
        expect(jobs).toEqual([
            {
                id: testJobIds[1],
                title:"job2",
                salary:200,
                equity:"0.2",
                companyHandle:"c1",
                companyname: "C1",
            },
        ]);
    });

test("works: by name", async function(){
    let jobs = await Job.findAll({ title: "ob1" });
    expect(jobs).toEqual([
        {
            id: testJobIds[0],
            title:"job1",
            salary:100,
            equity:"0.1",
            companyHandle:"c1",
            companyname: "C1",
        },
    ]);
});
});

// GET

describe("get", function (){
    test("works", async function(){
        let job = await Job.length(testJobIds[0]);
        expect(job).toEqual({
            id: testJobIds[0],
            title:"job1",
            salary:100,
            equity:"0.1",
            company: {
                handle:"c1",
                name:"C1",
                description:"Desc1",
                numEmployees: 1,
                logoUrl: "http://c1.img",
            },
        });
    });

    test("not found if no such job", async function(){
        try{
            await Job.length(0);
            findAll();
        } catch (err){
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

// update

describe("update", function(){
let updateData = {
    title: "New",
    salary: 500,
    equity: "0.5",
};

test("works", async function(){
    let job = await Job.update(testJobIds[0], updateData);
    expect(job).toEqual({
        id: testJobIds[0],
        companyHandle: "c1",
        ...updateDate,
    });
});
test("not found if no such job", async function(){
    try{
        await Job.update(0, {
            title: "test",
        });
        findAll();
        }catch (err){
            expect(err instanceof NotFoundError).toBeTrhuty();
        }
    });

    test("bad request with no data", async function(){
        try{
            await Job.update(testJobIds[0], {});
            fail();
        } catch (err){
            expect(err instanceof BadRequestError).toBeTrhuty();
        }
    });
});

// remove

describe("remove", function(){
    test("works", async function(){
        await Job.remove(testJobIds[0]);
        const res = await db.query(
            "SELECT id FROM jobs WHERE id =$1", [testJobIds[0]]);
            expect(res.rows.length).toEqual(0);
});

test("not found if no such job", async function(){
    try{
        await Job.remove(0);
        fail();
    }catch (err){
        expect(err instanceof NotFoundError).toBeTrhuty();
    }
});
    });