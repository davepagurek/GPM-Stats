// Date is a string like "September 1"
function collectDataUntil(date) {
  const content = document.getElementById('main-content');

  function collectUntil(date, callback) {
    const UPDATE_INTERVAL = 200;
    const interval = setInterval(() => {
      const hasDate = h2 => h2.textContent == date;
      if (Array.prototype.some.call(document.querySelectorAll('h2'), hasDate)) {
        clearInterval(interval);
        callback();
      } else {
        // Keep scrolling down
        content.scrollTop = content.scrollHeight;
      }
    }, UPDATE_INTERVAL);
  }

  function processCards() {
    const data = [];
    let currentDate = null;

    Array.prototype.forEach.call(document.querySelectorAll('md-card-content'), card => {
      const date = card.querySelector('.fp-date-block-date');
      if (date) {
        const dateText = date.textContent.trim();
        if (dateText == 'Today') {
          currentDate = new Date();
        } else if (dateText == 'Yesterday') {
          currentDate = new Date(new Date().setDate(new Date().getDate()-1));
        } else {
          currentDate = new Date(dateText);
          console.log(currentDate.getFullYear());
        }
        return;
      }

      const title = card.querySelector('h4 span');
      const artist = card.querySelector('h4+div > div');
      if (!title || !artist) return;

      data.push({
        title: title.textContent.trim(),
        artist: artist.textContent.trim(),
        date: currentDate.toISOString()
      });
    });

    return data;
  }

  collectUntil(date, () => {
    const data = processCards();

    // Pretty printed JSON
    console.log(JSON.stringify(data, null, 2));
  });
}
