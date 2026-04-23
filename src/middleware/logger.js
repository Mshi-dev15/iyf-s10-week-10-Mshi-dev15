const logger = (req, res, next)=>{
    console.log(`${new Date().toISOString()} - ${req.method} ${req.Url}`);
    next();
};

module.exports = logger;