type LegalKind = "privacy" | "cookies";
type LegalLanguage = "en" | "it" | "es" | "fr" | "de" | "pt-BR" | "nl-NL" | "tr";

const content = {
  en: {
    privacy: {
      title: "Privacy Policy",
      intro: "This Privacy Policy explains how lorem-generator.com handles information when you use the website.",
      sections: [
        ["Text generation", "Lorem Ipsum generation and the text tools available on the site run locally in your browser. Generated text and text entered into these tools are not sent to the site’s application server."],
        ["Local preferences", "The site uses browser local storage to remember interface settings such as your colour theme and your analytics consent preference. This information remains on your device until you change your preferences or clear your browser storage."],
        ["Analytics", <><p>lorem-generator.com uses Ahrefs Web Analytics to understand aggregate website traffic and usage. Ahrefs describes its Web Analytics service as cookie-free and states that it does not collect personal data. On this site, the Ahrefs analytics script is loaded only after you choose to allow analytics.</p><p>You can change your analytics preference through the site’s privacy controls.</p><p>Learn more about <a href="https://ahrefs.com/web-analytics">Ahrefs Web Analytics</a>.</p></>],
        ["Advertising and Google AdSense", <><p>lorem-generator.com uses Google AdSense to display advertising.</p><p>Google and its advertising partners may use cookies, local storage, IP addresses, web beacons or other identifiers in connection with ad delivery, measurement, fraud prevention and, where permitted, ad personalisation.</p><p>For users in the European Economic Area, the United Kingdom and Switzerland, advertising consent is managed through Google Privacy &amp; Messaging, a consent management platform that supports the IAB Europe Transparency &amp; Consent Framework. The message allows users to consent, refuse consent or manage individual options for advertising purposes and participating vendors.</p><p>Users can later review or withdraw their advertising consent through the Privacy and cookie settings provided by Google’s consent system.</p><p>See <a href="https://policies.google.com/technologies/ads">Google’s advertising information</a>.</p></>],
        ["Hosting and security", <><p>lorem-generator.com is delivered through Cloudflare infrastructure. When users access websites delivered through Cloudflare, Cloudflare may process limited technical information such as IP addresses, traffic-routing data, system configuration information and other request-related data necessary to deliver, secure and operate its services.</p><p>See <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s privacy documentation</a>.</p></>],
        ["Data retention", "The site does not create user accounts and does not store the text generated with the Lorem Ipsum tools on its application server. Local preferences remain in your browser until you change them or clear browser storage. Information processed by third-party providers is retained according to their respective policies and service configurations."],
        ["Your choices and rights", <><p>Where applicable under data-protection law, you may have rights relating to access, rectification, erasure, restriction, objection, data portability and withdrawal of consent.</p><p>Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal.</p><p>For privacy-related requests concerning lorem-generator.com, contact <a href="mailto:privacy@lorem-generator.com">privacy@lorem-generator.com</a>.</p></>],
        ["Third-party services", <><p>For more information about how third-party providers process information, refer to their respective privacy documentation:</p><ul><li><a href="https://policies.google.com/privacy">Google</a></li><li><a href="https://ahrefs.com/privacy">Ahrefs</a></li><li><a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a></li></ul></>],
        ["Changes to this policy", "This Privacy Policy may be updated when the site’s services, technologies or data-processing practices change. The version published on this page reflects the current operation of lorem-generator.com."]
      ]
    },
    cookies: {
      title: "Cookie Policy",
      intro: "This Cookie Policy explains how lorem-generator.com uses cookies and browser storage and how you can manage your choices.",
      sections: [
        ["Necessary browser storage", <><p>The site uses browser local storage for essential interface functions, including:</p><ul><li>your colour theme preference;</li><li>your saved analytics consent preference.</li></ul><p>Local storage is not a cookie. These values remain on your device until you change your preferences or clear your browser storage.</p></>],
        ["Analytics", <><p>Ahrefs Web Analytics is used only after analytics consent has been granted.</p><p>Ahrefs describes this service as cookie-free and states that it does not collect personal data. If analytics consent is not granted, the Ahrefs analytics script is not loaded.</p><p>Learn more about <a href="https://ahrefs.com/web-analytics">Ahrefs Web Analytics</a>.</p></>],
        ["Advertising cookies and storage", <><p>Google AdSense may use cookies or other forms of local storage when advertising services are provided. Google states that AdSense uses cookies for functions including ad delivery, frequency control, reporting and, where permitted, personalisation.</p><p>For eligible users in the EEA, the UK and Switzerland, Google Privacy &amp; Messaging manages consent for advertising cookies, local storage and associated processing.</p><p>See <a href="https://policies.google.com/technologies/ads">Google’s advertising information</a>.</p></>],
        ["Managing analytics preferences", "The site’s own privacy controls manage the optional Ahrefs analytics setting. If analytics is disabled, Ahrefs is not loaded on subsequent page loads."],
        ["Managing advertising preferences", "Advertising preferences are managed separately through Google’s consent system. Eligible users can reopen the Google consent interface using the Privacy and cookie settings control and can change or withdraw previous choices."],
        ["Browser controls", "You can also delete cookies and local storage through your browser settings. Doing so may reset saved preferences and may cause consent choices to be requested again."],
        ["Changes to this policy", "This Cookie Policy may be updated when the cookies, browser-storage mechanisms or third-party services used by lorem-generator.com change."]
      ]
    }
  },
  it: {
    privacy: {
      title: "Informativa privacy",
      intro: "Questa informativa descrive come lorem-generator.com tratta le informazioni durante l’utilizzo del sito.",
      sections: [
        ["Generazione del testo", "La generazione di Lorem Ipsum e gli strumenti di testo disponibili sul sito funzionano localmente nel browser. Il testo generato e quello inserito negli strumenti non vengono inviati al server applicativo del sito."],
        ["Preferenze locali", "Il sito utilizza la memoria locale del browser per ricordare alcune impostazioni dell’interfaccia, come il tema colore e la preferenza relativa agli analytics. Queste informazioni rimangono sul dispositivo finché non modifichi le preferenze o cancelli i dati memorizzati dal browser."],
        ["Analytics", <><p>lorem-generator.com utilizza <a href="https://ahrefs.com/it/web-analytics">Ahrefs Web Analytics</a> per comprendere in forma aggregata il traffico e l’utilizzo del sito. Ahrefs descrive il proprio servizio Web Analytics come privo di cookie e dichiara di non raccogliere dati personali. Su questo sito lo script di Ahrefs viene caricato solo dopo che l’utente ha scelto di consentire gli analytics.</p><p>La preferenza relativa agli analytics può essere modificata tramite i controlli privacy del sito.</p></>],
        ["Pubblicità e Google AdSense", <><p>lorem-generator.com utilizza Google AdSense per mostrare contenuti pubblicitari.</p><p>Google e i suoi partner pubblicitari possono utilizzare cookie, archiviazione locale, indirizzi IP, web beacon o altri identificatori in relazione alla pubblicazione e misurazione degli annunci, alla prevenzione delle frodi e, quando consentito, alla personalizzazione della pubblicità.</p><p>Per gli utenti dello Spazio economico europeo, del Regno Unito e della Svizzera, le preferenze relative alla pubblicità sono gestite tramite Google Privacy e messaggi, una piattaforma di gestione del consenso compatibile con il Transparency &amp; Consent Framework di IAB Europe. Il messaggio permette di acconsentire, negare il consenso o gestire singolarmente le opzioni relative alle finalità pubblicitarie e ai fornitori coinvolti.</p><p>Le preferenze pubblicitarie possono essere successivamente modificate o revocate tramite le impostazioni relative alla privacy e ai cookie messe a disposizione dal sistema di consenso Google.</p><p>Consulta le <a href="https://policies.google.com/technologies/ads?hl=it">informazioni di Google sulla pubblicità</a>.</p></>],
        ["Hosting e sicurezza", <><p>lorem-generator.com viene distribuito attraverso l’infrastruttura Cloudflare. Durante l’accesso al sito, Cloudflare può trattare informazioni tecniche limitate, tra cui indirizzi IP, dati di instradamento del traffico, informazioni sulla configurazione del sistema e altri dati relativi alle richieste, necessari per distribuire, proteggere e gestire il servizio.</p><p>Consulta la <a href="https://www.cloudflare.com/it-it/privacypolicy/">documentazione sulla privacy di Cloudflare</a>.</p></>],
        ["Conservazione dei dati", "Il sito non crea account utente e non memorizza sul proprio server applicativo il testo generato tramite gli strumenti Lorem Ipsum. Le preferenze locali restano memorizzate nel browser finché non vengono modificate o cancellate. Le informazioni eventualmente trattate dai fornitori terzi vengono conservate secondo le rispettive informative e configurazioni dei servizi."],
        ["Scelte e diritti dell’utente", <><p>Quando previsto dalla normativa applicabile, l’utente può esercitare i diritti relativi ad accesso, rettifica, cancellazione, limitazione del trattamento, opposizione, portabilità dei dati e revoca del consenso.</p><p>La revoca del consenso non pregiudica la liceità dei trattamenti effettuati prima della revoca.</p><p>Per richieste relative alla privacy di lorem-generator.com è possibile contattare <a href="mailto:privacy@lorem-generator.com">privacy@lorem-generator.com</a>.</p></>],
        ["Servizi di terze parti", <><p>Per maggiori informazioni sul trattamento effettuato dai fornitori terzi è possibile consultare le rispettive informative:</p><ul><li><a href="https://policies.google.com/privacy?hl=it">Google</a></li><li><a href="https://ahrefs.com/privacy">Ahrefs</a></li><li><a href="https://www.cloudflare.com/it-it/privacypolicy/">Cloudflare</a></li></ul></>],
        ["Modifiche all’informativa", "Questa informativa può essere aggiornata quando cambiano i servizi, le tecnologie o le modalità di trattamento dei dati utilizzate dal sito. La versione pubblicata in questa pagina descrive il funzionamento attuale di lorem-generator.com."]
      ]
    },
    cookies: {
      title: "Informativa sui cookie",
      intro: "Questa informativa descrive l’utilizzo di cookie e memoria del browser da parte di lorem-generator.com e spiega come gestire le proprie preferenze.",
      sections: [
        ["Memoria locale necessaria", <><p>Il sito utilizza la memoria locale del browser per alcune funzioni dell’interfaccia, tra cui:</p><ul><li>la preferenza relativa al tema colore;</li><li>la preferenza salvata relativa agli analytics.</li></ul><p>La memoria locale non è un cookie. Questi valori rimangono sul dispositivo finché non vengono modificati oppure cancellati dalle impostazioni del browser.</p></>],
        ["Analytics", <><p><a href="https://ahrefs.com/it/web-analytics">Ahrefs Web Analytics</a> viene utilizzato soltanto dopo che l’utente ha espresso il consenso agli analytics.</p><p>Ahrefs descrive questo servizio come privo di cookie e dichiara di non raccogliere dati personali. Se il consenso agli analytics non viene fornito, lo script Ahrefs non viene caricato.</p></>],
        ["Cookie e archiviazione per la pubblicità", <><p>Google AdSense può utilizzare cookie o altre forme di archiviazione locale durante l’erogazione dei servizi pubblicitari. Secondo Google, i cookie di AdSense possono essere utilizzati, tra le altre cose, per pubblicare annunci, limitarne la frequenza, misurarne le prestazioni e, quando consentito, personalizzarli.</p><p>Per gli utenti interessati nello SEE, nel Regno Unito e in Svizzera, Google Privacy e messaggi gestisce il consenso relativo ai cookie pubblicitari, all’archiviazione locale e ai trattamenti collegati.</p><p>Consulta le <a href="https://policies.google.com/technologies/ads?hl=it">informazioni di Google sulla pubblicità</a>.</p></>],
        ["Gestione delle preferenze analytics", "I controlli privacy propri di lorem-generator.com gestiscono esclusivamente la preferenza opzionale relativa ad Ahrefs Analytics. Quando gli analytics vengono disabilitati, Ahrefs non viene caricato ai successivi caricamenti della pagina."],
        ["Gestione delle preferenze pubblicitarie", "Le preferenze pubblicitarie sono gestite separatamente tramite il sistema di consenso Google. Gli utenti interessati possono riaprire l’interfaccia Google tramite il comando Impostazioni relative alla privacy e ai cookie e modificare o revocare le scelte effettuate in precedenza."],
        ["Impostazioni del browser", "Cookie e memoria locale possono essere eliminati anche attraverso le impostazioni del browser. Questa operazione può reimpostare le preferenze salvate e comportare una nuova richiesta di consenso."],
        ["Modifiche all’informativa", "Questa informativa può essere aggiornata quando cambiano i cookie, i meccanismi di archiviazione del browser o i servizi di terze parti utilizzati da lorem-generator.com."]
      ]
    }
  }
} as const;

