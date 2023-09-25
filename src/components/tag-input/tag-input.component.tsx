import { useEffect, useState } from "react";
import { TagsInputContainer } from "./tag-input.styles";
import Tag, { TAG_TYPES } from "../tag-entry/tag.component";

interface TagInputProps {
  onTagAdded?: (tag: string, newTags: Set<string>) => void;
  onTagRemoved?: (tag: string, newTags: Set<string>) => void;
  onTagDuplicated?: (tag: string, tags: Set<string>) => void;
  defaultTags?: Set<string>;
}

// TODO: handle overflow of input field
/** 
 * TagInput component allows to enter text as tags. Duplicates are not allowed. 
 * Tags can be added via 'Enter' button or pasted from buffer.
 * Tags can be removed via remove (x) button, or via 'Backspace' key.
 * Optional callbacks are available to get notified about addition or removal of tags or addition of a duplicate entry.
 * @param { (tag: string, newTags: Set<string>) => void } onTagAdded - A callback param to get updates about added tag (optional)
 * @param { (tag: string, newTags: Set<string>) => void } onTagRemoved - A callback param to get updates about removed tag (optional)
 * @param { (tag: string, newTags: Set<string>) => void } onTagDuplicated - A callback param to get updates that duplicated tag entered (optional)
 * @param { Set<string> } defaultTags - A set of default tags to display during initial render (optional)
 */
const TagInput = ({ onTagAdded, onTagRemoved, onTagDuplicated, defaultTags }: TagInputProps) => {
  const [tags, setTags] = useState(defaultTags || new Set<string>());
  const [tagToRemove, setTagToRemove] = useState<string | undefined>(undefined);
  const [tagToAdd, setTagToAdd] = useState<string | undefined>(undefined);
  const [tagDuplicate, setTagDuplicate] = useState<string | undefined>(undefined);

  const getTagType = (tag: string) => {
    let tagType = TAG_TYPES.base;

    if (!tags.has(tag)) {
      tagType = TAG_TYPES.pulsingOnce;
    }

    if (tags.has(tag) && tagDuplicate === tag) {
      tagType = TAG_TYPES.pulsingOnce;
    }

    if (tagToRemove === tag) {
      tagType = TAG_TYPES.removing;
    }

    return tagType;
  }

  useEffect(() => {
    console.log('useEffect', tagToAdd, tagToRemove, tagDuplicate);

    const newTags = new Set<string>(tags);
    if (tagToAdd) {
      setTimeout(() => {
        newTags.add(tagToAdd);
        onTagAdded && onTagAdded(tagToAdd, newTags);
        setTagToAdd(undefined)
      }, 250);
    }

    if (tagToRemove) {
      setTimeout(() => {
        newTags.delete(tagToRemove);
        onTagRemoved && onTagRemoved(tagToRemove, newTags);
        setTagToRemove(undefined)
      }, 200);
    }

    if (tagDuplicate) {
      setTimeout(() => {
        onTagDuplicated && onTagDuplicated(tagDuplicate, newTags);
        setTagDuplicate(undefined)
      }, 1100);
    }

    setTags(newTags);

    // eslint-disable-next-line
  }, [tagToAdd, tagToRemove, tagDuplicate])

  const addHandler = (tag: string) => {
    if (!tags.has(tag))
      setTagToAdd(tag);
    else
      setTagDuplicate(tag);
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== '') {
      addHandler(e.currentTarget.value.trim());
      // TODO: bad practice modifying state of input inside handler.
      e.currentTarget.value = '';
    }

    if (e.key === "Backspace" && tags.size > 0 && e.currentTarget.value === "") {
      removeHandler([...tags].pop()!);
    }
  }

  const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData('text').trim();
    if (pasteText !== '') {
      addHandler(pasteText);
      (e.target as HTMLInputElement).value = '';
    }
  }

  const removeHandler = (tag: string) => {
    setTagToRemove(tag);
  }

  return (
    <TagsInputContainer>
      {[...tags].map(tag => {
        const type = getTagType(tag);
        return <Tag key={tag + type}
          onRemove={removeHandler}
          value={tag}
          type={type}
        />
      })}

      {tagToAdd &&
        <Tag key={tagToAdd + TAG_TYPES.pulsingOnce}
          value={tagToAdd}
          type={TAG_TYPES.pulsingOnce}
        />}

      {tagDuplicate &&
        <Tag key={tagDuplicate + TAG_TYPES.duplicate}
          value={tagDuplicate}
          type={TAG_TYPES.duplicate}
        />}

      <input type="text" className='tags-input__input' onPaste={pasteHandler} onKeyDown={keyPressHandler} />
    </TagsInputContainer>
  )
}

export default TagInput;