export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/it/", "/it/lorem-ipsum-a-tema/", "/es/", "/fr/", "/de/", "/pt-br/", "/nl/", "/tr/", "/pl/", "/hu/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
