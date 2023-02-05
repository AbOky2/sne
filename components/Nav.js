


export default function Nav() {
    return (
        <nav className='p-4 border shadow-lg sticky'>
            <ul className=' flex items-center gap-4'>
                <li >
                   
                        <a className='text-[26px] font-semibold  hover:text-green-900' href='/'>Accueil</a>
                
                </li>
                <li>
                    
                        <a className='text-[26px] font-semibold hover:text-green-900' href="/add-post">Ajout des postes</a>
                    
                </li>
            </ul>
        </nav>
    );
}