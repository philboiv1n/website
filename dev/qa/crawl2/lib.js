const visited = new Set();

async function crawlSite(url) {
  if (visited.has(url)) {
    return;
  }

  visited.add(url);
  console.log(url);

  const response = await fetch(url);
  if (response.ok) {
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));
    links.forEach(link => {
      let href = link.getAttribute('href');
      if (!href.startsWith('http')) {
        href = url + '/' + href;
      }
      crawlSite(href);
    });
  }
}

crawlSite("https://www.philboivin.com");
