import React from 'react';
import { Form, Formik } from 'formik';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values) => console.log(values)}
			>
				{({ values, handleChange }) => (
					<Form>
						{/* TODO: DRY IT UP */}
						<InputField
							name="username"
							placeHolder="username"
							label="Username"
						/>
						<InputField
							name="password"
							placeHolder="password"
							label="Password"
							type="password"
						/>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
