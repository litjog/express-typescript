import { object, number, string } from 'zod';

const rules = {
  username: { min: 3, max: 20 },
  name: { min: 3, max: 30 },
};

export default object({
  username: string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be of type string',
  })
    .trim()
    .regex(/([a-zA-Z]+)/g, 'Username only contains alphabet')
    .min(
      rules.username.min,
      `Username must be atleast ${rules.username.min} characters long`
    )
    .max(
      rules.username.max,
      `Username cannot be more than ${rules.username.max} characters long`
    ),
  name: string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be of type string',
  })
    .trim()
    .min(
      rules.name.min,
      `Name must be atleast ${rules.name.min} characters long`
    )
    .max(
      rules.name.max,
      `Name cannot be more than ${rules.name.max} characters long`
    ),
  age: number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be of type number',
  })
    .positive('Age cannot be less than 1')
    .int('Age cannot be decimal')
    .min(18, 'You are too young')
    .max(100, 'You are too old'),
});
