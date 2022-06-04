import React from "react";
import NoUser from "../../img/nouser.png";

function CreatePostNoUser() {

  return (

        <div className="w-full h-full max-w-2xl py-20 mx-auto">
        <div className="mx-auto">
        <h2 className="w-100 p-10 w-full flex mt-50 font-bold items-center justify-center" >Necesitas estar registrado o logearte para crear tu publicación</h2>
            <div className="flex items-center justify-center py-8">
                <a className="p-2 px-4 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100 text-xs sm:text-base" href="/registration">
                    Registrarse
                </a>
            
                <a className="p-2 ml-10 px-4 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100 text-xs sm:text-base" href="/login">
                    Iniciar sesión
                </a>
            </div>
        </div>
        </div>

                
  




  );
}

export default CreatePostNoUser;