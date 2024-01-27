'use client';
import { FC, useEffect, useState } from 'react';
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
    fontSize: '1.125rem',
    lineHeight: '1.8rem',
    margin: '0 0 1.125rem 0',
  },

  header: {
    h1: {
      fontSize: '1.875rem',
      marginBottom: '0.5rem',
      lineHeight: '1.75rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.5rem',
      lineHeight: '1.25rem',
      marginBottom: '0.5rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: '1.25rem',
      marginBottom: '0.5rem',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: '1.25rem',
      marginBottom: '0.5rem',
      fontWeight: '600',
    },
  },
  list: {
    container: {},
    listItem: {
      listStyle: 'disc',
      listStylePosition: 'outside',
      marginLeft: '2rem',
      fontSize: '1.125rem',
      lineHeight: '1.8rem',
      marginBottom: '0.2rem',
    },
  },
};
const styleMobile = {
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.2rem',
    margin: '0 0 1.125rem 0',
  },

  header: {
    h1: {
      fontSize: '1.675rem',
      marginBottom: '0.5rem',
      lineHeight: '1.45rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.5rem',
      margin: '1.125rem 0',
      lineHeight: '1.25rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1.5rem',
      margin: '1.125rem 0',
      lineHeight: '1.25rem',
      fontWeight: '600',
    },
    h4: {
      fontSize: '1.5rem',
      margin: '1.125rem 0',
      lineHeight: '1.25rem',
      fontWeight: '600',
    },
  },
  list: {
    container: {},
    listItem: {
      listStyle: 'disc',
      listStylePosition: 'outside',
      marginLeft: '18px',
      fontSize: '1.125rem',
      lineHeight: '1.8rem',
    },
  },
};

function CustomCodeRenderer({ data }: any) {
  data;
  return (
    <pre className="bg-gray-700 rounded-md p-4 overflow-auto mb-4">
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
  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    window
      .matchMedia('(max-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);
  return (
    <Output
      style={matches ? styleMobile : style}
      className="text-xl"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
