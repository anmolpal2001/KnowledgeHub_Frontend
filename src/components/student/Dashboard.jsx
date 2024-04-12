import React, { useEffect, useState } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { SessionContextApi } from "../../context/SessionContextProvider";

const StudentDashboard = () => {
  const {teachers,loading,error,fetchTeachers} = SessionContextApi();
  const currentUser = useSelector(state => state.auth.currentUser);
  useEffect(() => {
    fetchTeachers(); 
  }, [currentUser]);
  return (
        <Layout>
          {/* <div className="p-4 sm:ml-64"> */}
          <div>
          <div className="flex p-4 justify-center items-center mt-20 flex-col">
          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Welcome Back, {currentUser.fullname}</h1>
          <section className="w-full h-full mx-5 md:mx-10 p-3 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                {teachers.map((teacher) => (
                  <Card key={teacher._id} teacher={teacher} />
                ))}
              </div>
            </section>
            </div>
          </div>
        </Layout>
  )
};

export default StudentDashboard;
