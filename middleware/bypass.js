
//BYPASS MIDDLEWARE
const bypass = (req,res,next) =>
{
    next();
}

module.exports = bypass