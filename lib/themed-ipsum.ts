export type ThemedTheme = "corporate" | "tech" | "ai" | "design" | "fashion" | "zombie";
export type ThemedMode = "layout" | "characters" | "sentences";
export type ThemedLanguage = "en" | "it" | "es";

type ThemeData = {
  openers: string[];
  vocabulary: string[];
  phrases: string[];
  verbs: string[];
};

const terms = (value: string) => value.split(",").map(term => term.trim()).filter(Boolean);

const englishThemedIpsumData: Record<ThemedTheme, ThemeData> = {
  corporate: {
    openers: [
      "Cross-functional executive stakeholders align strategic synergies to optimize scalable deliverables and maximize quarterly ROI across omnichannel touchpoints.",
      "Executive teams align strategic priorities with operational efficiency to unlock sustainable growth and measurable business outcomes.",
      "Enterprise leaders benchmark market opportunities, streamline governance, and accelerate value creation across every workstream.",
      "Agile leadership connects long-term strategy, scalable execution, and performance-driven decision-making across the portfolio.",
    ],
    vocabulary: terms("actionable, agile, alignment, benchmark, benchmarking, bandwidth, blueprint, business, buy-in, capability, competencies, cross-functional, deliverable, deliverables, deep-dive, disruptive, ecosystem, efficiency, enablement, enterprise, executive, execution, framework, frictionless, governance, growth, holistic, impact, initiative, integration, KPI, leadership, leverage, market, milestone, monetization, objective, omnichannel, operations, optimization, outcome, paradigm, performance, pipeline, pivot, portfolio, priority, process, quarterly, roadmap, ROI, scalability, scalable, stakeholder, strategy, strategic, streamline, synergy, target, touchpoint, transformation, value, value-add, vertical, workflow, workstream, best-practice, business-model, core-competency, decision-making, go-to-market, high-level, long-term, market-share, operating-model, performance-driven, revenue-stream, risk-management, strategic-growth, value-creation"),
    phrases: terms("cross-functional stakeholders, strategic alignment, quarterly performance, scalable deliverables, operational efficiency, long-term value, business outcomes, market opportunities, revenue growth, enterprise transformation"),
    verbs: terms("align, accelerate, benchmark, build, deliver, drive, enable, enhance, execute, expand, leverage, maximize, optimize, prioritize, scale, streamline, transform, unlock"),
  },
  tech: {
    openers: [
      "Modern engineering teams deploy distributed microservices across multi-region Kubernetes clusters with automated CI/CD pipelines and observability telemetry.",
      "Cloud-native teams orchestrate event-driven systems through scalable infrastructure, zero-trust security, and high-availability clusters.",
      "Distributed platforms integrate APIs, service meshes, and automated deployment pipelines to maximize throughput and resilience.",
      "Engineering teams provision containerized services across multi-region infrastructure with reliable telemetry, replication, and fault tolerance.",
    ],
    vocabulary: terms("API, authentication, backend, bandwidth, bytecode, cache, CI/CD, cloud, cluster, compiler, container, database, deployment, distributed, Docker, endpoint, event-driven, framework, frontend, gateway, GitOps, GraphQL, infrastructure, integration, interface, Kafka, Kubernetes, latency, load-balancer, logging, microservices, middleware, network, node, OAuth, observability, orchestration, pipeline, Postgres, protocol, pubsub, queue, Redis, replica, REST, runtime, scalability, schema, security, server, serverless, service, sharding, socket, storage, stream, telemetry, token, virtualization, websocket, zero-trust, autoscaling, containerization, datacenter, fault-tolerance, high-availability, multi-region, rate-limit, replication, service-mesh, throughput, versioning, webhook, edge-computing, distributed-system, cloud-native, event-stream, in-memory, network-layer, request-response"),
    phrases: terms("distributed microservices, multi-region infrastructure, automated deployment, cloud-native architecture, event-driven systems, observability telemetry, scalable infrastructure, zero-trust security, service orchestration, high-availability clusters"),
    verbs: terms("authenticate, cache, compile, connect, deploy, distribute, execute, integrate, monitor, orchestrate, persist, provision, replicate, route, scale, stream, sync, validate"),
  },
  ai: {
    openers: [
      "Large language models process multimodal tokens through multi-head attention layers to optimize loss functions and generate contextual embeddings.",
      "AI teams fine-tune foundation models with curated training datasets, reinforcement learning, and rigorous model evaluation.",
      "Multimodal models combine retrieval augmented generation, vector search, and contextual reasoning across complex knowledge bases.",
      "GPU clusters train transformer architectures through gradient descent, checkpoint evaluation, and carefully tuned hyperparameters.",
    ],
    vocabulary: terms("agent, alignment, attention, backpropagation, benchmark, checkpoint, classification, context, context-window, dataset, diffusion, embedding, embeddings, epoch, evaluation, few-shot, fine-tuning, foundation-model, generation, generative, GPU, GPU-cluster, gradient, gradient-descent, hallucination, hyperparameter, inference, instruction-tuning, intelligence, latent-space, LLM, loss, loss-function, machine-learning, model, multimodal, neural-network, optimization, parameter, parameters, pretraining, prompt, prompt-engineering, quantization, RAG, reasoning, reinforcement-learning, RLHF, sampling, semantic, supervised, synthetic-data, token, tokenization, training, transformer, unsupervised, vector, vector-database, weights, zero-shot, agentic, attention-head, contextual, decoder, encoder, fine-tuned, knowledge-base, language-model, model-evaluation, model-training, neural, retrieval, reward-model, sequence, temperature, training-data, vision-model"),
    phrases: terms("large language models, multi-head attention, contextual embeddings, retrieval augmented generation, reinforcement learning, vector search, model inference, training datasets, neural architectures, multimodal models"),
    verbs: terms("classify, embed, evaluate, fine-tune, generate, infer, optimize, predict, pretrain, rank, reason, retrieve, sample, train, tokenize, transform"),
  },
  design: {
    openers: [
      "Product teams compose responsive interfaces through modular components, clear visual hierarchy, and a consistent typographic system.",
      "Design systems align reusable components, accessible interaction patterns, and responsive grids across every screen.",
      "Creative teams refine visual identity through balanced layouts, modular typography, and purposeful whitespace.",
      "Interface designers connect user flows, component states, and visual rhythm through a shared design language.",
    ],
    vocabulary: terms("alignment, art-direction, asset, baseline, brand, brand-system, breakpoint, canvas, component, component-library, composition, concept, consistency, contrast, creative, design-system, design-token, editorial, flow, font, grid, hierarchy, identity, illustration, interaction, interface, iteration, layout, margin, mockup, modular, navigation, palette, pattern, prototype, proportion, responsive, rhythm, spacing, styleguide, symbol, template, typography, UI, UX, visual, visual-identity, visual-language, whitespace, wireframe, accessibility, affordance, balance, color-system, content-hierarchy, design-language, design-process, iconography, interaction-design, interface-design, layout-system, modularity, pixel, responsive-grid, scale, screen, spacing-system, type-scale, user-flow, visual-system, visual-weight, component-state, microinteraction, information-architecture, design-pattern, creative-direction, grid-system, visual-rhythm, brand-guideline"),
    phrases: terms("visual hierarchy, responsive grid, modular components, typographic system, design language, visual identity, interaction pattern, component library, creative direction, consistent interface"),
    verbs: terms("align, compose, design, iterate, prototype, refine, scale, structure, style, test, visualize, balance, organize, adapt"),
  },
  fashion: {
    openers: [
      "Contemporary fashion houses shape seasonal collections through refined silhouettes, tactile materials, and carefully crafted details.",
      "Editorial teams combine modern proportions, textural contrast, and contemporary tailoring across each seasonal look.",
      "The atelier reinterprets heritage craftsmanship through layered materials, structured volume, and a refined monochrome palette.",
      "Runway collections balance draped silhouettes, artisanal construction, and expressive styling for a distinctive wardrobe.",
    ],
    vocabulary: terms("accessory, atelier, bespoke, campaign, capsule, collection, contemporary, craftsmanship, cut, detail, drape, draping, editorial, embroidery, fabric, finish, garment, heritage, knit, knitwear, layering, leather, look, lookbook, material, minimal, outerwear, palette, pattern, proportion, ready-to-wear, runway, season, seasonal, silhouette, styling, tailoring, textile, texture, wardrobe, weave, wool, couture, denim, draped, fit, footwear, form, handcrafted, luxury, monochrome, motif, organic, oversized, refined, satin, sheer, structured, suede, tailored, tonal, volume, accessories, artisan, construction, detailing, fashion-house, finishing, garment-dye, layered, materiality, pleating, seasonality, soft-tailoring, statement, studio, textural, translucent, woven"),
    phrases: terms("seasonal collection, refined silhouette, tactile materials, contemporary tailoring, editorial styling, capsule collection, crafted details, textural contrast, modern proportions, runway collection"),
    verbs: terms("combine, construct, craft, drape, layer, refine, reinterpret, shape, style, tailor, weave, finish"),
  },
  zombie: {
    openers: [
      "The last survivors reinforce the shelter as another zombie horde moves through the abandoned streets beyond the quarantine perimeter.",
      "A radio warning sends the convoy toward an abandoned checkpoint while scavengers gather medicine and emergency supplies.",
      "At nightfall, a containment breach leaves the city in darkness and drives the patrol back to its barricaded safehouse.",
      "From the watchtower, survivors track an undead swarm crossing the ruined cemetery toward the last refuge.",
      "An emergency broadcast marks a new evacuation route through the dead-zone before the infected reach the roadblock.",
      "After the siren fades, a rescue team searches deserted rooftops for a signal from the missing convoy.",
    ],
    vocabulary: terms("zombie, undead, horde, outbreak, survivor, survival, shelter, safehouse, barricade, apocalypse, infection, infected, graveyard, cemetery, abandoned, wasteland, quarantine, bunker, bite, scavenger, ruins, siren, swarm, decay, escape, nightfall, city, refuge, supplies, warning, chaos, patrol, darkness, streets, radio, rescue, contamination, lockdown, deserted, mutation, hazard, perimeter, evacuation, resistance, outbreak-zone, dead-zone, checkpoint, emergency, generator, flashlight, rations, medicine, vehicle, signal, rooftop, basement, fence, watchtower, convoy, roadblock, distress, pursuit, breach, containment"),
    phrases: terms("zombie horde, abandoned city, survival shelter, infected zone, emergency supplies, quarantine perimeter, deserted streets, undead outbreak, last survivors, safehouse barricade, evacuation route, containment breach, abandoned checkpoint, emergency broadcast, survival supplies"),
    verbs: terms("escape, survive, barricade, reinforce, evacuate, scavenge, infect, spread, patrol, search, hide, rescue, contain, breach, flee, defend, secure, signal, warn, advance"),
  },
};

