import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField } from '@material-ui/core';
import Slider from 'react-slick';
import './styles.css';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import cross from '@iconify/icons-eva/close-outline';
import { IconSelected, SelectedIconDescription } from '../../../ReduxCreated/actions/ActivityCodeDefinition';
import { MIconButton } from '../../../components/@material-extend';

function CarouselIcons() {
  const [searchText, setSearchText] = useState('');
  const [carouselWidth, setCarouselWidth] = useState('92%');
  const [inputVisibility, setInputVisibility] = useState(false);
  const [filteredNumber, setFilteredNumber] = useState(43);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: filteredNumber !== 43 ? (filteredNumber > 7 ? 6 : filteredNumber) : 6,
    slidesToScroll: 3
  };
  const dispatch = useDispatch();

  const handleClick = (s) => {
    console.log(s.icon.props.icon);
    dispatch(IconSelected(s.icon.props.icon.toString()));
    dispatch(SelectedIconDescription(s.description));
  };
  const inputHideShow = () => {
    setCarouselWidth('60%');
    setInputVisibility(true);
  };

  const filterData = (searchedData, search) =>
    searchedData?.filter((el) => el.searchKey?.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  useEffect(() => {
    const data = filterData(Icons, searchText);
    setFilteredNumber(data.length);
  }, [searchText]);

  const resetFilter = () => {
    setCarouselWidth('92%');
    setInputVisibility(false);
    setSearchText('');
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '3rem' }}>
        <Paper elevation={6}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '3px 10px',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div title="Search">
              <Icon icon="icon-park:search" fontSize="25px" style={{ cursor: 'pointer' }} onClick={inputHideShow} />
            </div>
            <div style={{ display: inputVisibility === true ? 'flex' : 'none' }}>
              <TextField
                label="Search"
                variant="outlined"
                style={{ display: inputVisibility === true ? 'block' : 'none' }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <MIconButton size="small" onClick={resetFilter} title="Close">
                <Icon
                  icon={cross}
                  fontSize="20px"
                  style={{ display: inputVisibility === true ? 'block' : 'none', cursor: 'pointer' }}
                />
              </MIconButton>
            </div>
            <div className="CarouselStyle" style={{ cursor: 'pointer', width: carouselWidth }}>
              <Slider {...settings}>
                {filterData(Icons, searchText).map((s, i) => (
                  <div
                    aria-hidden="true"
                    title={s.searchKey}
                    key={i}
                    onClick={() => handleClick(s)}
                    onKeyDown={() => handleClick(s)}
                  >
                    {s.icon}
                  </div>
                ))}
              </Slider>
            </div>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
export default CarouselIcons;

const Icons = [
  { id: 1, icon: <Icon icon="icon-park:tea-drink" fontSize="25px" />, description: 'Break', searchKey: 'Break' },
  { id: 2, icon: <Icon icon="icon-park:drink" fontSize="25px" />, description: '2nd Break', searchKey: '2nd Break' },
  {
    id: 3,
    icon: <Icon icon="icon-park:every-user" fontSize="25px" />,
    description: 'Coaching',
    searchKey: 'Coaching'
  },
  {
    id: 4,
    icon: <Icon icon="icon-park:strikethrough" fontSize="25px" className="iconColorChange" />,
    description: 'Special Project',
    searchKey: 'Special Project'
  },
  {
    id: 5,
    icon: <Icon icon="icon-park:six-circular-connection" fontSize="25px" />,
    description: 'Team Meeting',
    searchKey: 'Team Meeting'
  },
  {
    id: 6,
    icon: <Icon icon="emojione:stop-sign" fontSize="25px" />,
    description: 'Suspension',
    searchKey: 'Suspension'
  },
  {
    id: 7,
    icon: <Icon icon="icon-park:stickers" fontSize="25px" />,
    description: 'HR Pending',
    searchKey: 'HR Pending'
  },
  {
    id: 8,
    icon: <Icon icon="icon-park:in-flight" fontSize="25px" />,
    description: 'Vacation',
    searchKey: 'Vacation'
  },
  { id: 9, icon: <Icon icon="ic:twotone-sick" fontSize="25px" />, description: 'Sick', searchKey: 'Sick' },
  { id: 10, icon: <Icon icon="icon-park:pie-four" fontSize="25px" />, description: 'VTO', searchKey: 'VTO' },
  { id: 11, icon: <Icon icon="icon-park:help" fontSize="25px" />, description: 'NCNS', searchKey: 'NCNS' },
  {
    id: 12,
    icon: <Icon icon="icon-park:imbalance" fontSize="25px" />,
    description: 'Unpaid Leave',
    searchKey: 'Unpaid Leave'
  },
  { id: 13, icon: <Icon icon="icon-park:vacation" fontSize="25px" />, description: 'STAT', searchKey: 'STAT' },
  {
    id: 14,
    icon: <Icon icon="icon-park:disappointed-face" fontSize="25px" />,
    description: 'Bereavement',
    searchKey: 'Bereavement'
  },
  {
    id: 15,
    icon: <Icon icon="icon-park:slightly-smiling-face" fontSize="25px" />,
    description: 'Parental Leave',
    searchKey: 'Parental Leave'
  },
  {
    id: 16,
    icon: <Icon icon="icon-park:error" fontSize="25px" />,
    description: 'Attrition',
    searchKey: 'Attrition'
  },
  { id: 17, icon: <Icon icon="icon-park:angry-face" fontSize="25px" />, description: 'LOA', searchKey: 'LOA' },
  {
    id: 18,
    icon: <Icon icon="icon-park:reduce-one" fontSize="25px" />,
    description: 'Family Emergency',
    searchKey: 'Family Emergency'
  },
  {
    id: 19,
    icon: <Icon icon="icon-park:facial-mask" fontSize="25px" />,
    description: 'Covid Isolation',
    searchKey: 'Covid Isolation'
  },
  {
    id: 20,
    icon: <Icon icon="icon-park:checklist" fontSize="25px" />,
    description: 'Granted Unpaid',
    searchKey: 'Granted Unpaid'
  },
  {
    id: 21,
    icon: <Icon icon="icon-park:heavy-rain" fontSize="25px" className="iconColorChange" />,
    description: 'Weather Excused Unpaid',
    searchKey: 'Weather Excused Unpaid'
  },
  {
    id: 22,
    icon: <Icon icon="icon-park:chopsticks-fork" fontSize="25px" className="iconColorChange" />,
    description: 'Lunch',
    searchKey: 'Lunch'
  },
  {
    id: 23,
    icon: <Icon icon="icon-park:stopwatch" fontSize="25px" />,
    description: 'OFF Post Release',
    searchKey: 'OFF Post Release'
  },
  { id: 24, icon: <Icon icon="icon-park:book-open" fontSize="25px" />, description: 'Open', searchKey: 'Open' },
  {
    id: 25,
    icon: <Icon icon="icon-park:speed-one" fontSize="25px" />,
    description: 'Over time',
    searchKey: 'Over time'
  },
  {
    id: 26,
    icon: <Icon icon="icon-park:chart-histogram-two" fontSize="25px" />,
    description: 'SME',
    searchKey: 'SME'
  },
  { id: 27, icon: <Icon icon="icon-park:mail-review" fontSize="25px" />, description: 'Email', searchKey: 'Email' },
  { id: 28, icon: <Icon icon="icon-park:communication" fontSize="25px" />, description: 'Chat', searchKey: 'Chat' },
  {
    id: 29,
    icon: <Icon icon="icon-park:email-fail" fontSize="25px" className="iconColorChange" />,
    description: 'Offline',
    searchKey: 'Offline'
  },
  {
    id: 30,
    icon: <Icon icon="icon-park:doc-add" fontSize="25px" />,
    description: 'Recovered Hours',
    searchKey: 'Recovered Hours'
  },
  {
    id: 31,
    icon: <Icon icon="icon-park:chart-line-area" fontSize="25px" />,
    description: 'Extra Hours',
    searchKey: 'Extra Hours'
  },
  {
    id: 32,
    icon: <Icon icon="icon-park:phone-outgoing" fontSize="25px" />,
    description: 'Outbound',
    searchKey: 'Outbound'
  },
  {
    id: 33,
    icon: <Icon icon="icon-park:disabled-computer" fontSize="25px" className="iconColorChange" />,
    description: 'Client Downtime',
    searchKey: 'Client Downtime'
  },
  {
    id: 34,
    icon: <Icon icon="icon-park:disabled-laptop" fontSize="25px" />,
    description: 'System Down',
    searchKey: 'System Down'
  },
  {
    id: 35,
    icon: <Icon icon="icon-park:remind-disable" fontSize="25px" />,
    description: 'Late Unpaid',
    searchKey: 'Late Unpaid'
  },
  {
    id: 36,
    icon: <Icon icon="icon-park:luggage" fontSize="25px" />,
    description: 'Leave Early',
    searchKey: 'Leave Early'
  },
  {
    id: 37,
    icon: <Icon icon="icon-park:monitor-one" fontSize="25px" />,
    description: 'Tech Issue',
    searchKey: 'Tech Issue'
  },
  {
    id: 38,
    icon: <Icon icon="icon-park:hamburger" fontSize="25px" />,
    description: 'Late from Break',
    searchKey: 'Late from Break'
  },
  {
    id: 39,
    icon: <Icon icon="icon-park:hamburger-one" fontSize="25px" />,
    description: 'Late from Lunch',
    searchKey: 'Late from Lunch'
  },
  {
    id: 40,
    icon: <Icon icon="icon-park:phone-off" fontSize="25px" className="iconColorChange" />,
    description: 'Unapproved Sign Off',
    searchKey: 'Unapproved Sign Off'
  },
  {
    id: 41,
    icon: <Icon icon="icon-park:instagram-one" fontSize="25px" />,
    description: 'Development Training',
    searchKey: 'Development Training'
  },
  {
    id: 42,
    icon: <Icon icon="icon-park:dollar" fontSize="25px" className="iconColorChange" />,
    description: 'Billable Training',
    searchKey: 'Billable Training'
  },
  {
    id: 43,
    icon: <Icon icon="icon-park:edit-name" fontSize="25px" />,
    description: 'New Hire Training',
    searchKey: 'New Hire Training'
  },
  { id: 44, icon: <Icon icon="icon-park:baby" fontSize="25px" />, description: '', searchKey: 'Baby' },
  { id: 45, icon: <Icon icon="icon-park:booth" fontSize="25px" />, description: '', searchKey: 'Booth' },
  { id: 46, icon: <Icon icon="icon-park:spanner" fontSize="25px" />, description: '', searchKey: 'Settings' },
  {
    id: 47,
    icon: <Icon icon="icon-park:code-computer" fontSize="25px" className="iconColorChange" />,
    description: '',
    searchKey: 'Computer'
  },
  { id: 48, icon: <Icon icon="icon-park:calendar-dot" fontSize="25px" />, description: '', searchKey: 'Calendar' },
  { id: 49, icon: <Icon icon="icon-park:display" fontSize="25px" />, description: '', searchKey: 'Display' },
  { id: 50, icon: <Icon icon="icon-park:data-sheet" fontSize="25px" />, description: '', searchKey: 'Data sheet' },
  { id: 51, icon: <Icon icon="icon-park:sun-one" fontSize="25px" />, description: '', searchKey: 'Sun' },
  { id: 52, icon: <Icon icon="icon-park:document-folder" fontSize="25px" />, description: '', searchKey: 'Document' },
  { id: 53, icon: <Icon icon="icon-park:folder-open" fontSize="25px" />, description: '', searchKey: 'Folder/File' }
];

// const Icons = [
//   {
//     id: 1,
//     icon: <Icon icon="ic:twotone-sick" fontSize="25px" />
//   },
//   {
//     id: 2,
//     icon: <Icon icon="emojione-v1:pot-of-food" fontSize="25px" />
//   },
//   {
//     id: 3,
//     icon: <Icon icon="emojione:face-savoring-food" fontSize="25px" />
//   },
//   {
//     id: 4,
//     icon: <Icon icon="icon-park:tea-drink" fontSize="25px" />
//   },
//   {
//     id: 5,
//     icon: <Icon icon="twemoji:bubble-tea" fontSize="25px" />
//   },
//   {
//     id: 6,
//     icon: <Icon icon="openmoji:bubble-tea" fontSize="25px" />
//   },
//   { id: 7, icon: <Icon icon="emojione-v1:alarm-clock" fontSize="25px" /> },
//   { id: 8, icon: <Icon icon="flat-color-icons:overtime" fontSize="25px" /> },
//   { id: 9, icon: <Icon icon="icon-park:online-meeting" fontSize="25px" /> },
//   { id: 10, icon: <Icon icon="flat-color-icons:video-projector" fontSize="25px" /> },
//   { id: 11, icon: <Icon icon="flat-color-icons:businessman" fontSize="25px" /> },
//   { id: 12, icon: <Icon icon="flat-color-icons:about" fontSize="25px" /> },
//   { id: 13, icon: <Icon icon="flat-color-icons:assistant" fontSize="25px" /> },
//   { id: 14, icon: <Icon icon="flat-color-icons:call-transfer" fontSize="25px" /> },
//   { id: 15, icon: <Icon icon="flat-color-icons:calculator" fontSize="25px" /> },
//   { id: 16, icon: <Icon icon="flat-color-icons:butting-in" fontSize="25px" /> },
//   { id: 18, icon: <Icon icon="flat-color-icons:debt" fontSize="25px" /> },
//   { id: 19, icon: <Icon icon="flat-color-icons:conference-call" fontSize="25px" /> },
//   { id: 20, icon: <Icon icon="flat-color-icons:data-sheet" fontSize="25px" /> },
//   { id: 21, icon: <Icon icon="flat-color-icons:data-encryption" fontSize="25px" /> },
//   { id: 22, icon: <Icon icon="flat-color-icons:debian" fontSize="25px" /> },
//   { id: 23, icon: <Icon icon="flat-color-icons:checkmark" fontSize="25px" /> },
//   { id: 24, icon: <Icon icon="flat-color-icons:wi-fi-logo" fontSize="25px" /> },
//   { id: 25, icon: <Icon icon="flat-color-icons:workflow" fontSize="25px" /> },
//   { id: 26, icon: <Icon icon="flat-color-icons:workflow" fontSize="25px" /> },
//   { id: 27, icon: <Icon icon="flat-color-icons:webcam" fontSize="25px" /> },
//   { id: 28, icon: <Icon icon="flat-color-icons:voicemail" fontSize="25px" /> },
//   { id: 29, icon: <Icon icon="flat-color-icons:voice-presentation" fontSize="25px" /> },
//   { id: 30, icon: <Icon icon="flat-color-icons:vlc" fontSize="25px" /> },
//   { id: 31, icon: <Icon icon="flat-color-icons:vip" fontSize="25px" /> }
// ];
