/**
 * ▲▲ DigiFirst Google Sheets Menü ve Aktif Sayfa Analiz Fonksiyonları
 * Tüm işlemler, hangi sayfada çalıştırırsan o sayfada yapılır.
 * Teknik görev dokümanına %100 uyumludur.
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('▲▲ DigiFirst')
    .addItem('Telefonu Olmayanları Sil', 'telefonuOlmayanlariSil')
    .addItem('Başlıkları ve Verileri Akıllı Düzelt', 'basliklariVeVerileriAkilliDuzenle')
    .addSeparator()
    .addItem('CMS + Site Hızı Analizi Yap', 'cmsVeHizAnaliziYap')
    .addItem('E-Ticaret İzi Analizi Yap', 'eticaretAnaliziYap')
    .addItem('Puanlama Hesapla', 'puanlamaHesapla')
    .addItem('Seçili Satırları Analiz Et', 'seciliSatirlariAnalizEt')
    .addSeparator()
    .addItem('Randevu Al', 'randevuAl')
    .addToUi();
}

/**
 * Aktif sayfada telefon sütunu boş olan satırları siler.
 * Varsayılan olarak 6. sütun (F) 'Phone' olarak kabul edilir.
 */
function telefonuOlmayanlariSil() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var phoneCol = 6; // F sütunu (A=1, B=2, ...)
  for (var i = data.length - 1; i > 0; i--) { // Başlık hariç, sondan başa
    if (!data[i][phoneCol-1] || data[i][phoneCol-1].toString().trim() === "") {
      sheet.deleteRow(i+1);
    }
  }
  SpreadsheetApp.getUi().alert('Telefonu olmayan satırlar silindi!');
}

/**
 * Gelişmiş CMS tespiti (daha fazla anahtar kelime ve hata yönetimi ile)
 */
