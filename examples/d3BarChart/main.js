require(['barChart'], function (BarChart) {
  var div = document.getElementById('barChartContainer'),
      barChart = BarChart(div);

  barChart.set({
    yLabel: 'Frequency',
    barField: 'char',
    heightField: 'freq'
  });

  d3.tsv('data.tsv', function (d) {
    d.frequency = +d.frequency;
    return d;
  }, function(error, data) {

    // Set size once to initialize
    setSizeFromDiv();

    // Set size on resize
    window.addEventListener('resize', setSizeFromDiv);

    // Set the data
    barChart.set('data', data);

    // Reset data each second
    setInterval(function () {

      // Include each element with a 50% chance.
      var randomSample = data.filter(function(d){
        return Math.random() < 0.5;
      });

      barChart.set('data', randomSample);
    }, 1000);

    // Randomly change the margin every 1.7 seconds.
    function random(){ return Math.random() * 100; }
    setInterval(function () {
      barChart.set('margin', {top: random(), right: random(), bottom: random(), left: random()});
    }, 1700);

    // Change the Y axis label every 600 ms.
    function randomString() {
      var possibilities = ['Frequency', 'Population', 'Alpha', 'Beta'],
          i = Math.round(Math.random() * possibilities.length);
      return possibilities[i];
    }
    setInterval(function () {
      barChart.set('yLabel', randomString());
    }, 600);
  });

  function setSizeFromDiv(){
    barChart.set('size', {
      width: div.clientWidth,
      height: div.clientHeight
    });
  }
});