const spanishPrivacy = {
  title: "Política de privacidad",
  intro: "Esta política describe el funcionamiento actual de lorem-generator.com en materia de privacidad.",
  sections: [
    ["Generación de texto", "La generación de Lorem Ipsum se realiza localmente en tu navegador. El texto generado y el que introduces en las herramientas de la página no se envían al servidor de la aplicación."],
    ["Preferencias", "Tus preferencias de tema de color y privacidad pueden guardarse localmente en el navegador para que la interfaz las recuerde."],
    ["Alojamiento y seguridad", "lorem-generator.com se distribuye mediante la infraestructura de Cloudflare. Cloudflare puede tratar información técnica limitada necesaria para prestar, proteger y operar el sitio web, como la dirección IP, información sobre las solicitudes y datos relacionados con la seguridad, de acuerdo con su propia política de privacidad."],
    ["Cambios", "El sitio no tiene activados actualmente servicios de analítica, publicidad, AdSense ni otros servicios de seguimiento no esenciales de terceros. Esta política se actualizará antes de activar cualquier nuevo servicio que implique tratamiento de datos."]
  ]
} as const;

const spanishCookies = {
  title: "Política de cookies",
  intro: "Esta política explica el uso actual de cookies y del almacenamiento local del navegador en lorem-generator.com.",
  sections: [
    ["Cookies", "El sitio no utiliza actualmente cookies de analítica, publicidad ni otras cookies no esenciales."],
    ["Almacenamiento local", "El almacenamiento local no es una cookie. La interfaz puede utilizarlo para recordar en este dispositivo tus preferencias de tema de color y privacidad."],
    ["Servicios opcionales", "Los servicios de analítica, publicidad y AdSense no están activados actualmente. Si se añade alguno de estos servicios, los controles de consentimiento y esta política se actualizarán antes de su activación."],
    ["Gestión del almacenamiento local", "Puedes borrar el almacenamiento local desde la configuración de tu navegador. Esto restablece las preferencias guardadas de tema y privacidad."]
  ]
} as const;

