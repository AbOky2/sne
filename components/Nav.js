import Link from 'next/link';


export default function Nav() {
    return (
        <nav className='p-4 border shadow-lg sticky'>
            <ul className=' flex items-center gap-4'>
                <li >
                    <Link href="/">
                        <p className='text-[26px] font-semibold  hover:text-green-900'>Accueil</p>
                    </Link>
                </li>
                <li>
                    <Link href="/add-post">
                        <p className='text-[26px] font-semibold hover:text-green-900'>Ajout des postes</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}