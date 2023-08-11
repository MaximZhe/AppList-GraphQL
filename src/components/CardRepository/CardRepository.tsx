
import React from 'react';
import moment from 'moment';
import './CardRepository.scss';
import 'moment/locale/ru';
import { useAppSelector } from '../../hooks/redux';


const CardRepository = () => {
  const dataSingleRepo = useAppSelector((state) => state.datas.singleRepoData)
  const dataNew = moment(dataSingleRepo.node.pushedAt).format('DD.MM.YYYY');
  return (
    <>
      {!dataSingleRepo ? (<p>Loading...</p>) : (
        <div key={dataSingleRepo.node.id} className='wrapper'>
          <div className='author'>
            <img src={dataSingleRepo.node.owner.avatarUrl} className='author__avatar'
              width='200' height='100%' alt='' />
            <p className='author__name'><span>NickName: </span> {dataSingleRepo.node.owner.login}</p>
          </div>
          <div className='info'>
            <p className='info__name'><span>Name Repo: </span> {dataSingleRepo.node.name}</p>
            <p className='info__rating'><span>Stars GitHub: </span>
              {dataSingleRepo.node.stargazers.totalCount}
            </p>
            <p className='info__commit'> <span>Data: </span>
              {dataNew}
            </p>
            <p className='info__language'><span>Language Coding: </span>
              {dataSingleRepo.node.primaryLanguage.name}
            </p>
            <p className='info_description'><span>Description Repo: </span>
              {dataSingleRepo.node.description}
            </p>
          </div>
        </div>)}
    </>
  );

};

export default CardRepository;