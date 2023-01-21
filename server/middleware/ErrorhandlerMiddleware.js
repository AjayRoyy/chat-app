const notFoundPage = (req, res , next)=>{
    const error = new Error("Entered url is wrong , please check it");
    const statusCode = 404;
    const page = `<h1>Page Not Found</h1>
    <div>
    <center>
    <h1>${statusCode}</h1>
    </center>
    </div>
    `;

    res.status(statusCode).send(page);
    next(error);

}

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        stack : process.env.NODE_ENV==="production" ?null : err.stack,
        error: err.message || "Server Error",
      });
}

module.exports= {
    notFoundPage, errorHandler
}