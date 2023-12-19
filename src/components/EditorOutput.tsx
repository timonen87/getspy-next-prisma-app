'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  // header: CustomHeaderRender,
};

const style = {
  paragraph: {
    fontSize: '14px',
    lineHeight: '1.5rem',
  },
  header: {
    h2: {
      fontSize: '1.2rem',
      lineHeight: '2rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.2rem',
      lineHeight: '2rem',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.2rem',
      lineHeight: '2rem',
      fontWeight: '600',
    },
  },
  list: {
    container: {},
    listItem: {
      listStyle: 'disc',
      listStylePosition: 'outside',
      marginLeft: '18px',
    },
  },
};

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-700 rounded-md p-4 overflow-auto">
      <code className="text-xs md:text-sm text-gray-100">{data.code}</code>
    </pre>
  );
}

// function CustomHeaderRender({ data }: any) {
//   data;

//   return (
//     <div>
//       <h2 className=" text-2xl">{data.h}</h2>
//     </div>
//   );
// }

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[25rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-xl"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
