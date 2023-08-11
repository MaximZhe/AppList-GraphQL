import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CardRepository from '../CardRepository/CardRepository';
import AppList from '../AppList/AppList';
const AppRoute = () => {
    return (
        <Routes>
        <Route index path={`${process.env.PUBLIC_URL}/repos/:id`} element={<CardRepository  />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<AppList />}/>
      </Routes>
      )
};

export default AppRoute;