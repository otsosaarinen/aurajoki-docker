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

        countUpRef.current = new CountUp("waterFlow", initialWaterFlow, {
            duration: 0.75,
            separator: " ",
        });
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
            <div className="flex h-screen w-screen items-center justify-center text-neutral-800">
                <div className="flex flex-col gap-5 rounded-md bg-neutral-200 p-2">
                    <h1 className="text-4xl">
                        Aurajoessa virranneen veden määrä
                    </h1>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="italic">Tänä vuonna</p>
                            <div className="text-4xl font-medium">
                                <span id="">0</span> m<sup>3</sup>
                            </div>
                        </div>
                        <div>
                            <p className="italic">Tässä kuussa</p>
                            <div className="text-4xl font-medium">
                                <span id="">0</span> m<sup>3</sup>
                            </div>
                        </div>
                        <div>
                            <p className="italic">Tänään</p>
                            <div className="text-4xl font-medium">
                                <span id="waterFlow">0</span> m<sup>3</sup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
