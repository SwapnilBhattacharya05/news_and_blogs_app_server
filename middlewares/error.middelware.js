const errorMiddelware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.log(error);

    if (error.name === "CastError") {
      const message = `Resource not found`;
      error = new Error(message);
      error.statusCode = 404;
    }

    if (error.code === 11000) {
      const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
      error = new Error(message);
      error.statusCode = 400;
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });

    
  } catch (error) {
    next(error);
  }
};

export default errorMiddelware;
