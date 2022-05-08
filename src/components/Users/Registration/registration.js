import React from "react";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from "yup";
import { registerUserAction } from "../../../redux/slices/users/userSlices";
import Dropzone from "react-dropzone";
import { PhotographIcon } from "@heroicons/react/solid";

//import {IdentificationIcon, MailIcon, LockClosedIcon} from '@heroicons/react/outline'



//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("Se necesita un nombre"),
  lastName: Yup.string().required("Se necesita el apellido"),
  userName: Yup.string().required("Se necesita el apellido"),
  email: Yup.string().required("Se necesita un email"),
  password: Yup.string().required("Falta una contraseña"),
  photo: Yup.string().required("Selecciona una imagen"),
  bio: Yup.string().required("Escribe tu bio")
});
//-------------------------------
//Register
//-------------------------------
const Registration = () => {
  //dispatch
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      photo:"", 
      bio:""
    },
    onSubmit: values => {
      const data = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        userName: values?.userName,
        email: values?.email,
        password: values?.password,
        photo:values?.photo,
        bio:values?.bio
      };
      //we use the dispatch function to dispatch the information from form using the registerUserAction function
      dispatch(registerUserAction(data));
      
    },
    validationSchema: formSchema,
  });
  //states
  const storeData = useSelector(store => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;

  //Navigate
  if (registered) {
    return <Navigate to={`/`}/>;
  }
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div class="w-full py-20 max-w-xs ">
      <form class="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
        <h4 className="mb-5 text-2xl text-black font-bold font-heading">
          Registro
        </h4>
        <h4 className=" mb-10 text-2xl text-black font-bold font-heading">
            {/* err msg*/}
         {appErr || serverErr ? (
            <div className="text-red-400 text-base">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h4>
        {/* First name*/ }
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="firstName">
            Nombre
          </label>
          <p className="text-red-400 mb-2 pl-14 inline-block align-baseline text-sm">
            {formik.touched.firstName && formik.errors.firstName}
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")} 
            type="firstName" 
            placeholder="Nombre"/>
        </div>

       {/* Last name */}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="lastName">
            Apellido
          </label>
          <p className="text-red-400 mb-2 pl-14 inline-block align-baseline text-sm">
            {formik.touched.lastName && formik.errors.lastName} 
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            type="lastName" 
            placeholder="Apellido"/>
        </div>

        {/* user name */}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="lastName">
            Nombre de usuario
          </label>
          <p className="text-red-400 mb-2 pl-14 inline-block align-baseline text-sm">
            {formik.touched.userName && formik.errors.userName} 
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.userName}
            onChange={formik.handleChange("userName")}
            onBlur={formik.handleBlur("userName")}
            type="userName" 
            placeholder="usuario123"/>
        </div>

        {/* email*/}
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2 inline-block align-baseline" for="email">
            Email
          </label>
          <p className="text-red-400 mb-2 pl-20 inline-block align-baseline text-sm">
            {formik.touched.email && formik.errors.email}  
          </p>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            type="email" 
            placeholder="email@gmail.com"/>
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

              <label className="block text-sm font-medium text-black"> 
                Selecciona una photo
              </label>
              <div className="flex w-full h-35 items-center justify-center">
                <div className="w-24 flex px-0 py-4 cursor-pointer">
                <Dropzone
                    onBlur={formik.handleBlur("photo")}
                    accept="image/jpeg, image/png"
                    onDrop={acceptedFiles => {
                      formik.setFieldValue("photo", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-black text-lg cursor-pointer hover:text-myblue-100">
                            <PhotographIcon/>
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              <textarea
                  value={formik.values.bio}
                  onChange={formik.handleChange("bio")}
                  onBlur={formik.handleBlur("bio")}
                  rows="5"
                  cols="10"
                  className="mb-4 appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-white focus:bg-white  border border-gray-200 focus:ring-myblue-100 focus:border-myblue-100 focus:outline-none"
                  type="text"
              ></textarea>
              {/*Btn submit*/}
              <div className="flex flex-col justify-center items-center">
                {loading? ( 
                  <button
                    disabled
                    className="py-2 px-8 bg-gray-300  text-white font-bold rounded border-b-4 bg-gray-300" >
                    Cargando...
                  </button>
                ):(
                  <button
                    type="submit"
                    className="py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100">
                    Registro
                  </button>
                )}
              </div>

              <div class="flex items-center justify-between py-8">
                <p class="inline-block align-baseline font-bold text-sm">
                  ¿Ya tienes cuenta?
                </p>
                <Link to="/login" class="inline-block align-baseline font-bold text-sm text-myblue-200 hover:text-blue-800" href="#">
                  Iniciar sesión
                </Link>
              </div>
            </form>
      
    </div>
  </div>
  );
};

export default Registration;
