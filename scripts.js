var cellID = "00";
var selectedNumbers = [];
var freq = {
    "A" : 0,
    "B" : 0,
    "C" : 0,
    "D" : 0,
    "F" : 0
};

window.onload = function() {
    const salesData = [
        {"year": 2012, "sales": 1063},
        {"year": 2013, "sales": 978},
        {"year": 2014, "sales": 1076},
        {"year": 2015, "sales": 1214},
        {"year": 2016, "sales": 1107},
        {"year": 2017, "sales": 1520},
        {"year": 2018, "sales": 1712},
        {"year": 2019, "sales": 1606},
        {"year": 2020, "sales": 2188},
    ];

    const margin = 80;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                            .domain([978, 2188])
                            .range(['red', 'blue']);
    
    const xScale = d3.scaleBand() // discrete, bucket
                        .domain(salesData.map((data) => data.year))
                        .range([0, chartWidth])
                        .padding(0.3);
    
    const yScale = d3.scaleLinear()
                        .domain([0, 2200])
                        .range([chartHeight, 0]);

    let svg = d3.select('#svg')
                    .append('svg')
                        .attr('width', width)
                        .attr('height', height);
    
    // title
    svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .text('Grade Distribution');

    
    // create a group (g) for the bars
    let g = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);

    // y-axis
    g.append('g')
        .call(d3.axisLeft(yScale))

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 30)
        .attr("x", 0 - height / 2)
        .attr("transform", "rotate(-90)")
        .text("Frequency (%)");
    
    // x-axis
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height - 30)
        .text("Grade");
    
    let rectangles = g.selectAll('rect')
        .data(salesData)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.year))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => colourScale(data.sales))
                .on('mouseenter', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.5);
                })
                .on('mouseleave', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1.0);
                });
    
    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.sales))
        .attr('y', (data) => yScale(data.sales))
        .duration(1000)
        .delay((data, index) => index * 50);
};

$(document).ready(function() {





    cells = $(".cell");
    $(".columnHeader").click(function(){
        let  id = $(this).attr("id");
        let columnIndex = id.split(",");
        selectColumn(columnIndex[1]);

      }); 
    $(".rowHeader").click(function(){
          let id = $(this).attr("id");
          let rowIndex = id.split(",");
          selectRow(rowIndex[0]);
      })
    $(".cell").click(function(){
        var currentCell = this;
        var text = $(currentCell).text();
        var child = $(currentCell).children(1);
        console.log(child);
        if($(child).attr("class") != "txtBox"){
            $(currentCell).html("<input class=\"txtBox\" type=\"text\">");
            let child = $(currentCell).children(1);
            $(child).val(text);
        }
        if ($(child).attr("class") == "txtBox") {
            $(window).keypress(function(e) {
                var key = e.which;
                if(key == 13){ //enter
                    newText = $(child).val();
                    console.log(newText);
                    $(child).replaceWith(newText);
                }
            });
        }
        
    })
});


function deselectAll() {
    console.log("deselected everything");
    selectedNumbers = []
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            $(element).css("background-color", "white");
        }
    }
}
function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
}
function selectRow(rowIndex) {
    freq = {
        "A" : 0,
        "B" : 0,
        "C" : 0,
        "D" : 0,
        "F" : 0
    };
    deselectAll();
    console.log("selected row " + rowIndex);
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            var cellID = $(element).attr("id");
            cellID = cellID ? cellID.split(",") : '';
            try {
                if(cellID[0] == rowIndex){
                    $(element).css("background-color", "#e0e0ff");
                    selectedNumbers.push($(element).text());
                }
            } catch (error) {
                
            }

        }
    }
    // console.log(selectedNumbers);
    selectedNumbers.forEach(grade => {
        freq[getGrade(grade)] += 1;
    });
    console.log(freq);
}
function selectColumn(columnIndex) {
    deselectAll();
    console.log("selected column " + columnIndex);
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            var cellID = $(element).attr("id");
            cellID = cellID ? cellID.split(",") : '';
            try {
                if(cellID[1] == columnIndex){
                    $(element).css("background-color", "#e0e0ff");
                    // console.log($(element).text());
                    selectedNumbers.push($(element).text());
                }
            } catch (error) {
                
            }

        }
    }
    // console.log(selectedNumbers);
    selectedNumbers.forEach(grade => {
        freq[getGrade(grade)] += 1;
    });
    console.log(freq);
    
}