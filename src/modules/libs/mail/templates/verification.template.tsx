import * as React from 'react'
import {Html} from '@react-email/html'
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'

interface VerificationTemplateProps {
    domain: string
    token: string
}

export function VerificationTemplate({ domain, token}: VerificationTemplateProps) {

    const verificationLink = `${domain}/account/verify?token=${token}`
    return (
        <Html>
            <Head/>
            <Preview>Verification Account</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className='text-3xl text-black font-bold'>
                            Confirmation your email
                        </Heading>
                        <Text className='text-base text-black'>
                            Thank you for registering with Teastream!
                            To confirm your email address, please click the link below:
                        </Text>
                        <Link 
                            href={verificationLink} 
                            className='inline-flex justify-center items-center rounded-full text-sm
                                       font-medium text-white bg-[#18B9AE] px-5 py-2'
                        >
                            Confirm your email

                        </Link>
                    </Section>
                    <Section className='text-center mt-8'>
                        <Text className='text-gray-600'>
                            If you have any questions or encounter any issues,
                             please feel free to contact our support team at:{' '}
                             <Link
                                href='mailto:help@teastream.com'
                                className='text-[#18b9ae] underline'
                             >
                                help@teastream.com
                             </Link>
                        </Text>

                    </Section>
                </Body>
            </Tailwind>

        </Html>
    )
}