function cmsAnalizEtGuncel(siteUrl) {
  var log = "";
  if (!siteUrl) return { cmsAdi: "Bilinmiyor", cmsGrubu: "Bilinmiyor", log: "URL yok" };
  if (!/^https?:\/\//i.test(siteUrl)) siteUrl = "http://" + siteUrl;
  var cmsListesi = [
    { ad: 'WordPress', grubu: 'Açık kaynak', anahtar: ['wp-content', 'wp-includes', 'xmlrpc.php', 'wp-json', 'wp-admin'], yorum: 'Yaygın ve esnek altyapı.' },
    { ad: 'Shopify', grubu: 'E-ticaret altyapısı', anahtar: ['cdn.shopify.com', 'myshopify.com'], yorum: 'Hızlı ve güvenli e-ticaret çözümü.' },
    { ad: 'Ideasoft', grubu: 'E-ticaret altyapısı', anahtar: ['ideasoft.com.tr', 'static.ideasoft.com.tr'], yorum: 'Türkiye\'de yaygın e-ticaret altyapısı.' },
    { ad: 'Wix', grubu: 'Hazır site', anahtar: ['wix.com', 'static.wixstatic.com'], yorum: 'Küçük işletmeler için pratik çözüm.' },
    { ad: 'Joomla', grubu: 'Açık kaynak', anahtar: ['joomla', 'Joomla!', 'com_content'], yorum: 'Esnek açık kaynak CMS.' },
    { ad: 'Magento', grubu: 'E-ticaret altyapısı', anahtar: ['mage.js', 'Magento', 'skin/frontend'], yorum: 'Kurumsal e-ticaret altyapısı.' },
    { ad: 'PrestaShop', grubu: 'E-ticaret altyapısı', anahtar: ['prestashop', 'PrestaShop'], yorum: 'Avrupa\'da yaygın e-ticaret altyapısı.' },
    { ad: 'OpenCart', grubu: 'E-ticaret altyapısı', anahtar: ['opencart', 'catalog/view/theme'], yorum: 'Açık kaynak e-ticaret.' },
    { ad: 'Squarespace', grubu: 'Hazır site', anahtar: ['squarespace.com'], yorum: 'Hazır site platformu.' },
    { ad: 'Weebly', grubu: 'Hazır site', anahtar: ['weebly.com'], yorum: 'Hazır site platformu.' },
    { ad: 'Webflow', grubu: 'Hazır site', anahtar: ['webflow.com'], yorum: 'Modern hazır site platformu.' },
    { ad: 'Ghost', grubu: 'Açık kaynak', anahtar: ['ghost', 'content/images'], yorum: 'Blog ve içerik odaklı CMS.' },
    { ad: 'Drupal', grubu: 'Açık kaynak', anahtar: ['drupal', 'sites/all'], yorum: 'Kurumsal açık kaynak CMS.' },
    { ad: 'Blogger', grubu: 'Hazır site', anahtar: ['blogger.com', 'blogspot.com'], yorum: 'Google\'ın blog platformu.' },
    { ad: 'Bitrix', grubu: 'E-ticaret altyapısı', anahtar: ['bitrix', 'bitrix24'], yorum: 'Kurumsal e-ticaret ve portal.' },
    { ad: 'Tilda', grubu: 'Hazır site', anahtar: ['tilda', 'tilda.cc'], yorum: 'Modern hazır site platformu.' },
    { ad: 'Vtex', grubu: 'E-ticaret altyapısı', anahtar: ['vteximg.com.br', 'vtexassets.com'], yorum: 'Kurumsal e-ticaret.' },
    { ad: 'Ticimax', grubu: 'E-ticaret altyapısı', anahtar: ['ticimaxcdn.com', 'ticimax.com'], yorum: 'Türkiye\'de yaygın e-ticaret.' },
    { ad: 'Özel Yazılım', grubu: 'Eksik yapı', anahtar: [], yorum: 'Özel geliştirilmiş veya tespit edilemeyen altyapı.' }
  ];
  var response, html = '';
  try {
    response = UrlFetchApp.fetch(siteUrl, {muteHttpExceptions: true, followRedirects: true, validateHttpsCertificates: false, timeout: 5000});
    html = response.getContentText();
  } catch (e) {
    log = "Siteye erişilemedi: " + e;
    return { cmsAdi: "Bilinmiyor", cmsGrubu: "Bilinmiyor", log: log };
  }
  var bulunan = cmsListesi.find(function(cms) {
    return cms.anahtar.some(function(anahtar) {
      return html && html.toLowerCase().indexOf(anahtar.toLowerCase()) !== -1;
    });
  });
  if (!bulunan) {
    log = "Tespit edilemedi veya özel yazılım.";
    return { cmsAdi: "Bilinmiyor", cmsGrubu: "Bilinmiyor", log: log };
  }
  return { cmsAdi: bulunan.ad, cmsGrubu: bulunan.grubu, log: log };
}

/**
 * E-Ticaret izi tespiti (sayfa içeriğinde anahtar kelime arama)
 */
function eticaretIziTespitEt(siteUrl) {
  if (!siteUrl) return "";
  if (!/^https?:\/\//i.test(siteUrl)) siteUrl = "http://" + siteUrl;
  try {
    var response = UrlFetchApp.fetch(siteUrl, {muteHttpExceptions: true, followRedirects: true, validateHttpsCertificates: false, timeout: 5000});
    var html = response.getContentText().toLowerCase();
    var anahtarlar = ["satın al", "sepet", "ürünler", "add to cart", "basket", "checkout"];
    for (var i = 0; i < anahtarlar.length; i++) {
      if (html.indexOf(anahtarlar[i]) !== -1) return "E-Ticaret Var";
    }
    return "Yok";
  } catch (e) {
    return "";
  }
}

/**
 * Site hızı (yüklenme süresi ve log)
 */
function siteHiziSkoruVeLog(siteUrl) {
  if (!siteUrl) return { hiz: '', log: '' };
  if (!/^https?:\/\//i.test(siteUrl)) siteUrl = "http://" + siteUrl;
  var start = new Date().getTime();
  try {
    var response = UrlFetchApp.fetch(siteUrl, {muteHttpExceptions: true, followRedirects: true, validateHttpsCertificates: false, timeout: 5000});
    var end = new Date().getTime();
    var ms = end - start;
    var log = ms > 3000 ? 'Yavaş: ' + ms + ' ms' : 'Normal: ' + ms + ' ms';
    return { hiz: ms, log: log };
  } catch (e) {
    return { hiz: '', log: 'Açılamadı' };
  }
}

function basliklariVeVerileriAkilliDuzenle() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var mevcutData = sheet.getDataRange().getValues();
  if (mevcutData.length < 2) return;

  // Kodda tanımlı başlıklar (hedef başlıklar)
  var hedefBasliklar = [
    "Keyword", "Location", "Company name", "Category", "Website", "Phone", "Müşteri İsim Soyisim", "Müşteri Aktivite", "Sonraki Arama", "Yorum (Not)",
    "Destekçi Scriptler", "Site yorumu", "Genel Puan", "CMS Adı", "CMS Grubu", "E-Ticaret İzi", "Site Hızı", "Site Trafiği", "Log", "CMS Puanı",
    "E-Ticaret İzi Puanı", "Site Hızı Puanı", "Site Trafiği Puanı", "Rating Puanı", "Review Puanı", "Maplink puanı", "Address", "City", "Rating count", "Review", "Maplink"
  ];

  var mevcutBasliklar = mevcutData[0].map(function(b){ return b ? b.toString().trim() : ""; });
  var yeniData = [hedefBasliklar];

  for (var i = 1; i < mevcutData.length; i++) {
    var yeniSatir = [];
    for (var j = 0; j < hedefBasliklar.length; j++) {
      // Büyük/küçük harf ve boşluk duyarsız eşleştirme
      var hedef = hedefBasliklar[j].toLowerCase().replace(/\s+/g, "");
      var mevcutIndex = mevcutBasliklar.findIndex(function(mb){
        return mb.toLowerCase().replace(/\s+/,"") === hedef;
      });
      yeniSatir.push(mevcutIndex !== -1 ? mevcutData[i][mevcutIndex] : "");
    }
    yeniData.push(yeniSatir);
  }

  sheet.clear();
  sheet.getRange(1, 1, yeniData.length, hedefBasliklar.length).setValues(yeniData);
  SpreadsheetApp.getUi().alert("Başlıklar ve veriler akıllı şekilde otomatik düzeltildi!");
}

function cmsVeHizAnaliziYap() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var websiteCol = 5;
  var basliklar = data[0];
  var cmsAdiCol = basliklar.indexOf("CMS Adı");
  var cmsGrubuCol = basliklar.indexOf("CMS Grubu");
  var hizCol = basliklar.indexOf("Site Hızı");
  var logCol = basliklar.indexOf("Log");
  if (cmsAdiCol === -1 || cmsGrubuCol === -1 || hizCol === -1 || logCol === -1) {
    SpreadsheetApp.getUi().alert("Lütfen önce başlıkları ve verileri akıllı düzeltin!");
    return;
  }
  var cache = {};
  var blacklist = {};
  var batchSize = 20;
  var basarili = 0, hata = 0, toplam = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][cmsAdiCol] && data[i][cmsAdiCol].toString().trim() !== "" && data[i][hizCol] && data[i][hizCol].toString().trim() !== "") continue;
    var url = data[i][websiteCol-1];
    if (!url || url.toString().trim() === "") {
      sheet.getRange(i+1, cmsAdiCol+1).setValue("");
      sheet.getRange(i+1, cmsGrubuCol+1).setValue("");
      sheet.getRange(i+1, hizCol+1).setValue("");
      sheet.getRange(i+1, logCol+1).setValue("");
      continue;
    }
    if (blacklist[url]) {
      sheet.getRange(i+1, cmsAdiCol+1).setValue("Bilinmiyor");
      sheet.getRange(i+1, cmsGrubuCol+1).setValue("Bilinmiyor");
      sheet.getRange(i+1, hizCol+1).setValue("");
      sheet.getRange(i+1, logCol+1).setValue("Kara liste: daha önce başarısız deneme.");
      hata++;
      continue;
    }
    if (cache[url]) {
      var c = cache[url];
      sheet.getRange(i+1, cmsAdiCol+1).setValue(c.cmsAdi);
      sheet.getRange(i+1, cmsGrubuCol+1).setValue(c.cmsGrubu);
      sheet.getRange(i+1, hizCol+1).setValue(c.hiz);
      sheet.getRange(i+1, logCol+1).setValue(c.log);
      basarili++;
      continue;
    }
    var start = new Date().getTime();
    try {
      var response = UrlFetchApp.fetch(/^https?:\/\//i.test(url) ? url : "http://"+url, {muteHttpExceptions: true, followRedirects: true, validateHttpsCertificates: false, timeout: 3});
      var end = new Date().getTime();
      var ms = end - start;
      var html = response.getContentText();
      var sonuc = cmsTespitVeHiz(html);
      sheet.getRange(i+1, cmsAdiCol+1).setValue(sonuc.cmsAdi);
      sheet.getRange(i+1, cmsGrubuCol+1).setValue(sonuc.cmsGrubu);
      sheet.getRange(i+1, hizCol+1).setValue(ms);
      sheet.getRange(i+1, logCol+1).setValue(sonuc.log + (ms > 3000 ? ' | Yavaş: '+ms+' ms' : ' | Normal: '+ms+' ms'));
      cache[url] = {cmsAdi: sonuc.cmsAdi, cmsGrubu: sonuc.cmsGrubu, hiz: ms, log: sonuc.log};
      basarili++;
    } catch (e) {
      sheet.getRange(i+1, cmsAdiCol+1).setValue("Bilinmiyor");
      sheet.getRange(i+1, cmsGrubuCol+1).setValue("Bilinmiyor");
      sheet.getRange(i+1, hizCol+1).setValue("");
      sheet.getRange(i+1, logCol+1).setValue("Siteye erişilemedi: " + e);
      blacklist[url] = true;
      hata++;
    }
    toplam++;
    if (toplam % batchSize === 0) {
      SpreadsheetApp.getUi().alert(toplam + ' satırdan ' + basarili + ' başarılı, ' + hata + ' hatalı analiz edildi.');
    }
  }
  SpreadsheetApp.getUi().alert('Analiz tamamlandı! Toplam: ' + toplam + ', Başarılı: ' + basarili + ', Hatalı: ' + hata);
}

