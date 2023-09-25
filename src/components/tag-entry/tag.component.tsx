import { TagBase, TagBtn, TagDuplicate, TagPulsingOnce, TagRemoving } from "./tag.styles";


export enum TAG_TYPES {
  base = 'base',
  removing = 'removing',
  duplicate = 'duplicate',
  pulsingOnce = 'pulsingOnce'
}

const getTag = (type = TAG_TYPES.base): typeof TagBase =>
({
  [TAG_TYPES.base]: TagBase,
  [TAG_TYPES.removing]: TagRemoving,
  [TAG_TYPES.duplicate]: TagDuplicate,
  [TAG_TYPES.pulsingOnce]: TagPulsingOnce,
}[type]);

interface Props {
  value: string;
  type?: TAG_TYPES;
}

const Tag = ({ value, type = TAG_TYPES.base }: Props) => {
  const TagCustom = getTag(type);

  return (
    <TagCustom>
      <span>{value}</span>
      <TagBtn>×</TagBtn>
    </TagCustom>
  );
}

export default Tag;