# DigiFirst CRM v2.9 – Tüm Sistem + Gelecek Planı

Bu sistem, satış temsilcilerinin Google Sheets üzerinde müşteri aramalarını profesyonelce takip etmesi için hazırlanmıştır. 

Amaç: ✅ Arama → ✅ Randevu → ✅ Takip → ✅ Satış sürecini uçtan uca yönetmek.

---

## 1. 🧱 Format Tablo
Dışarıdan gelen karışık tabloyu düzenler, gereksiz sütunları siler, eksik olanları ekler, sütunları doğru sıraya koyar (Keyword, Location, Firma, …).

**KURSOR SORU:** Dışarıdan gelen tabloların formatı çok değişken mi, yoksa genelde benzer mi?
**Ferit cevap:** hep aynı. dışarıdan gelen hep aynı değiştireceğimiz formatta hep aynı belki ileride bir kaç sütun ekleriz ama şimdilik hep aynı kalacak.

**KURSOR SORU:** Eğer ileride yeni sütunlar eklenirse, eski verilerle uyumluluk önemli mi? Yani eski dosyalar yeni şablona otomatik uyum sağlasın ister misin?
**Ferit cevap:** evet kesinlikle

**KURSOR ÖNERİ:** Otomatik sütun eşleştirme ve eksik alan uyarısı eklemek, veri girişinde büyük kolaylık sağlar.
**Ferit cevap:** sen nasıl dersen

**Kullanım Notu:**
- Kodun sadece yukarıda işaretli kısmını kopyalayıp Apps Script'e ekle ve kaydet.
- Sayfanı yeniden yükle, menüde "Tabloyu Güncelle" başlığını göreceksin.
- "Yeni Sheet'te Formatla" ile yeni bir sheet'e, "Mevcut Sheet'i Formatla" ile aktif sheet'te formatlama yapabilirsin.
- Mevcut sheet'te çalışırken veri kaybı olmaması için önce yedek almanı öneririm.

---

## KONUŞMA – SORU-CEVAP – UZLAŞMA-KOD

- Otomatik doldurulan alanlar: Keyword, Location, Firma, Telefon, MapLink, Adres, Pincode  
- Manuel giriş: Müşteri İsmi, Tarih, Saat (dropdown, 90 dk aralık), Randevu Formatı  
- Müşteri ismi daha önce listede varsa, tam eşleşmeyle otomatik doldurulur.  
- Tarih ve saat için Google'ın kendi date picker ve saat dropdown'u kullanılır.  
- Randevu kaydı sonrası satır yeşile boyanır.  
- Kayıtlar istenirse "RANDEVULARIM" ve "RANDEVULAR" sayfalarına da kopyalanabilir.  
- Randevu sonrası aktiviteler (Toplantı Sonucu, Teklif Detayı, Satış Potansiyeli, Yeni Takip Tarihi) eklenebilir, istersen bu modülde veya bir sonraki modülde ekleyebiliriz.

**KURSOR SORULARI:**  
1. Randevu formunda başka otomatik doldurulmasını istediğin alan var mı?   hayır
2. Randevu kaydı "RANDEVULARIM" ve "RANDEVULAR" sayfalarına otomatik kopyalansın mı, yoksa bu isteğe bağlı mı olsun? otomatik kopyalana bilir 
3. Randevu sonrası aktiviteler (Toplantı Sonucu, Teklif Detayı, Satış Potansiyeli, Yeni Takip Tarihi) için ek alanlar hemen eklensin mi, yoksa sonraki modülde mi yapalım? hemen  
4. Randevu formu menüye mi eklensin, yoksa satır seçildiğinde otomatik mi açılsın?  menüye eklensin
5. Randevu kaydı sonrası satırın yeşile boyanması dışında başka bir işlem ister misin? hayır

**KURSOR SORU:** Randevu formunda "müşteri ismi daha önce listede varsa otomatik doldurma" özelliği için, isim eşleşmesini tam mı yapalım, yoksa benzer isimleri de önerelim mi?
**Ferit cevap:** hayır tam yapalım

