export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/it/", "/es/", "/fr/", "/de/", "/pt-br/", "/nl/", "/tr/", "/pl/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