const italianThemedIpsumData: Record<ThemedTheme, ThemeData> = {
  corporate: {
    openers: [
      "I team direzionali allineano priorità strategiche, stakeholder e KPI per trasformare gli obiettivi in risultati misurabili.",
      "La leadership collega roadmap, governance e workflow operativi per sostenere una crescita scalabile e un valore duraturo.",
      "Le organizzazioni definiscono processi trasversali, benchmark di mercato e deliverable chiari lungo ogni iniziativa.",
      "Strategia, execution e collaborazione tra funzioni guidano decisioni rapide, ROI verificabile e continuità operativa.",
    ],
    vocabulary: terms("azione, agile, allineamento, analisi, benchmark, business, capacità, competenze, collaborazione, decisione, deliverable, direzione, ecosistema, efficienza, esecuzione, framework, governance, crescita, impatto, iniziativa, integrazione, KPI, leadership, leva, mercato, milestone, monetizzazione, obiettivo, omnicanale, operatività, ottimizzazione, outcome, paradigma, performance, pipeline, portafoglio, priorità, processo, progetto, trimestre, roadmap, ROI, scalabilità, scalabile, stakeholder, strategia, strategico, target, trasformazione, valore, verticale, workflow, coordinamento, pianificazione, risultato, investimento, risorsa, ricavi, responsabilità, posizionamento, opportunità, sostenibilità, misurazione, fattibilità, go-to-market"),
    phrases: terms("stakeholder cross-funzionali, allineamento strategico, performance trimestrale, deliverable scalabili, efficienza operativa, valore nel lungo periodo, outcome di business, opportunità di mercato, crescita dei ricavi, trasformazione enterprise"),
    verbs: terms("allineare, accelerare, analizzare, costruire, definire, sviluppare, eseguire, espandere, guidare, massimizzare, misurare, ottimizzare, pianificare, prioritizzare, scalare, semplificare, trasformare, valorizzare"),
  },
  tech: {
    openers: [
      "I team di engineering distribuiscono microservizi su cluster Kubernetes multi-region con pipeline CI/CD e telemetria di osservabilità.",
      "Le piattaforme cloud-native integrano API, backend e servizi event-driven per garantire scalabilità, sicurezza e disponibilità.",
      "Architetture distribuite coordinano container, database e sistemi di caching attraverso deployment automatizzati e monitoraggio continuo.",
      "I prodotti software collegano frontend, infrastruttura e workflow di sviluppo con endpoint affidabili e integrazioni verificabili.",
    ],
    vocabulary: terms("API, autenticazione, backend, banda, bytecode, cache, CI/CD, cloud, cluster, compilatore, container, database, deployment, distribuito, Docker, endpoint, event-driven, framework, frontend, gateway, GitOps, GraphQL, infrastruttura, integrazione, interfaccia, Kafka, Kubernetes, latenza, load-balancer, logging, microservizi, middleware, network, nodo, OAuth, osservabilità, orchestrazione, pipeline, Postgres, protocollo, pubsub, queue, Redis, replica, REST, runtime, scalabilità, schema, sicurezza, server, serverless, servizio, sharding, socket, storage, stream, telemetria, token, virtualizzazione, websocket, zero-trust, autoscaling, containerizzazione, datacenter, fault-tolerance, high-availability, multi-region, rate-limit, replication, service-mesh, throughput, versioning, webhook, edge-computing, distributed-system, cloud-native, event-stream, in-memory, network-layer, request-response"),
    phrases: terms("microservizi distribuiti, infrastruttura multi-region, deployment automatizzato, architettura cloud-native, sistemi event-driven, telemetria di osservabilità, infrastruttura scalabile, sicurezza zero-trust, orchestrazione dei servizi, cluster ad alta disponibilità"),
    verbs: terms("autenticare, archiviare, compilare, connettere, distribuire, eseguire, integrare, monitorare, orchestrare, persistere, pubblicare, replicare, instradare, scalare, sincronizzare, validare"),
  },
  ai: {
    openers: [
      "I modelli linguistici di grandi dimensioni elaborano token multimodali attraverso livelli di attenzione per generare embedding contestuali.",
      "I team AI ottimizzano foundation model con dataset curati, fine-tuning, reinforcement learning e valutazioni rigorose.",
      "I modelli multimodali combinano RAG, vector search e ragionamento contestuale su basi di conoscenza complesse.",
      "Cluster GPU addestrano architetture transformer con gradient descent, checkpoint e hyperparameter calibrati.",
    ],
    vocabulary: terms("agente, alignment, attenzione, backpropagation, benchmark, checkpoint, classificazione, contesto, context-window, dataset, diffusione, embedding, epoca, valutazione, few-shot, fine-tuning, foundation-model, generazione, generativo, GPU, GPU-cluster, gradiente, gradient-descent, hallucination, hyperparameter, inferenza, instruction-tuning, intelligenza, latent-space, LLM, loss, loss-function, machine-learning, modello, multimodale, neural-network, ottimizzazione, parametro, pretraining, prompt, prompt-engineering, quantizzazione, RAG, ragionamento, reinforcement-learning, RLHF, sampling, semantico, supervisionato, synthetic-data, token, tokenizzazione, training, transformer, non supervisionato, vector, vector-database, pesi, zero-shot, agentic, attention-head, contestuale, decoder, encoder, fine-tuned, knowledge-base, language-model, model-evaluation, model-training, neural, retrieval, reward-model, sequenza, temperatura, training-data, vision-model"),
    phrases: terms("modelli linguistici di grandi dimensioni, attenzione multi-head, embedding contestuali, retrieval augmented generation, reinforcement learning, vector search, inferenza del modello, dataset di training, architetture neurali, modelli multimodali"),
    verbs: terms("classificare, addestrare, campionare, codificare, embed, fine-tunare, generare, inferire, ottimizzare, predire, preaddestrare, recuperare, ragionare, trasformare, valutare"),
  },
  design: {
    openers: [
      "I team di prodotto compongono interfacce responsive con componenti modulari, gerarchie visive chiare e un sistema tipografico coerente.",
      "I design system allineano componenti riutilizzabili, pattern di interazione accessibili e griglie responsive su ogni schermata.",
      "Le direzioni creative affinano identità visiva, layout bilanciati e tipografia modulare attraverso spaziature intenzionali.",
      "I designer collegano user flow, stati dei componenti e ritmo visivo con un linguaggio di design condiviso.",
    ],
    vocabulary: terms("allineamento, asset, baseline, brand, breakpoint, canvas, componente, composizione, concetto, coerenza, contrasto, creativo, design-system, design-token, editoriale, flow, font, griglia, gerarchia, identità, illustrazione, interazione, interfaccia, iterazione, layout, margine, mockup, modulare, navigazione, palette, pattern, prototipo, proporzione, responsive, ritmo, spaziatura, styleguide, simbolo, template, tipografia, UI, UX, visuale, wireframe, accessibilità, affordance, equilibrio, iconografia, modularità, pixel, scala, schermo, microinterazione, struttura, colore, leggibilità, componente, interfaccia, direzione, linguaggio, sistema, accessibile, usabilità, user-flow, grid, design-system, struttura, proporzione"),
    phrases: terms("gerarchia visiva, griglia responsive, componenti modulari, sistema tipografico, linguaggio di design, identità visiva, pattern di interazione, libreria di componenti, direzione creativa, interfaccia coerente"),
    verbs: terms("adattare, allineare, bilanciare, comporre, definire, disegnare, iterare, organizzare, progettare, prototipare, raffinare, scalare, strutturare, testare, visualizzare"),
  },
  fashion: {
    openers: [
      "Le maison contemporanee costruiscono collezioni stagionali con silhouette raffinate, materiali tattili e dettagli curati.",
      "I team editoriali combinano proporzioni moderne, contrasti materici e tailoring contemporaneo in ogni look di stagione.",
      "L’atelier reinterpreta l’artigianalità attraverso tessuti stratificati, volumi strutturati e una palette monocromatica raffinata.",
      "Le collezioni runway bilanciano silhouette drappeggiate, costruzione artigianale e styling espressivo per un guardaroba distintivo.",
    ],
    vocabulary: terms("accessorio, atelier, bespoke, campagna, capsule, collezione, contemporaneo, artigianalità, taglio, dettaglio, drappeggio, editoriale, ricamo, tessuto, finitura, capo, heritage, maglia, knitwear, layering, pelle, look, lookbook, materiale, minimale, outerwear, palette, pattern, proporzione, ready-to-wear, runway, stagione, stagionale, silhouette, styling, tailoring, texture, guardaroba, trama, lana, couture, denim, drappeggiato, vestibilità, calzatura, forma, artigianale, lusso, monocromatico, motivo, organico, oversize, raffinato, raso, velato, strutturato, camoscio, volume, artigiano, costruzione, finiture, materialità, plissé, studio, traslucido, intreccio, sartoria, accessori, tonalità, collezione, linea, stampa"),
    phrases: terms("collezione stagionale, silhouette raffinata, materiali tattili, tailoring contemporaneo, styling editoriale, capsule collection, dettagli curati, contrasto materico, proporzioni moderne, collezione runway"),
    verbs: terms("abbinare, costruire, creare, definire, drappeggiare, finire, intrecciare, modellare, raffinare, reinterpretare, sartorializzare, stratificare, tessere, valorizzare"),
  },
  zombie: {
    openers: [
      "Gli ultimi sopravvissuti rinforzano il rifugio mentre un’altra orda di zombie attraversa le strade deserte oltre il perimetro di quarantena.",
      "Una trasmissione di emergenza guida il convoglio verso un posto di blocco abbandonato, dove restano medicine e scorte di sopravvivenza.",
      "Quando cala la notte, una breccia nel contenimento costringe la pattuglia a tornare al bunker prima che arrivino i non morti.",
      "Dalla torre di guardia, i sopravvissuti seguono il movimento degli infetti tra le rovine della città abbandonata.",
      "La sirena annuncia una nuova evacuazione mentre il segnale radio indica una via di fuga oltre la zona contaminata.",
      "Un gruppo di soccorso cerca rifornimenti nel seminterrato prima di barricare l’ingresso del rifugio.",
    ],
    vocabulary: terms("zombie, orda, epidemia, sopravvissuti, sopravvivenza, rifugio, barricata, apocalisse, infezione, infetti, cimitero, quarantena, bunker, morso, saccheggiatore, rovine, sirena, sciame, decomposizione, fuga, coprifuoco, notte, rifornimenti, allarme, caos, pattuglia, oscurità, radio, soccorso, contaminazione, lockdown, mutazione, pericolo, perimetro, evacuazione, resistenza, emergenza, torcia, razioni, medicine, veicolo, segnale, tetto, seminterrato, recinzione, convoglio, inseguimento, breccia, contenimento, generatore, soccorritori, superstiti, contagio, isolamento, allerta, riparo, incursione, presidio"),
    phrases: terms("non morti, città abbandonata, zona contaminata, strade deserte, zona morta, posto di blocco, torre di guardia, blocco stradale, segnale di soccorso, orda di zombie, rifugio di sopravvivenza, zona infetta, scorte di emergenza, perimetro di quarantena, epidemia zombie, ultimi sopravvissuti, barricata del rifugio, via di evacuazione, breccia nel contenimento, posto di blocco abbandonato, trasmissione di emergenza, scorte di sopravvivenza"),
    verbs: terms("fuggire, sopravvivere, barricare, rinforzare, evacuare, recuperare, infettare, diffondersi, pattugliare, cercare, nascondersi, salvare, contenere, difendere, mettere in sicurezza, segnalare, avvertire, avanzare"),
  },
};

