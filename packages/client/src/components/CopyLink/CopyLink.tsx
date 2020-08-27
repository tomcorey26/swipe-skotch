import React, { useState } from 'react';
import './CopyLink.scss';
import CopyToClipboard from 'react-copy-to-clipboard';

interface CopyLinkProps {}

export const CopyLink: React.FC<CopyLinkProps> = ({}) => {
  const [copied, setCopied] = useState(false);
  const [value] = useState(() => window.location.href);
  return (
    <div>
      <h1>Send this link to your Friends!</h1>
      <div className="copy-link">
        <input type="text" className="link-text" readOnly value={value} />
        <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
          <button
            className="copy-indicator"
            style={{ backgroundColor: copied ? '#3CB371' : '#0b9ed0' }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};
