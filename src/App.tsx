import "./App.css";
import { CountUp } from "countup.js";

function App() {
    return (
        <>
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 bg-blue-400 text-neutral-800">
                <h1 className="text-4xl">Aurajoen virtaus tänä vuonna:</h1>
                <span className="text-8xl">
                    123 m<sup>3</sup>/s
                </span>
            </div>
        </>
    );
}

export default App;
