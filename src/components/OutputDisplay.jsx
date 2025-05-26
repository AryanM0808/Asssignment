import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const OutputDisplay = ({ output }) => {
  if (!output) return null;

  const formatTwitterThread = (text) => {
    const twitterSection = text.split('2. LinkedIn Post:')[0].replace('1. Twitter Thread:', '').trim();
    return twitterSection.split('\n\n').filter(tweet => tweet.trim());
  };

  const formatLinkedInPost = (text) => {
    const linkedinSection = text.split('3. Instagram Caption:')[0].split('2. LinkedIn Post:')[1].trim();
    return linkedinSection;
  };

  const formatInstagramCaption = (text) => {
    const instagramSection = text.split('4. Newsletter Draft:')[0].split('3. Instagram Caption:')[1].trim();
    return instagramSection;
  };

  const formatNewsletterDraft = (text) => {
    const newsletterSection = text.split('4. Newsletter Draft:')[1].trim();
    return newsletterSection;
  };

  const content = output.candidates[0].content.parts[0].text;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <Tabs>
        <TabList className="flex border-b mb-4">
          <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-transparent hover:border-blue-500">Twitter Thread</Tab>
          <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-transparent hover:border-blue-500">LinkedIn Post</Tab>
          <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-transparent hover:border-blue-500">Instagram Caption</Tab>
          <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-transparent hover:border-blue-500">Newsletter</Tab>
        </TabList>

        <TabPanel>
          <div className="space-y-4">
            {formatTwitterThread(content).map((tweet, index) => (
              <div key={index} className="p-4 border rounded-lg bg-blue-50">
                <p className="text-gray-800">{tweet}</p>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="p-4 border rounded-lg bg-blue-50">
            <pre className="whitespace-pre-wrap font-sans text-gray-800">
              {formatLinkedInPost(content)}
            </pre>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="p-4 border rounded-lg bg-blue-50">
            <pre className="whitespace-pre-wrap font-sans text-gray-800">
              {formatInstagramCaption(content)}
            </pre>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="p-4 border rounded-lg bg-blue-50">
            <pre className="whitespace-pre-wrap font-sans text-gray-800">
              {formatNewsletterDraft(content)}
            </pre>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OutputDisplay;
