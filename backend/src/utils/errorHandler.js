class ApiError extends Error {
  constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
  ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = errors;

      if (stack) {
          this.stack = stack;
      } else {
          Error.captureStackTrace(this, this.constructor);
      }
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          errors: err.errors,
      });
  }

  const apiError = new ApiError(500, "Internal Server Error");
  return res.status(apiError.statusCode).json({
      success: false,
      message: apiError.message,
      errors: apiError.errors,
  });
};

export  { ApiError, errorHandler };
