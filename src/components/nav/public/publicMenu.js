/* This example requires Tailwind CSS v2.0+ */
import React, {  useState } from 'react'
import { Disclosure} from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoAndName from '../../../img/logoAndName.png';
import logoAndNameBlanco from '../../../img/logoAndNameBlanco.png';
import logo from '../../../img/logo.png';



const navigation = [
  { name: "Publicar", href: "/create-post", current: false },
  { name: "Juegos", href: "/games", current: false },
  { name: "Aprendizaje", href: "/learning", current: false },
  { name: "Mercado", href: "/market", current: false },
  { name: "Noticias", href: "/news", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PublicMenu() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  
  let inputHandler = (e) => {
    e.preventDefault();


    if (title.trim()) {

      navigate(`/posts/results/${title}`);
      refreshPage();
    } else {
      navigate("/");
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <Disclosure as="nav" className="-space-y-1" >
      {({ open }) => (
        <>
          <div  className={`${open ? "bg-myblue-100 max-w-7xl mx-auto px-2 sm:px-2 lg:px-2" : "bg-white max-w-7xl mx-auto px-2 sm:px-2 lg:px-2 border-b-4 border-myblue-100 "}`}>

            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="dbutton inline-flex items-center justify-center p-2 rounded-md">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6 text-white" aria-hidden="true"/>
                    
                  ) : (
                    <MenuIcon className="block h-6 w-6 text-black" aria-hidden="true"/>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center  md:items-stretch md:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="md:block lg:hidden sm: hidden h-8 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                    <img
                      className="md:hidden lg:hidden sm: block h-8 w-auto"
                      src={`${open ? logoAndNameBlanco : logoAndName}`}
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={logoAndName}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden md:block md:ml-2">
                  <div className="flex">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-black' : 'text-black hover:bg-myblue-100 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex">
              <form onSubmit={inputHandler}>
                <div className="flex items-center">
                <span className="sr-only">Buscar</span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-1/2 border  border-slate-300  py-2 pr-3 shadow-sm focus:outline-none focus:border-myblue-100 focus:ring-myblue-100 focus:ring-1" 
                        placeholder="Buscar" 
                        type="text" 
                        name="search"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      
                    />
                    <button id="search_btn"  className="btn px-1 py-2 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100" type="submit">
                      Buscar
                    </button>
                </div>
                </form>
                  {/*Login and registrer*/}

                    <div className="flex-shrink-0">
                      <Link
                        to="/login"
                        type="button"
                        className=" px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-myblue-100 hover:bg-myblue-300"
                      >
                      <span>Login</span>
                      </Link>
                    </div>
                    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                      <Link
                        to="/registration"
                        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-myblue-100 hover:bg-myblue-300"
                      >
                        <span>Registro</span>
                      </Link>
                    </div>

                </div>
            </div>
          </div>

          <Disclosure.Panel className="bg-myblue-100 h-screen md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
            {/*Search*/}
            {/*Search*/}
            <div className="flex items-center justify-center">
                <form onSubmit={inputHandler}>
                <div className="flex items-center ">
                <span className="sr-only">Buscar</span>
                    <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-40 border  border-slate-300  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-myblue-100 focus:ring-myblue-100 focus:ring-1" 
                        placeholder="Buscar" 
                        type="text" 
                        name="search"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      
                    />
                    <button id="search_btn"  className="btn px-1  py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded transition duration-200 border-b-4 border-gray-700 hover:border-gray-500" type="submit">
                      Buscar
                    </button>
                </div>
                </form>
                </div>
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "flex items-center justify-center text-white px-3 py-4 font-medium"
                    : "flex items-center justify-center text-white px-3 py-4 font-medium",
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
            {/*Login and registrer*/}
            <div className="flex items-center justify-center text-white px-3 pt-14 font-medium">
              <Link
                to="/login"
                type="button"
                className="flex items-center justify-center text-white px-3 font-medium"
              >
              <span>Login</span>
              </Link>
            </div>
            <div className="flex items-center justify-center text-white px-3 pt-6 font-medium">
                <Link
                  to="/registration"
                  className="flex items-center justify-center text-white px-3 font-medium"
                >
                <span>Registro</span>
                </Link>
            </div>
          </div>
        </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
