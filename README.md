# discord_chat_explorer

## Features
- Load lines from .data.js in current folder with its name (no openfiledialog yet if it's needed)
- Save selected lines to .data.js
- Edit first selected line text with `Ctrl` + `E`
- Select of one or multiple lines with mouse, `Shift` and `Ctrl`
- Invert selection
- Replace of selected lines text to '[deleted]' by the `Delete` cey (the original idea functionality to allow logs share with removal of sensitive messages)
- Select lines that match criteria (via JS RegExp pattern and flags)
- Replace lines that match criteria with RegExp pattern
- Hide selected lines
- Unhide any previously hidden lines
- Actions history allowing you to undo accident mistaces (`Ctrl` + `Z`), clean by button on control panel
- Word wrap by character count 
- Quite sloppy html interface with almost no CSS
- No js libs except our

## Requirements:
Any relatively modern browser as for 31 March 2023

## Run guide
Put your .data.js files in the same folder with editor.html and main.js
Open editor.html via you browser

## What is .data.js ?
Data format with browser dynamic load support (within one folder), since it's simple JS script with decl of global variable DATA (i.e. `DATA = ['first line', 'second line', 'third line'];`)
You can get .data.js for discord chats logs, for example, via [discord_chat_exporter](https://github.com/IEEERemainder/discord_chat_exporter)

## TODOS
- Drag n drop
- Simple analysis of frequent words, concordances, count by user, dialogues detection (if server log) 
- Word wrap by visible length, not character count (monospace font is unavailable, `select` is OS-dependant component)
- Probably replace `select` with CSS friendly component
- Extend browsers support?
- Adaptive page layout? (PC only for now)

## Have ideas or need help? 
Create issue or concat me via nosare@yandex.ru or Interlocked#6505