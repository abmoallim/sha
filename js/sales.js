const apiKey = "8bb4b9b99d347025cf1c0c819ef2cd40ca8f32bf";
$(document).ready(function () {
    
  // --------------------------------
  $("#addBulk").click(function() {
    var tableData = [];
    // Get table headers
    $("#dataTable thead th").each(function() {
        tableData.push($(this).text());
    });
    var csv = tableData.join(",") + "\n";

    // Get table rows
    $("#dataTable tbody tr").each(function(rowIndex) {
        var rowData = [];
        $(this).find("td").each(function(cellIndex) {
            var cellText = $(this).text().replace(/"/g, '""');
            console.log("Row", rowIndex + 1, "Cell", cellIndex + 1, cellText); // Adjust for Excel-like indexing
            rowData.push('"' + cellText + '"');
        });
        csv += rowData.join(",") + "\n";
    });

    if (!csv) {
        console.log("No data found to export");
        return; // Exit if no data
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'DataTableExport.csv';
    hiddenElement.click();
});
  // =============
  $('#addItemButton').click(function(e) {
    // Prevent the form from submitting if the button is of type 'submit'
    e.preventDefault();

    // Clone the last `.row` of `.list`
    var newRow = $('.list .row:last').clone();

    // Clear the values of inputs in the cloned row
    newRow.find('input').val('');
    
    // Append the cloned, cleared row to `.list`
    $('.list').append(newRow);
});
//   +__-------------------------

  $("#addnew").on("click", function () {
    AddNew();
  });
  $("#addNewButton").on("click", function () {
    $.ajax({
        url: "https://bytesotech.cloud/shakir/api/sales/last-sall",
        type: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        
        success: function (data) {
           let last_doc = parseInt(data[0].doc_NO)
            $("#doc_no").val(last_doc+1)
        },
        error: function (error) {
          console.log(error);
          // Handle error as needed
        },
      });
  });
  $list = $("#TableBody");
  $.ajax({
    url: "https://bytesotech.cloud/shakir/api/sales",
    type: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    success: function (data) {
      // Update the DataTable with the retrieved data
      console.log(data);
      li = JSON.parse(data);
      $.each(li, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        // onclick="getTicketByID(${item.Id})"

        $tr.append("<td>SF-SO-BAN003-2024-" + item.doc_NO + "</td>");
        $tr.append("<td>" + item.item_name + "</td>");
        $tr.append("<td>" + item.quantity + "</td>");
        $tr.append("<td>" + item.unit_price + "</td>");
        $tr.append("<td>" + item.total + "</td>");

        $list.append($tr);
      });

      // Initialize DataTable after appending rows
      $("#dataTable").DataTable();
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
});

function AddNew() {
    console.log("---");
    $('.list .row').each(function() {
        let doc = $("#doc_no").val(); // Corrected to get the value
        let price = parseFloat($(this).find(".price").val());
        let qty = parseInt($(this).find(".gty").val()); // Corrected class name
        let item_name = $(this).find(".item").val();

        // If any field is empty, skip this iteration
        if (!item_name || isNaN(qty) || isNaN(price)) return true;

        let body = {
            doc_NO: doc,
            item_name: item_name,
            quantity: qty,
            unit_price: price,
            total: price * qty,
        };

        console.log(body);

        // AJAX request
        $.ajax({
            url: `https://bytesotech.cloud/shakir/api/sales`,
            type: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(body),
            success: function(data) {
                console.log('Item added', data);
                // Success handling
            },
            error: function(error) {
                console.log('Error adding item', error);
                // Error handling
            },
        });
    });

    // Swal.fire for feedback
    Swal.fire({
        icon: "success",
        title: "All items processed",
        text: "Your request was successful!",
    }).then((result) => {
        if (result.value) {
            window.location.reload();
        }
    });
}


