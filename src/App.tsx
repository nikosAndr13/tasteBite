import "./App.css";
import { NavBar } from "./NavBar";
import { HomePage } from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipiesProvider } from "./providers/getRecipies";
import { SignUp } from "./Forms/SignUp";
import { SignIn } from "./Forms/SignIn";
import { Fragment } from "react";
import { AuthProvider } from "./providers/getAuth";
import { Profile } from "./Profile/Profile";
import { AboutPage } from "./AboutPage/AboutPage";
import { RecipeForm } from "./Recipe/RecipeForm";
import { RecipePage } from "./RecipePage";
import Logo from "./assets/logo.svg";
import { Toaster } from "react-hot-toast";
import { CommentProvider } from "./providers/getComment";

function App() {
  return (
    <Router>
      <Toaster />
      <AuthProvider>
        <RecipiesProvider>
          <div className="App">
            <NavBar />
            <Routes>
              {["/", "/Home"].map((path) => (
                <Fragment key={path}>
                  <Route path={path} Component={HomePage} />
                </Fragment>
              ))}
              <Route path="/login" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/About" element={<AboutPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/RecipeForm" element={<RecipeForm />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
            </Routes>
            <footer className="flex justify-evenly mt-28 text-left">
              <div className="w-96">
                <img src={Logo} alt="logo" className="w-32" />
                <p className="text-gray-400">
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled and demoralized by the charms
                  of pleasure of the moment
                </p>
              </div>
              <div>
                <h3>Tastebite</h3>
                <ul>
                  <li>About us</li>
                  <li>Careers</li>
                  <li>Contact us</li>
                  <li>Feedback</li>
                </ul>
              </div>
              <div>
                <h3>Legal</h3>
                <ul>
                  <li>Terms</li>
                  <li>Conditions</li>
                  <li>Cookies</li>
                  <li>Copyright</li>
                </ul>
              </div>
              <div>
                <h3>Follow</h3>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>Youtube</li>
                </ul>
              </div>
            </footer>
          </div>
        </RecipiesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