const frenchPrivacy = {
  title: "Politique de confidentialité",
  intro: "Cette politique décrit les pratiques actuelles de lorem-generator.com en matière de confidentialité.",
  sections: [
    ["Génération du texte", "La génération de Lorem Ipsum s’effectue localement dans votre navigateur. Le texte généré et celui que vous saisissez dans les outils de la page ne sont pas envoyés au serveur de l’application."],
    ["Préférences", "Vos préférences de thème de couleur et de confidentialité peuvent être enregistrées localement dans votre navigateur afin que l’interface puisse s’en souvenir."],
    ["Hébergement et sécurité", "lorem-generator.com est distribué via l’infrastructure de Cloudflare. Cloudflare peut traiter un volume limité d’informations techniques nécessaires à la fourniture, à la sécurisation et au fonctionnement du site, notamment l’adresse IP, des informations relatives aux requêtes et des données liées à la sécurité, conformément à sa propre politique de confidentialité."],
    ["Modifications", "Le site n’active actuellement aucun service de mesure d’audience, de publicité, AdSense ni aucun autre service tiers de suivi non essentiel. Cette politique sera mise à jour avant l’activation de tout nouveau service impliquant un traitement de données."]
  ]
} as const;

const frenchCookies = {
  title: "Politique relative aux cookies",
  intro: "Cette politique explique l’utilisation actuelle des cookies et du stockage local du navigateur sur lorem-generator.com.",
  sections: [
    ["Cookies", "Le site n’utilise actuellement aucun cookie de mesure d’audience, de publicité ni aucun autre cookie non essentiel."],
    ["Stockage local", "Le stockage local n’est pas un cookie. L’interface peut l’utiliser pour mémoriser, sur cet appareil, vos préférences de thème de couleur et de confidentialité."],
    ["Services facultatifs", "Les services de mesure d’audience, de publicité et AdSense ne sont actuellement pas activés. Si l’un de ces services est ajouté, les contrôles de consentement et cette politique seront mis à jour avant son activation."],
    ["Gestion du stockage local", "Vous pouvez effacer le stockage local depuis les paramètres de votre navigateur. Cela réinitialise les préférences de thème et de confidentialité enregistrées."]
  ]
} as const;

