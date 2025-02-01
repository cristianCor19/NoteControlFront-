import { BrowserRouter, Routes, Route } from "react-router-dom"

import ProtectedRoute from "./components/routes/ProtectedRoute"
import ProtectedLayout from "./components/routes/ProtectedLayout"

//context 
import { SessionProvider } from "./context/SessionContext"
import { UserProvider } from "./context/UserContext"

//pages
import Login from "./pages/login"
import RegisterUser from "./pages/RegisterUser"
import HomePage from "./pages/HomePage"

function App() {
 

  return (
    <BrowserRouter>
      <SessionProvider>
        <UserProvider>
          <div className="main-container">
            
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register-user" element={<RegisterUser/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route element={<ProtectedLayout/>}>
                  <Route path="/home" element={<HomePage/> }/>
                </Route>
              </Route>
            </Routes>
          </div>
        </UserProvider>
      </SessionProvider>
      
    </BrowserRouter>
  )
}

export default App
