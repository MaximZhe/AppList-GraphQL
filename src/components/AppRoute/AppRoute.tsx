
import { Route, Routes } from 'react-router-dom';
import CardRepository from '../CardRepository/CardRepository';

import Authorization from '../Authorization/Authorization';
import Callback from '../Callback';
const AppRoute = () => {
    return (
        <Routes>
        <Route index path='/repos/:id' element={<CardRepository  />} />
        <Route path='/callback?/*' element={<Callback />}/>
        <Route path='/AppList-GraphQL/' element={<Authorization />}/>
        
      </Routes>
      )
};

export default AppRoute;