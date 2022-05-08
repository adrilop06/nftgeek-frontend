/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import logoAndNameBlanco from '../../img/logoAndNameBlanco.png';


export default function Footer() {


  return (
    <div className="bg-myblue-300 max-w-7xl mx-auto px-2 sm:px-2 lg:px-2">
        <div className="relative flex items-center justify-between h-16">
            <img src={logoAndNameBlanco} className="h-8 w-auto"></img>
            <Link to="/about-us"><p className="text-white font-bold">Sobre nosotros</p></Link>
        </div>

    </div>
  )
}


