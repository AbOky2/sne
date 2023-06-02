import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react';

export default function Home() {
    const { data: session } = useSession()

    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
          if (!user) {
            router.push("/login");
          }
        }
        getUser();
      }, 
      [user]);


    return (
       user?.role=="user"? (
        
       
        <div className='bg-cyan-300'>
            <Head>
                <title>Accueil</title>
            </Head>

            <Nav />

            {/* <div className='bg-white  w-full text-[30px] p-4 items-center text-center font-bold text-green-900 mt-16'>
                Bienvenue dans la plateforme d'archivage. Ici vous pouvez consulter et archiver des documents.

            </div> */}
            

            <p className='md:text-[48px] text-center font-["DM Serif Display"] font-bold font-serif mt-4'> Liste des dossiers</p>

            <main>
                
                <div className=' p-4 w-full grid grid-cols-2 gap-4 md:grid-cols-3 '>

                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:-rotate-2'>
                        <a href='/dossiers'>
                        Documents contractuels
                        </a>
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2 '>
                        Communications
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Le Dossier d'execution
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Les plannings
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Reporting
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Les instructions de chantier
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Les modifications
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Les Essais
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Les demandes de reception
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Photothèque
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Non-conformité
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        AC, AP et Action d'amélioration
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Securité / Rapport d'accident
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Attachements et décomptes des travaux
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Attachements et décomptes du Consultant
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Reception provisoire
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Reception définitive
                        <img src='folder.png'/>
                    </div>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold'>
                        Autre
                        <img src='folder.png'/>
                    </div>


              
                </div>
            </main>
            
        </div>) : (


<div className='bg-cyan-300'>
            <Head>
                <title>Accueil</title>
            </Head>

            <Nav />

            {/* <div className='bg-white  w-full text-[30px] p-4 items-center text-center font-bold text-green-900 mt-16'>
                Bienvenue dans la plateforme d'archivage. Ici vous pouvez consulter et archiver des documents.

            </div> */}
            

            <p className='md:text-[48px] text-center font-["DM Serif Display"] font-bold font-serif mt-4'> Liste des dossiers</p>

            <main>
                
                <div className=' p-12 w-full grid grid-cols-2 gap-4 md:grid-cols-6  '>

                <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2 '>
                        Communications
                        <img src='folder.png'/>
                    </div>
                   </a>
                   <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Les plannings
                        <img src='folder.png'/>
                    </div>
                    </a>
                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Reporting
                        <img src='folder.png'/>
                    </div>
                    </a>
                   
                
                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Photothèque
                        <img src='folder.png'/>
                    </div>
                    </a>
                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Non-conformité
                        <img src='folder.png'/>
                    </div>
                    </a>

                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        AC, AP et Action d'amélioration
                        <img src='folder.png'/>
                    </div>
                    </a>

                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Securité / Rapport d'accident
                        <img src='folder.png'/>
                    </div>
                    </a>
                   
                    <a href='/dossiers'>
                    <div className='bg-white rounded-lg p-4 hover:shadow-md font-bold hover:rotate-2'>
                        Autre
                        <img src='folder.png'/>
                    </div>
                    </a>


              
                </div>
            </main>
            
        </div>
            

        )
    );
}

