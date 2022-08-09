// import { LockClosedIcon } from '@heroicons/react/solid';

import Head from "next/head";

export default function Signin() {
  return (
    <>
      <Head></Head>
      <main className='flex items-center justify-center px-4 py-12 min-h-main sm:px-6 lg:px-8'>
        <div className='w-full max-w-lg space-y-8'>
          <div>
            {/* <img
              className='w-auto h-12 mx-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            /> */}
            <h2 className='mt-6 text-3xl font-bold text-center text-gray-900'>
              Rancang Bangun Sistem Kendali Portal Parkir Menggunakan Middle
              Range RFID Reader Berbasis Internet Of Things
            </h2>
            {/* <p className='mt-2 text-sm text-center text-gray-600'>
              Or{' '}
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Username
                </label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Username'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                />
                <label
                  htmlFor='remember-me'
                  className='block ml-2 text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  {/* <LockClosedIcon
                    className='w-5 h-5 text-indigo-500 group-hover:text-indigo-400'
                    aria-hidden='true'
                  /> */}
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
