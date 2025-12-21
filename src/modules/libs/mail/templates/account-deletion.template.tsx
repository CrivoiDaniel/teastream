
import * as React from 'react'
import {Html} from '@react-email/html'
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'

interface AccountDeletionTemplateProps{
    domain: string
}

export function AccountDeletionTemplate({domain}: AccountDeletionTemplateProps) {

    const registerLink = `${domain}/account/create`
    
    return (
         <Html>
            <Head/>
            <Preview>Account deleted</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center'>
                        <Heading className='text-3xl text-black font-bold'>
                           Your account has been completely deleted
                        </Heading>
                        <Text className='text-black text-base mt-2'>
                            Your account has been completely wiped from the TeaStream database. All your data and information have been permanently deleted
                        </Text>
                    </Section>

                    <Section className='bg-white text-black text-center rounded-lg shadow-md p-6 mb-4'>
                        <Text className='text-2xl text-black font-semibold'>
                            You will no longer receive notifications on Telegram or via email
                        </Text>
                        <Text className='text-3xl text-black font-semibold'>
                            If you wish to return to the platform, you can register using the following link:
                        </Text>
                        <Link
                            href={registerLink}
                            className='inline-flex justify-center items-center rounded-md mt-2 text-sm font-medium
                                       text-white bg-[#18B9AE] px-5 py-2'
                        >
                                Register in Teastream
                        </Link>
                    </Section>

                    <Section className='text-center text-black'>
                        <Text>
                            Thank you for being with us! We will always be glad to see you on the platform
                        </Text>
                    </Section>
                </Body>
            </Tailwind>

        </Html>
    )
}