function getPin(stat,label){
	var pinColor;
	switch (stat){
		case 'Vulnerable' :
			pinColor = "ecf0f1";
			break;
		case 'Definitely endangered' :
			pinColor = "f1c40f";
			break;
		case 'Severely endangered' :
			pinColor = "e67e22";
			break;
		case 'Critically endangered' :
			pinColor = "e74c3c";
			break;
		case 'Extinct' :
			pinColor = "7f8c8d";
			break;
		default:
			pinColor = "3498db";
	}
	//console.log(pinColor);
    var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/"+"/"+pinColor+"/",
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    
    return pinImage;
};
function infoMarker(idBahasa){
	//get area
	console.log(idBahasa);
	for (keyd in data_area_mapping){
		console.log('keyd='+data_area_mapping[keyd][0]);
		if (data_area_mapping[keyd][0]==idBahasa){
			var idArea = data_area_mapping[keyd][1];
			break;
		}
	}
	var listB = getListBahasaFromProvince(idArea);
	alert(listB.length);
}
function showMarker(dataB){
	//
    var pinImage = getPin(dataB[2],dataB[4])
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(dataB[5], dataB[6]),
    title:dataB[1]+", "+dataB[7],
    icon: pinImage,
    map: imaps.map
  });
  imaps.listmarkers.push(marker);
  //
	var contentInfo = '<div class="info-punah"><p>Bahasa : '+dataB[1]+'</p>'+
						'<p>Status Bahasa: '+dataB[2]+'</p>'+
						'<p>Jumlah Penutur : '+dataB[3]+'</p>';
						/*+'<p>Status Penutur : '+dataB[4]+'</p>'+
						'<p>Provinsi : '+dataB[7]+'</p>';*/
	/* var infowindow = new google.maps.InfoWindow();
	imaps.listinfo.push(contentInfo); */
  var infobox = new InfoBox({
     content: contentInfo,
     disableAutoPan: false,
     maxWidth: 130,
     pixelOffset: new google.maps.Size(-100, 0),
     zIndex: null,
     
     boxStyle: {
        opacity: 0.9
    },
    closeBoxMargin: "12px 4px 2px 2px",
    /*closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",*/
    closeBoxURL: "",
    infoBoxClearance: new google.maps.Size(1, 1)
});
  //
  google.maps.event.addListener(marker, 'click', (function(marker, contentInfo) {
       return function() {
         infoMarker(dataB[0]);
       }
 })(marker, contentInfo));
   google.maps.event.addListener(marker, 'mouseover', (function(marker, contentInfo) {
       return function() {
         infobox.open(imaps.map, marker);
       }
 })(marker, contentInfo));
    google.maps.event.addListener(marker, 'mouseout', (function(marker, contentInfo) {
       return function() {
         infobox.close();
       }
 })(marker, contentInfo));
}
function clearMarker(){
	while(imaps.listmarkers.length!=0){
		var p = imaps.listmarkers[0];
		p.setMap(null);
		imaps.listmarkers.splice(0, 1);
	};				
}
function clearLayer(){
	while(provinces.length!=0){
		var p = provinces[0];
		p.setMap(null);
		provinces.splice(0, 1);
	};				
}
function showArea(areaName){
	clearLayer();
	for (key in data_area){
		if(data_area[key][1] == areaName){
			addLayer(data_area[key][1], data_area[key][3]);
		}
	}		
}
function showMultiArea(listArea){
	clearLayer();
	for (list in listArea){
		for (key in data_area){
			if(data_area[key][1] == listArea[list]){
				addLayer(data_area[key][1], data_area[key][3]);
			}
		}
	}
}
function addLayer(pName, location){
	  var kmlLayer = new google.maps.KmlLayer({
		url: location,
		suppressInfoWindows: true,
		map: imaps.map,
		name:pName
	  });
	  
	  var contentInfo = '<div class="provinsi"><p>Provinsi : '+kmlLayer.name+'</p>';
	  var infobox = new InfoBox({
		 content: contentInfo,
		 disableAutoPan: false,
		 maxWidth: 130,
		 pixelOffset: new google.maps.Size(-100, 0),
		 zIndex: null,
		 
		 boxStyle: {
			opacity: 0.9
		},
		closeBoxMargin: "12px 4px 2px 2px",
		/*closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",*/
		closeBoxURL: "",
		infoBoxClearance: new google.maps.Size(1, 1)
	});

	  provinces.push(kmlLayer);
	  /*google.maps.event.addListener(kmlLayer, 'click', function(kmlEvent) {
		alert(kmlLayer.name);
	  });*/
	  google.maps.event.addListener(kmlLayer, 'mouseover', (function(kmlLayer, contentInfo) {
		  return function() {
			 infowindow.setContent(contentInfo);
			 infowindow.open(imaps.map, marker);
			 /*infobox.open(imaps.map, kmlLayer);*/
		  }
	 })(kmlLayer, contentInfo));
	
}
function removeLayer(name){
	for(var i=0;i<provinces.length;i++){
		if(provinces[i].name == name){
			var p = provinces[i];
			p.setMap(null);
			provinces.splice(i, 1);
			break;
		}
	};		
}			
function changeFilter(){
	var provVal = document.getElementById("selProvinsi").value;
	var vitVal = document.getElementById("selVitalitas").value;
	var pasang = false;
	//show area
	showArea(provVal);
	clearMarker();
	$("#bodyEvent").hide();
	//show bahasa list
	var strcontent = ''; var strcontent2 = '';
	var listBhs = new Array();
	if (provVal == 'Semua Provinsi') {
		for (keys in data_bahasa){
			listBhs.push(data_bahasa[keys][0]);
		}
	}else{
		listBhs = getBahasaFromProvince(document.getElementById("selProvinsi").value);
	}
	for (key in listBhs){
		for (key2 in data_bahasa){
			if (vitVal == 'Semua'){
				pasang = true;
			}else if (vitVal == 'Aktif'){
				switch (data_bahasa[key2][2]){
					case 'Vulnerable' :
					case 'Definitely endangered' :
					case 'Severely endangered' :
					case 'Critically endangered' :
					case 'Extinct' :
						pasang = false;
						break;
					default:
						pasang = true;
						break;
				}
			}else if (vitVal == 'Vulnerable'){
				if (data_bahasa[key2][2]==vitVal){
					pasang = true;
				}else{
					pasang = false;
				}
			}else if (vitVal == 'Definitely endangered'){
				if (data_bahasa[key2][2]==vitVal){
					pasang = true;
				}else{
					pasang = false;
				}
			}else if (vitVal == 'Severely endangered'){
				if (data_bahasa[key2][2]==vitVal){
					pasang = true;
				}else{
					pasang = false;
				}
			}else if (vitVal == 'Critically endangered'){
				if (data_bahasa[key2][2]==vitVal){
					pasang = true;
				}else{
					pasang = false;
				}
			}else if (vitVal == 'Extinct'){
				if (data_bahasa[key2][2]==vitVal){
					pasang = true;
				}else{
					pasang = false;
				}
			}
			//
			if((data_bahasa[key2][0] == listBhs[key]) && pasang){
				showMarker(data_bahasa[key2]);
				strcontent += '<li onclick="detailIdBahasa('+data_bahasa[key2][0]+')">'+data_bahasa[key2][1]+'</li>';
				//show dialek
				var listDialek = getDialekFromIdBahasa(data_bahasa[key2][0]);
				for (key3 in listDialek){
					strcontent2 += '<li>'+listDialek[key3][1]+'</li>';
				}
			}
		}
	}
	//bahasa
	$('#listBahasa').html(strcontent);
	$('#bodyBahasa').show();
	//dialek
	$('#listDialek').html(strcontent2);
	//$('#bodyDialek').show();
	showKanan();
}
function changeFilter2(){
	var bhsVal = document.getElementById("selCariBahasa").value;
	var pasang = true;
	//show area
	clearMarker();
	$("#bodyEvent").hide();
	//show bahasa list
	var strcontent = ''; var strcontent2 = '';
	var listBhs = new Array();
	if (bhsVal == 'Semua Bahasa') {
		for (keys in data_bahasa){
			listBhs.push(data_bahasa[keys][0]);
		}
	}else{
		listBhs.push(getIdBahasa(bhsVal));
	}
	for (key in listBhs){
		for (key2 in data_bahasa){
			if((data_bahasa[key2][0] == listBhs[key]) && pasang){
				showMarker(data_bahasa[key2]);
				strcontent += '<li onclick="detailIdBahasa('+data_bahasa[key2][0]+')">'+data_bahasa[key2][1]+'</li>';
				//show dialek
				var listDialek = getDialekFromIdBahasa(data_bahasa[key2][0]);
				for (key3 in listDialek){
					strcontent2 += '<li>'+listDialek[key3][1]+'</li>';
				}
			}
		}
	}
	//bahasa
	$('#listBahasa').html(strcontent);
	$('#bodyBahasa').show();
	//dialek
	$('#listDialek').html(strcontent2);
	$('#bodyDialek').show();
	showKanan();
}
function searchBahasabyId(idb){
	var retval;
	for (key in data_bahasa){
		if (data_bahasa[key][0]==idb){
			retval=data_bahasa[key];
			break;
		}
	}
	
	return retval;
}
function detailIdBahasa(idBahasa){
	clearMarker();
	setAreaFromIdBahasa(idBahasa);
	//event
	var strcontent = ''; var strcontent2 = '';
	var listEvent = getEventInfo(idBahasa);
	//console.log(listEvent[0]);
	for (key in listEvent){
		strcontent += '<li>'+listEvent[key][4]+' '+listEvent[key][5]+' di '+listEvent[key][1]+', '+listEvent[key][3]+' "'+listEvent[key][2]+'"</li>';
	}
	$('#listEvent').html(strcontent);
	$('#bodyEvent').show();
	//dialek
	var listDialek = getDialekFromIdBahasa(idBahasa);
	for (key in listDialek){
		strcontent2 += '<li>'+listDialek[key][1]+'</li>';
	}
	$('#listDialek').html(strcontent2);
	$('#bodyDialek').show();
	//marker
	showMarker(searchBahasabyId([idBahasa]));
	showKanan();
}
function getEventInfo(idBahasa){
	var retval = new Array();
	for (key in data_event){
		if(data_event[key][7] == idBahasa){
			retval.push(data_event[key]);
		}
	}						

	return retval;
}
function setAreaFromIdBahasa(idBahasa){
	var retval = new Array();
	for (key in data_area_mapping){
		if(data_area_mapping[key][0] == idBahasa){
			retval.push(data_area_mapping[key][1]);
		}
	}
	//console.log(retval);
	var listArea = new Array();
	for (key in retval){
		for (area in data_area){
			if(retval[key] == data_area[area][0]){
				listArea.push(data_area[area][1]);
			}
		}
	}
	showMultiArea(listArea);
}
function getIdProvince(namaProvince){
	var idProvince;
	for (area in data_area){
		if(namaProvince == data_area[area][1]){
			idProvince = data_area[area][0];
			break;
		}
	}
	return idProvince;
}
function genListBahasa(namaProvince){
	var listB = getBahasaFromProvince(namaProvince);
	var str = '';
	for (key in listB){
		var bhs = searchBahasabyId(listB[key]);
		str += '<option>'+bhs[1]+'</option>';
	}
	$('#selCariBahasa').html(str);
}
function getBahasaFromProvince(namaProvince){
	var idProvince = getIdProvince(namaProvince);
	var retval = new Array();
	for (key in data_area_mapping){
		if(data_area_mapping[key][1] == idProvince){
			retval.push(data_area_mapping[key][0]);
		}
	}				
	return retval;
}
function getDialekFromIdBahasa(idBahasa){
	var retval = new Array();
	for (key in data_dialek){
		if(data_dialek[key][8] == idBahasa){
			retval.push(data_dialek[key]);
		}
	}				
	return retval;			
}
function getIdBahasa(namaB){
	var retval;
	for (key in data_bahasa){
		if (data_bahasa[key][1]==namaB){
			retval=data_bahasa[key][0];
			break;
		}
	}
	
	return retval;
}
function getPadananFromKataInBahasa(kata, namaBahasa){
	var retval = new Array();
	var idKata = getIdKata(kata);
	var idBahasa = getIdBahasa(namaBahasa);
	for (key in data_padanan){
		if(data_padanan[key][2] == idBahasa && data_padanan[key][1] == idKata){
			retval.push(new Array(getBahasaFromIdBahasa(data_padanan[key][2]), data_padanan[key][3]));
		}
	}				
	//console.log(retval);
	return retval;							
}
function getPadananFromKataInProvince(kata, namaProvince){
	var idKata = getIdKata(kata);
	var idProvince = getIdProvince(namaProvince);
	var listIdBahasa = getListBahasaFromProvince(idProvince);
	var retval = new Array();
	for (key in data_padanan){
		for (key2 in listIdBahasa){
			if(data_padanan[key][2] == listIdBahasa[key2][0] && data_padanan[key][1] == idKata){
				retval.push(new Array(getBahasaFromIdBahasa(data_padanan[key][2]), data_padanan[key][3]));
			}
		}
	}				
	return retval;							
}
function getIdKata(kata){
	for (key in data_kata){
		if(kata.toLowerCase() == data_kata[key][1].toLowerCase()){
			return data_kata[key][0];
		}
	}
}
function getListBahasaFromProvince(idProvince){
	var retval = new Array();
	for (key in data_area_mapping){
		if(data_area_mapping[key][1] == idProvince){
			retval.push(data_area_mapping[key]);
		}
	}				
	return retval;				
}
function getBahasaFromIdBahasa(idBahasa){
	var bahasa;
	for (keyo in data_bahasa){
		if(idBahasa == data_bahasa[keyo][0]){
			bahasa = data_bahasa[keyo][1];
			break;
		}
	}
	return bahasa;			
}
function translasi(){
	var transkata = document.getElementById('translasi-kata').value;
	var bahasa = document.getElementById('selBahasa').value;
	var listKata = getPadananFromKataInBahasa(transkata, bahasa);
	console.log('listk='+listKata);
	var str = transkata+' ('+bahasa+'):';
	for (key in listKata){
		str += '\n'+listKata[key][1];
	}
	alert(str);

}