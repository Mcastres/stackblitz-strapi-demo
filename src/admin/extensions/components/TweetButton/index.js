import React, { useEffect, useState } from 'react';
import { Button } from '@strapi/design-system/Button';
import Twitter from '@strapi/icons/Twitter';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

const TweetButton = () => {
  const { formatMessage } = useIntl();
  const { modifiedData, layout } = useCMEditViewDataManager();
  const allowedTypes = ['restaurant', 'article'];

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchPreviewurl = async () => {
      const res = await fetch('/api/preview', {
        method: 'GET',
        headers: {
          content: 'application/json',
        },
      });
      const data = await res.json();
      setPreviewUrl(data?.url);
    };
    fetchPreviewurl();
  }, [previewUrl]);

  if (!allowedTypes.includes(layout.apiID)) {
    return <></>;
  }

  const base = layout.apiID == 'restaurant' ? 'restaurants' : 'blog';

  const handleTweet = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${`${encodeURIComponent(
      modifiedData.seo.metaTitle
    )} (powered by Strapi)`}&url=${
      [previewUrl]
    }/${base}/${modifiedData.slug}`;

    window.open(tweetUrl, '_blank').focus();
  };

  const content = {
    id: 'components.TweetButton.button',
    defaultMessage: 'Share on Twitter',
  };

  return (
    <Button variant="secondary" startIcon={<Twitter />} onClick={handleTweet}>
      {formatMessage(content)}
    </Button>
  );
};

export default TweetButton;
