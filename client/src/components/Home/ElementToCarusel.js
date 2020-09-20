import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ElementToCarusel({ query, element, artist = false, border = '0px',widthPic='auto' }) {

    let queryExist = query.path === "song" ? `?${artist ? 'artist' : query.path}=${query.id}` : ''
    
    return (
        <li className='ElementToCarusel' key={element.name + query.id}>
            <Link to={`/${query.path}/${element[`${query.path}_ID`]}${queryExist}`} className='ElementToCaruselName' >
                <img className='ElementToCaruselImage' src={element.cover_img} style={{borderRadius: border}} alt={' '} height='100px' width={widthPic} />
                <div>  {element.name}</div>
            </Link>
        </li>
    )
}

export default ElementToCarusel;
