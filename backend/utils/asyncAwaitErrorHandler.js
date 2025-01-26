const asyncAwaitErrorHandler = (asyncAwaitErrorsArgumentFunction) => (req,res,next) =>{
    Promise.resolve(asyncAwaitErrorsArgumentFunction(req,res,next)).catch(next)
}

export default asyncAwaitErrorHandler