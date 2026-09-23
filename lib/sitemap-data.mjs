export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/it/", "/es/", "/fr/", "/de/", "/pt-br/", "/nl/",
    "/privacy-policy/", "/it/privacy-policy/", "/es/privacy-policy/", "/fr/privacy-policy/", "/de/privacy-policy/", "/pt-br/privacy-policy/", "/nl/privacy-policy/",
    "/cookie-policy/", "/it/cookie-policy/", "/es/cookie-policy/", "/fr/cookie-policy/", "/de/cookie-policy/", "/pt-br/cookie-policy/", "/nl/cookie-policy/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
