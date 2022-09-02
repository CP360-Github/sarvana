import React, { useState } from 'react';
import { GetContactTypeList } from '../../../api/Queue';
import SubModal from './SubModal';

// eslint-disable-next-line react/prop-types
const AddContactTypeModal = ({ setSelectedValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [contactType, setContactType] = useState([]);
  const handleOpenModal = () => {
    getAcdList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAcdList = async () => {
    try {
      const result = await GetContactTypeList();
      if (result.status === 200) {
        setContactType(result.data.results);
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
    searchedData?.filter((el) => el.ct_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <SubModal
      modalHeading="Select Contact Type"
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      setValueAndToggleModal={setAclAndToggleModal}
      filterData={filterData}
      dataList={contactType}
    />
  );
};

export default AddContactTypeModal;