const spanishThemedIpsumData: Record<ThemedTheme, ThemeData> = {
  corporate: {
    openers: [
      "Los equipos directivos alinean prioridades estratégicas, stakeholders y KPI para convertir los objetivos en resultados medibles.",
      "La dirección conecta roadmap, gobernanza y workflow operativos para sostener un crecimiento escalable y un valor duradero.",
      "Las organizaciones comparan oportunidades de mercado, simplifican procesos y aceleran la creación de valor en cada iniciativa.",
      "La estrategia, la ejecución y la colaboración transversal impulsan decisiones rápidas, ROI verificable y continuidad operativa.",
    ],
    vocabulary: terms("acción, agile, alineación, análisis, benchmark, business, capacidad, competencias, colaboración, decisión, deliverable, dirección, ecosistema, eficiencia, ejecución, framework, gobernanza, crecimiento, impacto, iniciativa, integración, KPI, liderazgo, mercado, milestone, monetización, objetivo, omnicanal, operaciones, optimización, outcome, paradigma, performance, pipeline, prioridades, proceso, proyecto, trimestre, roadmap, ROI, escalabilidad, stakeholder, estrategia, target, transformación, valor, workflow, planificación, resultado, inversión, recursos, posicionamiento, oportunidades, sostenibilidad, medición, go-to-market"),
    phrases: terms("stakeholders transversales, alineación estratégica, rendimiento trimestral, deliverables escalables, eficiencia operativa, valor a largo plazo, resultados de negocio, oportunidades de mercado, crecimiento de ingresos, transformación empresarial"),
    verbs: terms("alinear, acelerar, analizar, construir, definir, desarrollar, ejecutar, expandir, guiar, maximizar, medir, optimizar, planificar, priorizar, escalar, simplificar, transformar, impulsar"),
  },
  tech: {
    openers: [
      "Los equipos de ingeniería despliegan microservicios distribuidos en clusters Kubernetes multi-región con pipelines CI/CD y telemetría de observabilidad.",
      "Las plataformas cloud-native integran API, backend y servicios event-driven para garantizar escalabilidad, seguridad y disponibilidad.",
      "Las arquitecturas distribuidas coordinan contenedores, bases de datos y sistemas de caché mediante deployments automatizados y monitorización continua.",
      "Los productos de software conectan frontend, infraestructura y workflows de desarrollo con endpoints fiables e integraciones verificables.",
    ],
    vocabulary: terms("API, autenticación, backend, ancho-de-banda, bytecode, cache, CI/CD, cloud, cluster, compilador, contenedor, database, deployment, distribuido, Docker, endpoint, event-driven, framework, frontend, gateway, GitOps, GraphQL, infraestructura, integración, interfaz, Kafka, Kubernetes, latencia, load-balancer, logging, microservicios, middleware, network, nodo, OAuth, observabilidad, orquestación, pipeline, Postgres, protocolo, pubsub, queue, Redis, réplica, REST, runtime, escalabilidad, schema, seguridad, server, serverless, servicio, sharding, socket, storage, stream, telemetría, token, virtualización, websocket, zero-trust, autoscaling, datacenter, fault-tolerance, high-availability, multi-region, replication, service-mesh, throughput, versioning, webhook, edge-computing, cloud-native"),
    phrases: terms("microservicios distribuidos, infraestructura multi-región, deployment automatizado, arquitectura cloud-native, sistemas event-driven, telemetría de observabilidad, infraestructura escalable, seguridad zero-trust, orquestación de servicios, clusters de alta disponibilidad"),
    verbs: terms("autenticar, almacenar, compilar, conectar, desplegar, distribuir, ejecutar, integrar, monitorizar, orquestar, persistir, provisionar, replicar, enrutar, escalar, transmitir, sincronizar, validar"),
  },
  ai: {
    openers: [
      "Los modelos de lenguaje de gran tamaño procesan tokens multimodales mediante capas de atención para generar embeddings contextuales.",
      "Los equipos de IA optimizan foundation models con datasets seleccionados, fine-tuning, reinforcement learning y evaluaciones rigurosas.",
      "Los modelos multimodales combinan RAG, vector search y razonamiento contextual sobre bases de conocimiento complejas.",
      "Los clusters GPU entrenan arquitecturas transformer con gradient descent, checkpoints e hiperparámetros calibrados.",
    ],
    vocabulary: terms("agente, alignment, atención, backpropagation, benchmark, checkpoint, clasificación, contexto, context-window, dataset, difusión, embedding, evaluación, few-shot, fine-tuning, foundation-model, generación, generativo, GPU, gradiente, gradient-descent, hallucination, hyperparameter, inferencia, instruction-tuning, inteligencia, latent-space, LLM, loss, machine-learning, modelo, multimodal, neural-network, optimización, parámetro, pretraining, prompt, prompt-engineering, cuantización, RAG, razonamiento, reinforcement-learning, RLHF, sampling, semántica, supervisado, synthetic-data, token, tokenización, training, transformer, vector, vector-database, pesos, zero-shot, agentic, decoder, encoder, knowledge-base, language-model, model-evaluation, retrieval, reward-model, secuencia, temperatura, vision-model"),
    phrases: terms("modelos de lenguaje de gran tamaño, atención multi-head, embeddings contextuales, retrieval augmented generation, reinforcement learning, vector search, inferencia del modelo, datasets de entrenamiento, arquitecturas neuronales, modelos multimodales"),
    verbs: terms("clasificar, entrenar, muestrear, codificar, ajustar, generar, inferir, optimizar, predecir, preentrenar, recuperar, razonar, transformar, evaluar"),
  },
  design: {
    openers: [
      "Los equipos de producto componen interfaces responsive con componentes modulares, jerarquías visuales claras y un sistema tipográfico coherente.",
      "Los design systems alinean componentes reutilizables, patrones de interacción accesibles y retículas responsive en cada pantalla.",
      "Las direcciones creativas refinan la identidad visual mediante layouts equilibrados, tipografía modular y espacios intencionados.",
      "Los diseñadores conectan user flows, estados de componentes y ritmo visual con un lenguaje de diseño compartido.",
    ],
    vocabulary: terms("alineación, asset, baseline, marca, breakpoint, canvas, componente, composición, concepto, coherencia, contraste, creativo, design-system, design-token, editorial, flow, font, grid, jerarquía, identidad, ilustración, interacción, interfaz, iteración, layout, margen, mockup, modular, navegación, paleta, patrón, prototipo, proporción, responsive, ritmo, espaciado, styleguide, símbolo, template, tipografía, UI, UX, wireframe, accesibilidad, equilibrio, iconografía, pixel, escala, pantalla, microinteracción, estructura, legibilidad, usabilidad, user-flow, color-system, visual-system"),
    phrases: terms("jerarquía visual, retícula responsive, componentes modulares, sistema tipográfico, lenguaje de diseño, identidad visual, patrón de interacción, librería de componentes, dirección creativa, interfaz coherente"),
    verbs: terms("adaptar, alinear, equilibrar, componer, definir, diseñar, iterar, organizar, planificar, prototipar, refinar, escalar, estructurar, probar, visualizar"),
  },
  fashion: {
    openers: [
      "Las casas de moda contemporáneas construyen colecciones de temporada con siluetas refinadas, materiales táctiles y detalles cuidados.",
      "Los equipos editoriales combinan proporciones modernas, contrastes de textura y tailoring contemporáneo en cada look de temporada.",
      "El atelier reinterpreta la artesanía mediante tejidos superpuestos, volúmenes estructurados y una paleta monocromática refinada.",
      "Las colecciones runway equilibran siluetas drapeadas, construcción artesanal y styling expresivo para un armario distintivo.",
    ],
    vocabulary: terms("accesorio, atelier, bespoke, campaña, capsule, colección, contemporáneo, artesanía, corte, detalle, drapeado, editorial, bordado, tejido, acabado, prenda, heritage, punto, knitwear, layering, piel, look, lookbook, material, minimalista, outerwear, paleta, pattern, proporción, ready-to-wear, runway, temporada, silueta, styling, tailoring, textura, armario, trama, lana, couture, denim, calzado, forma, lujo, monocromático, motivo, orgánico, oversize, refinado, satén, estructurado, ante, volumen, construcción, plisado, estudio, translúcido, tejido, sastrería, tonalidad, línea, estampado"),
    phrases: terms("colección de temporada, silueta refinada, materiales táctiles, tailoring contemporáneo, styling editorial, colección capsule, detalles cuidados, contraste de texturas, proporciones modernas, colección runway"),
    verbs: terms("combinar, construir, crear, definir, drapear, finalizar, entrelazar, modelar, refinar, reinterpretar, confeccionar, superponer, tejer, realzar"),
  },
  zombie: {
    openers: [
      "Los últimos supervivientes refuerzan el refugio mientras otra horda de zombis atraviesa las calles desiertas más allá del perímetro de cuarentena.",
      "Una transmisión de emergencia guía al convoy hacia un puesto de control abandonado, donde quedan medicinas y suministros de supervivencia.",
      "Al caer la noche, una brecha de contención obliga a la patrulla a regresar al búnker antes de que lleguen los no muertos.",
      "Desde la torre de vigilancia, los supervivientes siguen el movimiento de los infectados entre las ruinas de la ciudad abandonada.",
      "La sirena anuncia una nueva evacuación mientras la señal de radio indica una ruta de escape fuera de la zona contaminada.",
      "Un equipo de rescate busca provisiones en el sótano antes de atrincherar la entrada del refugio.",
    ],
    vocabulary: terms("zombi, horda, brote, supervivientes, supervivencia, refugio, barricada, apocalipsis, infección, infectados, cementerio, cuarentena, búnker, mordedura, saqueador, ruinas, sirena, enjambre, descomposición, escape, noche, suministros, alarma, caos, patrulla, oscuridad, radio, rescate, contaminación, confinamiento, mutación, peligro, perímetro, evacuación, resistencia, emergencia, linterna, raciones, medicinas, vehículo, señal, azotea, sótano, valla, torre, convoy, persecución, brecha, contención, generador, contagio, aislamiento, incursión, puesto, carretera"),
    phrases: terms("no muertos, ciudad abandonada, zona contaminada, calles desiertas, zona muerta, puesto de control, torre de vigilancia, bloqueo de carretera, señal de socorro, horda de zombis, refugio de supervivencia, zona infectada, suministros de emergencia, perímetro de cuarentena, brote zombi, últimos supervivientes, barricada del refugio, ruta de evacuación, brecha de contención, puesto abandonado, transmisión de emergencia, provisiones de supervivencia"),
    verbs: terms("escapar, sobrevivir, atrincherar, reforzar, evacuar, recuperar, infectar, extenderse, patrullar, buscar, esconderse, rescatar, contener, defender, asegurar, señalar, advertir, avanzar"),
  },
};

