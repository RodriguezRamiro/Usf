"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const Job = require("../models/job");
const User = require("../models/user"); // Import User model
const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");
const jobSearchSchema = require("../schemas/jobSearch.json");

const router = express.Router({ mergeParams: true });

/** POST / { job } => { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */
router.post("/", ensureAdmin, async function (req, res, next) {
  // ... existing code ...
});

/** GET / =>
 *   { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
 *
 * Can provide search filter in query:
 * - minSalary
 * - hasEquity (true returns only jobs with equity > 0, other values ignored)
 * - title (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */
router.get("/", async function (req, res, next) {
  // ... existing code ...
});

/** GET /[jobId] => { job }
 *
 * Returns { id, title, salary, equity, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: none
 */
router.get("/:id", async function (req, res, next) {
  // ... existing code ...
});

/** PATCH /[jobId]  { fld1, fld2, ... } => { job }
 *
 * Data can include: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  // ... existing code ...
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  // ... existing code ...
});

/** POST /:id/apply => { applied: jobId }
 *
 * Allow a user to apply for a job.
 *
 * Authorization required: user
 */
router.post("/:id/apply", ensureLoggedIn, async function (req, res, next) {
  try {
    const jobId = req.params.id;
    const username = req.user.username; // Get the username from the authenticated user

    const result = await Job.applyToJob(jobId, username); // Call the applyToJob method in the Job model
    return res.json({ applied: jobId }); // Return the applied job ID
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
