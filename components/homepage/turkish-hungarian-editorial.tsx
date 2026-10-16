import { EditorialSection, EditorialTable } from "./italian-editorial";
import styles from "./italian-editorial.module.css";

export const turkishHomepageFaqItems: [string, string][] = [
  ["Lorem Ipsum gerçekten bir anlam taşıyor mu?", "Modern Lorem Ipsum klasik Latinceden türetilmiştir, ancak metin zaman içinde değiştirilmiş ve yeniden düzenlenmiştir. Bu nedenle doğal bir dile benzer görünür, fakat tutarlı bir anlam oluşturmaz."],
  ["Lorem Ipsum, dummy text ve placeholder text arasındaki fark nedir?", "Dummy text ve placeholder text, bir düzen içinde geçici olarak kullanılan metinler için genel terimlerdir. Lorem Ipsum ise en yaygın yer tutucu metin biçimlerinden biridir."],
];

export const hungarianHomepageFaqItems: [string, string][] = [
  ["Van valódi jelentése a Lorem Ipsumnak?", "A modern Lorem Ipsum klasszikus latin szövegekből ered, de az idők során módosították és átrendezték. Ezért természetes nyelvhez hasonlóan néz ki, miközben nem alkot összefüggő jelentést."],
  ["Mi a különbség a Lorem Ipsum, a dummy text és a placeholder text között?", "A dummy text és a placeholder text általános kifejezések a layoutban ideiglenesen használt szövegre. A Lorem Ipsum ennek egyik legismertebb formája."],
];

export function TurkishHomepageEditorial() {
  return <>
    <EditorialSection id="turkish-quantity-guide" eyebrow="HIZLI REHBER" title="Ne kadar Lorem Ipsum kullanmalısınız?" split>
      <p>Doğru yer tutucu metin miktarı, tasarladığınız bileşene bağlıdır. Bir kart veya hero alt başlığı için birkaç satır yeterli olabilirken, editoryal bir sayfada ritmi, boşlukları ve uzun içeriklerde düzenin nasıl davrandığını test etmek için birkaç paragrafa ihtiyaç duyulur.</p>
      <EditorialTable label="Kullanım alanına göre önerilen Lorem Ipsum miktarları" compact headers={["Kullanım alanı", "Önerilen miktar", "Mod"]} rows={[
        ["Mikro metin veya kısa açıklama", "100–150 karakter", "Karakter"], ["Hero alt başlığı", "150–250 karakter", "Karakter"],
        ["Ürün veya hizmet kartı", "50–80 kelime", "Kelime"], ["Açıklama bloğu", "yaklaşık 100 kelime", "Kelime"],
        ["Makale önizlemesi", "150–250 kelime", "Kelime"], ["Editoryal bölüm", "3–5 paragraf", "Kelime + paragraf"],
        ["Uzun içerik düzeni", "5–8 paragraf", "Kelime + paragraf"],
      ]} />
      <p>Bu değerler katı kurallar değildir. Gerçekçi içerik uzunluklarını simüle etmek için pratik bir başlangıç noktası olarak kullanın. Belirli bir sınırı test etmeniz gerekiyorsa Karakter modunu kullanın veya doğrudan ihtiyaç duyduğunuz kelime sayısını girin.</p>
    </EditorialSection>
    <EditorialSection id="turkish-content-testing" eyebrow="İÇERİĞİ TEST ETME" title="Lorem Ipsum ne zaman kullanılmalı, gerçek içerik ne zaman gerekli?" split>
      <p>Lorem Ipsum, nihai metne bağlı kalmadan yapı, tipografi, içerik yoğunluğu ve bileşen davranışını değerlendirmek istediğiniz tasarımın erken aşamalarında özellikle kullanışlıdır.</p>
      <div className={styles.listGrid}>
        <div><h3>Yer tutucu metni şu durumlarda kullanın:</h3><ul><li>wireframe ve prototipler;</li><li>responsive testler;</li><li>kartlar, modüller ve dashboard’lar;</li><li>editoryal düzenler;</li><li>farklı içerik uzunluklarını karşılaştırmak.</li></ul></div>
        <div><h3>Şunları değerlendirmek istediğinizde gerçek içeriğe geçin:</h3><ul><li>marka ve iletişim tonu;</li><li>anlaşılabilirlik;</li><li>nihai editoryal hiyerarşi;</li><li>isim, CTA ve mesajların gerçek uzunlukları;</li><li>erişilebilirlik ve nihai kullanıcı deneyiminin kalitesi.</li></ul></div>
      </div>
      <p>Lorem Ipsum en iyi geçici bir tasarım aracı olarak çalışır: kabı ve düzeni doğrulamaya yardımcı olur; bitmiş ürünü değerlendirmek için ise gerçek içerik gerekir.</p>
    </EditorialSection>
  </>;
}

