# Google Play Music stats

## Usage
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
4. Open the Javascript console and copy the contents of `gpm-stats.js` into it
5. Run `collectDataUntil('September 1')` in the console. The date you enter as a parameter should match the style of date in the headers shown in the My Activity cards.
6. Save the outputted JSON to a file (e.g. `your_data.json`)
7. Run `node gpm-graph.js your_data.json`
8. Open `stats.png`

## Example
Here are the top 20 artists I listened to in the fall school term graphed over time:
<img src="https://github.com/davepagurek/GPM-Stats/blob/master/screenshots/fall.png?raw=true" />

Top artists by song count:
```
[ [ 'LCD Soundsystem', 428 ],
  [ 'Laura Marling', 302 ],
  [ 'Arcade Fire', 295 ],
  [ 'Talking Heads', 239 ],
  [ 'Radiohead', 180 ],
  [ 'Barenaked Ladies', 179 ],
  [ 'The Staves', 128 ],
  [ 'BOY', 126 ],
  [ 'The Rural Alberta Advantage', 114 ],
  [ 'Franz Ferdinand', 95 ],
  [ 'Michael Jackson', 87 ],
  [ 'Spoon', 83 ],
  [ 'U2', 82 ],
  [ 'Gorillaz', 78 ],
  [ 'Ben Folds', 76 ],
  [ 'David Bowie', 73 ],
  [ 'Phantogram', 69 ],
  [ 'Goldfrapp', 68 ],
  [ 'Hans Zimmer', 62 ],
  [ 'The Beatles', 60 ],
  [ 'Andrew Bird', 59 ],
  [ 'The Mowgli\'s', 56 ],
  [ 'Broken Social Scene', 53 ],
  [ 'Joe Hisaishi', 52 ],
  [ 'Bob Dylan', 51 ],
  [ 'Kalle Mattson', 50 ],
  [ 'Regina Spektor', 48 ],
  [ 'Kate Bush', 43 ],
  [ 'Gramatik', 35 ],
  [ 'London Symphony Orchestra', 33 ],
  [ 'Saint Motel', 33 ],
  [ 'Coldplay', 32 ],
  [ 'Grouplove', 31 ],
  [ 'Watsky', 31 ],
  [ 'Men Without Hats', 28 ],
  [ 'Portugal. The Man', 28 ],
  [ 'Max Richter', 27 ],
  [ 'José González', 27 ],
  [ 'Darwin Deez', 26 ],
  [ 'Hannah Georgas', 25 ],
  [ 'Muse', 24 ],
  [ 'Kronos Quartet', 24 ],
  [ 'Monarchy', 22 ],
  [ 'William Patrick Corgan', 22 ],
  [ 'Philharmonia Orchestra', 20 ],
  [ 'The Asteroids Galaxy Tour', 20 ],
  [ 'The Balconies', 20 ],
  [ 'Feist', 19 ],
  [ 'AC/DC', 19 ],
  [ 'Julien Baker', 18 ],
  [ 'The Jacksons', 17 ],
  [ 'OK Go', 16 ],
  [ 'Ingrid Michaelson', 16 ],
  [ 'Various Artists', 16 ],
  [ 'Cut Copy', 16 ],
  [ 'Leopold Stokowski', 15 ],
  [ 'Beck', 15 ],
  [ 'Jean-Pierre Rampal', 15 ],
  [ 'Yuri Egorov', 14 ],
  [ 'The Staves & yMusic', 14 ],
  [ 'Tycho', 13 ],
  [ 'Radiolab Presents: More Perfect', 13 ],
  [ 'Tessa Violet', 13 ],
  [ 'Kaitlyn Aurelia Smith', 12 ],
  [ 'Chicago Symphony Orchestra', 12 ],
  [ 'Bleachers', 12 ],
  [ 'Wintersleep', 12 ],
  [ 'Fanfarlo', 12 ],
  [ '99% Invisible', 11 ],
  [ 'Aaron Copland', 11 ],
  [ 'Junip', 11 ],
  [ 'Angèle Dubeau', 10 ],
  [ 'Yukon Blonde', 10 ],
  [ 'Rockwell', 10 ],
  [ 'Broken Social Scene Presents: Brendan Canning', 10 ],
  [ 'Leonard Bernstein', 10 ],
  [ 'Caribou', 9 ],
  [ 'M.I.A.', 9 ],
  [ 'High Five Spaceship', 9 ],
  [ 'Radiolab', 9 ],
  [ 'Cage The Elephant', 9 ],
  [ 'Roxy Music', 9 ],
  [ 'Passion Pit', 9 ],
  [ 'Keith Jarrett', 9 ],
  [ 'Alt-J', 8 ],
  [ 'Grizzly Bear', 8 ],
  [ 'Lights', 7 ],
  [ 'Daft Punk', 7 ],
  [ 'Jose Gonzalez', 7 ],
  [ 'Death Cab for Cutie', 7 ],
  [ 'The xx', 7 ],
  [ 'Air', 7 ],
  [ 'Cake', 7 ],
  [ 'The Strokes', 7 ],
  [ 'Moura Lympany', 6 ],
  [ 'Arctic Monkeys', 6 ],
  [ 'The Tragically Hip', 6 ],
  [ 'Bon Iver', 6 ],
  [ 'Ratatat', 6 ],
  [ 'BANNERS', 6 ],
  ... 866 more items ]
  ```
  
  ## Known issues
  The output from Google's My Activity page just has dates like "September 1" without a year, so the way I handle dates right now puts them all in the yeaer 2000. Woops.
