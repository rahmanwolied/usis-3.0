import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-center py-4 text-black">
            <p className="font-bold text-lg">Developed by Group 1</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="https://www.linkedin.com/in/mosheur-rahman-5ab856177/" className="underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />Mosheur Rahman
                </a>
                <a href="https://www.linkedin.com/in/nafissn/" className="underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />Md. Nafis Sadique Niloy
                </a>
                <a href="https://www.linkedin.com/in/nabanita-sarker-33a380226/" className="underline flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />Nabanita Sarker
                </a>
            </div>
        </footer>
    );
};

export default Footer;