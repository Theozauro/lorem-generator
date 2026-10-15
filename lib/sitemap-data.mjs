export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/themed-lorem-ipsum/", "/it/", "/it/lorem-ipsum-a-tema/", "/es/lorem-ipsum-tematico/", "/es/", "/fr/", "/fr/lorem-ipsum-thematique/", "/de/", "/de/lorem-ipsum-nach-themen/", "/pt-br/", "/pt-br/lorem-ipsum-tematico/", "/nl/", "/nl/lorem-ipsum-op-thema/", "/tr/", "/pl/", "/pl/lorem-ipsum-tematyczny/", "/hu/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
