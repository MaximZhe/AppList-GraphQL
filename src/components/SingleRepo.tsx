import React from 'react';
import { Link } from 'react-router-dom';
import { setSingleRepoData } from '../redux/slice/datasSlice';
import { useDispatch } from 'react-redux';
import './singlerepo.scss';
const SingleRepo = ({data,index,currentPage, limit}:{data:any,index:number,currentPage:any, limit:number}) => {
    const dispatch = useDispatch()
    const handleLinkClick = (data: []) => {

        dispatch(setSingleRepoData(data))
      };
    return (
        <div key={data.node.id} className='item'>
            <h2 className='item__title'>{index + ((currentPage - 1) * limit)}
            <Link to={`/repos/${data.node.id}`} onClick={() => handleLinkClick(data)}>Name: {data.node.name}</Link></h2>
            <p className='item__link'>Link: <a href={data.node.url}>Ссылка</a></p>
            <p className='item__rating'>Stars GitHub:{data.node.stargazers.totalCount}</p>
            <p className='item__data'>Data commit: {data.node.pushedAt}</p>
        </div>
    );
};

export default SingleRepo;