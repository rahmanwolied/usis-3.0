import React from 'react';

import { Separator } from '@/components/ui/separator';
import Container from '@/components/shared/container';
import { Logo } from '@/components/shared/logo';

import FooterSection from './footer-section';
import Newsletter from './newsletter';
import Socials from './socials';

const navigation = {
    marketplace: [
        { name: 'Explore', href: '#' },
        { name: 'Tranding', href: '#' },
        { name: 'Buy NFTS', href: '#' },
        { name: 'My Profile', href: '#' },
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
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8">
                        <Logo variant="small" />
                        <p className="select-none text-sm leading-6 text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore.
                        </p>
                        <Socials />
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <FooterSection>
                            <div>
                                <FooterSection.Title>Market place</FooterSection.Title>
                                <FooterSection.List>
                                    {navigation.marketplace.map((item) => (
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
                    <div className="mt-10 select-none xl:mt-0">
                        <Newsletter />
                    </div>
                </div>
                <Separator className="mb-8 mt-16 sm:mt-20 lg:mt-24" />
                <p className="text-xs leading-5 text-gray-400">
                    &copy; {new Date().getFullYear()} FameGuild. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

SiteFooter.displayName = 'SiteFooter';

export default SiteFooter;
