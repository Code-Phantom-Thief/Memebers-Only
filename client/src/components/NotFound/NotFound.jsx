import notFound from './image/NotFound.svg'
import './NotFound.css';

const NotFound = () => {
    return (
			<div className='NotFound'>
				<img src={notFound} alt='image_notfound' />
			</div>
		);
}

export default NotFound
