import React from 'react';
import { Form, Formik } from 'formik';
import { Flex, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [{}, login] = useLoginMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await login({ options: values });
					const { errors, user } = response.data.;
					if (errors) {
						setErrors(toErrorMap(errors));
					} else if (response.data.register.user) {
						router.push('/');
					}
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

export default Login;
