'use client'
import { subjectsColors } from '@/constants'
import soundwaves from '@/constants/soundwaves.json';
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { CompanionComponentProps, SavedMessage } from '@/types/index'
import { cn, configureAssistant } from '@/lib/utils'
import { vapi } from '@/types/vapi'
import Lottie from 'lottie-react';
import { LottieRefCurrentProps } from 'lottie-react'
import { saveSearchHistory } from '@/lib/actions/companion.action';


const CompanionComponent = ({ id, subject, topic, name, userName, userImage, voice, style }: CompanionComponentProps) => {

    const [CallStatus, setCallStatus] = useState('INACTIVE');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [IsMuted, setIsMuted] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [messages, setMessage] = useState<SavedMessage[]>([]);
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    const MuteStatus = () => {
        const Ismuted = vapi.isMuted();
        vapi.setMuted(!Ismuted);
        setIsMuted(!IsMuted);
    }
    const handlecall = () => {
        setCallStatus("CONNECTING")
        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ['transcript'],
            serverMessages: []
        }
        //@ts-ignore
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }
    const endcall = () => {
        vapi.stop();
        setCallStatus("FINISHED");

        saveSearchHistory(id);
    }
    useEffect(() => {
        const onCallStart = () => {
            setCallStatus("ACTIVE")
        }
        const onCallEnd = () => {
            setCallStatus("INACTIVE")
        }
        const onMessage = (message: any) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessage((prev) => [newMessage, ...prev]);
            }

        }
        const onSpeech = () => {
            setIsSpeaking(true);
        }
        const OffSpeech = () => {
            setIsSpeaking(false);
        }

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeech);
        vapi.on('speech-end', OffSpeech);
        return () => {
            vapi.off('speech-start', onSpeech);
            vapi.off('speech-end', OffSpeech);
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
        }
    }, [])

    return (
        <section className='flex h-[70vh] flex-col'>
            <section className='flex gap-8 max-sm:flex-col'>
                <div className='companion-section'>
                    <div className='companion-avatar ' style={{ backgroundColor: subjectsColors[subject] }}>
                        <Image src={`/icons/${subject}.svg`} alt="Image" width={150} height={150} className={cn('max-sm:w-16 transition-opacity duration-500 opacity-100 ', CallStatus === "ACTIVE" && 'opacity-0', CallStatus === 'CONNECTING' && 'animate-pulse')} />


                    </div>
                    <div className={cn('absolute justify-center mb-8 items-center transition-opacity  duration-500', CallStatus == "ACTIVE" ? "opacity-100" : "opacity-0")}>



                        <Lottie animationData={soundwaves} lottieRef={lottieRef} className='companion-lottie' />
                    </div>
                    <div className='text-3xl font-semibold'>
                        {name}

                    </div>
                </div>
                <div className='flex flex-col gap-4 w-1/3'>

                    <div className='user-avatar '>
                        {
                            userImage && (
                                <Image src={userImage} alt='user-image' width={150} height={150} className='rounded-full mx-8' />
                            )
                        }
                        <p className='text-2xl font-semibold'> {userName}</p>

                    </div>
                    <div className='gap-4 max-sm:flex'>

                        <button className='btn-mic' onClick={MuteStatus}>
                            <Image src={IsMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt="mute" width={32} height={32} />
                            <p className='text-lg max-sm:hidden'>{IsMuted ? "Turn on mic" : "Turn off mic"}</p>
                        </button>
                        <button onClick={CallStatus === "ACTIVE" ? endcall : handlecall}
                            className={cn('rounded-lg border-black transition-colors py-2 w-full text-white cursor-pointer sm:mt-4', CallStatus === "ACTIVE" ? "bg-red-500" : "bg-primary", CallStatus === "CONNECTING" && 'animate-pulse')}>

                            <p className='text-lg'>{CallStatus === "ACTIVE" ? "End Session" : CallStatus === "CONNECTING" ? "Connecting..." : "Start Session"}</p>
                        </button>
                    </div>

                </div>

            </section>
            <section>
                <div className='transcript h-52'>
                    <div className='transcript-message no-scrollbar'>
                        {messages.map((message, i) => {
                            if (message.role == 'assistant') {
                                return (
                                    <p key={i} className='max-sm:text-sm w-full '>{name.split(' ')[0].replace('/[.,]/g', ' ')}:{message.content}</p>
                                )
                            }
                            else {
                                return (
                                    <p key={i} className='text-primary max-sm:text-sm w-full'>{userName}:{message.content}</p>
                                )
                            }

                        })}
                    </div>
                    <div className='transcript-fade' />

                </div>
            </section>

        </section>

    )
}

export default CompanionComponent