export const themedIpsumData: Record<ThemedLanguage, Record<ThemedTheme, ThemeData>> = {
  en: englishThemedIpsumData,
  it: italianThemedIpsumData,
  es: spanishThemedIpsumData,
};

type GeneratorOptions = {
  theme: ThemedTheme;
  language?: ThemedLanguage;
  mode: ThemedMode;
  words: number;
  paragraphs: number;
  amount: number;
  variation: number;
};

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomFromSeed(seed: number) {
  let state = seed || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function pick<T>(items: T[], random: () => number) {
  return items[Math.floor(random() * items.length) % items.length];
}

function capitalizeFirst(token: string) {
  return /^[a-z]/.test(token) ? `${token[0].toUpperCase()}${token.slice(1)}` : token;
}

function comparableToken(token: string) {
  return token.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9/-]+$/g, "");
}

function lastComparableToken(value: string) {
  const tokens = value.trim().split(/\s+/);
  return comparableToken(tokens[tokens.length - 1] ?? "");
}

const recentComponentLimit = 12;

function rememberComponent(recentComponents: string[], component: string) {
  recentComponents.push(component.toLocaleLowerCase());
  if (recentComponents.length > recentComponentLimit) recentComponents.shift();
}

function freshCandidates(candidates: string[], recentComponents: string[]) {
  const fresh = candidates.filter(candidate => !recentComponents.includes(candidate.toLocaleLowerCase()));
  return fresh.length > 0 ? fresh : candidates;
}

