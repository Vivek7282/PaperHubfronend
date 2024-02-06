import React, { useState } from "react";
import axios from "axios";

import { BASE_URL } from "../service/helper";
import { useSelector } from "react-redux";

const AddMentor = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    phone: "",
    photo: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("phone", credentials.phone);
    formData.append("college", credentials.college);
    formData.append("password", credentials.password);

    formData.append("photo", credentials.photo);

    axios
      .post(`${BASE_URL}/createUser`, formData)
      .then((res) => {
        console.log(res);

        if (res.data === "Admin Added") {
          alert("Admin submitted successfully!");

          setCredentials({
            name: "",
            email: "",
            phone: "",
            password: "",
            college: "",
            photo: "",
          });
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
    setCredentials({ ...credentials, photo: e.target.files[0] });
  };

  return (
    <>
      <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-8">
              <div className="border-b border-gray-900/10 pb-8">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Add Admin Details
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={credentials.name}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={credentials.phone}
                        onChange={onChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={credentials.password}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="aadhar"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      College
                    </label>
                    <div className="mt-2">
                      <input
                        id="college"
                        name="college"
                        type="text"
                        value={credentials.college}
                        onChange={onChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept=".png, .jpg, .jpeg,capture=camera"
                      // Specify 'camera' to use the device's camera
                      onChange={onPhotoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
};

export default AddMentor;
