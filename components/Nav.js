import Link from 'next/link';
import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from "next/router";
import { Dropdown } from "@nextui-org/react";


export default function Nav() {
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
      });

    return (
        
        <nav className='p-4 border shadow-lg sticky bg-[#F5CA8A]'>
            
            <Dropdown>
                <Dropdown.Button flat>Utilisateur</Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item key="new">{user?.role}</Dropdown.Item>
                    <Dropdown.Item key="delete" color="error">
                    <button onClick={() => signOut()}>Deconnexion</button>

                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 

            <ul className=' flex gap-4 flex-row-reverse '>
                <li className=' order-1' >
                    <Link href="/">
                        <p className='text-[18px] font-semibold  hover:text-green-900'>Accueil</p>
                    </Link>
                </li>
                <li>
                    <Link href="/add-post">
                        <p className='text-[18px] font-semibold hover:text-green-900'>Ajout des postes</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}