const germanPrivacy = {
  title: "Datenschutzerklärung",
  intro: "Diese Datenschutzerklärung beschreibt den aktuellen Umgang mit personenbezogenen Daten auf lorem-generator.com.",
  sections: [
    ["Texterzeugung", "Die Lorem-Ipsum-Generierung erfolgt lokal in deinem Browser. Generierter Text und Text, den du in die Werkzeuge der Seite eingibst, werden nicht an den Anwendungsserver der Website gesendet."],
    ["Einstellungen", "Deine Einstellungen für das Farbschema und den Datenschutz können lokal in deinem Browser gespeichert werden, damit die Oberfläche sie bei späteren Besuchen wiederverwenden kann."],
    ["Hosting und Sicherheit", "lorem-generator.com wird über die Infrastruktur von Cloudflare bereitgestellt. Cloudflare kann in begrenztem Umfang technische Informationen verarbeiten, die für die Bereitstellung, Absicherung und den Betrieb der Website erforderlich sind, darunter IP-Adresse, Anfrageinformationen und sicherheitsbezogene Daten, gemäß der eigenen Datenschutzerklärung von Cloudflare."],
    ["Änderungen", "Die Website nutzt derzeit keine Analyse- oder Werbedienste, AdSense oder andere nicht notwendige Tracking-Dienste von Drittanbietern. Diese Datenschutzerklärung wird aktualisiert, bevor ein neuer Dienst aktiviert wird, der eine zusätzliche Datenverarbeitung mit sich bringt."]
  ]
} as const;

