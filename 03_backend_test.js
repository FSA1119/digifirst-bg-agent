/**
 * TEST: cmsAnalizEtGuncel fonksiyonunu örnek bir siteyle test eder.
 */
function testCmsAnalizEtGuncel() {
  var sonuc = cmsAnalizEtGuncel("https://www.wordpress.com");
  Logger.log("cmsAnalizEtGuncel sonucu:", sonuc);
}

/**
 * TEST: basliklariVeVerileriAkilliDuzenle fonksiyonunu test etmek için örnek bir sheet oluşturur ve fonksiyonu çalıştırır.
 */
function testBaslikVeVeriAkilliDuzenle() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet("TestAkilliDuzen");
  // Karışık ve eksik başlıklar
  var karisikBasliklar = ["location", "keyword", "Phone", "Website", "Company name", "Category", "Site yorumu", "Genel Puan", "CMS Grubu", "CMS Adı"];
  var veri1 = ["beykoz", "kozmetik", "5424624499", "https://www.wordpress.com", "Test Firma", "shop", "Kavacık", "Çağatay Sk. No:5", "Beykoz/İstanbul", "WordPress"];
  var veri2 = ["beykoz", "kozmetik", "2164687388", "https://www.shopify.com", "Shopify Firma", "shop", "Acarlar", "18. Sk.", "Beykoz/İstanbul", "Shopify"];
  sheet.getRange(1, 1, 1, karisikBasliklar.length).setValues([karisikBasliklar]);
  sheet.getRange(2, 1, 1, karisikBasliklar.length).setValues([veri1]);
  sheet.getRange(3, 1, 1, karisikBasliklar.length).setValues([veri2]);
  basliklariVeVerileriAkilliDuzenle();
  Logger.log("basliklariVeVerileriAkilliDuzenle test tamamlandı.");
}

/**
 * TEST: telefonuOlmayanlariSil fonksiyonunu test etmek için örnek bir sheet oluşturur ve fonksiyonu çalıştırır.
 */
function testTelefonuOlmayanlariSil() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet("TestTelefonSil");
  var basliklar = ["Keyword", "Location", "Company name", "Category", "Website", "Phone"];
  var veri1 = ["kozmetik", "beykoz", "Firma1", "shop", "https://www.wordpress.com", "5424624499"];
  var veri2 = ["kozmetik", "beykoz", "Firma2", "shop", "https://www.shopify.com", ""];
  var veri3 = ["kozmetik", "beykoz", "Firma3", "shop", "https://www.wix.com", null];
  sheet.getRange(1, 1, 1, basliklar.length).setValues([basliklar]);
  sheet.getRange(2, 1, 1, basliklar.length).setValues([veri1]);
  sheet.getRange(3, 1, 1, basliklar.length).setValues([veri2]);
  sheet.getRange(4, 1, 1, basliklar.length).setValues([veri3]);
  telefonuOlmayanlariSil();
  Logger.log("telefonuOlmayanlariSil test tamamlandı.");
}

/**
 * TEST: tumAnalizleriYap fonksiyonunu test etmek için örnek bir sheet oluşturur ve fonksiyonu çalıştırır.
 */
function testTumAnalizleriYap() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet("TestTumAnaliz");
  var basliklar = ["Keyword", "Location", "Company name", "Category", "Website", "Phone", "CMS Adı", "CMS Grubu", "E-Ticaret İzi", "Site Hızı", "Log"];
  var veri1 = ["kozmetik", "beykoz", "Firma1", "shop", "https://www.wordpress.com", "5424624499", "", "", "", "", ""];
  var veri2 = ["kozmetik", "beykoz", "Firma2", "shop", "https://www.shopify.com", "2164687388", "", "", "", "", ""];
  sheet.getRange(1, 1, 1, basliklar.length).setValues([basliklar]);
  sheet.getRange(2, 1, 1, basliklar.length).setValues([veri1]);
  sheet.getRange(3, 1, 1, basliklar.length).setValues([veri2]);
  tumAnalizleriYap();
  Logger.log("tumAnalizleriYap test tamamlandı.");
} 