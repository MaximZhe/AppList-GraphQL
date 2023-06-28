
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {GET_REPOSITORIES2} from '../query/query'



const SingleCardRepo = () => {
  const dat = useSelector((state:any) => state.datas.datas)
  const owner = useSelector((state:any) => state.datas.oneRepo.owner)
  const names = useSelector((state:any) => state.datas.oneRepo.name)
  console.log(names, owner)
  
  const ow = owner
  const n = names
  
  const useRepo = (owner: string,name: string) => {
    const {data,loading,error} = useQuery(GET_REPOSITORIES2, {
      variables: { owner, name}
    }
      )
      return {
        data,
        loading,
        error
      };
  }

  const {data,loading,error} = useRepo(ow, n)
  console.log(data,loading,error)
  // const [singleRepo, setSingleRepo] = useState(datas)
  //    if (loading) {
  //      return <p>Loading...</p>;
  //   }
  //   if (error) {
  //     return <p>Error :(</p>;
  //  }
  //  console.log(repositoryId )
  
  
  console.log(dat[0].node.id)
  return (
    <div>
      {loading ? (<p>Loading...</p>) : (
      <div key ={data.repository.id}>
      <p>{data.repository.owner.login}</p>
        <p>{data.repository.name}</p>
        <img src={data.repository.owner.avatarUrl}/>
      </div>)}
    </div>
  );

};

export default SingleCardRepo;