import { Dashboard } from '@mui/icons-material'
import { Route, Routes } from 'react-router-dom'
import LoginAdmin from '../pages/Login/Admin'
import ProductCrud from '../pages/product_crud/ProductCrud'
import PaginaBaseAdmin from "../pages/PageBase/Admin"
import NotFound from '../pages/NotFound'


const Rotas = () => {
  return (
    <Routes>
      <Route path='/admin'>
        <Route path='login' element={<LoginAdmin />} />
      </Route>
      <Route path='/admin' element={<PaginaBaseAdmin />} >
        <Route path='' element={<Dashboard />} />
        <Route path='products' element={<ProductCrud />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      
    </Routes>);
}

export default Rotas