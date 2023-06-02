import Link from 'next/link';
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Dropdown, Avatar, Text, Grid, User } from "@nextui-org/react";


export default function Nav() {
    const { data: session } = useSession()
    const user = session?.user;
 

    

    return (
        
        <nav className='p-4 border shadow-lg sticky bg-[#F5CA8A] flex h-20 '>
            
            <div className=' flex  w-full '>
                <Link href='/'>
                <img className=' rounded-full h-14 w-14 -mt-2.5 ' src='SNE.jpg' />
                </Link>
            </div>
             

            <ul className=' flex gap-4 flex-row-reverse w-full items-center '>
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
                <li className='order-first rounded-full '>
                    <Dropdown>
                    <Dropdown.Trigger>
            <Avatar
              bordered
              size="lg"
              as="button"
              color="default"
              src="user.png"
            />
          </Dropdown.Trigger>
                <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item key="new">{user?.role}</Dropdown.Item>
                    <Dropdown.Item key="delete" color="error">
                    <button onClick={() => signOut()}>Deconnexion</button>

                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
           
                </li>
            </ul>
        </nav>
    );
}