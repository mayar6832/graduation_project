import React, { useEffect, useState } from 'react'
import { getUserReviews } from '../axios'
import UserRev from '../components/UserRev';

function UserReviews() {
  const [userReviews, setUserReviews] = useState(null);
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
  const user = JSON.parse(tmp);
  console.log(user._id);
  const uId = user._id;
  useEffect(() => {

    getUserReviews(uId).then((response) => {
      setUserReviews(response.data)

    });

  }, []);

  return (
    userReviews && <UserRev reviews={userReviews} />
  )
}

export default UserReviews