function rememberOpenerTerms(data: ThemeData, opener: string, recentComponents: string[]) {
  const words = opener.toLocaleLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}/-]*/gu) ?? [];
  const matches: Array<{ end: number; term: string }> = [];
  for (const term of [...data.phrases, ...data.vocabulary, ...data.verbs]) {
    const termWords = term.toLocaleLowerCase().split(/\s+/);
    for (let index = 0; index <= words.length - termWords.length; index += 1) {
      if (termWords.every((word, offset) => words[index + offset] === word)) {
        matches.push({ end: index + termWords.length, term });
      }
    }
  }
  matches.sort((a, b) => a.end - b.end);
  for (const match of matches.slice(-recentComponentLimit)) rememberComponent(recentComponents, match.term);
}

function knownPhraseBoundaries(phrases: string[]) {
  const boundaries: Array<{ before: string[]; after: string[] }> = [];
  for (const phrase of phrases) {
    const words = phrase.toLocaleLowerCase().split(/\s+/);
    for (let split = 1; split < words.length; split += 1) {
      boundaries.push({ before: words.slice(0, split), after: words.slice(split) });
    }
  }
  return boundaries;
}

function splitsKnownPhrase(before: string[], after: string[], boundaries: ReturnType<typeof knownPhraseBoundaries>) {
  return boundaries.some(boundary =>
    boundary.before.every((word, index) => before[before.length - boundary.before.length + index] === word)
    && boundary.after.every((word, index) => after[index] === word)
  );
}

