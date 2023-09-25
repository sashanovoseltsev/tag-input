# tag-input
Test React TS project with basic implementation of TagInput component.

Inspired by https://yaireo.github.io/tagify/.

# Installation
This solution was created using: _npx create-react-app my-ts-app --template typescript_

To start it cd to root folder (tags-input) and execute: 
- npm install
- npm start

# Components
- TagEntry component representing single tag
  - todo
- TagInput wrapper component containing entered tags and input field
  - Tags can be added by hittinh 'Enter' or via paste from buffer.
  - Tags can be removed by hitting 'Backspace' or mouse click on X button on TagEntry.
  - Duplicate tags (case sensitive) are not allowed. If duplicate tag is entered it will be removed with special animation.

 # Missing features
 - Overwflow handling

# Testing
Only started. Currently only 2 jest tests are prepared for TagEntry.
