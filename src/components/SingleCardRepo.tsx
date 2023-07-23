
import React from 'react';
import { useSelector } from 'react-redux';

const SingleCardRepo = () => {
  const data2 = useSelector((state:any) => state.datas.singleRepoData)
  console.log(data2)
  return (
    <div>
      {!data2 ? (<p>Loading...</p>) : (
      <div key ={data2.node.id}>
        <p>Name Repo: {data2.node.name}</p>
        <p>Stars GitHub: {data2.node.stargazers.totalCount}</p>
        <p> Data: {data2.node.pushedAt}</p>
        <img src={data2.node.owner.avatarUrl}/>
      <p>NickName: {data2.node.owner.login}</p>
      <p> Language Coding: {data2.node.primaryLanguage.name}</p>
      <p> Description Repo: {data2.node.description}</p>
        
        
        
      </div>)}
    </div>
  );

};

export default SingleCardRepo;