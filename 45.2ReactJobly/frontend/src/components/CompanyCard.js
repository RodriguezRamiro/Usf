// ./CompanyCard.js
import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="CompanyCard">
      <h3>
        <Link to={`/companies/${company.handle}`}>{company.name}</Link>
      </h3>
      <p>{company.description}</p>
      {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} />}
    </div>
  );
};

export default CompanyCard;
