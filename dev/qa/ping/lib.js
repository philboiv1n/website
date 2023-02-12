const xhr = new XMLHttpRequest();
xhr.open("GET", "links.json", true);
xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    const links = JSON.parse(this.responseText).links;
    let table = "<table><tr><th>URL</th><th>Description</th><th>Availability</th><th>Response Time (ms)</th></tr>";
    links.forEach(link => {
      const start = new Date();
      const request = new XMLHttpRequest();
      request.open("HEAD", link.url, true);
      request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          const end = new Date();
          const responseTime = end - start;
          let availability = "Unavailable";
          if (this.status >= 200 && this.status < 300) {
            availability = "Available";
          }
          table += `<tr><td>${link.url}</td><td>${link.description}</td><td>${availability}</td><td>${responseTime}</td></tr>`;
          document.getElementById("tableContainer").innerHTML = table + "</table>";
        }
      };
      request.send();
    });
  }
};
xhr.send();