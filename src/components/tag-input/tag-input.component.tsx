import { useEffect, useState } from "react";
import { TagsInputContainer } from "./tag-input.styles";
import Tag, { TAG_TYPES } from "../tag-entry/tag.component";

interface Props {
  onTagUpdate?: (tags: Set<string>) => void;
  defaultTags?: Set<string>;
}

const TagInput = ({ onTagUpdate, defaultTags }: Props) => {
  const [tags, setTags] = useState(defaultTags || new Set<string>());
  const [tagToRemove, setTagToRemove] = useState<string | undefined>(undefined);
  const [tagToAdd, setTagToAdd] = useState<string | undefined>(undefined);
  const [tagDuplicate, setTagDuplicate] = useState<string | undefined>(undefined);

  var defaultTagsToRender: [string, TAG_TYPES][] = [];
  if (defaultTags) {
    defaultTags.forEach(dt => defaultTagsToRender.push([dt, TAG_TYPES.base]));
  }
  const [tagsToRender, setTagsToRender] = useState<[string, TAG_TYPES][]>(defaultTagsToRender);

  const getTagType = (tag: string) => {
    var tagType = TAG_TYPES.base;

    if (!tagsToRender.some(kv => kv[0] === tag)) {
      tagType = TAG_TYPES.pulsingOnce;
    }

    if (tagDuplicate === tag && tagsToRender.some(kv => kv[0] === tag)) {
      tagType = TAG_TYPES.pulsingOnce;
    }

    if (tagToRemove === tag) {
      tagType = TAG_TYPES.removing;
    }

    return tagType;
  }

  useEffect(() => {
    const newTags: [string, TAG_TYPES][] = [];

    [...tags].forEach(tag => {
      newTags.push([tag, getTagType(tag)]);
    });

    if (tagToAdd)
      newTags.push([tagToAdd!, TAG_TYPES.pulsingOnce]);

    if (tagDuplicate)
      newTags.push([tagDuplicate!, TAG_TYPES.duplicate]);

    setTagsToRender(newTags);

    // eslint-disable-next-line
  }, [tagToRemove, tagToAdd, tagDuplicate]);

  useEffect(() => {
    const newTags = new Set<string>(tags);
    if (tagToRemove) {
      newTags.delete(tagToRemove);
      setTimeout(() => setTagToRemove(undefined), 200);
    }

    if (tagToAdd) {
      newTags.add(tagToAdd);
      setTimeout(() => setTagToAdd(undefined), 250);
    }

    if (tagDuplicate) {
      setTimeout(() => setTagDuplicate(undefined), 1100);
    }

    if (onTagUpdate && tags.size !== newTags.size)
      onTagUpdate(newTags);

    setTags(newTags);

    // eslint-disable-next-line
  }, [tagsToRender])

  const addHandler = (tag: string) => {
    if (!tags.has(tag))
      setTagToAdd(tag);
    else
      setTagDuplicate(tag);
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== '') {
      addHandler(e.currentTarget.value.trim());
      e.currentTarget.value = '';
    }

    if (e.key === "Backspace" && tags.size > 0 && e.currentTarget.value === "") {
      removeHandler([...tags].pop()!);
    }
  }

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedTagValue = (e.target as HTMLSpanElement).parentElement?.firstChild?.textContent;
    if (clickedTagValue)
      removeHandler(clickedTagValue);
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
    <TagsInputContainer onClick={onClickHandler}>
      {[...tagsToRender].map(tag => (
        <Tag
          key={tag[0] + tag[1]}
          value={tag[0]}
          type={tag[1]} />))
      }

      <input type="text" className='tags-input__input' onPaste={pasteHandler} onKeyDown={keyPressHandler} />
    </TagsInputContainer>
  )
}

export default TagInput;