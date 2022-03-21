import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Container, Form, Spinner, Table } from 'react-bootstrap';
import { getFilesData, getFilesList, setFileName } from '../../redux/slices/files';
import { formattedData } from '../../helpers';

const CustomTable = () => {

  const dispatch = useDispatch();
  const { files, isFetching, list, fileName } = useSelector(state => state.files);

  const dataToTable = formattedData(files);

  const handleSelect = (e) => {
    dispatch(setFileName(e.target.value));
  };

  useEffect(
    () => {
      dispatch(getFilesData());
      dispatch(getFilesList());
    }, [dispatch]);

  useEffect(() => {
    if (fileName && fileName.length) {
      dispatch(getFilesData(fileName));
    }
  }, [dispatch, fileName]);


  return (
    <Container style={{ marginTop: 20 }}>
      <Form.Select
        aria-label="Select File"
        data-testid="select-files"
        style={{ marginBottom: 30 }} onChange={handleSelect}
      >
        <option value='all'>All files data</option>
        {list && list.length > 0 && list.map(file => (
          <option value={file}>{file}</option>
        ))}
      </Form.Select>
      {
        isFetching ? (
          <Spinner animation="border" role="status" style={
            { display: 'flex', marginLeft: '50%', marginTop: 60 }
          } >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
          : dataToTable.length > 0 ? (
            <div data-testid="table">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>FileName</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                  </tr>
                </thead>
                <tbody>
                  {dataToTable && dataToTable.map((item, index) => (
                    <tr key={index}>
                      <td>{item.file}</td>
                      <td>{item.text}</td>
                      <td>{item.number}</td>
                      <td>{item.hex}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : <span> Este archivo no tiene datos validos </span>}
    </Container >
  );
};

export default CustomTable;
