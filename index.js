const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const evSahibi = fifaData.filter((mac) => mac.Year === 2014 && mac.Stage === "Final");

console.log(evSahibi[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(evSahibi[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(evSahibi[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(evSahibi[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/

console.log(evSahibi[0]["Win conditions"]);



/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {

	const final = data.filter((mac) => mac.Stage === "Final");

	return final;

}

console.log(Finaller(fifaData));




/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data, callbackFinaller) {

	const final = callbackFinaller(data);

	const years = final.map((mac) => mac.Year);

	return years;
    
}

console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data, callbackFinaller) {
	
	const final = callbackFinaller(data);

	let kazananlarListesi = [];

	for (let i = 0; i < final.length; i++) {

		if (final[i]["Home Team Goals"] > final[i]["Away Team Goals"]) {

			kazananlarListesi.push(final[i]["Home Team Name"]);
			
		} else if (final[i]["Home Team Goals"] < final[i]["Away Team Goals"]) {

			kazananlarListesi.push(final[i]["Away Team Name"])
			
		} else {

			let uzatma = final[i]["Win conditions"].split(" win ");

			kazananlarListesi.push(uzatma[0]);

		}

	}

	return kazananlarListesi;
			
	
}

console.log(Kazananlar(fifaData, Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, callbackFinaller, callbackYillar, callbackKazananlar) {

	let final = callbackFinaller(data);
	let kazananlarListesi = callbackKazananlar(data, callbackFinaller);
	let finalYillari = callbackYillar(data, callbackFinaller);

	let yillaraGoreKazananTakimlar = final.map((mac, i) => {

		return finalYillari[i] + " yılında, " + kazananlarListesi[i] + " dünya kupasını kazandı!"
	});

	return yillaraGoreKazananTakimlar;

}

console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
	
	let toplamGol = finaller.reduce((toplam, mac) => toplam + mac["Home Team Goals"] + mac["Away Team Goals"], 0);

	return (toplamGol / finaller.length).toFixed(2);

	
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, takimKisaltmalari) {


	let finalTakimlarListe = Kazananlar(fifaData, Finaller).slice();

  	let kazanmaSayisi = {};

  	let kisaltmaListe = {};

  	let liste = {};

  	let sonuc = {};


  	for (let i = 0; i < finalTakimlarListe.length; i++) {

    	if (finalTakimlarListe[i] in kazanmaSayisi) {

      	kazanmaSayisi[finalTakimlarListe[i]] += 1;

    	} 
		else {
			
      	kazanmaSayisi[finalTakimlarListe[i]] = 1;
    	}
  	}

  	for (let i = 0; i < data.length; i++) {

    	if (data[i]["Home Team Name"] in kisaltmaListe === false) {

      	kisaltmaListe[data[i]["Home Team Name"]] = data[i]["Home Team Initials"];

    	} 
		else if (data[i]["Away Team Name"] in kisaltmaListe === false) {

      	kisaltmaListe[data[i]["Away Team Name"]] = data[i]["Away Team Initials"];
    	}
  	}

	console.log(kisaltmaListe);

  	for (const key in kazanmaSayisi) {

    	liste[kisaltmaListe[key]] = kazanmaSayisi[key];
  	}

  	sonuc = takimKisaltmalari + ": " + liste[takimKisaltmalari];

  	return sonuc;
    
}
	console.log(UlkelerinKazanmaSayilari(fifaData, "BRA"));


/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	
    let finalTakim = {};

  for (let i = 0; i < data.length; i++) {

    if (data[i]["Stage"] === "Final") {

      finalTakim[data[i]["Home Team Name"]] = 0;

      finalTakim[data[i]["Away Team Name"]] = 0;
    }
  }

  for (let i = 0; i < data.length; i++) {

    if (data[i]["Stage"] === "Final") {

      finalTakim[data[i]["Home Team Name"]] += data[i]["Home Team Goals"];
    }
  }

  for (let i = 0; i < data.length; i++) {

    if (data[i]["Stage"] === "Final") {

      finalTakim[data[i]["Away Team Name"]] += data[i]["Away Team Goals"];
    }
  }

  let enCokGolAtanTakim = Object.keys(finalTakim)[0];

  for (let i = 0; i < Object.keys(finalTakim).length; i++) {

    if (finalTakim[Object.keys(finalTakim)[i]] > finalTakim[enCokGolAtanTakim]) {

      enCokGolAtanTakim = Object.keys(finalTakim)[i];
    }
  }

  let sonuc = enCokGolAtanTakim + ": " + finalTakim[enCokGolAtanTakim];

  return sonuc;
}

console.log(EnCokGolAtan(fifaData));
	



/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
	
	let finalTakim = {};

	for (let i = 0; i < data.length; i++) {

	  if (data[i]["Stage"] === "Final") {

		finalTakim[data[i]["Home Team Name"]] = 0;

		finalTakim[data[i]["Away Team Name"]] = 0;
	  }
	}
  
	for (let i = 0; i < data.length; i++) {

	  if (data[i]["Stage"] === "Final") {

		finalTakim[data[i]["Home Team Name"]] += data[i]["Away Team Goals"];
	  }
	}
  
	for (let i = 0; i < data.length; i++) {
		
	  if (data[i]["Stage"] === "Final") {

		finalTakim[data[i]["Away Team Name"]] += data[i]["Home Team Goals"];
	  }
	}

	let enCokGolYiyenTakim = Object.keys(finalTakim)[0];
  
	for (let i = 0; i < Object.keys(finalTakim).length; i++) {

	  if (finalTakim[Object.keys(finalTakim)[i]] > finalTakim[enCokGolYiyenTakim]) {

		enCokGolYiyenTakim = Object.keys(finalTakim)[i];
	  }
	}
  
	let sonuc = enCokGolYiyenTakim + ": " + finalTakim[enCokGolYiyenTakim];

	return sonuc;
    	
}

console.log(EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* BONUS 4 */

function kacDefaKatildi(data, takimKisaltmalari) {

	let yeniDizi = [];

	let sonuc = 0;
  
	for (let i = 0; i < data.length; i++) {

	  if (data[i]["Home Team Initials"] === takimKisaltmalari || data[i]["Away Team Initials"] === takimKisaltmalari) {

		if (yeniDizi.includes(data[i]["Year"]) === false) {

		  yeniDizi.push(data[i]["Year"]);
		}
	  }
	}
  
	sonuc = yeniDizi.length;

	return sonuc;
  }
  
  console.log(kacDefaKatildi(fifaData, "BRA"));


  /* BONUS 5 */

  function kacGolAtti(data, takimKisaltmalari){

  let takimlar = {};

  let sonuc = 0;

  for (let i = 0; i < data.length; i++) {
	
	takimlar[data[i]["Home Team Initials"]] = 0;
	takimlar[data[i]["Away Team Initials"]] = 0;
  }

  for (let i = 0; i < data.length; i++) {
	
	takimlar[data[i]["Home Team Initials"]] += data[i]["Home Team Goals"];
	takimlar[data[i]["Away Team Initials"]] += data[i]["Away Team Goals"];

  }

  sonuc = takimlar[takimKisaltmalari];

  return sonuc;
}

console.log(kacGolAtti(fifaData, "FRA"))




/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
