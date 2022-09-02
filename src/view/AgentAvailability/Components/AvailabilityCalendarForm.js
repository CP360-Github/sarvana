import React, { useRef, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../../components/@material-extend';
import { CalendarStyle, CalendarToolbar } from '../../../components/_dashboard/calendar';

const AvailabilityCalendarForm = () => {
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [event, setEvent] = useState([]);
  const [timeInterval, setTimeInterval] = useState('00:30');
  const [clickedEvents, setClickedEvents] = useState([]);

  const handleSelectRange = (arg) => {
    const milliseconds = new Date(arg.end) - new Date(arg.start);
    const minutes = milliseconds / 60000;
    if (`00:${minutes}` !== timeInterval) {
      if (arg.start.getDay() !== arg.end.getDay()) {
        const weekdayDiff = arg.end.getDay() - arg.start.getDay();
        let addEvent = {};
        const arrEvent = [];
        let decrWeekDay = arg.end.getDay() - arg.start.getDay();
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= weekdayDiff; i++) {
          addEvent = {
            start: nextDateProvider(arg.start, i),
            end: prevDateProvider(arg.end, decrWeekDay),
            overlap: false,
            allDay: arg.allDay,
            // jsEvent: arg.jsEvent,
            // view: arg.view,
            id: i,
            backgroundColor: 'skyblue'
          };
          decrWeekDay -= 1;
          arrEvent.push(addEvent);
        }
        setEvent((prev) => [...prev, ...arrEvent]);
        enqueueSnackbar('Events successfully added', { variant: 'success' });
      } else {
        Object.assign(arg, {
          overlap: false,
          backgroundColor: 'skyblue',
          id: Math.random() * 1000
        });
        setEvent((prev) => [...prev, arg]);
        enqueueSnackbar('Event successfully added', { variant: 'success' });
      }
    }
  };

  const nextDateProvider = (date, numberOfDays) => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + numberOfDays);
    return tomorrow;
  };
  const prevDateProvider = (date, numberOfDays) => {
    const previous = new Date(date);
    previous.setDate(previous.getDate() - numberOfDays);
    return previous;
  };
  const handleSelectEvent = (arg) => {
    arg.el.style.background = 'rgb(56 132 163)';
    const eventObj = arg.el?.fcSeg;
    const addEvent = {
      start: eventObj.start,
      end: eventObj.end,
      overlap: false,
      allDay: false,
      // jsEvent: arg.jsEvent,
      // view: arg.view,
      id: eventObj.eventRange.def.publicId
    };
    setClickedEvents((prev) => [...prev, addEvent]);
  };

  function addHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours);
    return date;
  }
  const handleResizeEvent = async (arg) => {
    const id = arg.el?.fcSeg.eventRange.def.publicId;
    const filteredEvents = event.map((event) => {
      if (event.id.toString() === id) {
        event.start = addHours(arg.startDelta.milliseconds, event.start);
        event.end = addHours(arg.endDelta.milliseconds, event.end);
      }
      return event;
    });
    setEvent(filteredEvents);
    enqueueSnackbar('Events successfully Updated', { variant: 'success' });
  };

  const handleDropEvent = async ({ event }) => {
    console.log(event, 'handleDropEvent');
  };

  const deSelectedEvent = (args) => {
    const id = args.el?.fcSeg.eventRange.def.publicId;
    const includedData = clickedEvents.filter((e) => e.id !== id);
    if (includedData.length !== clickedEvents.length) {
      args.el.style.background = 'skyblue';
      setClickedEvents(includedData);
    } else {
      handleSelectEvent(args);
    }
  };
  const deleteSelectedEvent = () => {
    try {
      const filteredEvents = event.filter((event) => !clickedEvents.find((e) => event?.id?.toString() === e.id));
      setEvent(filteredEvents);
      setClickedEvents([]);
      enqueueSnackbar('Events successfully deleted', { variant: 'success' });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box id="AvailabilityCalendar">
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <FormControl sx={{ width: '140px' }} size="small">
          <InputLabel sx={{ fontSize: '11pt' }}>Interval</InputLabel>
          <Select
            label="Interval"
            variant="outlined"
            defaultValue="00:30"
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
          >
            <MenuItem value="00:15">15 Minutes</MenuItem>
            <MenuItem value="00:30">30 Minutes</MenuItem>
          </Select>
        </FormControl>
        <MIconButton
          title="Delete Event"
          sx={{ background: 'rgba(99, 115, 129, 0.08)' }}
          disabled={clickedEvents.length === 0}
          onClick={deleteSelectedEvent}
        >
          <Icon icon="ic:round-event-busy" />
        </MIconButton>
      </Box>
      <CalendarStyle>
        <CalendarToolbar
          date={new Date()}
          view="timeGridWeek"
          onNextDate={console.log}
          onPrevDate={console.log}
          onToday={console.log}
          onChangeView={console.log}
        />
        {console.log(event, 'event')}
        <FullCalendar
          className="full_calender_custom"
          allDaySlot={false}
          weekends
          editable
          selectable
          events={event}
          slotDuration={`${timeInterval}:00`}
          slotLabelInterval={timeInterval}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={new Date()}
          initialView="timeGridWeek"
          dayHeaderFormat={{ weekday: 'long' }}
          dayMaxEventRows={1}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleSelectRange}
          eventDrop={handleDropEvent}
          eventClick={clickedEvents.length > 0 ? deSelectedEvent : handleSelectEvent}
          eventResize={handleResizeEvent}
          height="auto"
          eventStartEditable={false}
          plugins={[timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyle>
    </Box>
  );
};

export default AvailabilityCalendarForm;
