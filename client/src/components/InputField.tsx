import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel>First name</FormLabel>
			<Input {...field} id={field.name} placeholder="name" />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};
