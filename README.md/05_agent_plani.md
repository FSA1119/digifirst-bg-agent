# 🤖 Agent Sistemi Teknik Görev Tanımı

## 1. Amaç
Bu agent, CRM sisteminin tamamını analiz eder:
- CMS, puanlar, rating, review, görsel, hız vs.
- Lead sıcaklığı ve müşteri tepkilerini ölçer.
- Müşteri yanıtlarını sınıflandırır (Randevu, Fırsat, vs).
- Tüm verilerin doğruluğunu kontrol eder.
- Satış sürecini optimize edecek uyarılar verir.

## 2. Görevleri
- Girilen her satırı analiz eder.
- Eksik alanları tespit eder (örneğin: puan yok, yorum yok).
- Yanlış eşleşmeleri işaretler (örneğin: CMS var ama yorum eksik).
- Her satıra `agentNotu` ve `agentLog` ekler.
- Gerekirse çalışanı uyarır (örneğin: “CMS puanı çok düşük, ama rating yüksek”).

## 3. Alt Modüller
- `cmsKontrol()`
- `puanKontrol()`
- `yanitAnaliz()`
- `firsatTespiti()`
- `veriKalitesi()`
- `genelUyari()` vb.

## 4. Teslimat
Kodlar `agent_backend.js` dosyasına yazılacak.  
Testler için `agent_test.js` dosyası kullanılacak.