function cmsTespitVeHiz(html) {
  var log = "";
  var cmsListesi = [
    { ad: 'WordPress', grubu: 'Açık kaynak', anahtar: ['wp-content', 'wp-includes', 'xmlrpc.php', 'wp-json', 'wp-admin'], yorum: 'Yaygın ve esnek altyapı.' },
    { ad: 'Shopify', grubu: 'E-ticaret altyapısı', anahtar: ['cdn.shopify.com', 'myshopify.com'], yorum: 'Hızlı ve güvenli e-ticaret çözümü.' },
    { ad: 'Ideasoft', grubu: 'E-ticaret altyapısı', anahtar: ['ideasoft.com.tr', 'static.ideasoft.com.tr'], yorum: 'Türkiye\'de yaygın e-ticaret altyapısı.' },
    { ad: 'Wix', grubu: 'Hazır site', anahtar: ['wix.com', 'static.wixstatic.com'], yorum: 'Küçük işletmeler için pratik çözüm.' },
    { ad: 'Joomla', grubu: 'Açık kaynak', anahtar: ['joomla', 'Joomla!', 'com_content'], yorum: 'Esnek açık kaynak CMS.' },
    { ad: 'Magento', grubu: 'E-ticaret altyapısı', anahtar: ['mage.js', 'Magento', 'skin/frontend'], yorum: 'Kurumsal e-ticaret altyapısı.' },
    { ad: 'PrestaShop', grubu: 'E-ticaret altyapısı', anahtar: ['prestashop', 'PrestaShop'], yorum: 'Avrupa\'da yaygın e-ticaret altyapısı.' },
    { ad: 'OpenCart', grubu: 'E-ticaret altyapısı', anahtar: ['opencart', 'catalog/view/theme'], yorum: 'Açık kaynak e-ticaret.' },
    { ad: 'Squarespace', grubu: 'Hazır site', anahtar: ['squarespace.com'], yorum: 'Hazır site platformu.' },
    { ad: 'Weebly', grubu: 'Hazır site', anahtar: ['weebly.com'], yorum: 'Hazır site platformu.' },
    { ad: 'Webflow', grubu: 'Hazır site', anahtar: ['webflow.com'], yorum: 'Modern hazır site platformu.' },
    { ad: 'Ghost', grubu: 'Açık kaynak', anahtar: ['ghost', 'content/images'], yorum: 'Blog ve içerik odaklı CMS.' },
    { ad: 'Drupal', grubu: 'Açık kaynak', anahtar: ['drupal', 'sites/all'], yorum: 'Kurumsal açık kaynak CMS.' },
    { ad: 'Blogger', grubu: 'Hazır site', anahtar: ['blogger.com', 'blogspot.com'], yorum: 'Google\'ın blog platformu.' },
    { ad: 'Bitrix', grubu: 'E-ticaret altyapısı', anahtar: ['bitrix', 'bitrix24'], yorum: 'Kurumsal e-ticaret ve portal.' },
    { ad: 'Tilda', grubu: 'Hazır site', anahtar: ['tilda', 'tilda.cc'], yorum: 'Modern hazır site platformu.' },
    { ad: 'Vtex', grubu: 'E-ticaret altyapısı', anahtar: ['vteximg.com.br', 'vtexassets.com'], yorum: 'Kurumsal e-ticaret.' },
    { ad: 'Ticimax', grubu: 'E-ticaret altyapısı', anahtar: ['ticimaxcdn.com', 'ticimax.com'], yorum: 'Türkiye\'de yaygın e-ticaret.' },
    { ad: 'Özel Yazılım', grubu: 'Eksik yapı', anahtar: [], yorum: 'Özel geliştirilmiş veya tespit edilemeyen altyapı.' }
  ];
  var bulunan = cmsListesi.find(function(cms) {
    return cms.anahtar.some(function(anahtar) {
      return html && html.toLowerCase().indexOf(anahtar.toLowerCase()) !== -1;
    });
  });
  if (!bulunan) {
    log = "Tespit edilemedi veya özel yazılım.";
    return { cmsAdi: "Bilinmiyor", cmsGrubu: "Bilinmiyor", log: log };
  }
  return { cmsAdi: bulunan.ad, cmsGrubu: bulunan.grubu, log: log };
}

