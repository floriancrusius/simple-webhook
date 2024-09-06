document.addEventListener('DOMContentLoaded', () => {
  fetch('/data')
    .then((response) => response.json())
    .then((data) => {
      const requestList = document.getElementById('request-list');
      const requestDetails = document.getElementById('request-details');

      // Reverse the data array to show the newest request on top
      data.reverse();

      data.forEach((item) => {
        const listItem = document.createElement('li');
        const timestamp = new Date(item.datetime).toLocaleString();
        listItem.textContent = timestamp;
        listItem.dataset.data = item.data;
        listItem.addEventListener('click', () => {
          // Format the JSON data for better readability
          const formattedData = JSON.stringify(JSON.parse(item.data), null, 2);
          requestDetails.textContent = formattedData;
        });
        requestList.appendChild(listItem);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
});
