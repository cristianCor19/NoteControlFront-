import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProtectedRoute from "./components/routes/ProtectedRoute"
import ProtectedLayout from "./components/routes/ProtectedLayout"

//context 
import { SessionProvider } from "./context/SessionContext"
import { UserProvider } from "./context/UserContext"
import { SubjectProvider} from "./context/SubjectContext"
import { ActivityProvider } from "./context/ActivityContext"

//pages
import Login from "./pages/login"
import RegisterUser from "./pages/RegisterUser"
import HomePage from "./pages/HomePage"
import Activities from "./pages/Activities"
import MyTask from "./pages/MyTasks"
import Profile from "./pages/Profile"
import Subjects from "./pages/Subjects"
import RecoveryPassword from "./pages/RecoveryPassword"
import ResetPassword from "./pages/ResetPassword"

function App() {
 

  return (
    <BrowserRouter>
      <SessionProvider>
        <UserProvider>
          <SubjectProvider>
            <ActivityProvider>
              <div className="main-container bg-gradient-to-b from-blue-body/50 to-white">
                <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/register-user" element={<RegisterUser/>}/>
                  <Route path="/recovery-password" element={<RecoveryPassword/>}/>
                  <Route path="/reset-password" element={<ResetPassword/>}/>
                  <Route element={<ProtectedRoute/>}>
                    <Route element={<ProtectedLayout/>}>
                      <Route path="/home" element={<HomePage/> }/>
                      <Route path="/activities" element={<Activities/> }/>
                      <Route path="/task" element={<MyTask/> }/>
                      <Route path="/profile" element={<Profile/> }/>
                      <Route path="/subjects" element={<Subjects/> }/>

                    </Route>
                  </Route>
                </Routes>
              </div>
            </ActivityProvider>
          </SubjectProvider>
        </UserProvider>
      </SessionProvider>
      
    </BrowserRouter>
  )
}

export default App
