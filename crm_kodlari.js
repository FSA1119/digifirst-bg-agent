// 📦 1. MODÜL: TABLOYU GÜNCELLE (FORMAT TABLO)
// Dışarıdan gelen tabloyu istenen CRM formatına otomatik dönüştürür, gereksiz sütunları siler, eksik olanları ekler, sütunları doğru sıraya koyar.
/* === KOPYALANACAK KOD BAŞLANGICI === */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('DigiFirst')
    .addItem('Tabloyu Güncelle (Yeni Sheet)', 'formatTableToTarget')
    .addItem('Tabloyu Güncelle (Mevcut Sheet)', 'formatTableInPlace')
    .addItem('Randevu Al', 'openRandevuForm')
    .addToUi();
}

function formatTableToTarget() {
  var targetHeaders = [
    'Keyword','Location','Company name','Category','Website','Phone','Müşteri İsim Soyisim','Müşteri Aktivite','Sonraki Arama','Yorum (Not)','Destekçi Scriptler Site yorumu','Genel Puan','CMS','CMS grubu','E-Ticaret İzi','Site Hızı','Site Trafiği','Log','CMS Puanı','E-Ticaret İzi Puanı','Site Hızı Puanı','Site Trafiği Puanı','Rating Puanı','Review Puanı','Maplink puanı','Address','City','Rating count','Review','Maplink'
  ];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rows = data.slice(1);
  var newSheetName = 'Formatlı_Tablo_' + new Date().getTime();
  var newSheet = ss.insertSheet(newSheetName);
  newSheet.appendRow(targetHeaders);
  rows.forEach(function(row) {
    var newRow = targetHeaders.map(function(header) {
      var idx = headers.indexOf(header);
      if (idx !== -1) {
        var val = row[idx];
        if (header.toLowerCase().includes('review')) {
          return val !== undefined && val !== null ? String(val) : '';
        }
        return val !== undefined && val !== null ? val : '';
      } else {
        return '';
      }
    });
    newSheet.appendRow(newRow);
  });
  newSheet.autoResizeColumns(1, targetHeaders.length);
}

function formatTableInPlace() {
  var targetHeaders = [
    'Keyword','Location','Company name','Category','Website','Phone','Müşteri İsim Soyisim','Müşteri Aktivite','Sonraki Arama','Yorum (Not)','Destekçi Scriptler Site yorumu','Genel Puan','CMS','CMS grubu','E-Ticaret İzi','Site Hızı','Site Trafiği','Log','CMS Puanı','E-Ticaret İzi Puanı','Site Hızı Puanı','Site Trafiği Puanı','Rating Puanı','Review Puanı','Maplink puanı','Address','City','Rating count','Review','Maplink'
  ];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rows = data.slice(1);
  var newData = [targetHeaders];
  rows.forEach(function(row) {
    var newRow = targetHeaders.map(function(header) {
      var idx = headers.indexOf(header);
      if (idx !== -1) {
        var val = row[idx];
        if (header.toLowerCase().includes('review')) {
          return val !== undefined && val !== null ? String(val) : '';
        }
        return val !== undefined && val !== null ? val : '';
      } else {
        return '';
      }
    });
    newData.push(newRow);
  });
  sheet.clearContents();
  sheet.getRange(1,1,newData.length,newData[0].length).setValues(newData);
  sheet.autoResizeColumns(1, targetHeaders.length);
}
/* === KOPYALANACAK KOD SONU === */

