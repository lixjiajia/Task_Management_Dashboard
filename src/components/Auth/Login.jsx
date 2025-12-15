import React, { useState } from 'react'

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-sky-900'>
      <div className='relative w-full max-w-md px-6 py-12 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl'>
        <div className='absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30'></div>
        
        <div className='mb-12 text-center'>
          <h2 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100'>
            Welcome Back
          </h2>
          <p className='mt-2 text-blue-100/90'>Please sign in to continue</p>
        </div>

        <form onSubmit={submitHandler} className='space-y-8'>
          <div className='space-y-6'>
            <div className='relative'>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full pl-12 pr-4 py-3 text-white bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-gray-200'
                type='email'
                placeholder='Email Address'
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/80'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </div>

            <div className='relative'>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full pl-12 pr-4 py-3 text-white bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent placeholder-gray-200'
                type='password'
                placeholder='Password'
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white/80'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
              </svg>
            </div>
          </div>

          <button
            type='submit'
            className='w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200 hover:scale-[1.02] active:scale-95'
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login;