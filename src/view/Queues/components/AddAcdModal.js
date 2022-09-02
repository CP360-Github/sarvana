import React, { useState } from 'react';
import { GetAcdList } from '../../../api/Queue';
import SubModal from './SubModal';

// eslint-disable-next-line react/prop-types
const AddAcdModal = ({ setSelectedValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [acdList, setAcdList] = useState([]);
  const handleOpenModal = () => {
    getAcdList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAcdList = async () => {
    try {
      const result = await GetAcdList();
      if (result.status === 200) {
        setAcdList(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setAclAndToggleModal = (val) => {
    setSelectedValue(val);
    handleCloseModal();
  };
  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.param_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <SubModal
      modalHeading="Select Acd"
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      setValueAndToggleModal={setAclAndToggleModal}
      filterData={filterData}
      dataList={acdList}
    />
  );
};

export default AddAcdModal;
