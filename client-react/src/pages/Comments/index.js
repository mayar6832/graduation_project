import { Space, Table, Typography } from "antd";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Comments() {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:3001/product/api/comments')
        setListItems(res.data);
        console.log('render')
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  }, []);


  const deleteItem = async (id,pID) => {
    console.log(pID);
    try {

      const res = await axios.post(`http://localhost:3001/product/api/comments/${id}`,{pID})
      // const newListItems = listItems.filter(item => item._id !== id);
      console.log(res.data);
      setListItems(res.data);
      // window.location.reload(true);
      // console.log(listItems);
    } catch (err) {
      console.log(err);
    }

  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // render: () => <a>delete</a>
    },
  ];





  return (<>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (listItems) => (

          <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 500, background: '#4e83ce', color: "white" }}>Comment</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 500, background: '#4e83ce', color: "white" }}>Username</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 100, background: '#4e83ce', color: "white" }}>Action
                </td>
                
              </tr>
            </thead>
            {
            listItems.reviews.map((r, index) => {
              if (r.Comment !== "") {
                return (

            <tbody>
              <tr key={index}>

                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 500 }}>{r.Comment}</td>

                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 500 }}>{r.userName}</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', width: 100 }} onClick={() => { deleteItem(r._id,listItems._id); }} >
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>

            </tbody>
            )
              }
            return null;
            })}

          </table>
        ),
        rowExpandable: (listItems) => listItems.name !== 'Not Expandable',
      }}
      dataSource={listItems}
    />
  </>
  );

}
export default Comments;