const germanCookies = {
  title: "Cookie-Richtlinie",
  intro: "Diese Richtlinie erläutert die aktuelle Verwendung von Cookies und lokalem Browserspeicher auf lorem-generator.com.",
  sections: [
    ["Cookies", "Die Website verwendet derzeit keine Analyse-, Werbe- oder anderen nicht notwendigen Cookies."],
    ["Lokaler Speicher", "Lokaler Speicher ist kein Cookie. Die Oberfläche kann ihn verwenden, um auf diesem Gerät deine Einstellungen für Farbschema und Datenschutz zu speichern."],
    ["Optionale Dienste", "Analyse- und Werbedienste sowie AdSense sind derzeit nicht aktiviert. Falls einer dieser Dienste hinzukommt, werden die Einwilligungsoptionen und diese Richtlinie vor der Aktivierung entsprechend aktualisiert."],
    ["Lokalen Speicher verwalten", "Du kannst den lokalen Speicher über die Einstellungen deines Browsers löschen. Dadurch werden die gespeicherten Einstellungen für Farbschema und Datenschutz zurückgesetzt."]
  ]
} as const;

const brazilianPortuguesePrivacy = {
  title: "Política de Privacidade",
  intro: "Esta política descreve as práticas atuais de privacidade do lorem-generator.com.",
  sections: [
    ["Geração de texto", "A geração de Lorem Ipsum ocorre localmente no seu navegador. O texto gerado e o texto que você insere nas ferramentas da página não são enviados ao servidor da aplicação."],
    ["Preferências", "Suas preferências de tema de cores e privacidade podem ser armazenadas localmente no navegador para que a interface possa lembrá-las."],
    ["Hospedagem e segurança", "lorem-generator.com é distribuído pela infraestrutura da Cloudflare. A Cloudflare pode processar uma quantidade limitada de informações técnicas necessárias para fornecer, proteger e operar o site, como endereço IP, informações sobre solicitações e dados relacionados à segurança, de acordo com sua própria Política de Privacidade."],
    ["Alterações", "O site não utiliza atualmente serviços de análise, publicidade, AdSense nem outros serviços de rastreamento não essenciais de terceiros. Esta política será atualizada antes da ativação de qualquer novo serviço que envolva processamento adicional de dados."]
  ]
} as const;

