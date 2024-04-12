import React, { useEffect, useRef, useState } from "react";
import TeacherLayout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setUserDetails } from "../../redux/auth/authSlice";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const TeacherProfile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [formDisable, setFormDisable] = useState(true);
  const formDisableHandler = () => {
    setFormDisable((val) => !val);
  };
  const [formData, setFormData] = useState({
    name: currentUser.fullname || "",
    email: currentUser.email || "",
    educationQualification: currentUser.educationQualification || "",
    subjectSpecialization: currentUser.subjectSpecialization || "",
    experience: currentUser.experience || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await fetch("https://knowledge-hub-aw7r.onrender.com/api/v1/teacher/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        console.log(data);
        setFormDisable(true);
      } else {
        setError(data.message);
      }
      dispatch(loginSuccess({ currentUser: { ...currentUser, ...data.updatedTeacher } }));
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <TeacherLayout>
      <div className="mt-14 lg:ml-14 mx-auto">
        <div className="lg:w-5/6 w-5/6 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <button
            className={`text-white flex justify-center gap-3 items-center  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${!formDisable ? "bg-gray-600": "bg-blue-700 hover:bg-blue-800"}`}
            onClick={formDisableHandler}
          >
            <div>
              Edit Profile
            </div>
            <div>
              <BorderColorIcon/>
            </div>
          </button>
          <div className="flex gap-24 md:flex-row flex-col justify-center items-center sm:items-start ">
            <div className="mt-4 w-1/2">
              {currentUser.profilePic && (
                <div className="flex justify-end">
                  <img
                    src={currentUser.profilePic}
                    alt="Profile"
                    className="lg:w-64 lg:h-64 w-36 h-36 rounded-full"
                  />
                </div>
              )}
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Education Qualification:
                </label>
                <input
                  type="text"
                  name="educationQualification"
                  value={formData.educationQualification}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Subject Specialization:
                </label>
                <input
                  type="text"
                  name="subjectSpecialization"
                  value={formData.subjectSpecialization}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Experience:
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  disabled={formDisable}
                  onChange={handleChange}
                  className={`m-1 p-1  bg-white flex-auto focus:outline-0 w-full px-3 py-2 border border-gray-300 rounded-md ${
                    !formDisable && "border-slate-600 border-b-2"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleSubmit}
                  className=" p-3 rounded-lg hover:opacity-90 font-bold text-white mx-2   bg-blue-500 shadow-lg shadow-blue-500/50 "
                  disabled={formDisable}
                >
                  {loading ? "UPDATING" : "SAVE CHANGES"}
                </button>
                {error && <p className="text-red-600 text-center">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;
