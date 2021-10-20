import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class App extends Component {
  state = {
    events: [
      // {
      //   start: new Date(),
      //   end: new Date(new Date().getTime() + 7000000),
      //   title: "Comment this event on the code to replicate issue",
      // },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  onSelect = (data) => {
    this.setState((state) => {
      const ev = {
        start: data.start,
        end: data.end,
        title: "Some title",
      };
      return { ...state, events: [...state.events, ev] };
    });
  }

  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="week"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onSelectSlot={this.onSelect}
          resizable
          style={{ height: "100vh" }}
          selectable={true}
        />
      </div>
    );
  }
}

export default App;
