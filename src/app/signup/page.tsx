'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import SignupForm from './components/signup-form'; // Adjust the path as necessary
import Footer from './components/footer'; // Adjust the path as necessary


function Page() {
    
    return (
        <form>
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <SignupForm />
              <GoogleButton onClick={() => signIn('google')} />
              <Footer />
         </div>
        </form>
    );
}

export default Page;