function seciliSatirlariAnalizEt() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var selection = sheet.getActiveRange();
  if (!selection) {
    SpreadsheetApp.getUi().alert('Lütfen analiz etmek istediğiniz satırları seçin.');
    return;
  }
  var startRow = selection.getRow();
  var numRows = selection.getNumRows();
  for (var i = 0; i < numRows; i++) {
    sheet.setActiveRange(sheet.getRange(startRow + i, 1, 1, sheet.getLastColumn()));
    cmsVeHizAnaliziYap();
  }
}

function eticaretAnaliziYap() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var websiteCol = 5;
  var basliklar = data[0];
  var eticaretCol = basliklar.indexOf("E-Ticaret İzi");
  var cmsAdiCol = basliklar.indexOf("CMS Adı");
  var logCol = basliklar.indexOf("Log");
  if (eticaretCol === -1 || cmsAdiCol === -1 || logCol === -1) {
    SpreadsheetApp.getUi().alert("Lütfen önce başlıkları ve verileri akıllı düzeltin!");
    return;
  }
  for (var i = 1; i < data.length; i++) {
    var url = data[i][websiteCol-1];
    var cmsAdi = data[i][cmsAdiCol];
    if (!url || url.toString().trim() === "") {
      sheet.getRange(i+1, eticaretCol+1).setValue("");
      sheet.getRange(i+1, logCol+1).setValue("");
      continue;
    }
    // Eğer CMS bilinen e-ticaret altyapısı ise analiz yapma
    var eTicaretCMSler = ["Ticimax", "T-Soft", "Ideasoft", "Shopify"];
    if (eTicaretCMSler.indexOf(cmsAdi) !== -1) {
      sheet.getRange(i+1, eticaretCol+1).setValue("E-Ticaret Var (CMS)");
      continue;
    }
    try {
      var sonuc = eticaretIziTespitEt(url);
      sheet.getRange(i+1, eticaretCol+1).setValue(sonuc);
    } catch (e) {
      sheet.getRange(i+1, eticaretCol+1).setValue("");
      sheet.getRange(i+1, logCol+1).setValue("E-Ticaret izi hatası: " + e);
    }
  }
  SpreadsheetApp.getUi().alert("E-Ticaret izi analizi tamamlandı!");
}

