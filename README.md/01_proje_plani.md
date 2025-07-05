## 📘 TEKNİK GÖREV DOKÜMANI — GBT KURSOR PROJESİ (v1.0)

### 🎯 GENEL HEDEF

Bu sistemin amacı, potansiyel müşterilerin web sitesi altyapılarını, hızlarını, ticaret potansiyellerini ve müşteri yanıtlarını analiz ederek **sıcak lead'leri otomatik olarak belirlemek**, satışa uygun olanları ayırmak ve satış ekibinin işini kolaylaştıracak bir otomasyon altyapısı sunmaktır.

---

### 📂 1. VERİ ANALİZİ MODÜLÜ

#### ✅ 1.1 CMS Tespiti

- Web sitesinin CMS altyapısını (örn. WordPress, Ideasoft, Shopify, özel yazılım) otomatik tespit eder.
- Hedef: Google Apps Script ile tam uyumlu ve **en hızlı çalışan sistem** tercih edilir.
- Yanında "CMS Grubu" sütunu eklenir. Örn: "Açık kaynak", "E-ticaret hazır", "Eksik yapı" gibi.

#### ✅ 1.2 Site Hızı

- Siteye giriş esnasında **yüklenme süresine** göre skor verilir.
- Eğer mümkünse ayrıca Google PageSpeed veya benzeri servislerle entegre kontrol yapılabilir.
- Hedef: Hızlı ve az API maliyetli çözüm.

#### ✅ 1.3 Trafik Verisi

- SimilarWeb veya benzeri sistemlerden alınabilir.
- Trafik yüksekse daha az potansiyel, düşükse daha çok potansiyel puanı verilir.

#### ✅ 1.4 E-Ticaret Belirtileri

- Sayfada "Satın Al", "Sepet", "Ürünler" gibi kelimeler aranarak **e-ticaret varlığı** tespit edilir.
- Varsa: sıcak lead, yoksa: düşük potansiyel.

#### ✅ 1.5 Yapay Zekâ Yorumları

- Tespit edilen verilere göre: yorum + satış yönlendirmesi + puan otomatik verilir.
- Örn: "Siteniz WordPress ile yapılmış ancak e-ticaret için uygun değil olabilir. Size özel çözümler sunabiliriz."

#### ✅ 1.6 Puanlama Sistemi

- Her analiz için şu skorlar hesaplanır:
  - `CMS Puanı`
  - `Hız Puanı`
  - `Trafik Puanı`
  - `Rating / Review Puanı`
- Bunlar birleşerek `Genel Puan` oluşturur → sıcaklık tespiti için temel alınır.

#### ✅ 1.7 Görsel İnceleme (Opsiyonel)

- MapLink varsa, sistem mağazanın harita fotoğraflarına bakar (eğer API varsa).
- Görseldeki kaliteye göre skor verebilir.

---

### 📞 2. MÜŞTERİ YANITI TAKİBİ MODÜLÜ

#### ✅ 2.1 Açılır Menü

- "Müşteri Yanıtı" sütununda şu seçenekler olacak:
  - Ulaşılamadı
  - İlgilenmiyor
  - Bilgi Verildi
  - Yeniden Aranacak
  - İleri Tarih Randevu
  - Randevu Alındı

#### ✅ 2.2 Otomatik Yönlendirme

- Eğer yanıt şu ise:
  - `Bilgi Verildi / Yeniden Aranacak / İleri Tarih Randevu` → satır otomatik `FIRSATLARIM` sayfasına kopyalanır.
  - `Randevu Alındı` → randevu formu açılır.

#### ✅ 2.3 Günlük Raporlar

- Her temsilcinin `RAPORLARIM` sayfasında:
  - Günlük kaç kişi arandı, kimden ne yanıt alındı
  - Otomatik tablo oluşur.
- Aynı veriler yöneticinin dosyasındaki `RAPORLAR` sayfasına gider (tüm çalışanlar birleşik).

#### ✅ 2.4 Fırsatlar Takibi

- `FIRSATLARIM` sayfası: sadece o temsilcinin sıcak lead’lerini tutar.
- Yöneticinin ortak dosyasında da `FIRSATLAR` sayfasında birleşir.

---

### 📅 3. RANDEVU MODÜLÜ

#### ✅ 3.1 Randevu Formu

- Temsilci, "Randevu Alındı" seçince özel form açılır.
- Form orta ekranda, sade & şık şekilde açılır. (React veya HTML destekli olabilir.)
- Formdaki bazı bilgiler otomatik gelir:
  - `Firma Adı`, `Telefon`, `MapLink`, `Keyword`, `Konum`, `Website` vs.
- Diğerleri manuel girilir: `Müşteri Adı`, `Not`, `Randevu Saati`

#### ✅ 3.2 Otomatik Yönlendirme

- Form tamamlandığında:
  - Satır temsilcinin `RANDEVULARIM` sayfasına gider.
  - Aynı anda yöneticinin `RANDEVULAR` sayfasına da eklenir.

#### ✅ 3.3 Randevu Saati Uygunluğu

- Seçilecek saatler sistemdeki `RANDEVULAR` sayfasıyla çakışmayacak şekilde filtrelenir.
- 1.5 saat aralıklarla.

---

### 📁 4. DOSYA VE KLASÖR YAPISI

```
GBT KURSOR
├── assets
│   ├── logo.png
│   └── notlar.txt
├── 01_proje_plani.md     ← Teknik doküman
├── 02_database.md        ← DB yapısı
├── 03_backend.js         ← Backend fonksiyonlar
├── 04_ui_logic.js        ← UI tetikleyici fonksiyonlar
```

- Her şey yerel diskte ve Kursor ortamında yedeklenmiş olur.
- Chat'e erişim verdiğinde, projedeki tüm dosyaları kullanabilir.

---

### ❓ EK NOTLAR

- Tüm metinler Türkçe olacak.
- Chat’in sistemle bağlanabilmesi için ilgili markdown veya js dosyalarına erişimi olmalı.
- Kod yazımı ve tasarım sade, hızlı ve fonksiyonel olacak.

---

Hazırsan bu teknik görev dökümanını projene kaydedebiliriz. Sonraki adım: İlk işlevi başlatmak (örneğin CMS Analizi).

