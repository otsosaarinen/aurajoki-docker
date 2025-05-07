import "./App.css";
import { useRef, useEffect } from "react";
import { CountUp } from "countup.js";

function App() {
    const countUpRef = useRef<CountUp | null>(null);
    const currentValueRef = useRef<number>(0);

    useEffect(() => {
        const waterFlowRate: number = 7;

        const now: Date = new Date();
        const hours: number = now.getHours();
        const minutes: number = now.getMinutes();
        const seconds: number = now.getSeconds();

        const totalSecondsToday: number =
            hours * 60 * 60 + minutes * 60 + seconds;

        const initialWaterFlow = totalSecondsToday * waterFlowRate;
        currentValueRef.current = initialWaterFlow;

        countUpRef.current = new CountUp("waterFlow", initialWaterFlow);
        countUpRef.current.start();

        const update = setInterval(() => {
            currentValueRef.current += waterFlowRate;

            if (countUpRef.current) {
                countUpRef.current.update(currentValueRef.current);
            }
        }, 1000);

        return () => clearInterval(update);
    }, []);

    return (
        <>
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 bg-blue-400 text-neutral-800">
                <h1 className="text-4xl">Aurajoen virtaus tänään:</h1>
                <h2 className="text-8xl font-bold">
                    <span id="waterFlow"></span> m<sup>3</sup>/s
                </h2>
            </div>
        </>
    );
}

export default App;
