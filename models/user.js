"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // definisi model
        // boleh juga definisikan asosiasi disini (saya berniat memisahinya)
        
    }
    User.init(
        {
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    User.beforeCreate(async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    /*
       - User.beforeCreate --> hook Sequelize beforeCreate
       Hooks ini memungkinkan Anda menetapkan tindakan tertentu sebelum atau sesudah suatu event, dalam hal ini 
       sebelum instance User dibuat dan disimpan ke dalam database.

       - async (user, options) => { ... } 
       Ini adalah fungsi yang akan dijalankan sebelum pembuatan instance User. Fungsi ini menerima dua parameter: 
       user (instance User yang sedang dibuat) dan options (opsional, berisi opsi tambahan).

       - const hashedPassword = await bcrypt.hash(user.password, 10);
       Ini adalah langkah untuk meng-hash password sebelum disimpan. 
       Fungsi bcrypt.hash digunakan untuk menghasilkan hash password dengan menggunakan algoritma bcrypt. 
       Nilai 10 yang diberikan sebagai argumen adalah jumlah putaran (rounds) untuk algoritma bcrypt, 
       yang dapat disesuaikan sesuai kebutuhan keamanan.

       - user.password = hashedPassword; 
       Setelah mendapatkan hash password, nilainya ditempatkan kembali ke properti password pada instance User. 
       Dengan ini, nilai password yang sebenarnya tidak akan disimpan di database, melainkan hanya hash-nya.
    */
    return User;
};