import { useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const color1 = useColorModeValue('#000', '#fff');

  return (
    <footer style={{ background: '#1D1F2F' }} id="footer">
      <div className="container">
        <div className="footer">
          <div className="left_part">
            <p style={{ color: `${color1}` }}>
              Copyright 2023 —
              <a style={{ color: `${color1}` }} href="" rel="noreferrer">
                {' '}
                ThreeB
              </a>
            </p>
          </div>
          <div className="right_part">
            <ul>
              <li>
                <span>
                  <a style={{ color: `${color1}` }} className="creative_link">
                    Privacy Policy
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a style={{ color: `${color1}` }} className="creative_link">
                    Cookies
                  </a>
                </span>
              </li>
              <li>
                <span>
                  <a style={{ color: `${color1}` }} className="creative_link">
                    Terms &amp; Conditions
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
