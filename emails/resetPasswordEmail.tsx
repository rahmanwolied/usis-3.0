import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
    resetCode?: string;
    username?: string;
}

export const ResetPasswordEmail = ({ resetCode, username }: ResetPasswordEmailProps) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`http://localhost:3000/static/usis-logo.png`}
                    width="150"
                    height="150"
                    alt="usis3.0"
                    style={logo}
                />
                <Text style={tertiary}>Reset your password</Text>
                <Heading style={secondary}>Click the button below to reset your password</Heading>
                <Section style={codeContainer}>
                    <Button
                        style={button}
                        href={`http://localhost:3000/reset-password?username=${username}&token=${resetCode}`}>
                        Reset Password
                    </Button>
                </Section>
            </Container>
            <Text style={footer}>Securely powered by USIS 3.0</Text>
        </Body>
    </Html>
);

ResetPasswordEmail.PreviewProps = {
    resetCode: '144833',
} as ResetPasswordEmailProps;

ResetPasswordEmail;

const button = {
    backgroundColor: '#121212',
    border: '1px solid #aaaaaa',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    padding: '8px 16px',
    textAlign: 'center' as const,
    textDecoration: 'none',
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    maxWidth: '360px',
    margin: '0 auto',
    padding: '68px 0 130px',
};

const logo = {
    margin: '0 auto',
};

const tertiary = {
    color: '#0a85ea',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    height: '16px',
    letterSpacing: '0',
    lineHeight: '16px',
    margin: '16px 8px 8px 8px',
    textTransform: 'uppercase' as const,
    textAlign: 'center' as const,
};

const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center' as const,
};

const codeContainer = {
    background: 'rgba(0,0,0,.05)',
    borderRadius: '4px',
    margin: '16px auto 14px',
    verticalAlign: 'middle',
    width: '280px',
};

const code = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Bold, Helvetica, Arial, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '6px',
    lineHeight: '40px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: '0 auto',
    width: '100%',
    textAlign: 'center' as const,
};

const paragraph = {
    color: '#444',
    fontSize: '15px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    letterSpacing: '0',
    lineHeight: '23px',
    padding: '0 40px',
    margin: '0',
    textAlign: 'center' as const,
};

const link = {
    color: '#444',
    textDecoration: 'underline',
};

const footer = {
    color: '#000',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0',
    lineHeight: '23px',
    margin: '0',
    marginTop: '20px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
};
