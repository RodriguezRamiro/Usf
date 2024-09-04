"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate }  = require("../helpers/sql");

// functions for companies.

class Job{

    // create update and return new job

    //returns { id, title, salary, equity, companyHandle}
static async create(data){
    const result = await db.query(
        `INSERT INTO jobs (title,
            salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
            [data.title,
            data.salary,
        data.equity,
    data.companyHandle,
]);
let job = result.rows[0];
return job;

}
}

// Find all jobs
//Returns {id, title, salary, equity, companyhandle, companyName }, ...]

static async findAll({ minSalary, hasEquity, title} = {}){
    let query = `SELECT j.id,
    j.title,
    j.salary,
    j.equity,
    j.company_handle AS "companyHandle"
    c.name AS "companyName"
    FROM jobs j
    LEFT JOIN copmanies AS c ON c.handle = j.company_handle`;

    let whereExpressions = [];
    let queryVAlues = [];

// add whereExpressions and query Values to generate SQL

if(minSAlary !== undefined){
    queryVAlues.push(minSalary);
    whereExpressions.push(`salary >= $${queryValues.length}`);
}
if (hasEquity === true) {
    whereExpressoins.push(`salary >= $${queryValues.length}`);
}

if (hasequity === true){
    whereExpressions.push(`equity > 0`);
}

if (title !== undefined){
    queryValues.push(`%${title}%`);
    whereExpressions.push(`title ILIKE $${queryValues.length}`);
}

if (whereExpressions.length > 0){
    query += "WHERE" + whereExpressions.join(" AND");
}

// end query, return result
query += "ORDER BY title"
const jobsRes = await db.query(query, queryValues);
return jobsRes.rows;
}

// job id, return data about job.

//return { id, title, salary, equity, companyHandle, company}
//if not found thorw NotFOundError

static async get(id){
    const jobRes = await db.query(
        `SELECT id, title, salary, equity, company_handle AS "companyHandle"
        FROM jobs
        WHERE id = $1`, [id]);

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        const companiesRes = await db.query(
            `SELECT handle, name, description,
            num_employees AS "numEmployees",
            log_url AS "logoURL"
            FROM companies
            WHERE handle = $1`, [job.companyHandle]);

            delete job.companyHandle;
            job.company = companiesRes.rows[0];

            return job;
}

//update job data

// returns {id, title, salary, equity, companyHandle }
// if not found throw error.

static async update(id, data){
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
        const idVarIdx = "$" + (values.length + 1);

        const querySQL = `UPDATE jobs
        SET ${setCols}
        WHERE id = ${idVarIdx}
        RETURNING id,
        title,
        salary,
        equity,
        company_handle AS "companyHandle"`;

const result = await db.query(querySql, [...values, id]);
const job = result.rows[0];

if (!job) throw new notFoundError(`No Job: ${id}`);
return job;
}

// delete job from database;
// if not found throw error

static async remove(id){
    const result = await db.query(
        `DELETE
        FROM jobs
        WHERe id = $1
        Returning id`, [id]);

    const job = result.rows[0]
    if (!jobs) throw new NotFoundError(`No job: ${id}`);
}

module.exports = Job;