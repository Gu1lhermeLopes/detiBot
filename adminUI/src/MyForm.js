import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

const API_ADDR = "localhost:8000";

const MyForm = () => {
  const [sourceType, setSourceType] = useState('file');
  const [file, setFile] = useState(null); // Using null instead of empty string for file
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [recursive, setRecursive] = useState(false);
  const [pathsEnabled, setPathsEnabled] = useState(false);
  const [paths, setPaths] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file object directly
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleRecursiveChange = () => {
    setRecursive(!recursive);
  };

  const handlePathsEnabledChange = () => {
    setPathsEnabled(!pathsEnabled);
  };

  const handlePathChange = (event, index) => {
    const newPaths = [...paths];
    newPaths[index] = event.target.value;
    setPaths(newPaths);
  };

  const handleAddPath = () => {
    setPaths([...paths, '']);
  };

  const handleRemovePath = (index) => {
    const newPaths = [...paths];
    newPaths.splice(index, 1);
    setPaths(newPaths);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiUrl = '';
    let data = new FormData();

    if (sourceType === 'file') {
      apiUrl = 'http://localhost:8000/detibot/insert_filesource';
      data.append('file', file);
      data.append('descript', description);
    } else if (sourceType === 'url') {
      apiUrl = 'http://localhost:8000/detibot/insert_urlsource';
      data = {
        url: url,
        paths: pathsEnabled ? paths : [],
        loader_type: 'url',
        update_period: frequency,
        description: description,
        wait_time: 3,
        recursive: recursive
      };
    }

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': sourceType === 'file' ? 'multipart/form-data' : 'application/json'
        }
      });
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#666', fontWeight: 'lighter', letterSpacing: '1px', lineHeight: '1.5', borderRadius: '10px', fontSize: '28px' }}>Loader</h2>
      <Card className="shadow p-3 mb-5 bg-white rounded" style={{ borderRadius: '30px', padding: '20px', maxWidth: '600px', width: 'auto', margin: '20px auto', border: '2px solid #1e90ff' }}>
        <Card.Body>
          <Tabs
            id="source-type-tabs"
            activeKey={sourceType}
            onSelect={(key) => setSourceType(key)}
            className="mb-3"
          >
            <Tab eventKey="file" title="File">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fileUpload">
                  <Form.Label>Upload File:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    style={{ color: '#1e90ff' }}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ borderRadius: '10px', color: '#1e90ff' }}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" style={{ borderRadius: '10px', backgroundColor: '#1e90ff', border: 'none' }}>
                  Submit
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="url" title="URL">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="urlInput">
                  <Form.Label>URL:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={handleUrlChange}
                    style={{ color: '#1e90ff' }}
                  />
                </Form.Group>
                <Form.Group controlId="recursive">
                  <Form.Check
                    type="checkbox"
                    label="Recursive"
                    checked={recursive}
                    onChange={handleRecursiveChange}
                    style={{ marginLeft: '10px', color: '#1e90ff' }}
                  />
                </Form.Group>
                <Form.Group controlId="pathsEnabled">
                  <Form.Check
                    type="switch"
                    label="Enable Paths"
                    checked={pathsEnabled}
                    onChange={handlePathsEnabledChange}
                    style={{ marginLeft: '10px', color: '#1e90ff' }}
                  />
                </Form.Group>
                {pathsEnabled && (
                  <>
                    {paths.map((path, index) => (
                      <Row key={index} className="mb-2">
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Enter path"
                            value={path}
                            onChange={(event) => handlePathChange(event, index)}
                            style={{ color: '#1e90ff' }}
                          />
                        </Col>
                        <Col xs="auto">
                          <Button variant="danger" onClick={() => handleRemovePath(index)}>Remove</Button>
                        </Col>
                      </Row>
                    ))}
                    <Button variant="primary" onClick={handleAddPath}>Add Path</Button>
                  </>
                )}
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ borderRadius: '10px', color: '#1e90ff' }}
                  />
                </Form.Group>
                <Form.Group controlId="frequency">
                  <Form.Label>Frequency of Updates:</Form.Label>
                  <Form.Control
                    as="select"
                    value={frequency}
                    onChange={handleFrequencyChange}
                    style={{ borderRadius: '10px', color: '#1e90ff' }}
                  >
                    <option value="">Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </Form.Control>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" style={{ borderRadius: '10px', backgroundColor: '#1e90ff', border: 'none' }}>
                  Submit
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyForm;