**KURSOR ÖNERİ:** Tarih ve saat için takvim ve saat seçici (dropdown) kullanmak kullanıcı hatalarını azaltır.
**Ferit cevap:** evet

**KURSOR SORU:** Randevu formunda tarih ve saat seçici olarak Google'ın kendi "date picker" ve "time picker" bileşenlerini mi kullanalım, yoksa özel bir arayüz ister misin?
**Ferit cevap:** ben bunu biliyorum hangisi pratik ve kolaysa 
Modül 2 rev 1 :
1.Pin kod yazıyor ama ona gerek yok onu kaldıralım yerine city gelsin ve otomatik dolsun
Kursor Cevap: Pincode alanı tamamen kaldırılacak, yerine City alanı otomatik dolacak ve formda gösterilecek. Uzlaşıldı.

2.formun içinde müşteri ismi manuel olarak yazıyor ama aşağıda daha önce yazılan isimler veriyor seçim olarak onu kaldır yanı müşteri ismi sadece elle yazılsın düşen liste olmasın eskiden yazılan isimler seçim olarak karşısına çıkmasın
Kursor Cevap: Müşteri ismi alanı sadece manuel olarak yazılacak. Hiçbir şekilde daha önce yazılan isimler, düşen liste veya otomatik öneri olarak gösterilmeyecek. Kullanıcı her seferinde müşteri ismini elle girecek, geçmiş isimler asla karşısına çıkmayacak. Uzlaşıldı.

3.ayrıyeten bir satıra randevu al tıkladığımızda o satırda daha önce müşterinin isim yazıldıysa otomatik o isim düşsün (bunu daha önce anlaşmıştık)
Kursor Cevap: Eğer seçili satırda "Müşteri İsim Soyisim" sütununda bir değer varsa, form açıldığında müşteri ismi alanı otomatik olarak o değerle dolacak. Uzlaşıldı.

4.saatlar hep 90 dk aralıkla versin (bunu da demiştim)
Kursor Cevap: Saat dropdown'unda 09:00'dan 18:00'a kadar 90 dakikalık aralıklarla seçenekler olacak (örn: 09:00, 10:30, 12:00, 13:30, 15:00, 16:30, 18:00). Uzlaşıldı.

5.Randevu formatı açılan liste olacak ve iki seçenek olacak orda Yüz Yüze ve Online
Kursor Cevap: "Randevu Formatı" alanı açılır liste olacak, sadece "Yüz Yüze" ve "Online" seçenekleri olacak. Uzlaşıldı.

6.Randevu sonrası aktiviteler bu formda olmayacak ona göre ki bunu randevu alan temsilci yazmıyor bunu sonra o randevuya giden yönetici yazacak o da oluşan Randevu listesinde
Kursor Cevap: Formda randevu sonrası aktiviteler olmayacak, bu alanlar sadece Randevular listesinde yönetici tarafından doldurulacak. Uzlaşıldı.

7.Randevu al tıkladıktan sonra satır yeşile boyandı ama Randevularım ek sayfa açılmadı ve Randevular sayfası da açılmadı başka driveda 
Kursor Cevap: Randevu alındığında, eğer "RANDEVULARIM" ve "RANDEVULAR" sayfaları yoksa otomatik olarak oluşturulacak ve kayıtlar bu sayfalara da otomatik eklenecek. Eğer farklı bir Google Sheet dosyasına eklenmesi isteniyorsa, hedef dosyanın ID'si gerekecek. Şu an için aynı dosya içinde yeni sayfa açılacak şekilde ilerliyoruz. Uzlaşıldı mı? (Farklı dosya için ek bilgi gerekirse belirt.)

