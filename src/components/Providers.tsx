'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { FC } from 'react';

interface ProvidersProps {}

const Providers: FC<ProvidersProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;

// "use client";

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { SessionProvider } from "next-auth/react";
// import { FC, ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
// }

// const queryClient = new QueryClient();

// const Providers: FC<LayoutProps> = ({ children }) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SessionProvider>{children}</SessionProvider>
//     </QueryClientProvider>
//   );
// };

// export default Providers;