// 📦 2. MODÜL: RANDEVU AL (FORM)
// Seçili satır için randevu formu açar, bilgileri işler, satırı yeşile boyar, RANDEVULARIM ve RANDEVULAR sayfalarına otomatik kopyalar, randevu sonrası aktiviteleri de ekler.
/* === KOPYALANACAK KOD BAŞLANGICI === */
function openRandevuForm() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getActiveRange();
  var row = range.getRow();
  if (row === 1) {
    SpreadsheetApp.getUi().alert('Lütfen veri satırlarından birini seçin.');
    return;
  }
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  function getVal(header) {
    var idx = headers.indexOf(header);
    return idx !== -1 ? rowData[idx] : '';
  }
  var otomatikAlanlar = {
    'Keyword': getVal('Keyword'),
    'Location': getVal('Location'),
    'Company name': getVal('Company name'),
    'Category': getVal('Category'),
    'Website': getVal('Website'),
    'Phone': getVal('Phone'),
    'Address': getVal('Address'),
    'City': getVal('City'),
    'Maplink': getVal('Maplink')
  };
  var musteriVarsa = getVal('Müşteri İsim Soyisim');
  var tumSaatler = ['09:00','10:30','12:00','13:30','15:00','16:30','18:00'];
  var html = '<div style="text-align:center;margin-bottom:10px">';
  html += '<b>DigiFirst Randevu Formu</b></div>';
  html += '<p><b>Otomatik Alanlar:</b></p>';
  for (var key in otomatikAlanlar) {
    html += key + ': <input type="text" value="' + otomatikAlanlar[key] + '" readonly><br>';
  }
  html += '<p><b>Manuel Alanlar:</b></p>';
  html += 'Müşteri İsmi: <input type="text" id="musteri" value="' + (musteriVarsa || '') + '" required><br>';
  html += 'Tarih: <input type="date" id="tarih" required onchange="updateSaatlar()"><br>';
  html += 'Randevu Formatı: <select id="format" onchange="updateSaatlar()"><option>Yüz Yüze</option><option>Online</option></select><br>';
  html += 'Saat: <select id="saat"></select><br>';
  html += '<button onclick="submitForm()">Kaydet</button>';
  html += '<script>';
  html += 'var tumSaatler = ["09:00","10:30","12:00","13:30","15:00","16:30","18:00"];';
  html += 'function updateSaatlar() {';
  html += '  var tarih = document.getElementById("tarih").value;';
  html += '  var format = document.getElementById("format").value;';
  html += '  var saatSelect = document.getElementById("saat");';
  html += '  saatSelect.innerHTML = "";';
  html += '  if (!tarih) { tumSaatler.forEach(function(s){saatSelect.innerHTML += "<option>"+s+"</option>";}); return; }';
  html += '  google.script.run.withSuccessHandler(function(doluSaatler){';
  html += '    tumSaatler.forEach(function(s){';
  html += '      if (format === "Online" || doluSaatler.indexOf(s) === -1) {';
  html += '        saatSelect.innerHTML += "<option>"+s+"</option>";';
  html += '      }';
  html += '    });';
  html += '  }).getDoluSaatler(tarih, format);';
  html += '}';
  html += 'document.addEventListener("DOMContentLoaded", updateSaatlar);';
  html += 'setTimeout(updateSaatlar, 100);';
  html += 'function submitForm(){';
  html += '  var musteri = document.getElementById("musteri").value.trim();';
  html += '  var tarih = document.getElementById("tarih").value;';
  html += '  var saat = document.getElementById("saat").value;';
  html += '  var format = document.getElementById("format").value;';
  html += '  if (!musteri || !tarih || !saat || !format) { alert("Tüm alanları eksiksiz doldurun!"); return; }';
  html += '  google.script.run.withSuccessHandler(function(msg){if(msg){alert(msg);}google.script.host.close();}).randevuAlKaydet(' + row + ', {musteri:musteri, tarih:tarih, saat:saat, format:format});';
  html += '}';
  html += '</script>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(450), 'Randevu Al');
}

function getDoluSaatler(tarih, format) {
  if (format !== 'Yüz Yüze') return [];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ['RANDEVULARIM', 'RANDEVULAR'];
  var doluSaatler = [];
  function normalizeDate(val) {
    if (!val) return '';
    if (val instanceof Date) return val.toISOString().slice(0,10);
    if (typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)) return val;
    var d = new Date(val); if (!isNaN(d)) return d.toISOString().slice(0,10);
    return String(val).slice(0,10);
  }
  function normalizeTime(val) {
    if (!val) return '';
    if (typeof val === 'string') return val.trim();
    return String(val).trim();
  }
  var normTarih = normalizeDate(tarih);
  for (var i = 0; i < sheets.length; i++) {
    var sh = ss.getSheetByName(sheets[i]);
    if (!sh) continue;
    var data = sh.getDataRange().getValues();
    var headers = data[0];
    var tarihIdx = headers.indexOf('Tarih');
    var saatIdx = headers.indexOf('Saat');
    var formatIdx = headers.indexOf('Toplantı formatı');
    for (var j = 1; j < data.length; j++) {
      var t = normalizeDate(data[j][tarihIdx]);
      var s = normalizeTime(data[j][saatIdx]);
      var f = data[j][formatIdx];
      if (t === normTarih && f === 'Yüz Yüze') doluSaatler.push(s);
    }
  }
  return doluSaatler;
}