export function HungarianHomepageEditorial() {
  return <>
    <EditorialSection id="hungarian-quantity-guide" eyebrow="GYORS ÚTMUTATÓ" title="Mennyi Lorem Ipsumot érdemes használni?" split>
      <p>A megfelelő helykitöltő szövegmennyiség attól függ, milyen elemet tervezel. Egy kártyához vagy hero alcímhez gyakran néhány sor is elég, míg egy szerkesztőségi oldalhoz több bekezdésre van szükség a ritmus, a térközök és a hosszabb tartalom melletti layout-viselkedés teszteléséhez.</p>
      <EditorialTable label="A felhasználáshoz ajánlott Lorem Ipsum-mennyiségek" compact headers={["Felhasználás", "Ajánlott mennyiség", "Mód"]} rows={[
        ["Microcopy vagy rövid képaláírás", "100–150 karakter", "Karakter"], ["Hero alcím", "150–250 karakter", "Karakter"],
        ["Termék- vagy szolgáltatáskártya", "50–80 szó", "Szavak"], ["Leíró blokk", "körülbelül 100 szó", "Szavak"],
        ["Cikkelőnézet", "150–250 szó", "Szavak"], ["Szerkesztőségi szakasz", "3–5 bekezdés", "Szavak + bekezdések"],
        ["Hosszú formátumú layout", "5–8 bekezdés", "Szavak + bekezdések"],
      ]} />
      <p>Ezek az értékek nem szigorú szabályok. Használd őket gyakorlati kiindulópontként valósághű tartalomhosszak szimulálásához. Ha pontos korlátot szeretnél tesztelni, válts Karakter módra, vagy add meg közvetlenül a szükséges szavak számát.</p>
    </EditorialSection>
    <EditorialSection id="hungarian-content-testing" eyebrow="TARTALOMTESZTELÉS" title="Mikor használj Lorem Ipsumot, és mikor valódi szöveget?" split>
      <p>A Lorem Ipsum különösen a tervezés korai szakaszaiban hasznos, amikor a struktúrát, a tipográfiát, a tartalomsűrűséget és a komponensek viselkedését szeretnéd értékelni anélkül, hogy a végleges szövegre támaszkodnál.</p>
      <div className={styles.listGrid}>
        <div><h3>Használj helykitöltő szöveget:</h3><ul><li>wireframe-ekhez és prototípusokhoz;</li><li>reszponzív tesztekhez;</li><li>kártyákhoz, modulokhoz és dashboardokhoz;</li><li>szerkesztőségi layouthoz;</li><li>különböző tartalomhosszak összehasonlításához.</li></ul></div>
        <div><h3>Válts valódi tartalomra, amikor ezeket szeretnéd értékelni:</h3><ul><li>hangnem;</li><li>érthetőség;</li><li>végleges szerkesztőségi hierarchia;</li><li>nevek, CTA-k és üzenetek valós hossza;</li><li>hozzáférhetőség és a végső felhasználói élmény minősége.</li></ul></div>
      </div>
      <p>A Lorem Ipsum ideiglenes tervezési eszközként működik a legjobban: segít ellenőrizni a konténert és a layoutot, míg a kész termék értékeléséhez valódi szövegre van szükség.</p>
    </EditorialSection>
  </>;
}
