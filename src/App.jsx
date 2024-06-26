
import { BrowserRouter ,Navigate,Route ,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import './styles.scss'
import { useContext } from "react"
import { AuthContext } from "./context/authContext"

function App() {
  const user = useContext(AuthContext)
    const ProtectedRoute = ({children})=>{
    if(!user)
      return <Navigate to={"/login"}/>
    
     
    return children
  }

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App
