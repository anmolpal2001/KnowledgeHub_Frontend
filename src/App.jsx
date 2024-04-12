import AuthLayout from "./components/AuthLayout";
import StudentDashboard from "./components/student/Dashboard";
import StudentLayout from "./components/student/Layout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookedSessions from "./components/student/BookedSessions";
import BookSession from "./components/student/BookSession";
import TeacherDashboard from "./components/teacher/Dashboard";
import ApproveRequest from "./components/teacher/ApproveRequest";
import TeacherLayout from "./components/teacher/Layout";
import SessionContextProvider from "./context/SessionContextProvider";
import ProfilePage from "./pages/ProfilePage";
import PendingRequests from "./components/student/PendingRequests";
import RejectsSessions from "./components/student/RejectsSessions";
import Sessions from "./components/teacher/Sessions";
import CancelledRequests from "./components/teacher/CancelledRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/student",
    children: [
      {
        index : true,
        element : <AuthLayout><StudentDashboard/></AuthLayout>
      },
      {
        path: "book-session",
        element: <StudentLayout><BookSession /></StudentLayout>,
      },
      {
        path : "booked-sessions",
        element : <StudentLayout><BookedSessions/></StudentLayout>
      },
      {
        path : "pending-requests",
        element : <StudentLayout><PendingRequests/></StudentLayout>
      },
      {
        path : "rejected-sessions",
        element : <StudentLayout><RejectsSessions/></StudentLayout>
      }
    ],
  },
  {
    path : "/teacher",
    children : [
      {
        index : true,
        element : <AuthLayout><TeacherDashboard/></AuthLayout>
      },
      {
        path : "approve-session",
        element : <TeacherLayout><ApproveRequest/></TeacherLayout>
      },
      {
        path : "booked-sessions",
        element : <TeacherLayout><Sessions/></TeacherLayout>
      },
      {
        path : "cancelled-sessions",
        element : <TeacherLayout><CancelledRequests/></TeacherLayout>
      }
    ]
  },
  {
    path : "/profile",
    element : <AuthLayout><ProfilePage/></AuthLayout>
  }
]);

function App() {
  return (
    <>
      <SessionContextProvider>
      <RouterProvider router={router} />
      </SessionContextProvider>
    </>
  );
}

export default App;
