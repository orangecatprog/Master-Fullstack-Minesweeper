let seconds = 0;
let intervalId: ReturnType<typeof setInterval> | null = null;
let running = false;

function fmt(secs: number): string {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
}

function updateAll(): void {
    for (const el of document.querySelectorAll<HTMLElement>(".timer")) {
        el.textContent = fmt(seconds);
    }
}

export function createTimer(): HTMLDivElement {
    const el = document.createElement("div");
    el.className = "timer";
    el.textContent = fmt(seconds);
    return el;
}

export function startTimer(): void {
    if (running) return;
    running = true;
    intervalId = setInterval(() => {
        seconds++;
        updateAll();
    }, 1000);
}

export function stopTimer(): void {
    running = false;
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

export function resetTimer(): void {
    stopTimer();
    seconds = 0;
    updateAll();
}
