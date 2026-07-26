const MyConstants = {
  DB_SERVER: 'cluster0.lkx6hka.mongodb.net',
  DB_USER: 'ductrivunguyen_db_user',
  DB_PASS: 'l9jOah5TdSJB0zKG',
  DB_DATABASE: 'shoppingonline',
  
  // Chuỗi kết nối trực tiếp 3 Shard Node (Danh sách Seed List chuẩn - KHÔNG dùng SRV)
  // Giúp bypass hoàn toàn lỗi querySrv ECONNREFUSED của nhà mạng/tường lửa
  DIRECT_URI: 'mongodb://ductrivunguyen_db_user:l9jOah5TdSJB0zKG@cluster0-shard-00-00.lkx6hka.mongodb.net:27017,cluster0-shard-00-01.lkx6hka.mongodb.net:27017,cluster0-shard-00-02.lkx6hka.mongodb.net:27017/shoppingonline?ssl=true&authSource=admin&retryWrites=true&w=majority',

  EMAIL_USER: 'user@hotmail.com',
  EMAIL_PASS: 'password_sample',
  JWT_SECRET: 'KHOA_BI_MAT_JWT',
  JWT_EXPIRES: '3600000'
};

module.exports = MyConstants;
