import React, {
  Dispatch,
  SetStateAction,
  useState,
  SyntheticEvent,
} from 'react';
import './NameModal.scss';

interface NameModalProps {
  setName: (value: string | ((val: string) => string)) => void;
}

export const NameModal: React.FC<NameModalProps> = ({ setName }) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = (e: SyntheticEvent) => {
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
              onChange={(e) => setValue(e.target.value)}
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
