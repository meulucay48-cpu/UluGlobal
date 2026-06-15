// Otomatik üretildi: ürünler/<grup> klasörlerinden. Ürün adları dosya adlarından.

export interface Product {
  name: string;
  image: string;
}

export const products: Record<string, Product[]> = {
  "seramik": [
    { name: "120X240 Black Calacatta Bookmatch", image: "/products/seramik/120x240-black-calacatta-bookmatch.jpg" },
    { name: "120X240 Fusion Kristal Bookmatch", image: "/products/seramik/120x240-fusion-kristal-bookmatch.jpg" },
    { name: "Delmar White Bookmatch", image: "/products/seramik/delmar-white-bookmatch.jpeg" },
    { name: "60X120 Adel Beyaz", image: "/products/seramik/60x120-adel-beyaz.jpg" },
    { name: "60X120 TRAVERTEN FİLDİŞİ", image: "/products/seramik/60x120-traverten-fi-ldi-s-i.jpg" },
    { name: "60X120 VERDE", image: "/products/seramik/60x120-verde.jpg" },
  ],
  "vitrifiye": [
    { name: "Frame Tezgahüstü Lavabo", image: "/products/vitrifiye/frame-tezgahu-stu-lavabo.webp" },
    { name: "Plural Çanak Lavabo", image: "/products/vitrifiye/plural-c-anak-lavabo.webp" },
    { name: "Outline Çanak Lavabo", image: "/products/vitrifiye/outline-c-anak-lavabo.webp" },
    
    { name: "Memoria Asma Klozet", image: "/products/vitrifiye/memoria-asma-klozet.webp" },
    { name: "Sento Asma Klozet Seti", image: "/products/vitrifiye/sento-asma-klozet-seti.webp" },
    { name: "V-Care 3 Prime Akıllı Asma Klozet", image: "/products/vitrifiye/v-care-3-prime-akilli-asma-klozet.webp" },
  ],
  "yapi-kimyasallari": [
    { name: "Artefix", image: "/products/yapi-kimyasallari/artefix.png" },
    { name: "MegaFuga Flex D103 DERZ DOLGU", image: "/products/yapi-kimyasallari/megafuga-flex-d103-derz-dolgu.png" },
    { name: "Megaİzo Lastik 7 S102 Su Yalıtım", image: "/products/yapi-kimyasallari/megai-zo-lastik-7-s102-su-yalitim.png" },
    { name: "MegaTamir Epo T501 - Tamir Harcı", image: "/products/yapi-kimyasallari/megatamir-epo-t501-tamir-harci.png" },
    { name: "MegaZemin Kür Z201", image: "/products/yapi-kimyasallari/megazemin-ku-r-z201.png" },
    { name: "Megaflex Y103", image: "/products/yapi-kimyasallari/megaflex-y103.png" },
  ],
  "armatur": [
    { name: "Core Round Duş Sistemi", image: "/products/armatur/core-round-dus-sistemi.webp" },
    { name: "Core Square Duş Sistemi", image: "/products/armatur/core-square-dus-sistemi.webp" },
    { name: "Juno Banyo Bataryası", image: "/products/armatur/juno-banyo-bataryasi.webp" },
    { name: "Masterline Evye Bataryası", image: "/products/armatur/masterline-evye-bataryasi.webp" },
    { name: "Move Masajlı Duş Sistemi", image: "/products/armatur/move-masajli-dus-sistemi.webp" },
    { name: "Shift T30 Yüksek Lavabo Bataryası", image: "/products/armatur/shift-t30-yu-ksek-lavabo-bataryasi.webp" },
  ],
  "parke": [
    { name: "Anemon", image: "/products/parke/anemon.webp" },
    { name: "Frezya", image: "/products/parke/frezya.webp" },
    { name: "Gardenya", image: "/products/parke/gardenya.webp" },
    { name: "Rosso", image: "/products/parke/rosso.webp" },
    { name: "Tibet", image: "/products/parke/tibet.webp" },
    { name: "Vera", image: "/products/parke/vera.webp" },
  ],
};
