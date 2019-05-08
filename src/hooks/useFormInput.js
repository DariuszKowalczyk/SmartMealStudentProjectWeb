import { useState } from 'react';

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };
  return { onChange, value };
};
