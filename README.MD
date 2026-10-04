Just a fun little thing I did at like 2AM.
https://youtu.be/ntG2O-4Bbkg

Plays bad apple (no sound) on github activity calendar thing.

## Usage

`bun i` to install dependencies.

1. Download the Bad Apple video using `./yt-dlp https://www.youtube.com/watch?v=FtutLA63Cp8`.
2. Extract png frames using `ffmpeg -i vid.webm frame_%04d.png`.
3. Move frames into `frames`.
4. Run `bun src/genFrameData.ts` to generate frame data into a blob file.
5. Run `bun src/serveFrameData.ts` to start an http server that will serve the blob locally.
6. Download a random browser (so you don't get hacked) and install an extension that disables CSP so that we can fetch the blob locally (such as https://addons.mozilla.org/en-US/firefox/addon/disable-csp-and-cors)
7. Open any github profile.
8. Copy paste `src/devTools.js` into dev tools (assuming the serve is running at `localhost:3000`).
9. ?????
10. BAD APPLE

### Notes
- The frames will run for a bit longer than the video due to a timing issue I was too tired to fix at 2AM. 
- The resulting video (here btw: ) was stitched together with a video editor. I had to sliiiiightly tweak the speed of the footage to match the audio :p