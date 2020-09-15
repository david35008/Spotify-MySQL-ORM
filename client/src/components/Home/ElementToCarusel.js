import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ElementToCarusel({ query, element }) {

    let queryExist = '';
    let idType = element[`${query.path}_ID`];
    if(query.path === "song") {
        queryExist = `?${query.path}=${query.id}`;
    }

    return (
        <li className='ElementToCarusel' key={Math.random()}>
            <Link to={`/${query.path}/${idType}${queryExist}`} className='ElementToCaruselName' >
                <img className='ElementToCaruselImage' src={element.cover_img} alt={' '} height='100px' />
                <div>  {element.name}</div>
            </Link>
        </li>
    )
}

export default ElementToCarusel;
