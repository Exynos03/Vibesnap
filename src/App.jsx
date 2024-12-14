import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./pages/profile/container/Profile";
import Home from "./pages/user-account-management/container/Home";
import EditProfile from "./pages/profile/container/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";
import CreatePost from "./pages/createPost/container/CreatePost";
import Feed from "./pages/feed/container/Feed";
import IndividualPost from "./pages/feed/container/IndividualPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewProfile" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/feed" element={<Feed />} />
          </Route>
          <Route path="/feed/:postId" element={<IndividualPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
