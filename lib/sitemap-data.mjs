export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/themed-lorem-ipsum/", "/asian-ipsum/", "/it/", "/it/lorem-ipsum-a-tema/", "/it/ipsum-asiatico/", "/es/", "/es/lorem-ipsum-tematico/", "/es/ipsum-asiatico/", "/fr/", "/fr/lorem-ipsum-thematique/", "/fr/ipsum-asiatique/", "/de/", "/de/lorem-ipsum-nach-themen/", "/de/asiatisches-ipsum/", "/pt-br/", "/pt-br/lorem-ipsum-tematico/", "/nl/", "/nl/lorem-ipsum-op-thema/", "/tr/", "/tr/tematik-lorem-ipsum/", "/pl/", "/pl/lorem-ipsum-tematyczny/", "/hu/", "/hu/tematikus-lorem-ipsum/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
