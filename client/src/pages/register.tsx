import React from 'react';
import { Form, Formik } from 'formik';
import { Flex, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const [{}, register] = useRegisterMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					const { errors, user } = response.data.register;

					if (errors) setErrors(toErrorMap(errors));
				}}
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
