import React, { useEffect, useState } from 'react';
import { Button } from '@strapi/design-system/Button';
import Eye from '@strapi/icons/Eye';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

const PreviewButton = () => {
  const { formatMessage } = useIntl();
  const { modifiedData, layout } = useCMEditViewDataManager();

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

  const bannedApiID = ['category'];

  if (bannedApiID.includes(layout.apiID)) {
    return null;
  }

  const handlePreview = () => {
    const url = `${previewUrl}/api/preview?secret=ARNFCb9zrC9ZHm5hZzCigWivD40icS4s&slug=${modifiedData.slug}&locale=${modifiedData.locale}&apiID=${layout.apiID}&kind=${layout.kind}`;

    window.open(url, '_blank').focus();
  };

  const content = {
    id: 'components.PreviewButton.button',
    defaultMessage: 'Preview',
  };

  return (
    <>
      <Button variant="secondary" startIcon={<Eye />} onClick={handlePreview}>
        {formatMessage(content)}
      </Button>
    </>
  );
};

export default PreviewButton;
