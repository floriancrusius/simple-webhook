document.addEventListener('DOMContentLoaded', () => {
  const requestList = document.getElementById('request-list');
  const requestDetails = document.getElementById('request-details');
  let selectedListItem = null;

  // Fetch initial data
  fetch('/data')
    .then((response) => response.json())
    .then((data) => {
      data.reverse();
      data.forEach((item) => {
        addItemToList(item);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));

  // Connect to WebSocket server
  const socket = new WebSocket(`ws://${window.location.host}`);

  socket.addEventListener('message', (event) => {
    const item = JSON.parse(event.data);
    addItemToList(item, true);
  });

  function addItemToList(item, prepend = false) {
    const listItem = document.createElement('li');
    const timestamp = new Date(item.datetime).toLocaleString();
    listItem.textContent = timestamp;
    listItem.dataset.data = item.data;
    listItem.addEventListener('click', () => {
      // Remove the 'selected' class from the previously selected item
      if (selectedListItem) {
        selectedListItem.classList.remove('selected');
      }
      // Add the 'selected' class to the clicked item
      listItem.classList.add('selected');
      selectedListItem = listItem;

      // Format the JSON data for better readability
      const formattedData = JSON.stringify(JSON.parse(item.data), null, 2);
      requestDetails.textContent = formattedData;
    });
    if (prepend) {
      requestList.insertBefore(listItem, requestList.firstChild);
    } else {
      requestList.appendChild(listItem);
    }
  }
});
