const bcrypt = require('bcrypt');

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = comparePassword;