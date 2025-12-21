import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import * as React from 'react'
import {Html} from '@react-email/html'
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'

interface DeactivateTemplateProps {
    token: string
    metadata: SessionMetadata
}


export function DeactivateTemplate({token, metadata}:
     DeactivateTemplateProps) {
    
    return (
         <Html>
            <Head/>
            <Preview>Dezactivation Account</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className='text-3xl text-black font-bold'>
                           Account deactivation request
                        </Heading>
                        <Text className='text-black text-base mt-2'>
                            You have initiated the process of deactivating your account on the platform <b>TeaStream</b>
                        </Text>
                    </Section>
                    <Section className='bg-gray-100 rounded-lg p-6 text-center mb-6'>
                        <Heading className='text-2xl text-black font-semibold'>
                            Confirmation code:
                        </Heading>
                        <Heading className='text-3xl text-black font-semibold'>
                            {token}
                        </Heading>
                        <Text className='text-black'></Text>
                            This code is available 5 minutes
                    </Section>

                    <Section className='bg-gray-100 rounded-lg p-6 mb-6'>
                        <Heading className='text-xl font-semibold text-[#18B9AE]'>
                            <ul className='list-disc list-inside text-black mt-2'>
                                <li>Location: {metadata.location.country}, {metadata.location.city}</li>
                                <li>Operating System: {metadata.device.os}</li>
                                <li>Browser: {metadata.device.browser}</li>
                                <li>IP Address: {metadata.ip}</li>
                            </ul>
                            <Text className='text-gray-600 mt-2'>
                                If you did not initiate this process, please ignore this message
                            </Text>
                        </Heading>
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