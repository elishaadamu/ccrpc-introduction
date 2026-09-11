"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import RpcChart from './RpcChart';
import RpcTable from './RpcTable';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
  baseUrl: string;
}

export default function MarkdownRenderer({ content, baseUrl }: MarkdownRendererProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Pre-process content to fix smart quotes
  const processedContent = content
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");

  // Robust parsing: Split content by <rpc-chart ...> and <rpc-table ...> tags
  const tagRegex = /<(rpc-chart|rpc-table)\b([^>]*?)(\/?)>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(processedContent)) !== null) {
    const before = processedContent.substring(lastIndex, match.index);
    if (before && before.trim() !== '') {
      parts.push(
        <div key={`md-${lastIndex}`} className="plandoc-markdown-block">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents(baseUrl, setLightboxImage)}
          >
            {before}
          </ReactMarkdown>
        </div>
      );
    }

    const tagName = match[1];
    const attrString = match[2];
    const isSelfClosing = match[3] === '/';
    
    const attrs: any = {};
    const attrRegex = /([a-z-]+)=["']([^"']*)["']/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    let csvUrl = attrs.url;
    if (csvUrl && !csvUrl.startsWith('/') && !csvUrl.startsWith('http')) {
      const cleanBase = baseUrl.replace(/^\/+|\/+$/g, '');
      csvUrl = `/${cleanBase}/${csvUrl}`;
    }

    if (tagName === 'rpc-chart') {
      parts.push(
        <div key={`chart-${match.index}`} className="margin-y-4">
          <RpcChart 
            url={csvUrl} 
            type={attrs.type || 'bar'} 
            title={attrs['chart-title'] || attrs.title} 
            source={attrs.source} 
            description={attrs.description}
            stacked={attrs.stacked === 'true'}
            yLabel={attrs['y-label']}
          />
        </div>
      );
    } else if (tagName === 'rpc-table') {
      parts.push(
        <div key={`table-${match.index}`} className="margin-y-4">
          <RpcTable 
            url={csvUrl} 
            title={attrs['table-title'] || attrs.title} 
            source={attrs.source} 
            description={attrs.description}
          />
        </div>
      );
    }

    lastIndex = tagRegex.lastIndex;
    if (!isSelfClosing) {
      const closeTag = `</${tagName}>`;
      const nextContent = processedContent.substring(lastIndex);
      const closeIdx = nextContent.indexOf(closeTag);
      if (closeIdx !== -1 && closeIdx < 50) {
        lastIndex += closeIdx + closeTag.length;
        tagRegex.lastIndex = lastIndex;
      }
    }
  }

  const remaining = processedContent.substring(lastIndex);
  if (remaining && remaining.trim() !== '') {
    parts.push(
      <div key={`md-${lastIndex}`} className="plandoc-markdown-block">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents(baseUrl, setLightboxImage)}
        >
          {remaining}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="markdown-content">
      {parts}
      
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          <img 
            src={lightboxImage} 
            alt="Lightbox" 
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '4px' }}
          />
          <button 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function getNodeText(node: any): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (node?.props?.children) return getNodeText(node.props.children);
  return '';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function markdownComponents(baseUrl: string, setLightboxImage: (src: string) => void) {
  return {
    h1: ({node, ...props}: any) => {
      const id = slugify(getNodeText(props.children));
      return (
        <h1 {...props} id={id} className="margin-top-0 margin-bottom-3" style={{ fontSize: '3.1rem', lineHeight: 1.2, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
          <span className="title">{props.children}</span>
        </h1>
      );
    },
    h2: ({node, ...props}: any) => {
      const id = slugify(getNodeText(props.children));
      return <h2 {...props} id={id} className="margin-top-5 margin-bottom-2" style={{ fontSize: '2.35rem', lineHeight: 1.25, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }} />;
    },
    h3: ({node, ...props}: any) => {
      const id = slugify(getNodeText(props.children));
      return <h3 {...props} id={id} className="margin-top-4 margin-bottom-2" style={{ fontSize: '1.75rem', lineHeight: 1.25, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }} />;
    },
    h4: ({node, ...props}: any) => {
      const id = slugify(getNodeText(props.children));
      return <h4 {...props} id={id} className="margin-top-3 margin-bottom-1" style={{ fontSize: '1.35rem', lineHeight: 1.3, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }} />;
    },
    p: ({node, ...props}: any) => <p {...props} className="margin-bottom-3" style={{ fontSize: '1.22rem', lineHeight: 1.75, maxWidth: '100%' }} />,
    ul: ({node, ...props}: any) => <ul {...props} className="markdown-list margin-left-4 margin-bottom-3" style={{ listStyleType: 'disc', maxWidth: '100%' }} />,
    ol: ({node, ...props}: any) => <ol {...props} className="markdown-list-ordered margin-left-4 margin-bottom-3" style={{ maxWidth: '100%' }} />,
    li: ({node, ...props}: any) => <li {...props} className="markdown-list-item margin-bottom-2" style={{ fontSize: '1.22rem', lineHeight: 1.75, maxWidth: '100%' }} />,
    a: ({node, ...props}: any) => {
      const href = (props.href || "") as string;
      let relativeHref = href
        .replace('https://ccrpc.gitlab.io/lrtp2045/', '/')
        .replace('https://ccrpc.gitlab.io/title-vi-2024/', '/')
        .replace(/\/$/, '');
      if (!relativeHref) relativeHref = '/';
      if (relativeHref.startsWith('/') || relativeHref.startsWith('#')) {
        return <Link href={relativeHref} className="usa-link" style={{ fontSize: 'inherit' }} {...props}>{props.children}</Link>;
      }
      return <a {...props} className="usa-link" target="_blank" rel="noopener noreferrer" style={{ fontSize: 'inherit' }}>{props.children}</a>;
    },
    table: ({node, ...props}: any) => (
      <div className="rpc-table-container margin-y-3">
        <table {...props} className="usa-table usa-table--striped width-full"  />
      </div>
    ),
    th: ({node, ...props}: any) => <th scope="col" style={{ fontSize: '0.875rem', padding: '0.5rem 0.65rem', fontWeight: 600, lineHeight: 1.35 }} {...props} />,
    td: ({node, ...props}: any) => <td style={{ fontSize: '0.875rem', padding: '0.45rem 0.65rem', lineHeight: 1.35 }} {...props} />,
    img: ({node, ...props}: any) => {
      const src = (props.src || "") as string;
      let fixedSrc = src;
      if (!src.startsWith('http') && !src.startsWith('/')) {
        const cleanBase = baseUrl.replace(/^\/+|\/+$/g, '');
        fixedSrc = `/${cleanBase}/${src}`;
      }
      return (
        <img 
          {...props} 
          src={fixedSrc} 
          className="usa-img margin-y-2 cursor-zoom-in" 
          onClick={() => setLightboxImage(fixedSrc)}
          style={{ cursor: 'zoom-in', maxWidth: '100%', height: 'auto' }}
        />
      );
    },
  } as any;
}
