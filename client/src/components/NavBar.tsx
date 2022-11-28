import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	return (
		<Flex bg="tomato" p={4} ml={'auto'}>
			<Flex dir="row" gap={4} ml="auto">
				<NextLink href={'/login'}>
					<Link color="white">Login</Link>
				</NextLink>
				<NextLink href={'/register'}>
					<Link color="white">Register</Link>
				</NextLink>
			</Flex>
		</Flex>
	);
};
