import React from 'react';
import { Form, Formik } from 'formik';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Box,
	Flex,
	Button,
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
				{({ isSubmitting }) => (
					<Form>
						<Flex flexDirection={'column'} gap={4}>
							{/* TODO: DRY IT UP */}
							<InputField name="username" label="Username" />
							<InputField
								name="password"
								label="Password"
								type="password"
							/>
						</Flex>
						<Button isLoading={isSubmitting} mt={4} type="submit">
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
