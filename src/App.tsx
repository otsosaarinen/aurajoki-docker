import "./App.css";
import { useRef, useEffect } from "react";
import { CountUp } from "countup.js";

function App() {
    const waterFlowRate: number = 7;

    const countUpYearRef = useRef<CountUp | null>(null);
    const countUpMonthRef = useRef<CountUp | null>(null);
    const countUpDayRef = useRef<CountUp | null>(null);

    const yearCounter = useRef(0);
    const monthCounter = useRef(0);
    const dayCounter = useRef(0);

    useEffect(() => {
        // seconds since 1970 january 1st
        const epoch: number = Math.round(Date.now() / 1000);
        // seconds since 2025 january 1st
        const jan2025epoch: number = Math.round(
            new Date(2025, 0).getTime() / 1000,
        );
        // current timestamp
        const time: Date = new Date();

        // create date variables
        const days = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        // calculate amount of seconds
        const secondsToday = hours * 60 * 60 + minutes * 60 + seconds;
        const secondsMonth = days * 24 * 60 * 60 + secondsToday;
        const secondsYear = epoch - jan2025epoch;

        // initialize counters
        yearCounter.current = secondsYear * waterFlowRate;
        monthCounter.current = secondsMonth * waterFlowRate;
        dayCounter.current = secondsToday * waterFlowRate;

        // create countUp instances
        countUpYearRef.current = new CountUp(
            "waterFlowYear",
            yearCounter.current,
            {
                duration: 0.75,
                separator: " ",
            },
        );
        countUpMonthRef.current = new CountUp(
            "waterFlowMonth",
            monthCounter.current,
            {
                duration: 0.75,
                separator: " ",
            },
        );
        countUpDayRef.current = new CountUp(
            "waterFlowDay",
            dayCounter.current,
            {
                duration: 0.75,
                separator: " ",
            },
        );

        // start counters
        countUpYearRef.current.start();
        countUpMonthRef.current.start();
        countUpDayRef.current.start();

        // update counters every second
        const interval = setInterval(() => {
            yearCounter.current += waterFlowRate;
            monthCounter.current += waterFlowRate;
            dayCounter.current += waterFlowRate;

            countUpYearRef.current?.update(yearCounter.current);
            countUpMonthRef.current?.update(monthCounter.current);
            countUpDayRef.current?.update(dayCounter.current);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center text-neutral-800">
                <div className="flex flex-col gap-3 rounded-md bg-neutral-200 p-3">
                    <h1 className="text-4xl">
                        Aurajoessa virranneen veden määrä
                    </h1>

                    <div>
                        <p className="italic">Tänä vuonna</p>
                        <div className="text-4xl font-medium">
                            <span id="waterFlowYear">0</span> m<sup>3</sup>
                        </div>
                    </div>
                    <div>
                        <p className="italic">Tässä kuussa</p>
                        <div className="text-4xl font-medium">
                            <span id="waterFlowMonth">0</span> m<sup>3</sup>
                        </div>
                    </div>
                    <div>
                        <p className="italic">Tänään</p>
                        <div className="text-4xl font-medium">
                            <span id="waterFlowDay">0</span> m<sup>3</sup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
