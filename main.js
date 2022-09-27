d3.select('#chart-area')
.append("h1")
.attr("id", "title")
.text("Doping in Professional Bicycle Racing")


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then(response => response.json())
  .then(data => {
   document.getElementById("chart-area").value = JSON.stringify(data);
    const dataSet = data
    
    const w = 1150;
    const h = 600;
    const padding = 60;

    const xScale = d3.scaleTime()
                     .domain([d3.min(dataSet, (d) => new Date(d.Year - 1, 0)), d3.max(dataSet, (d) => new Date(d.Year + 1, 0))])
                     .range([padding, w - padding]);

    const yScale = d3.scaleTime()
                     .domain(d3.extent(dataSet, (d) => new Date(1970, 0, 1, 0, d.Time.split(":")[0], d.Time.split(":")[1])))
                     .range([padding, h - padding]);

    
    d3.select("#chart-area")
        .append("h2")
        .attr("id", "label")
        .text("Time in minutes")

   const tooltip = d3.select("#chart-area")
        .append("tooltip")
        .attr("id", "tooltip")

   const legend = d3.select("#chart-area")
        .append("div")
        .attr("id", "legend")
   
   const legendRow1 = legend.append("div").attr("id", "legend-row1")
   
   legendRow1.append("p")
   .text("No doping allegations")

   const firstsvg = legendRow1.append("svg")
               .attr("witdh", "30")
               .attr("height", "30")

   const legendRow2 = legend.append("div").attr("id", "legend-row2")

   legendRow2.append("p")
   .text("Riders with doping allegations")

   const secondsvg = legendRow2.append("svg")
               .attr("witdh", "30")
               .attr("height", "30")

   firstsvg.append("rect")
   .attr("x", 10)
   .attr("width", 30)
   .attr("height", 30)
   .attr("fill",  "#39b4f3")
   .style("opacity", "0.8")

   secondsvg.append("rect")
   .attr("x", 10)
   .attr("width", 30)
   .attr("height", 30)
   .attr("fill", "#625ed7")
   .style("opacity", "0.8")
        

   const svg = d3.select("#chart-area")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .style("margin-left", "3rem")
   
      svg.selectAll("circle")
         .data(dataSet)
         .enter()
         .append("circle")
         .attr("data-xvalue", (d) => d.Year)
         .attr("data-yvalue", (d) => new Date(1970, 0, 1, 0, d.Time.split(":")[0], d.Time.split(":")[1]))
         .attr("class", "dot")
         .attr("cx", (d) => xScale(new Date(d.Year, 0)))
         .attr("cy",(d) => yScale(new Date(1970, 0, 1, 0, d.Time.split(":")[0], d.Time.split(":")[1])))
         .attr("r", "7")
         .attr("index", (d, i) => i)
         .attr("fill", (d) => d.Doping ? "#625ed7" : "#39b4f3")
         .style("opacity", "0.8")
         .style("stroke", "white")
         .on("mouseover", function () {
            let i = this.getAttribute("index")
            tooltip.attr("data-year", dataSet[i].Year)
         .style("opacity", "0.8")
         .html(dataSet[i].Name + ": " + dataSet[i].Nationality + '<br>' + "Year: " + dataSet[i].Year + ", " + "Time: " + dataSet[i].Time + (dataSet[i].Doping ? '<br><br>' + dataSet[i].Doping: ""))
         .style("left", this.getAttribute("cx") + "px")
         .style("top", this.getAttribute("cy") + "px")
         .style("margin-left", "8rem")
         
      
         })
         .on("mouseout", function () {
            tooltip.style("opacity", "0")            
         })
         
         
         
   const xAxis = d3.axisBottom(xScale);
   

    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .attr("id", "x-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(xAxis);


   const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
   

    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .attr("id", "y-axis")
       .attr("color", "#474862")
       .style("font-family", "Amiri Quran, serif")
       .style("font-size", "0.8rem")
       .call(yAxis);
  })
