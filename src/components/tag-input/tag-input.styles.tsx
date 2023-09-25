import { styled } from "styled-components";
import { fontSizes } from "../../global.styles";

export const TagsInputContainer = styled.div`
    display: inline-flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 4.8rem;
    color: inherit;
    background-color: rgba(255, 255, 255, .7);
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    
    
    transition: all .2s;

    &:has(.tags-input__input:focus) {
      border-bottom: 3px solid #099268;
      box-shadow: 0 1.5rem 1.5rem rgba(0, 0, 0, 0.1);
    }

    .tags-input__input {
      width: 100%;
      margin-left: 1rem;
      outline: none;
      border: none;
      background-color: transparent;
      font-size: ${fontSizes.medium};
    }
`;