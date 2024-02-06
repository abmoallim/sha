// Get the canvas element
var ctx = document.getElementById("myChart").getContext("2d");

// Monthly events data
var monthlyEventsData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "Decemper",
  ],
  datasets: [
    {
      label: "Monthly Events",
      data: [5, 12, 1, 6, 3, 6, 2, 1, 6, 3, 4, 12], // Replace with the actual number of events for each month
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Customize chart colors
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Create the chart
var myChart = new Chart(ctx, {
  type: "bar", // You can choose different chart types (bar, line, pie, etc.)
  data: monthlyEventsData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
