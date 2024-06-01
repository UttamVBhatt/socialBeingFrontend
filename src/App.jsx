import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

import { useAuthProvider } from "./contexts/AuthContext";

import Forgot from "./pages/ForgotPassword/Forgot";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import MyProfile from "./components/MyProfile/MyProfile";
import OnePost from "./components/OnePost/OnePost";
import OneUser from "./pages/OneUser/OneUser";
import AllUsers from "./pages/AllUsers/AllUsers";
import AllReels from "./pages/AllReels/AllReels";
import OneReel from "./components/OneReel/OneReel";

function App() {
  const { isAuthenticated } = useAuthProvider();

  return (
    <Router>
      <Routes>
        <>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />}>
                <Route path="/me/:id" element={<MyProfile />} />
                <Route path="/post/:id" element={<OnePost />} />
                <Route path="/:id" element={<OneUser />} />
                <Route path="/:id/reels" element={<AllReels />} />
                <Route path="/:id/all/users" element={<AllUsers />} />
                <Route path="/reels/:id" element={<OneReel />} />
              </Route>
              <Route path="*" element={<h3>Page Not Found</h3>} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route
                path="/reset/password/:token"
                element={<ResetPassword />}
              />
              <Route path="/forgot/password" element={<Forgot />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<h3>Page Not Found</h3>} />
            </>
          )}
        </>
      </Routes>
    </Router>
  );
}

export default App;
