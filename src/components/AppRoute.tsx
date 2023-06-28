import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SingleCardRepo from './SingleCardRepo';
import AppList from './AppList';
const AppRoute = () => {
    return (
        <Routes>
        <Route index path="/repos/:id" element={<SingleCardRepo  />} />
        <Route path="/" element={<AppList />}/>
      </Routes>
      )
};

export default AppRoute;