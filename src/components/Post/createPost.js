import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import TagDropDown from "../Tag/tagDropDown";
import { createTagAction} from "../../redux/slices/tag/tagSlices";
import Dropzone from "react-dropzone";
import { PhotographIcon } from '@heroicons/react/outline'
import { Navigate } from "react-router-dom";

//Form schema
const postSchema = Yup.object({
  title: Yup.string().required("Se necesita un título"),
  body: Yup.string().required("Se necesita un contenido"),
  category: Yup.object().required("Elige categoría"),
  tag: Yup.object().required("Elige etiqueta"),
  image: Yup.string().required("Selecciona una imagen"),
});


export default function CreatePost() {
  const dispatch = useDispatch();

  //selector the post to check creations
  const post = useSelector(state => state?.post)
  const {isCreated, postCreated, loading, appErr, serverErr} = post;

  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      category: "",
      tag: "",
      image:"",
    },
    onSubmit: values => {
      const data = {
        title: values?.title,
        body: values?.body,
        category: values?.category?.label.toLowerCase(),
        tag: values?.tag.label,
        image: values?.image,
      };
      
      
      //dispatch(createTagAction(data.tag));

      
      dispatch(createPostAction(data));
      dispatch(createTagAction(data.tag));
      //
      
    },
    validationSchema: postSchema
  });
  //console.log(data.tag, 2);
  
  //navigate to next page if post is created
  //if(postCreated) dispatch(updateTagAction({slug:isCreated?.tag, postID:isCreated?.id}));
  if(postCreated) return <Navigate to="/"/>;
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Crea tu publicación
          </h2>
        {/*Show the error if ocurried*/}
        <h4 className=" mb-10 text-2xl text-black font-bold font-heading">
          {/*Error message*/}
          {appErr || serverErr ? (
            <div className="text-red-400 text-base">
              {serverErr} {appErr}
            </div>
          ) : null}
        </h4>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-black"
                >
                  Título
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-myblue-100 focus:border-myblue-100 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">{formik?.touched?.title}</div>
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
                label = {formik.values.tag.label}
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
                {/* body */}
                <textarea
                  value={formik.values.body}
                  onChange={formik.handleChange("body")}
                  onBlur={formik.handleBlur("body")}
                  rows="5"
                  cols="10"
                  className=" appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-white focus:bg-white  border border-gray-200 focus:ring-myblue-100 focus:border-myblue-100 focus:outline-none"
                  type="text"
                ></textarea>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.body}
                </div>
              </div>
              <div>
              {/* Submit btn */}
              {/*Btn submit*/}
              <div className="flex flex-col justify-center items-center">
                {/*Chek the state and change the content if post is in loading state */}
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
                    Publicar
                  </button>
                )}
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
