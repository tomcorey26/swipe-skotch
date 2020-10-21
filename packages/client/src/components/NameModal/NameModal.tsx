import React, { useState, ChangeEvent } from 'react';
import './NameModal.scss';

interface NameModalProps {
  setName: (value: string | ((val: string) => string)) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ setName }) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(value);
  };
  return (
    <>
      <div className="modal-cover" />
      <div className="name-modal">
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <h1>Enter NickName</h1>
            <input
              className="modal-input"
              type="text"
              value={value}
              onChange={(e) => {
                if (value.length < 11) {
                  setValue(e.target.value);
                }
              }}
              maxLength={10}
            />
            <button className="modal-button" onClick={() => setName(value)}>
              Join Lobby
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
