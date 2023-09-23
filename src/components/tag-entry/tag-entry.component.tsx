import { useCallback, useEffect, useState } from "react";
import { TagEntryBtn, TagEntryContainer } from "./tag-entry.styles";

interface Props {
  value: string;
  removeCallback?: (tag: string) => void;
  duplicateCallback?: () => void;
  toBeRemoved?: boolean;
  isDuplicate?: boolean;
  isDuplicated?: boolean;
}

const TagEntry = ({ value, toBeRemoved, removeCallback, duplicateCallback, isDuplicate, isDuplicated }: Props) => {
  const [remove, setRemove] = useState(false);
  const [restrictAppearAnimation, setRestrictAppearAnimation] = useState(false);

  const removeHandler = useCallback(() => {
    setRemove(true);
    if (removeCallback) {
      setTimeout(() => removeCallback(value), 200);
    }
  }, [removeCallback, value]);

  const duplicateHandler = useCallback(() => {
    if (duplicateCallback) {
      setTimeout(() => duplicateCallback(), 1100);
    }
  }, [duplicateCallback]);

  const duplicatedHandler = useCallback(() => {
    setRestrictAppearAnimation(true);
  }, []);

  useEffect(() => {
    if (toBeRemoved) {
      removeHandler();
    }
    if (isDuplicate) {
      duplicateHandler();
    }
    if (isDuplicated) {
      duplicatedHandler();
    }
  }, [toBeRemoved, removeHandler, isDuplicate, duplicateHandler, isDuplicated, duplicatedHandler]);

  return (
    <TagEntryContainer
      $shouldfadeout={remove}
      $shouldpulse={isDuplicated}
      $shouldappear={!restrictAppearAnimation}
      $shouldfadeoutinvalid={isDuplicate}>
      {value}
      <TagEntryBtn onClick={removeHandler}>×</TagEntryBtn>
    </TagEntryContainer>
  );
}

export default TagEntry;