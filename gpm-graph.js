const aggregateByDays = 30; // Group by month
const useOther = false;
const normalize = true;
const outputDataFile = null;

const fs = require('fs');
const ChartjsNode = require('chartjs-node');
const randomColor = require('randomcolor');

if (global.CanvasGradient === undefined) {
  global.CanvasGradient = function() {};
}

const dataFile = process.argv[2];
let lastDate = null;
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')).map(d => {
  if (!lastDate ||
      (new Date(lastDate).getTime() - new Date(d.date).getTime()) >= aggregateByDays * 8.64e7) {
    lastDate = d.date;
    return d;
  } else {
    return Object.assign({}, d, {date: lastDate});
  }
});

function playsByArtist(data) {
  const plays = {};
  data.forEach(d => {
    plays[d.artist] = plays[d.artist] || 0;
    plays[d.artist]++;
  });

  return plays;
}

function playsList(plays) {
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
    if (labels.length === 0 || labels[labels.length - 1] !== d.date) {
      labels.push(d.date);
    }
  });
  return labels.sort();
}

function datasetsFromData(data, labels, artistFilter, playsByArtist) {
  const artists = {};
  const dateTotals = {};
  data.forEach(d => {
    let artist = d.artist;
    if (!artistFilter.has(d.artist)) {
      if (useOther) {
        artist = 'Other';
      } else {
        return;
      }
    }

    artists[artist] = artists[artist] || {};
    artists[artist][d.date] = artists[artist][d.date] || 0;

    artists[artist][d.date]++;

    dateTotals[d.date] = dateTotals[d.date] || 0;
    dateTotals[d.date]++;
  });

  if (normalize) {
    Object.keys(artists).forEach(artist => {
      Object.keys(artists[artist]).forEach(date => {
        // Normalize
        artists[artist][date] /= dateTotals[date];
      });
    });
  }

  return (
    Object.keys(artists)
    .sort((a, b) => (playsByArtist[b] || 0) - (playsByArtist[a] || 0))
    .map(artist => {
      const color = randomColor();
      return {
        label: artist,
        backgroundColor: color,
        borderColor: color,
        data: labels.map(date => artists[artist][date] || 0)
      };
    })
  );
}

const plays = playsByArtist(data);
console.log(playsList(plays).slice(0,40));
console.log(playsBySong(data).slice(0,40));
const topArtists = new Set(playsList(plays).slice(0, 25).map(a => a[0]));

const labels = labelsFromData(data);

if (outputDataFile) {
  const aggregatedData = datasetsFromData(data, labels, new Set(playsList(plays).map(a => a[0])), plays);
  fs.writeFileSync(outputDataFile, JSON.stringify(aggregatedData, null, 2));
}
const datasets = datasetsFromData(data, labels, topArtists, plays);
const chartOptions = {
  type: 'line',
  data: {
    labels: labels.map(d => {
      const date = new Date(d);
      const month = date.getMonth()+1;
      return `${month < 10 ? '0' : ''}${month}/${date.getFullYear()}`;
    }),
    datasets,
  },
  options: {
    title: {
      display: true,
      text: 'Artist song counts over time'
    },
    legend: {
      position: 'right',
      reverse: true
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
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: 'Songs listened'
        },
        ticks: (normalize ? { max: 1 } : {})
      }]
    },
    elements: {
      point: {
        radius: 0
      }
    },
    defaultFontColor: '#000000'
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
