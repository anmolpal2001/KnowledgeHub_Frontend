import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTeacher } from "../../redux/student/studentSlice";

const Card = ({teacher}) => {
  console.log(teacher);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBookSession = () => {
    dispatch(setTeacher({teacher : teacher}));
    navigate("/student/book-session");
  }

  return (
    <div>
      <div className="w-full max-w-sm flex flex-col bg-[#49827e]  rounded-lg shadow">
        <div className="h-4/5 flex justify-center items-center flex-col px-4 pt-4">
          <img
            className="w-28 h-28 mt-2 rounded-full shadow-lg"
            src={teacher.accountDetails.profilePic ? teacher.accountDetails.profilePic : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
            alt=""
          />
          <h5 className="mb-1 mt-3 text-xl font-medium text-white">
            {teacher.accountDetails.fullname}
          </h5>
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <span className="text-[17px] font-medium text-white">
                Subject Specialization:
              </span>
              <span className="ml-2 text-[17px] font-semibold text-[#6fffb7ee]">{teacher.subjectSpecialization}</span>
            </div>
            <div className="flex items-center">
              <span className="text-[17px] font-medium text-white">
                Education Qualification:
              </span>
              <span className="ml-2 text-[17px] font-semibold text-[#6fffb7ee]">{teacher.educationQualification}</span>
            </div>
            <div className="flex items-center">
              <span className="text-[17px] font-medium text-white">
                Experience:
              </span>
              <span className="ml-2 text-[17px] font-semibold text-[#6fffb7ee]">{teacher.experience}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          {/* <button
            className="items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-blue-300 w-1/2"
          >
            Book Now
          </button> */}
          <button onClick={handleBookSession} className="bg-blue-700 hover:bg-blue-800 w-full py-2 text-white rounded-b-lg">
            Book Your Session
          </button>
      </div>
      </div>
    </div>
  );
};

export default Card;
