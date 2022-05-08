import React from "react";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from "../../../redux/slices/users/userSlices";

//import {IdentificationIcon, MailIcon, LockClosedIcon} from '@heroicons/react/outline'



//Form schema
const formSchema = Yup.object({
  userName: Yup.string().required("Usuario incorrecto"),
  password: Yup.string().required("Contraseña incorrecta"),
});
//-------------------------------
//login
//-------------------------------
const Login = () => {
  //dispatch
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    onSubmit: values => {
      //we use the dispatch function to dispatch the information from form using the registerUserAction function
      dispatch(loginUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  //Get all the users details
  const store = useSelector(state => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;
    //navigate to profile if user login
  if (userAuth) return <Navigate to={`/`}/>;

  return (
  
    <div className="flex flex-col justify-center items-center">
      <div class="w-full py-20 max-w-xs ">
      <form class="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
        <h4 className="mb-5 text-2xl text-black font-bold font-heading">
          Inicia sesión
        </h4>
        <h4 className=" mb-10 text-2xl text-black font-bold font-heading">
            {/* err msg*/}
         {appErr || serverErr ? (
            <div className="text-red-400 text-base">
              {serverErr} {appErr}
            </div>
          ) : <div className="text-red-400">
          {serverErr} {appErr}
        </div>}
        </h4>
        {/* First name*/ }
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="firstName">
            Usuario
          </label>
          <p className="text-red-400 mb-2 pl-16 inline-block align-baseline text-sm">
            {formik.touched.userName && formik.errors.userName}
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.userName}
            onChange={formik.handleChange("userName")}
            onBlur={formik.handleBlur("userName")} 
            type="userName" 
            placeholder="User"/>
        </div>

        {/*Password*/}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="password">
            Password
          </label>
          <p className="text-red-400 mb-2 pl-14 inline-block align-baseline text-sm">
            {formik.touched.password && formik.errors.password} 
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type="password" 
            placeholder="******************"/>
        </div>
       
        {/*Btn submit*/}
        <div className="flex flex-col justify-center items-center">
          {loading? ( 
            <button
              disabled
              className="py-2 px-8 bg-gray-300  text-white font-bold rounded border-b-4 bg-gray-300" >
               Loading...
            </button>
          ):(
            <button
              type="submit"
              className="py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100">
               Iniciar sesión
            </button>
          )}
        </div>

        <div class="flex items-center justify-between py-8">
          <p class="inline-block align-baseline font-bold text-sm">
            ¿No tienes cuenta?
          </p>
          <Link to="/registration" class="inline-block align-baseline font-bold text-sm text-myblue-200 hover:text-blue-800" href="#">
            Registrarse
          </Link>
        </div>
      </form>
      
    </div>
  </div>
  );
};

export default Login;
