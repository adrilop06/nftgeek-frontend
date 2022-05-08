import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import TagDropDown from "../Tag/tagDropDown";
import { PhotographIcon } from '@heroicons/react/outline'
import { createTagAction } from "../../redux/slices/tag/tagSlices";
import { fetchInsidePostAction, updatePostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";


const updateSchema = Yup.object({
  title: Yup.string().required("Se necesita un título"),
  body: Yup.string().required("Se necesita un contenido"),
  category: Yup.object().required("Elige categoría"),
  tag: Yup.object().required("Elige etiqueta"),
  image: Yup.string().required("NEcesitas una imagen"),
});

export default function UpdatePost() {
    
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchInsidePostAction(id))
    }, [id, dispatch]);
    
    //select the information from post
    const post = useSelector(state => state?.post);
    const { 
        postContain,
    } = post;

    //updated post
    const isUpdated = useSelector(state => state.post);
    const {loading, updatedPost, appErr, serverErr}= isUpdated;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: postContain?.title,
            body: postContain?.body,
            category: postContain?.category,
            tag: postContain?.tag,
            image: postContain?.image
        },
        onSubmit: values => {
            const data = {
                title: values?.title,
                body: values?.body,
                category: values?.category?.label,
                tag: values?.tag?.label,
                image:values?.image,
                id
            };
          
            
            
            dispatch(updatePostAction(data));
            dispatch(createTagAction(data.tag));

        },
        validationSchema: updateSchema
    });

    
    if(updatedPost) return <Navigate to={`/`}/>;
  return (
    <>
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                Vas a editar tu publicación   
                <span className="text-myblue-300"> {postContain?.title}</span>
            </h2>
            </div>
            {appErr|| serverErr ? 
                <h1 className="text-red-500 text-xl text-center">{serverErr.message} {appErr.message}</h1> 
            : null}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-slate-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                    <label
                    className="block text-sm font-medium text-black"
                    >
                    Title
                    </label>
                    <div className="mt-1">
                    <input
                        id="title"
                        name="title"
                        type="title"
                        autoComplete="title"
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                        onChange={formik.handleChange("title")}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-myblue-100 focus:border-myblue-100 sm:text-sm"
                    />
                    </div>
                    <div className="text-red-500">
                    {formik.touched.title && formik.errors.title}
                    </div>
                </div>
                <label
                  className="block text-sm font-medium text-black"
                >
                    Categoría
                </label>
                <CategoryDropDown 
                    value={formik.values.category?.label}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    error={formik.errors.category}
                    touched={formik.touched.category}
                />
               <label
                  className="block text-sm font-medium text-black"
                >
                    Etiqueta
                </label>
                <TagDropDown 
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    error={formik.errors.tag}
                    touched={formik.touched.tag}
                    value={formik.values.tag}
                    label={formik.values.label}
                    
                />
                <label className="block text-sm font-medium text-black"> 
                Selecciona una imagen
                </label>
                <div className="flex w-full h-35 items-center justify-center">
                    <div className="w-24 flex px-0 py-4 cursor-pointer">
                        <Dropzone
                            onBlur={formik.handleBlur("image")}
                            accept="image/jpeg, image/png"
                            onDrop={acceptedFiles => {
                            formik.setFieldValue("image", acceptedFiles[0]);
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
               
                <div>
                    <label
                    className="block text-sm font-medium text-black"
                    >
                    Contenido
                    </label>
                    <textarea
                    rows="5"
                    cols="10"
                    onBlur={formik.handleBlur("body")}
                    value={formik.values.body}
                    onChange={formik.handleChange("body")}
                    className="rounded-lg  appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-white  border border-gray-300 focus:border-myblue-100  focus:outline-none"
                    type="text"
                    ></textarea>
                    <div className="text-red-500">
                    {formik.touched.body && formik.errors.body} 
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    {loading ? (
                        <button
                        disabled
                        className="py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100">
                            Cargando...
                        </button>
                    ):(
                        <button
                        type="submit"
                        className="py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100">
                            Publicar cambios
                        </button>
                    )}
                </div>
                </form>
            </div>
            </div>
        </div>

    </>
  );
}
