# Proje Klasör Yapısı (super_hizli_analiz_projesi)

Tüm kodlarınızı, giriş/çıkış dosyalarınızı ve dokümanlarınızı kaybetmemek için aşağıdaki gibi bir ana klasör yapısı önerilir:

```
super_hizli_analiz_projesi/
│
├── analyzer-frontend/      # React arayüz kodları
├── analyzer-backend/       # Node.js backend kodları
├── input/                  # Yükleyeceğiniz ham CSV dosyaları (ör: Google_Maps_Data.csv)
├── output/                 # Analiz edilmiş sonuç CSV dosyaları
├── docs/                   # Dökümantasyon, notlar, kurulum talimatları
├── README.md               # Proje genel açıklaması ve kullanım talimatı
└── super_hizli_analiz.js   # (İsterseniz eski tek dosya scriptini de burada tutabilirsiniz)
```

## Açıklamalar
- **analyzer-frontend/**: Web arayüzü (React) kodları burada olacak.
- **analyzer-backend/**: Node.js/Express backend kodları burada olacak.
- **input/**: Her gün yükleyeceğiniz ham CSV dosyalarını burada saklayın.
- **output/**: Analiz edilen ve indirilen sonuç dosyalarını burada arşivleyin.
- **docs/**: Proje ile ilgili notlar, kurulum ve kullanım talimatları burada tutulabilir.
- **README.md**: Projenin genel açıklaması ve nasıl kullanılacağı.
- **super_hizli_analiz.js**: (Opsiyonel) Tek dosya scriptiniz.

Bu yapıyı kullanarak tüm dosyalarınızı düzenli ve güvenli şekilde saklayabilirsiniz. 