const brazilianPortugueseCookies = {
  title: "Política de Cookies",
  intro: "Esta política explica o uso atual de cookies e do armazenamento local do navegador no lorem-generator.com.",
  sections: [
    ["Cookies", "O site não utiliza atualmente cookies de análise, publicidade ou outros cookies não essenciais."],
    ["Armazenamento local", "O armazenamento local não é um cookie. A interface pode utilizá-lo para lembrar, neste dispositivo, suas preferências de tema de cores e privacidade."],
    ["Serviços opcionais", "Serviços de análise, publicidade e AdSense não estão atualmente ativados. Se algum desses serviços for adicionado, os controles de consentimento e esta política serão atualizados antes da ativação."],
    ["Gerenciar o armazenamento local", "Você pode apagar o armazenamento local nas configurações do navegador. Isso redefine as preferências de tema e privacidade armazenadas."]
  ]
} as const;

const dutchPrivacy = {
  title: "Privacybeleid",
  intro: "Dit beleid beschrijft de huidige privacypraktijken van lorem-generator.com.",
  sections: [
    ["Tekstgeneratie", "Het genereren van Lorem Ipsum gebeurt lokaal in je browser. Gegenereerde tekst en tekst die je in de tools op de pagina invoert, worden niet naar de applicatieserver verzonden."],
    ["Voorkeuren", "Je voorkeuren voor kleurthema en privacy kunnen lokaal in de browser worden opgeslagen, zodat de interface deze kan onthouden."],
    ["Hosting en beveiliging", "lorem-generator.com wordt geleverd via de infrastructuur van Cloudflare. Cloudflare kan een beperkte hoeveelheid technische informatie verwerken die nodig is om de site te leveren, te beveiligen en te laten functioneren, zoals het IP-adres, informatie over verzoeken en beveiligingsgerelateerde gegevens, in overeenstemming met het eigen privacybeleid van Cloudflare."],
    ["Wijzigingen", "De site maakt momenteel geen gebruik van analysetools, advertenties, AdSense of andere niet-essentiële trackingdiensten van derden. Dit beleid wordt bijgewerkt voordat een nieuwe dienst wordt geactiveerd die aanvullende gegevensverwerking met zich meebrengt."]
  ]
} as const;

const dutchCookies = {
  title: "Cookiebeleid",
  intro: "Dit beleid legt het huidige gebruik van cookies en lokale browseropslag op lorem-generator.com uit.",
  sections: [
    ["Cookies", "De site gebruikt momenteel geen analytische, advertentie- of andere niet-essentiële cookies."],
    ["Lokale opslag", "Lokale opslag is geen cookie. De interface kan deze gebruiken om je voorkeuren voor kleurthema en privacy op dit apparaat te onthouden."],
    ["Optionele diensten", "Analyse, advertenties en AdSense zijn momenteel niet geactiveerd. Als een van deze diensten wordt toegevoegd, worden de toestemmingsinstellingen en dit beleid bijgewerkt voordat de dienst wordt geactiveerd."],
    ["Lokale opslag beheren", "Je kunt lokale opslag wissen via de instellingen van je browser. Hierdoor worden opgeslagen voorkeuren voor kleurthema en privacy opnieuw ingesteld."]
  ]
} as const;

