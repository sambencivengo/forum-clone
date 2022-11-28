import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();

	let body = null;
	// data is loading
	if (fetching) {
		body = null;
		// user not logged in
	} else if (!data.me) {
		body = (
			<>
				<NextLink href={'/login'}>
					<Link color="white">Login</Link>
				</NextLink>
				<NextLink href={'/register'}>
					<Link color="white">Register</Link>
				</NextLink>
			</>
		);
		// user is logged in
	} else {
		body = (
			<>
				<Button variant="link">Logout</Button>
				<Box>{data.me.username}</Box>
			</>
		);
	}

	return (
		<Flex bg="tomato" p={4} ml={'auto'}>
			<Flex dir="row" gap={4} ml="auto">
				{body}
			</Flex>
		</Flex>
	);
};
