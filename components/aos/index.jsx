'use client'

import {useEffect} from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSComponent({children,}) {
    useEffect(() => {
        AOS.init(
            {
                once: true,
                duration: 800,
                easing: 'ease-in-out'
            },
        )
    }, [])

    return <>{children}</>
}