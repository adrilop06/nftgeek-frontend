import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

//Form schema
const formSchema = Yup.object({
  body: Yup.string().required("Contenido es requerido"),
});

const CreateComments = ({ postID }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: values => {
      const data = {
        postID,
        body: values?.body,
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <div>
      <div className="p-20 overflow-hidden">
        <h1 className="text-black pb-4 border-b-4 border-gray-300">Deja tu comentario</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
          >
            <div className="mt-10">
              {/* body */}
              <textarea
                value={formik.body}
                onChange={formik.handleChange("body")}
                onBlur={formik.handleBlur("body")}
                rows="5"
                cols="10"
                className=" border-b-4 border-gray-300 appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-white focus:bg-white  border border-gray-200 focus:ring-myblue-100 focus:border-myblue-100 focus:outline-none"
                type="text"
                ></textarea>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.body}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
               
                  <button
                    type="submit"
                    className="py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100">
                    Publicar
                  </button>
              </div>
          </form>
          <div className="text-red-400 mb-2 mt-2">
            {formik.touched.body && formik.errors.body}
          </div>
      </div>
    </div>
  );
};

export default CreateComments;
