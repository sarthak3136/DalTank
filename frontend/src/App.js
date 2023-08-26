import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./js/Home";

import Faq from "./js/faq/Faq";
import ContactPage from "./js/ContactPage";
import SignUp from "./js/auth/SignUp";
import SignupPage from "./js/auth/SignUp";
import Login from "./js/auth/Login";
import ForgotPassword from "./js/ForgotPassword";
import IdeaSubmission from "./js/IdeaSubmission";
import StoryHome from "./js/stories/StoryHome";
import Post from "./js/stories/Post";
import StoryDetails from "./js/stories/ClickStory";
import ViewStory from "./js/stories/ViewStory";
import EditStory from "./js/stories/EditStory";
import Pitch from "./js/ratings&feedback/Pitch";

import InvestorProfile from "./js/investorProfile/investorProfile";
import UserProfile from "./js/editProfileInvestor/editProfile";

import PitchVideoPage from "./js/pitch/PitchVideoPage";
import StudentPitch from "./js/StudentAlumni/StudentPitch";
import AdminFaq from "./js/faq/AdminFaq";

function IsInvestorOrNot({ children }) {
  const user = localStorage.getItem("user");
  const { role } = JSON.parse(user);
  if (role == "Investor") {
    return children;
  }
  return <div>USER NOT AUTHORIZED</div>;
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/idea-submission" element={<IdeaSubmission />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/story" element={<StoryHome />} />
        <Route path="/storyAdmin" element={<ViewStory />} />
        <Route path="/story/:id" element={<StoryDetails />} />
        <Route path="/postStory" element={<Post />} />
        <Route path="/viewStory" element={<ViewStory />} />
        <Route path="/viewStory/:id" element={<StoryDetails />} />
        <Route path="/editstory/:id" element={<EditStory />} />
        <Route
          path="/pitch"
          element={
            <IsInvestorOrNot>
              <Pitch />
            </IsInvestorOrNot>
          }
        />

        <Route path="/investorProfile" element={<InvestorProfile />} />
        <Route path="/editProfile" element={<UserProfile />} />

        <Route path="/pitch/:_id" element={<PitchVideoPage />} />
        <Route path="/studentAlumni" element={<StudentPitch />} />
        <Route path="/adminfaq" element={<AdminFaq />} />
      </Routes>
    </Router>
  );
}

export default App;
