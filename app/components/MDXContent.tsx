'use client';

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

/* eslint-disable @typescript-eslint/no-explicit-any */
const components = {
  h1: (props: any) => (
    <h1 
      {...props} 
      className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" 
    />
  ),
  h2: (props: any) => (
    <h2 
      {...props} 
      className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200" 
    />
  ),
  h3: (props: any) => (
    <h3 
      {...props} 
      className="text-xl font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200" 
    />
  ),
  p: (props: any) => (
    <p 
      {...props} 
      className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4" 
    />
  ),
  ul: (props: any) => (
    <ul 
      {...props} 
      className="list-disc list-inside mb-4 space-y-2 text-gray-600 dark:text-gray-300" 
    />
  ),
  ol: (props: any) => (
    <ol 
      {...props} 
      className="list-decimal list-inside mb-4 space-y-2 text-gray-600 dark:text-gray-300" 
    />
  ),
  li: (props: any) => (
    <li 
      {...props} 
      className="text-gray-600 dark:text-gray-300" 
    />
  ),
  a: (props: any) => (
    <a 
      {...props} 
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" 
    />
  ),
  blockquote: (props: any) => (
    <blockquote 
      {...props} 
      className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-300" 
    />
  ),
  code: (props: any) => (
    <code 
      {...props} 
      className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm text-gray-800 dark:text-gray-200" 
    />
  ),
  pre: (props: any) => (
    <pre 
      {...props} 
      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4 font-mono text-sm text-gray-800 dark:text-gray-200" 
    />
  ),
  strong: (props: any) => (
    <strong 
      {...props} 
      className="font-semibold text-gray-900 dark:text-white" 
    />
  ),
  em: (props: any) => (
    <em 
      {...props} 
      className="italic text-gray-800 dark:text-gray-200" 
    />
  ),
  hr: (props: any) => (
    <hr 
      {...props} 
      className="my-8 border-gray-200 dark:border-gray-700" 
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table 
        {...props} 
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" 
      />
    </div>
  ),
  th: (props: any) => (
    <th 
      {...props} 
      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" 
    />
  ),
  td: (props: any) => (
    <td 
      {...props} 
      className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300" 
    />
  ),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
} 