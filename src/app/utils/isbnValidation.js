import Joi from "joi-browser";

export const isbnJoi = Joi.extend(joi => ({
  base: joi.string(),
  name: "isbn",
  language: {
    valid: "needs to be a valid ISBN number"
  },
  // pre(value, state, options) {
  //     if (options.convert && this._flags.round) {
  //         return Math.round(value); // Change the value
  //     }

  //     return value; // Keep the value as it was
  // },
  rules: [
    {
      name: "valid",
      setup(params) {
        // this._flags.round = true; // Set a flag for later use
      },
      validate(params, value, state, options) {
        if (value.length !== 10 && value.length !== 13) {
          // Generate an error, state and options need to be passed
          return this.createError("isbn.valid", { v: value }, state, options);
        }

        const isbn = value.split("");
        let total = 0;

        if (value.length == 10) {
          let sum = 0;

          isbn.forEach(digit => {
            total += Number(digit);
            sum += total;
          });

          if (sum % 11 || sum === NaN) {
            return this.createError("isbn.valid", { v: value }, state, options);
          }
        } else {
          isbn.forEach((digit, index) => {
            if (index < 12) {
              total += (index % 2 ? 3 : 1) * Number(digit);
            }
          });

          const checkDigit = 10 - (total % 10);

          if (checkDigit !== Number(isbn[12]) || checkDigit === NaN) {
            return this.createError("isbn.valid", { v: value }, state, options);
          }
        }

        return value; // Everything is OK
      }
    }
  ]
}));
