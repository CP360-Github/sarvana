import React, { useState } from 'react';
import { GetEntitySet } from '../../../api/EntitySet';
import SubModal from '../../Queues/components/SubModal';

// eslint-disable-next-line react/prop-types
const CopyFromEntitySet = ({ setSelectedValue, setType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [copyFrom, setCopyFrom] = useState([]);
  const handleOpenModal = () => {
    getEntitySetList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getEntitySetList = async () => {
    try {
      const result = await GetEntitySet(setType);
      if (result.status === 200) {
        setCopyFrom(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setEntitySetAndToggleModal = (val) => {
    setSelectedValue(val);
    handleCloseModal();
  };
  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.entity_set_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <SubModal
      modalHeading="Select Entity Set"
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      setValueAndToggleModal={setEntitySetAndToggleModal}
      filterData={filterData}
      dataList={copyFrom}
    />
  );
};

export default CopyFromEntitySet;
