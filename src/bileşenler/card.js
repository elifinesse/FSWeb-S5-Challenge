import axios from "axios";
const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const headLine = document.createElement("div");
  headLine.classList.add("headline");
  headLine.textContent = makale.anabaslik;
  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");
  const authorImg = document.createElement("div");
  authorImg.classList.add("img-container");
  const image = document.createElement("img");
  image.src = makale.yazarFoto;
  authorImg.appendChild(image);
  const authorName = document.createElement("span");
  authorName.textContent = makale.yazarAdi + " tarafından";
  authorDiv.append(authorImg, authorName);
  cardDiv.append(headLine, authorDiv);
  return cardDiv;
};

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //

  axios
    .get("http://localhost:5001/api/makaleler")
    /*.then((response) => {
      const articlesObj = response.data.makaleler;
      const tumMakaleler = [
        ...articlesObj.javascript,
        ...articlesObj.bootstrap,
        ...articlesObj.teknoloji,
        ...articlesObj.jquery,
        ...articlesObj["node.js"],
      ];
      for (let i = 0; i < tumMakaleler.length; i++) {
        const birKart = Card(tumMakaleler[i]);
        document.querySelector(secici).appendChild(birKart);
      }
    })*/
    .then((response) => {
      const keysArray = Object.keys(response.data.makaleler);
      for (let i = 0; i < keysArray.length; i++) {
        const konuArray = response.data.makaleler[keysArray[i]];
        for (let j = 0; j < konuArray.length; j++) {
          const makaleObj = konuArray[j];
          const birKart = Card(makaleObj);
          document.querySelector(secici).appendChild(birKart);
        }
      }
    })
    .catch((error) => console.log(error));
};
export { Card, cardEkleyici };
