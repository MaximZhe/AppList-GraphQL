
import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import './CardRepository.scss';
import 'moment/locale/ru';


const CardRepository = () => {
  const data2 = useSelector((state: any) => state.datas.singleRepoData)
  const dataNew = moment(data2.node.pushedAt).format('DD.MM.YYYY');
  return (
    <>
      {!data2 ? (<p>Loading...</p>) : (
        <div key={data2.node.id} className='wrapper'>
          <div className='author'>
            <img src={data2.node.owner.avatarUrl} className='author__avatar'
              width='200' height='100%' alt='' />
            <p className='author__name'><span>NickName: </span> {data2.node.owner.login}</p>
          </div>
          <div className='info'>
            <p className='info__name'><span>Name Repo: </span> {data2.node.name}</p>
            <p className='info__rating'><span>Stars GitHub: </span>
              {data2.node.stargazers.totalCount}
            </p>
            <p className='info__commit'> <span>Data: </span>
              {dataNew}
            </p>
            <p className='info__language'><span>Language Coding: </span>
              {data2.node.primaryLanguage.name}
            </p>
            <p className='info_description'><span>Description Repo: </span>
              {data2.node.description}
            </p>
          </div>
        </div>)}
    </>
  );

};

export default CardRepository;