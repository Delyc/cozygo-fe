'use client'
import React from 'react';
import { LoginForm } from '@/screens/auth/Login';
import Copyright from '@/components/atoms/Copyright';
import Promosection from '@/components/organisms/Promosection';

function Login() {
  return (
    <section className="flex flex-col  md:h-screen justify-center py-10 lg:py-0 bg-slate-100 items-center ">
      <div className='  bg-blue-900 xl:w-3/5 w-5/6  flex flex-col md:flex-row rounded'>
        <LoginForm />
        <Promosection />
      </div>
    <Copyright />
    </section>

  );
}

export default Login