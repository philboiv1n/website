function getLinks(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(this.responseText, "text/html");
      const links = htmlDoc.getElementsByTagName("a");
      const urls = [];
      for (let i = 0; i < links.length; i++) {
        urls.push(links[i].href);
      }
      console.log(JSON.stringify({ urls: urls }));
      let table = "<table><tr><th>URL</th></tr>";
      urls.forEach(url => {
        table += `<tr><td>${url}</td></tr>`;
      });
      table += "</table>";
      document.getElementById("tableContainer").innerHTML = table;
    }
  };
  request.send();
}