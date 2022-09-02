import React, { useState } from 'react';
import { GetQueues } from '../../../api/Queue';
import SubModal from './SubModal';

// eslint-disable-next-line react/prop-types
const AddCopyFromModal = ({ setSelectedValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [copyFrom, setCopyFrom] = useState([]);
  const handleOpenModal = () => {
    getAcdList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const getAcdList = async () => {
    try {
      const result = await GetQueues();
      if (result.status === 200) {
        setCopyFrom(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setQueueAndToggleModal = (val) => {
    setSelectedValue(val);
    handleCloseModal();
  };
  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.ct_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <SubModal
      modalHeading="Select Queue"
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      setValueAndToggleModal={setQueueAndToggleModal}
      filterData={filterData}
      dataList={copyFrom}
    />
  );
};

export default AddCopyFromModal;
