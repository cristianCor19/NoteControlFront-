import { BrowserRouter, Routes, Route } from "react-router-dom"


//pages
import Login from "./pages/login"
import RegisterUser from "./pages/RegisterUser"
function App() {
 

  return (
    <BrowserRouter>
      {/* <SessionProvider> */}
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register-user" element={<RegisterUser/>}/>
          </Routes>
        </div>
      {/* </SessionProvider> */}
      
    </BrowserRouter>
  )
}

export default App
