import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { colleges, semesters, branches } from "../constants";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/helper";
export default function Example() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const questionId = searchParams.get("questionId");
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    college: "",
    semester: "",
    type: "",
    subject: "",
    branch: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/updatePaper/${questionId}`, credentials)
      .then((res) => {
        console.log(res);

        if (res.data.message === "Paper updated successfully") {
          alert("Paper updated successfully!");
          navigate("/verify");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-800 min-h-screen  flex-col">
      <form
        className="mx-auto max-w-2xl w-90  p-6 rounded-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Update Question Paper
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  College
                </label>
                <div className="mt-2">
                  <select
                    name="college"
                    id="college"
                    value={credentials.college}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select College</option>
                    {colleges.map((item, index) => (
                      <option key={index} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                  {credentials.title === "other" && (
                    <div className="mt-3">
                      <label htmlFor="otherCollege" className="form-label">
                        Other College
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="otherCollege"
                        placeholder="Other Location"
                        value={credentials.otherCollege}
                        onChange={onChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Semester
                </label>
                <div className="mt-2">
                  <select
                    name="semester"
                    id="semester"
                    value={credentials.semester}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  End/Mid Sem
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    value={credentials.type}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>End/Mid</option>
                    <option>End Semester</option>
                    <option>Mid Semester</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Subject
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={credentials.subject}
                    onChange={onChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Branch
                </label>
                <div className="mt-2">
                  <select
                    name="branch"
                    id="branch"
                    value={credentials.branch}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Branch</option>
                    {branches.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {credentials.name === "other" && (
                    <div className="mt-3">
                      <label htmlFor="otherBranch" className="form-label">
                        Other College
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="otherBranch"
                        placeholder="Other Branch"
                        value={credentials.otherBranch}
                        onChange={onChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
