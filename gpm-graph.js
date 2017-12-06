const fs = require('fs');
const ChartjsNode = require('chartjs-node');
const randomColor = require('randomcolor');

const dataFile = process.argv[2];
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

function playsByArtist(data) {
  const plays = {};
  data.forEach(d => {
    plays[d.artist] = plays[d.artist] || 0;
    plays[d.artist]++;
  });

  return (
    Object.keys(plays)
      .map(artist => [artist, plays[artist]])
      .sort((a, b) => b[1]-a[1])
  );
}

function playsBySong(data) {
  const plays = {};
  data.forEach(d => {
    const name = `${d.title} - ${d.artist}`;
    plays[name] = plays[name] || 0;
    plays[name]++;
  });

  return (
    Object.keys(plays)
      .map(name => [name, plays[name]])
      .sort((a, b) => b[1]-a[1])
  );
}

function labelsFromData(data) {
  const labels = [];
  data.forEach(d => {
    if (labels.length === 0 || labels[labels.length-1] != d.date) {
      labels.push(d.date);
    }
  });
  return labels.sort();
}

function datasetsFromData(data, labels, artistFilter) {
  const artists = {};
  data.forEach(d => {
    if (!artistFilter.has(d.artist)) return;

    artists[d.artist] = artists[d.artist] || {};
    artists[d.artist][d.date] = artists[d.artist][d.date] || 0;

    artists[d.artist][d.date]++;
  });

  return Object.keys(artists).map(artist => {
    const color = randomColor();
    return {
      label: artist,
      backgroundColor: color,
      borderColor: color,
      fill: false,
      data: labels.map(date => artists[artist][date] || 0)
    };
  });
}

const plays = playsByArtist(data);
console.log(plays.slice(0,40));
console.log(playsBySong(data).slice(0,40));
const topArtists = new Set(plays.slice(0, 20).map(a => a[0]));

const labels = labelsFromData(data);
const datasets = datasetsFromData(data, labels, topArtists);
const timeFormat = 'MM/DD';
const chartOptions = {
  type: 'line',
  data: {
    labels: labels.map(d => {
      const date = new Date(d);
      return `${date.getMonth()+1} ${date.getDate()}`;
    }),
    datasets,
  },
  options: {
    title: {
      display: true,
      text: 'Artist song counts over time'
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Songs listened'
        }
      }]
    }
  },
  plugins: {
    beforeDraw: function(chart) {
      var ctx = chart.chart.ctx;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, chart.chart.width, chart.chart.height);
    }
  }
};

const chartNode = new ChartjsNode(2000, 1000);
chartNode.drawChart(chartOptions)
  .then(() => chartNode.getImageBuffer('image/png'))
  .then(buffer => chartNode.getImageStream('image/png'))
  .then(streamResult => chartNode.writeImageToFile('image/png', './stats.png'))
  .then(() => chartNode.destroy())