function denseSentence(data: ThemeData, targetWords: number, random: () => number, avoidStartToken = "", recentComponents: string[] = [], includeStandaloneVerbs = true) {
  const components: string[] = [];
  const sentencePhrases = new Set<string>();
  const phraseBoundaries = knownPhraseBoundaries(data.phrases);
  let usedWords = 0;
  let lastToken = avoidStartToken;
  while (usedWords < targetWords) {
    const remaining = targetWords - usedWords;
    const beforeWords = components.length > 0 ? components.join(" ").toLocaleLowerCase().split(/\s+/) : [];
    const phraseCandidates = data.phrases.filter(phrase =>
      wordCount(phrase) <= remaining
      && comparableToken(phrase.split(/\s+/)[0]) !== lastToken
      && !splitsKnownPhrase(beforeWords, phrase.toLocaleLowerCase().split(/\s+/), phraseBoundaries)
    );
    const freshPhrases = phraseCandidates.filter(phrase => {
      const normalized = phrase.toLocaleLowerCase();
      return !sentencePhrases.has(normalized)
        && !recentComponents.some(recent => recent.includes(" ") && (normalized === recent || normalized.includes(recent) || recent.includes(normalized)));
    });
    const usePhrase = remaining > 1 && freshPhrases.length > 0 && random() < .36;
    let component: string;
    if (usePhrase) {
      component = pick(freshPhrases, random);
      sentencePhrases.add(component.toLocaleLowerCase());
    }
    else {
      const singleWords = [...data.vocabulary, ...(includeStandaloneVerbs ? data.verbs : [])].filter(term =>
        !term.includes(" ")
        && comparableToken(term) !== lastToken
        && !splitsKnownPhrase(beforeWords, [term.toLocaleLowerCase()], phraseBoundaries)
      );
      component = pick(freshCandidates(singleWords, recentComponents), random);
    }
    components.push(component);
    usedWords += wordCount(component);
    lastToken = lastComparableToken(component);
    rememberComponent(recentComponents, component);
  }
  components[0] = capitalizeFirst(components[0]);
  if (targetWords >= 10 && components.length > 1) {
    const punctuationWord = Math.min(targetWords - 2, Math.max(3, Math.floor(targetWords * (.35 + random() * .25))));
    let boundaryWords = 0;
    let punctuationIndex = 0;
    let closestDistance = Infinity;
    for (let index = 0; index < components.length - 1; index += 1) {
      boundaryWords += wordCount(components[index]);
      const distance = Math.abs(boundaryWords - punctuationWord);
      const before = components.slice(0, index + 1).join(" ").toLocaleLowerCase().split(/\s+/);
      const after = components.slice(index + 1).join(" ").toLocaleLowerCase().split(/\s+/);
      if (distance < closestDistance && !splitsKnownPhrase(before, after, phraseBoundaries)) {
        closestDistance = distance;
        punctuationIndex = index;
      }
    }
    if (closestDistance < Infinity) {
      components[punctuationIndex] = `${components[punctuationIndex].replace(/[,:;.!?]+$/, "")}${random() < .22 ? ";" : ","}`;
    }
  }
  const lastIndex = components.length - 1;
  components[lastIndex] = `${components[lastIndex].replace(/[,:;.!?]+$/, "")}.`;
  return components.join(" ");
}

