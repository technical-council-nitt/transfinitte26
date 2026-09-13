import { useEffect, useState } from "react";
import "./LoadingScreen.css";

const logMessages = [
  "mounting subsystem drivers...",
  "verifying signal integrity...",
  "compiling telemetry cache...",
  "syncing clock reference...",
  "allocating render buffers...",
  "resolving node dependencies...",
  "handshake with core complete",
  "calibrating optical array...",
  "indexing memory sectors...",
  "establishing uplink...",
];

const statusWords = [
  "CALIBRATING",
  "SYNCHRONIZING",
  "COMPILING",
  "VERIFYING",
  "ALIGNING",
  "FINALIZING",
];

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((value) => Math.min(value + Math.random() * 2.2, 100));
    }, 130);
    const logTimer = setInterval(() => setLogIndex((value) => value + 1), 1900);
    const clockTimer = setInterval(() => setSeconds((value) => value + 1), 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const percentage = Math.floor(progress);
  const elapsed = new Date(seconds * 1000).toISOString().slice(11, 19);

  return (
    <main className="loading-stage" aria-label="System initialization">
      <div className="loading-scanlines" />
      <div className="loading-sweep" />
      <div className="loading-vignette" />

      <div className="loading-bracket tl" />
      <div className="loading-bracket tr" />
      <div className="loading-bracket bl" />
      <div className="loading-bracket br" />

      <div className="loading-telemetry top">
        <span>SYS/ID <strong>7734-A</strong></span>
        <span className="loading-glitch">BOOT SEQUENCE <i>▮</i></span>
        <span>LAT <strong>34.0522</strong> &nbsp; LON <strong>-118.2437</strong></span>
      </div>

      <section className="loading-core">
        <div className="loading-ring ring-one" />
        <div className="loading-ring ring-two" />
        <div className="loading-ring ring-three" />
        <div className="loading-ticks">
          {Array.from({ length: 60 }, (_, index) => (
            <span key={index} style={{ transform: `rotate(${index * 6}deg)` }} />
          ))}
        </div>
        <div className="loading-readout">
          <div className="loading-percent">{String(percentage).padStart(2, "0")}<sup>%</sup></div>
          <div className="loading-status">
            {percentage >= 100 ? "SYSTEM READY" : statusWords[Math.min(Math.floor(percentage / 17), 5)]}
          </div>
        </div>
      </section>

      <div className="loading-progress">
        <div className="loading-bar-label"><span>CORE ALIGNMENT</span><span>{percentage} / 100</span></div>
        <div className="loading-bar-track"><div style={{ width: `${progress}%` }} /></div>
        <div className="loading-bar-ticks">
          {Array.from({ length: 20 }, (_, index) => <span key={index} />)}
        </div>
      </div>

      <div className="loading-log"><span>&gt;</span> {logMessages[logIndex % logMessages.length]}</div>

      <div className="loading-telemetry bottom">
        <span>REV 0.09.2</span>
        <span>NO SIGNAL LOSS DETECTED</span>
        <span>{elapsed}</span>
      </div>
    </main>
  );
}

export default LoadingScreen;