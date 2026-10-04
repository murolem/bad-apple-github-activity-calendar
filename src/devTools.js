(async () => {
    const blob = await fetch('http://localhost:3000/')
        .then(res => res.text());

    const fps = 30;
    const dt = 1000 / fps;
    const gridWidth = 53;
    const girdHeight = 7;
    const gridArea = gridWidth * girdHeight;

    const framesTotal = blob.length / gridArea

    let contribCalendarTbody = document.querySelector('.ContributionCalendar-label')
    contribCalendarTbody = contribCalendarTbody.closest('table').querySelector('tbody');

    const pixelIdxToElMap = new Map();
    for(let y = 0; y < girdHeight; y++) {
        const row = contribCalendarTbody.children[y];
        for(let x = 0; x < gridWidth; x++) {
            const cell = row.children[1 + x];
            const idx = y * gridWidth + x;
            pixelIdxToElMap.set(idx, cell);
        }
    }

    let nextFrameTs = 0;
    for(let frameIdx = 0; frameIdx < framesTotal; frameIdx++) {
        nextFrameTs = performance.now() + dt;

        console.log(`frame idx ${frameIdx} (${framesTotal} total)`)
        const frameData = blob.slice(frameIdx * gridArea, frameIdx * gridArea + gridArea);

        for(let i = 0; i < gridArea; i++) {
            const colIdxStr = frameData[i];
            pixelIdxToElMap.get(i).setAttribute('data-level', colIdxStr)
        }

        await sleep(nextFrameTs - performance.now())
    }

    async function sleep(ms) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }
})();