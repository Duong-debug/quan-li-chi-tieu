'use client';

import { useEffect, useState } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function CountUp({
    end,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
}: CountUpProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function (easeOutExpo)
            const easeOutExpo = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            const currentCount = easeOutExpo(percentage) * end;
            setCount(currentCount);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    const formattedCount = count.toLocaleString('vi-VN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span className={className}>
            {prefix}
            {formattedCount}
            {suffix}
        </span>
    );
}
