import { useState, useEffect } from "react";

const MainLoader = ({
    size = "lg",
    speed = 1,
    showOverlay = true,
    onComplete = () => {},
    text = "TypeFrenzy",
}) => {
    const [lettersAnimated, setLettersAnimated] = useState(false);
    const [visible, setVisible] = useState(true);

    // Size classes mapping
    const sizeClasses: any = {
        sm: "w-48 h-48",
        md: "w-64 h-64",
        lg: "w-80 h-80",
        xl: "w-96 h-96",
    };

    // Animation speed control
    const animDurationBase = {
        fast: 0.7,
        normal: 1,
        slow: 1.5,
    };

    const animDuration = speed
        ? animDurationBase.normal / speed
        : animDurationBase.normal;

    // Handle animation completion
    useEffect(() => {
        const timer = setTimeout(() => {
            setLettersAnimated(true);
        }, (text.length * 150 + 500) / speed);

        return () => clearTimeout(timer);
    }, [text, speed]);

    useEffect(() => {
        if (lettersAnimated) {
            const timer = setTimeout(() => {
                setVisible(false);
                onComplete();
            }, 1500 / speed);

            return () => clearTimeout(timer);
        }
    }, [lettersAnimated, onComplete, speed]);

    return (
        <div
            className={`${
                visible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
        >
            {showOverlay && (
                <div className="fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm z-40 transition-all duration-500"></div>
            )}

            <div className="flex flex-col items-center justify-center fixed inset-0 z-50">
                <div
                    className={`relative ${sizeClasses[size]} flex items-center justify-center`}
                >
                    {/* Keyboard icon with CSS animation */}
                    <div className="animate-bounce absolute top-8">
                        <svg
                            className="text-sky-400 w-12 h-12"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            fill="currentColor"
                        >
                            <path d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.823-7.177 16-16 16H48c-8.823 0-16-7.177-16-16V112c0-8.823 7.177-16 16-16h480c8.823 0 16 7.177 16 16v288zm-48-160H80c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16zm-48-64H128c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h320c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16zm0 128H128c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h320c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z" />
                        </svg>
                    </div>

                    {/* Pulsing rings with CSS animations */}
                    <div className="absolute w-full h-full rounded-full border-2 border-sky-400 border-opacity-20 animate-ping-slow"></div>
                    <div className="absolute w-4/5 h-4/5 rounded-full border-2 border-sky-400 border-opacity-30 animate-ping-slower"></div>
                    <div className="absolute w-3/5 h-3/5 rounded-full border-2 border-sky-400 border-opacity-40 animate-ping-slowest"></div>

                    {/* Brand name with typing effect */}
                    <div className="absolute bottom-8 flex items-center">
                        <div className="relative h-8 flex items-center">
                            {text.split("").map((letter, i) => (
                                <span
                                    key={i}
                                    className={`
                    font-bold text-2xl text-white inline-block
                    transition-all duration-300 transform
                    typing-letter-animation
                  `}
                                    style={{
                                        opacity: 0,
                                        transform: "translateY(20px)",
                                        animation: `fadeInUp 0.3s ease-out forwards ${
                                            i * 0.08
                                        }s`,
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>

                        {/* Blinking cursor */}
                        <div className="h-6 w-0.5 bg-sky-400 ml-1 animate-cursor-blink"></div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                    <div className="h-full bg-sky-400 animate-progress-bar"></div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes ping-slower {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes ping-slowest {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes cursor-blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes progress-bar {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-ping-slow {
          animation: ping-slow ${animDuration * 2}s ease-in-out infinite;
        }

        .animate-ping-slower {
          animation: ping-slower ${animDuration * 2}s ease-in-out infinite;
          animation-delay: ${animDuration * 0.3}s;
        }

        .animate-ping-slowest {
          animation: ping-slowest ${animDuration * 2}s ease-in-out infinite;
          animation-delay: ${animDuration * 0.6}s;
        }

        .animate-cursor-blink {
          animation: cursor-blink ${animDuration}s infinite;
        }

        .animate-progress-bar {
          animation: progress-bar ${animDuration * 4}s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default MainLoader;
