// Define the addUser function
module.exports.addPayment = async function (payment) {

  const lengthObj = Object.keys(payment).length;
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.run(
        `INSERT INTO payments (${Object.keys(payment).toString()}) 
               VALUES 
                  (${Array.from({ length: lengthObj }, () => "?").join(",")})`,
        Object.values(payment),
        (err, data) => {
          console.log("data--" , err, data);
          if (err) {
            console.error("Error inserting payment:", err);
            reject(err);
          } else {
            console.info("payment inserted");
            resolve(true);
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

// Define the getPayment function
module.exports.getPayment = async function (id, status, email, username) {
  try {
    
    let sql = "SELECT u.username, u.email, p.* FROM payments p JOIN users u ON p.user_id = u.id WHERE 1=1";
    const conVAl = [];

    if (id) {
      sql += " AND p.id = ?";
      conVAl.push(id);
    }

    if (status) {
      sql += " AND p.status = ?";
      conVAl.push(status);
    }

    if (email) {
      sql += " AND u.email = ?";
      conVAl.push(email);
    }

    if (username) {
      sql += " AND u.username = ?";
      conVAl.push(username);
    }



    return await new Promise((resolve, reject) => {
      dbConnection.all(sql, conVAl, (err, row) => {
        if (err) {
          console.error("Error fetching payment:", err);
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
module.exports.updatePayment = async function (paymentId, params) {
  try {
    let conVals = [];
    let setClause = "";

    // Generate SET clause dynamically based on params
    Object.keys(params).forEach((key, index) => {

      setClause += `${key} = ?`;

      conVals.push(params[key]);

      if (index !== Object.keys(params).length - 1) {
        setClause += ", ";
      }

    });

    // Add paymentId to the conVals array
    conVals.push(paymentId);

    // Execute the UPDATE query
    await new Promise((resolve, reject) => {
      dbConnection.run(
        `UPDATE payments SET ${setClause} WHERE id = ?`,
        conVals,
        (err) => {
          if (err) {
            console.error("Error updating payment:", err);
            reject(err);
          } else {
            console.info("payment updated");
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
module.exports.getPaymentsByUserId = async function (userId ) {
  try {
      const user = await new Promise((resolve, reject) => {
          dbConnection.get(
              "SELECT * FROM payments WHERE user_id = ? ",
              [userId],
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


// Define the getUserByUsernameAndEmail function
module.exports.getUserByUsernameAndEmail = async function (username, email) {
  try {
    const user = await new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE username = ? `;
      console.error('err',sql)
        
      dbConnection.get(
        sql, 
        [ username ],
        (err, row) => {
          if (err) {
            console.error('err', err)
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


// Define the updatePaymentStatus function
module.exports.updatePaymentStatus = async function (paymentId, status) {
  try {
    await new Promise((resolve, reject) => {
      dbConnection.run( `UPDATE payments SET status = ? ,update_at = '${ new Date().toISOString() }' WHERE id = ?`,
        [status, paymentId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};