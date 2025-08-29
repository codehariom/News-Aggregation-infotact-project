class apiError extends Error{
    constructor(
        statusCode,
        message="Somthing Went Wrong",
        error=[],
        stack=""
    )
    {
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.error=error
        this.stack=stack

        if(stack){
            this.stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default apiError