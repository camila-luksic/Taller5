import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formcategoria from './categorias/form.jsx';
import Listacategorias from './categorias/list.jsx';
import Formcurso from './cursos/form.jsx';
import Listacursoss from './cursos/list.jsx';
import CursoDetalles from './cursos/detalle.jsx';
import Formvideo from './videos/form.jsx';
import Listavideoss from './videos/list.jsx';
import Fotocurso from './cursos/foto.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/categoria",
    element: <Listacategorias />,
  },
  {
    path: "/createCategoria",
    element: <Formcategoria />,
  },
  {
    path: "/categoria/:id",
    element: <Formcategoria />,
  },
  {
    path: "/curso",
    element: <Listacursoss/>,
  },
  {
    path: "/createCurso",
    element: <Formcurso />,
  },
  {
    path: "/cursos/:id",
    element: <Formcurso />,
  },
  
  {
    path: "/curso/:id",
    element: <CursoDetalles />,
  },
  {
    path: "/cursos/:id/foto",
    element: <Fotocurso />,
  },
  {
    path: "/video",
    element: <Listavideoss />,
  },
  
 
  {
    path: "/createVideo",
    element: <Formvideo />,
  },
  {
    path: "/videos/:id",
    element: <Formvideo />,
  }

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

//me crea, muestra,edita y elimina categorias
//me crea ,muestra,edita y elimina cursos
//me crea,muestra ,edita y elimina videos