function puanlamaHesapla() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var basliklar = data[0];
  var genelPuanCol = basliklar.indexOf("Genel Puan");
  var cmsPuanCol = basliklar.indexOf("CMS Puanı");
  var eticaretPuanCol = basliklar.indexOf("E-Ticaret İzi Puanı");
  var hizPuanCol = basliklar.indexOf("Site Hızı Puanı");
  var ratingPuanCol = basliklar.indexOf("Rating Puanı");
  var reviewPuanCol = basliklar.indexOf("Review Puanı");
  var mapPuanCol = basliklar.indexOf("Maplink puanı");
  var cmsAdiCol = basliklar.indexOf("CMS Adı");
  var eticaretCol = basliklar.indexOf("E-Ticaret İzi");
  var hizCol = basliklar.indexOf("Site Hızı");
  var ratingCol = basliklar.indexOf("Rating count");
  var reviewCol = basliklar.indexOf("Review");
  var mapCol = basliklar.indexOf("Maplink puanı");
  if (genelPuanCol === -1 || cmsPuanCol === -1 || eticaretPuanCol === -1 || hizPuanCol === -1 || ratingPuanCol === -1 || reviewPuanCol === -1 || mapPuanCol === -1) {
    SpreadsheetApp.getUi().alert("Lütfen önce başlıkları ve verileri akıllı düzeltin!");
    return;
  }
  for (var i = 1; i < data.length; i++) {
    // CMS Puanı
    var cmsAdi = data[i][cmsAdiCol];
    var cmsPuan = 0;
    if (["WordPress", "Wix", "Blogger", "HTML", "Joomla"].indexOf(cmsAdi) !== -1) cmsPuan = 5;
    else if (["Shopify", "Ticimax", "T-Soft", "Ideasoft", "Magento", "PrestaShop", "OpenCart", "Bitrix", "Vtex"].indexOf(cmsAdi) !== -1) cmsPuan = 2;
    else if (cmsAdi === "Bilinmiyor" || cmsAdi === "Özel Yazılım") cmsPuan = 3;
    else if (!cmsAdi) cmsPuan = 0;
    else cmsPuan = 1;
    sheet.getRange(i+1, cmsPuanCol+1).setValue(cmsPuan);
    // E-Ticaret İzi Puanı
    var eticaret = data[i][eticaretCol];
    var eticaretPuan = (eticaret && eticaret.indexOf("Var") !== -1) ? 2 : 0;
    sheet.getRange(i+1, eticaretPuanCol+1).setValue(eticaretPuan);
    // Site Hızı Puanı
    var hiz = parseInt(data[i][hizCol], 10);
    var hizPuan = 0;
    if (isNaN(hiz)) hizPuan = 5;
    else if (hiz < 1000) hizPuan = 1;
    else if (hiz < 2000) hizPuan = 2;
    else if (hiz < 3000) hizPuan = 3;
    else if (hiz < 4000) hizPuan = 4;
    else hizPuan = 5;
    sheet.getRange(i+1, hizPuanCol+1).setValue(hizPuan);
    // Rating Puanı
    var rating = parseFloat(data[i][ratingCol]);
    var ratingPuan = 0;
    if (isNaN(rating)) ratingPuan = 2;
    else if (rating >= 4.5) ratingPuan = 0;
    else if (rating >= 4.0) ratingPuan = 1;
    else ratingPuan = 2;
    sheet.getRange(i+1, ratingPuanCol+1).setValue(ratingPuan);
    // Review Puanı
    var review = parseInt(data[i][reviewCol], 10);
    var reviewPuan = 0;
    if (isNaN(review)) reviewPuan = 2;
    else if (review > 100) reviewPuan = 0;
    else if (review >= 20) reviewPuan = 1;
    else reviewPuan = 2;
    sheet.getRange(i+1, reviewPuanCol+1).setValue(reviewPuan);
    // Maplink puanı (manuel giriliyor)
    var mapPuan = parseInt(data[i][mapCol], 10);
    sheet.getRange(i+1, mapPuanCol+1).setValue(isNaN(mapPuan) ? "" : mapPuan);
    // Genel Puan
    var toplam = cmsPuan + eticaretPuan + hizPuan + ratingPuan + reviewPuan + (isNaN(mapPuan) ? 0 : mapPuan);
    sheet.getRange(i+1, genelPuanCol+1).setValue(toplam);
  }
  SpreadsheetApp.getUi().alert("Puanlama tamamlandı!");
}

