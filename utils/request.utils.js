module.exports = {
    isRequestValid(requiredFields, body, res) {
       for (let field of requiredFields) {
           if (!body[field]) {
               res.status(400).json({ msg: `Falta el campo ${field}` });
               return false;
           }
       }
       return true;
   },
 sendError500(res, error) {
    console.error(error); 
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
},

}