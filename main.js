d3.select('#chart-area')
.append("h1")
.attr("id", "title")
.text("Monthly Global Land-Surface Temperature")

d3.select('#chart-area')
.append("h2")
.attr("id", "description")
.text("1753 - 2015: base temperature 8.66℃")

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(response => response.json())
  .then(data => {
   document.getElementById("chart-area").value = JSON.stringify(data);
    const dataAll = data
    const dataSet = dataAll.monthlyVariance
    
    const w = 1450;
    const h = 600;
    const padding = 60;

    const xScale = d3.scaleBand()
                     .domain(dataSet.map((d) => d.year))
                     .rangeRound([padding, w - padding]);

    const yScale = d3.scaleBand()
                     .domain(dataSet.map((d) => d.month))
                     .rangeRound([padding, h - padding]);


   const legend = d3.select("#chart-area")
        .append("svg")
        .attr("id", "legend")
        .attr("width", "500")
        .attr("height", "60")

        const temps = Array.from({length: d3.max(dataSet, (d) => d.variance + dataAll.baseTemperature) - d3.min(dataSet, (d) => d.variance + dataAll.baseTemperature) + 1}, (v,k) => k+1)

        const legendxScale = d3.scaleLinear()
        .domain([d3.min(temps), d3.max(temps) + 1])
        .range([30, 470])

   const colors = [ '#011d3c','#053061','#2166ac','#4393c3','#92c5de','#d1e5f0','#f7f7f7','#fddbc7','#f4a582','#d6604d', '#b2182b','#67001f','#3f040c']

   legend.selectAll("rect")
      .data(temps)
      .enter()
      .append("rect")
      .attr("x", (d) => legendxScale(d))
      .attr("y", 0)
      .attr("width", 470/temps.length)
      .attr("height", 30)
      .attr("fill",  (d, i) => colors[i])
      
      const legendxAxis = d3.axisBottom(legendxScale)
      .tickFormat(d3.format('.1f'))

    legend.append("g")
       .attr("transform", "translate(0,30)")
       .attr("id", "legendx-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(legendxAxis)
        
   
          const tooltip = d3.select("#chart-area")
       .append("tooltip")
       .attr("id", "tooltip")


   const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .style("margin-left", "3rem")
   
      svg.selectAll("rect")
         .data(dataSet)
         .enter()
         .append("rect")
         .attr("data-year", (d) => d.year)
         .attr("data-month", (d) => d.month -1)
         .attr("data-temp", (d) =>  dataAll.baseTemperature + d.variance)
         .attr("class", "cell")
         .attr("x", (d) => xScale(d.year))
         .attr("y",(d) => yScale(d.month))
         .attr("width", (d) => xScale.bandwidth(d.year))
         .attr("height", (d) => yScale.bandwidth(d.month))
         .attr("index", (d, i) => i)
         .attr("fill", (d) => colors[Math.floor(d.variance + dataAll.baseTemperature)])
         .on("mouseover", function () {
            let i = this.getAttribute("index")
            tooltip.attr("data-year", dataSet[i].year)
         .style("opacity", "0.8")
         .html(dataSet[i].year + " - " + (new Date(dataSet[i].year, dataSet[i].month -1).toLocaleString('en-US', { month: 'long' })) + '<br>' + (dataSet[i].variance + dataAll.baseTemperature).toFixed(2) + "ºC" + "<br>" + dataSet[i].variance.toFixed(2) + "ºC")
         .style("left", this.getAttribute("x") + "px")
         .style("top", this.getAttribute("y") + "px")
         .style("margin-left", "4rem")
         
      
         })
         .on("mouseout", function () {
            tooltip.style("opacity", "0")            
         })

         
         
         
   const xAxis = d3.axisBottom(xScale)
      .tickValues(
         xScale.domain().filter(function (year) {
         // set ticks to years divisible by 10
            return year % 10 === 0;
         }))      
   
   
   

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .attr("id", "x-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(xAxis)


   const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain())
   .tickFormat(function (month) {
     let date = new Date(0);
     date.setUTCMonth(month);
     let format = d3.timeFormat('%B');
     return format(date);
   })
   

    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .attr("id", "y-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(yAxis)

  })