8.Açılan form daha güzel ola bilir hatta assets logo.png ala bilirsin ekleye bilirsin daha şık durması adına
Kursor Cevap: Formun üst kısmına assets/logo.png eklenecek. (Google Apps Script'te logo eklemek için görseli base64'e çevirip HTML'e gömmek gerekir, bu şekilde yapılacak.) Uzlaşıldı.

9.on open menü DigiFirst diye adlansın diğer başlıklar içinde olsun 
Kursor Cevap: Menü başlığı "DigiFirst" olacak, altına "Tabloyu Güncelle", "Randevu Al" gibi seçenekler eklenecek. Uzlaşıldı.

10.Tablo formatı hangisini sen öneriyorsun karşısında Recommendedyaz
Kursor Cevap: Şu anki format (README.md'deki targetHeaders) hem sürdürülebilirlik hem de entegrasyon kolaylığı açısından Recommended. Eğer yeni bir önerin olursa ayrıca değerlendirebiliriz. Uzlaşıldı.
<!-- MODÜL 2 REV. 2 -->
1.aynı tarihte aynı saate ve aynı randevu formatında 2 randevu alınamasın (biri yüz yüze diğeri online olsa aynı saatte alına bilir ikiside aynı saatte online olsa yine alına bilir ama ikiside yüz yüze olsa aynı saate 2 tane randevu alamasın
Kursor Cevap: Aynı gün ve aynı saatte, aynı formatta ("Yüz Yüze") birden fazla randevu alınamaz. Yani aynı saatte bir "Yüz Yüze" ve bir "Online" randevu alınabilir, iki "Online" randevu alınabilir, ama iki "Yüz Yüze" randevu alınamaz. Sistem uyarı verecek ve ikinci kayda izin vermeyecek. (Kontrol, RANDEVULARIM ve RANDEVULAR sayfalarındaki mevcut kayıtlar üzerinden yapılacak.) Uzlaşıldı mı? evet ama yanı tarih

2.açılan Randevularım ve Randevular sayfasında başlıklar Keyword Location Company name Category Website Phone Müşteri İsim Soyisim Toplantı formatı Address City Maplink
Kursor Cevap: RANDEVULARIM ve RANDEVULAR sayfaları oluşturulurken, başlıklar tam olarak yukarıdaki gibi olacak ve bu sırayla eklenecek. Kayıtlar da bu başlık sırasına göre eklenecek. Uzlaşıldı mı? evet

3.Randevularım ve Randevular sayfasına ayrıyeten daha önceden konuştuğumuz başlıklar getirilsin (toplantı sonrası notları)
Kursor Cevap: RANDEVULARIM ve RANDEVULAR sayfalarına aşağıdaki ek başlıklar da eklenecek: Toplantı Sonucu, Teklif Detayı, Satış Potansiyeli, Yeni Takip Tarihi, Yapan Kişi. Bu başlıklar, yukarıdaki ana başlıkların sonuna eklenecek. Uzlaşıldı mı? evet ve açılan listelerde olacak yapan kişi dışında ayrıyeten teklif detayında birden fazla seçenek girile bilinecek 
REV 3
1. Keyword Location Company name Category Website Phone Müşteri İsim Soyisim Toplantı formatı Tarih Saat Address City Toplantı Sonucu Teklif Detayı Satış Potansiyeli Yeni Takip Tarihi Toplantı Yapan Maplink Randevularım Ve Randevu bu şekilde dizer misin 
Kursor Cevap: RANDEVULARIM ve RANDEVULAR sayfalarında başlıklar tam olarak yukarıdaki gibi olacak ve bu sırayla dizilecek. Kayıtlar da bu başlık sırasına göre eklenecek. Uzlaşıldı mı?

2.rev 2 de bunu sana söylemiştim sende kabul ettin ama yapmadın daha dikkatli ol! Toplantı Sonucu-açılan liste olacak,Teklif Detayı-açılan liste,Satış Potansiyeli-açılan liste,Yeni Takip Tarihi-açılan tarih,Toplantı Yapan-Manuel 
Kursor Cevap: Formda ve/veya Randevular sayfasında: Toplantı Sonucu: açılır liste, Teklif Detayı: açılır liste (çoklu seçim istersen ayrıca belirt), Satış Potansiyeli: açılır liste, Yeni Takip Tarihi: tarih seçici, Toplantı Yapan: manuel giriş. Uzlaşıldı mı? evet

3.Toplantı formatı- Formdan Otomatik dolacak, Randevular sayfasına yeni eklenen Tarih-formdan otomatik,Randevular sayfasına yeni eklenen Saat -formdan otomatik 
3.Ana listede sonraki arama hiç bir şey girilmeyecek formdan
Kursor Cevap: Toplantı formatı, Tarih ve Saat alanları formdan otomatik olarak Randevular sayfasına yazılacak. Ana listede "Sonraki Arama" alanı formdan doldurulmayacak, boş kalacak. Uzlaşıldı mı? evet

4.rev 2 de 86 satır sana bunu söylemiştim yapmadın daha dikkatli ol ! aynı güne aynı saate 2 yüz yüze toplantı alınmamalı !
Kursor Cevap: Aynı gün ve aynı saatte, iki "Yüz Yüze" toplantı alınmasına sistem kesinlikle izin vermeyecek. Bu kontrol hem RANDEVULARIM hem de RANDEVULAR sayfalarında yapılacak. Uzlaşıldı mı? 2 ci keredir aynı şeyi yazıyorum evet


		


3. 📊 RAPORLARIM
	•	Müşteri Yanıtı sütunundaki verilere göre günlük özet rapor oluşturur
	•	Aşağıdaki her yanıt ayrı ayrı sayılır:
	•	Randevu Alındı
	•	İleri Tarih Randevu
	•	Bilgi Verildi
	•	Yeniden Aranacak
	•	İlgilenmiyor
	•	Ulaşılamadı (bu da sayılır!)
	•	Ek olarak:
	•	🔢 Toplam Arama Sayısı hesaplanır
	•	🔢 Toplam Kontak Sayısı (Ulaşılan kişi sayısı) hesaplanır
	•	Sonuçlar otomatik olarak 

  - ✅ `RAPORLARIM` (temsilci sayfası)
  - ✅ `RAPORLAR` (yönetici merkezi dosyası)
  sayfasına yazılır (günlük bazda)
  Alınan randevuda satış yapıldığında Satış sütünuna da o güne Satış 1 yazıla bilinir (zor ise sonraya bırakıla bilinir)

**KURSOR SORU:** Raporlar günlük olarak otomatik mi oluşsun, yoksa manuel tetiklemeyle mi?
**Ferit cevap:** ikiside olur rapor oluştur butonuyla da olur farklı versiyonda olur hangisi en basit ve verimliyse

**KURSOR SORU:** Raporlar otomatik oluştuğunda, geçmiş raporlar arşivlensin mi, yoksa sadece güncel rapor mu gösterilsin?
**Ferit cevap:**tabiki arşivlensin yanı şöyle diyelim aynı gün içinde 3 kere rapor güncelle yapsa bile o günün son verilerini alsın bir kere yanı diyelim o gün 3o arama yaptı rapor oluştur dedi sonra gitti 30 arama daha yaptı rapor güncelle dediğinde toplam 60 kayıttan rapor oluşsun 

**KURSOR ÖNERİ:** Raporları haftalık/aylık olarak da otomatik özetleyip ayrı bir sayfada göstermek ister misin?
**Ferit cevap:** çok güzel fikir

**KURSOR SORU:** Haftalık/aylık raporlar için, özetler ayrı bir sayfada mı olsun, yoksa ana rapor sayfasında filtreyle mi gösterilsin?
**Ferit cevap:** aynı sayfada tarih tarih sıralana bilir mümkünse 

**KURSOR ÖNERİ:** Raporlarda "en çok randevu alan temsilci", "en çok satış yapan temsilci" gibi küçük gamification (oyunlaştırma) eklemek ister misin?
**Ferit cevap:** zor değilse evet

4. 🔥 FIRSATLARIM
	•	Müşteri Yanıtı şu değerlerden biriyse satır buraya gider ve ana sayfada her birine bir renk verilir:
	•	İleri Tarih Randevu Mavi
	•	Bilgi Verildi Pembe
	•	Yeniden Aranacak Sarı
Takip edilecek sıcak müşteriler otomatik olarak 

  - ✅ `FIRSATLARIM` (temsilci sayfası)
  - ✅ `FIRSATLAR` (yönetici merkezi dosyası) dosyasında toplanır ve ekstradan 
- Fırsat aşamaları (örn. "İlgi Var / Beklemede / Teklif Gönderildi") eklenecek
- Temsilcinin manuel not alanı ve takip tarihi olacak bu yönetici tarafından girilen kayıtşar ise merkez dosyada eklenecek yanı Fırsatlar dosyasında ama mümkünse onun girdiği kayıtlar otomatikman Fırsatlara da geri dönsün (bu aşama çok zor ise sonraya da bırakıla bilir)

**KURSOR SORU:** Fırsatlar sayfasında ek olarak görmek istediğin özel alanlar var mı? (ör. teklif tutarı, takip notu)
**Ferit cevap:** evet ikiside olur aslında güzel olur bilgi verildi aslında bazen sadece firma hakkında bilgi istemiş olurlar bazende teklif istemiş olurlar bilgi verildi ikiye bölsek mesela bilgi verildi teklif o zaman teklif tutarı da olur. takip notuda güzel fikir yapalım

**KURSOR SORU:** "Bilgi verildi"yi ikiye bölmek için, kullanıcıya otomatik bir seçim mi sunalım (ör. "Bilgi mi verildi, teklif mi verildi?"), yoksa manuel mi işaretlensin?
**Ferit cevap:** ikiye bölmek zor değilse ikiye bölelim

**KURSOR ÖNERİ:** Fırsat aşamalarını (örn. İlgi Var, Beklemede, Teklif Gönderildi) otomatik olarak güncellemek ister misin?
**Ferit cevap:** nasıl yanı anlayamadım soruyu?

**KURSOR SORU:** Otomatik aşama güncelleme: Örneğin, müşteri "teklif istiyorum" dediğinde satırın aşaması otomatik "Teklif Gönderildi"ye geçsin ister misin, yoksa bu aşamayı manuel mi değiştirmek istersin?
**Ferit cevap:**müşteriye gerçekten teklif göndermesi lazım sonrada teklif verildiyi açılan listeden seçe bilir

## 🔷 5. 🧩 Yönetici Entegrasyonları

- Tüm randevular RANDEVULAR FIRSATLAR ve RAPORLAR sayfaları hem kendinde yeni sayfada hemde merkeze entegre edilecek
- Her kayıtta "Randevu alan kişi" olacak yanı hangi sayfadan gelmişse o arayananın ismi olacak

**KURSOR SORU:** Yönetici ve temsilci dosyaları ayrı Google Sheet mi olacak, yoksa tek dosya içinde farklı sayfalar mı?
**Ferit cevap:** yok ayrı google sheet yanı temsilciler çoktur ama yönetici tektir dolayısıyla temsilcinin kendi sheeten içinde de olacak Raporlarım, Fırsatlarım, Randevularım diye yöneticide de olacak Raporlar, Fırsatlar, Randevular diye ve yöneticide de hangi temsilciden geldiğini net yazacak

**KURSOR SORU:** Entegrasyonlar gerçek zamanlı mı, yoksa belirli aralıklarla mı güncellensin?
**Ferit cevap:** yinede sana bırakıyorum en kolayı neyse o olsun Örnek: butona tıkladığında geçiş yapıla bilir

**KURSOR SORU:** Temsilciden yöneticinin dosyasına veri aktarımı otomatik mi olsun, yoksa temsilci bir butona basınca mı aktarılsın?
**Ferit cevap:** ikiside olur ama işi zorlaştırmazsa otomatik olsun

**KURSOR SORU:** Yönetici dosyasında yapılan bir değişiklik (ör. randevu sonucu güncelleme) otomatik olarak ilgili temsilcinin dosyasına da yansısın ister misin? Yoksa sadece temsilciden yöneticilere tek yönlü akış mı olsun?
**Ferit cevap:** bu aslında işi zorlar gibi söylemiştin eğer zorlarsa tek yönlü akış olsun şimdilik yok eğer kolaysa iki yönlüde yapa biliriz mesela: randevu aldı temsilci ama yönetici o randevuya gitti ve iptal oldu randevu ve ya ertelendi kendi dosyasında iptal oldu yazdı ve ilgili temsilcinin raporundada o bilgi gereken sütunda değişti

**KURSOR ÖNERİ:** Temsilci dosyalarından yöneticinin dosyasına veri aktarımı için Apps Script ile otomatikleştirme yapılabilir. Ancak çift taraflı senkronizasyon daha karmaşık olur, veri çakışmalarını önlemek için ek kurallar gerekir.
**Ferit cevap:** dediğim gibi eğer karmaşıklık ve ekstradan zorluk çıkarırsa şimdilik tek yönlü yapalım

## 🎯 Gelecek Plan: CRM'in Üzerine CRM

**KURSOR SORU:** Otomatik alarm ve bildirimler için e-posta yeterli mi, yoksa WhatsApp/SMS gibi anlık bildirimler de ister misin?
**Ferit cevap:** en basit versiyon neyse o ola bilir 

**KURSOR SORU:** Bildirimler için ileride WhatsApp/SMS entegrasyonu ister misin, yoksa e-posta ve Google Sheets içi uyarılar yeterli mi?
**Ferit cevap:** şu an yeterlidir ileride watsap da olur eğer zor değilse

**KURSOR SORU:** Kullanıcı sayısı ve eş zamanlı kullanım yoğunluğu nedir?
**Ferit cevap:** kullanıcı sayı maks 4-5 kişidir şimdilik artı 1-2 yönetici eş zamanlı kullanım ise çok yoğun olmaz diye düşünüyorum ama ola da bilir

**KURSOR SORU:** Kullanıcı sayısı artarsa, Google Sheets'in sınırlarını aşarsak, verileri dışa aktarmak veya profesyonel bir CRM'e taşımak ister misin?
**Ferit cevap:** evet ileride neden olmasın

**KURSOR SORU:** Gelecekte entegrasyon eklemek istersek, hangi sistemler öncelikli olur? (ör. WhatsApp, başka CRM, ERP)
**Ferit cevap:** watsap başka crm erp hepsi olur onu biz ileride düşünürüz şimdilik sen bunu çok kafana takma şimdilik basit bir versiyonla çalışmamız yeterli olacaktır

**KURSOR SORU:** Veri güvenliği ve yedekleme için özel bir talebin var mı?
**Ferit cevap:**yanı driveda zaten güvenlidir düşünüyorum başka zor bir hamlelere şimdilik gerek yok diye düşünüyorum

**KURSOR SORU:** Yedekleme için haftalık otomatik dışa aktarma (ör. Excel veya başka bir Google Sheet'e) ister misin?
**Ferit cevap:** bildiğim kadarıyla zaten driveda yeterli kadar veri tuta biliyoruz dolayısyıyla şimdilik gerek yoktur diye düşünüyorum

## Genel

**KURSOR SORU:** Sistemde yapılan önemli işlemler için (ör. randevu silme, fırsat kapama) "geri alma" (undo) veya işlem geçmişi (log) ister misin?
**Ferit cevap:** eğer işimizi kolaylaştırırsa ve senin için zor değilse olur

### 📅 Randevu Al (Form) – Google Apps Script
