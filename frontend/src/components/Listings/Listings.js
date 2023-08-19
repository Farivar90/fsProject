import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';


function Listings() {
    const currentUser = useSelector(state => state.session.user);
    if (!currentUser) {
        return <Redirect to={`/`} />;
      }

  return (
    <div>
      <h1>Property Listings</h1>

        <p>Under Construction...</p>
    </div>
  );
}

export default Listings;
