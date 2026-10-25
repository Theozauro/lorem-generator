import { EditorialSection, EditorialTable } from "@/components/homepage/italian-editorial";
import styles from "./languages-generator.module.css";

const faqItems = [
  ["Asya Ipsum hangi dillerde metin oluşturur?", "Japonca, Basitleştirilmiş Çince, Geleneksel Çince ve Korece seçenekleri arasından seçim yapabilirsiniz."],
  ["Japonca ve Çince metinlerde neden boşluk yok?", "Bu dillerde sözcükler genellikle boşluklarla ayrılmaz. Metne fazladan boşluk eklemek, satır kırılmalarını ve metin yoğunluğunu gerçeğinden farklı gösterebilir."],
  ["Basitleştirilmiş ve Geleneksel Çince arasındaki fark nedir?", "İki yazı biçimi farklı Han karakterleri kullanır. Arayüzünüzü her iki biçimde de ayrı ayrı test edebilirsiniz."],
  ["Korece metinlerde boşluk kullanılır mı?", "Evet. Günümüz Korecesinde sözcük grupları genellikle boşlukla ayrılır; bu da dar alanlardaki satır uzunluklarını etkiler."],
  ["Sözcük sayımı seçilen dile göre değişir mi?", "Evet. Her dil kendi sayım yöntemini kullanır. Japonca gibi boşlukla ayrılmayan dillerde tarayıcının dil segmentasyonu kullanılır."],
  ["Oluşturulan metni çeviri olarak kullanabilir miyim?", "Hayır. Metin, çok dilli arayüzlerin ve mizanpajların görsel davranışını test etmek içindir; çeviri veya yayımlanacak içerik yerine geçmez."],
] as const;

export function TurkishLanguagesEditorial() {
  return <>
    <EditorialSection id="languages-layout" eyebrow="ÇOK DİLLİ ARAYÜZLER" title="Farklı yazı sistemlerinde mizanpajı test edin" split>
      <p>Japonca, Çince ve Korece metinler; içerik yoğunluğunu, satır kırılmalarını ve bileşenlerin ihtiyaç duyduğu alanı değiştirebilir. Gerçek metin hazır olmadan önce kartları, menüleri, düğmeleri ve uzun içerik bloklarını seçtiğiniz dilde sınayabilirsiniz.</p>
      <p>Metin uzunluğunu ve paragraf sayısını ayrı ayrı belirleyerek arayüzün farklı içerik biçimlerine nasıl uyum sağladığını görebilirsiniz. Bu yaklaşım, çok dilli tasarım ve yerelleştirme çalışmalarında düzen kararlarını değerlendirmeyi kolaylaştırır.</p>
    </EditorialSection>
    <EditorialSection id="languages-scripts" eyebrow="YAZI SİSTEMLERİ" title="Japonca, Çince ve Korece metinle çalışmak" split>
      <EditorialTable label="Diller ve arayüz testlerinde dikkat edilecek noktalar" compact headers={["Dil", "Yazı sistemi", "Boşluklar", "Kontrol noktaları"]} rows={[
        ["Japonca", "Kanji, hiragana ve katakana", "Genellikle kullanılmaz", "Satır kırılması, noktalama ve metin yoğunluğu"],
        ["Basitleştirilmiş Çince", "Basitleştirilmiş Han karakterleri", "Genellikle kullanılmaz", "Karakter genişliği, noktalama ve karma metin"],
        ["Geleneksel Çince", "Geleneksel Han karakterleri", "Genellikle kullanılmaz", "Yoğunluk, bölgesel yazım ve satır kırılması"],
        ["Korece", "Hangıl; gerektiğinde Hanja veya Latin harfleri", "Kullanılır", "Sözcük aralıkları ve satır uzunluğu"],
      ]} />
    </EditorialSection>
    <EditorialSection id="languages-checklist" eyebrow="ARAYÜZ KONTROLÜ" title="Çok dilli mizanpajda nelere bakılmalı?" split>
      <ul className={styles.checklist}>
        <li>Japonca ve Çince metinlere elle boşluk eklemeyin.</li>
        <li>Yalnızca uzun paragrafları değil; düğmeleri, kartları ve menüleri de kontrol edin.</li>
        <li>Dar ekranlarda satır kırılmalarını ve metin taşmasını inceleyin.</li>
        <li>Noktalamanın, satır yüksekliğinin ve aralıkların tutarlı olduğundan emin olun.</li>
        <li>Her metin için doğru HTML <code>lang</code> değerini kullanın.</li>
        <li>Oluşturulan metni test içeriği olarak kullanın; yayımdan önce gerçek içerikle değiştirin.</li>
      </ul>
    </EditorialSection>
    <EditorialSection id="languages-modes" eyebrow="MİKTAR VE BİÇİM" title="Kelimeler, karakterler veya cümleler — ayrıca paragraf sayısını seçin." split>
      <EditorialTable label="Oluşturma modları" compact headers={["Mod", "Kullanım"]} rows={[
        ["Kelimeler", "Açıklamalar, uzun içerikler ve birden fazla metin bloğu için."],
        ["Karakterler", "Karakter sınırı bulunan kartlar, önizlemeler ve alanlar için."],
        ["Cümleler", "Kısa açıklamalar, iletiler, formlar ve özet metinler için."],
      ]} />
      <p>Paragraf sayısını her modda ayrı seçebilirsiniz. Japonca gibi boşlukların sözcük sınırını göstermediği dillerde sayım, dile uygun segmentasyona dayanır.</p>
    </EditorialSection>
    <section className="faq-section" aria-labelledby="languages-faq-title">
      <div className="faq-heading"><span className="eyebrow">SIK SORULAN SORULAR</span><h2 id="languages-faq-title">Asya Ipsum hakkında</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
