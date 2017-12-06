# Google Play Music stats

1. Install dependencies
```sh
# Install Cairo (instructions for other OS here: https://github.com/Automattic/node-canvas#installation)
brew install pkg-config cairo pango libpng jpeg giflib

# Install node dependencies
yarn install
```
2. Go to <a href="https://myactivity.google.com/myactivity">Googly My Activity</a>
3. Click "Filter by date and product" and make sure only **Play Music** is selected
4. Click the three dots in the search bar and select **item view**
4. Open the Javascript console and copy the contents of `gps-stats.js` into it
5. Run `collectDataUntil('September 1')` in the console. The date you enter as a parameter should match the style of date in the headers shown in the My Activity cards.
6. Save the outputted JSON to a file (e.g. `your_data.json`)
7. Run `node gpm-graph.js your_data.json`
8. Open `stats.png`
