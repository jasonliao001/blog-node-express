const { validationResult, check } = require('express-validator/check');
exports.Reply = (req, res, key) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  //   if (!result.isEmpty()) {
  //     res.json({
  //       code: 400,
  //       message: result.mapped()[key]
  //     });
  //   }
  try {
    result.throw();
    // Oh look at ma' success! All validations passed!
  } catch (err) {
    console.log(err.mapped()); // Oh noes!
  }
};
exports.check = check;
