import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { colleges, semesters, branches } from "../constants";
import { BASE_URL } from "../service/helper";

const GetQP = () => {
  let navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [filterCollege, setFilterCollege] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSemester, setFilterSemester] = useState("");
  const [questionsPerPage] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/questionList`);
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredQuestions = questions.filter((question) => {
    const college = question.college ? question.college.toLowerCase() : "";
    const branch = question.branch ? question.branch.toLowerCase() : "";
    const semester = question.semester ? question.semester.toLowerCase() : "";

    return (
      college.includes(filterCollege.toLowerCase()) &&
      branch.includes(filterBranch.toLowerCase()) &&
      semester.includes(filterSemester.toLowerCase())
    );
  });
  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const handleLogout = () => {
    navigate("/"); // Adjust the route accordingly
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
        <div className="relative down-4 top-4 mb-8">
          <h2 className="text-left text-xl font-bold tracking-tight text-slate-900">
            Questions Available
          </h2>
          <button
            onClick={handleLogout}
            className="absolute top-0 right-2 md:top-0 md:right-24 bg-blue-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            Home
          </button>
        </div>
        <div className="container mt-5">
          <div className="flex flex-col space-y-0 mb-3 md:flex-row md:space-x-3 md:space-y-0 bg-gray-800 p-4 rounded-md">
            <div className="flex-1 flex flex-col">
              <label className="text-lg text-white"> College</label>
              <select
                className="form-select bg-white text-grey-900 rounded-md"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
              >
                <option value="">Select College</option>
                {colleges.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-lg text-white">Filter by Branch:</label>
              <select
                className="form-select bg-white text-grey-900 rounded-md"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option value="">Select Branch</option>
                {branches.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-lg text-white">Filter by Semester:</label>
              <select
                className="form-select bg-white text-grey-900 rounded-md"
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
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

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-500">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Branch</th>
                  <th className="px-4 py-2">Semester</th>
                  <th className="px-4 py-2">College</th>
                  <th className="px-4 py-2">View</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredQuestions.map((question) => (
                  <tr key={question._id}>
                    <td className="border px-4 py-2">{question.subject}</td>
                    <td className="border px-4 py-2">{question.branch}</td>
                    <td className="border px-4 py-2">{question.semester}</td>
                    <td className="border px-4 py-2">{question.college}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/viewQuestion?question._id=${question._id}`}>
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-normal hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredQuestions.length / questionsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-2 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default GetQP;
