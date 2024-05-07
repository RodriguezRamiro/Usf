--Schema Desing

CREATE TABLE Doctors (
doctor_id INT (PRIMARY KEY),
doctor_name VARCHAR(255),
specialization VARCHAR(255),
-- other relevant doctor information
);

CREATE TABLE Patients(
patient_id INT (PRIMARY KEY)
patient_name    VARCHAR(255),
date_of_birth   DATE,
gender  VARCHAR(1)
-- other relevant patient information
)

CREATE TABLE Visits
visit_id INT (PRIMARY KEY)
doctor_id INT
patient_id INT,
visit_date DATE
Foreign Key (doctors_id) REFERENCES Doctors(doctor_id),
Foreign Key (patient_id) REFERENCES Patients(patient_id)
-- other visit-related information

CREATE TABLE Diseases
disease_id INT (PRIMARY KEY)
disease_name VARCHAR(255),
description TEXT,
-- other disease-related information

CREATE TABLE Diagnoses (
diagnosis_id INT (PRIMARY KEY)
visit_id INT
disease_id INT
FOREING KEY (visit_id) REFERENCES Visits(visit_id),
FoREING KEY (diseases_id) REFERENCES Diseases(disease_id)
-- other diagnosis-related information
)