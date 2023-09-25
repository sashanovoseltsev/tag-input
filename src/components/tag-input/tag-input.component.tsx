import { useState } from "react";
import TagEntry from "../tag-entry/tag-entry.component";
import { TagsInputContainer } from "./tag-input.styles";

// TODO:
// 1) Detect duplicate tags and register duplicate tag for removal - DONE
// 2) When width overflow happens TagsInputContainer should scale vertically with new rows - Not started

interface Props {
  onTagUpdate?: (tags: Set<string>) => void;
  defaultTags?: Set<string>;
}

const TagInput = ({ onTagUpdate, defaultTags }: Props) => {
  const [tags, setTags] = useState(defaultTags || new Set<string>());
  const [tagToRemove, setTagToRemove] = useState<string | undefined>(undefined);
  const [duplicateTag, setDuplicateTag] = useState<string | undefined>(undefined);

  const addTag = (tag: string) => {
    if (!tags.has(tag)) {
      const newTags = new Set(tags.add(tag));
      setTags(newTags);
      onTagUpdate && onTagUpdate(newTags);
    } else {
      setDuplicateTag(tag);
    }
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== '') {
      addTag(e.currentTarget.value.trim());
      e.currentTarget.value = '';
    }

    if (e.key === "Backspace" && tags.size > 0 && e.currentTarget.value === "") {
      setTagToRemove([...tags].pop());
    }
  }

  const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData('text').trim();
    if (pasteText !== '') {
      addTag(pasteText);
      (e.target as HTMLInputElement).value = '';
    }
  }

  const removeHandler = (tag: string) => {
    if (tags.delete(tag)) {
      const newTags = new Set(tags);
      setTags(newTags);
      tagToRemove && setTagToRemove(undefined);
      onTagUpdate && onTagUpdate(newTags);
    }
  }

  const removeDuplicateHandler = () => {
    setDuplicateTag(undefined);
  }

  return (
    <TagsInputContainer>
      {[...tags].map(tag =>
      (<TagEntry
        key={tag}
        value={tag}
        toBeRemoved={tagToRemove === tag}
        isDuplicated={tag === duplicateTag}
        removeCallback={removeHandler} />))}

      {duplicateTag &&
        <TagEntry
          key={'duplicate'}
          value={duplicateTag}
          isDuplicate={true}
          duplicateCallback={removeDuplicateHandler} />}

      <input type="text" className='tags-input__input' onPaste={pasteHandler} onKeyDown={keyPressHandler} />
    </TagsInputContainer>
  )
}

export default TagInput;