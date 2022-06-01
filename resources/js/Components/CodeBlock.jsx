import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = {
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '') ?? [ 'language-js', 'js']
        return !inline && match ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={oneDark}
                language={match[1]}
                {...props}
            />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

export default CodeBlock
