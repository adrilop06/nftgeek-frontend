/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, SearchIcon} from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import logoAndName from '../../../img/logoAndName.png';
import logoAndNameBlanco from '../../../img/logoAndNameBlanco.png';
import logo from '../../../img/logo.png';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../../../redux/slices/users/userSlices';


const navigation = [
  { name: "Publicar", href: "/games-posts", current: false },
  { name: "Publicaciones", href: "/posts", current: false },
  { name: "Escritores", href: "/users", current: false },
  { name: "Mercado", href: "/market", current: false },
  { name: "Noticias", href: "/news", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const AdminMenu = ({ isLogin }) => {
    //logout instance
    const dispatch = useDispatch();

    //
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
                        <XIcon className="block h-6 w-6 text-white " aria-hidden="true"/>
                        
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
                {/*Search bar*/ }
                <div className="hidden md:flex">
                <label class="relative block">
                    <span class="sr-only">Buscar</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <SearchIcon className="h-5 w-5 text-gray-300"></SearchIcon>
                    </span>
                    <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border rounded-full border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-myblue-100 focus:ring-myblue-100 focus:ring-1" 
                        placeholder="Buscar" 
                        type="text" name="search"/>
                </label>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">User menu</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src={isLogin?.photo}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item >
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm w-full text-gray-700')}
                                >
                                  Perfil
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                 onClick={()=> dispatch(logoutUserAction())}
                                  href="/"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-left w-full text-gray-700')}
                                >
                                  Cerrar sesión
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                </Menu>
                    
                </div>
            </div>
        </div>

            <Disclosure.Panel className="bg-myblue-100 h-screen md:hidden ">
            <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
                <div className="flex items-center justify-center pt-10">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={isLogin?.photo}
                        alt=""
                    />
                </div>
                {/*Search*/}
                <div className="flex items-center justify-center py-5">
                <input class="shadow appearance-none border rounded-full w-72 py-2 px-3 text-gray-700 leading-tight focus:border-myblue-100" 
                    type="search" 
                    placeholder="Buscar">
                </input>
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
                    to="/profile"
                    type="button"
                    className="flex items-center justify-center text-white px-3 font-medium"
                >
                <span>Perfil</span>
                </Link>
                </div>
                <div className="flex items-center justify-center text-white px-3 pt-6 font-medium">
                    <Link
                    to="/"
                    className="flex items-center justify-center text-white px-3 font-medium"
                    >
                    <span>Logout</span>
                    </Link>
                </div>
            </div>
            </Disclosure.Panel>
            </>
        )}
    </Disclosure>
  )
}

export default AdminMenu;
