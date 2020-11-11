import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import pageNotFound from '../../images/pageNotFound.png';

const NotFound = () => {

  const location = useHistory()

  return (
    <div>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <button className='goBack' onClick={() => location.goBack()}>Go Back</button>
      <Link to='/'><div className='goHome'>Go Home</div></Link>
      <img src={pageNotFound} alt=' ' />
    </div>
  )
}

export default NotFound;