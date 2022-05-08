import React from 'react';
import PublicMenu from './public/publicMenu';
import PrivateMenu from './private/privateMenu';
import {useSelector} from 'react-redux';
import AdminMenu from './admin/adminMenu';

const NavMenu = () => {
  //check if there is a user in the store
  const state = useSelector(state => state.users)
  //get the userAuth from the user gettin by state
  const {userAuth} = state;
  const admin = userAuth?.isAdmin;
  return (
    <>
      {admin ? <AdminMenu/> :userAuth ? <PrivateMenu isLogin={userAuth}/>: <PublicMenu/>}
    </>
  
  )
};

export default NavMenu