import { useState } from 'react';

const experienceDefault = {
  company: '',
  position: '',
  responsibilities: '',
  date: '',
};

function Editor({ information, setInformation }) {
  const [pageOpen, setPageOpen] = useState('main');
  const [generalSubInfo, setGeneralSubInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [educationSubInfo, setEducationSubInfo] = useState({
    school: '',
    major: '',
    date: '',
  });
  const [experienceSubInfo, setExperienceSubInfo] = useState(experienceDefault);

  const pageComponents = {
    main: (
      <MainPage
        information={information}
        setPageOpen={setPageOpen}
        setExperienceSubInfo={setExperienceSubInfo}
      />
    ),
    general: (
      <GeneralEditor
        information={information}
        setInformation={setInformation}
        setPageOpen={setPageOpen}
        subInfo={generalSubInfo}
        setSubInfo={setGeneralSubInfo}
      />
    ),
    education: (
      <EducationEditor
        information={information}
        setInformation={setInformation}
        setPageOpen={setPageOpen}
        subInfo={educationSubInfo}
        setSubInfo={setEducationSubInfo}
      />
    ),
    experience: (
      <ExperienceEditor
        information={information}
        setInformation={setInformation}
        setPageOpen={setPageOpen}
        subInfo={experienceSubInfo}
        setSubInfo={setExperienceSubInfo}
      />
    ),
  };

  return <div className="editor-back">{pageComponents[pageOpen]}</div>;
}

function MainPage({ information, setPageOpen, setExperienceSubInfo }) {
  return (
    <>
      <h1>My CV</h1>
      <div className="sections">
        <section>
          <h2>General Information</h2>
          <h3 className="main-name">
            Name: <span>{information.general.name}</span>
          </h3>
          <h3 className="main-email">
            Email: <span>{information.general.email}</span>
          </h3>
          <h3 className="main-phone">
            Phone Number: <span>{information.general.phone}</span>
          </h3>
          <button className="edit" onClick={() => setPageOpen('general')}>
            Edit
          </button>
        </section>
        <section>
          <h2>Education</h2>
          <h3 className="main-school">
            School: <span>{information.education.school}</span>
          </h3>
          <h3 className="main-major">
            Major: <span>{information.education.major}</span>
          </h3>
          <h3 className="main-date">
            Date: <span>{information.education.date}</span>
          </h3>
          <button className="edit" onClick={() => setPageOpen('education')}>
            Edit
          </button>
        </section>
        <section>
          <h2>Experience</h2>
          <ul>
            {information.experience.map((item) => (
              <li key={item.id}>
                <h3>
                  Company Name: <span>{item.company}</span>
                </h3>
                <h3>
                  Position: <span>{item.position}</span>
                </h3>
                <h3>
                  Responsibilities: <span>{item.responsibilities}</span>
                </h3>
                <h3>
                  Date: <span>{item.date}</span>
                </h3>
                <button
                  className="edit"
                  onClick={() => {
                    setExperienceSubInfo({ ...item });
                    setPageOpen('experience');
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
          <button
            className="add"
            onClick={() => {
              setExperienceSubInfo({
                ...experienceDefault,
                id: crypto.randomUUID(),
              });
              setPageOpen('experience');
            }}
          >
            Add
          </button>
        </section>
      </div>
    </>
  );
}

function GeneralEditor({
  information,
  setInformation,
  setPageOpen,
  subInfo,
  setSubInfo,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const newInformation = { ...information };
    newInformation.general = { ...subInfo };

    setInformation(newInformation);
    setPageOpen('main');
  }

  function handleInputChange(e) {
    const element = e.target;
    const newSubInfo = { ...subInfo };

    newSubInfo[element.id] = element.value;
    setSubInfo(newSubInfo);
  }

  return (
    <>
      <h2 className="pageHeader">General Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={subInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={subInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={subInfo.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
}

function EducationEditor({
  information,
  setInformation,
  setPageOpen,
  subInfo,
  setSubInfo,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const newInformation = { ...information };
    newInformation.education = { ...subInfo };

    setInformation(newInformation);
    setPageOpen('main');
  }

  function handleInputChange(e) {
    const element = e.target;
    const newSubInfo = { ...subInfo };

    if (element.id === 'start') {
      let currEnd = newSubInfo.date.split(' - ');
      currEnd = currEnd.length === 2 ? currEnd[1] : '';
      newSubInfo.date = element.value + ' - ' + currEnd;
    } else if (element.id === 'end') {
      let currStart = newSubInfo.date.split(' - ');
      currStart = currStart[0];
      newSubInfo.date = currStart + ' - ' + element.value;
    } else {
      newSubInfo[element.id] = element.value;
    }
    setSubInfo(newSubInfo);
  }

  return (
    <>
      <h2 className="pageHeader">Education</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="school">School</label>
          <input
            type="text"
            id="school"
            value={subInfo.school}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="major">Major</label>
          <input
            type="text"
            id="major"
            value={subInfo.major}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="start">Start Date</label>
          <input
            type="number"
            id="start"
            value={subInfo.date.split(' - ')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="end">End Date:</label>
          <input
            type="number"
            id="end"
            value={
              subInfo.date.includes(' - ') ? subInfo.date.split(' - ')[1] : ''
            }
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
}

function ExperienceEditor({
  information,
  setInformation,
  setPageOpen,
  subInfo,
  setSubInfo,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const newInformation = { ...information };
    let add = true;

    for (let i = 0; i < newInformation.experience.length; i++) {
      if (newInformation.experience[i].id === subInfo.id) {
        newInformation.experience[i] = { ...subInfo };
        add = false;
        break;
      }
    }
    if (add) {
      console.log(subInfo);
      newInformation.experience.push({ ...subInfo });
    }

    setInformation(newInformation);
    setPageOpen('main');
  }

  function handleInputChange(e) {
    const element = e.target;
    const newSubInfo = { ...subInfo };

    if (element.id === 'job-start') {
      let currEnd = newSubInfo.date.split(' - ');
      currEnd = currEnd.length === 2 ? currEnd[1] : '';
      newSubInfo.date = element.value + ' - ' + currEnd;
    } else if (element.id === 'job-end') {
      let currStart = newSubInfo.date.split(' - ');
      currStart = currStart[0];
      newSubInfo.date = currStart + ' - ' + element.value;
    } else {
      newSubInfo[element.id] = element.value;
    }
    setSubInfo(newSubInfo);
  }

  return (
    <>
      <h2 className="pageHeader">Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={subInfo.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            value={subInfo.position}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="responsibilities">Responsibilities</label>
          <textarea
            type="number"
            id="responsibilities"
            value={subInfo.responsibilities}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="job-start">Start Date</label>
          <input
            type="number"
            id="job-start"
            value={subInfo.date.split(' - ')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="job-end">End Date</label>
          <input
            type="number"
            id="job-end"
            value={
              subInfo.date.includes(' - ') ? subInfo.date.split(' - ')[1] : ''
            }
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Editor;
