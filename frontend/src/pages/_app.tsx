import { AppProps } from 'next/app';

import { Root } from 'components/pages/_app/Root';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ONE_MINUTE } from 'services/constants/staleTime';
import '../styles/global.css';
import '../public/fonts.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/style.css';

import { ListAndMapProvider } from 'modules/map/ListAndMapContext';
import useCustomRegisterServiceWorker from 'hooks/useCustomRegisterServiceWorker';
import { Layout } from 'components/Layout/Layout';
import { useState } from 'react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: ONE_MINUTE,
          },
        },
      }),
  );

  useCustomRegisterServiceWorker();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Root>
          <ListAndMapProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ListAndMapProvider>
        </Root>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
