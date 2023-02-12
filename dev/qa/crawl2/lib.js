const visited = new Set();
const startingUrl = new URL("https://www.philboivin.com");

async function crawlSite(url) {
  if (visited.has(url)) {
    return;
  }

  visited.add(url);

  const currentUrl = new URL(url);
  if (currentUrl.host !== startingUrl.host) {
    return;
  }

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
        href = new URL(href, url).href;
      }
      crawlSite(href);
    });
  }
}

crawlSite(startingUrl.href);
