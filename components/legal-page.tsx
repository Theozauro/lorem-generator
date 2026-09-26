type LegalKind = "privacy" | "cookies";
type LegalLanguage = "en" | "it" | "es" | "fr" | "de" | "pt-BR" | "nl-NL" | "tr";

const content = {
  en: {
    privacy: {
      title: "Privacy Policy",
      intro: "This policy describes the current privacy behaviour of lorem-generator.com.",
      sections: [
        ["Text generation", "Lorem Ipsum generation runs locally in your browser. Generated text and text entered into the on-page tools are not sent to the site’s application server."],
        ["Preferences", "Your colour theme preference and privacy preference can be stored locally in your browser so the interface can remember those choices."],
        ["Hosting and security", "lorem-generator.com is delivered using Cloudflare infrastructure. Cloudflare may process limited technical information needed to deliver, secure, and operate the website, including IP address, request information, and security-related data, according to its own privacy terms."],
        ["Changes", "The site does not currently enable analytics, advertising, AdSense, or other non-essential third-party tracking services. This policy will be updated before a new data-processing service is enabled."]
      ]
    },
    cookies: {
      title: "Cookie Policy",
      intro: "This policy explains the current use of cookies and browser storage on lorem-generator.com.",
      sections: [
        ["Cookies", "The site does not currently use analytics, advertising, or other non-essential cookies."],
        ["Local storage", "Local storage is not a cookie. The interface may use it to remember your colour theme preference and your saved privacy preference on this device."],
        ["Optional services", "Analytics, advertising, and AdSense are not currently enabled. If any of these services are added, the consent controls and this policy will be updated before they are activated."],
        ["Managing storage", "You can clear local storage through your browser settings. This resets saved theme and privacy preferences."]
      ]
    }
  },
  it: {
    privacy: {
      title: "Informativa privacy",
      intro: "Questa informativa descrive il comportamento attuale di lorem-generator.com in materia di privacy.",
      sections: [
        ["Generazione del testo", "La generazione di Lorem Ipsum avviene localmente nel browser. Il testo generato e quello inserito negli strumenti della pagina non vengono inviati al server applicativo del sito."],
        ["Preferenze", "La preferenza del tema colore e la preferenza sulla privacy possono essere salvate localmente nel browser per permettere all’interfaccia di ricordare tali scelte."],
        ["Hosting e sicurezza", "lorem-generator.com viene distribuito tramite l’infrastruttura Cloudflare. Cloudflare può trattare informazioni tecniche limitate necessarie a distribuire, proteggere e gestire il sito, quali indirizzo IP, informazioni sulla richiesta e dati relativi alla sicurezza, secondo la propria informativa sulla privacy."],
        ["Modifiche", "Il sito non abilita attualmente analytics, pubblicità, AdSense o altri servizi di tracciamento non essenziali di terze parti. Questa informativa verrà aggiornata prima di attivare un nuovo servizio che comporti il trattamento di dati."]
      ]
    },
    cookies: {
      title: "Informativa sui cookie",
      intro: "Questa informativa spiega l’uso attuale dei cookie e della memoria del browser su lorem-generator.com.",
      sections: [
        ["Cookie", "Il sito non utilizza attualmente cookie per analytics, pubblicitari o altri cookie non essenziali."],
        ["Memoria locale", "La memoria locale non è un cookie. L’interfaccia può usarla per ricordare la preferenza del tema colore e la preferenza sulla privacy salvata su questo dispositivo."],
        ["Servizi opzionali", "Analytics, pubblicità e AdSense non sono attivi. Se uno di questi servizi verrà aggiunto, i controlli del consenso e questa informativa saranno aggiornati prima dell’attivazione."],
        ["Gestione della memoria", "Puoi cancellare la memoria locale dalle impostazioni del browser. Così verranno reimpostate le preferenze di tema e privacy salvate."]
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
        {copy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      </div>
    </article>
  </main>;
}
