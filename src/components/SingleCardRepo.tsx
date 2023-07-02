
import React from 'react';
import { useSelector } from 'react-redux';

const SingleCardRepo = () => {
  const data2 = useSelector((state:any) => state.datas.singleRepoData)
  console.log(data2)
  return (
    <div>
      {!data2 ? (<p>Loading...</p>) : (
      <div key ={data2.node.id}>
      <p>{data2.node.owner.login}</p>
        <p>{data2.node.name}</p>
        <img src={data2.node.owner.avatarUrl}/>
      </div>)}
    </div>
  );

};

export default SingleCardRepo;