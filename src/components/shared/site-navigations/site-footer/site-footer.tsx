import React from 'react';

import { Separator } from '@/components/ui/separator';
import Container from '@/components/shared/container';
import { Logo } from '@/components/shared/logo';

import FooterSection from './footer-section';
import Newsletter from './newsletter';
import Socials from './socials';

const navigation = {
    features: [
        { name: 'Class Schedule', href: '#' },
        { name: 'Seat Status', href: '#' },
        { name: 'CGPA Calculator', href: '#' },
        { name: 'Find Empty Classes', href: '#' },
    ],
    support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
    ],
    legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
};

const SiteFooter = () => {
    return (
        <footer className="relative overflow-clip" aria-labelledby="footer-heading">
            <div className="shape" />
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container className="pb-8 pt-16 sm:pt-24 lg:pt-32">
                <div className="items-center xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8">
                        <Logo variant="medium" />
                        <p className="select-none text-sm leading-6">
                            All data and features are fetched from the official USIS website. This is a university project and has no intentions of
                            commercial use. All the data is owned by BRAC Univerity.
                            <br />
                            <h1 className="mt-6 font-bold">Created by:</h1>
                            <ul>
                                <li>
                                    <a href="https://www.github.com/rahmanwolied">Mosheur Rahman Wolied</a>
                                </li>
                                <li>
                                    <a href="https://github.com/Nafis588">Nafis Sadique Niloy</a>
                                </li>
                                <li>
                                    <a href="https://www.github.com">Nabanita Sarker</a>
                                </li>
                            </ul>
                        </p>
                        <Socials />
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <FooterSection>
                            <div>
                                <FooterSection.Title>Features</FooterSection.Title>
                                <FooterSection.List>
                                    {navigation.features.map((item) => (
                                        <FooterSection.ListItem key={item.name} href={item.href}>
                                            {item.name}
                                        </FooterSection.ListItem>
                                    ))}
                                </FooterSection.List>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <FooterSection.Title>Support</FooterSection.Title>
                                <FooterSection.List>
                                    {navigation.support.map((item) => (
                                        <FooterSection.ListItem key={item.name} href={item.href}>
                                            {item.name}
                                        </FooterSection.ListItem>
                                    ))}
                                </FooterSection.List>
                            </div>
                        </FooterSection>
                        <FooterSection>
                            <div>
                                <FooterSection.Title>Company</FooterSection.Title>
                                <FooterSection.List>
                                    {navigation.company.map((item) => (
                                        <FooterSection.ListItem key={item.name} href={item.href}>
                                            {item.name}
                                        </FooterSection.ListItem>
                                    ))}
                                </FooterSection.List>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <FooterSection.Title>Legal</FooterSection.Title>
                                <FooterSection.List>
                                    {navigation.legal.map((item) => (
                                        <FooterSection.ListItem key={item.name} href={item.href}>
                                            {item.name}
                                        </FooterSection.ListItem>
                                    ))}
                                </FooterSection.List>
                            </div>
                        </FooterSection>
                    </div>
                </div>
                <Separator className="mb-8 mt-16 sm:mt-20 lg:mt-24" />
                <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} U3IS. All rights reserved.</p>
            </Container>
        </footer>
    );
};

SiteFooter.displayName = 'SiteFooter';

export default SiteFooter;
