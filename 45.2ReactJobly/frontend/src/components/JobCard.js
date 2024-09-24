// ./JobCard.js
import React, { useContext } from "react";
import UserContext from "./UserContext"; // Import your UserContext
import JoblyApi from "./JoblyApi"; 

const JobCard = ({ title, salary, equity, companyName, jobId, appliedJobs, setAppliedJobs }) => {
  const { currentUser } = useContext(UserContext); // Get the current user from context

  // Function to handle job application
  const handleApply = async () => {
    if (currentUser) {
      try {
        await JoblyApi.applyToJob(jobId);
        setAppliedJobs((prev) => [...prev, jobId]);
      } catch (err) {
        console.error("Application failed:", err);
      }
    }
  };

  const isApplied = appliedJobs.includes(jobId); // Check if job is already applied to

  return (
    <div className="job-card">
      <h4>{title}</h4>
      <p>Company: {companyName}</p>
      <p>Salary: {salary ? `$${salary.toLocaleString()}` : "Not specified"}</p>
      <p>Equity: {equity ? equity : "None"}</p>
      {currentUser && !isApplied ? (
        <button onClick={handleApply}>Apply</button> // Show apply button if not already applied
      ) : isApplied ? (
        <button disabled>Applied</button> // Disable the button if already applied
      ) : null}
    </div>
  );
};

export default JobCard;
