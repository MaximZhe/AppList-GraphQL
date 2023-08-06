import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CardRepository from '../CardRepository/CardRepository';
import AppList from '../AppList/AppList';
const AppRoute = () => {
    return (
        <Routes>
        <Route index path="/repos/:id" element={<CardRepository  />} />
        <Route path="/" element={<AppList />}/>
      </Routes>
      )
};

export default AppRoute;