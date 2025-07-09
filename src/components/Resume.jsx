import { useState } from 'react';
import Editor from './Editor.jsx';
import Display from './Display.jsx';

const defaultInformation = {
  general: {
    name: '',
    email: '',
    phone: '',
  },
  education: {
    school: '',
    major: '',
    date: '', // This should be like 2012 - 2016
  },
  experience: [],
};

function Resume() {
  const [information, setInformation] = useState(defaultInformation);

  return (
    <>
      <Editor information={information} setInformation={setInformation} />
      <Display information={information} />
    </>
  );
}

export default Resume;
