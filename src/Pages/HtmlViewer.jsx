import { useEffect, useRef } from 'react';

const HtmlViewer = ({ htmlString }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      doc.open();
      doc.write(htmlString);
      doc.close();
    }
  }, [htmlString]);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="550px"
      title="HTML Preview"
      style={{ border: 'none' }}
    />
  );
};

export default HtmlViewer;
