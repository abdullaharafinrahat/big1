export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    req.validatedBody = result.data;
    next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Query Parameters',
        details: result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    req.validatedQuery = result.data;
    next();
  };
}