function randevuAl() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var selection = sheet.getActiveRange();
  if (!selection || selection.getNumRows() !== 1) {
    SpreadsheetApp.getUi().alert('Lütfen randevu almak istediğiniz satırı seçin.');
    return;
  }
  var row = selection.getRow();
  if (row === 1) {
    SpreadsheetApp.getUi().alert('Başlık satırı seçilemez!');
    return;
  }
  var data = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  var ui = SpreadsheetApp.getUi();
  var form = ui.prompt('Randevu Al', 'Tarih (GG.AA.YYYY) ve Saat (SS:dd) girin:', ui.ButtonSet.OK_CANCEL);
  if (form.getSelectedButton() !== ui.Button.OK) return;
  var tarihSaat = form.getResponseText();
  var notForm = ui.prompt('Randevu Notu (isteğe bağlı):', '', ui.ButtonSet.OK_CANCEL);
  if (notForm.getSelectedButton() !== ui.Button.OK) return;
  var not = notForm.getResponseText();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var randevuSheet = ss.getSheetByName('Randevu Kayıtları');
  if (!randevuSheet) {
    randevuSheet = ss.insertSheet('Randevu Kayıtları');
    randevuSheet.appendRow(['Tarih-Saat', 'Not', 'Kaynak Sayfa', 'Satır Bilgisi', 'Kayıt Zamanı']);
  }
  var kaynakSayfa = sheet.getName();
  var satirBilgisi = data.join(' | ');
  var kayitZamani = new Date();
  randevuSheet.appendRow([tarihSaat, not, kaynakSayfa, satirBilgisi, kayitZamani]);
  ui.alert('Randevu kaydedildi!');
}