function randevuAlKaydet(row, data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!data.musteri || !data.tarih || !data.saat || !data.format) {
    SpreadsheetApp.getUi().alert('Tüm alanları eksiksiz doldurun!');
    return;
  }
  // Tarih ve saat normalize: ilk 10 karakter (tarih), saat için ilk 5 karakter (HH:mm)
  function normDate(val) {
    if (!val) return '';
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    var s = String(val).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    var d = new Date(s);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);
    return s.slice(0, 10);
  }
  function normTime(val) {
    if (!val) return '';
    var s = String(val).trim();
    if (/^\d{2}:\d{2}/.test(s)) return s.slice(0, 5);
    if (/^\d{2}:\d{2}:\d{2}/.test(s)) return s.slice(0, 5);
    return s.slice(0, 5);
  }
  var normTarih = normDate(data.tarih);
  var normSaat = normTime(data.saat);
  // Çakışma kontrolü (Yüz Yüze, her iki sayfada, başlık hariç tüm satırlarda, yeni satır dahil)
  if (data.format === 'Yüz Yüze' && normTarih && normSaat) {
    var sheets = ['RANDEVULARIM', 'RANDEVULAR'];
    for (var i = 0; i < sheets.length; i++) {
      var sh = ss.getSheetByName(sheets[i]);
      if (!sh) continue;
      var values = sh.getDataRange().getValues();
      var h = values[0];
      var tarihIdx = h.indexOf('Tarih');
      var saatIdx = h.indexOf('Saat');
      var formatIdx = h.indexOf('Toplantı formatı');
      for (var j = 1; j < values.length; j++) {
        var t = normDate(values[j][tarihIdx]);
        var s = normTime(values[j][saatIdx]);
        var f = values[j][formatIdx];
        Logger.log('Çakışma kontrolü: [' + t + ' - ' + s + ' - ' + f + '] vs [' + normTarih + ' - ' + normSaat + ' - ' + data.format + ']');
        if (t === normTarih && s === normSaat && f === 'Yüz Yüze') {
          SpreadsheetApp.getUi().alert('Aynı gün ve saatte ikinci bir Yüz Yüze randevu alınamaz!');
          return;
        }
      }
    }
  }
  var randevuHeaders = [
    'Keyword','Location','Company name','Category','Website','Phone','Müşteri İsim Soyisim','Toplantı formatı','Tarih','Saat','Address','City',
    'Toplantı Sonucu','Teklif Detayı','Satış Potansiyeli','Yeni Takip Tarihi','Toplantı Yapan','Maplink'
  ];
  var sheet = ss.getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  var randevuData = randevuHeaders.map(function(header) {
    if (header === 'Müşteri İsim Soyisim') return data.musteri;
    if (header === 'Toplantı formatı') return data.format;
    if (header === 'Tarih') return normTarih;
    if (header === 'Saat') return normSaat;
    var idx = headers.indexOf(header);
    return idx !== -1 ? rowData[idx] : '';
  });
  var randevularim = ss.getSheetByName('RANDEVULARIM');
  if (!randevularim) {
    randevularim = ss.insertSheet('RANDEVULARIM');
    randevularim.appendRow(randevuHeaders);
    addDropdowns(randevularim, randevuHeaders);
  }
  var randevular = ss.getSheetByName('RANDEVULAR');
  if (!randevular) {
    randevular = ss.insertSheet('RANDEVULAR');
    randevular.appendRow(randevuHeaders);
    addDropdowns(randevular, randevuHeaders);
  }
  randevularim.appendRow(randevuData);
  randevular.appendRow(randevuData);
  var musteriIdx = headers.indexOf('Müşteri İsim Soyisim');
  var aktiviteIdx = headers.indexOf('Müşteri Aktivite');
  if (musteriIdx !== -1) sheet.getRange(row, musteriIdx + 1).setValue(data.musteri);
  if (aktiviteIdx !== -1) sheet.getRange(row, aktiviteIdx + 1).setValue('Randevu Alındı');
  sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground('#b6fcb6');
}

function addDropdowns(sheet, headers) {
  var headerMap = {};
  headers.forEach(function(h, i) { headerMap[h] = i + 1; });
  var lastRow = sheet.getMaxRows();
  if (headerMap['Toplantı Sonucu']) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(['Teklif iletildi','Satış Yapıldı','İptal oldu','Ertelendi'], true).build();
    sheet.getRange(2, headerMap['Toplantı Sonucu'], lastRow - 1).setDataValidation(rule);
  }
  if (headerMap['Teklif Detayı']) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(['Entegre','Platinium','Platinium Plus','Elite Plus','Custom','Digifist','DigiPlus','Diğer'], true).build();
    sheet.getRange(2, headerMap['Teklif Detayı'], lastRow - 1).setDataValidation(rule);
    sheet.getRange(1, headerMap['Teklif Detayı']).setNote('Çoklu seçim için virgül ile ayırarak yazabilirsiniz.');
  }
  if (headerMap['Satış Potansiyeli']) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(['Soğuk','Orta','Sıcak','Yerinde Satış'], true).build();
    sheet.getRange(2, headerMap['Satış Potansiyeli'], lastRow - 1).setDataValidation(rule);
  }
  if (headerMap['Yeni Takip Tarihi']) {
    var col = headerMap['Yeni Takip Tarihi'];
    var range = sheet.getRange(2, col, lastRow - 1);
    range.clearDataValidations();
    range.clearContent();
    var rule = SpreadsheetApp.newDataValidation().requireDate().build();
    range.setDataValidation(rule);
  }
}
/* === KOPYALANACAK KOD SONU === */ 