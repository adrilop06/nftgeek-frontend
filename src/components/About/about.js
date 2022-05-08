import React from "react";
import { ExternalLink } from 'react-external-link';
import emailjs from '@emailjs/browser';

const About = () => {
   
    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('service_zyr3qjr', 'template_s07fikc', e.target, 'user_B7H3JXC6clCsdiapa8KFK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
  
    return (
        <section>
            <div className=" max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
                <div className="grid grid-cols-1 sm:grid-cols-12 ">
                <h1 className="col-span-6 font-bold text-2xl mb-10">NFT GEEK, la web de todos!</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 ">
                    <img src="https://cdn.pixabay.com/photo/2021/09/06/12/40/cryptocurrency-6601591_960_720.jpg" className="object-cover col-span-12 h-2/3 w-full"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12">
                <p className="col-span-12 text-lg">NFT Geek es un prototipo de web elaborado para la culminación del Grado Múltimedia en la Universidad Oberta de Catalunya. La aplicación del
                ha sido desarrollada empleando Nodejs, Express, Redux, React, MongoDB y TailwindCSS. </p>
                <br></br>
                <p className="col-span-12 text-lg">Sobre mi: Mi nombre es Adrián López Pazos, tengo treinta y muy poquitos años, y, aunque soy del sur de España, concretamente de Jerez de la Frontera, actualmente resido en la capital de Texas, Austin.
                    De momento trabajo como School Bus Driver (si, los autobuses amarillos con el stop que vemos en las películas), pero espero que este proyecto final me ayude a hacer lo que realmente me apasiona. Si quereis saber un poco más
                    sobre mí, aqui os dejo mi portfolio:   
                    <ExternalLink className="font-bold" href={`https://alpazos.es`} target="_blank">
                        Mi portfolio
                    </ExternalLink>
                    </p>
                </div>
                <div className="col-span-12">
                        <form onSubmit={sendEmail} >
                            <div className="grid grid-cols-1 sm:grid-cols-12 pt-5 mx-auto w-full">
                                <div className="col-span-12 form-group mx-auto">
                                    <input type="text" className="form-control" placeholder="Name" name="name"/>
                                </div>
                                <div className="col-span-12 form-group pt-2 mx-auto">
                                    <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                                </div>
                                <div className="col-span-12 form-group pt-2 mx-auto">
                                    <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                                </div>
                                <div className="col-span-12 form-group pt-2 mx-auto">
                                    <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                                </div>
                                <div className="col-span-12 pt-3 mx-auto">
                                    <input 
                                        type="submit" 
                                        className="btn btn-info py-2 px-8 bg-myblue-100 hover:bg-myblue-300 text-white font-bold rounded transition duration-200 border-b-4 border-myblue-300 hover:border-myblue-100" 
                                        value="Send Message">

                                    </input>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </section>
    );
};

export default About;
