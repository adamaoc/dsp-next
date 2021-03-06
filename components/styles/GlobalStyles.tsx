import { Global, css } from '@emotion/react';

const reset = css`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {  
      -webkit-appearance: button;
  }
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed,  figure, figcaption, footer, header, hgroup,  menu, nav, output, ruby, section, summary, time, mark, audio, video {  
    margin: 0;  
    padding: 0;  
    border: 0;  
    font-size: 100%;  
    vertical-align: baseline; 
  }
  img {    
    max-width: 100%;
  }

  body .react-calendar {
    border: none;
    border-right: 1px solid #eee;
  }
`;

export const GlobalStyles = () => {
  return <Global styles={reset} />
}