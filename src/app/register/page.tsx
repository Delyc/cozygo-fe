'use client'
import React from 'react';
import Copyright from '@/components/atoms/Copyright';
import Promosection from '@/components/organisms/Promosection';
import { RegisterForm } from '@/screens/auth/Register';

function Register() {
  return (
    <section className="flex flex-col  md:h-screen justify-center py-10 lg:py-0 bg-slate-100 items-center ">
      <div className='  bg-blue-900 xl:w-3/5 w-5/6  flex flex-col md:flex-row rounded'>
        <RegisterForm />
        <Promosection />
      </div>
    <Copyright />
    </section>

  );
}

export default Register