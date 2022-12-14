import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider, createClient } from 'urql';
import theme from '../theme';

const client = createClient({
	url: 'http://localhost:8000/graphql',
	fetchOptions: {
		credentials: 'include',
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
