import { useEffect, useState } from 'react'
import { GET_REPOSITORIES } from '../../query/query.tsx'
import { useQuery } from '@apollo/client'
import { getPageCount, getPagesArray } from '../../utils/pagesCount.tsx';

import { setDatas } from '../../redux/slice/datasSlice.tsx';
import './applist.scss'
import '../../index.css'
import ItemAppList from '../ItemAppList/ItemAppList.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { ICardRepositoryProps } from "../../types/types";

function AppList() {
  const dispatch = useAppDispatch()
  const limit = 10;
  const [first] = useState (100);
  const [after] = useState();
  const [nameRepo, setNameRepo] = useState(localStorage.getItem('nameRepo') || '')

  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')!) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { name: nameRepo, first: first, after: after }
    
  })
console.log(data)
  const pageArray = getPagesArray(totalPages)
  const datasRepo = useAppSelector((state) => state.datas.datas)
  console.log(nameRepo)
  console.log(datasRepo)
  useEffect(() => {
    if (nameRepo === '') {
      setCurrentPage(1)
    } else {
      setCurrentPage(parseInt(localStorage.getItem('currentPage')!) || 1);
    }

    function getDataRepository() {
      if (data !== undefined) {
        const totalRepo = data.search.edges
        dispatch(setDatas(totalRepo))
        console.log(totalRepo)
        const totalCount = data ? data.search.edges.length : 0;
        setTotalPages(getPageCount(totalCount, limit))
      } else {
        return null
      }
  
    }
    getDataRepository();
  }, [data, dispatch, nameRepo])

  useEffect(() => {
    localStorage.setItem('nameRepo', nameRepo);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [nameRepo, currentPage])

  return (
    <>

      <div className='search'>
        <input placeholder='Введите название' className='search__input' type='text' value={nameRepo} onChange={(e) => setNameRepo(e.target.value)} />
      </div>
      <div className='items'>
        {loading ? (<p className='items__loader'>Loading...</p>) : (
          datasRepo.slice((currentPage - 1) * limit, currentPage * limit).map((data: ICardRepositoryProps) =>
            <ItemAppList key={data.node.id} data={data} />
          )
        )}
      </div>
      <div className='pagination'>
        {loading ? (null) : (
          pageArray.map((pageNumber: number) =>
            <button
              key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </>
  )
}
export default AppList
