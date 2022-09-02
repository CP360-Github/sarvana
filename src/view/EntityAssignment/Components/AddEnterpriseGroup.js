import React, { useState } from 'react';
import { GetEnterpriseGroup } from '../../../api/EntitySet';
import SubModal from '../../Queues/components/SubModal';

// eslint-disable-next-line react/prop-types
const AddEnterPriseGroup = ({ setSelectedValue }) => {
  const [openModal, setOpenModal] = useState(false);
  const [enterpriseGroup, setEnterpriseGroup] = useState([]);
  const handleOpenModal = () => {
    getAcdList();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAcdList = async () => {
    try {
      const result = await GetEnterpriseGroup();
      if (result.status === 200) {
        setEnterpriseGroup(result.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setToggleModal = (val) => {
    setSelectedValue(val);
    handleCloseModal();
  };
  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.eg_name?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  return (
    <SubModal
      modalHeading="Select Enterprise Group"
      openModal={openModal}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      setValueAndToggleModal={setToggleModal}
      filterData={filterData}
      dataList={enterpriseGroup}
    />
  );
};

export default AddEnterPriseGroup;
