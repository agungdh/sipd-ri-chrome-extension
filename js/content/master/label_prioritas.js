function singkron_prioritas_kab_lokal(){
	if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
		show_loading();
        var apiKey = x_api_key();
		relayAjax({
            url: config.sipd_url+'api/master/label_kokab/list',
			type: 'POST',
			data: {
				tahun: _token.tahun,
				id_daerah: _token.daerah_id,				
                // deleted_data: true,
                // order[0][column]: 0,
                // order[0][dir]: asc,
                // search[value]: '',
                length: 21307,
                start: 0,
			},
			beforeSend: function (xhr) {			    
				xhr.setRequestHeader("X-API-KEY", apiKey);
				xhr.setRequestHeader("x-access-token", _token.token);
			},
			success: function(data){
				pesan_loading('Simpan data Master Prioritas Kabupaten/Kota ke DB Lokal!');                
				var data_label = { 
					action: 'singkron_label_kokab',
					type: 'ri',
					tahun_anggaran: _token.tahun,
					api_key: config.api_key,
					label : {}
				};
				var _length = 250;
				var data_all = [];
				var data_temp = [];
				data.data.data.map(function(label, i){
					var data_label_temp = {};
					data_label_temp.id_prioritas = label.id_label_kokab;
                    data_label_temp.id_label_kokab = label.id_label_kokab;
					data_label_temp.id_unik = label.id_unik;
                    data_label_temp.is_locked = label.is_locked;
                    data_label_temp.nama_label = label.nama_label;
                    data_label_temp.teks_prioritas = label.nama_label;
                    data_label_temp.status = label.status;
					data_temp.push(data_label_temp);
					if((i+1)%_length == 0){
						data_all.push(data_temp);
						data_temp = [];
					}
				});
				if(data_temp.length >= 1){
					data_all.push(data_temp);
				}
				data_all.map(function(b, i){
					data_label.label = b;
					var data = {
					    message:{
					        type: "get-url",
					        content: {
							    url: config.url_server_lokal,
							    type: 'post',
							    data: data_label,
				    			return: false
							}
					    }
					};
					if(i == data_all.length-1){
						data.message.content.return = true;
					}
					chrome.runtime.sendMessage(data, function(response) {
					    console.log('responeMessage', response);
					});
				});
			}
		});
	}
}

function singkron_prioritas_prov_lokal(){
	if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
		show_loading();
        var apiKey = x_api_key();
		getuserbytoken().then(function(getuserbytoken){
			relayAjax({
				url: config.sipd_url+'api/master/label_prov/list',
				type: 'POST',
				data: {
					tahun: _token.tahun,
					id_daerah: getuserbytoken.id_prop,				
					// deleted_data: true,
					// order[0][column]: 0,
					// order[0][dir]: asc,
					// search[value]: '',
					length: 21307,
					start: 0,
				},
				beforeSend: function (xhr) {			    
					xhr.setRequestHeader("X-API-KEY", apiKey);
					xhr.setRequestHeader("x-access-token", _token.token);
				},
				success: function(data){
					pesan_loading('Simpan data Master Prioritas Provinsi ke DB Lokal!');
					var data_label = { 
						action: 'singkron_label_prov',
						type: 'ri',
						tahun_anggaran: _token.tahun,
						api_key: config.api_key,
						label : {}
					};
					var _length = 250;
					var data_all = [];
					var data_temp = [];
					data.data.data.map(function(label, i){
						var data_label_temp = {};
						data_label_temp.id_prioritas = label.id_label_prov;
						data_label_temp.id_label_prov = label.id_label_prov;
						data_label_temp.id_unik = label.id_unik;
						data_label_temp.is_locked = label.is_locked;
						data_label_temp.nama_label = label.nama_label;
						data_label_temp.teks_prioritas = label.nama_label;
						data_label_temp.status = label.status;
						data_temp.push(data_label_temp);
						if((i+1)%_length == 0){
							data_all.push(data_temp);
							data_temp = [];
						}
					});
					if(data_temp.length >= 1){
						data_all.push(data_temp);
					}
					data_all.map(function(b, i){
						data_label.label = b;
						var data = {
							message:{
								type: "get-url",
								content: {
									url: config.url_server_lokal,
									type: 'post',
									data: data_label,
									return: false
								}
							}
						};
						if(i == data_all.length-1){
							data.message.content.return = true;
						}
						chrome.runtime.sendMessage(data, function(response) {
							console.log('responeMessage', response);
						});
					});
				}
			});
		});		
	}
}

function singkron_prioritas_pusat_lokal(){
	if(confirm('Apakah anda yakin melakukan ini? data lama akan diupdate dengan data terbaru.')){
		show_loading();
        var apiKey = x_api_key();
		getuserbytoken().then(function(getuserbytoken){
			relayAjax({
				url: config.sipd_url+'api/master/label_pusat/list',
				type: 'POST',
				data: {
					tahun: _token.tahun,
					id_daerah: getuserbytoken.id_prop,				
					// deleted_data: true,
					// order[0][column]: 0,
					// order[0][dir]: asc,
					// search[value]: '',
					length: 21307,
					start: 0,
				},
				beforeSend: function (xhr) {			    
					xhr.setRequestHeader("X-API-KEY", apiKey);
					xhr.setRequestHeader("x-access-token", _token.token);
				},
				success: function(data){
					pesan_loading('Simpan data Master Prioritas Pusat ke DB Lokal!');
					var data_label = { 
						action: 'singkron_label_pusat',
						type: 'ri',
						tahun_anggaran: _token.tahun,
						api_key: config.api_key,
						label : {}
					};
					var _length = 250;
					var data_all = [];
					var data_temp = [];
					data.data.data.map(function(label, i){
						var data_label_temp = {};
						data_label_temp.id_prioritas = label.id_label_pusat;
						data_label_temp.id_label_pusat = label.id_label_pusat;
						data_label_temp.id_unik = label.id_unik;
						data_label_temp.is_locked = label.is_locked;
						data_label_temp.nama_label = label.nama_label;
						data_label_temp.teks_prioritas = label.nama_label;
						data_label_temp.tahun_awal = label.tahun_awal;
						data_label_temp.tahun_akhir = label.tahun_akhir;
						data_label_temp.set_urut = label.set_urut;
						data_temp.push(data_label_temp);
						if((i+1)%_length == 0){
							data_all.push(data_temp);
							data_temp = [];
						}
					});
					if(data_temp.length >= 1){
						data_all.push(data_temp);
					}
					data_all.map(function(b, i){
						data_label.label = b;
						var data = {
							message:{
								type: "get-url",
								content: {
									url: config.url_server_lokal,
									type: 'post',
									data: data_label,
									return: false
								}
							}
						};
						if(i == data_all.length-1){
							data.message.content.return = true;
						}
						chrome.runtime.sendMessage(data, function(response) {
							console.log('responeMessage', response);
						});
					});
				}
			});
		});
	}
}

function getuserbytoken(){    
    return new Promise(function(resolve, reject){  
		var apiKey = x_api_key();  	
		relayAjax({
			url: config.sipd_url+'api/master/user/getuserbytoken',                                    
			type: 'GET',	      				
			// processData: false,
			cache: true,
			beforeSend: function (xhr) {
			    xhr.setRequestHeader("authorization", "Bearer "+_token.token+'|'+_token.daerah_id+'|'+_token.user_id);
			    xhr.setRequestHeader("x-api-key", apiKey);
			    xhr.setRequestHeader("accept", 'application/json, text/plain, */*');
			},
	      	success: function(getuserbytoken){
	      		return resolve(getuserbytoken);
	      	}
	    });
    });
}