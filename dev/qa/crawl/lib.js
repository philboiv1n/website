const request = new XMLHttpRequest();
const visitedUrls = new Set();
const urls = [];
let activeRequests = 0;
const MAX_ACTIVE_REQUESTS = 10;
const MAX_LEVEL = 10;
const baseUrl = window.location.protocol + "//" + window.location.host + "/";

function crawl(url, level) {
  if (visitedUrls.has(url)) {
    return;
  }
  visitedUrls.add(url);
  urls.push(url);
  activeRequests++;
  request.open("GET", url, true);
  request.onreadystatechange = function() {
    activeRequests--;
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(this.responseText, "text/html");
      const links = htmlDoc.getElementsByTagName("a");
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.href.startsWith(baseUrl) && activeRequests < MAX_ACTIVE_REQUESTS && level < MAX_LEVEL) {
          crawl(link.href, level + 1);
        }
      }
    }
    if (activeRequests === 0) {
      console.log(JSON.stringify({ urls: Array.from(urls) }));
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

crawl(baseUrl, 1);
