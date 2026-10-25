export function createSitemap(baseUrl = "https://lorem-generator.com") {
  const paths = [
    "/", "/themed-lorem-ipsum/", "/asian-ipsum/", "/it/", "/it/lorem-ipsum-a-tema/", "/it/ipsum-asiatico/", "/es/", "/es/lorem-ipsum-tematico/", "/es/ipsum-asiatico/", "/fr/", "/fr/lorem-ipsum-thematique/", "/fr/ipsum-asiatique/", "/de/", "/de/lorem-ipsum-nach-themen/", "/de/asiatisches-ipsum/", "/pt-br/", "/pt-br/lorem-ipsum-tematico/", "/pt-br/ipsum-asiatico/", "/nl/", "/nl/lorem-ipsum-op-thema/", "/nl/aziatisch-ipsum/", "/tr/", "/tr/tematik-lorem-ipsum/", "/tr/asya-ipsum/", "/pl/", "/pl/lorem-ipsum-tematyczny/", "/pl/azjatyckie-ipsum/", "/hu/", "/hu/tematikus-lorem-ipsum/", "/hu/azsiai-ipsum/",
  ];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
