import React, { useEffect, useRef, useState } from "react";
import TeacherLayout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setUserDetails } from "../../redux/auth/authSlice";

const StudentProfile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [formDisable, setFormDisable] = useState(true);
  const formDisableHandler = () => {
    setFormDisable((val) => !val);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    highestQualification: "",
    password: "",
    profilePic: null,
  });

  const profileData = (e) => {
    console.log(e.target.files);
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePic: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await fetch("/api/v1/student/updateProfile", {
        method: "PUT",
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
        console.log(data.message);
      }
      dispatch(loginSuccess({ currentUser: { ...currentUser, ...data.updatedStudent } }));
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
          {/* <h1 className="text-2xl font-medium mb-20 md:text-4xl text-start">Your Profile</h1> */}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={formDisableHandler}
          >
            Edit Profile
          </button>
          <div className="flex gap-24 md:flex-row flex-col justify-center items-center sm:items-start ">
            <div className="mt-4 w-1/2">
              {/* <h3 className="text-lg font-semibold mb-2">Profile Picture</h3> */}
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
                  value={formData.name || currentUser.fullname}
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
                  value={formData.email || currentUser.email}
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
                  name="highestQualification"
                  value={
                    formData.highestQualification ||
                    (currentUser && currentUser.highestQualification)
                  }
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  name="profilePic"
                  disabled={formDisable}
                  onChange={profileData}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col ">
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

export default StudentProfile;
