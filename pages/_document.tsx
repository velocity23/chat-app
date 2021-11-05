import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '@emotion/server';

export default function ChatDocument() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export const getIntialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx);
    const critical = extractCritical(initialProps.html);
    initialProps.html = critical.html;
    initialProps.styles = (
        <>
            {initialProps.styles}
            <style
                data-emotion-css={critical.ids.join(' ')}
                dangerouslySetInnerHTML={{ __html: critical.css }}
            />
        </>
    );

    return initialProps;
};
