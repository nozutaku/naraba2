# naraba2の開店状況をセンサ(えんカウンタ)にて検知し、webページにて表現する！ by CODE for NARA チーム緊急事態

### 構成

Aruduino +距離センサ→(http)→kintone データベース

heroku上にnode.js＋express+ejsにて　動的html表示(kintoneとheroku postgresからデータを取得して判断)



### 無料heroku上でpostgresデータベース設定手順

①heroku上でpostgres DB作成
http://blog.w-hippo.com/entry/2017/03/01/Heroku%E3%81%A7%E7%84%A1%E6%96%99%E3%81%AEDB%28PostgreSQL%29%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B

②上記①の[View credential]の内容をwindowsのpostgres shellに入力するとDBに接続

③windowsのpostgres shellにて下記コマンド入力してDB & data作成
CREATE TABLE settings (
  openstatus integer,
  likecount integer
);

INSERT INTO settings (openstatus, likecount) VALUES (
  0,
  0
);

④windowsのshellにてherokuの環境変数設定
http://qiita.com/colorrabbit/items/18db3c97734f32ebdfde

heroku config:set HOST_NAME="●●●"
heroku config:set DATABASE_NAME="●●●"
heroku config:set USER_NAME="●●●"
heroku config:set PASSWORD="●●●"

→これでheroku 上のプログラムからアクセスできるはず！


