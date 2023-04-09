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
    <section className='max-w-xl mx-auto my-7'>
      {!registered ? (
        <>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={submitHandler}>
            <div >
              <label htmlFor='email'>Your Email</label>
              <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div >
              <label htmlFor='password'>Your Password</label>
              <input
                type='password'
                id='password'
                required
                ref={passwordInputRef}
              />
            </div>
            <div >
              <label htmlFor='role'>Role</label>
              <select name='role' id='role-select' ref={roleInputRef}>
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
              <button className='button button-color mr-4'>{isLogin ? 'Login' : 'Create Account'}</button>
              <button
                type='button'

                onClick={switchAuthModeHandler}>
                {isLogin ? 'No Account? Create One' : 'Already a user? Login'}
              </button>
            </div>
          </form>
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