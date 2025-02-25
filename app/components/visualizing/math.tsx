'use client';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';

// @ts-ignore - Katex is not typed
import renderMathInElement from 'katex/dist/contrib/auto-render';

export default function KatexSpan({ text, ...delegated }: { text: string }) {
  const katexTextRef = useRef(null);
  useEffect(() => {
    if (katexTextRef.current) {
      renderMathInElement(katexTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [text]);

  return (
    <div ref={katexTextRef} {...delegated}>
      {text}
    </div>
  );
}
