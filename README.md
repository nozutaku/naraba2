# naraba2�̊J�X�󋵂��Z���T(����J�E���^)�ɂČ��m���Aweb�y�[�W�ɂĕ\������I by CODE for NARA �`�[���ً}����

### �\��

Aruduino +�����Z���T��(http)��kintone �f�[�^�x�[�X

heroku���node.js�{express+ejs�ɂā@���Ihtml�\��(kintone��heroku postgres����f�[�^���擾���Ĕ��f)



### ����heroku���postgres�f�[�^�x�[�X�ݒ�菇

�@heroku���postgres DB�쐬
http://blog.w-hippo.com/entry/2017/03/01/Heroku%E3%81%A7%E7%84%A1%E6%96%99%E3%81%AEDB%28PostgreSQL%29%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B

�A��L�@��[View credential]�̓��e��windows��postgres shell�ɓ��͂����DB�ɐڑ�

�Bwindows��postgres shell�ɂĉ��L�R�}���h���͂���DB & data�쐬
CREATE TABLE settings (
  openstatus integer,
  likecount integer
);

INSERT INTO settings (openstatus, likecount) VALUES (
  0,
  0
);

�Cwindows��shell�ɂ�heroku�̊��ϐ��ݒ�
http://qiita.com/colorrabbit/items/18db3c97734f32ebdfde

heroku config:set HOST_NAME="������"
heroku config:set DATABASE_NAME="������"
heroku config:set USER_NAME="������"
heroku config:set PASSWORD="������"

�������heroku ��̃v���O��������A�N�Z�X�ł���͂��I


