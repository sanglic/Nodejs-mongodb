(function (d3) {
  'use strict';

var URLactual= window.location

if(URLactual=="http://localhost/Prueba%20ICOS/MajadasMain.html"){ //Habria que poner otra vez la ruta aquí
graph("Flow_Main_hora.csv")
graph("Flow_North_hora.csv")
graph("Flow_South_hora.csv")
}else{
graph("Flow_Sub_Main_hora.csv")
graph("Flow_Sub_North_hora.csv")
graph("Flow_Sub_South_hora.csv")
}

function graph(valor_csv){
  
console.log(valor_csv)
var titulo=valor_csv.slice(0,-9)
console.log(titulo)
// set the dimensions and margins of the graph
var margin = {top: 70, right: 350, bottom: 100, left: 70},
    width = 1210 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#grafica")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "25px") 
       // .style("text-decoration", "underline")  
        .text("Flow Rate vs Flow Drive "+ titulo)
        .style("color","#008B8B");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (height+margin.bottom/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")  
        .text("Date")
        .style("color","#008B8B");

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (height+margin.bottom/2))
        .attr("transform", "translate(-325 ,520) rotate(270)")
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")  
        .text("FlowRate-FlowDrive")
        .style("color","#008B8B");

        //Leyenda
    svg.append("text").attr("x", (-120+width / 2))
    .attr("y", (20+height+margin.bottom/2))
    .text("Flow_Drive").style("font-size", "15px")
    .attr("alignment-baseline","middle")
    .style("stroke", "#0000CD")
    .attr("stroke-width","0.5")
    .attr("opacity", 0.7)


    svg.append("text").attr("x", (50+width / 2))
    .attr("y", (20+height+margin.bottom/2))
    .text("Flow_Rate").style("font-size", "15px")
    .attr("alignment-baseline","middle")
    .style("stroke", "#FF4500")
    .attr("stroke-width","0.5")
    .attr("opacity", 0.7)


    //Leyenda Cuandros
    svg.append("rect")
      .attr("x", (30+width / 2))
      .attr("y", (13+height+margin.bottom/2))
      .style("fill","#FF4500")
      .attr("width","12")
      .attr("height","12")
      .attr("alignment-baseline","middle")
    .style("stroke", "#FF4500")

    svg.append("rect")
      .attr("x", (-142+width / 2))
      .attr("y", (13+height+margin.bottom/2))
      .style("fill","#0000CD")
      .attr("width","12")
      .attr("height","12")
      .attr("alignment-baseline","middle")
    .style("stroke", "#0000CD")


   /*.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");    
    */

// Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);


// gridlines in x axis function


//Read the data
d3.csv("./data/"+valor_csv,

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date), FlowRate_Main :Number(d.FlowRate_Main),FlowDrive_Main :Number(d.FlowDrive_Main)}
  },

  // Now I can use this dataset:
  function(data) {
    console.log(data)
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
    // .orient("bottom").ticks(10)
    //.tickFormat(d3.time.format("%Y-%m-%d"))
      .domain(d3.extent(data, function(d) { return +d.date; } ))
      .range([ 0, width ]);

    var xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      //x.showGridlines=true;
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.FlowRate_Main; })+10])
      .range([ height, 0 ]);
    var yAxis = svg.append("g")
      .attr("class", "axisRed")
      .call(d3.axisLeft(y));
// y.showGridlines=true;

  // Add Z axis
    var z = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.FlowDrive_Main; })+10])
      .range([ height, 0 ]);
      var zAxis = svg.append("g")
      .attr("class", "axisBlue")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(z));


      function make_x_gridlines() {   
    return d3.axisBottom(x)
        .ticks(12)
      }

    // gridlines in y axis function
      function make_y_gridlines() {   
    return d3.axisLeft(y)
        .ticks(6)
      }
      function make_y_gridlines() {   
    return d3.axisLeft(z)
        .ticks(6)
      }




    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "none");
  
    var clip2 = svg.append("defs").append("svg:clipPath") //PRUEBA
        .attr("id", "clip2")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("z", 0);

      // add the X gridlines
      svg.append("g")     
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      )

  // add the Y gridlines
      svg.append("g")     
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )

   
   
    // Create the line variable: where both the line and the brush take place
    var line = svg.append('g')
      .attr("clip-path", "url(#clip)")


    var line2=svg.append("g") ///prueba
      .attr("clip-path","url(#clip2)" )


    // Add the line
    line.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "#FF4500")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.FlowRate_Main) })
        )
      

 // Add the line
    line2.append("path") ///PRUEBA
      .datum(data)
      .attr("class", "line2")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "#0000CD")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return z(d.FlowDrive_Main) })
        )





    /*line2
      .append("g")
        .attr("class", "brush")
        .call(brush);*/

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }


    var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
       // Add the scatterplot
       console.log(data)

      Info_points()//llamamos a la funcion para crear los puntos con información

      function Info_points(){

        svg.selectAll("circle").remove() //primero se eliminan los puntos anteriores

        line2.selectAll("dot")  //Selecccionamos los puntos de la linea
        .data(data)     
        .enter().append("circle")
        .style("opacity",0)             
        .attr("r", 3)   
        .attr("cx", function(d) { return x(d.date); })   

        .attr("cy", function(d) { return z(d.FlowDrive_Main); })  
        .on("mouseover", function(d) {                         //añadimos la cajita cada vez que pasamos el ratón
            div.transition()    
                .duration(200)    
                .style("opacity", 1);    
            div .html((d.date) + "<br/>"+"Flow drive: "+d.FlowDrive_Main+" %"+"<br/>"+"Flow rate: " + d.FlowRate_Main+" m3/s")  
                .style("left", (d3.event.pageX-100)+ "px")   
                .style("top", (d3.event.pageY -100) + "px")
                .style("color","#008B8B")
                .style("opacity", 1);
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        })

        line.selectAll("dot")  //Selecccionamos los puntos de la linea
        .data(data)     
        .enter().append("circle")
        .style("opacity",0)             
        .attr("r", 3)   
        .attr("cx", function(d) { return x(d.date); })     
        .attr("cy", function(d) { return y(d.FlowRate_Main); })
        .attr("cz", function(d) { return z(d.FlowDrive_Main);})   
        .on("mouseover", function(d) {                         //añadimos la cajita cada vez que pasamos el ratón
            div.transition()    
                .duration(200)    
                .style("opacity", 1);    
            div .html((d.date) + "<br/>"+"Flow drive: "+d.FlowDrive_Main+" %"+"<br/>"+"Flow rate: " + d.FlowRate_Main+" m3/s")  
                .style("left", (d3.event.pageX-100)+ "px")   
                .style("top", (d3.event.pageY - 100) + "px")
                .style("color","#008B8B")
                .style("opacity", 1);
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        })


 }

    
    
})

}


}(d3));