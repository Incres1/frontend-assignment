"use client";
import React, { useEffect, useState } from "react";

// Function to retrieve all form keys from LocalStorage
const getAllFormKeys = () => {
  return JSON.parse(localStorage.getItem("formKeys") || "[]");
};

// Function to retrieve form data from LocalStorage using a key
const getFormDataByKey = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

// Function to retrieve all form data from LocalStorage
const getAllFormData = () => {
  const allFormKeys = getAllFormKeys();
  const allFormData = allFormKeys.map((key: string) => ({
    key,
    data: getFormDataByKey(key),
  }));
  return allFormData;
};

const WorkExperience = () => {
  // State to store the retrieved form data
  const [formData, setFormData] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve all form data from LocalStorage
    const allFormData = getAllFormData();

    console.log("Retrieved Form Data:", allFormData);

    // Set the retrieved form data in the state
    setFormData(allFormData);
  }, []);

  return (
    <div className="">
      <div className="font-medium text-center text-xl">Work Experience</div>
      <div className="flex flex-wrap justify-center">


      
      {formData.map(({ key, data }) => (
        <div key={key} className="m-8 border min-w-96 rounded-xl p-4 my-4">
          {data && (
            <ul key={key} className="pl-4">
            <li className="mb-2">
              <span className="font-normal">Company Name:</span>
              <div className="text-gray-600">{data.companyName}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Position Title:</span>
              <div className="text-gray-600">{data.positionTitle}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Employment Type:</span>
              <div className="text-gray-600">{data.employmentType}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Location Type:</span>
              <div className="text-gray-600">{data.locationType}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Start Date:</span>
              <div className="text-gray-600">{data.startDate}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">End Date:</span>
              <div className="text-gray-600">{data.endDate}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Industry:</span>
              <div className="text-gray-600">{data.industry}</div>
            </li>
            <li className="mb-2">
              <span className="font-normal">Description:</span>
              <div className="text-gray-600">{data.description}</div>
            </li>
            {/* Add other form fields as needed */}
          </ul>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default WorkExperience;
