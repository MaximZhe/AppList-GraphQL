
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { setSingleRepoData } from '../../redux/slice/datasSlice';
import './ItemAppList.scss';
import star from "../../assets/icons/star-rating.svg"
import { formatDate } from '../../utils/formatData';
import { ICardRepositoryProps } from "../../types/types";
import { useAppDispatch } from '../../hooks/redux';

interface IItemData {
    data: ICardRepositoryProps,
}

const ItemAppList: FC<IItemData> = ({ data }) => {
    const dispatch = useAppDispatch()
    const handleLinkClick = (data: ICardRepositoryProps) => {
        dispatch(setSingleRepoData(data))
    };
    const originalDate = `${data.node.pushedAt}`;
    const formattedDate = formatDate(originalDate);


    return (
        <div key={data.node.id} className='item'>
            <h2 className='item__title'><span>Repository name : </span>
                <Link to={`/repos/${data.node.id}`}
                    onClick={() => handleLinkClick(data)}>
                    {data.node.name}</Link>
            </h2>
            <div className='item__rating'>
                <p ><span>Stars GitHub: </span>{data.node.stargazers.totalCount}</p>
                <img src={star} loading='lazy' width='20' height='20' alt='' />
            </div>
            <p className='item__data'><span>Data last commit : </span> {formattedDate}</p>
            <p className='item__link'><a href={data.node.url}>Link Repository</a></p>
        </div>
    );
};

export default ItemAppList;