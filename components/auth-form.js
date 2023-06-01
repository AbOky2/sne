import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


async function createUser(email, password, role) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password,role }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const roleInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      await signIn('credentials', {
        redirect: '/',
        email: enteredEmail,
        password: enteredPassword,
        role: enteredRole,
      });

    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword, enteredRole);
        setRegistered(true)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className=' bg-white p-4'>
      {!registered ? (
        <>
          <div className=' p-4 md:flex grid'>
          <div className='bg-white p-4 w-full md:order-first order-last'>
          <h1 className='md:text-[50px] text-4xl font-bold text-[#285689]'>{isLogin ? 'Se connecter' : 'Sign Up'}</h1>
              <form onSubmit={submitHandler}>
                <div className=' p-4 flex flex-col'>
                  <label className=' font-bold' htmlFor='email'>Your Email</label>
                  <input className='bg-[#F1F1F1] rounded-xl p-2' type='email' id='email' required ref={emailInputRef} />
                </div>
                <div  className=' p-4 flex flex-col'>
                  <label  className=' font-bold' htmlFor='password'>Your Password</label>
                  <input
                  className='bg-[#F1F1F1] rounded-xl p-2'
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                  />
                </div>
                <div className=' p-4 flex flex-col'>
                  <label  className=' font-bold ' htmlFor='role'>Role</label>
                  <select  className=' font-bold bg-[#F1F1F1] rounded-xl p-2' name='role' id='role-select' ref={roleInputRef}>
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                  </select>
                  {/* <input
                    type='role'
                    id='role'
                    required
                    ref={roleInputRef}
                  /> */}
                </div>
                <div className='my-5'>
                  <button className='button button-color mr-4 font-bold'>{isLogin ? 'Login' : 'Create Account'}</button>
                  <button
                    type='button'
                    className=' font-bold'

                    onClick={switchAuthModeHandler}>
                    {isLogin ? 'No Account? Create One' : 'Already a user? Login'}
                  </button>
                </div>
              </form>
            </div>

            <div className='bg-green-900 w-full'>
              <img className=' w-full h-full' src='chad1.jpg'/>
            </div>

          </div>


        </>
      ) : (
        <div className=''>
          <p>You have successfully registered!</p>
          
          <button onClick={() => router.reload()} className='button button-color'>Login Now</button>
          
        </div>
      )}
      
    </section>
  );
}

export default AuthForm;