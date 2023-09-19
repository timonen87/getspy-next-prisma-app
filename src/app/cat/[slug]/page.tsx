// import { getAuthSession } from '@/lib/auth';
// import { db } from '@/lib/db';
// import { FC } from 'react';

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

// const page = async ({ params }: PageProps) => {
//   const { slug } = params;
//   const session = await getAuthSession();

//   const category = await db.category.findFirst({
//     where: { name: slug },
//     include: {
//       posts: {
//         include: {
//           author: true,
//           votes: true,
//           comments: true,
//           category: true,
//         },

//       },
//     },
//   });

//   return <div>page</div>;
// };

// export default page;
