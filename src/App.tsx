import "./App.css";
import { useRef, useEffect } from "react";
import { CountUp } from "countup.js";

function App() {
    const waterFlowRate: number = 7;

    useEffect(() => {
        const epoch: number = Math.round(Date.now() / 1000);
        const epoch2025: number = Math.round(
            new Date(2025, 0, 1).getTime() / 1000,
        );
        const time: Date = new Date();

        const months = time.getMonth() + 1;
        const days = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const secondsToday = hours * 60 * 60 + minutes * 60 + seconds;
        const secondsMonth = days * 24 * 60 * 60 + secondsToday;

        console.log(secondsToday);
        console.log(secondsMonth);

        const countUpYear = new CountUp("waterFlowYear");
        const countUpMonth = new CountUp("waterFlowMonth", secondsMonth, {
            duration: 0.75,
            separator: " ",
        });
        const countUpDay = new CountUp("waterFlowDay", secondsToday, {
            duration: 0.75,
            separator: " ",
        });

        countUpYear.start();
        countUpMonth.start();
        countUpDay.start();
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
            </div>
        </>
    );
}

export default App;
