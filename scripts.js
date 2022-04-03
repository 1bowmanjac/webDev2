var cellID = "00";
var selectedNumbers = [];

var freq = [
    {"grade" : 'A', "count" : 0},
    {"grade" : 'B', "count" : 0},
    {"grade" : 'C', "count" : 0},
    {"grade" : 'D', "count" : 0},
    {"grade" : 'F', "count" : 0}
]
var cells;
$(document).ready(function() {
    loadTable();
    cells = $(".cell");



    // $(".columnHeader").live('click',function(){
    //     let  id = $(this).attr("id");
    //     let columnIndex = id.split(",");
    //     selectColumn(columnIndex[1]);

    //   }); 
    // $(".rowHeader").live('click',function(){
    //       let id = $(this).attr("id");
    //       let rowIndex = id.split(",");
    //       selectRow(rowIndex[0]);
    //   })
    // $(".cell").live('click',function(){
    //     var currentCell = this;
    //     var text = $(currentCell).text();
    //     var child = $(currentCell).children(1);
    //     console.log(child);
    //     if($(child).attr("class") != "txtBox"){
    //         $(currentCell).html("<input class=\"txtBox\" type=\"text\">");
    //         let child = $(currentCell).children(1);
    //         $(child).val(text);
    //     }
    //     if ($(child).attr("class") == "txtBox") {
    //         $(window).keypress(function(e) {
    //             var key = e.which;
    //             if(key == 13){ //enter
    //                 newText = $(child).val();
    //                 console.log(newText);
    //                 $(child).replaceWith(newText);
    //             }
    //         });
    //     }
        
    // })
});

$(document).on('click',".columnHeader", function(){
    cells = $(".cell");
    let  id = $(this).attr("id");
    let columnIndex = id.split(",");
    selectColumn(columnIndex[1]);
});
$(document).on('click',".rowHeader", function(){
    cells = $(".cell");
    let id = $(this).attr("id");
    let rowIndex = id.split(",");
    selectRow(rowIndex[0]);
});
$(document).on('click',".cell", function(){
    cells = $(".cell");
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
    
});


function loadChart(){
    
    d3.select("svg").remove();

    const margin = 65;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;


    
    const xScale = d3.scaleBand() // discrete, bucket
                        .domain(freq.map((data) => data.grade))
                        .range([0, chartWidth])
                        .padding(0.3);
    
    const yScale = d3.scaleLinear()
                        .domain([0, 1])
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
        .data(freq)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.grade))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => "blue")

    
    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.count))
        .attr('y', (data) => yScale(data.count))
        .duration(1000)
        .delay((data, index) => index * 50);
}

function deselectAll() {
    console.log("deselected everything");
    selectedNumbers = []
    freq = [
        {"grade" : 'A', "count" : 0},
        {"grade" : 'B', "count" : 0},
        {"grade" : 'C', "count" : 0},
        {"grade" : 'D', "count" : 0},
        {"grade" : 'F', "count" : 0}
    ]
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
        // console.log(getGrade(grade));
        freq.forEach(letter => {
            if(letter.grade == getGrade(grade)){
                letter.count += 1/9;
            }
        });
    });

    console.log(freq);
    loadChart();
}
function loadTable() {
    $.ajax({
        url:"grades.csv",
        dataType:"text",
        success:function(data)
        {
            console.log(data);
            var gradeData = data.split('\n');
            console.log(gradeData);
            var column = "<td class='cell'></td>";
            var columnHeader = "<td class='rowHeader header'></td>"
            var row = `<tr>${columnHeader}${column}${column}${column}${column}${column}</tr>`;
            
            var tableString = "";
            for (let i = 0; i < gradeData.length; i++) {
                const row = gradeData[i];
                var splitRow = row.split(',');
                var rowString = "";
                for (let j = 0; j < splitRow.length; j++) {
                    const cell = splitRow[j];
                    var id=`${i},${j}`;
                    var classes = "";
                    if(i == 0 && j == 0){
                        classes = "header";
                    } else if(i == 0){
                        classes = "header columnHeader";
                    } else if(j == 0){
                        classes = "rowHeader header";
                    } else {
                        classes = "cell";
                    }
                    rowString += `<td id='${id}' class='${classes}'>${cell} </td>`

                }
                tableString += `<tr>${rowString}</tr>`;
            }
            $("table").html(`${tableString}`);
        }
    });
}