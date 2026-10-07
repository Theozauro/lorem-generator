export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/themed-lorem-ipsum/", "/it/", "/it/lorem-ipsum-a-tema/", "/es/lorem-ipsum-tematico/", "/es/", "/fr/", "/de/", "/pt-br/", "/nl/", "/tr/", "/pl/", "/hu/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
