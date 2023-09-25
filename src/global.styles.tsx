import { createGlobalStyle } from "styled-components";

export const fontSizes = {
  standard: '12px',
  medium: '15px',
  big: '18.75px'
}

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Open Sans", sans-serif;
    color: #333;
    background-image: linear-gradient(to right, #12b886, #c3fae8);
    height: 100vh;
  }

  .centered-container {
    position: absolute;
    width: 80rem;
    height: 50rem;
    border: 2px solid white;
    border-radius: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .main-container {
    width: 80%;
    margin: 0 auto;

  }

  .pulse-element {
    animation: pulse .3s ease-out;
  }
`;