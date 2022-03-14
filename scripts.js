cellID = "00"

$(document).ready(function() {
    cells = $(".cell");
    $(".columnHeader").click(function(){
        columnIndex = $(this).attr("id");
        selectColumn(columnIndex[1]);

      }); 
    $(".rowHeader").click(function(){
          rowIndex = $(this).attr("id");
          selectRow(rowIndex[0]);
      })
    $(".cell").click(function(){
        console.log("hello cell");
    })
});

function deselectAll() {
    console.log("deselected everything");
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            $(element).css("background-color", "white");
        }
    }
}
function selectRow(rowIndex) {
    deselectAll();
    console.log("selected row " + rowIndex);
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            cellID = $(element).attr("id");
            try {
                if(cellID[0] == rowIndex){
                    $(element).css("background-color", "#e0e0ff");
                }
            } catch (error) {
                
            }

        }
    }
}
function selectColumn(columnIndex) {
    deselectAll();
    console.log("selected column " + columnIndex);
    for (const key in cells) {
        if (Object.hasOwnProperty.call(cells, key)) {
            const element = cells[key];
            cellID = $(element).attr("id");
            try {
                if(cellID[1] == columnIndex){
                    $(element).css("background-color", "#e0e0ff");
                }
            } catch (error) {
                
            }

        }
    }
}