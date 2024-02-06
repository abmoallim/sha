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

  $("#addnew").on("click", function () {
    AddNew();
  });
  $list = $("#TableBody");
  $.ajax({
    url: "https://bytesotech.cloud/shakir/api/contacts",
    type: "GET",
    headers: {
      "x-api-key": apiKey,
    },
    success: function (data) {
      // Update the DataTable with the retrieved data
      li = JSON.parse(data);
      $.each(li, function (idx, item) {
        var $tr = $("<tr></tr>");
        $tr.append(`<td>${idx + 1} </td>`);
        // onclick="getTicketByID(${item.Id})"

        $tr.append("<td>" + item.name + "</td>");
        $tr.append("<td>" + item.phone + "</td>");
        $tr.append("<td>" + item.type + "</td>");

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
  let body = {
    name: $("#name").val(),
    phone: $("#phone").val(),
    type: $("#type").val(),
  };
  $.ajax({
    url: `https://bytesotech.cloud/shakir/api/contacts`,
    type: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
    success: function (data) {
        Swal.fire({
            icon: "success",
            title: "Contact Added",
            text: "Your request was successful!",
          }).then((result) => {
            if (result.value) {
              // The promise resolves with an object containing `isConfirmed`, `isDenied`, and `isDismissed` properties
              // Refresh the page
              window.location.reload();
            }
          });
          
    },
    error: function (error) {
      console.log(error);
      // Handle error as needed
    },
  });
}
