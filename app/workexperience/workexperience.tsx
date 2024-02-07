"use client";
import React, { useEffect, useState } from "react";

// Retrieve all keys from localstorage
const getAllFormKeys = () => {
  return JSON.parse(localStorage.getItem("formKeys") || "[]");
};

// Retrieve data from localstorage using key
const getFormDataByKey = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

// retrieve ALL data from localstorage
const getAllFormData = () => {
  const allFormKeys = getAllFormKeys();
  const allFormData = allFormKeys.map((key: string) => ({
    key,
    data: getFormDataByKey(key),
  }));
  return allFormData;
};

const WorkExperience = () => {
  //state to store form data
  const [formData, setFormData] = useState<any[]>([]);

  useEffect(() => {
    const allFormData = getAllFormData();

    console.log("Retrieved Form Data:", allFormData);

    // set state of all form data
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
          </ul>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default WorkExperience;
