d3.select('#chart-area')
.append("h1")
.attr("id", "title")
.text("Video Game Sales")

d3.select('#chart-area')
.append("h2")
.attr("id", "description")
.text("Top 100 Most Sold Video Games Grouped by Platform")


  fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
  .then(response => response.json())
  .then(data => {
   document.getElementById("chart-area").value = JSON.stringify(data);
    const dataSet= data
    
    const w = 1400;
    const h = 500;


   const svg = d3.select("#chart-area")
               .append("svg")
               .attr("width", w)
               .attr("height", h) 

   const treemap = d3.treemap()
                  .size([w, h])
                  .padding(1);

   const root = d3.hierarchy(dataSet)
                  .sum((d) => d.value)
                  .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

   
   const colors = [ '#1f77b4','#aec7e8','#ff7f0e','#ffbb78','#2ca02c','#98df8a','#d62728','#ff9896','#9467bd','#c5b0d5','#8c564b','#c49c94',
                  '#e377c2','#f7b6d2','#5a605b','#7f7f7f', '#bf9b28','#bec415']
   
   const categories = root.leaves().map((d) => d.data.category)
   const unique_categories = [...new Set(categories)]

   treemap(root)

   const cell = svg.selectAll('g')
                  .data(root.leaves())
                  .enter()
                  .append('g')
                  .attr('class', 'group')
                  .attr('transform', (d) => 'translate(' + d.x0 + ',' + d.y0 + ')');
                  
   
      cell.append("rect")
         .attr("class", "tile")
         .attr("data-name", (d) => d.data.name)
         .attr("data-category", (d) => d.data.category)
         .attr("data-value", (d) =>  d.data.value)
         .attr("width", (d) => d.x1 - d.x0)
         .attr("height", (d) => d.y1 - d.y0)
         .attr("fill", (d) => colors[unique_categories.indexOf(d.data.category)])
         .on("mouseover", function (event) {
            let i = this.getAttribute("data-value")
            tooltip.attr("data-value", i)
         .style("opacity", "0.8")
         .html("Name: " + this.getAttribute("data-name") + "<br>" + "Category: " + this.getAttribute("data-category") + "<br>" + "Value: " + this.getAttribute("data-value"))
         .style('left', event.pageX + 10 + 'px')
         .style('top', event.pageY - 28 + 'px')
         .style("margin-left", "2rem")      
         })
         .on("mouseout", function () {
            tooltip.style("opacity", "0")            
         })
         
      cell.append("text")
         .attr("class", "node-label")
         .selectAll("tspan")
         .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
         .enter()
         .append("tspan")
         .attr('x', 4)
         .attr('y', function (d, i) {return 13 + i * 10;})
         .text(function (d) {return d;});

       
   const legend = d3.select("#chart-area")
         .append("svg")
         .attr("id", "legend")
         .attr("width", "900")
         .attr("height", "60")

         legend.selectAll('g')
         .data(unique_categories)
         .enter()
         .append('g')
         .attr("id", (d) => d)

         legend.selectAll("rect")
         .data(unique_categories)
         .enter()
         .append("rect")
         .attr("x", (d,i) => i *50)
         .attr("class", "legend-item")
         .attr("y", 0)
         .attr("width", 40)
         .attr("height", 30)
         .attr("fill", (d,i) => colors[i])

         legend.selectAll("text")
         .data(unique_categories)
         .enter()
         .append("text")
         .attr("x", (d,i) => (i *50) + 7)
         .attr("class", "legend-text")
         .attr("y", 50)
         .html((d) => d)
         .attr("fill", (d,i) => colors[i])
               

   const tooltip = d3.select("#chart-area")
       .append("tooltip")
       .attr("id", "tooltip")

})
