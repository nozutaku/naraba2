var http = require('http');
var request = require('request');
var fs = require('fs');

var server = http.createServer();
server.on('request', doRequest);
server.listen(process.env.PORT, process.env.IP);
console.log('Server running!');

//===== 設定(ここから) =======================================
var PLACE_LATITUDE = "34.8760";     //naraba^2の場所（緯度） ★暫定
var PLACE_LONGITUDE = "135.8760";   //naraba^2の場所（経度） ★暫定
var IMAGE_OPEN = "image_open.jpg";
var IMAGE_NOT_OPEN = "image_not_open.jpg";
var STRING_OPEN = "naraba^2 OPENしてるよ～。早く来て！";
var STRING_NOT_OPEN = "naraba^2 まだOPENしてないよ。もうちょっと待って";
//===== 設定(ここまで) =======================================

var last_update;

// リクエストの処理
function doRequest(req, res) {

	// KintoneDBから取得
	var options = {
		url: 'https://v2urc.cybozu.com/k/v1/records.json?app=17',
		headers: {'X-Cybozu-API-Token': '4DRIq9OCEiwk8pqAkYN5WG5tmQ41QZ5Mak8FRBli'},
		json: true
	};
	request.get(options, function(error, response, body){
		if(!error && response.statusCode == 200){
				console.log("get success!");


				//ファイルを同期型で読む
				var data = fs.readFileSync('./index.html', 'UTF-8');

				var num = Object.keys(body.records).length;
				console.log("num = " + num);
				var total_count=0;
				var today_count=0;
                var today_is=0;

				for (var i = 0; i < num; i++){

					today_is = isToday2( body.records[i].time.value,
                                          body.records[i].latitude.value,
                                          body.records[i].longitude.value );
                    

                    if(today_is == 1)   break;
				}

//				console.log("total_count = " + total_count);
				
				//出力！
                var open_status_image;
                if( today_is == 1 ){
                    open_status_image = IMAGE_OPEN;
                    open_status_string = STRING_OPEN;
                }
                else{
                    open_status_image = IMAGE_NOT_OPEN;
                    open_status_string = STRING_NOT_OPEN;
                }
            
            console.log("open_status_string="+open_status_string+"today_is="+today_is);
            
/*
				var string1 = "today = " + String(today_count);
				var string2 = "total = " + String(total_count);

	            var data2 = data.
	                replace(/@content1@/g, string1).
	                replace(/@content2@/g, string2);
*/
                var data2 = data.
	                replace(/@content1@/g, open_status_string).
	                replace(/@content2@/g, open_status_image);

            
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data2);
				res.end();


		}else{
			console.log('error: ' + response.statusCode);
		    res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('sorry, I can NOT get DB.\n');
			res.end();

		}
	});





/*********** DB読み出しが非同期処理のためうまくいかない(ここから) *****
	fs.readFile('./index.html', 'UTF-8',
		function(err, data){

			var count = getDB();
			console.log("before show count = " + count);

			if( count != 0){
				var string1 = "today = xx  <- coming soon";
				var string2 = "total = " + String(count);


	            var data2 = data.
	                replace(/@content1@/g, string1).
	                replace(/@content2@/g, string2);

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data2);
				res.end();
			}
		});
********** DB読み出しが非同期処理のためうまくいかない(ここまで) ******/

}

// kintone databaseから情報を取り出す（本処理をメイン処理doRequestに入れるので下記利用しない）
function getDB(){


	// KintoneDBから取得
	var options = {
		url: 'https://v2urc.cybozu.com/k/v1/records.json?app=17',
		headers: {'X-Cybozu-API-Token': '4DRIq9OCEiwk8pqAkYN5WG5tmQ41QZ5Mak8FRBli'},
		json: true
	};
	request.get(options, function(error, response, body){
		if(!error && response.statusCode == 200){
				console.log("get success!");

				var num = Object.keys(body.records).length;
				console.log("num = " + num);
				var total_count=0;

				for (var i = 0; i < num; i++){

					total_count = total_count + parseInt(body.records[i].count.value);
					last_update = body.records[i].time.value;

//					console.log("count = " + body.records[i].count.value);
//					console.log("time = " + body.records[i].time.value);
				}

				console.log("total_count = " + total_count);
				return(parseInt(total_count));

/*
				console.log("lat = " + body.records[0].latitude.value);
				console.log("lon = " + body.records[0].longitude.value);
				console.log("count = " + body.records[0].count.value);
				console.log("time = " + body.records[0].time.value);
*/

		}else{
			console.log('error: ' + response.statusCode);

		}
	});

return(0);

}

function isToday( iso_date ){	// "2015-12-16T20:29:00Z"というString
	var ret;

	iso_date_formatted = new Date( iso_date );
	nowDate = new Date();
	
//	console.log("iso_date_formatted = " + iso_date_formatted.getDate() );
//	console.log("nowDate = " + nowDate.getDate() );

	if( iso_date_formatted.getDate() == nowDate.getDate() ){
		ret = 1;
	}else{
		ret = 0;
	}
//    console.log("isToday="+ret);
	
	return( ret );

}
function isToday2( iso_date, latitude, longitude ){	// "2015-12-16T20:29:00Z"というString
	var ret=0;
    
//    console.log("parseFloat(latitude)="+parseFloat(latitude) + "parseFloat(longitude)="+parseFloat(longitude));

    

    if( isToday( iso_date ) == 1 ){
        if(( parseFloat(latitude) == parseFloat(PLACE_LATITUDE) ) 
           && ( parseFloat(longitude) == parseFloat(PLACE_LONGITUDE) )){
            ret = 1;
        }
        console.log("isToday2="+ret+" parseFloat(latitude)="+parseFloat(latitude) + " parseFloat(longitude)="+parseFloat(longitude));
    }
//    console.log("isToday2="+ret);

	return( ret );

}