function distribute(total: number, count: number, offset: number) {
  const base = Math.floor(total / count);
  const remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (((index + offset) % count) < remainder ? 1 : 0));
}

function sentenceBudgets(total: number, random: () => number) {
  if (total <= 0) return [];
  if (total <= 18) return [total];
  const ideal = 10 + Math.floor(random() * 5);
  let count = Math.max(1, Math.round(total / ideal));
  while (count > 1 && Math.floor(total / count) < 6) count -= 1;
  while (Math.ceil(total / count) > 18) count += 1;
  return distribute(total, count, Math.floor(random() * count));
}

function paragraphForBudget(data: ThemeData, budget: number, random: () => number, avoidStartToken = "", recentComponents: string[] = [], recentOpeners: string[] = [], includeStandaloneVerbs = true) {
  const sentences: string[] = [];
  const fittingOpeners = data.openers.filter(opener => {
    const remaining = budget - wordCount(opener);
    return (remaining === 0 || remaining >= 5) && comparableToken(opener.split(/\s+/)[0]) !== avoidStartToken;
  });
  let remaining = budget;
  let lastToken = avoidStartToken;
  if (fittingOpeners.length > 0) {
    const openersWithoutRecentPhrases = fittingOpeners.filter(opener => !data.phrases.some(phrase =>
      recentComponents.includes(phrase.toLocaleLowerCase()) && opener.toLocaleLowerCase().includes(phrase.toLocaleLowerCase())
    ));
    const opener = pick(freshCandidates(openersWithoutRecentPhrases.length > 0 ? openersWithoutRecentPhrases : fittingOpeners, recentOpeners), random);
    sentences.push(opener);
    rememberComponent(recentOpeners, opener);
    rememberOpenerTerms(data, opener, recentComponents);
    remaining -= wordCount(opener);
    lastToken = lastComparableToken(opener);
  }
  for (const sentenceBudget of sentenceBudgets(remaining, random)) {
    const sentence = denseSentence(data, sentenceBudget, random, lastToken, recentComponents, includeStandaloneVerbs);
    sentences.push(sentence);
    lastToken = lastComparableToken(sentence);
  }
  return sentences.join(" ");
}

