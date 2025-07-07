import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HtmlViewer from './HtmlViewer.jsx';

const ViewHtmlPage = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const location = useLocation();
  const { fileName, containerName } = location.state || {};

  useEffect(() => {
    if (!fileName || !containerName) return;

    const fetchHtml = async () => {
      try {
        const formData = new FormData();
        formData.append('fileName', fileName);
        formData.append('containerName', containerName);
         const url = 'https://functionapptry.azurewebsites.net/api/getHTML'; // Update with your actual URL
        //const url = 'http://localhost:7071/api/getHTML'; // Use 

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch HTML');
        }

        const htmlText = await response.text();
        setHtmlContent(htmlText);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHtml();
  }, [fileName, containerName]);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 text-center text-gray-800">HTML Report</h2>
      {htmlContent ? (
        <HtmlViewer htmlString={htmlContent} />
      ) : (
        <p>Loading HTML...</p>
      )}
    </div>
  );
};

export default ViewHtmlPage;
