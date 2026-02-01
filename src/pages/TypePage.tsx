import { useEffect, useState } from "react";
import { getTypeData } from "../features/typeData";
import { useRef } from "react";

function TypePage() {
    const [textArray, setTextArray]: any = useState([]);
    const [typeValue, setTypeValue]: any = useState("");
    const [currentPosition, setCurrentPosition] = useState(0);
    const [typedChars, setTypedChars]: any = useState([]);
    const [focus, setFocus]: any = useState(true);
    const textareaRef: any = useRef(null);

    // useEffect(() => {
    //     const typeData = getTypeData(45, 0);
    //     console.log(typeData);
    //     setParagraph(() => typeData);
    // }, []);

    // const handleInputChange = (e: any) => {
    //     console.log(e.target.value);
    //     setTypeValue(e.target.value);
    // };

    useEffect(() => {
        const typeData = getTypeData();
        setTextArray(typeData);
    }, []);

    useEffect(() => {
        if (focus) {
            textareaRef.current?.focus();
        }
    }, [focus]);

    useEffect(() => {
  const handleKeyDown = (e: any) => {
    if (!focus) return;
    
    if (e.key === 'Backspace') { 
        console.log("backspace");
        if (currentPosition > 0) {
            setCurrentPosition(currentPosition - 1);
            setTypedChars(typedChars.slice(0, -1));
        }
     }
    if (e.key.length === 1 && currentPosition < textArray.length) {
        setTypedChars([...typedChars, e.key]);
        setCurrentPosition(currentPosition + 1);
     }
  };

  if (focus) document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [focus, currentPosition, textArray]);

    console.log(typedChars);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-10 flex justify-center w-md items-center gap-10 text-2xl opacity-80 font-[Kode_Mono]">
                <button className="text-sky-600 hover:text-fuchsia-400 font-semibold duration-200 cursor-pointer">
                    30 sec
                </button>
                <button className="text-sky-600 hover:text-fuchsia-400 font-semibold duration-200 cursor-pointer">
                    60 sec
                </button>
                <button className="text-sky-600 hover:text-fuchsia-400 font-semibold duration-200 cursor-pointer">
                    90 sec
                </button>
            </div>
            <div className="relative leading-15 tracking-widest mt-20 font-[Kode_Mono] text-3xl">
                {/* <textarea
                    className={`absolute resize-none inset-0 px-8 py-6 w-full h-full text-left flex justify-start items-start bg-transparent outline-none z-10 ${!focus && "blur-xl"}`}
                    autoFocus
                    value={typeValue}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={handleInputChange}
                    ref={textareaRef}
                ></textarea>

                <div id="test-div" className={`opacity-50 px-8 py-6 duration-200 pointer-events-none ${!focus && "blur-xl duration-200"}`}>
                    {paragraph}
                </div> */}

                <div
                    autoFocus
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    ref={textareaRef}
                    className={`py-6 px-8 pointer-events-none flex flex-wrap overflow-none  ${
                        !focus && "blur-xl"
                    }`}
                >
                    {textArray.map((ele: string, index: number) => (
                        <div className="flex" key={index}>
                            {ele.split("").map((char: string, index: number) => (
                                <pre key={index}>{char}</pre>
                            ))}
                            <pre> </pre>
                        </div>
                    ))}
                </div>
                {!focus && (
                    <>
                        <button
                            onClick={() => setFocus(true)}
                            className="absolute inset-0 w-full h-full text-center text-slate-300  outline-none z-30"
                        >
                            Out of focus
                            <br />
                            Click here
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TypePage;
