"use strict";

const { BadRequestError } = require("../expressError");

/**
 * Helper function to create a SQL `SET` clause for an `UPDATE` statement.
 *
 * This function takes in an object of fields to update and an optional
 * mapping object that maps JavaScript-style field names to SQL column names.
 * It returns an object containing the SQL `SET` clause and the corresponding
 * values for use in the SQL query.
 *
 * @param {Object} dataToUpdate - An object containing the fields to update and their new values.
 *                                Example: { firstName: "Aliya", age: 32 }
 * @param {Object} jsToSql - An object mapping JavaScript-style field names to
 *                           SQL column names. Example: { firstName: "first_name" }
 *
 * @throws {BadRequestError} If no data is provided to update.
 *
 * @returns {Object} An object containing:
 *                    - `setCols`: A string representing the SQL `SET` clause.
 *                                  Example: `"first_name"=$1, "age"=$2`
 *                    - `values`: An array of the values corresponding to the fields being updated.
 *                                  Example: ["Aliya", 32]
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql = {}) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // Build the SQL `SET` clause by mapping each field name to its SQL column equivalent
  // and assigning placeholder values like `$1`, `$2`, etc.
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
