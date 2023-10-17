import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import '../stylesheet/calendar.css';

export default class Calendar extends React.Component {

    state = {
    weekendsVisible: true,
    currentEvents: []
    }

    render() {
    return (
        <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} 
            select={this.handleDateSelect}
            eventContent={renderEventContent} 
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} 
            />
        </div>
        </div>
    )
    }

    renderSidebar() {
    return (
        <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
            </ul>
        </div>
        <div className='demo-app-sidebar-section'>
            <label>
            <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
            </label>
        </div>
        <div className='demo-app-sidebar-section'>
            <h2>All Events ({this.state.currentEvents.length})</h2>
            <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
        </div>
        </div>
    )
    }

    handleWeekendsToggle = () => {
    this.setState({
        weekendsVisible: !this.state.weekendsVisible
    })
    }

    handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() 

    if (title) {
        calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
        })
    }
    }

    handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
    }
    }

    handleEvents = (events) => {
    this.setState({
        currentEvents: events
    })
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

function renderSidebarEvent(event) {
    return (
    <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
    </li>
    )
}