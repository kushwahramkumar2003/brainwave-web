import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { AuthProtector } from "./components/AuthProtector";
import Layout from "./components/Layout";
import Home from "./pages/home";
import { Tweets } from "./pages/tweets";
import { Videos } from "./pages/videos";
import { Documents } from "./pages/documents";
import { Links } from "./pages/links";
import { Tags } from "./pages/tags";
import SharedBrain from "./pages/shared-brain";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/b"
        element={
          <AuthProtector>
            <Layout />
          </AuthProtector>
        }
      >
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="videos" element={<Videos />} />
        <Route path="documents" element={<Documents />} />
        <Route path="links" element={<Links />} />
        <Route path="tags" element={<Tags />} />
        <Route path="brain/:brainId" element={<SharedBrain />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}
