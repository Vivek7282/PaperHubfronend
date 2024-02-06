import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { colleges, semesters, branches } from "../constants";
import axios from "axios";
import { BASE_URL } from "../service/helper";
export default function Example() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    college: "",
    semester: "",
    type: "",
    subject: "",
    branch: "",
    questions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("college", credentials.college);
    formData.append("semester", credentials.semester);
    formData.append("type", credentials.type);
    formData.append("subject", credentials.subject);
    formData.append("branch", credentials.branch);
    for (let i = 0; i < credentials.questions.length; i++) {
      formData.append("questions", credentials.questions[i]);
    }

    axios
      .post(`${BASE_URL}/addPaper`, formData)
      .then((res) => {
        console.log(res);

        if (res.data === "Question Added") {
          alert("Paper Added successfully!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onPhotoChange = (e) => {
    // Use Array.from to convert the FileList to an array
    const files = Array.from(e.target.files);
    setCredentials({ ...credentials, questions: files });
  };

  return (
    <div className="bg-slate-800">
      <form
        className="mx-auto max-w-2xl w-90  p-6 rounded-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Upload Question Paper
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              Thank you for your submission! 🌟 Please ensure all fields are
              filled accurately. Your uploaded question will be carefully
              verified by our administrators. Your attention to detail helps us
              maintain the quality of our content. 🙏
            </p>

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

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Upload Questions
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="questions"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-slate-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload files</span>
                        <input
                          type="file"
                          name="questions"
                          accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                          onChange={onPhotoChange}
                          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                          multiple // Add the 'multiple' attribute
                        />
                      </label>
                    </div>

                    <p className="text-xs leading-5 text-white">
                      PNG, JPG, JPEG, PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
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
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
