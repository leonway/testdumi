---
nav:
  title: Components
  path: /components
---

## MediaPreview

Demo:

<!-- <API></API> -->

```tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import MediaPreview from '@sky/media-preview';
import audio from '@sky/sort-media-upload/src/assets/png/audioPreview.png';

export default () => {
  const [show, setShow] = useState();
  return (
    <>
      <Button type="primary" onClick={() => setShow(true)}>
        点击查看预览
      </Button>
      <MediaPreview
        filePath={audio}
        title={'XXX'}
        visible={show}
        onClose={() => setShow(false)}
      />
    </>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
