// ./CompanyList.js
import React, { useEffect, useState } from "react";
import JoblyApi from "../../../api";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await JoblyApi.getCompanies();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const filteredCompanies = await JoblyApi.getCompanies({ name: e.target.value });
    setCompanies(filteredCompanies);
  };

  return (
    <div>
      <h2>Companies</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="company-list">
        {companies.map(company => (
          <CompanyCard key={company.handle} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
