const db = require('../database/db')


//creating a user
exports.createUser = async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users(username, password, email) VALUES (?, ?, ?)`;
    //adding user details to database
    return new Promise((resolve, reject) => {
        db.query(sql, [username, hashedPassword, email], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

exports.loginUser =  (username, password,) => {
    const sql = `SELECT * users WHERE username =?`;
    //adding user details to database
    return new Promise((resolve, reject) => {
        db.query(sql, [username], async(err, result) => {
            if (err) {
                reject(err);
            } else {
                const user = result[0];
                if (user && await bcrypt.compare(password, user.password)) {
                    resolve(user)
                } else {
                    resolve(null)
                }
            }
        });
    });
}


//checking if username exist 
exports.usernameExists = async (username) => {
    const sql = `SELECT * FROM users WHERE usaername = ? `;
    //adding user details to database
    return new Promise((resolve, reject) => {
        db.query(sql, [username], (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result.length > 0)
        })
    })
}

//checking if email exists
exports.emailExists =  (email) => {
    const sql = `SELECT 1 FROM users WHERE usaername = ? `;
    //adding user details to database
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result.length > 0, result)
        })
    })
}