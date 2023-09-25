import React from 'react';
import { GlobalStyles } from './global.styles';
import TagInput from './components/tag-input/tag-input.component';

function App() {

  const onTagAdded = (tag: string, tags: Set<String>) => {
    console.log('Tag added:', tag, 'Tags:', tags);
  }

  const onTagRemoved = (tag: string, tags: Set<String>) => {
    console.log('Tag removed:', tag, 'Tags:', tags);
  }

  const onTagDuplicated = (tag: string, tags: Set<String>) => {
    console.log('Tag duplicated:', tag, 'Tags:', tags);
  }

  return (
    <div className='centered-container'>
      <GlobalStyles />
      <h1>Tags Input</h1>
      <div className='main-container'>
        <TagInput
          onTagAdded={onTagAdded}
          onTagRemoved={onTagRemoved}
          onTagDuplicated={onTagDuplicated}
          defaultTags={new Set(['TagA'])} />
      </div>
    </div>
  );
}

export default App;
