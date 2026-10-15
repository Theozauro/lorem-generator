import { EditorialSection, EditorialTable } from "./italian-editorial";

const faqItems = [
  ["Lorem Ipsum ile tematik Ipsum arasındaki fark nedir?", "Geleneksel Lorem Ipsum nötr, sözde Latince metin kullanır. Tematik Ipsum ise belirli bir sektör veya bağlamla ilişkili kelime ve ifadeler içeren yer tutucu metinler üretir."],
  ["Metin dilini seçebilir miyim?", "Evet. Türkçe sayfada aynı tema ve modu koruyarak Türkçe veya İngilizce tematik Ipsum oluşturabilirsiniz."],
  ["İstediğim miktarda metni tam olarak oluşturabilir miyim?", "Evet. Kelime ve paragraf sayısını, cümle sayısını veya tam karakter sayısını belirleyebilirsiniz."],
  ["Tematik yer tutucu metin ne işe yarar?", "Özellikle projeye özgü terimlerin mizanpajın görünümünü etkilediği durumlarda daha gerçekçi mockup ve prototipler hazırlamanıza yardımcı olur."],
  ["Tematik metinler nihai içerik olarak kullanılabilir mi?", "Hayır. Tasarım, test ve prototipleme sırasında geçici içerik olarak kullanılmalı, daha sonra gerçek metinle değiştirilmelidir."],
];

export function TurkishThemedEditorial() {
  return <>
    <EditorialSection id="turkish-themed-explanation" eyebrow="BAĞLAMA UYGUN YER TUTUCU METİN" title="Tematik Ipsum nedir?" split>
      <p>Tematik Ipsum, belirli bir sektör veya bağlam etrafında oluşturulan yer tutucu metindir. Geleneksel Lorem Ipsum ile aynı temel amacı taşır; ancak teknoloji, yapay zekâ, tasarım, moda veya iş dünyası gibi alanlara ait kelimeler, ifadeler ve cümleler kullanır.</p>
      <p>Klasik sözde Latince metnin projede yer alacak gerçek içeriği yeterince iyi yansıtmadığı durumlarda kullanışlıdır. Bir SaaS ürününün arayüz taslağı, yapay zekâ odaklı bir açılış sayfası veya moda ürün kataloğu, son içerikte kullanılacak dile yakın terimlerle daha gerçekçi görünür.</p>
    </EditorialSection>
    <EditorialSection id="turkish-themed-comparison" eyebrow="KLASİK Mİ TEMATİK Mİ" title="Klasik Lorem Ipsum mu, tematik Ipsum mu?" split>
      <EditorialTable label="Klasik Lorem Ipsum ile tematik Ipsum karşılaştırması" compact headers={["Klasik Lorem Ipsum", "Tematik Ipsum"]} rows={[
        ["Nötr, sözde Latince metin", "Belirli bir bağlamla ilişkili metin"],
        ["Kompozisyonu ve boşlukları denemek için ideal", "Daha gerçekçi arayüz taslakları için kullanışlı"],
        ["Belirli bir sektöre gönderme yapmaz", "Kurumsal, Teknoloji, Yapay Zekâ, Tasarım, Moda veya Zombi terminolojisini kullanır"],
        ["Genel testler için uygundur", "Bağlama özgü prototipler için daha uygundur"],
      ]} />
      <p>Her iki yöntem de bir mizanpajı test etmek için kullanılır. Aralarındaki fark gerçekçilik düzeyidir: klasik Lorem Ipsum içeriği nötr tutarken tematik Ipsum, nihai projede yer alabilecek dili daha iyi taklit eder.</p>
    </EditorialSection>
    <EditorialSection id="turkish-themed-quantity" eyebrow="ÖNERİLEN MİKTARLAR" title="Ne kadar tematik metin oluşturmalısınız?" split>
      <EditorialTable label="Kullanım alanına göre önerilen tematik metin miktarı" compact headers={["Kullanım alanı", "Önerilen miktar"]} rows={[
        ["Arayüz kartı", "100–150 karakter"], ["Hero veya tanıtım metni", "150–250 karakter"],
        ["Ürün modülü", "50–100 kelime"], ["Landing page bölümü", "2–3 paragraf"],
        ["Editoryal mockup", "3–5 paragraf"], ["Uzun içerik prototipi", "250+ kelime"],
      ]} />
    </EditorialSection>
    <section className="faq-section" aria-labelledby="turkish-themed-faq-title">
      <div className="faq-heading"><span className="eyebrow">TEMATİK IPSUM HAKKINDA SORULAR</span><h2 id="turkish-themed-faq-title">Tematik Ipsum hakkında SSS</h2></div>
      <div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
  </>;
}
