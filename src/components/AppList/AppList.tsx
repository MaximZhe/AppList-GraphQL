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

  const [nameRepo, setNameRepo] = useState(localStorage.getItem('nameRepo') || '')
  const [first, setFirst] = useState(100)
  const [after, setAfter] = useState()
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')!) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { name: nameRepo, first: first, after: after }

  })

  const pageArray = getPagesArray(totalPages)
  const datas = useAppSelector((state) => state.datas.datas)

  function getDataRepository() {
    if (data !== undefined) {
      const totalRepo = data.search.edges
      dispatch(setDatas(totalRepo))
      const totalCount = data ? data.search.edges.length : 0;
      setTotalPages(getPageCount(totalCount, limit))
    } else {
      return null
    }

  }
  useEffect(() => {
    if (nameRepo === '') {
      setCurrentPage(1)
    } else {
      const currentPage = localStorage.getItem('currentPage');
      setCurrentPage(parseInt(currentPage || '1'));
    }

  }, [nameRepo])

  useEffect(() => {
    localStorage.setItem('nameRepo', nameRepo);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [nameRepo, currentPage])

  return (
    <>
      {error ? (console.log(error)) : null}
      <div className='search'>
        <input className='search__input' type='text' value={nameRepo} onChange={(e) => setNameRepo(e.target.value)} />
        <button className='search__btn' type='button' onClick={getDataRepository}> Search</button>
      </div>
      <div className='items'>
        {loading ? (<p>Loading...</p>) : (
          datas.slice((currentPage - 1) * limit, currentPage * limit).map((data: ICardRepositoryProps) =>
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
