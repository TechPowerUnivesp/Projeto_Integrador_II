import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./pages/Formulario";
import Login from "./pages/Login";
import AreaProfessor from "./pages/AreaProfessor";
import Gabarito from "./pages/Gabarito";
import DetalhesAluno from "./pages/DetalhesAluno";


function App() {
    return(
        <>
            <div>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Formulario />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/AreaProfessor" element={<AreaProfessor />} />
                    <Route path="/Gabarito" element={<Gabarito />} />
                    <Route path="/DetalhesAluno/:id" element={<DetalhesAluno />} />
                </Routes>
            </BrowserRouter>
            </div>
        </>
    )
}
export default App