function generateLayout(data: ThemeData, words: number, paragraphs: number, random: () => number, includeStandaloneVerbs: boolean) {
  const paragraphCount = Math.max(1, Math.min(paragraphs, words));
  const budgets = distribute(words, paragraphCount, Math.floor(random() * paragraphCount));
  const generated: string[] = [];
  const recentComponents: string[] = [];
  const recentOpeners: string[] = [];
  let lastToken = "";
  for (const budget of budgets) {
    const paragraph = paragraphForBudget(data, budget, random, lastToken, recentComponents, recentOpeners, includeStandaloneVerbs);
    generated.push(paragraph);
    lastToken = lastComparableToken(paragraph);
  }
  return generated.join("\n\n");
}

function generateSentences(data: ThemeData, amount: number, random: () => number, includeStandaloneVerbs: boolean) {
  const generated: string[] = [];
  const recentComponents: string[] = [];
  let lastToken = "";
  for (let index = 0; index < amount; index += 1) {
    const sentence = index === 0 ? pick(data.openers, random) : denseSentence(data, 8 + Math.floor(random() * 11), random, lastToken, recentComponents, includeStandaloneVerbs);
    generated.push(sentence);
    if (index === 0) rememberOpenerTerms(data, sentence, recentComponents);
    lastToken = lastComparableToken(sentence);
  }
  return generated.join(" ");
}

const characterConnectors: Record<ThemedLanguage, string[]> = {
  en: ["a", "an", "and", "as", "by", "for", "in", "of", "on", "or", "to", "with"],
  it: ["a", "e", "o", "di", "da", "in", "su", "per", "con", "tra", "fra", "un", "una", "il", "lo", "la", "i", "gli", "le"],
  es: ["a", "y", "o", "de", "del", "en", "por", "para", "con", "entre", "un", "una", "el", "la", "los", "las"],
};

function exactCharacterTail(data: ThemeData, connectors: string[], amount: number, random: () => number, avoidStartToken = "", recentComponents: string[] = [], includeStandaloneVerbs = true) {
  const thematicComponents = [...data.phrases, ...data.vocabulary, ...(includeStandaloneVerbs ? data.verbs : [])];
  let text = "";
  let lastToken = avoidStartToken;

  while (text.length < amount) {
    const remaining = amount - text.length;
    const separator = text ? 1 : 0;
    const availableComponents = [...thematicComponents, ...connectors].filter(component => {
      const cost = separator + component.length;
      return cost <= remaining;
    });
    const candidatesWithoutRepeat = availableComponents.filter(component => comparableToken(component.split(/\s+/)[0]) !== lastToken);
    const fresh = freshCandidates(candidatesWithoutRepeat.length > 0 ? candidatesWithoutRepeat : availableComponents, recentComponents);
    const withoutRelatedPhrases = fresh.filter(component => {
      const normalized = component.toLocaleLowerCase();
      return !normalized.includes(" ") || !recentComponents.some(recent =>
        recent.includes(" ") && (normalized.includes(recent) || recent.includes(normalized))
      );
    });
    const candidates = withoutRelatedPhrases.length > 0 ? withoutRelatedPhrases : fresh;

    const thematicCandidates = candidates.filter(component => !connectors.includes(component));
    const component = thematicCandidates.length > 0 && (!text || random() < .86)
      ? pick(thematicCandidates, random)
      : pick(candidates, random);
    const spaceAfter = remaining - separator - component.length;

    text += `${text ? " " : ""}${component}`;
    lastToken = lastComparableToken(component);
    rememberComponent(recentComponents, component);
    if (spaceAfter === 1) return `${text}.`;
  }

  return text;
}

function generateCharacters(data: ThemeData, connectors: string[], amount: number, random: () => number, includeStandaloneVerbs: boolean) {
  let text = "";
  let lastToken = "";
  const recentComponents: string[] = [];

  while (true) {
    const sentenceHistory = [...recentComponents];
    const sentence = text
      ? denseSentence(data, 8 + Math.floor(random() * 11), random, lastToken, sentenceHistory, includeStandaloneVerbs)
      : pick(data.openers, random);
    if (!text) rememberOpenerTerms(data, sentence, sentenceHistory);
    const separator = text ? 1 : 0;
    const remaining = amount - text.length - separator - sentence.length;
    if (remaining < 0 || remaining === 1 || (remaining > 0 && remaining < 32)) break;
    text += `${text ? " " : ""}${sentence}`;
    recentComponents.splice(0, recentComponents.length, ...sentenceHistory);
    lastToken = lastComparableToken(sentence);
    if (remaining === 0) return text;
  }

  const tailLength = amount - text.length - (text ? 1 : 0);
  const tail = exactCharacterTail(data, connectors, tailLength, random, lastToken, recentComponents, includeStandaloneVerbs);
  return `${text}${text ? " " : ""}${tail}`;
}

export function generateThemedIpsum({ theme, language = "en", mode, words, paragraphs, amount, variation }: GeneratorOptions) {
  const data = themedIpsumData[language][theme];
  const includeStandaloneVerbs = language !== "it";
  const seed = hashSeed(`${language}:${theme}:${mode}:${words}:${paragraphs}:${amount}:${variation}`);
  const random = randomFromSeed(seed);
  if (mode === "layout") return generateLayout(data, words, paragraphs, random, includeStandaloneVerbs);
  if (mode === "sentences") return generateSentences(data, amount, random, includeStandaloneVerbs);
  return generateCharacters(data, characterConnectors[language], amount, random, includeStandaloneVerbs);
}
