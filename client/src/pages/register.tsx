import React from 'react';
import { Form, Formik } from 'formik';
import { Flex, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';

interface RegisterProps {}

const REGISTER_MUT = `mutation Mutation($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    user {
      id, 
      username,
      createdAt,
      updatedAt, 
    }
    errors {
      field,
      message
    }
  }
}`;

const Register: React.FC<RegisterProps> = ({}) => {
	const [{}, register] = useMutation(REGISTER_MUT);
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={(values) => {
					return register(values);
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
