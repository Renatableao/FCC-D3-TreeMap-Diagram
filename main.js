d3.select('#chart-area')
.append("h1")
.attr("id", "title")
.text("United States GDP")


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('chart-area').value = JSON.stringify(data);
    const dataSet = data.data;
    

    const w = 1200;
    const h = 600;
    const padding = 60;

    const xScale = d3.scaleTime()
                     .domain([d3.min(dataSet, (d) => new Date(d[0])), d3.max(dataSet, (d) => new Date(d[0]))])
                     .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataSet, (d) => d[1])])
                     .range([h - padding, padding]);

    const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    d3.select("#chart-area")
        .append("h2")
        .attr("id", "label")
        .text("Gross Domestic Product")

    const tooltip = d3.select("#chart-area")
                    .append("tooltip")
                    .attr("id", "tooltip")

      const quarter = dataSet.map(item => item[0].slice(5,7) === "01" ? "Q1" : item[0].slice(5,7) === "04" ? "Q2" : item[0].slice(5,7) === "07" ? "Q3" : "Q4")

      svg.selectAll("rect")
         .data(dataSet)
         .enter()
         .append("rect")
         .attr("data-date", (d) => d[0])
         .attr("data-gdp", (d) => d[1])
         .attr("class", "bar")
         .attr("x", (d, i) => xScale(new Date(dataSet[i][0])))
         .attr("y",(d) => yScale(d[1]))
         .attr("index", (d, i) => i)
         .attr("width", w/dataSet.length)
         .attr("height", (d) => (h - padding) - yScale(d[1]))
         .attr("fill", "#39b4f3")
         .attr("stroke", "#e5e7ed")
         .attr("stroke-width", "1px")
         .on("mouseover", function () {
            let i = this.getAttribute("index")
            tooltip.attr("data-date", dataSet[i][0])
                  .style("opacity", "0.8")
                  .html(dataSet[i][0].slice(0,4) + " " + quarter[i]  + '<br>' + "$" + dataSet[i][1].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " Billion")
                  .style("left", this.getAttribute("x") + "px")
                  .style("margin-left", "3rem")
                  .style("top", "27rem")
               
         })
         .on("mouseout", function () {
            let i = this.getAttribute("index")
            tooltip.style("opacity", "0")            
         })
         
         
      const xAxis = d3.axisBottom(xScale);
    // Add your code below this line

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .attr("id", "x-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(xAxis);


    const yAxis = d3.axisLeft(yScale);
    // Add your code above this line

    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .attr("id", "y-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(yAxis);
  })
