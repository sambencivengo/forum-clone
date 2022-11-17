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
	label: string;
	placeHolder: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{props.label}</FormLabel>
			<Input {...field} id={field.name} placeholder="name" />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};
