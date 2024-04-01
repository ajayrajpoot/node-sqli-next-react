const bcrypt = require('bcrypt');
// Define the addUser function
module.exports.addUser = async function (user) {

  user.password = await bcrypt.hash(user.password, 10);

  const lengthObj = Object.keys(user).length;
  try {

    return await new Promise((resolve, reject) => {
      dbConnection.run(
        `INSERT INTO users (${Object.keys(user).toString()}) 
               VALUES 
                  (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(user),
        (err, data) => {
          console.log("data--" , err, data);
          if (err) {
            console.error("Error inserting user:", err);
            reject(err);
          } else {
            console.info("User inserted");
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

// Define the getUser function
module.exports.getUser = async function (params) {
  try {
    let conVAl = [];
    let sql = `SELECT * FROM users WHERE `;
    if (params?.id) {
      sql += `id = ?`;
      conVAl.push(params.id);
    }
    sql += "1=1";


    return await new Promise((resolve, reject) => {
      dbConnection.all(sql, conVAl, (err, row) => {
        if (err) {
          console.error("Error fetching user:", err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
 
  } catch (err) {
    throw err;
  }
};

// Define the updateUser function
module.exports.updateUser = async function (userId, params) {
  try {
    let conVals = [];
    let setClause = "";

    if(params.password)
      params.password = await bcrypt.hash(params.password, 10);

    // Generate SET clause dynamically based on params
    Object.keys(params).forEach((key, index) => {

      setClause += `${key} = ?`;

      conVals.push(params[key]);

      if (index !== Object.keys(params).length - 1) {
        setClause += ", ";
      }

    });

    // Add userId to the conVals array
    conVals.push(userId);

    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `UPDATE users SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating user:", err);
            reject(err);
          } else {
            console.info("User updated");
            resolve(true);
          }
        }
      );
    });

  } catch (err) {
    throw err;
  }
};

// Define the getUserByUsernameAndPassword function
module.exports.getUserByUsernameAndPassword = async function (username) {
  try {
      const user = await new Promise((resolve, reject) => {
          dbConnection.get(
              "SELECT * FROM users WHERE username = ? and isAdmin = 1",
              [username],
              (err, row) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(row);
                  }
              }
          );
      });
      return user;
  } catch (err) {
      throw err;
  }
};

module.exports.deleteUser = async function (id) {
  try {
      const user = await new Promise((resolve, reject) => {
          dbConnection.get(
              "DELETE FROM users WHERE id = ?",
              [id],
              (err, row) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(row);
                  }
              }
          );
      });
      return user;
  } catch (err) {
      throw err;
  }
};