const turkishPrivacy = {
  title: "Gizlilik Politikası",
  intro: "Bu politika, lorem-generator.com sitesinin gizlilikle ilgili mevcut uygulamalarını açıklar.",
  sections: [
    ["Metin oluşturma", "Lorem Ipsum oluşturma işlemi tarayıcınızda yerel olarak gerçekleşir. Oluşturulan metin ve sayfadaki araçlara girdiğiniz metinler sitenin uygulama sunucusuna gönderilmez."],
    ["Tercihler", "Renk teması tercihiniz ve gizlilik tercihiniz, arayüzün bu seçimleri hatırlayabilmesi için tarayıcınızda yerel olarak saklanabilir."],
    ["Barındırma ve güvenlik", "lorem-generator.com, Cloudflare altyapısı kullanılarak sunulur. Cloudflare, kendi gizlilik şartlarına uygun olarak web sitesini sunmak, güvenliğini sağlamak ve işletmek için gereken IP adresi, istek bilgileri ve güvenlikle ilgili veriler gibi sınırlı teknik bilgileri işleyebilir."],
    ["Değişiklikler", "Site şu anda analiz, reklam, AdSense veya zorunlu olmayan diğer üçüncü taraf izleme hizmetlerini etkinleştirmemektedir. Ek veri işleme gerektiren yeni bir hizmet etkinleştirilmeden önce bu politika güncellenecektir."]
  ]
} as const;

const turkishCookies = {
  title: "Çerez Politikası",
  intro: "Bu politika, lorem-generator.com sitesindeki çerezlerin ve tarayıcı yerel depolamasının mevcut kullanımını açıklar.",
  sections: [
    ["Çerezler", "Site şu anda analiz, reklam veya zorunlu olmayan başka çerezler kullanmamaktadır."],
    ["Yerel depolama", "Yerel depolama bir çerez değildir. Arayüz, bu cihazdaki renk teması ve gizlilik tercihlerinizi hatırlamak için yerel depolamayı kullanabilir."],
    ["İsteğe bağlı hizmetler", "Analiz, reklam ve AdSense hizmetleri şu anda etkin değildir. Bu hizmetlerden biri eklenirse izin kontrolleri ve bu politika etkinleştirilmeden önce güncellenecektir."],
    ["Yerel depolamayı yönetme", "Yerel depolamayı tarayıcı ayarlarınızdan silebilirsiniz. Bu işlem, kaydedilmiş tema ve gizlilik tercihlerini sıfırlar."]
  ]
} as const;

export function LegalPage({ language, kind }: { language: LegalLanguage; kind: LegalKind }) {
  const copy = language === "es" ? (kind === "cookies" ? spanishCookies : spanishPrivacy) : language === "fr" ? (kind === "cookies" ? frenchCookies : frenchPrivacy) : language === "de" ? (kind === "cookies" ? germanCookies : germanPrivacy) : language === "pt-BR" ? (kind === "cookies" ? brazilianPortugueseCookies : brazilianPortuguesePrivacy) : language === "nl-NL" ? (kind === "cookies" ? dutchCookies : dutchPrivacy) : language === "tr" ? (kind === "cookies" ? turkishCookies : turkishPrivacy) : content[language][kind];
  const isItalian = language === "it";
  const isSpanish = language === "es";
  const isFrench = language === "fr";
  const isGerman = language === "de";
  const isBrazilianPortuguese = language === "pt-BR";
  const isDutch = language === "nl-NL";
  const isTurkish = language === "tr";
  const home = isItalian ? "/it/" : isSpanish ? "/es/" : isFrench ? "/fr/" : isGerman ? "/de/" : isBrazilianPortuguese ? "/pt-br/" : isDutch ? "/nl/" : isTurkish ? "/tr/" : "/";

  return <main className="site-shell legal-shell" lang={language === "nl-NL" ? "nl" : language}>
    <article className="page-content legal-content">
      <a className="legal-back" href={home}>{isItalian ? "← Torna al generatore" : isSpanish ? "← Volver al generador" : isFrench ? "← Retour au générateur" : isGerman ? "← Zurück zum Generator" : isBrazilianPortuguese ? "← Voltar ao gerador" : isDutch ? "← Terug naar de generator" : isTurkish ? "← Oluşturucuya dön" : "← Back to generator"}</a>
      <span className="legal-eyebrow">{isItalian ? "LEGALE" : isFrench ? "LÉGAL" : isGerman ? "RECHTLICHES" : isDutch ? "JURIDISCH" : isTurkish ? "YASAL" : "LEGAL"}</span>
      <h1>{copy.title}</h1>
      <p className="legal-intro">{copy.intro}</p>
      <div className="legal-sections">
        {copy.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {typeof body === "string" ? <p>{body}</p> : body}
          </section>
        ))}
      </div>
    </article>
  </main>;
}
