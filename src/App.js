import "./App.css";
import {Routes, Route,useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from "./components/dashboard/Dashboard";
import AllTask from "./components/pages/AllTask";
import CompletedTask from "./components/pages/CompletedTask";
import IncompletedTask from "./components/pages/IncompletedTask";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";

function App() {

  const navigate  = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }else if(isLoggedIn === false) {
      navigate("/header")
    }
  },[])

  return (
    <>
    <Header />
      <div className="pt-16 relative ">   
          <Routes>            
            <Route exact path="/" element={<Dashboard />}>
              <Route index element={<AllTask />} />
              <Route path="completedTask" element={<CompletedTask />} />
              <Route path="inCompletedTask" element={<IncompletedTask />} />
            </Route>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
      </div>
    </>
  );
}

export default App;


