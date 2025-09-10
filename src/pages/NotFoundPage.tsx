import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    const [animationState, setAnimationState] = useState(0);

    // Animation cycle for racing cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationState((prev) => (prev + 1) % 5);
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            {/* SVG Racing Cursor Animation */}
            <div className="relative w-64 h-64 mb-6">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path
                        d="M100,20 C140,20 170,50 170,100 C170,150 140,180 100,180 C60,180 30,150 30,100 C30,50 60,20 100,20 Z"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2"
                        strokeDasharray="565"
                        strokeDashoffset={animationState * 113}
                        className="transition-all duration-500 ease-in-out"
                    />
                    <text
                        x="100"
                        y="106"
                        textAnchor="middle"
                        fontSize="16"
                        fill="#38bdf8"
                        fontWeight="bold"
                    >
                        404
                    </text>
                    {/* Racing cursor */}
                    <g
                        transform={`rotate(${
                            animationState * 72
                        } 100 100) translate(${70 + animationState * 5} 100)`}
                        className="transition-all duration-500 ease-in-out"
                    >
                        <polygon
                            points="0,0 15,8 0,16"
                            fill="#38bdf8"
                            className="animate-pulse"
                        />
                    </g>
                </svg>
            </div>

            {/* Main 404 Text */}
            <h1 className="text-8xl font-bold tracking-tighter mb-2 text-sky-400">
                404
            </h1>

            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl text-center font-medium mb-8">
                Oops! This page raced off the track.
            </h2>

            {/* Floating keyboard keys */}
            <div className="relative w-full max-w-lg h-24 mb-8">
                {["Q", "W", "E", "R", "T", "Y"].map((key, i) => (
                    <div
                        key={key}
                        className="absolute bg-slate-800 border border-sky-400/30 text-sky-400 font-bold p-2 rounded-md shadow-lg animate-float"
                        style={{
                            left: `${10 + i * 16}%`,
                            top: `${Math.sin(i) * 15 + 50}%`,
                            animationDelay: `${i * 0.2}s`,
                            transform: `rotate(${((i % 3) - 1) * 5}deg)`,
                        }}
                    >
                        {key}
                    </div>
                ))}
            </div>

            {/* Return Home Button */}
            <Link
                to={"/"}
                className="px-6 py-3 bg-sky-400 text-slate-900 rounded-lg font-bold text-lg
                   shadow-lg shadow-sky-500/20 hover:bg-sky-300 hover:shadow-sky-400/30
                   transform hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
                Back to TypeFrenzy
            </Link>

            {/* Helper Text */}
            <p className="mt-8 text-slate-400 text-center">
                Ready to test your typing speed again?
            </p>
        </div>
    );
}
