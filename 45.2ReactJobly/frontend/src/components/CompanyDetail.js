// ./CompanyDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../../api";

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const data = await JoblyApi.getCompany(handle);
      setCompany(data);
    };
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {/* Add more company details here */}
    </div>
  );
};

export default CompanyDetail;
