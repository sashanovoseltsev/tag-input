import React from 'react';
import { GlobalStyles } from './global.styles';
import TagInput from './components/tag-input/tag-input.component';

function App() {

  const onTagUpdate = (tags: Set<String>) => {
    console.log('Tags: ', tags);
  }

  return (
    <div className='centered-container'>
      <GlobalStyles />
      <h1>Tags Input</h1>
      <div className='main-container'>
        <TagInput onTagUpdate={onTagUpdate} defaultTags={new Set(['TagA'])} />
      </div>
    </div>
  );
}

export default App;
