const mongoose = require('mongoose');

// Sử dụng chuỗi kết nối Legacy (không dùng +srv) để vượt qua lỗi chặn DNS SRV của mạng
const uri = 'mongodb://ductrivunguyen_db_user:l9jOah5TdSJB0zKG@ac-qatlfy8-shard-00-00.lkx6hka.mongodb.net:27017,ac-qatlfy8-shard-00-01.lkx6hka.mongodb.net:27017,ac-qatlfy8-shard-00-02.lkx6hka.mongodb.net:27017/shoppingonline?ssl=true&replicaSet=atlas-11jwfd-shard-0&authSource=admin&appName=Cluster0';

// Kết nối với MongoDB sử dụng cấu hình timeout an toàn
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => { 
    console.log('--- KẾT NỐI MONGODB THÀNH CÔNG DỰ ÁN SHOPPING ONLINE ---'); 
  })
  .catch((err) => { 
    console.error('--- LỖI KẾT NỐI MONGODB ---');
    console.error(err.message); 
  });