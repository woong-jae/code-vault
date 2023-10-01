export default async function getDocument(url: Url) {
  const html = await fetch(url).then(res => res.text());
  return new DOMParser().parseFromString(html, 'text/html');
}
