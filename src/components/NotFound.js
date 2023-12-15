

import React from 'react';
import notFound from "../assets/images/404.jpg";

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={notFound} className='img-fluid image' alt="" />
      <h2 className='title'>The page you are looking for is not exist or removed</h2>
    </div>
  )
}

export default NotFound