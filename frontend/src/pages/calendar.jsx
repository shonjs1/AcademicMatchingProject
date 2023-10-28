import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {createEventId } from './event-utils';
import '../stylesheet/calendar.css';

export default class Calendar extends React.Component {

    state = {
    weekendsVisible: true,
    currentEvents: []
    }

    render() {
        return (
            <div className='demo-app'>
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={(generateWeeklyEvents())}
                        select={this.handleDateSelect}
                        eventContent={renderEventContent}
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents}
                    />
                </div>
            </div>
        );
    }
}

function renderEventContent(eventInfo) {
    return (
    <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
    </>
    )
}
function generateWeeklyEvents() {
    const startDate = new Date();
    const events = [];

    for (let i = 0; i < 10; i++) {
        const mondayDate = new Date(startDate);
        mondayDate.setDate(startDate.getDate() + i * 7 + 1);
        mondayDate.setHours(12, 0, 0);

        const wednesdayDate = new Date(startDate);
        wednesdayDate.setDate(startDate.getDate() + i * 7 + 6);
        wednesdayDate.setHours(12, 0, 0);

        const fridayDate = new Date(startDate);
        fridayDate.setDate(startDate.getDate() + i * 7 + 4);
        fridayDate.setHours(12, 0, 0);

        events.push(
            {
                id: createEventId(),
                title: 'Group Meeting',
                start: mondayDate.toISOString(),
            },
            {
                id: createEventId(),
                title: 'Group Meeting',
                start: wednesdayDate.toISOString(),
            },
            {
                id: createEventId(),
                title: 'Group Meeting',
                start: fridayDate.toISOString(),
            }
        );
    }

    return events;
}